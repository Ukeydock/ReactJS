import React, { useState } from 'react'
import "@css/video/Modal.css";
import "@css/user/UserProfileEditModal.css"
import Nickname from './input/Nickname';
import Startpage from '@root/pages/services/start/Start.page';


interface Props {

    setIsOpenModal: (modal: boolean) => void
}

export default function UserProfileEditModal(props: Props) {


    const fetchIsOpenModal = () => {
        props.setIsOpenModal(false)
    }


    return (
        <div className="background__color" style={{ color: "white", justifyContent: 'center' }}>
            <div
                className="close__button"

                onClick={() => {
                    fetchIsOpenModal()
                }}
            >
                <p>X</p>
            </div>

            <div className="video__modal user__edit__container" style={{ backgroundColor: '#bbbbbb', borderRadius: '10%', border: "10px solid #333333" }}>
                <Startpage
                    nickname="권영"
                    birthday='1998-01-21'
                    gender="man"
                />

            </div>
        </div>
    )


}
