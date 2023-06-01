import React, { useEffect, useState } from "react";
import axios from "@script/axios";
import "@css/Banner.css";
import styled from "styled-components";
import KeywordBanner from "./KeywordBanner";
import { KeywordData } from "../Types/interface/keyword/keywordData.interface";
import { KeywordApi } from "../scripts/keyword";

export default function Banner() {
  const [movie, setMovie] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [recentKeyword, setRecentKeyword] = useState<KeywordData[]>([]);
  const [popularKeyword, setPopularKeyword] = useState<KeywordData[]>([]);

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

    fetchRecentKeyword();
    fetchPopularKeyword();
  }, []);

  if (!isClicked && movie) {
    return (
      <header className="banner">
        <div style={{ height: "230px" }}></div>
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
  } else if (isClicked && movie) {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src="https://www.youtube.com/embed/9voN0gkdlS4"
            title="YouTube video player"
            // frameborder="0"
            allow=" autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            // allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  } else {
    return <div></div>;
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
