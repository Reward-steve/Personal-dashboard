export type BasicInfoProps = {
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    gender: string;
    dateOfBirth: string;
  };
  errors: {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    gender?: string;
    dateOfBirth?: string;
  };
  step: () => void;
};
export type DetailsFormProps = {
  change: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  value: {
    country: string;
    state: string;
    city: string;
    street: string;
    emergencyName: string;
    emergencyPhone: string;
    relationship: string;
  };
  errors: {
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    emergencyName?: string;
    emergencyPhone?: string;
    relationship?: string;
  };
  step: () => void;
  isLoading: boolean;
};
