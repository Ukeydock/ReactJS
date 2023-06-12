import React, { useEffect, useState } from "react";
import KeywordFilter from "./KeywordFilter";
import { KeywordApi } from "@root/scripts/keyword";
import { UserListData } from "@root/Types/interface/user/user";

interface Props {
  user: UserListData;
}

export default function Filter(props: Props) {
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
