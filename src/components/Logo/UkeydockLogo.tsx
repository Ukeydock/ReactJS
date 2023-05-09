import React from "react";
import "@root/components/css/logo.css";
import { logoClassNameInterface } from "../Types/interface/interface";

export default function UkeydockLogo(props: logoClassNameInterface) {
  return (
    <div className="logo">
      <p className={props.className}>Ukeydock</p>
    </div>
  );
}
