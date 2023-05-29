import React from "react";
import googleSocialLoginButton from "src/assets/images/googleLoginButton.jpeg";
import "./Button.css";
import { AuthApi } from "../scripts/auth";

export default function GoogleLoginButton() {
  return (
    <div className="login__button">
      <img
        onClick={() => {
          AuthApi.execGoogleSocialLogin();
        }}
        className="loginButton__image"
        src={googleSocialLoginButton}
        alt="google social login"
      ></img>
    </div>
  );
}
