import * as React from "react";

export interface IAppProps {
  type: string;
  placeholder: string;
  value: string;
  change: React.ChangeEventHandler<HTMLInputElement>;
}

export function Input(props: IAppProps) {
  return (
    <label>
      <input
        type={props.type}
        name="Info"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.change}
        required
      />
    </label>
  );
}
