import * as React from "react";

export interface IAppProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  check?: boolean;
  nameTitle: string;
  change: React.ChangeEventHandler<HTMLInputElement>;
}

export function Input(props: IAppProps) {
  return (
    <div
      style={{
        display: "flex",
        width: "95%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p
        style={{
          width: "90%",
          color: "red",
          textAlign: "left",
        }}
      >
        {/* Full Name is required  */}
      </p>
      <h4
        style={{
          color: "gray",
          width: "100%",
          padding: "0 20px 0",
        }}
      >
        {props.nameTitle} <span style={{ color: "red" }}>*</span>
      </h4>
      <label>
        <input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.change}
          checked={props.check}
          required
        />
      </label>
    </div>
  );
}
