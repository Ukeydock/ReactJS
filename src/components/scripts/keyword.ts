import axios from "@script/axios";

interface keywordData {
  keyword: string;
  keywordId: number;
}

export const findAll = async (keyword: string): Promise<keywordData[] | []> => {
  const keywordData = await axios.get(`/keyword/search?keyword=${keyword}`);
  return keywordData.data;
};

export const findAllByUserId = async () => {
  const keywordData = await axios.get(`/keyword`);
  return keywordData.data;
};
