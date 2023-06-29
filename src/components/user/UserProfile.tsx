import React, { useEffect, useState } from "react";
import { UserListData } from "../../Types/interface/user/user";
import "@css/user/User.css";
import Keyword from "../Keyword/Keyword";
import { SelectButton } from "../../Types/interface/keyword/SelectButton.interface";
import { KeywordData } from "../../Types/interface/keyword/keywordData.interface";
import { KeywordApi } from "../../scripts/keyword";

interface Props {
  userData: UserListData;
  selectedButton: SelectButton;
  setSelectedButton: React.Dispatch<React.SetStateAction<SelectButton>>;
}

export default function UserProfile(props: Props) {
  const [keyword, setKeyword] = useState<KeywordData[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [keywordLimit, setkeywordLimit] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    const fetchKeyword = async () => {
      const keywordData = await KeywordApi.findAllByUserId(
        props.userData.userId
      );
      setKeyword(keywordData);
    };

    fetchKeyword();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // 키워드 배열 업데이트 로직
    // 예시로 현재 창의 가로 크기에 따라 키워드 개수 제한
    if (windowSize.width < 600) {
      setkeywordLimit(2);
    } else if (windowSize.width < 900) {
      setkeywordLimit(10);
    } else {
      setkeywordLimit(null);
    }
  }, [windowSize]);
  const handleSelectButton = (keywordId: number, keyword: string) => {
    if (props.selectedButton.keyword === keyword) {
      props.setSelectedButton({ keyword: "", keywordId: 0 });
      return;
    }

    props.setSelectedButton({ keyword, keywordId });
  };

  const goToUserPage = (userId: number) => {
    window.location.href = `/api/user?userId=${userId}`;
  };
  return (
    <div
      style={{
        flexBasis: "100%",

        display: "flex",
        backgroundColor: "#222222",
        border: "2px solid #333333",
        height: "300px",
      }}
    >
      <div>
        <img
          className="avatar"
          src={props.userData.userProfileImage}
          alt="userProfile"
          onClick={() => {
            goToUserPage(props.userData.userId);
          }}
        />
        <p>{props.userData.userNickname}</p>
      </div>
      <div>
        <div style={{}}>
          <p> {props.userData.userGender}</p>

          <p> {props.userData.userAge}</p>

          <p> {props.userData.userMainKeyword}</p>
        </div>
        <div className="keyword__box">
          {keyword.map((keyword, idx) => {
            if (keywordLimit && idx > keywordLimit) {
              return;
            }
            return (
              <Keyword
                key={keyword.keywordId}
                {...keyword}
                selectedButton={props.selectedButton.keyword}
                handleSelectButton={handleSelectButton}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
