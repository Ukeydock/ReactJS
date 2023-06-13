import React, { useEffect, useState } from "react";
import KeywordFilter from "./KeywordFilter";
import { KeywordApi } from "@root/scripts/keyword";
import { UserListData } from "@root/Types/interface/user/user";
import {
  FilterInterface,
  filterValue,
  order,
  sort,
} from "@root/Types/interface/filter/filter.interface";
import { KeywordData } from "@root/Types/interface/keyword/keywordData.interface";

interface Props {
  user: UserListData;
  filter: FilterInterface;
  setFilter: React.Dispatch<React.SetStateAction<FilterInterface>>;
}

export default function Filter(props: Props) {
  const [keywordList, setKeywordList] = useState<KeywordData[]>([]);
  const [modal, setModal] = useState<filterValue>(null);

  const filterList = {
    keyword: [],
    order: [
      { key: "ASC", ko: "오름차순", en: "ASC" },
      { key: "DESC", ko: "내림차순", en: "DESC" },
    ],
    sort: [
      { key: "date", ko: "날짜", en: "date" },
      { key: "view", ko: "조회수", en: "view" },
      { key: "like", ko: "좋아요", en: "like" },
      { key: "comment", ko: "댓글", en: "comment" },
    ],
  };

  const fetchFilterKeyword = async (keyword: string) => {
    props.setFilter((prev) => ({ ...prev, keyword }));
  };

  const fetchFilterOrder = async (order: order) => {
    props.setFilter((prev) => ({ ...prev, order }));
  };

  const fetchFilterSort = async (sort: sort) => {
    props.setFilter((prev) => ({ ...prev, sort }));
  };

  return (
    <div style={{ display: "flex", height: "30px", justifyContent: "center" }}>
      <div
        className="user__menu filter__box"
        style={{ justifyContent: "flex-start" }}
      >
        <KeywordFilter
          filterList={filterList.keyword}
          setFilterValue={fetchFilterKeyword}
          modalData={{
            isOpen: modal === "keyword",
            setModal: setModal,
          }}
        />
        <KeywordFilter
          filterList={filterList.order}
          setFilterValue={fetchFilterOrder}
          modalData={{
            isOpen: modal === "order",
            setModal: setModal,
          }}
        />
        <KeywordFilter
          filterList={filterList.sort}
          setFilterValue={fetchFilterSort}
          modalData={{
            isOpen: modal === "sort",
            setModal: setModal,
          }}
        />
      </div>
    </div>
  );
}
