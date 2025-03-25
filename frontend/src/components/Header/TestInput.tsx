import { useState } from "react";

const TestInput = () => {
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
    <div style={{ padding: "20px", background: "#1e3a5f" }}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder="Search for anything"
        style={{ padding: "10px", border: "1px solid black", width: "200px" }}
      />
    </div>
  );
};

export default TestInput;
