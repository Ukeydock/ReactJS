import React from 'react'
import "@css/BannerUser.css"

interface Props {
    // 구독한 키워드의 수
    subscribeKeywordCount: number;
}

/**
 * @description : 구독한 키워드 수, 유저의 나이, 성별, 닉네임,  
 *
 * @returns 
 */
export default function UserStatus(props: Props) {



    return (
        <div className='banner__user'>
            <div className='banner__user__info'>
                안녕하세요
            </div>

        </div>
    )
}
