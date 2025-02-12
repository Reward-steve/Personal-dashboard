import axios from "axios";

const API_URL = "http://localhost:5500/api";

export const getDoctersAndPatients = async () => {
  try {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
  } catch (err) {
    console.error("Error fetching doctors and patients:", err);
  }
};
export const deleteDoctorsAndPatientsById = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/users/:${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const updateDoctorAndPatientById = async (id: string) => {
  try {
    const res = await axios.put(`${API_URL}/users/:${id}`);
    return res.data;
  } catch (err) {
    console.error("Error updating users:", err);
  }
};
export const getAllAppointments = async () => {
  try {
    const res = await axios.get(`${API_URL}/appointments`);
    return res.data;
  } catch (err) {
    console.error("Error fetching appointments:", err);
  }
};
