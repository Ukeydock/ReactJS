import React from "react";
import keydog from "src/assets/images/keydog.jpeg";
import "@root/css/image.css";
import { imageClassNameInterface } from "../Types/interface/image";

export default function Keydog(props: imageClassNameInterface) {
  return <img className={props.className} src={keydog} alt="KeydogImage"></img>;
}
