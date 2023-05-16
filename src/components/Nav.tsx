import React, { useEffect, useState } from "react";
import "@css/Nav.css";
import { useNavigate } from "react-router-dom";
import logo from "@root/assets/images/UkeydockLogo.png";
import UkeydockLogo from "./Logo/UkeydockLogo";
import { logoClassName } from "./Types/enum/keydog";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // console.log("window.scrollY", window.scrollY);

      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {};
  });

  function handleChange(e: any) {
    setSearchValue(e.target.value);
  }

  const handleClikeLogo = () => {
    navigate(`/api/main`);
  };

  return (
    <nav className={`nav ${show && "nav_black"}`}>
      <img
        src={logo}
        onClick={() => {
          handleClikeLogo();
        }}
        alt="Ukeydock"
        className="nav__logo"
      ></img>

      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="키워드를 입력해주세요"
      />
      <img
        alt="User logo"
        src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
        className="nav__avatar"
      />
    </nav>
  );
}

export {};