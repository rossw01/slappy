import React from "react";
import { useState } from "react";
import "./Match.css";

const winBgColour = "#28344e";
const lossBgColour = "#693840";
const abortBgColour = "#585858";

const Match = ({ data, myName }) => {
  console.log(data);
  const [isCancelled] = useState(data["game_stats"] == null);
  let myTeam = "";
  let result = "";

  const determineOutcome = () => {
    if (isCancelled) return abortBgColour;
    let colour = lossBgColour;
    result = "Defeat";
    const players = data["game_stats"]["players"];
    players.forEach((player) => {
      if (player.username == myName) {
        myTeam = player.team;
        if (player.team == data["game_stats"]["winner"]) {
          colour = winBgColour;
          result = "Victory";
        }
      }
    });
    return colour;
  };

  const formatScore = () => {
    if (isCancelled) return "";
    const separatorGlyph = "-";
    const score = data["game_stats"]["score"];
    if (myTeam == "home") {
      return `${score["home"]} ${separatorGlyph} ${score["away"]}`;
    }
    return `${score["away"]} ${separatorGlyph} ${score["home"]}`;
  };

  const formatMatchType = (matchTypeStr) => {
    return matchTypeStr[0].toUpperCase() + matchTypeStr.substring(1);
  };

  const formatMatchTime = (totalSeconds) => {
    return (
      Math.floor(totalSeconds / 60) +
      "m " +
      (totalSeconds % 60 ? (totalSeconds % 60) + "s" : "00s")
    );
  };

  const formatGoals = () => {};

  return (
    <div
      className="match-container"
      style={{ backgroundColor: determineOutcome() }}
    >
      <div>
        <p
          className={`p-bold ${
            result == "Victory"
              ? "p-hl-blue"
              : result == "Defeat"
              ? "p-hl-red"
              : "p-hl-gray"
          }`}
        >
          {formatMatchType(data["match_type"])}
        </p>
        <p>{data["created"].substring(0, 10)}</p>
        {result && <div className="divider" />}
        <p
          className={`p-bold ${result == "Victory" ? "p-hl-blue" : "p-hl-red"}`}
        >
          {result}
        </p>
        {!isCancelled && (
          <p>{formatMatchTime(data["game_stats"]["match_length"])}</p>
        )}
      </div>
      <p>{data["region"]} </p>
      <p>{isCancelled ? "Match Cancelled" : data["game_stats"]["arena"]}</p>
      <div className="match-score">
        <p>{formatScore()}</p>
      </div>
    </div>
  );
};

export default Match;
