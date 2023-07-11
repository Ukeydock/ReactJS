import { useEffect, useRef, useState } from "react";
import "@css/BannerUser.css";
import { KeywordApi } from "../../scripts/keyword";
import { UserApi } from "../../scripts/user";
import { UserGender, UserListData } from "../../Types/interface/user/user";

interface Props {
  // 구독한 키워드의 수

  user: UserListData;

  subscribeKeywordCount?: number;

  isMine: boolean;

  setUser: (user: UserListData) => void;
}

/**
 * @description : 구독한 키워드 수, 유저의 나이, 성별, 닉네임,
 *
 * @returns
 */
export default function UserStatus(props: Props) {
  const [subscribeKeyword, setsubscribeKeyword] = useState(
    props.subscribeKeywordCount
  );

  const [profileImageMouse, setProfileImageMouse] = useState<boolean>(false);

  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSubscribeKeyword = async () => {
      if (!props.subscribeKeywordCount) {
        const subscribeKeywordData = await KeywordApi.findAllByUserId();

        setsubscribeKeyword(subscribeKeywordData.length);
      }
    };

    fetchSubscribeKeyword();
  }, []);

  const handleImageChange = async () => {
    if (inputFileRef.current && props.isMine) {
      inputFileRef.current.click();
    } else {
      window.open(props.user.userProfileImage, "_blank");
    }
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    const userProfileImageData = await UserApi.updateUserProfile(formData);
    props.setUser({
      ...props.user,
      userProfileImage: userProfileImageData.fileSavePath,
    });

    window.location.reload();
    // UserApi.updateProfileImage(formData)
  };
  console.log(props.user.userGender);
  return (
    <div className="banner__user" style={{ color: "white" }}>
      <div className="banner__user__info__box">
        <div className="banner__user__info">
          <div className={"banner__user__profile"}>
            <img
              src={
                props.user.userProfileImage ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfbP2PbB_Seuw0wrFxWqjZmr7erq1ncL2N6Q&usqp=CAU"
              }
              className={
                "banner__user__profile__img" +
                `${profileImageMouse ? " hover_mouse" : ""}`
              }
              onMouseEnter={() => {
                setProfileImageMouse(true);
              }}
              onMouseLeave={() => {
                setProfileImageMouse(false);
              }}
              onClick={handleImageChange}
            />
            <input
              type="file"
              style={{ display: "none" }}
              ref={inputFileRef}
              onChange={(e) => {
                if (!e.target.files) return;

                handleFileChange(e);
              }}
            />
          </div>
          <div className="banner__user__status__box">
            <div style={{ textAlign: "center" }}>
              {props.user.userNickname}{" "}
            </div>
            <div
              style={{
                display: "flex",
                flex: "0 0 100%",
                flexDirection: "row",
              }}
            >
              <div className="banner__user__status">
                <div className="banner__user_status__info">
                  <p>구독한 키워드 : {subscribeKeyword}</p>
                </div>
                <div className="banner__user_status__info">
                  <p>{props.user.userAge}</p>
                </div>
              </div>
              <div className="banner__user__status">
                <div className="banner__user_status__info">
                  <p>대표 키워드 : {props.user.userMainKeyword}</p>
                </div>
                <div className="banner__user_status__info">
                  <p>
                    {props.user.userGender === "man"
                      ? "남자 🧑🏻"
                      : props.user.userGender === "women"
                      ? "여자 👩🏻"
                      : "선택안함 😎"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
