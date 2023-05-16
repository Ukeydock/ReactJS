import axios from "@script/axios";
export const findByKeyword = async (keyword: string) => {
  const videoData = await axios.get(`/video/${keyword}?platform=youtube`);
  console.log(videoData.data);
  return videoData.data.videoData;
};
