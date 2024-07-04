import React, { useState } from "react";
import Logo from "../assets/logo.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [inputtedUserId, setInputtedUserId] = useState("");

  const onLogoClick = () => {
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputtedUserId === "") {
      return;
    }
    navigate(`/players/${inputtedUserId}`);
  };

  return (
    <div className="header-container">
      <a onClick={() => onLogoClick()} className="header-logo">
        <img className="logo-img" src={Logo} />
        <p className="logo-label">SLAPPY.GG</p>
      </a>
      <form
        className="search-container"
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          type="number"
          className="search-input"
          placeholder="Input PlayerID (Numbers only)"
          onChange={(e) => setInputtedUserId(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default Header;
