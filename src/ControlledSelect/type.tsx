import { ChangeEvent, SelectHTMLAttributes } from "react";

export type UseSelectParams<Option> = {
  selectedOption: Option;
  options: readonly Option[];
  onChange: (option: Option) => void;
};

export type UseSelectReturnedProps = {
  value: number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export type SelectProps = Pick<
  SelectHTMLAttributes<HTMLSelectElement>,
  "name" | "className"
>;

export type UseSelectOptionsParams<Option> = {
  options: readonly Option[];
  getLabel: (option: Option) => string;
};
