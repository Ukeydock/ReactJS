import React, { useState } from "react";
import { UserListData } from "../Types/interface/user/user";
import "@css/user/User.css";
import Keyword from "../Keyword/Keyword";
import { SelectButton } from "../Types/interface/keyword/SelectButton";

interface Props {
  userData: UserListData;
}

const testKeywordData = [
  {
    keywordId: 1,
    keyword: "test",
  },
  {
    keywordId: 2,
    keyword: "testKeyword2",
  },
  {
    keywordId: 3,
    keyword: "testKeyword3",
  },
  {
    keywordId: 4,
    keyword: "testKeyword4",
  },
  {
    keywordId: 5,
    keyword: "testKeyword5",
  },
  {
    keywordId: 6,
    keyword: "testKeyword6",
  },
  {
    keywordId: 7,
    keyword: "testKeyword7",
  },
];

export default function UserProfile(props: Props) {
  const [selectedButton, setSelectedButton] = useState<SelectButton>({
    keyword: "",
    keywordId: 0,
  });

  const handleSelectButton = (keywordId: number, keyword: string) => {
    if (selectedButton.keyword === keyword) {
      setSelectedButton({ keyword: "", keywordId: 0 });
      return;
    }

    setSelectedButton({ keyword, keywordId });
  };

  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        backgroundColor: "#222222",
        border: "2px solid #333333",
      }}
    >
      <div>
        <img
          className="avatar"
          src={props.userData.userProfileImage}
          alt="userProfile"
        />
        <p>{props.userData.userNickname}</p>
      </div>
      <div style={{ display: "flex", flexFlow: "wrap" }}>
        <p> {props.userData.userGender}</p>
        <p> {props.userData.userAge}</p>
        <p> {props.userData.userJob}</p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexFlow: "wrap",
          marginLeft: "10px",
          color: "black",
        }}
      >
        {testKeywordData.map((keyword) => (
          <Keyword
            {...keyword}
            selectedButton={selectedButton.keyword}
            handleSelectButton={handleSelectButton}
          />
        ))}
      </div>
    </div>
  );
}
