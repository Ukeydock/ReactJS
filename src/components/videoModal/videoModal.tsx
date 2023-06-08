import React, { useEffect, useState } from "react";
import "@css/video/Modal.css";
import { VideoApi } from "../scripts/video";
import { videoDetailData } from "../Types/interface/video/videoData.interface";
import { UserApi } from "../scripts/user";
import UserList from "../user/UserList";
import { UserListData } from "../Types/interface/user/user";
import Row from "../Row";
import { KeywordData } from "../Types/interface/keyword/keywordData.interface";

interface Props {
  videoDbId: number;
  keywordData: KeywordData;
  handleVideoDbId: () => void;
}

export default function VideoModal(props: Props) {
  const [videoDbId, setVideoDbId] = useState(props.videoDbId);
  const [videoDetailData, setVideoDetailData] = useState<videoDetailData>();
  const [subscribeKeywordUser, setSubscribeKeywordUser] = useState<
    UserListData[]
  >([]);
  const [keywordInModal, setKeywordInModal] = useState<KeywordData>(
    props.keywordData
  );

  useEffect(() => {
    const fetchDetailData = async () => {
      const videoDetailData = await VideoApi.findDetailByVideoDbId(videoDbId);
      setVideoDetailData(videoDetailData);
    };

    fetchDetailData();
  }, [videoDbId]);

  useEffect(() => {
    const fetchKeywordSubscribeUserData = async () => {
      const keywordSubscribeUserData =
        await UserApi.findUserSubscribedKeywordList(keywordInModal.keywordId);
      setSubscribeKeywordUser(keywordSubscribeUserData);
    };
    fetchKeywordSubscribeUserData();
  }, [keywordInModal]);

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

        <div className="video__modal" >
          <iframe
            className="video_iframe"
            src={"https://www.youtube.com/embed/" + videoDetailData.videoId}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

          ></iframe>
          <p className="video__title">{videoDetailData.videoTitle}</p>
          <p>{videoDetailData.videoDescription}</p>

          <Row keywordData={keywordInModal} setVideoDbId={setVideoDbId} />

          {subscribeKeywordUser.length >= 1 && (
            <UserList
              userData={subscribeKeywordUser}
              setKeywordInModal={setKeywordInModal}
            />
          )}
        </div>
      </div>
    );
  } else {
    return <div className=""></div>;
  }
}
