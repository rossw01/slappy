import React from "react";
import { useEffect, useState } from "react";
import PlayerIcon from "../assets/player-icon.png";
import { PieChart, Pie, Label } from "recharts";
import RecentPlayers from "./RecentPlayers.jsx";
import "./ProfileSummary.css";

const ProfileSummary = ({ username, matches, playerId }) => {
  const [matchResultArray, setMatchResultArray] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const buildMatchResultArray = (matches) => {
    let winCount = 0;
    let lossCount = 0;

    matches.forEach((match) => {
      if (match.outcome === "win") {
        winCount++;
      } else if (match.outcome === "loss") {
        lossCount++;
      }
    });

    if (winCount + lossCount === 0) return [];
    setMatchResultArray([
      { outcome: "win", value: winCount, fill: "#5383E8" },
      { outcome: "loss", value: lossCount, fill: "#E84057" },
    ]);
  };

  const calculateWinrate = (wins, losses) => {
    const decimalPlaces = 0;
    const totalGames = wins + losses;
    return ((wins / totalGames) * 100).toFixed(decimalPlaces);
  };

  useEffect(() => {
    if (matches) {
      buildMatchResultArray(matches);
    }
  }, []);

  useEffect(() => {
    if (matchResultArray !== null) {
      setIsLoaded(true);
    }
  }, [matchResultArray]);

  return (
    isLoaded && (
      <div className="sidebar-container">
        <div className="profile-summary-container">
          <div className="icon-name-container">
            <img src={PlayerIcon} className="profile-summary-icon" />
            <p className="profile-summary-username">{username}</p>
          </div>
          <div className="recent-summary-container">
            <p className="match-summary-label">Recent Matches:</p>
            {matchResultArray.length > 0 ? (
              <PieChart width={88} height={88}>
                <Pie
                  data={matchResultArray}
                  dataKey="value"
                  innerRadius={25}
                  outerRadius={40}
                  startAngle={90}
                  endAngle={-270}
                  fill="fill"
                  stroke="none"
                >
                  <Label
                    position="center"
                    className="winrate-label"
                    value={`${calculateWinrate(
                      matchResultArray[0].value,
                      matchResultArray[1].value,
                    )}%`}
                  />
                </Pie>
              </PieChart>
            ) : (
              <p>No matches on record.</p>
            )}

            <p>{`${matchResultArray[0].value}W ${matchResultArray[1].value}L`}</p>
          </div>
        </div>
        <RecentPlayers playerId={playerId} matchHistory={matches} />
      </div>
    )
  );
};

export default ProfileSummary;
