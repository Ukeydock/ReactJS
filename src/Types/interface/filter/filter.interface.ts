export type sort = "date" | "view" | "like" | "comment";

export type filterKeyValue = null | "keyword" | "order" | "sort"

export interface filterKeyObject {
  key: string;
  ko: string;
  en: string;
}

export interface FilterInterface {
  keyword : string ;
  order: filterKeyObject;
  sort: filterKeyObject;
}

export const orderObject = {
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

export const sortObject  = {
  date: {
    key: `date`,
    ko: `날짜`,
    en: `date`,
  },
  view: {
    key: `view`,
    ko: `조회수`,
    en: `view`,
  },
  like: {
    key: `like`,
    ko: `좋아요`,
    en: `like`,
  },
  comment: {
    key: `comment`,
    ko: `댓글`,
    en: `comment`,
  },
};