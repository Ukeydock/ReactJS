import React, { useState } from "react";
import "@css/Button.css";
import Button from "./Button/Button";

interface props {
  handleInputChange: (e: { key: string; value: string }) => void;
  handleCanSubmit: (e: { key: string; value: boolean }) => void;
}

export default function Gender(props: props) {
  const [selectedButton, setSelectedButton] = useState<string>("");

  const handleSelectButton = (name: string) => {
    if (selectedButton === name) {
      setSelectedButton("");

      props.handleInputChange({ key: "gender", value: "" });
      props.handleCanSubmit({ key: "gender", value: false });
      return;
    }

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
          isSelected={selectedButton === "man"}
          onSelect={() => handleSelectButton("man")}
        />
        <Button
          name="여자"
          placeholder="여자"
          isSelected={selectedButton === "women"}
          onSelect={() => handleSelectButton("women")}
        />
        <Button
          name="선택안함"
          placeholder="선택안함"
          isSelected={selectedButton === "none"}
          onSelect={() => handleSelectButton("none")}
        />
      </div>
    </div>
  );
}
