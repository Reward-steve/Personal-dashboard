import * as React from "react";
import style from "../styles/Authpages.module.css";
import { FaInfoCircle } from "react-icons/fa";
export interface IAppProps {
  type: string;
  name: string;
  style?: string;
  placeholder?: string;
  value: string;
  check?: boolean;
  nameTitle: string;
  errorMessage?: string;
  change: React.ChangeEventHandler<HTMLInputElement>;
}

export function Input(props: IAppProps) {
  return (
    <div className={style.inputGroup}>
      <label htmlFor={props.name}>
        {props.nameTitle} <span style={{ color: "red" }}>*</span>
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.change}
        checked={props.check}
      />
      {props.errorMessage && (
        <p className={style.errorText}>
          <FaInfoCircle size={20} />
          {props.errorMessage}
        </p>
      )}
    </div>
  );
}
