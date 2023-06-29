import {
  FilterInterface,
  orderObject,
  sort,
  sortObject,
} from "@root/Types/interface/filter/filter.interface";
import { KeywordData } from "@root/Types/interface/keyword/keywordData.interface";
import { UserListData } from "@root/Types/interface/user/user";
import Filter from "@root/components/Video/Filter/Filter";
import VideoList from "@root/components/Video/List";
import { KeywordApi } from "@root/scripts/keyword";
import React, { Key, useEffect, useState } from "react";

interface Props {
  user: UserListData;
  keywordList: KeywordData[];
}

export default function Recent(props: Props) {
  const [filter, setFilter] = useState<FilterInterface>({
    keyword: "",
    order: orderObject.DESC,
    sort: sortObject.date,
  });

  return (
    <div>
      <Filter
        user={props.user}
        filter={filter}
        setFilter={setFilter}
        keywordList={props.keywordList}
      />
      <VideoList user={props.user} filter={filter} />
    </div>
  );
}
