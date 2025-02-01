import React from "react";
import Home from "../pages/Home/Home";
import Analytics from "../pages/Analytics/Analytics";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import Signup from "../pages/Signup/Signup";

export interface PageIntroProps {
  title: string;
  description: string;
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
  { path: "home", element: Home, props: { name: "Dashboard" } },
  { path: "analytics", element: Analytics, props: { name: "Analytics Page" } },
  { path: "profile", element: Profile, props: { name: "Profile Page" } },
  { path: "signup", element: Signup, props: { name: "Signup Page" } },
  { path: "settings", element: Settings, props: { name: "Settings Page" } },
];

export default routerObject;
