import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Background404 from './../../assets/images/error404.png';

const NotFound404 = () => {
  const navigate = useNavigate();

  const Entrar = () => {
    navigate('/');
  };
  return (
    <React.Fragment>
      <div className="auth-wrapper maintenance">
        <Container>
          <Row className="justify-content-center">
            <Col className="text-center">
              <div>
                <img src={Background404} alt="404 - Page Not Found" />
              </div>
              <br></br>
              <br></br>
              <Row className="justify-content-center">
                <Col className="text-center">
                  <div id="divLogin">
                    <Button id="btnentrar" onClick={Entrar} className="btn btn-primary shadow-2 mb-5">
                      Entrar no sistema novamente !
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default NotFound404;
