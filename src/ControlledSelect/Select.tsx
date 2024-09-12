import { useSelect, UseSelectParams } from "../hooks/useSelect";
import { useSelectOptions } from "../hooks/useSelectOptions";
import { SelectProps, UseSelectOptionsParams } from "./type";

export default function Select<Option>({
  selectedOption,
  options,
  onChange,
  getLabel,
  ...props
}: UseSelectParams<Option> & UseSelectOptionsParams<Option> & SelectProps) {
  const selectProps = useSelect({ selectedOption, options, onChange });
  const selectOptions = useSelectOptions({ options, getLabel });

  return (
    <select {...props} {...selectProps}>
      {selectOptions}
    </select>
  );
}
