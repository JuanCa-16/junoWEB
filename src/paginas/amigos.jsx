import React, { useState } from 'react';
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
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);
  const [username, setUsername] = useState("Nombre usuario");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/usuarios/estalogin', {
          method: 'GET',
          headers: { token: localStorage.getItem('token') }
        });

        const data = await response.json();
        if (response.status === 200) {
          setUsername(data.nombre);
          setUserEmail(data.correo);
          fetchFriends(data.correo);
          fetchRequests(data.correo);
        } else {
          console.error('No se pudo obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  // Obtener solicitudes de amistad
  const fetchRequests = async (correo_usuario) => {
    try {
      const response = await axios.get(`http://localhost:5000/amistades/solicitudes-pendientes/${correo_usuario}`);
      // Establecer el estado de solicitudes
      setRequests(response.data.map(request => ({
        nombre: request.nombre_envia, // El nombre del remitente
        correo: request.correo_usuario_envia // El correo del remitente
      })));
    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
    }
  };

  // Obtener todos los usuarios desde el backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/usuarios'); 
      setUserList(response.data);
    } catch (error) {
      console.error('Error al traer los usuarios:', error);
    }
  };

  // Obtener amigos del usuario y sus nombres
  const fetchFriends = async (correo_usuario) => {
    try {
      const response = await axios.get(`http://localhost:5000/amistades/amigos/${correo_usuario}`);
      const friendEmails = response.data.map(friend => 
        friend.correo_usuario_envia === correo_usuario ? friend.correo_usuario_recibe : friend.correo_usuario_envia
      );

      // Ahora, obtener el nombre de cada amigo
      const friendsWithNames = await Promise.all(friendEmails.map(async (email) => {
        const nameResponse = await axios.get(`http://localhost:5000/usuarios/nombre/${email}`);
        return nameResponse.data.nombre; // Obtener el nombre del amigo
      }));

      setFriends(friendsWithNames);
    } catch (error) {
      console.error('Error al obtener amigos:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAddFriend = async (name) => {
    try {
      const response = await axios.get(`http://localhost:5000/usuarios/correo/${name}`);
      const correoRecibe = response.data.correo_electronico;

      await axios.post('http://localhost:5000/amistades/enviar-solicitud', {
        correo_envia: userEmail,
        correo_recibe: correoRecibe
      });

      toast.success('Solicitud enviada con éxito');
      setUserList(userList.filter(user => user.nombre_usuario !== name));
    } catch (error) {
      console.error('Error al añadir amigo:', error);
      toast.error('Error al enviar la solicitud');
    }
  };

  const handleRemoveFriend = async (name) => {
    try {
      // Obtener el correo del amigo a partir del nombre de usuario
      const response = await axios.get(`http://localhost:5000/usuarios/correo/${name}`);
      const correoAmigo = response.data.correo_electronico;
      // Realiza la llamada a la API para eliminar la amistad
      await axios.delete('http://localhost:5000/amistades/eliminar-amistad', {
        data: {
          correo_envia: correoAmigo, // Correo del amigo
          correo_recibe:  userEmail// Correo del usuario que esta conectado
        }
      });
  
      // Actualiza el estado para eliminar el amigo de la lista local
      toast.success('Amistad eliminada con éxito');
      setFriends(friends.filter(friend => friend !== name));
      toast.success('Amistad eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la amistad:', error);
      toast.error('Error al eliminar la amistad');
    }
  };

  const handleAcceptRequest = async (correo) => {
    try {
      // Lógica para aceptar la solicitud, usa el correo del remitente
      const response = await axios.put('http://localhost:5000/amistades/aceptar-solicitud', {
        correo_envia: correo,
        correo_recibe: userEmail
      });

      // Obtener el nombre del amigo recién aceptado
      const nameResponse = await axios.get(`http://localhost:5000/usuarios/nombre/${correo}`);
      const nombreAmigo = nameResponse.data.nombre;

      toast.success('Solicitud aceptada');
      setRequests(requests.filter(request => request.correo !== correo)); // Elimina de las solicitudes pendientes
      setFriends([...friends, nombreAmigo]); // Añadir el nombre del amigo
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
      toast.error('Error al aceptar la solicitud');
    }
  };

  const handleRejectRequest = async (correo) => {
    try {
      // Lógica para rechazar la solicitud
      await axios.put('http://localhost:5000/amistades/rechazar-solicitud', {
        correo_envia: correo,
        correo_recibe: userEmail
      });
      toast.success('Solicitud rechazada');
      setRequests(requests.filter(request => request.correo !== correo));
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
      toast.error('Error al rechazar la solicitud');
    }
  };


  // Filter out friends from userList and requests from userList
  const filteredUsers = userList.filter(user =>
    user.nombre_usuario.toLowerCase().includes(search.toLowerCase()) &&
    !friends.includes(user.nombre_usuario) &&
    user.nombre_usuario !== username
  );
  return (
    <div className="app">
      <Toaster position="top-right" />
      <div className="user-list-section">
        <h2>Buscar Usuarios</h2>
        <input 
          type="text" 
          placeholder="Buscar usuarios..." 
          value={search}
          onChange={handleSearchChange}
          className="search-bar"
        />
        {search.length === 0 ? (
          <p className="empty-message">Ingresa el nombre del usuario que deseas buscar</p>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <User key={index} name={user.nombre_usuario} onAdd={handleAddFriend} />
          ))
        ) : (
          <p className="empty-message">No se encontraron usuarios</p>
        )}
      </div>

      <div className="friends-section">
        <h2>Amigos</h2>
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <Friend key={index} name={friend}  onRemove={handleRemoveFriend} />
          ))
        ) : (
          <p className="empty-message">No tienes amigos</p>
        )}
      </div>

      <div className="requests-section">
        <h2>Solicitudes</h2>
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <FriendRequest 
              key={index} 
              name={request.nombre} // Mostrar el nombre
              onAccept={() => handleAcceptRequest(request.correo)} // Pasar el correo al aceptar
              onReject={() => handleRejectRequest(request.correo)} // Pasar el correo al rechazar
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
