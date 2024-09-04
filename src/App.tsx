import SortableTable from "./SortableTable";
import { data } from "./SortableTable/constants";

function App() {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SortableTable<{
          id: number;
          name: string;
          age: number;
          city: string;
        }>
          baseRowClass={
            "bg-white border-b border-gray-200 hover:bg-gray-100  duration-200"
          }
          sortBy={"id"}
          sortOrder={"ASC"}
          draggedRowClass={"border-2 border-blue-400 opacity-0"}
          data={data}
        />
      </div>
    </>
  );
}

export default App;
