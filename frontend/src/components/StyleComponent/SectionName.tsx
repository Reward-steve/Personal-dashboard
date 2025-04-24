import * as React from "react";
type PropName = {
  Name: string;
};
function SectionName({ Name }: PropName): JSX.Element {
  return (
    <header
      style={{
        textAlign: "left",
        width: "100%",
        padding: "15px 10px",
        color: "#1e3a5f",
      }}
    >
      <h1>{Name}</h1>
    </header>
  );
}
export default SectionName;
