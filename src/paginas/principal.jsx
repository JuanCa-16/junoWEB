import React, { useState } from "react";
import { Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../estilos/i2.scss';
import "../estilos/Principal.css";
import { FaPencil } from "react-icons/fa6";
import avatar1 from '../imagenes/ava1.png';
import { Snackbar, Alert } from "@mui/material";

const Principal = () => {
  const [selectedBtnSelect, setSelectedBtnSelect] = useState("Todos");
  const [selectedBtnGeneral, setSelectedBtnGeneral] = useState("General");
  const [showPostSection, setShowPostSection] = useState(false);
  const [selectedEmotionPost, setSelectedEmotionPost] = useState(null);
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([
    {
      username: "Juan",
      emotion: "Feliz",
      text: "Hoy me siento muy contento porque el sol está brillando y todo parece ir bien.",
    },
    {
      username: "Ana",
      emotion: "Triste",
      text: "No estoy pasando por un buen momento. Siento que todo está en mi contra.",
    },
    {
      username: "Luis",
      emotion: "Motivado",
      text: "Estoy emocionado por el nuevo proyecto en el que estoy trabajando. ¡Siento que puedo lograr grandes cosas!",
    },
    {
      username: "Sofia",
      emotion: "Ansioso",
      text: "Tengo un poco de nervios por la presentación que tengo mañana. Espero que todo salga bien.",
    },
  ]);
  const [username, setUsername] = useState("Nombre usuario"); // Estado para el nombre de usuario

  // Estado para manejar la alerta
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSelectClick = (button) => {
    setSelectedBtnSelect(button);
  };

  const handleGeneralClick = (button) => {
    setSelectedBtnGeneral(button);
  };

  const handleEmotionClick = (emotion) => {
    setSelectedEmotionPost(emotion);
  };

  const handlePublishClick = () => {
    if (!selectedEmotionPost) {
      setAlertMessage("Selecciona una emocion de como te sientes para poder publicar");
      setOpenAlert(true);
      return;
    }

    if (postText.length === 0) {
      setAlertMessage("Escribe algo antes de publicar, venga yo se que puedes!");
      setOpenAlert(true);
      return;
    }

    // Añadir una nueva publicación a la lista con el nombre de usuario
    const newPost = {
      username: username,
      emotion: selectedEmotionPost,
      text: postText,
    };
    setPosts([newPost, ...posts]);
    setPostText("");
    setShowPostSection(false);
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
            <Col className="d-flex justify-content-center m-2" key={label}>
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
                  src="/perfil.webp"
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
                      <Col className="d-flex justify-content-start m-2" key={emotion}>
                        <Button
                          className={`btn-emotion w-100 ${emotion.toLowerCase()} ${selectedEmotionPost === emotion ? "active" : ""}`}
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
      <Row className="mt-5 ms-1">
        {posts.length === 0 ? (
          <Col xs={12} className="bg-posts">
            <span className="no-posts-text">
              Aún no hay publicaciones disponibles
            </span>
            <img
              src="/logos.png"
              alt="logo"
              className="logo-transparent"
            />
            <span className="mt-3">
              Crea tu primera historia en el diario!
            </span>
          </Col>
        ) : (
          posts.map((post, index) => (
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
                    <span className={`emotion-badge ms-2 mb-2 ${post.emotion.toLowerCase()}`}>
                      {post.emotion}
                    </span>
                  </div>
                  <p className="post-text mt-3">{post.text}</p>
                </div>
              </div>
            </Col>
          ))
        )}
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
