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

export default function UserPage() {
  const [searchParams] = useSearchParams();
  // 쿼리 값 가져오기
  const queryUserId = searchParams.get("userId");

  const [user, setUser] = useState<UserListData>();
  const [activeButton, setActiveButton] = useState<
    `mine` | `recent` | `otherUser`
  >("mine");

  const fetchActiveButton = (button: `mine` | `recent` | `otherUser`) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await UserApi.findOneByUserId(
        queryUserId ? parseInt(queryUserId) : 0
      );
      setUser(userData);
    };

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
          <Mine user={user} setUser={setUser} />
        ) : activeButton === `recent` ? (
          <Recent user={user} />
        ) : activeButton === `otherUser` ? (
          <div> 최근 본 영상</div>
        ) : (
          <div>다른 유저 페이지</div>
        )}
      </div>
    );
  } else {
    return <div>로딩중</div>;
  }
}
