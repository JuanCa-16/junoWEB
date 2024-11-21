import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHome, IoCloseCircle } from "react-icons/io5"; 
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { HiMiniDocumentChartBar } from "react-icons/hi2";
import { AiFillSetting } from "react-icons/ai";
import { useLocation, Link } from 'react-router-dom';
import racha from '../imagenes/racha.png';
import avatar1 from '../imagenes/ava1.png';
import { FaMoon } from "react-icons/fa6";
import { IoMdSunny } from "react-icons/io";
import { IoExit } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast'; // Importamos toast y Toaster
const Sidebar = React.memo(({ closeMenu, setCloseMenu, infoU }) => {

    const location = useLocation();
    const navigate = useNavigate();
    
    
    const handleCloseMenu = () => {
        const newState = !closeMenu;
        setCloseMenu(newState);
        localStorage.setItem('sidebarClosed', newState);
    };

    const salir = (e) => {
        // Prevenir que se actulize la pag al enviar el formulario
        e.preventDefault()

        // Eliminamos el token y el rol del localStorage
        localStorage.removeItem("token")
        toast.success("Cierre de Sesion Exitoso")
        
        navigate('/usuario/login');
        

        
    }

    useEffect(() => {
        // Realiza alguna acción cuando cambie la ruta
    }, [location]);

    return (
        <div className={closeMenu ? "sidebar active" : "sidebar"}>
            <div className="profileContainer a1">
                <img src={avatar1} alt="Avatar"></img>
                <div className="profileContents">
                    <h3 className='name'>{infoU.nombre}</h3>
                </div>
            </div>

            <div className="rachaContainer a2" onClick={() => navigate('/rachas')}>
                <img src={racha} alt="Racha"></img>
                <div className="profileContents">
                    <div className="dias">
                        <p className='texto1'>7</p> 
                        <p className='texto2'>días</p> 
                    </div>
                    <h3 className='texto3'>FELICES</h3> 
                </div>
            </div>

            <div className={closeMenu ? "burgerContainer active a3" : "burgerContainer a3"}>
                <div className="burgerTrigger">
                    <FaMoon  className='img moon'  onClick={handleCloseMenu}/>
                    <IoMdSunny className='img sun'  onClick={handleCloseMenu}/>
                    <IoExit  className='img exit' onClick={(e) => salir(e)} />
                </div>
            </div>

            <div className="contentsContainer a4">
                <ul>
                    <li className={location.pathname === '/principal' ? 'active' : ''}>
                        <Link to='/principal'>
                            <IoHome className='icono'/>
                            <span>Principal</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/amigos' ? 'active' : ''}>
                        <Link to='/amigos'>
                            <BsFillPeopleFill className='icono'/>
                            <span>Amigos</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/calendario' ? 'active' : ''}>
                        <Link to='/calendario'>
                            <FaCalendar className='icono'/>
                            <span>Calendario</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/analisis' ? 'active' : ''}>
                        <Link to='/analisis'>
                            <HiMiniDocumentChartBar className='icono'/>
                            <span>Análisis</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/perfil' ? 'active' : ''}>
                        <Link to='/perfil'>
                            <AiFillSetting className='icono'/>
                            <span>Perfil</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='logoContainer a5'>
                <img src={avatar1} alt="Logo"></img>
                <h2 className='title'>Juno</h2>
            </div>
        </div>
    );
});

export default Sidebar;
