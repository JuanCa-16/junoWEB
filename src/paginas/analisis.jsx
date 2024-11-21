import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChartComponent from '../componentes/BarChart';
import '../estilos/analisis.css';

function Analisis() {
    const [emotionsData, setEmotionsData] = useState([]);
    const [topCities, setTopCities] = useState([]);
    const [selectedEmotion, setSelectedEmotion] = useState('Todas');
    const [selectedGender, setSelectedGender] = useState('Todos');
    const [topCityEmotion, setTopCityEmotion] = useState('Feliz'); // Default to "Feliz"

    useEffect(() => {
        const url = selectedGender === 'Todos'
            ? 'http://localhost:5000/analisis/emociones'
            : `http://localhost:5000/analisis/emociones?genero=${selectedGender}`;

        axios.get(url)
            .then(response => {
                setEmotionsData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos de emociones:', error);
            });
    }, [selectedGender]);

    useEffect(() => {
        const url = `http://localhost:5000/analisis/top-ciudades?emocion=${topCityEmotion}`;

        axios.get(url)
            .then(response => {
                setTopCities(response.data);
            })
            .catch(error => {
                console.error('Error al obtener el top de ciudades:', error);
            });
    }, [topCityEmotion]);

    const handleEmotionClick = (emotion) => {
        setSelectedEmotion(emotion);
    };

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const handleTopCityEmotionChange = (emotion) => {
        setTopCityEmotion(emotion);
    };

    const filteredData = selectedEmotion === 'Todas'
        ? emotionsData
        : emotionsData.filter(item => item.emocion === selectedEmotion);

    return (
        <div className="container-analisis">
            <div className="section">
                <h2>Análisis de Emociones</h2>

                <div className="filter-container">
                    {['Todas', 'Feliz', 'Triste', 'Enojado', 'Ansioso', 'Motivado', 'Aburrido'].map(emotion => (
                        <button
                            key={emotion}
                            className={`filter ${emotion} ${selectedEmotion === emotion ? 'selected' : ''}`}
                            onClick={() => handleEmotionClick(emotion)}
                        >
                            {emotion}
                        </button>
                    ))}
                </div>

                <div className="gender-filter">
                    <label htmlFor="gender-select">Filtrar por género:</label>
                    <select id="gender-select" value={selectedGender} onChange={handleGenderChange}>
                        <option value="Todos">Todos</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>

                <BarChartComponent data={filteredData} />

                <div className="top-cities-section">
                    <h3>Top 5 Ciudades con Más Publicaciones</h3>

                    <div className="top-cities-filter">
                        {['Feliz', 'Triste', 'Enojado', 'Ansioso', 'Motivado', 'Aburrido'].map(emotion => (
                            <button
                                key={emotion}
                                className={`filter ${emotion} ${topCityEmotion === emotion ? 'selected' : ''}`}
                                onClick={() => handleTopCityEmotionChange(emotion)}
                            >
                                {emotion}
                            </button>
                        ))}
                    </div>

                    <ul>
                        {topCities.map((city, index) => (
                            <li
                                key={index}
                                className={`city ${index === 0 ? topCityEmotion : ''}`}
                            >
                                <strong style={{ color: 'black' }}>{city.ciudad}:</strong> {city.total_publicaciones} publicaciones
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Analisis;
