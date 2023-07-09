import { useEffect, useState } from "react";
import "@css/Banner.css";
import "@css/BannerKeyword.css";
import KeywordBanner from "./KeywordBanner";
import { KeywordData } from "../../Types/interface/keyword/keywordData.interface";
import { KeywordApi } from "../../scripts/keyword";
import UserStatus from "./UserStatus";
import { UserListData } from "../../Types/interface/user/user";
import { UserApi } from "../../scripts/user";

interface Props {
  subscribeKeywordCount: number;
}

export default function Banner(props: Props) {
  const [recentKeyword, setRecentKeyword] = useState<KeywordData[]>([]);
  const [popularKeyword, setPopularKeyword] = useState<KeywordData[]>([]);
  const [recommendKeyword, setRecommendKeyword] = useState<KeywordData[]>([]);

  const [user, setUser] = useState<UserListData>();
  useEffect(() => {
    const fetchRecentKeyword = async () => {
      const recentKeywordData = await KeywordApi.findRecomendKeyword(
        "recent",
        10
      );
      setRecentKeyword(recentKeywordData);
    };

    const fetchPopularKeyword = async () => {
      const popularKeywordData = await KeywordApi.findRecomendKeyword(
        "popular",
        10
      );
      setPopularKeyword(popularKeywordData);
    };

    const fetchRecommendKeyword = async () => {
      const recommendKeywordData = await KeywordApi.findRecomendKeyword(
        "recommend",
        10
      );
      setRecommendKeyword(recommendKeywordData);
    };

    const fetchUserData = async () => {
      const userData = await UserApi.findOneByUserId();
      console.log("banner");
      setUser(userData);
    };

    fetchUserData();
    fetchRecentKeyword();
    fetchPopularKeyword();
    fetchRecommendKeyword();
  }, []);

  if (user) {
    return (
      <header className="banner">
        <UserStatus
          userId={user.userId}
          userProfileImg={user.userProfileImage}
          nickname={user.userNickname}
          age={user.userAge}
          gender={user.userGender}
          subscribeKeywordCount={props.subscribeKeywordCount}
          mainKeyword={user.userMainKeyword}
          isMine={true}
        />
        <div className="popular__keyword_list">
          <KeywordBanner
            keywordLabel="최근 추가된 키워드에요!"
            keywordData={recentKeyword}
          />

          <KeywordBanner
            keywordLabel="유키독의 인기 키워드에요!"
            keywordData={popularKeyword}
          />

          <KeywordBanner
            keywordLabel={user.userNickname + "님을 위한 추천 키워드에요!"}
            keywordData={recommendKeyword}
          />
        </div>

        {/* <div className="banner__contents"></div> */}
        <div className="banner--fadeBottom" />
      </header>
    );
  } else {
    return <div></div>;
  }
}
