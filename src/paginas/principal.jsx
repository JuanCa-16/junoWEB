import React, { useState } from "react";
import { Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/Principal.css";
import { FaPencil } from "react-icons/fa6";

const principal = () => {
  const [selectedBtnSelect, setSelectedBtnSelect] = useState("Todos");
  const [selectedBtnGeneral, setSelectedBtnGeneral] = useState("General");
  const [showPostSection, setShowPostSection] = useState(false);
  const [selectedEmotionPost, setSelectedEmotionPost] = useState(null);

  const handleSelectClick = (button) => {
    setSelectedBtnSelect(button);
  };

  const handleGeneralClick = (button) => {
    setSelectedBtnGeneral(button);
  };

  const handleEmotionClick = (emotion) => {
    setSelectedEmotionPost(emotion);
  };

  const handleCancelClick = () => {
    setShowPostSection(false);
  };

  return (
    <Container className="container-custom">
      <Row className="mb-3">
        <ButtonGroup aria-label="Basic example" className="w-100">
          <Button
            className={`btn-select rounded-md ${
              selectedBtnSelect === "Todos" ? "active" : ""
            }`}
            onClick={() => handleSelectClick("Todos")}
          >
            Todos
          </Button>
          <Button
            className={`btn-select ${
              selectedBtnSelect === "Amigos" ? "active" : ""
            }`}
            onClick={() => handleSelectClick("Amigos")}
          >
            Amigos
          </Button>
        </ButtonGroup>
      </Row>
      <Row>
        <div className="d-flex flex-wrap justify-content-center align-items-center m-2">
          {[
            "General",
            "Feliz",
            "Triste",
            "Enojado",
            "Ansioso",
            "Motivado",
            "Aburrido",
          ].map((label) => (
            <Col className="d-flex justify-content-center m-2" key={label}>
              <Button
                className={`btn-general w-100 ${
                  selectedBtnGeneral === label ? label.toLowerCase() : ""
                }`}
                onClick={() => handleGeneralClick(label)}
              >
                {label}
              </Button>
            </Col>
          ))}
        </div>
      </Row>

      <Row className="mt-4 ms-3">
        <Col xs={12} className="d-flex justify-content-start">
          {!showPostSection && (
            <div
              className="row-create-post"
              onClick={() => setShowPostSection(true)}
            >
              <div className="d-flex align-items-center flex-nowrap">
                <img
                  src="/perfil.webp" // Ruta desde la carpeta public
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
                <span className="user-name ms-2 mb-2">Nombre usuario</span>
                <span className="ms-2">Hoy me siento</span>
                <Row className="justify-content-start align-items-start">
                  <div className="d-flex flex-wrap justify-content-start align-items-center m-2">
                    {[
                      "Feliz",
                      "Triste",
                      "Enojado",
                      "Ansioso",
                      "Motivado",
                      "Aburrido",
                    ].map((emotion) => (
                      <Col className="d-flex justify-content-strart m-2" key={emotion}>
                        <Button
                          className={`btn-emotion w-100 ${
                            selectedEmotionPost === emotion ? emotion.toLowerCase(): ""
                          }`}
                          onClick={() => handleEmotionClick(emotion)}
                        >
                          {emotion}
                        </Button>
                      </Col>
                    ))}
                  </div>
                </Row>
                <span className="ms-2">Porque...</span>
                <textarea
                  className="form-control custom-textarea"
                  rows="1,5"
                  placeholder="Escribe lo que estás pensando..."
                ></textarea>
                <div className="d-flex justify-content-between mt-2">
                  <Button className="btn-publish me-2">Publicar</Button>
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

      <Row className="mt-5 ms-3">
        <Col xs={12} className="bg-posts">
          <span className="no-posts-text">
            Aún no hay publicaciones disponibles
          </span>
          <img
            src="/logos.png"
            alt="logo" // Ruta desde la carpeta public
            className="logo-transparent"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default principal;
