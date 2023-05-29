import axios from "@script/axios";

interface keywordData {
  keyword: string;
  keywordId: number;
  isExistKeyword: boolean;
}

export class KeywordApi {
  static findAll = async (keyword: string): Promise<keywordData[] | []> => {
    const keywordData = await axios.get(`/keyword/search?keyword=${keyword}`);
    return keywordData.data;
  };

  // userId가 없다면 로그인한 유저의 키워드를 가져온다.
  static findAllByUserId = async (userId?: number) => {
    const keywordData = await axios.get(`/keyword/@${userId ?? 0}`);
    return keywordData.data;
  };
}
