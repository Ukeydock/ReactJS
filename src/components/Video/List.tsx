import { FilterInterface } from "@root/Types/interface/filter/filter.interface";
import { UserListData } from "@root/Types/interface/user/user";
import { VideoData } from "@root/Types/interface/video/videoData.interface";
import { Common } from "@root/scripts/common";
import { VideoApi, VideoViewApi } from "@root/scripts/video";
import React, { useEffect, useState } from "react";
import "@css/video/VideoList.css";
import VideoModal from "../videoModal/videoModal";
import { KeywordData } from "@root/Types/interface/keyword/keywordData.interface";

interface Props {
  filter: FilterInterface;
  user: UserListData;
}

export default function VideoList(props: Props) {
  const [video, setVideo] = useState<VideoData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPageNumber] = useState<number | null>(null);
  const [videoDbId, setVideoDbId] = useState<number | null>(null);
  const [videoKeyword, setVideoKeyword] = useState<KeywordData>({
    keyword: "",
    keywordId: 0,
    isExistKeyword: false,
  });

  useEffect(() => {
    const fetchVideo = async () => {
      /**
       * 페이지가 1이라면 새로운 비디오를 불러온다.
       */
      if (page === 1) {
        const { video, maxPageNumber } = await VideoApi.findViewVideoByUserId(
          props.user.userId,
          props.filter,
          1,
          16
        );
        setMaxPageNumber(maxPageNumber);

        setVideo(video);
        return;
      }
      // setMaxPageNumber(null);
      /**
       * 페이지가 1이 아니라면 페이지를 바꿔서 useEffect를 실행한다.
       */
      setVideo([]);
      setPage(1);
    };
    fetchVideo();
  }, [props.filter]);

  useEffect(() => {
    const fetchVideo = async () => {
      const { video, maxPageNumber } = await VideoApi.findViewVideoByUserId(
        props.user.userId,
        props.filter,
        page,
        16
      );
      setVideo((prev) => [...prev, ...video]);
      setMaxPageNumber(maxPageNumber);
    };
    if (page <= maxPage!) fetchVideo();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // console.log(scrollPosition, windowHeight, documentHeight);
      if (scrollPosition + windowHeight >= documentHeight) {
        setPage((prev) => prev + 1);
      }
      // 스크롤 위치, 브라우저 창 높이, 문서 전체 높이에 대한 로직 수행
      // 여기서 필요에 따라 추가 콘텐츠를 요청할 수 있음
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchVideoDbId = (videoDbId: number) => {
    setVideoDbId(videoDbId);
  };

  const fetchVideoKeyword = (keywordData: KeywordData) => {
    setVideoKeyword(keywordData);
  };

  const handleVideoDbId = () => {
    setVideoDbId(null);
  };

  return (
    <div className="video__list__box">
      <div className="video__list__items__box">
        {video?.map((video) => (
          <div className="video__list__item__box" key={video.videoDBId}>
            <div className="button__text ">
              <p>{video.videoKeyword}</p>
            </div>
            <div>
              <img
                key={video.videoDBId}
                // style={{ padding: "25px 0" }}
                className={`row__poster`}
                src={video.videoThumbnail}
                alt="영화들 이미지"
                onClick={async () => {
                  fetchVideoDbId(video.videoDBId);
                  fetchVideoKeyword({
                    keyword: video.videoKeyword,
                    keywordId: video.videoKeywordId,
                    isExistKeyword: false,
                  });
                }}
              />
            </div>
            <div style={{ height: "130px" }}>
              <p key={video.videoId}>
                {Common.truncateString(video.videoTitle, 100)}
              </p>
            </div>

            <div>
              <p>👀 : {video.videoViewCount}</p>
              <p>
                {Common.convertDateToString(new Date(video.videoCreatedAt))}
              </p>
            </div>
          </div>
        ))}
        {videoDbId && (
          <VideoModal
            videoDbId={videoDbId}
            keywordData={videoKeyword}
            handleVideoDbId={handleVideoDbId}
          />
        )}
      </div>
    </div>
  );
}
