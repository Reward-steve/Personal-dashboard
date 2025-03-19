// import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/";

import { LoginType } from "../components/Signup/Login";
import { UserTypes } from "../components/Signup/Signup";
export async function Register(body: UserTypes) {
  try {
    const response = await fetch(`${API_URL}auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export const LoginUser = async (body: LoginType) => {
  try {
    const response = await fetch(`${API_URL}auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
};
// export const deleteDoctorsAndPatientsById = async (id: string) => {
//   try {
//     const res = await axios.delete(`${API_URL}/users/:${id}`, {
//       headers: { "Content-Type": "application/json" },
//     });
//     return res.data;
//   } catch (err) {
//     console.error(err);
//   }
// };
// export const updateDoctorAndPatientById = async (id: string) => {
//   try {
//     const res = await axios.put(`${API_URL}/users/:${id}`);
//     return res.data;
//   } catch (err) {
//     console.error("Error updating users:", err);
//   }
// };
// export const getAllAppointments = async () => {
//   try {
//     const res = await axios.get(`${API_URL}/appointments`);
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching appointments:", err);
//   }
// };

// //
{
  /* */
}

/*
  {
  "name": "David Carter",
  "email": "david.carter@example.com",
  "password": "admindavid",
  "role": "Admin",
  "department": "Emergency",
  "adminRole":"SuperAdmin"
}
  */
