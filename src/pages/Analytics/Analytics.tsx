import * as React from "react";
import { ComponentProps } from "../../router/mainRoutes";
import PageIntro from "../../components/StyleComponent/PageIntroComponent";

const Profile: React.FC<ComponentProps> = ({ name }) => {
  return (
    <PageIntro
      title={name}
      description="
        This is where you can make the experience truly yours.
        Customize the background image to reflect your personality or mood,
        and fine-tune the text color to ensure everything feels just right.
        Explore the options and create a look that’s uniquely you!"
    />
  );
};
export default Profile;
