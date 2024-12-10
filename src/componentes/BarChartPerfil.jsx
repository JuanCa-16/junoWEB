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

// Registrar los componentes y escalas
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
    const filteredData =
        selectedEmotion === 'Todas'
            ? emotionStats
            : emotionStats.filter((item) => item.emocion === selectedEmotion);

    const emotionsLabels = filteredData.map((item) => item.emocion);
    const emotionsData = filteredData.map((item) => item.cantidad);

    const chartData = {
        labels: emotionsLabels,
        datasets: [
            {
                data: emotionsData,
                backgroundColor: emotionsLabels.map(
                    (emotion) => emotionColors[emotion] || 'rgba(75, 192, 192, 0.6)'
                ),
            },
        ],
    };

    const options = {
        responsive: true,
        animation: {
            duration: 20, // Animación rápida
            easing: 'easeInOutQuad', // Efecto suave
        },
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

    const handleDownloadPDF = () => {
        const chartCanvas = document.querySelector('canvas');
        const pdf = new jsPDF();

        // Título centrado
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text(
            'Estadísticas de Emociones - Perfil Personal',
            pdf.internal.pageSize.width / 2,
            15,
            { align: 'center' }
        );

        // Subtítulo
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text(
            selectedEmotion === 'Todas'
                ? 'Distribución de todas las emociones registradas.'
                : `Distribución de la emoción seleccionada: ${selectedEmotion}.`,
            pdf.internal.pageSize.width / 2,
            25,
            { align: 'center' }
        );

        // Añadir la imagen del gráfico
        pdf.addImage(chartCanvas.toDataURL('image/png'), 'PNG', 15, 35, 180, 100);

        // Resumen
        pdf.setFontSize(11);
        pdf.text(
            'Este análisis proporciona información sobre cómo se distribuyen las emociones seleccionadas.',
            15,
            145
        );

        // Pie de página
        pdf.setFontSize(10);
        pdf.text(
            'Generado automáticamente el ' + new Date().toLocaleDateString(),
            pdf.internal.pageSize.width / 2,
            pdf.internal.pageSize.height - 10,
            { align: 'center' }
        );

        // Guardar el PDF
        pdf.save('perfil_emociones.pdf');
    };

    return (
        <div className="chart-container">
            <div className="chart-wrapper" style={{ position: 'relative', height: '400px' }}>
                <Bar data={chartData} options={options} />
            </div>
            <button className="download-button" onClick={handleDownloadPDF}>
                Descargar Estadísticas en PDF
            </button>
        </div>
    );
};

export default BarChartPerfil;
