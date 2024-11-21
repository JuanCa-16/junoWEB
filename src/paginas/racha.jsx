import React from 'react';
import '../estilos/racha.scss'; // Asegúrate de tener el CSS enlazado correctamente
import rachaImg from '../imagenes/racha.png'; // Importa la imagen

function Racha() {
    return (
        <div className="container-rachas">
            {/* Div para los días de racha */}
            <div className="racha">
                <div className="icono-racha">
                    <img src={rachaImg} alt="Fuego" /> 
                </div>
                <div className="texto-racha">
                    <h2>7 Días</h2>
                    <span>FELICES</span>
                </div>
            </div>

            {/* Div para la emoción de hoy y hora de alerta */}
            <div className="emocion-hoy">
                <div className="emocion">
                    <span>EMOCION DE HOY: </span>
                    <div className="etiqueta-feliz">Feliz</div>
                </div>
                <div className="hora-alerta">
                    <span>Hora alerta</span>
                    <div className="hora">7:00 am</div>
                </div>
            </div>

            {/* Div para los avatares a desbloquear */}
            <div className="avatares-desbloquear">
                <span>Avatares a </span>
                <div className="avatar-container">
                    <div className="avatar desbloqueado">7</div>
                    <div className="avatar">14</div>
                    <div className="avatar">21</div>
                    <div className="avatar">28</div>
                </div>
                <div className="avatar-container">
                    <div className="avatar">35</div>
                    <div className="avatar">42</div>
                    <div className="avatar">49</div>
                    <div className="avatar">56</div>
                </div>
            </div>
        </div>
    );
}

export default Racha;