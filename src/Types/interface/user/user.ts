export type UserGender = `man` | `women` | `none` | "";

export interface UserListData {
  userId: number;
  userNickname: string;
  userGender: UserGender;
  userJob: string;
  userCreatedAt: Date;
  userUpdatedAt: Date;
  userProfileImage: string;
  userAge: string;
  userBirthday: Date;
  userMainKeyword: string;
}
