import { UserListData } from "@root/Types/interface/user/user";
import Filter from "@root/components/Video/Filter/Filter";
import VideoList from "@root/components/Video/List";
import { KeywordApi } from "@root/scripts/keyword";
import React, { useEffect, useState } from "react";

interface Props {
  user: UserListData;
}

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

export default function Recent(props: Props) {
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

  return (
    <div>
      <Filter user={props.user} />
      <VideoList />
    </div>
  );
}
