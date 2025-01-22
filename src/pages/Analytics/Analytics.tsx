import * as React from "react";
import { ComponentProps } from "../../router/mainRoutes";

const Profile: React.FC<ComponentProps> = ({ name }) => {
  return (
    <div>
      <h1>Welcome {name}</h1>
    </div>
  );
};
export default Profile;
