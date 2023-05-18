import axios from "@script/axios";
import React, { useEffect, useState } from "react";
import "@css/Row.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { findByKeyword } from "@root/components/scripts/video";
import spinner from "@root/assets/images/Spinner-1s-200px.gif";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface propsData {
  keyword: string;
}

export interface VideoData {
  videoId: string;
  videoPublishedAt: string;
  videoThumbnail: string;
  videoUri: string;
  videoTitle: string;
  videoDescription: string;
  videoChannelData: {
    videoChannelTitle: string;
    videoChannelDescription: string;
    videoChannelThumbnail: string;
  };
}

function truncateString(str: string): string {
  if (str.length > 30) {
    return str.slice(0, 27) + "...";
  }
  return str;
}

export default function Row(props: propsData) {
  const [movies, setMovies] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const movieData = await findByKeyword(props.keyword);
    setLoading(false);
    setMovies(movieData);
  };

  if (!loading && movies) {
    return (
      <section className="row" style={{ backgroundColor: "black" }}>
        <h2>{props.keyword} </h2>

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
            {movies?.map((video: VideoData) => (
              <SwiperSlide key={video.videoId}>
                <img
                  key={1}
                  style={{ padding: "25px 0" }}
                  className={`row__poster`}
                  src={video.videoThumbnail}
                  alt="영화들 이미지"
                />
                <p>{truncateString(video.videoTitle)}</p>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        {/* {modalOpen && movieSelected && (
          // <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
        )} */}
      </section>
    );
  }
  if (loading) {
    return <img src={spinner}></img>;
  }
  return <div></div>;
}

export {};
