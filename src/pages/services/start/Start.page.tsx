import { CustomError } from "@root/components/error/CatchError";
import { UserApi } from "@root/components/scripts/user";
import Birthday from "@root/components/user/input/Birthday";
import Gender from "@root/components/user/input/Gender";
import Nickname from "@root/components/user/input/Nickname";
import React, { useState } from "react";

interface canSubmit {
  nickname: boolean;
  birthday: boolean;
  gender: boolean;
}

interface formData {
  nickname: string;
  birthday: string;
  gender: string;
}

export default function Startpage() {
  const [validFormButton, setValidFormButton] = useState<boolean>(false);
  const [formData, setFormData] = useState<formData>({
    nickname: "",
    birthday: "",
    gender: "",
  });

  const [canSubmit, setCanSubmit] = useState<canSubmit>({
    nickname: false,
    birthday: false,
    gender: false,
  });

  // input 박스 안의 내용이 바뀌면 함수가 실행됨.
  const handleInputChange = (e: { key: string; value: string }) => {
    const { key, value } = e;
    setFormData({ ...formData, [key]: value });
  };

  // 제출 버튼을 조건에 따라 활성화 시키는 함수
  const handleCanSubmit = (e: { key: string; value: boolean }) => {
    const { key, value } = e;
    setCanSubmit({ ...canSubmit, [key]: value });
  };

  // 제출 버튼을 클릭했을 때.
  const fetchUserDataSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await UserApi.updateUser(formData);
      window.location.href = "/api/main";
    } catch (err: any) {
      throw new CustomError(err.message, "/start", true);
    }
  };

  function checkCanSubmit(): boolean {
    for (const value of Object.values(canSubmit)) {
      if (!value) {
        return true;
      }
    }
    return false;
  }

  return (
    <form onSubmit={fetchUserDataSubmit}>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // backgroundColor: "aqua",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "70%",
        }}
      >
        <Nickname
          setValidFormButton={setValidFormButton}
          handleInputChange={handleInputChange}
          handleCanSubmit={handleCanSubmit}
        />
        <Birthday
          handleInputChange={handleInputChange}
          handleCanSubmit={handleCanSubmit}
        />
        <Gender
          handleInputChange={handleInputChange}
          handleCanSubmit={handleCanSubmit}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginTop: "10%",

            // backgroundColor: "red",
          }}
        >
          <button
            type="submit"
            style={{
              width: "20%",
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "10%",
            }}
            disabled={checkCanSubmit()}
          >
            제출
          </button>
        </div>
      </div>
    </form>
  );
}
