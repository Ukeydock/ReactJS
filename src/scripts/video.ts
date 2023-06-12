import axios from "@root/scripts/axios";

export class VideoApi {
  static findByKeyword = async (keyword: string) => {
    const videoData = await axios.get(`/video/${keyword}?platform=youtube`);
    return videoData.data.videoData;
  };

  static findDetailByVideoDbId = async (videoDbId: number) => {
    const videoDetailData = await axios.get(`/video/@${videoDbId}`);
    return videoDetailData.data;
  };


}

export class VideoViewApi {
  static create = async (videoDbId: number) => {

    const videoViewData = await axios.post(`/view/@${videoDbId}`);

    return videoViewData.data;
  }
}
