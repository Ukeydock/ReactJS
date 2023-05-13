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
  const appToken = parseCookies(cookie);

  if (appToken.accessToken) {
    localStorage.setItem(`appToken`, appToken.accessToken);
    window.location.href = "/start";
  }
  if (!appToken.accessToken) {
    throw new CustomError("로그인에 실패하였습니다.", "/start", true);
  }
  // console.log(window.location.search.replace("?", "").split("="));

  return <ErrorPage />;
}
