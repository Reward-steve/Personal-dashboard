import React from "react";
import Calender from "./Calender";
import Patients from "./Patients";
import StaffSchedule from "./StaffSchedule";
import Settings from "./Settings";
import Dashboard from "./Dashboard";
import Doctors from "./Doctors";
import Departments from "./Department";
import Stock from "./Stock";
import HelpCenter from "./HelpCenter";
import Logout from "../../components/Auth/Logout";

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
  {
    path: "logout",
    element: Logout,
    props: { name: "Help Center Page" },
  },
];

export default routerObject;
