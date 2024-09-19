import React from 'react'
import perfil from '../imagenes/ava1.png';
import racha from '../imagenes/racha.png';
import { useState } from 'react';
import { MdLocationOn } from "react-icons/md";
import BarChartComponent from '../componentes/BarChart';
import { Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
import avatar1 from '../imagenes/ava1.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/respaldoPrincipal.css";
import '../estilos/perfil.scss';
import '../estilos/analisis.css';
import felizM from '../imagenes/felizMujer.png';
const perfilPersonal = () => {
    const [selectedEmotion, setSelectedEmotion] = useState('Feliz');
    const [selectedEmotionAge, setSelectedEmotionAge] = useState('Todas');
    const emotionsText = ['Todas', 'Feliz', 'Triste', 'Enojado', 'Ansioso', 'Motivado', 'Aburrido'];
    const handleEmotionClickAge = (emotion) => {
        setSelectedEmotionAge(emotion);
    };
    const emotions = [
        { emoji: <img src={felizM} alt="Feliz" className="emoji-img" />, label: 'Feliz' },
        { emoji:<img src={felizM} alt="Feliz" className="emoji-img" />, label: 'Triste' },
        { emoji:<img src={felizM} alt="Feliz" className="emoji-img" />, label: 'Enojado' },
        { emoji:<img src={felizM} alt="Feliz" className="emoji-img" />, label: 'Ansioso' },
        { emoji:<img src={felizM} alt="Feliz" className="emoji-img" />, label: 'Motivado' },
    ];
    

    const [posts, setPosts] = useState([
        {
            username: "Juan",
            emotion: "Feliz",
            text: "Hoy me siento muy contento porque el sol está brillando y todo parece ir bien.",
        },
        {
            username: "Ana",
            emotion: "Triste",
            text: "No estoy pasando por un buen momento. Siento que todo está en mi contra.",
        },
        {
            username: "Luis",
            emotion: "Motivado",
            text: "Estoy emocionado por el nuevo proyecto en el que estoy trabajando. ¡Siento que puedo lograr grandes cosas!",
        },
        {
            username: "Sofia",
            emotion: "Ansioso",
            text: "Tengo un poco de nervios por la presentación que tengo mañana. Espero que todo salga bien.",
        },
    ]);
    return (
        <div className='gridPersonal'>

            <div className="containerPerfil a1">
                <div className='imgDiv'>
                    <img src={perfil} alt="perfil" className='img' />
                </div>

                <div className="rachaContainer">
                    <img src={racha} alt="Racha"></img>
                    <div className="profileContents">
                        <div className="dias">
                            <p className='texto1'>7</p>
                            <p className='texto2'>días</p>
                        </div>
                        <h1 className='texto3'>FELICES</h1>
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
                    <MdLocationOn className='icono' />
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

            <div className="publicaciones a5">
                <Row className=" ms-1">
                    {posts.length === 0 ? (
                        <Col xs={12} className="bg-posts">
                            <span className="no-posts-text">
                                Aún no hay publicaciones disponibles
                            </span>
                            <img
                                src="/logos.png"
                                alt="logo"
                                className="logo-transparent"
                            />
                            <span className="mt-3">
                                Crea tu primera historia en el diario!
                            </span>
                        </Col>
                    ) : (
                        posts.map((post, index) => (
                            <Col xs={12} key={index} className="post-display-col mb-3 p-3">
                                <div className="d-flex">
                                    <div className="user-info d-flex flex-column align-items-start">
                                        <img
                                            src={avatar1}
                                            alt="Avatar"
                                            className="img-fluid rounded-circle"
                                        />
                                    </div>

                                    <div className="custom-div-post d-flex flex-column align-items-start m-2">
                                        <div className="d-flex align-items-center">
                                            <span className="user-name-post ms-2 mb-2">{post.username}</span>
                                            <span className={`emotion-badge ms-2 mb-2 ${post.emotion.toLowerCase()}`}>
                                                {post.emotion}
                                            </span>
                                        </div>
                                        <p className="post-text mt-3">{post.text}</p>
                                    </div>
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </div>
        </div>
    )
}

export default perfilPersonal
