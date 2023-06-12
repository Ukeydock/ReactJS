import React, { useEffect, useState } from "react";
import "@css/Text.css";
import "@css/InputBox.css";
import { useDebounce } from "@root/hooks/useDebounce";
import { textColor } from "@root/Types/enum/text";

interface regNickname {
  message: string;
  textColor: textColor;
}

interface props {
  nickname?: string;

  handleInputChange: (e: { key: string; value: string }) => void;
  handleCanSubmit: (e: { key: string; value: boolean }) => void;
}

export default function Nickname(props: props) {
  const [nickname, setNickname] = useState<string>(
    props.nickname ? props.nickname : ""
  );
  const [regNickname, setRegNickname] = useState<regNickname>({
    message: "닉네임을 입력해주세요!",
    textColor: textColor.red,
  });

  const debounceTerm = useDebounce(nickname, 500);

  useEffect(() => {
    fetchNicknameValid(nickname);
  }, [debounceTerm]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  function fetchNicknameValid(nickname: string) {
    if (nickname.length <= 0) {
      setRegNickname({
        message: "닉네임을 입력해주세요!",
        textColor: textColor.red,
      });
      return;
    }

    const isValid = /^[a-z가-힣0-9]{2,16}$/;
    if (isValid.test(nickname)) {
      props.handleInputChange({ key: "nickname", value: nickname });
      props.handleCanSubmit({ key: "nickname", value: true });

      setRegNickname({
        message: "사용가능한 닉네임이에요!",
        textColor: textColor.green,
      });
    } else {
      props.handleInputChange({ key: "nickname", value: "" });
      props.handleCanSubmit({ key: "nickname", value: false });

      setRegNickname({
        message: "사용 불가능한 닉네임이에요!",
        textColor: textColor.red,
      });
    }
  }

  return (
    <div>
      <p className="input_box__name">Nickname </p>
      <input
        className="input_box__middle"
        name="nickname"
        value={nickname}
        onChange={handleNicknameChange}
        type="text"
      />
      <p style={{ color: regNickname.textColor, textAlign: "center" }}>
        {regNickname.message}
      </p>
    </div>
  );
}
