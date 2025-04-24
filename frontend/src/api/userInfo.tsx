import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
const UserInfo = () => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { _id: "", adminRole: "", name: "", email: "", role: "" };
  });

  const { data } = useApi() as {
    data: {
      data: {
        user: {
          _id: string;
          adminRole: string;
          name: string;
          email: string;
          role: string;
        };
      };
    };
  };

  useEffect(() => {
    async function getToken() {
      if (await data!.data.user) {
        setUser(data!.data.user);
        sessionStorage.setItem("user", JSON.stringify(data!.data.user));
        console.log("Updated User from API:", data?.data?.user);
      }
    }
    getToken();
  }, [data]);
  return user;
};

export default UserInfo;
