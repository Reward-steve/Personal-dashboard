import * as React from "react";

export interface IAppProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  change: React.ChangeEventHandler<HTMLInputElement>;
}

export function Input(props: IAppProps) {
  return (
    <label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.change}
        required
      />
    </label>
  );
}
