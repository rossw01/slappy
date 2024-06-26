import React from "react";
import { ReactComponent as EuLogo } from "../assets/eu.svg";
import { ReactComponent as NaLogo } from "../assets/na.svg";
import { ReactComponent as OceLogo } from "../assets/oce.svg";
import "./Match.css";

const MatchServer = ({ serverString }) => {
  const supportedServers = ["eu", "na", "oce"];
  const parsedServerString = serverString.split("-");

  const buildServerText = () => {
    let out = "";
    if (!supportedServers.includes(parsedServerString[0])) {
      return "Unknown Server";
    }
    if (parsedServerString[0] === "oce") {
      out += "Oceania";
    } else {
      out += parsedServerString[0].toUpperCase();
    }

    out += " " + parsedServerString[1][0].toUpperCase();
    out += parsedServerString[1].substring(1);

    return out;
  };

  return (
    <div className="col">
      {parsedServerString[0] === "eu" && <EuLogo className="server-flag" />}
      {parsedServerString[0] === "na" && <NaLogo className="server-flag" />}
      {parsedServerString[0] === "oce" && <OceLogo className="server-flag" />}
      <p>{buildServerText()}</p>
    </div>
  );
};

export default MatchServer;
