import * as React from "react";
import { ComponentProps } from "../../router/mainRoutes";
import PageIntro from "../../components/StyleComponent/PageIntroComponent";
import PageTitle from "../../components/StyleComponent/PageTitle";
import { IoHome } from "react-icons/io5";

const Profile: React.FC<ComponentProps> = ({ name }) => {
  return (
    <>
      <PageTitle Title={"Dashboard"} Icon={<IoHome />} />
      <PageIntro
        title={name}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            fermentum lectus vel arcu commodo, ac posuere nunc egestas. Donec
            nec gravida libero. Sed vel efficitur ligula, in consectetur neque.
            Sed in turpis vitae lectus fermentum fermentum. Sed vel sem ut felis
            convallis consectetur. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Donec malesuada est sed ex
            lobortis, et sagittis ipsum volutpat."
      />
    </>
  );
};
export default Profile;
