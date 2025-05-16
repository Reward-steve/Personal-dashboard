import { AuthHolder } from "../AuthHolder";
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
    validationErrors,
  } = useLoginLogic();

  return (
    <AuthHolder>
      <LoginForm
        next={next}
        error={typeof error === "string" ? error : ""}
        isLoading={isLoading}
        currentUser={currentUser}
        handleInputChange={handleInputChange}
        handleUserLogin={handleUserLogin}
        handlePasswordReset={handlePasswordReset}
        setNext={setNext}
        validateErrors={validationErrors || {}}
      />
    </AuthHolder>
  );
}
