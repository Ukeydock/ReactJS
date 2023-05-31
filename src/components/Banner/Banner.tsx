import React, { useEffect, useState } from "react";
import axios from "@script/axios";
import "@css/Banner.css";
import styled from "styled-components";
import KeywordBanner from "./KeywordBanner";

const testKeywordData = [
  {
    keywordId: 1,
    keyword: "키워드1",
    isExistKeyword: false,
  },
  {
    keywordId: 2,
    keyword: "키워드2",
    isExistKeyword: false,
  },
  {
    keywordId: 3,
    keyword: "키워드3",
    isExistKeyword: false,
  },
  {
    keywordId: 4,
    keyword: "키워드4",
    isExistKeyword: false,
  },
];

export default function Banner() {
  const [movie, setMovie] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  if (!isClicked && movie) {
    return (
      <header className="banner">
        <div style={{ height: "230px" }}></div>
        <div className="popular__keyword_list">
          <KeywordBanner keywordData={testKeywordData} />

          <div>
            <KeywordBanner keywordData={testKeywordData} />
          </div>
          <div>
            <KeywordBanner keywordData={testKeywordData} />
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
