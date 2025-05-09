import { AuthHolder } from "../AuthHolder";
import logo from "../../assets/img/jwtLogo.jpg";
import { LoginForm } from "./LoginForm";
import { useLoginLogic } from "./useLoginLogic";

export default function Login(): JSX.Element {
  const {
    next,
    error,
    isLoading,
    currentUser,
    handleInputChange,
    handleUserLogin,
    handlePasswordReset,
    setNext,
  } = useLoginLogic();

  return (
    <AuthHolder logo={logo}>
      <LoginForm
        next={next}
        error={typeof error === "string" ? error : ""}
        isLoading={isLoading}
        currentUser={currentUser}
        handleInputChange={handleInputChange}
        handleUserLogin={handleUserLogin}
        handlePasswordReset={handlePasswordReset}
        setNext={setNext}
      />
    </AuthHolder>
  );
}
