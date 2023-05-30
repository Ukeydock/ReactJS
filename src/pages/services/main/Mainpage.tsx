import Banner from "@root/components/Banner";
import Row from "@root/components/Row";
import { keywordData } from "@root/components/Types/interface/keyword/keywordData.interface";
import { KeywordApi } from "@root/components/scripts/keyword";
import React, { useEffect, useState } from "react";

export default function Mainpage() {
  const [rowData, setRowData] = useState<keywordData[]>([]);

  useEffect(() => {
    fetchRowData();
  }, []);

  const fetchRowData = async () => {
    const keywordData: keywordData[] | [] = await KeywordApi.findAllByUserId();

    setRowData(keywordData);
  };
  if (rowData) {
    return (
      <div>
        <Banner />
        {rowData.map((keywordData, data) => (
          <Row keywordData={keywordData} key={keywordData.keywordId}></Row>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}
