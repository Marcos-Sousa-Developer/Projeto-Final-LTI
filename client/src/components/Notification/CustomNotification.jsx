import React, { useState, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';
import Modal from '../Modal/Modal';
import './Notification.css';
import axios from 'axios';

const CustomNotification = () => {

    const [isOpen, setIsOpen] = useState(false); //modal
    const [timer, setTimer] = useState(0) 
    const [myNotifications, setNotifications] = useState([]) 

    const updateMe = async () => {
        try {
          const response = await axios.get('/getNotifications');
          setNotifications(response.data);
        } catch (error) {
        }
      };
    
      const deleteNotifications = async () => {
        try {
            await axios.delete('/deleteNotifications', null, {withCredentials:true});
            setNotifications([]);
          } catch (error) {
          }
      }
      
      useEffect(() => {
        const timerId = setTimeout(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 15000);
      
        return () => {
          clearTimeout(timerId);
        };
      }, [timer]);
      
      useEffect(() => {
        async function run() {
          await updateMe();
        }
        run();
      }, [timer]);
      

    return (
        <>
            <button className='flex app__pointer app__notification' onClick={() => setIsOpen(true)}>
                <FiBell fontSize={24} color="black" className='app__notification_bell'></FiBell>
            </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            
            {
                myNotifications.length == 0 ?
                (
                    <p>Sem notificações</p>
                )
                :
                (
                    <>
                    {
                        myNotifications.map(  (notification) => (

                            <>

                                {
                                    notification.order_status === "Para preparar" ? (
                                    <p>A encomenda {notification.order_id} está disponível para preparação!</p>

                                    ) :
                                    notification.order_status === "Cancelado" ? (
                                        <p>A encomenda {notification.order_id} foi cancelada!</p>
                                    ) :
                                    notification.order_status === "Enviado" ? (
                                        <p>A encomenda {notification.order_id} foi enviada!</p>
                                    ):
                                    notification.order_status === "Entregue" ? (
                                        <p>A encomenda {notification.order_id} foi entregue!</p>
                                    )
                                    :
                                    ("")    
                          
                                }

                            </>
                        ))
                
                    }
                    <button type='button' className='main__action_btn' onClick={() => deleteNotifications()}>Marcar todas como lidas</button>
                    
                    </>
                    
                )
            }

            </Modal>
        </>
    )
}

export default CustomNotification