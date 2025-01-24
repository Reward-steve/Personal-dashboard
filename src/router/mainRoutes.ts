import React from "react";

import Home from "../pages/Home/Home";
import Analytics from "../pages/Analytics/Analytics";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";

export interface PageIntroProps {
  title: string;
  description: string;
}

// Define the type for component props
export interface ComponentProps {
  name: string;
}

// Define the Router interface with props
export interface Router {
  path: string;
  element: React.FC<ComponentProps>;
  props: ComponentProps;
}

// Define the router object with components and props
const routerObject: Router[] = [
  {
    path: "/",
    element: Home,
    props: { name: "Home Page" },
  },
  {
    path: "/Analytics",
    element: Analytics,
    props: { name: "Analytics Page" },
  },
  {
    path: "/Profile",
    element: Profile,
    props: { name: "Profile Page" },
  },
  {
    path: "/Settings",
    element: Settings,
    props: { name: "to Your Settings Page!" },
  },
];

export default routerObject;
