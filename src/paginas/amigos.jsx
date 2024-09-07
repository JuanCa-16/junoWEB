import React, { useState } from 'react';
import '../estilos/Amigos.css';

function Friend({ name }) {
  return (
    <div className="friend-item">
      <span className="friend-name">{name}</span>
      <button className="eliminar-button">Eliminar</button>
    </div>
  );
}

function FriendRequest({ name }) {
  return (
    <div className="request-item">
      <span className="request-name">{name}</span>
      <div className="buttons">
        <button className="yes-button">Sí</button>
        <button className="no-button">No</button>
      </div>
    </div>
  );
}

function amigos() {

  const [friends, setFriends] = useState(["Isabella", "Nicolas", "Sebastian", "Luisa"]);
  const [requests, setRequests] = useState(["Luis", "Jose", "Camila", "Esteban"]);

  return (
    <div className="app">
      <div className="friends-section">
        <h2>Amigos</h2>
        {friends.length > 0 ? (
          friends.map((friend, index) => <Friend key={index} name={friend} />)
        ) : (
          <p className="empty-message">No tienes amigos</p>
        )}
      </div>

      <div className="requests-section">
        <h2>Solicitudes</h2>
        {requests.length > 0 ? (
          requests.map((request, index) => <FriendRequest key={index} name={request} />)
        ) : (
          <p className="empty-message">No tienes solicitudes de amistad</p>
        )}
      </div>
    </div>
  );
}

export default amigos;
