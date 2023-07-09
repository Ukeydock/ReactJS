import GoogleLoginButton from "src/components/buttons/GoogleLoginButton";
import UkeydockLogo from "@root/components/Logo/UkeydockLogo";
import { logoClassName } from "@root/Types/enum/keydog";
import Keydog from "@root/components/Image/Keydog";
import { imageClassName } from "@root/Types/enum/image";
import { useEffect } from "react";
import { UserApi } from "@root/scripts/user";

export default function AuthMain() {
  useEffect(() => {
    const checkLogin = async () => {
      const loginUserData = await UserApi.findOneByUserId();
      if (loginUserData) {
        window.location.replace(`/api/main`);
      }
    };
    checkLogin();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <UkeydockLogo className={logoClassName.logo__big} />
      <Keydog className={imageClassName.image__big} />
      <GoogleLoginButton />
    </div>
  );
}
