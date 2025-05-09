import { ValidationErrors, LoginType } from "../components/Login/types";
export const validateLoginForm = (user: LoginType, isReset: boolean) => {
  const errors: ValidationErrors = {};

  if (!user.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = "Invalid email format.";
  }

  if (!isReset) {
    if (!user.password) {
      errors.password = "Password is required.";
    } else if (user.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};
