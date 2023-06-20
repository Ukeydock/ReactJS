import React, { useState } from "react";
import "@css/video/Modal.css";
import "@css/user/UserProfileEditModal.css";
import Nickname from "./input/Nickname";
import Startpage from "@root/pages/services/start/Start.page";
import { UserGender, UserListData } from "../../Types/interface/user/user";
import { Common } from "../../scripts/common";

interface Props {
  user: UserListData;
  fetchUser: (
    nickname: string,
    age: string,
    gender: UserGender,
    mainKeyword: string
  ) => void;
  setIsOpenModal: (modal: boolean) => void;
}

export default function UserProfileEditModal(props: Props) {
  const fetchIsOpenModal = () => {
    props.setIsOpenModal(false);
  };

  return (
    <div
      className="background__color"
      style={{ color: "white", justifyContent: "center" }}
    >
      <div
        className="close__button"
        onClick={() => {
          fetchIsOpenModal();
        }}
      >
        <p>X</p>
      </div>

      <div
        className="video__modal user__edit__container"
        style={{
          backgroundColor: "#bbbbbb",
          borderRadius: "10%",
          border: "10px solid #333333",
          color: "black",
        }}
      >
        <Startpage
          fetchUser={props.fetchUser}
          nickname={props.user.userNickname}
          birthday={Common.getBirthDayString(props.user.userBirthday)}
          gender={props.user.userGender}
        />
      </div>
    </div>
  );
}
