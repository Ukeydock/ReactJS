import { filterKeyValue } from "@root/Types/interface/filter/filter.interface";
import React, { useState } from "react";
import "@css/Button.css";

interface Props {
  setFilterValue: (value: any) => void;

  filter: { key: string; ko?: string; en?: string };
  modalData: {
    isOpen: boolean;
    setModal: (value: filterKeyValue) => void;
    key: filterKeyValue;
  };
  isCurrent: boolean;
}

export default function FilterPropButton(props: Props) {
  const [isHoverButton, setIsHoverButton] = useState<boolean>(false);

  return (
    <button
      className={`filter__button ${
        props.isCurrent && "current__value__button"
      } ${isHoverButton && " hover__button"}`}
      key={props.filter.key}
      onClick={() => {
        props.modalData.setModal(null);
        props.setFilterValue(props.filter.key);
      }}
      onMouseOver={() => {
        setIsHoverButton(true);
      }}
      onMouseLeave={() => {
        setIsHoverButton(false);
      }}
    >
      {props.filter.ko}
    </button>
  );
}
