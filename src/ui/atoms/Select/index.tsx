import clsx from "clsx";

export type KeyOfPossibleValue<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

interface SelectProps<
  Option extends {
    [key in PropKey | PropValue | PropText]: string | number;
  } & Record<
    PropKey | PropValue | PropText | string,
    string | number | unknown
  >,
  PropKey extends KeyOfPossibleValue<Option, string | number | symbol>,
  PropValue extends KeyOfPossibleValue<Option, string | number>,
  PropText extends KeyOfPossibleValue<Option, string | number>
> {
  id?: string;
  name?: string;
  options: Option[];
  value?: Option[PropValue];
  onChange: (value: Option[PropValue]) => void;
  propKey: PropKey;
  propValue: PropValue;
  propText: PropText;
  isError?: boolean;
  isDirty?: boolean;
}

export default function Select<
  Option extends {
    [key in PropKey | PropValue | PropText]: string | number;
  } & Record<
    PropKey | PropValue | PropText | string,
    string | number | unknown
  >,
  PropKey extends KeyOfPossibleValue<Option, string | number | symbol>,
  PropValue extends KeyOfPossibleValue<Option, string | number>,
  PropText extends KeyOfPossibleValue<Option, string | number>
>({
  id,
  name,
  options,
  value,
  onChange,
  propKey,
  propValue,
  propText,
  isDirty,
  isError,
}: SelectProps<Option, PropKey, PropValue, PropText>) {
  function onChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value as Option[PropValue];
    onChange(newValue);
  }

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChangeHandler}
      className={clsx("form-input", {
        error: isDirty && isError,
      })}
    >
      {options.map((option) => (
        <option key={option[propKey]} value={option[propValue]}>
          {option[propText]}
        </option>
      ))}
    </select>
  );
}
