import React, { useEffect, useState } from "react";
import { UserListData } from "../../Types/interface/user/user";
import UserProfile from "./UserProfile";
import { SelectButton } from "../../Types/interface/keyword/SelectButton.interface";
import { KeywordData } from "../../Types/interface/keyword/keywordData.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";

interface Props {
  userData: UserListData[];
  setKeywordInModal?: (keywordData: KeywordData) => void;
}

export default function UserList(props: Props) {
  const [selectedButton, setSelectedButton] = useState<SelectButton>({
    keyword: "",
    keywordId: 0,
  });

  useEffect(() => {
    if (props.setKeywordInModal && selectedButton.keyword) {
      props.setKeywordInModal({
        keyword: selectedButton.keyword,
        keywordId: selectedButton.keywordId,
        isExistKeyword: false,
      });
    }
  }, [selectedButton]);

  return (
    <div style={{ color: "white", display: "flex" }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        navigation // arrow 버튼 사용 유무
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
        slidesPerView={1} // 기본값으로 한 번에 보이는 슬라이드 개수를 1로 설정
        slidesPerGroup={1} // 기본값으로 몇 개씩 슬라이드할지를 1로 설정
      >
        {props.userData.map((user) => (
          <SwiperSlide key={user.userId}>
            <UserProfile
              key={user.userId}
              userData={user}
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
