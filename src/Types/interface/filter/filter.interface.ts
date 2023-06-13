export type sort = `date` | `view` | `like` | `comment`;

export type filterValue = null | "keyword" | "order" | "sort"

export interface order {
  key: string;
  ko: string;
  en: string;
}

export interface FilterInterface {
  keyword: string | null;
  order: order;
  sort: sort;
}