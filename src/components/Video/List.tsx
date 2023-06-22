import { FilterInterface } from "@root/Types/interface/filter/filter.interface";
import { UserListData } from "@root/Types/interface/user/user";
import { VideoData } from "@root/Types/interface/video/videoData.interface";
import { Common } from "@root/scripts/common";
import { VideoApi, VideoViewApi } from "@root/scripts/video";
import React, { useEffect, useState } from "react";
import "@css/video/VideoList.css";
import VideoModal from "../videoModal/videoModal";

interface Props {
  filter: FilterInterface;
  user: UserListData;
}

export default function VideoList(props: Props) {
  const [video, setVideo] = useState<VideoData[]>([]);

  useEffect(() => {
    const fetchVideo = async () => {
      const video = await VideoApi.findViewVideoByUserId(
        props.user.userId,
        props.filter
      );

      setVideo(video);
    };
    fetchVideo();
  }, [props.filter]);
  console.log(video);
  return (
    <div className="video__list__box">
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
                // fetchVideoModal(video.videoDBId);
              }}
            />
          </div>
          <div style={{ height: "130px" }}>
            <p key={video.videoId}>
              {Common.truncateString(video.videoTitle, 100)}
            </p>
          </div>

          <div>
            <p>👀{video.videoViewCount}</p>
            <p>{Common.convertDateToString(new Date(video.videoCreatedAt))}</p>
          </div>
        </div>
      ))}
      {/* {videoDbId && (
        <VideoModal
          videoDbId={videoDbId}
          keywordData={props.keywordData}
          handleVideoDbId={handleVideoDbId}
        />
      )} */}
    </div>
  );
}
