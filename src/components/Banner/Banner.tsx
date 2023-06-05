import React, { useEffect, useState } from "react";
import axios from "@script/axios";
import "@css/Banner.css";
import styled from "styled-components";
import KeywordBanner from "./KeywordBanner";
import { KeywordData } from "../Types/interface/keyword/keywordData.interface";
import { KeywordApi } from "../scripts/keyword";
import UserStatus from "./UserStatus";
import { UserListData } from "../Types/interface/user/user";
import { UserApi } from "../scripts/user";

interface Props {
  subscribeKeywordCount: number;
}


export default function Banner(props: Props) {

  const [recentKeyword, setRecentKeyword] = useState<KeywordData[]>([]);
  const [popularKeyword, setPopularKeyword] = useState<KeywordData[]>([]);
  const [user, setUser] = useState<UserListData>()
  useEffect(() => {
    const fetchRecentKeyword = async () => {
      const recentKeywordData = await KeywordApi.findRecomendKeyword(
        "recent",
        10
      );
      setRecentKeyword(recentKeywordData);
    };

    const fetchPopularKeyword = async () => {
      const popularKeywordData = await KeywordApi.findRecomendKeyword(
        "popular",
        10
      );
      setPopularKeyword(popularKeywordData);
    };

    const fetchUserData = async () => {
      const userData = await UserApi.findUser();
      console.log("ban")
      setUser(userData);
    };

    fetchUserData()
    fetchRecentKeyword();
    fetchPopularKeyword();
  }, []);


  if (user) {
    console.log(user)
    return (
      <header className="banner">
        <UserStatus
          nickname={user.userNickname}
          age={user.userAge}
          gender={user.userGender}

          subscribeKeywordCount={props.subscribeKeywordCount} />
        <div className="popular__keyword_list">
          <KeywordBanner
            keywordLabel="최근 추가된 키워드에요!"
            keywordData={recentKeyword}
          />

          <div>
            <KeywordBanner
              keywordLabel="유키독의 인기 키워드에요!"
              keywordData={popularKeyword}
            />
          </div>
          <div>
            <KeywordBanner
              keywordLabel="키독님을 위한 추천 키워드에요!"
              keywordData={[]}
            />
          </div>
        </div>

        {/* <div className="banner__contents"></div> */}
        <div className="banner--fadeBottom" />
      </header>
    );
  } else {
    return <div></div>
  }

}

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

// export {};
