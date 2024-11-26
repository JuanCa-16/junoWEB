import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import perfil from '../imagenes/ava1.png';
import racha from '../imagenes/racha.png';
import { MdLocationOn } from "react-icons/md";
import BarChartPerfil from '../componentes/BarChartPerfil';// Importa el nuevo componente
import { Row, Col } from "react-bootstrap";
import avatar1 from '../imagenes/ava1.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/respaldoPrincipal.css";
import '../estilos/perfil.scss';
import '../estilos/analisis.css';
import felizM from '../imagenes/felizMujer.png';

const PerfilPersonal = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [posts, setPosts] = useState([]);
    const [selectedEmotion, setSelectedEmotion] = useState('Feliz');
    const [selectedEmotionAge, setSelectedEmotionAge] = useState('Todas');
    const [emotionStats, setEmotionStats] = useState([]); // Nuevo estado para las estadísticas

    const emotionsText = ['Todas', 'Feliz', 'Triste', 'Enojado', 'Ansioso', 'Motivado', 'Aburrido'];
    const emotions = [
        { emoji: <img src={felizM} alt="Feliz" className="emoji-img" />, label: 'Feliz' },
        { emoji: <img src={felizM} alt="Triste" className="emoji-img" />, label: 'Triste' },
        { emoji: <img src={felizM} alt="Enojado" className="emoji-img" />, label: 'Enojado' },
        { emoji: <img src={felizM} alt="Ansioso" className="emoji-img" />, label: 'Ansioso' },
        { emoji: <img src={felizM} alt="Motivado" className="emoji-img" />, label: 'Motivado' },
        { emoji: <img src={felizM} alt="Aburrido" className="emoji-img" />, label: 'Aburrido' }
        // Agrega más emociones aquí si es necesario
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/usuarios/estalogin', {
                    method: 'GET',
                    headers: { token: localStorage.getItem('token') }
                });
                const data = await response.json();
                if (response.status === 200) {
                    setUsername(data.nombre);
                    setUserEmail(data.correo);
                } else {
                    console.error('No se pudo obtener los datos del usuario');
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/publicaciones/usuario/${userEmail}`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                    // Actualizar estadísticas de emociones
                    const stats = data.reduce((acc, post) => {
                        acc[post.emocion_asociada] = (acc[post.emocion_asociada] || 0) + 1;
                        return acc;
                    }, {});
                    const statsArray = Object.keys(stats).map(emotion => ({
                        emocion: emotion,
                        cantidad: stats[emotion],
                    }));
                    setEmotionStats(statsArray);
                } else {
                    console.error('No se encontraron publicaciones para este usuario');
                }
            } catch (error) {
                console.error('Error al obtener publicaciones del usuario:', error);
            }
        };

        if (userEmail) {
            fetchUserPosts();
        }
    }, [userEmail]);

    const handleEmotionClickAge = (emotion) => {
        setSelectedEmotionAge(emotion);
    };

    return (
        <div className='gridPersonal'>
            <div className="containerPerfil a1">
                <div className='imgDiv'>
                    <img src={perfil} alt="perfil" className='img' />
                </div>
                <div className="rachaContainer">
                    <img src={racha} alt="Racha" />
                    <div className="profileContents">
                        <div className="dias">
                            <p className='texto1'>7</p>
                            <p className='texto2'>días</p>
                        </div>
                        <h1 className='texto3'>FELICES</h1>
                    </div>
                </div>
                <div className="editar">
                    <button onClick={() => navigate('/editar-perfil')}>Editar Perfil</button>
                </div>
            </div>

            <div className="infoPer a3">
                <div className="parte1">
                    <h2>{username}</h2>
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
                        )}
                    </div>
                </div>
                <div className="ubicacion">
                    <MdLocationOn className='icono' />
                    <span>Te encuentras en: Tulua, Colombia</span>
                </div>
            </div>

            <div className="estadisticas a4">
                <h2>Análisis Personal</h2>
                <div className="filter-container">
                    {emotionsText.map((emotion) => (
                        <button
                            key={emotion}
                            className={`filter ${emotion} ${selectedEmotionAge === emotion ? 'selected' : ''}`}
                            onClick={() => handleEmotionClickAge(emotion)}
                        >
                            {emotion}
                        </button>
                    ))}
                </div>
                <BarChartPerfil selectedEmotion={selectedEmotionAge} emotionStats={emotionStats} />
            </div>

            <div className="publicaciones a5">
                <Row className="ms-1">
                    {posts.length === 0 ? (
                        <Col xs={12} className="bg-posts">
                            <span className="no-posts-text">
                                Aún no hay publicaciones disponibles
                            </span>
                            <img src="/logos.png" alt="logo" className="logo-transparent" />
                            <span className="mt-3">
                                Crea tu primera historia en el diario!
                            </span>
                        </Col>
                    ) : (
                        posts.map((post, index) => (
                            <Col xs={12} key={index} className="post-display-col mb-3 p-3">
                                <div className="d-flex">
                                    <div className="user-info d-flex flex-column align-items-start">
                                        <img src={avatar1} alt="Avatar" className="img-fluid rounded-circle" />
                                    </div>
                                    <div className="custom-div-post d-flex flex-column align-items-start m-2">
                                        <div className="d-flex align-items-center">
                                            <span className="user-name-post ms-2 mb-2">{post.username}</span>
                                            <span className={`emotion-badge ms-2 mb-2 ${post.emocion_asociada.toLowerCase()}`}>
                                                {post.emocion_asociada}
                                            </span>
                                        </div>
                                        <p className="post-text mt-3">{post.contenido}</p>
                                    </div>
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </div>
        </div>
    );
};

export default PerfilPersonal;
