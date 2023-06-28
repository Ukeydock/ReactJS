export class AuthApi {
  static execGoogleSocialLogin() {
    window.location.replace("http://localhost:3000/auth/google/login");
  }

  static findUserIdByAccessToken = () => {
    const appToken = localStorage.getItem("appToken");
    if (appToken) {
      const userId = JSON.parse(atob(appToken.split(".")[1])).userId;
      return userId;
    }
  }
}
