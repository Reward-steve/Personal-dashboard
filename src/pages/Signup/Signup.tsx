import * as React from "react";
import { ComponentProps } from "../../router/mainRoutes";
import PageTitle from "../../components/StyleComponent/PageTitle";
import { FaSignInAlt } from "react-icons/fa";
import SignupPage from "../../components/Signup/SignupPage";
import SignupForm from "../../components/Signup/SignupForm";

const Signup: React.FC<ComponentProps> = () => {
  return (
    <>
      <PageTitle Title={"Sign-up"} Icon={<FaSignInAlt />} />
      <SignupPage>
        <SignupForm />
      </SignupPage>
    </>
  );
};
export default Signup;
