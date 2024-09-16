import React from 'react'
import perfil from '../imagenes/ava1.png';
import racha from '../imagenes/racha.png';
import '../estilos/perfil.scss';
import { useState } from 'react';
import { MdLocationOn } from "react-icons/md";
import BarChartComponent from '../componentes/BarChart';
const perfilPersonal = () => {
    const [selectedEmotion, setSelectedEmotion] = useState('Feliz');
    const [selectedEmotionAge, setSelectedEmotionAge] = useState('Todas');
    const emotionsText = ['Todas', 'Feliz', 'Triste', 'Enojado', 'Ansioso', 'Motivado', 'Aburrido'];
    const handleEmotionClickAge = (emotion) => {
        setSelectedEmotionAge(emotion);
    };
    const emotions = [
        { emoji: '😊', label: 'Feliz' },
        { emoji: '😢', label: 'Triste' },
        { emoji: '😠', label: 'Enojado' },
        { emoji: '😨', label: 'Ansioso' },
        { emoji: '💪', label: 'Motivado' },
    ];
    return (
        <div className='gridPersonal'>

            <div className="containerPerfil a1">
                <div>
                    <img src={perfil} alt="perfil" className='img'/>
                </div>

                <div className="rachaContainer">
                    <img src={racha} alt="Racha"></img>
                    <div className="profileContents">
                        <div className="dias">
                            <p className='texto1'>7</p>
                            <p className='texto2'>días</p>
                        </div>
                        <h3 className='texto3'>FELICES</h3>
                    </div>
                </div>

                
            </div>

            <div className="infoPer a3">
                <div className="parte1">
                    <h2>Juan Camilo Henao</h2>
                    <div className="general">
                    <div className="emotions-container">
                        {emotions.map((emotion, index) => (
                            <div
                                key={index}
                                className={`emotion ${selectedEmotion === emotion.label ? 'active' : ''}`}
                                onClick={() => setSelectedEmotion(emotion.label)}
                            >
                                {emotion.emoji}
                            </div>
                        ))}
                    </div>
                    {selectedEmotion && (
                        <div id="emotion-text">5 publicaciones de tipo {selectedEmotion}</div>
                    )}</div>
                </div>
                <div className="ubicacion">
                    <MdLocationOn  className='icono'/>
                    <span>Te encuentras en:  </span>
                    <span>Tulua, Colombia</span>
                </div>
            </div>

            <div className="estadisticas a4">
                <h2>Análisis por Edades</h2>
                <div className="filter-container">
                    {emotionsText.map((emotion) => (
                        <button
                            key={emotion}
                            className={`filter ${selectedEmotionAge === emotion ? 'selected' : ''}`}
                            onClick={() => handleEmotionClickAge(emotion)}
                        >
                            {emotion}
                        </button>
                    ))}
                </div>
                <BarChartComponent selectedEmotion={selectedEmotionAge} />
            </div>

            <div className="publicaciones a5"></div>
        </div>
    )
}

export default perfilPersonal
