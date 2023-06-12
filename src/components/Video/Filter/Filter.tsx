import React, { useEffect, useState } from "react";
import KeywordFilter from "./KeywordFilter";
import { KeywordApi } from "@root/scripts/keyword";
import { UserListData } from "@root/Types/interface/user/user";

interface order {
  key: string;
  ko: string;
  en: string;
}

const orderObject = {
  ASC: {
    key: `ASC`,
    ko: `오름차순`,
    en: `ASC`,
  },
  DESC: {
    key: `DESC`,
    ko: `내림차순`,
    en: `DESC`,
  },
};

type sort = `date` | `view` | `like` | `comment`;

interface Filter {
  keyword: string[];
  order: order;
  sort: sort;
}

interface Props {
  user: UserListData;
}

export default function Filter(props: Props) {
  const [filter, setFilter] = useState<Filter>({
    keyword: [],
    order: orderObject.ASC,
    sort: `date`,
  });

  useEffect(() => {
    const fetchKeyword = async () => {
      const keywordData = await KeywordApi.findAllByUserId(props.user.userId);
      setFilter({
        keyword: keywordData,
        order: filter.order,
        sort: filter.sort,
      });
    };

    fetchKeyword();
  }, []);
  console.log(filter);
  useEffect(() => {}, [filter]);

  return (
    <div style={{ display: "flex", height: "30px", justifyContent: "center" }}>
      <div
        className="user__menu filter__box"
        style={{ justifyContent: "flex-start" }}
      >
        <KeywordFilter />
        <KeywordFilter />
        <KeywordFilter />
      </div>
    </div>
  );
}
