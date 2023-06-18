import React, { useState, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';
import Modal from '../Modal/Modal';
import './Notification.css';

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false); //modal

    return (
        <>
            <button className='flex app__pointer app__notification' onClick={() => setIsOpen(true)}>
                <FiBell fontSize={24} color="black" className='app__notification_bell'></FiBell>
            </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <p>Notificações</p>
                <div>

                </div>
            </Modal>
        </>
    )
}

export default Notification