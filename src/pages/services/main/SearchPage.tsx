import Keyword from "@root/components/Keyword/Keyword";
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
    fetchSearchKeywordResult();
  }, [searchTerm]);

  const fetchSearchKeywordResult = async () => {
    if (searchTerm) {
      const keywordData = await findAll(searchTerm);

      setSearchKeywordResults(keywordData);
    }
  };

  const handleSelectButton = (name: string) => {
    if (selectedButton === name) {
      setSelectedButton("");
      return;
    }
    setSelectedButton(name);
  };

  // console.log(searchKeywordResults);
  if (searchKeywordResults?.length > 0) {
    return (
      <span>
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
    );
  } else {
    return <div></div>;
  }
}
