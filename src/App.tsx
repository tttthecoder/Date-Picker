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
            "bg-white border-b border-gray-300 hover:bg-gray-100 duration-200"
          }
          sortBy={"id"}
          sortOrder={"ASC"}
          sizeable
          draggedRowClass={"opacity-10"}
          data={data}
          rowsPerPage={4}
        />
      </div>
    </>
  );
}

export default App;
