import React, { useEffect, useState } from "react";
import PlayerIcon from "../assets/player-icon.png";
import { useNavigate, Link } from "react-router-dom";
import "./RecentPlayers.css";

const RecentPlayers = ({ playerId, matchHistory }) => {
  const [recentPlayersList, setRecentPlayersList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const parseRecentPlayers = () => {
    if (!matchHistory) {
      return;
    }

    const teammates = {};

    matchHistory.forEach((match) => {
      if (match.outcome === "cancelled") {
        return;
      }

      const team = match.game_stats.players.find(
        (player) => player.game_user_id === playerId,
      )?.team;
      if (!team) {
        return;
      }

      match.game_stats.players.forEach((player) => {
        if (player.team === team && player.game_user_id !== playerId) {
          if (!teammates[player.game_user_id]) {
            teammates[player.game_user_id] = {
              game_user_id: player.game_user_id,
              username: player.username ? player.username : "Unknown",
              totalGames: 0,
              wins: 0,
              losses: 0,
            };
          }
          teammates[player.game_user_id].totalGames += 1;

          if (match.outcome === "win") {
            teammates[player.game_user_id].wins += 1;
          } else {
            teammates[player.game_user_id].losses += 1;
          }
        }
      });
    });

    // Now filter out those with only 1 game played with the user
    const teammatesList = Object.values(teammates);
    const filteredTeammatesList = teammatesList.filter(
      (player) => player.totalGames > 1,
    );
    setRecentPlayersList(
      filteredTeammatesList.sort((a, b) => b.totalGames - a.totalGames),
    );
  };

  const buildRecentPlayersList = () => {
    if (!recentPlayersList) {
      return null;
    }
    return recentPlayersList.map((player, index) => (
      <div key={index} className="players-grid">
        <div className="user">
          <img src={PlayerIcon} className="user-icon" />
          <Link
            onClick={() => handlePlayerClick(player.game_user_id)}
            reloadDocument={true}
          >
            {player.username}
          </Link>
        </div>
        <p>{player.totalGames}</p>
        <p>
          {player.wins} - {player.losses}
        </p>
        <p>{((player.wins / player.totalGames) * 100).toFixed(0)}%</p>
      </div>
    ));
  };

  const handlePlayerClick = (userId) => {
    navigate(`/players/${userId}`);
  };

  useEffect(() => {
    if (recentPlayersList) {
      setIsLoaded(true);
    }
  }, [recentPlayersList]);

  useEffect(() => {
    parseRecentPlayers();
  }, []);

  return (
    <div className="recent-players-container">
      <p className="recent-players-header">Recent Teammates</p>
      <div className="players-grid">
        <p>Username</p>
        <p>Played</p>
        <p>W - L</p>
        <p>Winrate</p>
      </div>
      <div>{isLoaded && buildRecentPlayersList()}</div>
    </div>
  );
};

export default RecentPlayers;
