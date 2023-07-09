import { useEffect, useState } from "react";
import "@css/Row.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { VideoApi } from "@root/scripts/video";
import spinner from "@root/assets/images/Spinner-1s-200px.gif";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { KeywordUserApi } from "../scripts/keywordUser";
import VideoModal from "./videoModal/videoModal";
import { VideoData } from "../Types/interface/video/videoData.interface";
import { KeywordData } from "../Types/interface/keyword/keywordData.interface";
import { Common } from "@root/scripts/common";

interface props {
  keywordData: KeywordData;
  setVideoDbId?: any;
}

export default function Row(props: props) {
  const [video, setVideo] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isExistKeyword, setIsExistKeyword] = useState<boolean>(false);
  const [videoDbId, setVideoDbId] = useState<number | null>(null);

  // 컴포넌트가 마운트되었을 때 최초 한 번 무조건 실행
  // 의존성 배열 안의 값이 변했을 때
  useEffect(() => {
    const fetchVideo = async () => {
      const movieData = await VideoApi.findByKeyword(props.keywordData.keyword);
      setLoading(false);
      setVideo(movieData);
    };

    const fetchKeywordButton = async (keywordId: number) => {
      const keywordUserData = await KeywordUserApi.findOneByKeywordId(
        keywordId
      );
      setIsExistKeyword(keywordUserData);
    };

    fetchVideo();
    fetchKeywordButton(props.keywordData.keywordId);
  }, [props.keywordData.keyword]);

  const fetchVideoModal = (videoDbId: number) => {
    setVideoDbId(videoDbId);
  };

  const handleVideoDbId = () => {
    setVideoDbId(null);
  };
  if (!loading && video) {
    return (
      <section className="row" style={{ backgroundColor: "black" }}>
        <h2>
          {props.keywordData.keyword}

          <button
            onClick={() => {
              if (isExistKeyword == true) {
                KeywordUserApi.deleteByKeywordId(props.keywordData.keywordId);
                setIsExistKeyword(false);
              } else {
                KeywordUserApi.create(props.keywordData.keywordId);
                setIsExistKeyword(true);
              }
            }}
            className={`video__button ${
              isExistKeyword == true ? "video__button__active" : ""
            }`}
          >
            {isExistKeyword == true ? "구독!" : "구독하기"}
          </button>
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          loop={true} // loop 기능을 사용할 것인지
          breakpoints={{
            1378: {
              slidesPerView: 6, // 한번에 보이는 슬라이드 개수
              slidesPerGroup: 6, // 몇개씩 슬라이드 할지
            },
            998: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            625: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            0: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
          navigation // arrow 버튼 사용 유무
          pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
        >
          <div className="row__posters">
            {video?.map((video: VideoData) => (
              <SwiperSlide key={video.videoId}>
                <img
                  key={video.videoDBId}
                  style={{ padding: "25px 0" }}
                  className={`row__poster`}
                  src={video.videoThumbnail}
                  alt="영화들 이미지"
                  onClick={async () => {
                    if (props.setVideoDbId) {
                      props.setVideoDbId(video.videoDBId);
                    } else {
                      fetchVideoModal(video.videoDBId);
                    }
                  }}
                  onError={(e) => {
                    console.log("에러남");
                    e.currentTarget.src =
                      "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
                  }}
                />
                <p className="row__title__font" key={video.videoId}>
                  {Common.truncateString(video.videoTitle)}
                </p>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        {videoDbId && (
          <VideoModal
            videoDbId={videoDbId}
            keywordData={props.keywordData}
            handleVideoDbId={handleVideoDbId}
          />
        )}
      </section>
    );
  }
  if (loading) {
    return <img src={spinner}></img>;
  }
  return <div></div>;
}

export {};
