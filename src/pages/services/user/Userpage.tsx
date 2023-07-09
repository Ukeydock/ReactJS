import UserStatus from "@root/components/Banner/UserStatus";
import { UserGender, UserListData } from "@root/Types/interface/user/user";
import { UserApi } from "@root/scripts/user";
import MenuList from "@root/components/User/Menu/MenuList";
import UserProfileEditModal from "@root/components/User/UserProfileEditModal";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filter from "@root/components/Video/Filter/Filter";
import VideoList from "@root/components/Video/List";
import Mine from "@root/components/User/Filter/Mine";
import Recent from "@root/components/User/Filter/Recent";
import { AuthApi } from "@root/scripts/auth";
import { KeywordData } from "@root/Types/interface/keyword/keywordData.interface";
import { KeywordApi } from "@root/scripts/keyword";
import UserList from "@root/components/User/UserList";
import SameKeywordUser from "@root/components/User/Filter/SameKeywordUser";

export default function UserPage() {
  const [searchParams] = useSearchParams();
  // 쿼리 값 가져오기
  const queryUserId = searchParams.get("userId");

  const [user, setUser] = useState<UserListData>();
  const [activeButton, setActiveButton] = useState<
    `mine` | `recent` | `otherUser`
  >("mine");
  const [isMine, setIsMine] = useState<boolean>(false);

  const [keywordList, setKeywordList] = useState<KeywordData[]>([]);

  const fetchActiveButton = (button: `mine` | `recent` | `otherUser`) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await UserApi.findOneByUserId(
        queryUserId ? parseInt(queryUserId) : 0
      );
      console.log("userpage");
      setUser(userData);
    };

    const fetchIsMine = () => {
      const userId = AuthApi.findUserIdByAccessToken();

      if (userId === parseInt(queryUserId!) || !queryUserId) setIsMine(true);
    };

    const fetchKeywordList = async () => {
      const keywordList = await KeywordApi.findAllByUserId(
        queryUserId ? parseInt(queryUserId) : 0
      );

      setKeywordList(keywordList);
    };

    fetchKeywordList();
    fetchIsMine();
    fetchUserData();
  }, []);

  if (user) {
    return (
      <div>
        <MenuList
          buttonName={activeButton}
          fetchActiveButton={fetchActiveButton}
        />

        {/* 나의 페이지 */}
        {activeButton === `mine` ? (
          <Mine
            user={user}
            setUser={setUser}
            isMine={isMine}
            keywordList={keywordList}
          />
        ) : activeButton === `recent` ? (
          <Recent user={user} keywordList={keywordList} />
        ) : activeButton === `otherUser` ? (
          <div>
            <div style={{ color: "white" }}>
              {keywordList.map((keyword) => {
                return (
                  <SameKeywordUser
                    key={keyword.keyword}
                    keywordData={keyword}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div>잘못된 접근</div>
        )}
      </div>
    );
  } else {
    return <div>로딩중</div>;
  }
}
