import React, { useEffect, useState } from "react";
import { UserListData } from "../../Types/interface/user/user";
import "@css/user/User.css";
import Keyword from "../Keyword/Keyword";
import { SelectButton } from "../../Types/interface/keyword/SelectButton.interface";
import { KeywordData } from "../../Types/interface/keyword/keywordData.interface";
import { KeywordApi } from "../../scripts/keyword";

interface Props {
  userData: UserListData;
  selectedButton: SelectButton;
  setSelectedButton: React.Dispatch<React.SetStateAction<SelectButton>>;
}

export default function UserProfile(props: Props) {
  const [keyword, setKeyword] = useState<KeywordData[]>([]);

  useEffect(() => {
    const fetchKeyword = async () => {
      const keywordData = await KeywordApi.findAllByUserId(
        props.userData.userId
      );
      setKeyword(keywordData);
    };

    fetchKeyword();
  }, []);

  const handleSelectButton = (keywordId: number, keyword: string) => {
    if (props.selectedButton.keyword === keyword) {
      props.setSelectedButton({ keyword: "", keywordId: 0 });
      return;
    }

    props.setSelectedButton({ keyword, keywordId });
  };

  const goToUserPage = (userId: number) => {
    window.location.href = `/api/user?userId=${userId}`;
  };

  return (
    <div
      style={{
        flexBasis: "50%",

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
          onClick={() => {
            goToUserPage(props.userData.userId);
          }}
        />
        <p>{props.userData.userNickname}</p>
      </div>
      <div>
        <p> {props.userData.userGender}</p>
        <br />
        <p> {props.userData.userAge}</p>
        <br />
        <p> {props.userData.userJob}</p>
      </div>
      <div className="keyword__box">
        {keyword.map((keyword, idx) => {
          if (idx > 3) return;
          return (
            <Keyword
              key={keyword.keywordId}
              {...keyword}
              selectedButton={props.selectedButton.keyword}
              handleSelectButton={handleSelectButton}
            />
          );
        })}
      </div>
    </div>
  );
}
