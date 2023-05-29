import React, { useEffect, useState } from "react";
import "@css/video/Modal.css";
import { VideoApi } from "../scripts/video";
import { videoDetailData } from "../Types/interface/video/videoData.interface";
import { UserApi } from "../scripts/user";
import UserList from "../user/UserList";
import { UserListData } from "../Types/interface/user/user";

interface Props {
  videoDbId: number;
  keywordId: number;
  handleVideoDbId: () => void;
}

export default function VideoModal(props: Props) {
  const [videoDetailData, setVideoDetailData] = useState<videoDetailData>();
  const [subscribeKeywordUser, setSubscribeKeywordUser] = useState<
    UserListData[]
  >([]);

  useEffect(() => {
    const fetchDetailData = async () => {
      const videoDetailData = await VideoApi.findDetailByVideoDbId(
        props.videoDbId
      );
      setVideoDetailData(videoDetailData);
    };

    const fetchKeywordSubscribeUserData = async () => {
      const keywordSubscribeUserData =
        await UserApi.findUserSubscribedKeywordList(props.keywordId);
      setSubscribeKeywordUser(keywordSubscribeUserData);
    };
    fetchDetailData();
    fetchKeywordSubscribeUserData();
  }, [props.videoDbId]);

  const closeVideoModal = () => {
    props.handleVideoDbId();
  };

  if (videoDetailData) {
    return (
      <div className="background__color">
        <div
          className="close__button"
          onClick={() => {
            closeVideoModal();
          }}
        >
          <p>X</p>
        </div>

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
      </div>
    );
  } else {
    return <div className=""></div>;
  }
}
