import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Registrar los componentes y escalas
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChartPerfil = ({ selectedEmotion, emotionStats }) => {
    if (!emotionStats || emotionStats.length === 0) {
        return <p>No hay datos de emociones disponibles para mostrar.</p>;
    }

    // Colores de las emociones
    const emotionColors = {
        Feliz: getComputedStyle(document.documentElement).getPropertyValue('--feliz').trim(),
        Triste: getComputedStyle(document.documentElement).getPropertyValue('--triste').trim(),
        Enojado: getComputedStyle(document.documentElement).getPropertyValue('--enojado').trim(),
        Ansioso: getComputedStyle(document.documentElement).getPropertyValue('--ansioso').trim(),
        Motivado: getComputedStyle(document.documentElement).getPropertyValue('--motivado').trim(),
        Aburrido: getComputedStyle(document.documentElement).getPropertyValue('--aburrido').trim(),
    };

    // Filtrar y mapear datos según la emoción seleccionada
    const filteredData = selectedEmotion === 'Todas'
        ? emotionStats
        : emotionStats.filter(item => item.emocion === selectedEmotion);

    const emotionsLabels = filteredData.map(item => item.emocion);
    const emotionsData = filteredData.map(item => item.cantidad);

    const chartData = {
        labels: emotionsLabels,
        datasets: [
            {
                data: emotionsData,
                backgroundColor: emotionsLabels.map(emotion => emotionColors[emotion] || 'rgba(75, 192, 192, 0.6)'),
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false, // Oculta la leyenda
            },
            title: {
                display: true,
                text: 'Estadísticas de Emociones',
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default BarChartPerfil;
