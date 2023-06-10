import UserStatus from '@root/components/Banner/UserStatus';
import { UserListData } from '@root/components/Types/interface/user/user';
import { UserApi } from '@root/components/scripts/user';
import MenuList from '@root/components/user/Menu/MenuList';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

export default function UserPage() {

    const [searchParams] = useSearchParams();

    // 쿼리 값 가져오기
    const queryUserId = searchParams.get('userId');


    const [user, setUser] = useState<UserListData>()
    const [activeButton, setActiveButton] = useState<`mine` | `recent` | `otherUser`>('mine')

    const fetchActiveButton = (button: `mine` | `recent` | `otherUser`) => {
        setActiveButton(button)
    }

    useEffect(() => {


        const fetchUserData = async () => {
            const userData = await UserApi.findUser();
            setUser(userData);
        };

        fetchUserData()
    }, [])


    if (user) {
        return (
            <div>
                <MenuList buttonName={activeButton} fetchActiveButton={fetchActiveButton} />

                {/* 나의 페이지 */}
                {activeButton === `mine` ? <UserStatus

                    userId={queryUserId ? parseInt(queryUserId) : user.userId}
                    nickname={user?.userNickname}
                    age={user.userAge}
                    gender={user.userGender}
                    userProfileImg={user.userProfileImage}
                /> : null

                }
            </div>
        )

    } else {
        return (
            <div>
                로딩중
            </div>
        )
    }
}
