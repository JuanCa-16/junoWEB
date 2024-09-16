import React, { useState, useEffect } from 'react';
import '../estilos/Amigos.css';

function User({ name, onAdd }) {
  return (
    <div className="user-item">
      <span className="user-name">{name}</span>
      <button className="add-button" onClick={() => onAdd(name)}>Añadir</button>
    </div>
  );
}

function Friend({ name, onRemove }) {
  return (
    <div className="friend-item">
      <span className="friend-name">{name}</span>
      <button className="eliminar-button" onClick={() => onRemove(name)}>Eliminar</button>
    </div>
  );
}

function FriendRequest({ name, onAccept, onReject }) {
  return (
    <div className="request-item">
      <span className="request-name">{name}</span>
      <div className="buttons">
        <button className="yes-button" onClick={() => onAccept(name)}>Sí</button>
        <button className="no-button" onClick={() => onReject(name)}>No</button>
      </div>
    </div>
  );
}

function App() {
  const [friends, setFriends] = useState(["Isabella", "Nicolas", "Sebastian", "Luisa"]);
  const [requests, setRequests] = useState(["Luis", "Jose", "Camila", "Esteban"]);
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState(["Ana", "Pablo", "Carlos", "Maria", "Sofia", "Pedro"]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAddFriend = (name) => {
    setFriends([...friends, name]);
    setUserList(userList.filter(user => user !== name));
  };

  const handleRemoveFriend = (name) => {
    setFriends(friends.filter(friend => friend !== name));
    setUserList([...userList, name]);  // Add removed friend back to userList
  };

  const handleAcceptRequest = (name) => {
    setFriends([...friends, name]);
    setRequests(requests.filter(request => request !== name));
    setUserList(userList.filter(user => user !== name)); // Remove accepted user from userList
  };

  const handleRejectRequest = (name) => {
    setRequests(requests.filter(request => request !== name));
  };

  // Filter out friends from userList and requests from userList
  const filteredUsers = userList.filter(user =>
    user.toLowerCase().includes(search.toLowerCase()) &&
    !friends.includes(user)  // Exclude friends from the user list
  );

  const filteredRequests = requests.filter(request =>
    request.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <div className="user-list-section">
        <h2>Buscar Usuarios</h2>
        <input 
          type="text" 
          placeholder="Buscar usuarios..." 
          value={search}
          onChange={handleSearchChange}
          className="search-bar"
        />
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <User key={index} name={user} onAdd={handleAddFriend} />
          ))
        ) : (
          <p className="empty-message">No se encontraron usuarios</p>
        )}
      </div>

      <div className="friends-section">
        <h2>Amigos</h2>
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <Friend key={index} name={friend} onRemove={handleRemoveFriend} />
          ))
        ) : (
          <p className="empty-message">No tienes amigos</p>
        )}
      </div>

      <div className="requests-section">
        <h2>Solicitudes</h2>
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request, index) => (
            <FriendRequest 
              key={index} 
              name={request} 
              onAccept={handleAcceptRequest} 
              onReject={handleRejectRequest}
            />
          ))
        ) : (
          <p className="empty-message">No tienes solicitudes de amistad</p>
        )}
      </div>
    </div>
  );
}

export default App;