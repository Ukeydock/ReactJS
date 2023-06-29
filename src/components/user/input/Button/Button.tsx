import React, { useState } from "react";
import "@css/Button.css";

interface Props {
  name: string;
  placeholder: string;
  isSelected: boolean;
  isExistKeyword?: boolean;
  onSelect: () => void;
}

export default function Button(props: Props) {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      className={`button ${
        props.isSelected
          ? "selected"
          : props.isExistKeyword == true
          ? "exist__keyword"
          : ""
      } ${isHover ? "hover" : ""}`}
      onClick={props.onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="button__border">
        <p className="button__text">{props.placeholder}</p>
      </div>
    </div>
  );
}
