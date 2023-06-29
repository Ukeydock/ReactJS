import React, { useEffect, useState } from "react";
import KeywordFilter from "./KeywordFilter";
import { KeywordApi } from "@root/scripts/keyword";
import { UserListData } from "@root/Types/interface/user/user";
import {
  FilterInterface,
  filterKeyValue,
  orderObject,
  sort,
  sortObject,
} from "@root/Types/interface/filter/filter.interface";
import { KeywordData } from "@root/Types/interface/keyword/keywordData.interface";

interface Props {
  user: UserListData;
  filter: FilterInterface;
  setFilter: React.Dispatch<React.SetStateAction<FilterInterface>>;
  keywordList: KeywordData[];
}

export default function Filter(props: Props) {
  const [modal, setModal] = useState<filterKeyValue>(null);
  const [filterList, setFilterList] = useState({
    keyword: [{ key: "", ko: "키워드를 추가해주세요!" }],
    order: Object.values(orderObject).map((value) => ({
      key: value.key,
      ko: value.ko,
      en: value.en,
    })),
    sort: Object.values(sortObject).map((value) => ({
      key: value.key,
      ko: value.ko,
      en: value.en,
    })),
  });

  useEffect(() => {
    const fetchKeywordList = async () => {
      if (props.keywordList.length === 0) return;
      setFilterList((prev) => ({
        ...prev,
        keyword: props.keywordList.map((keyword) => ({
          key: keyword.keyword,
          ko: keyword.keyword,
        })),
      }));
    };

    fetchKeywordList();
  }, []);

  const fetchFilterKeyword = async (keyword: string) => {
    props.setFilter((prev) => ({ ...prev, keyword }));
  };

  const fetchFilterOrder = async (order: "ASC" | "DESC") => {
    props.setFilter((prev) => ({ ...prev, order: orderObject[order] }));
  };

  const fetchFilterSort = async (sort: sort) => {
    props.setFilter((prev) => ({ ...prev, sort: sortObject[sort] }));
  };

  return (
    <div style={{ display: "flex", height: "30px", justifyContent: "center" }}>
      <div
        className="user__menu filter__box"
        style={{ justifyContent: "flex-start" }}
      >
        <KeywordFilter
          buttonNmae={props.filter.keyword || "키워드"}
          filterList={filterList.keyword}
          setFilterValue={fetchFilterKeyword}
          modalData={{
            isOpen: modal === "keyword",
            setModal: setModal,
            key: "keyword",
          }}
          currentValue={props.filter.keyword}
        />
        <KeywordFilter
          buttonNmae={props.filter.sort.ko || "정렬기준"}
          filterList={filterList.sort}
          setFilterValue={fetchFilterSort}
          modalData={{
            isOpen: modal === "sort",
            setModal: setModal,
            key: "sort",
          }}
          currentValue={props.filter.sort.key}
        />
        <KeywordFilter
          buttonNmae={props.filter.order.ko || "정렬순서"}
          filterList={filterList.order}
          setFilterValue={fetchFilterOrder}
          modalData={{
            isOpen: modal === "order",
            setModal: setModal,
            key: "order",
          }}
          currentValue={props.filter.order.key}
        />
      </div>
    </div>
  );
}
