import React, { useEffect, useState } from "react";
import "@css/video/Modal.css";
import { Video } from "../scripts/video";
import { videoDetailData } from "../Types/interface/video/videoData.interface";

interface Props {
  videoDbId: number;
}

export default function VideoModal(props: Props) {
  const [videoDetailData, setVideoDetailData] = useState<videoDetailData>();

  useEffect(() => {
    const fetchDetailData = async () => {
      const videoDetailData = await Video.findDetailByVideoDbId(
        props.videoDbId
      );
      setVideoDetailData(videoDetailData);
    };

    fetchDetailData();
  }, [props.videoDbId]);

  if (videoDetailData) {
    return (
      <div className="video__modal">
        <iframe
          className="video_iframe"
          src={"https://www.youtube.com/embed/" + videoDetailData.videoId}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <p>{videoDetailData.videoTitle}</p>
      </div>
    );
  } else {
    return <div className="video__modal"></div>;
  }
}
