import React, { useState } from "react";
import "@css/user/User.css";

interface Props {
  buttonName: `mine` | `recent` | `otherUser`;
  fetchActiveButton: (button: `mine` | `recent` | `otherUser`) => void;
}

export default function MenuList(props: Props) {
  return (
    <div style={{ display: "flex", height: "50px", justifyContent: "center" }}>
      <div className="user__menu">
        <div
          className={`menu__button ${
            props.buttonName === "mine" ? "active" : ""
          }`}
          onClick={() => {
            props.fetchActiveButton(`mine`);
          }}
        >
          나의 정보
        </div>
        <div
          className={`menu__button ${
            props.buttonName === "recent" ? "active" : ""
          }`}
          onClick={() => {
            props.fetchActiveButton(`recent`);
          }}
        >
          최근에 본 영상
        </div>
        <div
          className={`menu__button ${
            props.buttonName === "otherUser" ? "active" : ""
          }`}
          onClick={() => {
            props.fetchActiveButton(`otherUser`);
          }}
        >
          같은 키워드의 키독이들
        </div>
      </div>
    </div>
  );
}
