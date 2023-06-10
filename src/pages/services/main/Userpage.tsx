import UserStatus from '@root/components/Banner/UserStatus';
import { UserListData } from '@root/components/Types/interface/user/user';
import { UserApi } from '@root/components/scripts/user';
import MenuList from '@root/components/user/Menu/MenuList';
import UserProfileEditModal from '@root/components/user/UserProfileEditModal';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

export default function UserPage() {

    const [searchParams] = useSearchParams();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
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
                {activeButton === `mine` ?
                    <div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button className="button__border button__text"
                                style={{ backgroundColor: '#666666' }}
                                onClick={() => setIsOpenModal(true)}>
                                프로필 수정</button>
                        </div>
                        {isOpenModal &&
                            <UserProfileEditModal

                                setIsOpenModal={setIsOpenModal}
                            />
                        }

                        <UserStatus

                            userId={queryUserId ? parseInt(queryUserId) : user.userId}
                            nickname={user?.userNickname}
                            age={user.userAge}
                            gender={user.userGender}
                            userProfileImg={user.userProfileImage}
                        />
                    </div>
                    : null

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
