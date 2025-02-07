import * as React from "react";
import style from "../../styles/Page.module.css";

export interface SignupProps {
  children: React.ReactNode;
}

const SignupPage: React.FC<SignupProps> = ({ children }) => {
  return <article className={style.signup}>{children}</article>;
};
export default SignupPage;
