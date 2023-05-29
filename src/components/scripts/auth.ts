export class AuthApi {
  static execGoogleSocialLogin() {
    window.location.replace("http://localhost:3000/auth/google/login");
  }
}
