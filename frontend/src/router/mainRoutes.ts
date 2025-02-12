import React from "react";
import Calender from "../pages/Calender/Calender";
import Patients from "../pages/Patients/Patients";
import StaffSchedule from "../pages/StaffSchedule/StaffSchedule";
import Settings from "../pages/Settings/Settings";
import Dashboard from "../pages/Dashboard/Dashboard";
import Doctors from "../pages/Doctors/Doctors";
import Departments from "../pages/Department/Department";
import Stock from "../pages/Stock/Stock";
import HelpCenter from "../pages/HelpCenter/HelpCenter";

export interface PageIntroProps {
  children: React.ReactNode;
}

export interface ComponentProps {
  name: string;
}

export interface Router {
  path: string;
  element: React.FC<ComponentProps>;
  props: ComponentProps;
}

// Update paths to be nested under `/dashboard`
const routerObject: Router[] = [
  { path: "dashboard", element: Dashboard, props: { name: "Dashboard" } },
  { path: "calender", element: Calender, props: { name: "Calender" } },
  { path: "patients", element: Patients, props: { name: "Patients" } },
  {
    path: "staffschedule",
    element: StaffSchedule,
    props: { name: "Staff schedule Page" },
  },
  { path: "doctors", element: Doctors, props: { name: "Doctors Page" } },
  {
    path: "departments",
    element: Departments,
    props: { name: "Departments Page" },
  },
  { path: "stock", element: Stock, props: { name: "Stock Page" } },
  { path: "settings", element: Settings, props: { name: "Settings Page" } },
  {
    path: "helpcenter",
    element: HelpCenter,
    props: { name: "Help Center Page" },
  },
];

export default routerObject;
