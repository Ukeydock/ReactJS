import "./Button.css";
import { AuthApi } from "../../scripts/auth";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleLoginButton() {
  const execLogin = async (googleResponse: any) => {
    const { appToken, existNickname } = await AuthApi.execGoogleSocialLogin(
      googleResponse
    );
    localStorage.setItem("appToken", appToken);
    if (existNickname) {
      window.location.replace("/api/main");
    }
    if (!existNickname) {
      window.location.replace("/start");
    }
  };

  return (
    <GoogleOAuthProvider clientId="632307209725-bg70ojf2bst34ipl0icmajlc5eai7ook.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(googleResponse) => {
          execLogin(googleResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
    </GoogleOAuthProvider>

    // <div className="login__button">
    //   <img
    //     onClick={() => {
    //       AuthApi.execGoogleSocialLogin();
    //     }}
    //     className="loginButton__image"
    //     src={googleSocialLoginButton}
    //     alt="google social login"
    //   ></img>
    // </div>
  );
}
