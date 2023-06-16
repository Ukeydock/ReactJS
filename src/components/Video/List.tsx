import { FilterInterface } from "@root/Types/interface/filter/filter.interface";
import { UserListData } from "@root/Types/interface/user/user";
import { VideoData } from "@root/Types/interface/video/videoData.interface";
import { Common } from "@root/scripts/common";
import { VideoApi } from "@root/scripts/video";
import React, { useEffect, useState } from "react";
import "@css/video/VideoList.css";

interface Props {
  filter: FilterInterface;
  user: UserListData;
}

export default function VideoList(props: Props) {
  const [video, setVideo] = useState<VideoData[]>([]);

  useEffect(() => {
    const fetchVideo = async () => {
      const video: VideoData[] = await VideoApi.findViewVideoByUserId(
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
      {video?.map((video: VideoData) => (
        <div className="video__list__item__box" key={video.videoDBId}>
          <img
            key={video.videoDBId}
            // style={{ padding: "25px 0" }}
            className={`row__poster`}
            src={video.videoThumbnail}
            alt="영화들 이미지"
            // onClick={async () => {
            //   await VideoViewApi.create(video.videoDBId);
            //   if (props.setVideoDbId) {
            //     props.setVideoDbId(video.videoDBId);
            //   } else {
            //     fetchVideoModal(video.videoDBId);
            //   }
            // }}
          />

          <p key={video.videoId}>{Common.truncateString(video.videoTitle)}</p>
        </div>
      ))}
    </div>
  );
}
