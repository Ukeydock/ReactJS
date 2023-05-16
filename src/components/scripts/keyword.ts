import axios from "@script/axios";

interface keywordData {
  keyword: string;
  keywordId: number;
}

export const findAll = async (): Promise<keywordData[] | []> => {
  const keywordData = await axios.get(`/keyword`);
  return keywordData.data;
};
