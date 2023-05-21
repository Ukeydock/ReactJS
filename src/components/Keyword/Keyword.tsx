import React, { useState } from "react";
import "@css/Button.css";
import Button from "../user/input/Button/Button";

interface props {
  keywordId: number;
  keyword: string;
  selectedButton: string;
  handleSelectButton: (name: string) => void;
}

export default function Keyword(props: props) {
  return (
    <span className="input_box__name">
      <Button
        name={props.keyword}
        placeholder={props.keyword}
        isSelected={props.selectedButton === props.keyword}
        onSelect={() => props.handleSelectButton(props.keyword)}
      />
    </span>
  );
}
