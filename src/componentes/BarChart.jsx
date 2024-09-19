import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { ageRange: '1-5', Feliz: 12, Triste: 8, Enojado: 5, Ansioso: 3, Motivado: 6, Aburrido: 2 },
    { ageRange: '6-10', Feliz: 15, Triste: 10, Enojado: 7, Ansioso: 4, Motivado: 10, Aburrido: 5 },
    { ageRange: '10-15', Feliz: 14, Triste: 9, Enojado: 6, Ansioso: 8, Motivado: 12, Aburrido: 3 },
    { ageRange: '15-20', Feliz: 18, Triste: 12, Enojado: 9, Ansioso: 10, Motivado: 15, Aburrido: 4 },
    { ageRange: '20-25', Feliz: 16, Triste: 11, Enojado: 8, Ansioso: 9, Motivado: 14, Aburrido: 7 },
    { ageRange: '26+', Feliz: 14, Triste: 10, Enojado: 7, Ansioso: 8, Motivado: 13, Aburrido: 6 },
];

function BarChartComponent({ selectedEmotion }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageRange" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* Muestra solo la barra de la emoción seleccionada */}
                {(selectedEmotion === 'Todas' || selectedEmotion === 'Feliz') && (
                    <Bar dataKey="Feliz" fill="#f4d35e" />
                )}
                {(selectedEmotion === 'Todas' || selectedEmotion === 'Triste') && (
                    <Bar dataKey="Triste" fill="#7289da" />
                )}
                {(selectedEmotion === 'Todas' || selectedEmotion === 'Enojado') && (
                    <Bar dataKey="Enojado" fill="#d9534f" />
                )}
                {(selectedEmotion === 'Todas' || selectedEmotion === 'Ansioso') && (
                    <Bar dataKey="Ansioso" fill="#e9967a" />
                )}
                {(selectedEmotion === 'Todas' || selectedEmotion === 'Motivado') && (
                    <Bar dataKey="Motivado" fill="#88c399" />
                )}
                {(selectedEmotion === 'Todas' || selectedEmotion === 'Aburrido') && (
                    <Bar dataKey="Aburrido" fill="#495057" />
                )}
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartComponent;