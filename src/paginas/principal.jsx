import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../estilos/i2.scss';
import "../estilos/Principal.scss";
import { FaPencil } from "react-icons/fa6";
import avatar1 from '../imagenes/ava1.png';
import { Snackbar, Alert } from "@mui/material";

const Principal = () => {
  const [selectedBtnSelect, setSelectedBtnSelect] = useState("Todos");
  const [selectedBtnGeneral, setSelectedBtnGeneral] = useState("General");
  const [showPostSection, setShowPostSection] = useState(false);
  const [selectedEmotionPost, setSelectedEmotionPost] = useState(null);
  const [postText, setPostText] = useState("");
  const [username, setUsername] = useState("Nombre usuario");
  const [userEmail, setUserEmail] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Estado para manejar las publicaciones de amigos
  const [friendsPosts, setFriendsPosts] = useState([]);

  // Estado para manejar la alerta
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Estado para manejar el número de publicaciones visible
  const [visiblePostsCount, setVisiblePostsCount] = useState(5);

  // Obtener el nombre de usuario y correo electrónico desde el backend
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
        } else {
          setAlertMessage('No se pudo obtener los datos del usuario');
          setOpenAlert(true);
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        setAlertMessage('Error al obtener los datos de usuario');
        setOpenAlert(true);
      }
    };

    fetchUserData();
  }, []);

  // Obtener publicaciones desde la base de datos
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/publicaciones');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          throw new Error('Error al obtener publicaciones');
        }
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      }
    };

    fetchPosts();
  }, []);

  // Obtener publicaciones de amigos cuando se selecciona "Amigos"
  useEffect(() => {
    const fetchFriendsPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/publicaciones/amigos/${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setFriendsPosts(data);
        } else {
          throw new Error('Error al obtener publicaciones de amigos');
        }
      } catch (error) {
        console.error('Error al obtener publicaciones de amigos:', error);
      }
    };

    if (selectedBtnSelect === "Amigos" && userEmail) {
      fetchFriendsPosts();
    }
  }, [selectedBtnSelect, userEmail]);

  // Filtrar publicaciones según el botón seleccionado y la emoción
  useEffect(() => {
    let postsToFilter = [];

    if (selectedBtnSelect === "Amigos") {
      postsToFilter = friendsPosts;
    } else {
      postsToFilter = posts;
    }

    // Filtra publicaciones por emoción si se ha seleccionado una
    if (selectedBtnGeneral !== "General") {
      postsToFilter = postsToFilter.filter(post => post.emocion_asociada === selectedBtnGeneral);
    }

    setFilteredPosts(postsToFilter);
  }, [selectedBtnSelect, selectedBtnGeneral, posts, friendsPosts]);

  const handleSelectClick = (button) => {
    setSelectedBtnSelect(button);
  };

  const handleGeneralClick = (button) => {
    setSelectedBtnGeneral(button);
  };

  const handleEmotionClick = (emotion) => {
    setSelectedEmotionPost(emotion);
  };

  const handlePublishClick = async () => {
    if (!selectedEmotionPost) {
      setAlertMessage("Selecciona una emoción de cómo te sientes para poder publicar");
      setOpenAlert(true);
      return;
    }

    if (postText.length === 0) {
      setAlertMessage("Escribe algo antes de publicar, ¡venga yo sé que puedes!");
      setOpenAlert(true);
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    const newPost = {
      userEmail: userEmail,
      username: username,
      emotion: selectedEmotionPost,
      text: postText,
      date: currentDate,
    };

    try {
      const response = await fetch('http://localhost:5000/publicaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contenido: newPost.text,
          emocion_asociada: newPost.emotion,
          fecha_evento: currentDate,
          correo_usuario: userEmail,
          username: newPost.username,
        })
      });

      if (response.ok) {
        const data = await response.json();

        // Actualizar el estado de posts para incluir la nueva publicación
        setPosts((prevPosts) => [
          ...prevPosts,
          {
            contenido: newPost.text,
            emocion_asociada: newPost.emotion,
            username: newPost.username,
            fecha_evento: currentDate,
          },
        ]);

        setPostText("");
        setSelectedEmotionPost(null);
        setShowPostSection(false);
      } else {
        const errorData = await response.json();
        setAlertMessage(errorData.error || 'Error al publicar');
        setOpenAlert(true);
      }
    } catch (error) {
      console.error('Error al enviar la publicación:', error);
      setAlertMessage('Error al enviar la publicación');
      setOpenAlert(true);
    }
  };

  const handleCancelClick = () => {
    setShowPostSection(false);
  };

  return (
    <Container className="container-custom">
      <Row className="mb-3">
        <ButtonGroup aria-label="Basic example" className="w-100">
          <Button
            className={`btn-select rounded-md ${selectedBtnSelect === "Todos" ? "active" : ""}`}
            onClick={() => handleSelectClick("Todos")}
          >
            Todos
          </Button>
          <Button
            className={`btn-select ${selectedBtnSelect === "Amigos" ? "active" : ""}`}
            onClick={() => handleSelectClick("Amigos")}
          >
            Amigos
          </Button>
        </ButtonGroup>
      </Row>

      <Row>
        <div className="d-flex flex-wrap justify-content-center align-items-center m-2">
          {["General", "Feliz", "Triste", "Enojado", "Ansioso", "Motivado", "Aburrido"].map((label) => (
            <Col className="d-flex justify-content-center m-2 divB" key={label}>
              <Button
                className={`btn-general w-100 ${label.toLowerCase()} ${selectedBtnGeneral === label ? "active" : ""}`}
                onClick={() => handleGeneralClick(label)}
              >
                {label}
              </Button>
            </Col>
          ))}
        </div>
      </Row>

      {/* Sección para crear publicaciones */}
      <Row className="mt-4">
        <Col xs={12} className="d-flex justify-content-start">
          {!showPostSection && (
            <div
              className="row-create-post"
              onClick={() => setShowPostSection(true)}
            >
              <div className="d-flex align-items-center flex-nowrap">
                <img
                  src={avatar1}
                  alt="Logo"
                  className="img-fluid rounded-circle"
                />
                <span className="ms-2">Comentar tus sentimientos...</span>
                <FaPencil size={45} className="icon ms-5 me-2" />
              </div>
            </div>
          )}

          {showPostSection && (
            <div className="row-create-post">
              <div className="user-info d-flex flex-column align-items-start">
                <img
                  src={avatar1}
                  alt="Logo"
                  className="img-fluid rounded-circle user-image"
                />
              </div>
              <div className="custom-div-post d-flex flex-column align-items-start m-2">
                <span className="user-name ms-2 mb-2">{username}</span>
                <span className="ms-2">Hoy me siento</span>
                <Row className="justify-content-start align-items-start">
                  <div className="d-flex flex-wrap justify-content-start align-items-center m-2">
                    {["Feliz", "Triste", "Enojado", "Ansioso", "Motivado", "Aburrido"].map((emotion) => (
                      <Col className="d-flex justify-content-start m-2 divB" key={emotion}>
                        <Button
                          className={`btn-emotion w-100 divB ${emotion.toLowerCase()} ${selectedEmotionPost === emotion ? "active" : ""}`}
                          onClick={() => handleEmotionClick(emotion)}
                        >
                          {emotion}
                        </Button>
                      </Col>
                    ))}
                  </div>
                </Row>
                <span className="ms-2 mb-2">Porque...</span>
                <textarea
                  className="form-control custom-textarea"
                  rows="4"
                  placeholder="Escribe lo que estás pensando..."
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                ></textarea>
                <div className="d-flex justify-content-between mt-2">
                  <Button className="btn-publish me-2" onClick={handlePublishClick}>
                    Publicar
                  </Button>
                  <Button
                    className="btn-cancel"
                    onClick={handleCancelClick}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>

      {/* Mostrar las publicaciones debajo del formulario */}
      <Row className="mt-5">
        {posts.length === 0 ? (
          <Col xs={12} className="bg-posts">
            {selectedBtnSelect === "Amigos" ? (
              <span className="no-posts-text">No tienes amigos aún</span>
            ) : (
              <span className="no-posts-text">¡Crea tu primera historia en el diario!</span>
            )}
            <img src="/logos.png" alt="logo" className="logo-transparent" />
            {selectedBtnSelect === "Amigos" && (
              <span className="mt-3">Conectando vidas a través de historias!</span>
            )}
          </Col>
        ) : (
          filteredPosts.slice().reverse().slice(0, visiblePostsCount).map((post, index) => (
            <Col xs={12} key={index} className="post-display-col mb-3 p-3">
              <div className="d-flex">
                <div className="user-info d-flex flex-column align-items-start">
                  <img
                    src={avatar1}
                    alt="Avatar"
                    className="img-fluid rounded-circle"
                  />
                </div>

                <div className="custom-div-post d-flex flex-column align-items-start m-2">
                  <div className="d-flex align-items-center">
                    <span className="user-name-post ms-2 mb-2">{post.username}</span>
                    <span className={`emotion-badge ms-2 mb-2 ${post.emocion_asociada.toLowerCase()}`}>
                      {post.emocion_asociada}
                    </span>
                  </div>
                  <p className="post-text mt-3">{post.contenido}</p>
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>
      {/* Botón para cargar más publicaciones */}
      <Row className="mt-3">
        <Col xs={12} className="d-flex justify-content-center">
          {visiblePostsCount < filteredPosts.length && (
            <Button
              className="btn-cargar-mas rounded-md"
              onClick={() => setVisiblePostsCount(visiblePostsCount + 5)}
            >
              Cargar más
            </Button>
          )}
        </Col>
      </Row>

      {/* Snackbar para mostrar alertas */}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert onClose={() => setOpenAlert(false)} variant="filled" severity="warning">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Principal;
