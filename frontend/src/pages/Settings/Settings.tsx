import React from "react";
import { ComponentProps } from "../../router/mainRoutes";
import PageIntro from "../../components/StyleComponent/PageIntroComponent";
import BackgroundPicker from "../../components/StyleComponent/BackgroundPicker";
import { IoSettingsSharp } from "react-icons/io5";
import PageTitle from "../../components/StyleComponent/PageTitle";

const Profile: React.FC<ComponentProps> = ({ name }) => {
  return (
    <>
      <PageTitle Title={"Setting"} Icon={<IoSettingsSharp />} />
      <PageIntro
        title={name}
        description="
        This is where you can make the experience truly yours.
        Customize the background image to reflect your personality or mood,
        and fine-tune the text color to ensure everything feels just right.
        Explore the options and create a look that’s uniquely you!"
      />
      <BackgroundPicker
        title={"Background Picker"}
        content={
          "Choose a background image for your profile page. Select from the options below or upload your own image."
        }
      />
    </>
  );
};
export default Profile;
