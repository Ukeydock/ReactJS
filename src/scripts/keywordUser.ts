import axios from "@root/scripts/axios";

export class KeywordUserApi {
  static findOneByKeywordId = async (keywordId: number): Promise<boolean> => {
    const keywordUserData = await axios.get(`/keyword-user/@${keywordId}`);

    return keywordUserData.data ? true : false;
  };

  static create = async (keywordId: number): Promise<void> => {
    await axios.post(`/keyword-user/${keywordId}`);
  };

  static updateMainKeyword = async (keywordId: number) => {
    const keywordData = await axios.patch(`/keyword-user/main/@${keywordId}`);
    return keywordData.data;
  }

  static deleteByKeywordId = async (keywordId: number): Promise<void> => {
    await axios.delete(`/keyword-user/@${keywordId}`);
  };
}
