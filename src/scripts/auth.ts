import axios from "@root/scripts/axios";
import Cookies from "js-cookie";


export class AuthApi {
   static async execGoogleSocialLogin(googleResponse: any) {
    const {credential} = googleResponse


    const res = await axios.post(`/auth/google/callback`, {token : credential})
    
    return res.data.data

  }

  static findUserIdByAccessToken = () => {
  const appToken = localStorage.getItem("appToken");
    if (appToken) {
      const userId = JSON.parse(atob(appToken.split(".")[1])).userId;
      return userId;
    }
  }
}
