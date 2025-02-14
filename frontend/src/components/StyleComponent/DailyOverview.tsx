import * as React from "react";
import SideComponent from "../../components/StyleComponent/SideComponent";
import { IconType } from "react-icons";

interface DailyOverviewProps {
  cl: string;
  Icon: IconType;
  Result: string;
  Details: string;
}

export default function DailyOverview({
  cl,
  Icon,
  Result,
  Details,
}: DailyOverviewProps) {
  return (
    <>
      <SideComponent width="25%">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <div>{<Icon style={{ color: cl, fontSize: "2em" }} />}</div>
          <div>
            <h2>{Result}</h2>
            <p style={{ fontWeight: "lighter", color: "gainsboro" }}>
              {Details}
            </p>
          </div>
        </div>
      </SideComponent>
    </>
  );
}
