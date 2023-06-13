import React, { useEffect, useState } from "react";
import { UserListData } from "../../Types/interface/user/user";
import UserProfile from "./UserProfile";
import { SelectButton } from "../../Types/interface/keyword/SelectButton.interface";
import { KeywordData } from "../../Types/interface/keyword/keywordData.interface";

interface Props {
  userData: UserListData[];
  setKeywordInModal: (keywordData: KeywordData) => void;
}

export default function UserList(props: Props) {
  const [selectedButton, setSelectedButton] = useState<SelectButton>({
    keyword: "",
    keywordId: 0,
  });

  useEffect(() => {
    if (selectedButton.keyword) {
      props.setKeywordInModal({
        keyword: selectedButton.keyword,
        keywordId: selectedButton.keywordId,
        isExistKeyword: false,
      });
    }
  }, [selectedButton]);

  return (
    <div style={{ color: "white", display: "flex" }}>
      {props.userData.map((user) => (
        <UserProfile
          key={user.userId}
          userData={user}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      ))}
    </div>
  );
}
