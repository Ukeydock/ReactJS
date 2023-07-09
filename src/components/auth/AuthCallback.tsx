import { CustomError } from "../error/CatchError";
import ErrorPage from "@root/pages/services/error.page";
import Cookies from "js-cookie";

const parseCookies = (cookiesString: string) => {
  const cookies: Record<string, string> = {};

  cookiesString.split(";").forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = decodeURIComponent(value);
  });
  return cookies;
};

const deleteCookies = (cookiesString: string) => {
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
  console.log(cookieData);
  if (cookieData.accessToken) {
    localStorage.setItem(`appToken`, cookieData.accessToken);

    var currentCookies = Cookies.get(); // 모든 쿠키를 가져옵니다

    for (var currentCookie in currentCookies) {
      Cookies.remove(currentCookie); // 각 쿠키를 삭제합니다
    }

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
