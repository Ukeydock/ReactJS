import React, { useEffect, useState } from "react";
import KeywordFilter from "../Video/Filter/KeywordFilter";
import { UserGender } from "@root/Types/interface/user/user";
import { filterKeyValue } from "@root/Types/interface/filter/filter.interface";
import { KeywordData } from "@root/Types/interface/keyword/keywordData.interface";
import { KeywordApi } from "@root/scripts/keyword";
import { KeywordUserApi } from "@root/scripts/keywordUser";

interface Props {
  isOpenMainKeyword: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
  fetchUser: (
    nickname: string | null,
    age: string | null,
    gender: UserGender | null,
    mainKeyword: string | null
  ) => void;
}

export default function UserMainKeywordEditModal(props: Props) {
  const [keywordList, setKeywordList] = useState<KeywordData[]>([]);

  useEffect(() => {
    const findAllKeywordByUserId = async () => {
      const keywordList: KeywordData[] = await KeywordApi.findAllByUserId();
      setKeywordList(keywordList);
    };
    findAllKeywordByUserId();
  }, []);

  const fetchIsOpenModal = () => {
    props.setIsOpenModal(false);
  };

  const fetchFilterKeyword = async (key: string) => {
    // console.log(keyword);
    const keywordData = keywordList.find((keyword) => keyword.keyword === key);
    if (!keywordData) return;

    await KeywordUserApi.updateMainKeyword(keywordData.keywordId);
    props.fetchUser(null, null, null, key);
  };

  return (
    <div
      className="background__color"
      style={{ color: "white", justifyContent: "center" }}
    >
      <div
        className="close__button"
        onClick={() => {
          fetchIsOpenModal();
        }}
      >
        <p>X</p>
      </div>

      <div
        className="user__menu filter__box"
        style={{ justifyContent: "flex-start" }}
      >
        <KeywordFilter
          buttonNmae={null}
          filterList={keywordList.map((keyword) => ({
            key: keyword.keyword,
            ko: keyword.keyword,
          }))}
          setFilterValue={fetchFilterKeyword}
          modalData={{
            isOpen: props.isOpenMainKeyword,
            setModal: fetchIsOpenModal,
            key: "keyword",
          }}
        />
      </div>
    </div>
  );
}
