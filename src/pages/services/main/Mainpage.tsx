import Banner from "@root/components/Banner";
import Row from "@root/components/Row";
import { findAll } from "@root/components/scripts/keyword";
import React, { useEffect, useState } from "react";

interface keywordData {
  keyword: string;
  keywordId: number;
}

export default function Mainpage() {
  const [rowData, setRowData] = useState<keywordData[]>([]);

  useEffect(() => {
    fetchRowData();
  }, []);

  const fetchRowData = async () => {
    const keywordData: keywordData[] | [] = await findAll();

    setRowData(keywordData);
  };
  if (rowData) {
    return (
      <div>
        <Banner />
        {rowData.map((keywordData, data) => (
          <Row key={keywordData.keywordId} keyword={keywordData.keyword}></Row>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}
