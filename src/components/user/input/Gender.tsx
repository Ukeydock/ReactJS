import React, { useState } from "react";
import "@css/Button.css";

interface Props {
  name: string;
  placeholder: string;
  isSelected: boolean;
  onSelect: () => void;
}

const Button: React.FC<Props> = ({
  name,
  placeholder,
  isSelected,
  onSelect,
}) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      className={`button ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="button__border">
        <p className="button__text">{isSelected ? name : placeholder}</p>
      </div>
    </div>
  );
};

interface props {
  handleInputChange: (e: { key: string; value: string }) => void;
  handleCanSubmit: (e: { key: string; value: boolean }) => void;
}

export default function Gender(props: props) {
  const [selectedButton, setSelectedButton] = useState<string>("");

  const handleSelectButton = (name: string) => {
    setSelectedButton(name);
    props.handleInputChange({ key: "gender", value: name });
    props.handleCanSubmit({ key: "gender", value: true });
  };

  return (
    <div>
      <p className="input_box__name">성별</p>
      <div className="button-group">
        <Button
          name="남자"
          placeholder="남자"
          isSelected={selectedButton === "남자"}
          onSelect={() => handleSelectButton("남자")}
        />
        <Button
          name="여자"
          placeholder="여자"
          isSelected={selectedButton === "여자"}
          onSelect={() => handleSelectButton("여자")}
        />
        <Button
          name="선택안함"
          placeholder="선택안함"
          isSelected={selectedButton === "선택안함"}
          onSelect={() => handleSelectButton("선택안함")}
        />
      </div>
    </div>
  );
}
