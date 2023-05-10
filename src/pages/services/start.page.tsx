import GoogleLoginButton from "src/components/buttons/GoogleLoginButton";
import keydog from "src/assets/images/keydog.jpeg";
import UkeydockLogo from "@root/components/Logo/UkeydockLogo";
import { logoClassName } from "@root/components/Types/enum/keydog";
import Keydog from "@root/components/Image/Keydog";
import { imageClassName } from "@root/components/Types/enum/image";

export default function StartMain() {
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
