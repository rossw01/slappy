import React, { useState } from "react";
import MatchParticipants from "./MatchParticipants.jsx";
import MatchShowMoreButton from "./MatchShowMoreButton.jsx";
import MatchServer from "./MatchServer.jsx";
import MatchStats from "./MatchStats";
import MatchAdditionalStats from "./MatchAdditionalStats.jsx";
import "./Match.css";

const winBgColour = "#28344e";
const lossBgColour = "#693840";
const abortBgColour = "#585858";

const Match = ({ data, myId }) => {
  const players = data?.game_stats?.players || [];
  const myPlayer = players.find((player) => player.game_user_id === myId);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatBackgroundColor = (outcome) => {
    if (outcome === "cancelled" || !outcome) {
      return abortBgColour;
    } else if (outcome === "win") {
      return winBgColour;
    } else {
      return lossBgColour;
    }
  };

  const formatScore = () => {
    if (data.outcome === "cancelled") return "";
    const separatorGlyph = "-";
    const score = data?.game_stats?.score;
    if (!score) {
      return "Unscored";
    }
    return `${score.home} ${separatorGlyph} ${score.away}`;
  };

  const formatMatchType = (matchTypeStr) => {
    return matchTypeStr.charAt(0).toUpperCase() + matchTypeStr.slice(1);
  };

  const formatMatchTime = (totalSeconds) => {
    if (!totalSeconds) {
      return "0s";
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const formatMatchOutcome = (outcome) => {
    if (outcome === "win") {
      return "Victory";
    }
    if (outcome === "loss") {
      return "Defeat";
    } else {
      return "Unscored";
    }
  };

  const formatOutcomeFontColour = (outcome) => {
    if (outcome === "win") {
      return "p-hl-blue";
    }
    if (outcome === "loss") {
      return "p-hl-red";
    } else {
      return "p-hl-gray";
    }
  };

  const formatStatsObject = () => {
    return {
      goals: myPlayer?.stats.goals || 0,
      assists: myPlayer?.stats.assists || 0,
      saves: myPlayer?.stats.saves || 0,
    };
  };

  const isMvp = () => {
    const myScore = myPlayer?.stats.score || 0;
    let isMax = true;

    if (myScore === 0) {
      return false;
    }

    players.forEach((player) => {
      if (player.game_user_id !== myId && player.stats.score > myScore) {
        isMax = false;
      }
    });

    return isMax;
  };

  const handleExpandClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <div
        className={`match-container ${
          isExpanded ? "match-container-open" : ""
        }`}
        style={{ backgroundColor: formatBackgroundColor(data.outcome) }}
      >
        <div className="col w-100">
          <div className="match-content">
            <div>
              <p className={`p-bold ${formatOutcomeFontColour(data.outcome)}`}>
                {formatMatchType(data.match_type)}
              </p>
              <p>{data.created.substring(0, 10)}</p>
              {data.outcome && <div className="divider" />}
              <p className={`p-bold ${formatOutcomeFontColour(data.outcome)}`}>
                {formatMatchOutcome(data.outcome)}
              </p>
              {data.outcome && (
                <p>{formatMatchTime(data?.game_stats?.match_length)}</p>
              )}
            </div>
            <div className="match-server-container">
              <MatchServer serverString={data.region} />
              <p>
                {data.outcome === "cancelled"
                  ? "Match Cancelled"
                  : data?.game_stats?.arena}
              </p>
            </div>
            <MatchStats stats={formatStatsObject()} />
            <div className="match-score-container">
              <p className="match-score">{formatScore()}</p>
              {isMvp() === true && <p className="mvp">MVP</p>}
            </div>
            {data.game_stats?.players && (
              <MatchParticipants
                players={data.game_stats.players}
                myId={myId}
              />
            )}
          </div>
          {isExpanded && (
            <div>
              <MatchAdditionalStats players={players} />
            </div>
          )}
        </div>
        {data.outcome !== "cancelled" && (
          <MatchShowMoreButton
            outcome={data.outcome}
            clickHandler={() => handleExpandClick()}
            isOpen={isExpanded}
          />
        )}
      </div>
    </div>
  );
};

export default Match;
