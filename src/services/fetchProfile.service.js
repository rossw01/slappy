import axios from "axios";

const fetchProfile = async (id) => {
  const proxy = "http://localhost:8080/";
  const url = `${proxy}https://slapshot.gg/api/game/players/${id}`;
  return await fetch(url).then((res) => res.json());
};

export default fetchProfile;
