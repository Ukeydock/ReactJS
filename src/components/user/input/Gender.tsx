import React, { useEffect, useState } from "react";
import "@css/Button.css";
import Button from "./Button/Button";

interface props {
  gender?: string;
  handleInputChange: (e: { key: string; value: string }) => void;
  handleCanSubmit: (e: { key: string; value: boolean }) => void;
}

export default function Gender(props: props) {
  const [selectedButton, setSelectedButton] = useState<string>(props.gender ? props.gender : "");



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
          name="man"
          placeholder="남자"
          isSelected={selectedButton === "man"}
          onSelect={() => handleSelectButton("man")}
        />
        <Button
          name="women"
          placeholder="여자"
          isSelected={selectedButton === "women"}
          onSelect={() => handleSelectButton("women")}
        />
        <Button
          name="none"
          placeholder="선택안함"
          isSelected={selectedButton === "none"}
          onSelect={() => handleSelectButton("none")}
        />
      </div>
    </div>
  );
}
