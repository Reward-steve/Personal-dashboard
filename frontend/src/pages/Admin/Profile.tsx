import * as React from "react";

import PageTitle from "../../components/StyleComponent/PageTitle";
import { FaUser } from "react-icons/fa";

const Profile: React.FC = () => {
  return (
    <>
      <PageTitle Title="Profile" Icon={<FaUser />} />
    </>
  );
};
export default Profile;
