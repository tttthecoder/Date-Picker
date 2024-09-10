import { useContext } from "react";
import { TableContext } from "./CommonTableStatesProvider";
import { HeaderCell } from "./HeaderCell";
import { TableHeaderProps } from "./type";

function Header({ titlesRowClass, ...rest }: TableHeaderProps) {
  const { columnNames } = useContext(TableContext);

  return (
    <thead {...rest}>
      <tr className={titlesRowClass}>
        {columnNames.map((header, index) => (
          <HeaderCell key={header} headerTitle={header} />
        ))}
      </tr>
    </thead>
  );
}

export default Header;
