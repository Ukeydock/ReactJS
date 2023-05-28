import React, { useEffect, useState } from "react";
import "@css/video/Modal.css";
import { Video } from "../scripts/video";
import { videoDetailData } from "../Types/interface/video/videoData.interface";
import { User } from "../scripts/user";
import UserList from "../user/UserList";
import { UserListData } from "../Types/interface/user/user";

interface Props {
  videoDbId: number;
  keywordId: number;
}

export default function VideoModal(props: Props) {
  const [videoDetailData, setVideoDetailData] = useState<videoDetailData>();
  const [subscribeKeywordUser, setSubscribeKeywordUser] = useState<
    UserListData[]
  >([]);

  useEffect(() => {
    const fetchDetailData = async () => {
      const videoDetailData = await Video.findDetailByVideoDbId(
        props.videoDbId
      );
      setVideoDetailData(videoDetailData);
    };

    const fetchKeywordSubscribeUserData = async () => {
      const keywordSubscribeUserData = await User.findUserSubscribedKeywordList(
        props.keywordId
      );
      setSubscribeKeywordUser(keywordSubscribeUserData);
    };
    fetchDetailData();
    fetchKeywordSubscribeUserData();
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
        <p className="video__title">{videoDetailData.videoTitle}</p>
        <p>{videoDetailData.videoDescription}</p>

        {subscribeKeywordUser.length >= 1 && (
          <UserList userData={subscribeKeywordUser} />
        )}
      </div>
    );
  } else {
    return <div className="video__modal"></div>;
  }
}
