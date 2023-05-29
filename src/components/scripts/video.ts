import axios from "@script/axios";

export class VideoApi {
  static findByKeyword = async (keyword: string) => {
    const videoData = await axios.get(`/video/${keyword}?platform=youtube`);
    return videoData.data.videoData;
  };

  static findDetailByVideoDbId = async (videoDbId: number) => {
    const videoDetailData = await axios.get(`/video/@${videoDbId}`);
    console.log(videoDetailData);
    return videoDetailData.data;
  };
}
