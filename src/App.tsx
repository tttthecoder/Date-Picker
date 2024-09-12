import SortableTable from "./SortableTable";
import { data } from "./SortableTable/utils/constants";

function App() {
  return (
    <>
      <div className="absolute w-[600px]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SortableTable<{
          id: number;
          name: string;
          age: number;
          city: string;
        }>
          baseRowClass={"bg-white even:bg-slate-100 font-mono"}
          titlesRowClass={"bg-slate-200 border-slate-300 font-mono"}
          sortBy={"name"}
          sortOrder={"DESC"}
          draggedRowClass={"opacity-30"}
          data={data}
          rowsPerPage={7}
        />
      </div>
    </>
  );
}

export default App;
