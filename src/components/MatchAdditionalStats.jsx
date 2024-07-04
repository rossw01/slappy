import React from "react";
import "./Match.css";
import "./MatchAdditionalStats.css";

const MatchAdditionalStats = ({ players }) => {
  const statLabels = [
    "Goals",
    "Assists",
    "Possession",
    "Passes",
    "Takeaways",
    "Turnovers",
    "Score",
  ];

  const formatUsername = (username) => {
    if (username === undefined) return "Unknown";

    const maxLength = 9;

    if (username.length <= maxLength) {
      return username;
    } else {
      const usernameFirstWord = username.split(" ")[0];

      if (usernameFirstWord.length <= maxLength) {
        return usernameFirstWord;
      }

      return username.substring(0, maxLength - 1) + "..";
    }
  };

  const buildLabels = () => {
    return statLabels.map((label, i) => (
      <div key={i} className="grid-item label-cell">
        <p>{label}</p>
      </div>
    ));
  };

  const buildStats = () => {
    if (!players || !Array.isArray(players)) {
      return null; // Return null or other fallback if players is not valid
    }
    return players.map((player, i) => (
      <React.Fragment key={i}>
        <p className="username-label-cell">
          {formatUsername(player?.username || "")}
        </p>
        <div className="grid-item">
          <p>{player?.stats?.goals || 0}</p>
        </div>
        <div className="grid-item">
          <p>{player?.stats?.assists || 0}</p>
        </div>
        <div className="grid-item">
          <p>{player?.stats?.possession_time_sec || 0}s</p>
        </div>
        <div className="grid-item">
          <p>{player?.stats?.passes || 0}</p>
        </div>
        <div className="grid-item">
          <p>{player?.stats?.takeaways || 0}</p>
        </div>
        <div className="grid-item">
          <p>{player?.stats?.turnovers || 0}</p>
        </div>
        <div className="grid-item">
          <p>{player?.stats?.score || 0}</p>
        </div>
      </React.Fragment>
    ));
  };

  return (
    <div className="grid-container">
      <div className="grid-item empty-cell"></div>
      {buildLabels()}
      {buildStats()}
    </div>
  );
};

export default MatchAdditionalStats;
