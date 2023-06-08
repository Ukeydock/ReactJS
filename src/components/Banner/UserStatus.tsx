import React from 'react'
import "@css/BannerUser.css"

interface Props {
    // 구독한 키워드의 수
    userProfileImg?: string;
    subscribeKeywordCount: number;
    nickname: string;
    age: string;
    gender: `man` | `woman` | `none`;
}

/**
 * @description : 구독한 키워드 수, 유저의 나이, 성별, 닉네임,  
 *
 * @returns 
 */
export default function UserStatus(props: Props) {



    return (
        <div className='banner__user'>
            <div className='banner__user__info__box'>
                <div className='banner__user__info'>

                    <div className='banner__user__profile'>

                        <img
                            src={props.userProfileImg ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfbP2PbB_Seuw0wrFxWqjZmr7erq1ncL2N6Q&usqp=CAU'}
                            className='banner__user__profile__img'
                        />

                    </div>
                    <div className='banner__user__status__box'>
                        <div style={{ textAlign: "center" }}>{props.nickname} </div>
                        <div style={{ display: "flex", flex: "0 0 100%", flexDirection: 'row' }}>
                            <div className='banner__user__status'>
                                <div className='banner__user_status__info'><p>{props.subscribeKeywordCount}</p></div>
                                <div className='banner__user_status__info'><p>{props.age}</p></div>
                            </div>
                            <div className='banner__user__status' >
                                <div className='banner__user_status__info'><p>안녕</p></div>
                                <div className='banner__user_status__info'><p>하이</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
