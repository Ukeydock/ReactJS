import React, { useEffect, useState } from "react";
import "@css/Nav.css";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@root/assets/images/UkeydockLogo.png";
import UkeydockLogo from "./Logo/UkeydockLogo";
import { logoClassName } from "./Types/enum/keydog";
import { UserListData } from "./Types/interface/user/user";
import { UserApi } from "./scripts/user";
import Keydog from "./Image/Keydog";
import { imageClassName } from "./Types/enum/image";

export default function Nav() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [searchKeyword, setKeywordValue] = useState<string>("");
  const [userData, setUserData] = useState<UserListData>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNavColorByScroll = async () => {
      window.addEventListener("scroll", () => {
        // console.log("window.scrollY", window.scrollY);

        if (window.scrollY > 60) {
          setShow(true);
        } else {
          setShow(false);
        }
      });
    };
    const fetchUserData = async () => {
      const userData = await UserApi.findOneByUserId();
      console.log(userData);
      setUserData(userData);
    };

    const fetchSearchKeywordResult = async () => {
      const queryParams = new URLSearchParams(location.search);
      const keyword = queryParams.get("keyword");
      setKeywordValue(keyword ?? "");
    };

    fetchNavColorByScroll();
    fetchUserData();
    fetchSearchKeywordResult();
  }, []);

  async function handleChange(e: any) {
    setKeywordValue(e.target.value);

    navigate(`/api/search?keyword=${e.target.value}`);
  }

  const handleClikeLogo = () => {
    navigate(`/api/main`);
  };

  return (
    <nav className={`nav ${show && "nav_black"}`}>
      <div className="content-area">
        <img
          src={logo}
          onClick={() => {
            handleClikeLogo();
          }}
          alt="Ukeydock"
          className="nav__logo"
        ></img>

        <input
          value={searchKeyword}
          onChange={handleChange}
          className="nav__input"
          type="text"
          placeholder="키워드를 입력해주세요"
        />

        {userData && (
          <img
            alt="User logo"
            src={userData.userProfileImage}
            className="nav__avatar"
          />
        )}
        {!userData && <Keydog className={imageClassName.image__big} />}
      </div>
    </nav>
  );
}

export {};
