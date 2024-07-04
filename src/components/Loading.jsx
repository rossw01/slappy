import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import "./Loading.css";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState("Loading.");

  useEffect(() => {
    const texts = ["Loading.", "Loading..", "Loading..."];
    let index = 0;

    const interval = setInterval(() => {
      setLoadingText(texts[index]);
      index = (index + 1) % texts.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <img className="anim-rotate" src={Logo} />
      <p className="loading-label">{loadingText}</p>

      <div className="loading-back-home">
        <p>Taking a while?</p>
        <button onClick={() => navigate("/")} className="home-button">
          Take me home!
        </button>
      </div>
    </div>
  );
};

export default Loading;
