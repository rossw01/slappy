import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchProfile from "../services/fetchProfile.service";
import Match from "../components/Match.jsx";

const Profile = () => {
  const playerId = useParams()["id"];
  const [playerInfo, setPlayerInfo] = useState({});
  const [isLoadComplete, setIsLoadComplete] = useState(false);

  useEffect(() => {
    if (playerId.length == 0 || playerId == undefined || isLoadComplete) return;
    console.log(`Fetching match history for player: ${playerId}`);
    fetchProfile(playerId).then((res) => setPlayerInfo(res));
  }, [playerId]);

  useEffect(() => {
    console.log(playerInfo);
    if (playerInfo === undefined || !playerInfo.hasOwnProperty("username")) {
      return;
    }
    setIsLoadComplete(true);
    console.log(playerInfo);
  }, [playerInfo]);

  const buildMatchHistory = () => {
    return playerInfo["match_history"].map((match, i) => (
      <Match data={match} myName={playerInfo["username"]} key={i} />
    ));
  };

  return (
    <div>
      {isLoadComplete && (
        <div>
          <p>{playerInfo["username"]}</p>
          {buildMatchHistory()}
        </div>
      )}
    </div>
  );
};

export default Profile;
