import React from "react";
import { useState } from "react";

const winBgColour = "#5AD";
const lossBgColour = "#D44";
const abortBgColour = "#888";

const Match = ({ data, myName, key }) => {
  const [isCancelled] = useState(data["game_stats"] == null);

  const determineOutcome = () => {
    if (isCancelled) return abortBgColour;
    let colour = lossBgColour;
    const players = data["game_stats"]["players"];
    players.forEach((player) => {
      if (
        player.username == myName &&
        player.team == data["game_stats"]["winner"]
      ) {
        colour = winBgColour;
      }
    });
    return colour;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
        backgroundColor: determineOutcome(),
      }}
    >
      <p>{data["region"]} </p>
      <p>{isCancelled ? "Match Cancelled" : data["game_stats"]["arena"]}</p>
    </div>
  );
};

export default Match;
