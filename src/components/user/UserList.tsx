import React from "react";
import { UserListData } from "../Types/interface/user/user";
import UserProfile from "./UserProfile";

interface Props {
  userData: UserListData[];
}

export default function UserList(props: Props) {
  return (
    <div style={{ color: "white" }}>
      {props.userData.map((user) => (
        <UserProfile userData={user} />
      ))}
    </div>
  );
}
