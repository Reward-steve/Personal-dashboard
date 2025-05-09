import * as React from "react";

import { SiGoogleanalytics } from "react-icons/si";
import PageTitle from "../../components/StyleComponent/PageTitle";
const LogoutPage: React.FC = () => {
  return (
    <>
      <PageTitle Title={"Logout"} Icon={<SiGoogleanalytics />} />
    </>
  );
};
export default LogoutPage;
