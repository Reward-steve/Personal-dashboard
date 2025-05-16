import React from "react";
import { IoSettingsSharp } from "react-icons/io5";
import PageTitle from "../StyleComponent/PageTitle";

const Profile: React.FC = () => {
  return (
    <>
      <PageTitle Title={"Setting"} Icon={<IoSettingsSharp />} />
    </>
  );
};
export default Profile;
