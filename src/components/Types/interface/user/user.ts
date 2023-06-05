export interface UserListData {
  userId: number;
  userNickname: string;
  userGender: `man` | `woman` | `none`;
  userJob: string;
  userCreatedAt: Date;
  userUpdatedAt: Date;
  userProfileImage: string;
  userAge: string;
}
