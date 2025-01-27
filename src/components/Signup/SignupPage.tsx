import * as React from "react";

export interface SignupProps {
  children: React.ReactNode;
}

const SignupPage: React.FC<SignupProps> = ({ children }) => {
  return <div>{children}</div>;
};
export default SignupPage;
