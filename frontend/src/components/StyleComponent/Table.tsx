import * as React from "react";

interface appointmentProps {
  Name: string;
  Diagnosis: string;
  Time: string;
  Notes: string;
}

export default function AppointmentTable({
  Name,
  Diagnosis,
  Time,
  Notes,
}: appointmentProps) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Diagnosis</th>
            <th>Date and time</th>
            <th>Notes</th>
          </tr>
        </thead>
        {Name && Diagnosis && Time && Notes ? (
          <tbody>
            <tr>
              <td>{Name}</td>
              <td>{Diagnosis}</td>
              <td>{Time}</td>
              <td>{Notes}</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr>
              <th>No Appointment found</th>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
}
