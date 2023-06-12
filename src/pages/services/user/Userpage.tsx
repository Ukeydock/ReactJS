import UserStatus from "@root/components/Banner/UserStatus";
import { UserGender, UserListData } from "@root/Types/interface/user/user";
import { UserApi } from "@root/scripts/user";
import MenuList from "@root/components/User/Menu/MenuList";
import UserProfileEditModal from "@root/components/User/UserProfileEditModal";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filter from "@root/components/Video/Filter/Filter";
import VideoList from "@root/components/Video/List";

export default function UserPage() {
  const [searchParams] = useSearchParams();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  // 쿼리 값 가져오기
  const queryUserId = searchParams.get("userId");

  const [user, setUser] = useState<UserListData>();
  const [activeButton, setActiveButton] = useState<
    `mine` | `recent` | `otherUser`
  >("recent");

  const fetchActiveButton = (button: `mine` | `recent` | `otherUser`) => {
    setActiveButton(button);
  };

  const fetchUser = (nickname: string, age: string, gender: UserGender) => {
    if (!user) return;

    const newUser = { ...user };
    newUser.userNickname = nickname;
    newUser.userAge = age;
    newUser.userGender = gender;

    setUser(newUser);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await UserApi.findUser();
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
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="button__border button__text"
                style={{ backgroundColor: "#666666" }}
                onClick={() => setIsOpenModal(true)}
              >
                프로필 수정
              </button>
            </div>
            {isOpenModal && (
              <UserProfileEditModal
                user={user}
                fetchUser={fetchUser}
                setIsOpenModal={setIsOpenModal}
              />
            )}

            <UserStatus
              userId={queryUserId ? parseInt(queryUserId) : user.userId}
              nickname={user?.userNickname}
              age={user.userAge}
              gender={user.userGender}
              userProfileImg={user.userProfileImage}
            />
          </div>
        ) : activeButton === `recent` ? (
          <div>
            <Filter user={user} />
            <VideoList />
          </div>
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
