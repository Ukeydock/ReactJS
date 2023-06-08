import UserStatus from '@root/components/Banner/UserStatus';
import { UserListData } from '@root/components/Types/interface/user/user';
import { UserApi } from '@root/components/scripts/user';
import MenuList from '@root/components/user/Menu/MenuList';
import React, { useEffect, useState } from 'react'

export default function Userpage() {

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
            <MenuList buttonName={activeButton} fetchActiveButton={fetchActiveButton} />
        )

    } else {
        return (
            <div>
                로딩중
            </div>
        )
    }
}
