import React from "react";
import { useLocation } from "react-router-dom";
import { CustomError } from "../error/CatchError";
import ErrorPage from "@root/pages/services/error.page";

const parseCookies = (cookiesString: string) => {
  const cookies: Record<string, string> = {};

  cookiesString.split(";").forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = decodeURIComponent(value);
  });
  return cookies;
};

export default function AuthCallback() {
  const cookie = document.cookie;
  const cookieData = parseCookies(cookie);

  if (cookieData.accessToken) {
    localStorage.setItem(`appToken`, cookieData.accessToken);
    if (cookieData.existNickname === "true") {
      window.location.href = "/api/main";
    }
    if (cookieData.existNickname === "false") {
      window.location.href = "/start";
    }
  }
  if (!cookieData.accessToken) {
    throw new CustomError("로그인에 실패하였습니다.", "/start", true);
  }
  // console.log(window.location.search.replace("?", "").split("="));

  return <ErrorPage />;
}
