import React from "react";

import BackgroundPicker from "../../components/StyleComponent/SideComponent";
import { IoSettingsSharp } from "react-icons/io5";
import PageTitle from "../../components/StyleComponent/PageTitle";

const Profile: React.FC = () => {
  return (
    <>
      <PageTitle Title={"Setting"} Icon={<IoSettingsSharp />} />

      <BackgroundPicker />
    </>
  );
};
export default Profile;
