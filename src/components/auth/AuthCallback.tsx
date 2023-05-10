import React from "react";
import { useLocation } from "react-router-dom";
import { CustomError } from "../error/CatchError";
import ErrorPage from "@root/pages/services/error.page";

export default function AuthCallback() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const appToken = searchParams.get("appToken");
  if (appToken) {
    localStorage.setItem(`appToken`, appToken);
  }
  if (!appToken) {
    throw new CustomError("로그인에 실패하였습니다.", "/start", true);
  }
  // console.log(window.location.search.replace("?", "").split("="));

  return <ErrorPage></ErrorPage>;
}
