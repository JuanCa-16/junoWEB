import React, { useState } from 'react';
import BarChartComponent from '../componentes/BarChart';
import '../estilos/analisis.css';

function Analisis() {
    const [selectedEmotionAge, setSelectedEmotionAge] = useState('Todas');
    const [selectedEmotionCity, setSelectedEmotionCity] = useState('Feliz');
    const [selectedCity, setSelectedCity] = useState(null);

    const emotions = ['Todas', 'Feliz', 'Triste', 'Enojado', 'Ansioso', 'Motivado', 'Aburrido'];

    // Simulated data for city rankings based on emotions
    const cityData = {
        Feliz: [
            { city: 'Buga', score: 95 },
            { city: 'Cali', score: 90 },
            { city: 'Tuluá', score: 85 },
            { city: 'Sevilla', score: 80 },
        ],
        Triste: [
            { city: 'Tuluá', score: 70 },
            { city: 'Cali', score: 65 },
            { city: 'Sevilla', score: 60 },
            { city: 'Buga', score: 55 },
        ],
        Enojado: [
            { city: 'Buga', score: 60 },
            { city: 'Cali', score: 58 },
            { city: 'Tuluá', score: 55 },
            { city: 'Sevilla', score: 50 },
        ],
        // Add more emotions and data here if needed
    };

    const handleEmotionClickAge = (emotion) => {
        setSelectedEmotionAge(emotion);
    };

    const handleEmotionClickCity = (emotion) => {
        setSelectedEmotionCity(emotion);
    };

    const handleCityClick = (city) => {
        setSelectedCity(city);
    };

    // Get the ranking for the selected emotion, or show an empty array if none is selected
    const rankedCities = [...(cityData[selectedEmotionCity] || [])]
        .sort((a, b) => b.score - a.score); // Ordenar de mayor a menor según el score

    return (
        <div className="container-analisis">
            {/* Análisis por Edades */}
            <div className="section">
                <h2>Análisis por Edades</h2>
                <div className="filter-container">
                    {emotions.map((emotion) => (
                        <button
                            key={emotion}
                            className={`filter ${emotion} ${selectedEmotionAge === emotion ? 'selected' : ''}`}
                            onClick={() => handleEmotionClickAge(emotion)}
                        >
                            {emotion}
                        </button>
                    ))}
                </div>
                <BarChartComponent selectedEmotion={selectedEmotionAge} />
            </div>

            {/* Análisis por Ciudades */}
            <div className="section cities">
                <h2>Análisis por Ciudades</h2>
                <div className="filter-container">
                    {emotions.map((emotion) => (
                        <button
                            key={emotion}
                            className={`filter ${emotion} ${selectedEmotionCity === emotion ? 'selected' : ''}`}
                            onClick={() => handleEmotionClickCity(emotion)}
                        >
                            {emotion}
                        </button>
                    ))}
                </div>
                <div className="city-container">
                    {rankedCities.map((cityData, index) => (
                        <div
                            key={index}
                            className={`city ${selectedEmotionCity} ${selectedCity === cityData.city ? 'selected' : ''}`}
                            onClick={() => handleCityClick(cityData.city)}
                        >
                            #{index + 1} {cityData.city} - {cityData.score} personas
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Analisis;
