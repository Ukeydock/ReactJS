import React, { useEffect, useState } from "react";
import "@css/Text.css";
import "@css/InputBox.css";
import { textColor } from "@root/Types/enum/text";
import { Common } from "@root/scripts/common";

interface birthdayMessage {
  message: string;
  color?: textColor;
}

interface props {
  birthday?: string;
  handleInputChange: (e: { key: string; value: string }) => void;
  handleCanSubmit: (e: { key: string; value: boolean }) => void;
}

const defaultBirthdayMessage = "생일을 입력해주세요.";

export default function Birthday(props: props) {
  const [birthday, setBirthday] = useState(
    props.birthday ? props.birthday : ""
  );
  const [birthdayMessage, setBirthdayMessage] = useState<birthdayMessage>({
    message: defaultBirthdayMessage,
    color: textColor.red,
  });

  useEffect(() => {
    if (birthday.length >= 10) {
      props.handleInputChange({ key: "birthday", value: birthday });
      props.handleCanSubmit({ key: "birthday", value: true });

      setBirthdayMessage({
        message: "당신은.. " + Common.verifyBirthday(birthday) + "!",
        color: textColor.green,
      });
    }
    if (birthday.length < 10) {
      props.handleCanSubmit({ key: "birthday", value: false });

      setBirthdayMessage({
        message: defaultBirthdayMessage,
        color: textColor.red,
      });
    }
  }, [birthday]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    let formatted = input.replace(/[^0-9]/g, "");
    if (input.length >= 5) {
      if (input.length >= 8) {
        formatted = input
          .replace(/[^0-9]/g, "")
          .replace(/(\d{4})(\d{2})(\d{1})/, "$1-$2-$3")
          .slice(0, 10);
      } else {
        formatted = input
          .replace(/[^0-9]/g, "")
          .replace(/(\d{4})(\d{1,2})/, "$1-$2");
      }
    }
    setBirthday(formatted);
  };

  return (
    <div>
      <p className="input_box__name">Birth Day</p>
      <input
        className="input_box__middle"
        type="text"
        name="birthday"
        value={birthday}
        onChange={handleChange}
        placeholder="2000-01-01"
      />
      <p style={{ color: birthdayMessage.color }}>{birthdayMessage.message}</p>
    </div>
  );
}
