// **Reusable onChange handler**
const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setState: (
    value: React.SetStateAction<{
      firstname: string;
      lastname: string;
      username: string;
      email: string;
      password: string;
      gender: string;
      dateOfBirth: string;
      country: string;
      state: string;
      city: string;
      street: string;
      emergencyName: string;
      emergencyPhone: string;
      relationship: string;
    }>
  ) => void
) => {
  const { name, value } = e.target;
  setState((prev) => ({ ...prev, [name]: value }));
};

export default handleInputChange;
