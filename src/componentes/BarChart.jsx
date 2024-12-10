import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { jsPDF } from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChartComponent({ data }) {
    if (!data || data.length === 0) {
        return <p>No hay datos disponibles para mostrar.</p>;
    }

    // Extraer rangos de edad únicos y emociones únicas
    const ageRanges = [...new Set(data.map(item => item.rango_edad))];

    // Ordenar los rangos de edad
    const sortedAgeRanges = ageRanges.sort((a, b) => {
        const getFirstNumber = range => parseInt(range.split('-')[0], 10);
        return getFirstNumber(a) - getFirstNumber(b);
    });

    const emotions = [...new Set(data.map(item => item.emocion))];

    // Crear datasets para el gráfico
    const datasets = emotions.map(emotion => {
        const emotionData = sortedAgeRanges.map(range => {
            const matchingEntry = data.find(
                item => item.rango_edad === range && item.emocion === emotion
            );
            return matchingEntry ? matchingEntry.cantidad : 0;
        });

        const getEmotionColor = (emotionName) => {
            const rootStyle = getComputedStyle(document.documentElement);
            const cssVariable = rootStyle.getPropertyValue(`--${emotionName.toLowerCase()}`).trim();
            return cssVariable || 'rgba(75, 192, 192, 0.6)';
        };

        return {
            label: emotion,
            data: emotionData,
            backgroundColor: getEmotionColor(emotion),
        };
    });

    const chartData = {
        labels: sortedAgeRanges,
        datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 28, // Aumentar la velocidad (300ms)
            easing: 'easeInOutQuad', // Estilo de animación
        },
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
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const handleDownloadPDF = () => {
        const chartCanvas = document.querySelector('canvas');
        const pdf = new jsPDF();

        // Título centrado
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text(
            'Análisis de Emociones entre Nuestros Usuarios',
            pdf.internal.pageSize.width / 2,
            15,
            { align: 'center' }
        );

        // Subtítulo
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text(
            'Este gráfico representa la distribución de emociones en diferentes rangos de edad.',
            pdf.internal.pageSize.width / 2,
            25,
            { align: 'center' }
        );

        // Añadir la imagen del gráfico
        pdf.addImage(chartCanvas.toDataURL('image/png'), 'PNG', 15, 35, 180, 100);

        // Texto adicional (resumen)
        pdf.setFontSize(11);
        pdf.text(
            'Observamos que las emociones varían significativamente entre diferentes grupos de edades.',
            15,
            145
        );
        pdf.text(
            'Estos datos permiten entender mejor cómo los usuarios interactúan emocionalmente.',
            15,
            155
        );

        // Pie de página
        pdf.setFontSize(10);
        pdf.text(
            'Generado automáticamente por Juno el: ' + new Date().toLocaleDateString(),
            pdf.internal.pageSize.width / 2,
            pdf.internal.pageSize.height - 10,
            { align: 'center' }
        );

        // Guardar el PDF
        pdf.save('grafico_analisis.pdf');
    };

    return (
        <div className="chart-container">
            <div className="chart-wrapper" style={{ position: 'relative', height: '400px' }}>
                <Bar data={chartData} options={options} id="chart" />
            </div>
            <button className="download-button" onClick={handleDownloadPDF}>
                Descargar Gráfico de Análisis
            </button>
        </div>
    );
}

export default BarChartComponent;
