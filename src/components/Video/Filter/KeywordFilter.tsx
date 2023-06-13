import React, { useRef } from "react";
import "@css/video/Modal.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { filterKeyValue } from "@root/Types/interface/filter/filter.interface";

// import "swiper/swiper.min.css";
// import "swiper/components/navigation/navigation.min.css";

interface Props {
  setFilterValue: (value: any) => void;
  filterList: { key: string; ko?: string; en?: string }[];
  modalData: {
    isOpen: boolean;
    setModal: (value: filterKeyValue) => void;
    key: filterKeyValue;
  };
  buttonNmae: string | null;
}

export default function KeywordFilter(props: Props) {
  const swiperRef = useRef<any>(null);

  const fetchSlide = (arrow: "up" | "down") => {
    if (swiperRef.current && swiperRef.current.swiper) {
      arrow == "up"
        ? swiperRef.current.swiper.slideNext()
        : swiperRef.current.swiper.slidePrev();
    }
  };

  const closeVideoModal = () => {
    props.modalData.setModal(null);
  };

  return (
    <div>
      <button
        className="filter__button"
        onClick={() => props.modalData.setModal(props.modalData.key)}
      >
        {props.buttonNmae ? props.buttonNmae : props.buttonNmae + "⇩"}
      </button>
      {/* 해당 버튼을 클릭한 경우에만 모달 출력 */}
      {props.modalData.isOpen && (
        <div
          className="background__color"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            className="close__button"
            onClick={() => {
              closeVideoModal();
            }}
          >
            <p>X</p>
          </div>
          <div className="filter__modal">
            <button
              onClick={() => {
                fetchSlide("up");
              }}
            >
              ⬆
            </button>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              // className="keyword__banner"
              direction="vertical"
              ref={swiperRef}
              loop={true}
              style={{ height: "100%" }}
              slidesPerView={
                props.filterList.length < 5 ? props.filterList.length : 5
              }
              // spaceBetween={10}
            >
              <div>
                {props.filterList.map((filter) => (
                  <SwiperSlide
                    key={filter.key}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <button
                      className="filter__button"
                      key={filter.key}
                      onClick={() => {
                        props.modalData.setModal(null);
                        props.setFilterValue(filter.key);
                      }}
                    >
                      {filter.ko}
                    </button>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
            <button
              onClick={() => {
                fetchSlide("down");
              }}
            >
              ⬇
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
