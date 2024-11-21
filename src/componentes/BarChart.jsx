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

function BarChartComponent({ data }) {
    if (!data || data.length === 0) {
        return <p>No hay datos disponibles para mostrar.</p>;
    }

    // Extraer rangos de edad únicos y emociones únicas
    const ageRanges = [...new Set(data.map(item => item.rango_edad))];

    // Ordenar los rangos de edad de menor a mayor basándose en el primer número del rango
    const sortedAgeRanges = ageRanges.sort((a, b) => {
        const getFirstNumber = range => parseInt(range.split('-')[0]);
        return getFirstNumber(a) - getFirstNumber(b);
    });

    const emotions = [...new Set(data.map(item => item.emocion))];

    // Crear un dataset para cada emoción
    const datasets = emotions.map(emotion => {
        const emotionData = sortedAgeRanges.map(range => {
            const matchingEntry = data.find(
                item => item.rango_edad === range && item.emocion === emotion
            );
            return matchingEntry ? matchingEntry.cantidad : 0;
        });

        return {
            label: emotion,
            data: emotionData,
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(`--${emotion.toLowerCase()}`).trim() || 'rgba(75, 192, 192, 0.6)',
        };
    });

    const chartData = {
        labels: sortedAgeRanges, // Los rangos de edad como etiquetas en el eje X, ahora ordenados
        datasets,
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Cantidad',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Rango de edad',
                },
            },
        },
        animation: {
            duration: 500, // Animación más rápida (500 ms)
            easing: 'easeOutQuad', // Efecto de animación suave
        },
    };

    return <Bar data={chartData} options={options} />;
}

export default BarChartComponent;
