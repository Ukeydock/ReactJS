import Keyword from "@root/components/Keyword/Keyword";
import Row from "@root/components/Row";
import { findAll } from "@root/components/scripts/keyword";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface KeywordResult {
  keyword: string;
  keywordId: number;
}

export default function SearchPage() {
  const [searchKeywordResults, setSearchKeywordResults] = useState<
    KeywordResult[] | []
  >([]);
  const [selectedButton, setSelectedButton] = useState<string>("");

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
        setSelectedButton("");
      }
    };
    fetchSearchKeywordResult();
  }, [searchTerm]);

  const handleSelectButton = (name: string) => {
    if (selectedButton === name) {
      setSelectedButton("");
      return;
    }

    setSelectedButton(name);
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
                selectedButton={selectedButton}
                handleSelectButton={handleSelectButton}
              />
            );
          })}
        </span>
      </div>
    );
    if (selectedButton) {
      return (
        <div>
          {keywordComponent}
          <Row keyword={selectedButton} />
        </div>
      );
    } else {
      return <div>{keywordComponent}</div>;
    }
  } else {
    return <div></div>;
  }
}
