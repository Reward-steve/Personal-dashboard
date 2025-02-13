import * as React from "react";

import { SiGoogleanalytics } from "react-icons/si";
import PageTitle from "../../components/StyleComponent/PageTitle";
const Department: React.FC = () => {
  return (
    <>
      <PageTitle Title={"Analytics"} Icon={<SiGoogleanalytics />} />
    </>
  );
};
export default Department;
