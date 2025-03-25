import { useState } from "react";
import img from "../../assets/img/jwtLogo.jpg";
import { FaBell } from "react-icons/fa";
import Dropdown from "./Dropdown";

interface countType {
  count: string;
}

const Header = ({ count }: countType) => {
  const [active, setActive] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", e.target.value);
    setInput(e.target.value);
  };

  const handleInputClick = () => {
    console.log("Input clicked");
    setInput("");
  };

  return (
    <nav>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          background: "#1e3a5f",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder="Search for anything"
          style={{ padding: "10px", border: "1px solid black", width: "200px" }}
        />
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            setActive(!active);
          }}
        >
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            <li style={{ marginRight: "10px" }}>
              <img
                src={img}
                alt={"altImg"}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            </li>
            <li
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              visit profile
              <h4 style={{ margin: 0, color: "white" }}>Dr.kawasaki</h4>
            </li>
            {active && <Dropdown />}
          </ul>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ position: "relative", marginRight: "10px" }}>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background: "red",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              {count}
            </div>
            <FaBell size={25} />
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Header;
