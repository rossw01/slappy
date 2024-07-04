import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchProfile from "../services/fetchProfile.service";
import Header from "../components/Header.jsx";
import Match from "../components/Match.jsx";
import Loading from "../components/Loading.jsx";
import ProfileSummary from "../components/ProfileSummary";
import "./Profile.css";

const Profile = () => {
  const playerId = useParams()["id"];
  const [playerInfo, setPlayerInfo] = useState({});
  const [isLoadComplete, setIsLoadComplete] = useState(false);

  useEffect(() => {
    setIsLoadComplete(false);
    if (!playerId) return;

    fetchProfile(playerId)
      .then((res) => {
        setPlayerInfo(determineWinner(res));
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [playerId]);

  useEffect(() => {
    if (playerInfo.username) {
      setIsLoadComplete(true);
    }
  }, [playerInfo]);

  const determineWinner = (playerData) => {
    if (!playerData) return;

    const myId = playerData.game_user_id;
    const matchHistory = playerData.match_history || [];

    const updatedMatchHistory = matchHistory.map((match) => {
      if (!match.game_stats) {
        return { ...match, outcome: "cancelled" };
      }

      const players = match.game_stats.players || [];
      const outcome = players.some((player) => {
        return (
          player.game_user_id === myId &&
          player.team === match.game_stats.winner
        );
      });

      return {
        ...match,
        outcome: outcome ? "win" : "loss",
      };
    });

    return {
      ...playerData,
      match_history: updatedMatchHistory,
    };
  };

  const buildMatchHistory = () => {
    return playerInfo.match_history.map((match, index) => (
      <Match data={match} myId={playerInfo.game_user_id} key={index} />
    ));
  };

  return (
    <>
      {isLoadComplete && <Header />}
      {!isLoadComplete && <Loading />}
      <div className="profile-container">
        {isLoadComplete && (
          <ProfileSummary
            username={playerInfo.username}
            matches={playerInfo?.match_history}
            playerId={playerId}
          />
        )}
        {isLoadComplete && <div>{buildMatchHistory()}</div>}
      </div>
    </>
  );
};

export default Profile;
