import React from "react";
import { FaHockeyPuck } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FaShield } from "react-icons/fa6";
import "./MatchStats.css";

const MatchStats = ({ stats }) => {
  return (
    <div className="stat-container">
      <div className="stat-row">
        <FaHockeyPuck color="lightgray" />
        <p>{`${stats.goals} ${stats.goals !== 1 ? "Goals" : "Goal"}`}</p>
      </div>
      <div className="stat-row">
        <FaHandshakeSimple color="lightgray" />
        <p>{`${stats.assists} ${
          stats.assists !== 1 ? "Assists" : "Assist"
        }`}</p>
      </div>
      <div className="stat-row">
        <FaShield color="lightgray" />
        <p>{`${stats.saves} ${stats.saves !== 1 ? "Saves" : "Save"}`}</p>
      </div>
    </div>
  );
};

export default MatchStats;
