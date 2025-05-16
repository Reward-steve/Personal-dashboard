import * as React from "react";

import { SiGoogleanalytics } from "react-icons/si";
import PageTitle from "../../components/StyleComponent/PageTitle";
const Stock: React.FC = () => {
  return (
    <>
      <PageTitle Title={"Analytics"} Icon={<SiGoogleanalytics />} />
    </>
  );
};
export default Stock;
