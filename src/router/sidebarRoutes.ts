// Define the Router interface with props
export interface Router {
  to: string;
  name: string;
}

// Define the router object with components and props
const navLinkRouter: Router[] = [
  {
    to: "/",
    name: "Home🏠",
  },
  {
    to: "/Analytics",
    name: "Analytics",
  },
  {
    to: "/Profile",
    name: "Profile 👤",
  },
  {
    to: "/Settings",
    name: "Settings ⚒️",
  },
];

export default navLinkRouter;
