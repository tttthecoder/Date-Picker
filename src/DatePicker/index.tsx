import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { dayNames } from "../utils/constant";
import {
  computeRangeOfDates,
  getDate,
  getLastMonth,
  getLastYear,
  getMonth,
  getMonthName,
  getNextMonth,
  getNextYear,
  getYear,
} from "../utils/helper";
import Button from "./Button";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { FaBackward, FaForward } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { triggerCbOnEscapeKeyForAnElement } from "../hooks/triggerCbOnEscapeKeyForAnElement";
import { useOutsideClick } from "../hooks/useOutsideClick";

const MyContext = createContext({
  date: new Date().toISOString().split("T")[0],
  setDate: (() => {}) as any,
  transitionStatus: false,
  setTransitionStatus: (() => {}) as any,
});
function DatePicker({ initalDate }: { initalDate: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<string>(initalDate);
  const [transitionStatus, setTransitionStatus] = useState<boolean>(false);
  const toggle = () => setIsModalOpen(!isModalOpen);
  const targetRef = useOutsideClick<HTMLDivElement>(() => {
    setIsModalOpen(false);
  }, []);
  const divWrapper = triggerCbOnEscapeKeyForAnElement<HTMLDivElement>(() => {
    setIsModalOpen(false);
  }, []);
  return (
    <MyContext.Provider
      value={{ date, setDate, transitionStatus, setTransitionStatus }}
    >
      <div ref={targetRef}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 isolate z-50 text-center "
          ref={divWrapper}
        >
          <div className="relative">
            <input
              type="date"
              value={date}
              className="
                        border 
                        border-gray-300 
                        rounded-md 
                        px-4 
                        py-2 
                        text-gray-600 
                        bg-white 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500 
                        focus:border-transparent
                        shadow-sm
                        hover:shadow-md
                        transition-shadow
                        duration-200
                      "
              onClick={toggle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (Number.isNaN(new Date(e.target.value).getTime())) {
                  return;
                }
                setDate(e.target.value);
              }}
            ></input>

            <CiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {isModalOpen && <DateModal />}
        </div>
      </div>
    </MyContext.Provider>
  );
}
function DatePanel() {
  const { date, setDate, transitionStatus, setTransitionStatus } =
    useContext(MyContext);

  const currentPanel = useRef<HTMLDivElement>(null);
  const upperPanel = useRef<HTMLDivElement>(null);
  const lowerPanel = useRef<HTMLDivElement>(null);

  const [key, setKey] = useState(0);

  const [currentRangeOfDates, setCurrentRangeOfDates] = useState<Date[]>([]);
  const [newRangeOfDates, setNewRangeOfDates] = useState<Date[]>([]);

  useEffect(() => {
    const currentDates: Date[] = computeRangeOfDates(date);
    if (currentRangeOfDates.length === 0) {
      setCurrentRangeOfDates(currentDates);
    } else {
      setNewRangeOfDates(currentDates);
    }
  }, [getMonthName(date), getYear(date)]);
  useEffect(() => {
    if (
      newRangeOfDates.length === 0 ||
      newRangeOfDates === currentRangeOfDates
    ) {
      return;
    }
    const transitionEndHanlder = () => {
      // when animation ends dismounts every things and rerender the main panel
      setCurrentRangeOfDates(newRangeOfDates);
      setNewRangeOfDates([]);

      // this is for dismounting all the old panels, making brand new and fresh panel components and put them into the DOM. therefore the old panels' positions are now restored back to the ones at the beginning.
      setKey((prev) => prev + 1);
      setTransitionStatus(false);
    };

    currentPanel.current?.addEventListener(
      "animationend",
      transitionEndHanlder
    );
    if (newRangeOfDates[0].getTime() > currentRangeOfDates[0].getTime()) {
      lowerPanel.current?.classList.add("makeLowerPanelUp");
      currentPanel.current?.classList.add("makeCurrentPanelUp");
    } else {
      upperPanel.current?.classList.add("makeUpperPanelDown");
      currentPanel.current?.classList.add("makeCurrentPanelDown");
    }

    setTransitionStatus(true);
  }, [newRangeOfDates]);

  return (
    <div className="space-y-2 ">
      <div className="grid grid-cols-7 bg-white rounded-lg shadow-sm text-gray-600 text-center">
        {dayNames.map((dateOfWeek) => (
          <span
            className="font-bold text-gray-600 text-md py-2 "
            key={dateOfWeek}
          >
            {dateOfWeek}
          </span>
        ))}
      </div>
      <div className="relative overflow-hidden" key={key}>
        <div
          className="grid grid-cols-7  absolute w-full bottom-full"
          ref={upperPanel}
        >
          <DateGrid
            date={date}
            rangeOfDates={newRangeOfDates}
            transitionStatus={transitionStatus}
          />
        </div>
        <div className="grid grid-cols-7" ref={currentPanel}>
          <DateGrid
            date={date}
            setDate={setDate}
            rangeOfDates={currentRangeOfDates}
            transitionStatus={transitionStatus}
          />
        </div>
        <div className="grid grid-cols-7 absolute w-full" ref={lowerPanel}>
          <DateGrid
            date={date}
            rangeOfDates={newRangeOfDates}
            transitionStatus={transitionStatus}
          />
        </div>
      </div>
    </div>
  );
}
function DateGrid({
  rangeOfDates,
  date,
  transitionStatus,
  setDate = null,
}: {
  rangeOfDates: Date[];
  date: string;
  setDate?: ((date: string) => void) | null;
  transitionStatus: boolean;
}) {
  return (
    <>
      {rangeOfDates.map((d) => {
        return (
          <span
            onClick={
              !setDate ? () => {} : () => setDate(d.toISOString().split("T")[0])
            }
            key={d.toISOString()}
            className={`col-span-1 h-[28px] flex items-center justify-center text-sm text-gray-600 transition-all
              
             ${
               getDate(date) === d.getDate() &&
               getMonth(date) === d.getMonth() &&
               getYear(date) === d.getFullYear() &&
               !transitionStatus
                 ? "rounded-full font-bold bg-red-400 text-gray-200 hover:text-white hover:opacity-85"
                 : ""
             }  ${
              !transitionStatus
                ? new Date(date).getMonth() !== d.getMonth()
                  ? "opacity-20"
                  : getDate(date) !== d.getDate() &&
                    "hover:bg-gray-300 hover:rounded-full"
                : new Date(date).getMonth() !== d.getMonth()
                ? " opacity-20 "
                : ""
            } ${!transitionStatus && " cursor-pointer "}`}
          >
            {d.getDate()}
          </span>
        );
      })}
    </>
  );
}
function DateModal() {
  const { date, setDate } = useContext(MyContext);
  return (
    <div className="absolute  border w-[300px] h-[300px] bg-white-200 rounded-md shadow-md">
      <div>
        <div className="flex justify-between items-center px-4">
          <div className="flex justtify-between items-center gap-2">
            <Button
              icon={<FaBackward />}
              onClick={() => {
                setDate(getLastYear(date));
              }}
            />
            <Button
              icon={<IoCaretBack />}
              onClick={() => {
                setDate(getLastMonth(date));
              }}
            />
          </div>
          <div className="flex flex-col items-center justify-center mb-2 mt-2">
            <h2 className="font-semibold text-2xl text-slate-500 mb-1">
              {getYear(date)}
            </h2>
            <p className="text-slate-500 text-lg font-semibold">
              {getMonthName(date)}
            </p>
          </div>
          <div className="flex justtify-between items-center  gap-2">
            <Button
              icon={<IoCaretForward className="" />}
              onClick={() => {
                setDate(getNextMonth(date));
              }}
            />
            <Button
              icon={<FaForward />}
              onClick={() => {
                setDate(getNextYear(date));
              }}
            />
          </div>
        </div>
        <DatePanel />
      </div>
    </div>
  );
}

export default DatePicker;
