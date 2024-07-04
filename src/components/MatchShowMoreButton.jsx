import React from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import "./MatchShowMoreButton.css";

const winColour = "#2f436e";
const lossColour = "#703c47";
const winHightlight = "#5383E8";
const lossHighlight = "#e84057";

const MatchShowMoreButton = ({ outcome, clickHandler, isOpen }) => {
  const thisColour = outcome === "win" ? winColour : lossColour;
  const thisColourHighlight = outcome === "win" ? winHightlight : lossHighlight;

  return (
    <div
      className="show-more-container"
      style={{ backgroundColor: thisColour }}
    >
      <i className="pointer-hover" onClick={() => clickHandler()}>
        <IoMdArrowDropdownCircle
          fill={thisColourHighlight}
          size={20}
          style={{ transform: `${isOpen ? "rotate(180deg)" : ""}` }}
        />
      </i>
    </div>
  );
};

export default MatchShowMoreButton;
