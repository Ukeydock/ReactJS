import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { KeywordData } from "../Types/interface/keyword/keywordData.interface";

interface Props {
  keywordLabel: string;
  keywordData: KeywordData[];
}
export default function KeywordBanner(props: Props) {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideNext();
      }
    }, 2500); // 2초마다 슬라이드 넘김

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (props.keywordData.length > 0) {
    return (
      <div>
        <label>{props.keywordLabel}</label>
        <Swiper
          className="keyword__banner"
          direction="vertical"
          ref={swiperRef}
          loop={true}
          autoplay={true}
        >
          {props.keywordData.map((keyword, idx) => (
            <SwiperSlide
              className="keyword__banner_item"
              key={keyword.keywordId}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
                onClick={() => {
                  window.location.href = `/api/search?keyword=${keyword.keyword}`;
                }}
              >
                {idx + 1 + ". "}
                {keyword.keyword}
              </div>
            </SwiperSlide>
          ))}

          {/* 추가적인 키워드 슬라이드를 원하는 만큼 추가할 수 있습니다 */}
        </Swiper>
      </div>
    );
  } else {
    return <div></div>;
  }
}
