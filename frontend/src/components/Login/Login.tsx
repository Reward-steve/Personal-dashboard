import StatusCard from "../../components/StatusCard";
import { AuthHolder } from "../AuthHolder";
import { LoginForm } from "./LoginForm";
import { useLoginLogic } from "./useLoginLogic";

export default function Login(): JSX.Element {
  const {
    next,
    error,
    serverError,
    isLoading,
    currentUser,
    handleInputChange,
    handleUserLogin,
    handlePasswordReset,
    setNext,
    validationErrors,
    successMessage,
    setError,
    setSuccessMessage,
  } = useLoginLogic();

  return (
    <AuthHolder>
      {error && (
        <StatusCard
          type="error"
          message={typeof error === "string" ? error : ""}
          onClose={() => setError(undefined)}
        />
      )}
      {successMessage && (
        <StatusCard
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}

      <LoginForm
        next={next}
        error={typeof error === "string" ? error : ""}
        serverError={typeof serverError === "string" ? serverError : ""}
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
