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
          data={data}
        />
      </div>
    </>
  );
}

export default App;
