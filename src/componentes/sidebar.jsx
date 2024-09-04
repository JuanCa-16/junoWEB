import React, { useState } from 'react'
import { IoHome } from "react-icons/io5"; 
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { HiMiniDocumentChartBar } from "react-icons/hi2";
import { AiFillSetting } from "react-icons/ai";
import { IoCloseCircle } from "react-icons/io5";
import racha from '../imagenes/racha.png';
import avatar1 from '../imagenes/ava1.png';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const sidebar = ({ closeMenu, setCloseMenu }) => {

    const location = useLocation();
    const handleCloseMenu = () => {
        const newState = !closeMenu;
        setCloseMenu(newState);
        localStorage.setItem('sidebarClosed', newState);
    };

    useEffect(() => {
        // Puede que quieras hacer algo aquí cuando cambie la ruta
    }, [location]);
    return (
        <div className={closeMenu == false? "sidebar" : "sidebar active"}>
            
            <div className="profileContainer a1">
                <img src={avatar1}></img>
                <div className="profileContents">
                    <h3 className='name'>Juan Camilo</h3>
                </div>
            </div>

            <div className="rachaContainer a2">
                <img src={racha}></img>
                <div className="profileContents">
                    <div className="dias">
                    <p className='texto1'>7</p> 
                    <p className='texto2'>dias</p> 
                    </div>
                    <h3 className='texto3'>FELICES</h3> 
                </div>
            </div>

            <div className={closeMenu == false? "burgerContainer a3" : "burgerContainer active a3"}>
                <div className="burgerTrigger" onClick={()=>{handleCloseMenu()}}><IoCloseCircle className='img'/></div>
                <div className="burgerMenu"></div>
            </div>

            <div className="contentsContainer a4">
                <ul>  
                    <li className={location.pathname ==='/'? 'active':''}>
                        
                        <a href='/'>
                        <IoHome className='icono'/>
                        <span>Principal</span></a>
                    </li>
                    <li className={location.pathname ==='/amigos'? 'active':''}>
                        <a href='/amigos'>
                        <BsFillPeopleFill className='icono'/><span>Amigos</span></a>
                    </li>
                    <li className={location.pathname ==='/calendario'? 'active':''}>
                        
                        <a href='/calendario'>
                        <FaCalendar className='icono'/><span>Calendario</span></a>
                    </li>
                    <li className={location.pathname ==='/analisis'? 'active':''}>
                        
                        <a href='/analisis'>
                        <HiMiniDocumentChartBar className='icono'/><span>Analisis</span></a>
                    </li>
                    <li className={location.pathname ==='/perfil'? 'active':''}>
                        
                        <a href='/perfil'>
                        <AiFillSetting className='icono'/><span>Perfil</span></a>
                    </li>
                </ul>
            </div>
            
            <div className='logoContainer a5'>
                <img src={avatar1}></img>
                <h2 className='title'>Juno</h2>
            </div>
        </div>
    )
}

export default sidebar
