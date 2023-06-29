import { KeywordData } from "@root/Types/interface/keyword/keywordData.interface";
import React, { useEffect, useState } from "react";
import UserList from "../UserList";
import { UserListData } from "@root/Types/interface/user/user";
import { SelectButton } from "@root/Types/interface/keyword/SelectButton.interface";
import { UserApi } from "@root/scripts/user";

interface Props {
  keywordData: KeywordData;
}

export default function SameKeywordUser(props: Props) {
  const [userData, setUserData] = useState<UserListData[]>([]);
  const [selectedButton, setSelectedButton] = useState<SelectButton>({
    keyword: "",
    keywordId: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await UserApi.findUserSubscribedKeywordList(
        props.keywordData.keywordId
      );
      setUserData(userData);
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>{props.keywordData.keyword}</h1>
      <UserList userData={userData} />
    </div>
  );
}
