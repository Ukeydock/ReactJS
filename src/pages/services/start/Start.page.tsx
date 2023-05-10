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

  const handleInputChange = (e: { key: string; value: string }) => {
    const { key, value } = e;
    setFormData({ ...formData, [key]: value });
  };

  const handleCanSubmit = (e: { key: string; value: boolean }) => {
    const { key, value } = e;
    setCanSubmit({ ...canSubmit, [key]: value });
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
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <form>
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
        <button type="submit" disabled={checkCanSubmit()}>
          제출
        </button>
      </form>
    </div>
  );
}
