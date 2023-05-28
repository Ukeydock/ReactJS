import Keyword from "@root/components/Keyword/Keyword";
import Row from "@root/components/Row";
import { SelectButton } from "@root/components/Types/interface/keyword/SelectButton";
import { findAll } from "@root/components/scripts/keyword";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "@css/InputBox.css";

interface KeywordResult {
  keyword: string;
  keywordId: number;
  isExistKeyword: boolean;
}

export default function SearchPage() {
  const [searchKeywordResults, setSearchKeywordResults] = useState<
    KeywordResult[] | []
  >([]);
  const [selectedButton, setSelectedButton] = useState<SelectButton>({
    keyword: "",
    keywordId: 0,
  });

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let searchTerm = query.get("keyword");

  useEffect(() => {
    const fetchSearchKeywordResult = async () => {
      if (searchTerm) {
        const keywordData = await findAll(searchTerm);
        setSearchKeywordResults(keywordData);
      }
      if (!searchTerm) {
        setSearchKeywordResults([]);
        setSelectedButton({ keyword: "", keywordId: 0 });
      }
    };
    fetchSearchKeywordResult();
  }, [searchTerm]);

  const handleSelectButton = (keywordId: number, keyword: string) => {
    if (selectedButton.keyword === keyword) {
      setSelectedButton({ keyword: "", keywordId: 0 });
      return;
    }

    setSelectedButton({ keyword, keywordId });
  };

  if (searchKeywordResults?.length > 0) {
    const keywordComponent = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span className="keyword__list" style={{ marginTop: "20px" }}>
          {searchKeywordResults.map((searchKeywordData) => {
            return (
              <Keyword
                {...searchKeywordData}
                selectedButton={selectedButton.keyword}
                handleSelectButton={handleSelectButton}
              />
            );
          })}
        </span>
      </div>
    );
    if (selectedButton.keyword) {
      return (
        <div>
          {keywordComponent}
          <Row {...selectedButton} />
        </div>
      );
    } else {
      return <div>{keywordComponent}</div>;
    }
  } else {
    return <div></div>;
  }
}
