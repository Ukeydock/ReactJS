import {
  FilterInterface,
  order,
  sort,
} from "@root/Types/interface/filter/filter.interface";
import { UserListData } from "@root/Types/interface/user/user";
import Filter from "@root/components/Video/Filter/Filter";
import VideoList from "@root/components/Video/List";
import { KeywordApi } from "@root/scripts/keyword";
import React, { useEffect, useState } from "react";

interface Props {
  user: UserListData;
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

export default function Recent(props: Props) {
  const [filter, setFilter] = useState<FilterInterface>({
    keyword: null,
    order: orderObject.ASC,
    sort: `date`,
  });

  useEffect(() => {
    const fetchKeyword = async () => {};

    fetchKeyword();
  }, []);

  return (
    <div>
      <Filter user={props.user} filter={filter} setFilter={setFilter} />
      <VideoList />
    </div>
  );
}
