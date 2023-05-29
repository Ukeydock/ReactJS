import React from "react";
import axios from "@script/axios";
import { CustomError } from "../error/CatchError";

interface updateUserForm {
  nickname: string;
  birthday: string;
  gender: string;
}

interface payload {
  nickname: string;
  birthday: Date;
  gender: string;
}

export class UserApi {
  static updateUser = async (form: updateUserForm) => {
    const payload: payload = {
      nickname: form.nickname,
      birthday: new Date(form.birthday),
      gender: form.gender,
    };

    await axios.put("/user", payload);
  };

  static findUserSubscribedKeywordList = async (keywordId: number) => {
    const userData = await axios.get(`/user/keyword/${keywordId}`);

    return userData.data.data.userListData;
  };
}
