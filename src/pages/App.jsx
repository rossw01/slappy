import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Logo from "../assets/logo.png";
import "./App.css";

function App() {
  const [playerId, setPlayerId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (playerId.length === 0) {
      return;
    }
    navigate(`/players/${playerId}`);
  };

  return (
    <div className="App">
      <Header />
      <div className="home-container">
        <video autoPlay muted loop playsInline className="background-video">
          <source
            src="https://slapshot.gg/img/background-gameplay.webm"
            type="video/webm"
          />
        </video>
        <div className="floating-container">
          <img src={Logo} alt="Logo" className="App-logo" />
          <p className="title">Slappy.gg</p>
          <p style={{ color: "#bbb" }}>
            Start by searching a player's unique ID to view their match history
            and stats.
          </p>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="home-search-form"
          >
            <input
              placeholder="Input Player ID"
              type="number"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="home-search-bar"
            />
            <button type="submit" className="home-search-button">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
