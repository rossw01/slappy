import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Match.css";

const MatchParticipants = ({ players, myId }) => {
  const [playerData, setPlayerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = players.map((player) => ({
      username: player.username,
      team: player.team,
      shots: player.stats.shots,
      goals: player.stats.goals !== undefined ? player.stats.goals : 0,
      assists: player.stats.assists,
      user_id: player.game_user_id,
    }));

    setPlayerData(data);
  }, []);

  const handlePlayerClick = (userId) => {
    navigate(`/players/${userId}`);
  };

  const buildPlayerDisplay = () => {
    const homeTeam = playerData.filter((player) => player.team === "home");
    const awayTeam = playerData.filter((player) => player.team === "away");

    return (
      <div className="team-grid">
        <div className="col">
          {homeTeam.map((player, index) => (
            <Link
              key={index}
              onClick={() => handlePlayerClick(player.user_id)}
              reloadDocument={true}
              className={player.user_id === myId ? "user-hl" : "user"}
            >
              {player.username} ({player.goals})
            </Link>
          ))}
        </div>

        <div className="col">
          {awayTeam.map((player, index) => (
            <Link
              key={index}
              onClick={() => handlePlayerClick(player.user_id)}
              reloadDocument={true}
              className={player.user_id === myId ? "user-hl" : "user"}
            >
              {player.username} ({player.goals})
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return <div>{buildPlayerDisplay()} </div>;
};

export default MatchParticipants;
