import React from "react";
import axios from "@root/scripts/axios";
import { CustomError } from "../components/error/CatchError";
import { UserListData } from "../Types/interface/user/user";

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



  /**
   * 
   * @returns 유저 정보
   * @description 로컬 스토리지에 유저 정보가 있다면 로컬 스토리지에서 유저 정보를 가져오고 없다면 서버에서 유저 정보를 가져온다.
   */
  static findUser = async () => {

    const localStorageUser = localStorage.getItem('user')
    if (localStorageUser) {
      const userData = JSON.parse(localStorageUser)
      return userData
    } else {
      const userData: UserListData = await UserApi.findOneByUserId()
      localStorage.setItem('user', JSON.stringify(userData));

      return userData
    }
  }


  /**
   *
   * @param userId 유저 아이디
   * @returns 유저 정보
   * @description 유저 아이디를 통해 유저 정보를 가져온다. 유저 아이디가 없다면 로그인한 유저의 정보를 가져온다.
   *
   */
  static findOneByUserId = async (userId?: number) => {
    const userData = await axios.get(`/user/@${userId ?? 0}`);
    return userData.data.data.userData;
  };

  /**
   *
   * @param keywordId 키워드 아이디
   * @returns 해당 키워드를 구독한 유저 리스트
   * @description 해당 키워드를 구독한 유저 리스트를 가져온다.
   *
   *
   */
  static findUserSubscribedKeywordList = async (keywordId: number) => {
    const userData = await axios.get(`/user/keyword/${keywordId}`);

    return userData.data.data.userListData;
  };

  /**
   *
   * @param form 유저 정보 수정 폼
   * @description 유저 정보를 수정한다.
   *
   */
  static updateUser = async (form: updateUserForm) => {
    const payload: payload = {
      nickname: form.nickname,
      birthday: new Date(form.birthday),
      gender: form.gender,
    };
    localStorage.removeItem('user')
    await axios.put("/user", payload);
  };

  static updateUserProfile = async (formData: FormData) => {
    await axios.post("/user/profile", formData);
  }
}
