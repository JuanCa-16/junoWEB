import React from 'react';
import rachaImg from '../imagenes/racha.png';
import '../estilos/rachas.scss';

function Rachas() {
    return (
        <div className="container-rachas-pag">
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
                    <div className="txt-emocion">Hoy me siento</div>
                    <div className="etiqueta-feliz">Feliz</div>
                </div>
                <div className="hora-alerta">
                    <div className="alerta">Hora de tu recordatorio</div>
                    <div className="hora">7:00 am</div>
                </div>
            </div>

            {/* Div para los avatares a desbloquear */}
            <div className="txt-av-desbloquear">Avatares a desbloquear</div>
            <div className="avatares-desbloquear">
                <div className="avatar-container">
                    <div className="avatar-content">
                        <div className="avatar desbloqueado">
                        <div className="icono-racha">
                        <img src="/avatar7.png" className="image" alt="" />
                        </div>
                        </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 7 días</h3>
                            <p>¡Una semana de sonrisas! Cada pequeño paso cuenta. ¡Sigue brillando! 🌟</p>
                        </div>
                    </div>
                    <div className="avatar-content">
                    <div className="avatar desbloqueado">
                        <div className="icono-racha">
                        <img src="/avatar14.png" className="image" alt="" />
                        </div>
                        </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 14 días</h3>
                            <p>Dos semanas de alegría acumulada. ¡Estás creando un hábito positivo y poderoso! 😊</p>
                        </div>
                    </div>
                </div>
                <div className="avatar-container">
                    <div className="avatar-content">
                    <div className="avatar desbloqueado">
                        <div className="icono-racha">
                        <img src="/avatar21.png" className="image" alt="" />
                        </div>
                        </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 21 días</h3>
                            <p>¡21 días de felicidad! Estás en el camino correcto para transformar tus días. 🌈</p>
                        </div>
                    </div>
                    <div className="avatar-content">
                    <div className="avatar desbloqueado">
                        <div className="icono-racha">
                        <img src="/avatar28.png" className="image" alt="" />
                        </div>
                        </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 28 días</h3>
                            <p>¡Un mes de momentos felices! La constancia te lleva más lejos de lo que imaginas. 💪✨</p>
                        </div>
                    </div>
                    <div className="avatar-content">
                        <div className="avatar">35</div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 35 días</h3>
                            <p>Más de un mes de felicidad. ¡Sigue alimentando tu alma con buenas vibras! 🌻</p>
                        </div>
                    </div>
                    <div className="avatar-content">
                        <div className="avatar">42</div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 42 días</h3>
                            <p>¡42 días de alegría ininterrumpida! Cada día cuenta y tu energía positiva crece. 🌟</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rachas;
