import React, { useState } from "react";
import "@css/Button.css";
import Button from "../User/input/Button/Button";

interface props {
  keywordId: number;
  keyword: string;
  isExistKeyword?: boolean;
  selectedButton: string;
  handleSelectButton: (keywordId: number, keyword: string) => void;
}

export default function Keyword(props: props) {
  return (
    <div
      className="input_box__name"
      style={{ display: "flex", marginTop: "1rem", height: "100%" }}
    >
      <Button
        name={props.keyword}
        placeholder={props.keyword}
        isExistKeyword={props.isExistKeyword}
        isSelected={props.selectedButton === props.keyword}
        onSelect={() =>
          props.handleSelectButton(props.keywordId, props.keyword)
        }
      />
    </div>
  );
}
