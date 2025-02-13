import * as React from "react";
// import style from "../../styles/styledComponent.module.css";

export default function AppointmentTable() {
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
        <tbody>
          <tr>
            <td>Emilia Fox</td>
            <td>Eczema</td>
            <td>29/05/2023, 08.00</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
