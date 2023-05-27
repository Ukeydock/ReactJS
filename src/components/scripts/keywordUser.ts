import axios from "@script/axios";

class KeywordUser {
  static findOneByKeywordId = async (keywordId: number): Promise<boolean> => {
    const keywordUserData = await axios.get(`/keyword-user/@${keywordId}`);

    return keywordUserData.data ? true : false;
  };

  static create = async (keywordId: number): Promise<void> => {
    await axios.post(`/keyword-user/${keywordId}`);
  };

  static deleteByKeywordId = async (keywordId: number): Promise<void> => {
    await axios.delete(`/keyword-user/@${keywordId}`);
  };
}

export default KeywordUser;
