import { UserGender, UserListData } from "@root/Types/interface/user/user";
import { UserApi } from "@root/scripts/user";
import React, { useEffect, useState } from "react";
import UserProfileEditModal from "../UserProfileEditModal";
import UserStatus from "@root/components/Banner/UserStatus";
import UserMainKeywordEditModal from "../UserMainKeywordEditModal";

interface Props {
  user: UserListData;
  setUser: (user: UserListData) => void;
  isMine: boolean;
}

export default function Mine(props: Props) {
  const [isOpenProfileModal, setIsOpenProfileModal] = useState<boolean>(false);
  const [isOpenMainKeyword, setisOpenMainKeyword] = useState<boolean>(false);

  const fetchUser = (
    nickname: string | null,
    age: string | null,
    gender: UserGender | null,
    mainKeyword: string | null
  ) => {
    const newUser = { ...props.user };
    if (nickname) newUser.userNickname = nickname;
    if (age) newUser.userAge = age;
    if (gender) newUser.userGender = gender;
    if (mainKeyword) newUser.userMainKeyword = mainKeyword;

    props.setUser(newUser);
  };

  return (
    <div>
      {props.isMine && (
        <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
          <button
            className="button__border button__text"
            style={{ backgroundColor: "#666666" }}
            onClick={() => setIsOpenProfileModal(true)}
          >
            프로필 수정
          </button>
          <button
            className="button__border button__text"
            style={{ backgroundColor: "#666666" }}
            onClick={() => setisOpenMainKeyword(true)}
          >
            대표 키워드 수정
          </button>
        </div>
      )}
      {/*  프로필 수정 모달 */}
      {isOpenProfileModal && (
        <UserProfileEditModal
          user={props.user}
          fetchUser={fetchUser}
          setIsOpenModal={setIsOpenProfileModal}
        />
      )}
      {/* 대표 키워드 수정 모달 */}
      {isOpenMainKeyword && (
        <UserMainKeywordEditModal
          isOpenMainKeyword={isOpenMainKeyword}
          setIsOpenModal={setisOpenMainKeyword}
          fetchUser={fetchUser}
          currentKeyword={props.user.userMainKeyword}
        />
      )}

      <UserStatus
        userId={props.user.userId}
        nickname={props.user?.userNickname}
        age={props.user.userAge}
        gender={props.user.userGender}
        userProfileImg={props.user.userProfileImage}
        mainKeyword={props.user.userMainKeyword}
        isMine={props.isMine}
      />
    </div>
  );
}
