import { FilterInterface } from "@root/Types/interface/filter/filter.interface";
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

  static findViewVideoByUserId = async (userId?: number, filter ?: FilterInterface, page ?: number, limit ?:number) => {
    const videoData = await axios.get(`/video/view/@${userId ? userId : 0}`, {
      params: {
        keyword : filter?.keyword,
        order : filter?.order.key,
        sort : filter?.sort.key,
        page : page ?? 1,
        limit : limit ?? 16
      }
    });
    return videoData.data.videoData;
  }

}

export class VideoViewApi {

 

  static create = async (videoDbId: number) => {

    const videoViewData = await axios.post(`/view/@${videoDbId}`);

    return videoViewData.data;
  }
}
