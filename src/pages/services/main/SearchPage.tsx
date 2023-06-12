import Keyword from "@root/components/Keyword/Keyword";
import Row from "@root/components/Row";
import { SelectButton } from "@root/Types/interface/keyword/SelectButton";
import { KeywordData } from "@root/Types/interface/keyword/keywordData.interface";
import { KeywordApi } from "@root/scripts/keyword";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const [searchKeywordResults, setSearchKeywordResults] = useState<
    KeywordData[] | []
  >([]);
  const [selectedButton, setSelectedButton] = useState<KeywordData>({
    keyword: "",
    keywordId: 0,
    isExistKeyword: false,
  });

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let searchTerm = query.get("keyword");

  useEffect(() => {
    const fetchSearchKeywordResult = async () => {
      if (searchTerm) {
        const keywordData = await KeywordApi.findAll(searchTerm);
        setSearchKeywordResults(keywordData);
      }
      if (!searchTerm) {
        setSearchKeywordResults([]);
        setSelectedButton({ keyword: "", keywordId: 0, isExistKeyword: false });
      }
    };
    fetchSearchKeywordResult();
  }, [searchTerm]);

  const handleSelectButton = (keywordId: number, keyword: string) => {
    if (selectedButton.keyword === keyword) {
      setSelectedButton({ keyword: "", keywordId: 0, isExistKeyword: false });
      return;
    }

    setSelectedButton({ keyword, keywordId, isExistKeyword: false });
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
          <Row keywordData={selectedButton} />
        </div>
      );
    } else {
      return <div>{keywordComponent}</div>;
    }
  } else {
    return <div></div>;
  }
}
