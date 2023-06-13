import { UserGender, UserListData } from "@root/Types/interface/user/user";
import { UserApi } from "@root/scripts/user";
import React, { useEffect, useState } from "react";
import UserProfileEditModal from "../UserProfileEditModal";
import UserStatus from "@root/components/Banner/UserStatus";

interface Props {
  user: UserListData;
  setUser: (user: UserListData) => void;
}

export default function Mine(props: Props) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const fetchUser = (nickname: string, age: string, gender: UserGender) => {
    if (!props.user) return;

    const newUser = { ...props.user };
    newUser.userNickname = nickname;
    newUser.userAge = age;
    newUser.userGender = gender;

    props.setUser(newUser);
  };

  return (
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
          user={props.user}
          fetchUser={fetchUser}
          setIsOpenModal={setIsOpenModal}
        />
      )}

      <UserStatus
        userId={props.user.userId}
        nickname={props.user?.userNickname}
        age={props.user.userAge}
        gender={props.user.userGender}
        userProfileImg={props.user.userProfileImage}
      />
    </div>
  );
}
