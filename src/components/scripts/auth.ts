import axios from "@root/components/scripts/axios";

export async function execGoogleSocialLogin() {
  window.location.replace("http://localhost:3000/auth/google/login");
}
