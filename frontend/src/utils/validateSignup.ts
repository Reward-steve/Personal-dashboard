export function validateSignup(userInfo: Record<string, string>) {
  const errors: Record<string, string> = {};
  const emailRegex = /\S+@\S+\.\S+/;

  if (!userInfo.firstname) errors.firstname = "First name is required.";
  if (!userInfo.lastname) errors.lastname = "Last name is required.";
  if (!userInfo.username) errors.lastname = "Username is required.";
  if (!userInfo.email || !emailRegex.test(userInfo.email))
    errors.email = "Valid email is required.";
  if (!userInfo.password || userInfo.password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  if (!userInfo.gender) errors.gender = "Please select your gender.";
  if (!userInfo.dateOfBirth) errors.dateOfBirth = "Date of birth is required.";
  if (!userInfo.country) errors.country = "Country is required.";
  if (!userInfo.state) errors.state = "State is required.";
  if (!userInfo.city) errors.city = "City is required.";
  if (!userInfo.street) errors.street = "Street is required.";
  if (!userInfo.emergencyName)
    errors.emergencyName = "Emergency contact name is required.";
  if (!userInfo.emergencyPhone || userInfo.emergencyPhone.length < 11)
    errors.emergencyPhone = "Valid emergency phone is required.";
  if (!userInfo.relationship)
    errors.relationship = "Please select a relationship.";

  return errors;
}
