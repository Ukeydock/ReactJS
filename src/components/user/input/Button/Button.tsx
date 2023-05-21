import React, { useState } from "react";

interface Props {
  name: string;
  placeholder: string;
  isSelected: boolean;
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
      className={`button ${props.isSelected ? "selected" : ""}`}
      onClick={props.onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="button__border">
        <p className="button__text">
          {props.isSelected ? props.name : props.placeholder}
        </p>
      </div>
    </div>
  );
}
