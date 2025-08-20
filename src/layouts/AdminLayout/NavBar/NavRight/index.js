import React, { useContext, useState } from 'react';
import { ListGroup, Dropdown, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ChatList from './ChatList';
import { ConfigContext } from '../../../../contexts/ConfigContext';

import bell from '../../../../assets/images/databit/bell.png';
import mail from '../../../../assets/images/databit/mail.png';
import user from '../../../../assets/images/databit/User.png';
import zap from '../../../../assets/images/databit/zap.png';
import info from '../../../../assets/images/databit/info.png';
import { Decode64 } from '../../../../utils/crypto';
import InforUser from './user';
import InforAbout from './about';
import InforEmail from './email';
import InforChat from './chat';
import InforFluxo from './fluxo';
import { delUser } from '../../../../api/apiconnect';

import FluxoNotifier from './fluxo/notificacao';
import ListaNotificacoes from './fluxo/listanotificao';

const NavRight = (props) => {
  const configContext = useContext(ConfigContext);
  const navigate = useNavigate();
  const { rtlLayout } = configContext.state;

  const [listOpen, setListOpen] = useState(false);

  // ADIÇÃO: controla o modal da lista de notificações (Ft02027)
  const [showLista, setShowLista] = useState(false);

  const logOff = () => {
    try {
      delUser(
        Decode64(sessionStorage.getItem('urlconnect')),
        Decode64(sessionStorage.getItem('system')),
        Decode64(sessionStorage.getItem('coddatabit')),
        Decode64(sessionStorage.getItem('user')),
        Decode64(localStorage.getItem('idbrowser')),
        sessionStorage.getItem('ipaddress'),
        Decode64(sessionStorage.getItem('admin'))
      ).then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem('user', '');
          navigate('/');
        }
      });
    } catch (error) {
      sessionStorage.setItem('user', '');
      navigate('/');
    }
  };

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        {parseInt(Decode64(sessionStorage.getItem('system'))) === 1 || parseInt(Decode64(sessionStorage.getItem('system'))) === 2 ? (
          <ListGroup.Item as="li" bsPrefix=" ">
            <Dropdown align={!rtlLayout ? 'end' : 'start'} className="drp-user">
              <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
                <img src={zap} width="35px" height="35px" alt="zap"></img>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="profile-notification" style={{ width: '1200px' }}>
                <div className="pro-head">
                  <img src={zap} alt="zap"></img>
                  <span className="d-inline-block m-b-0">Últimas Conversas</span>
                </div>
                <InforChat></InforChat>
              </Dropdown.Menu>
            </Dropdown>
          </ListGroup.Item>
        ) : (
          <></>
        )}
        {parseInt(Decode64(sessionStorage.getItem('system'))) === 1 || parseInt(Decode64(sessionStorage.getItem('system'))) === 2 ? (
          <ListGroup.Item as="li" bsPrefix=" ">
            <Dropdown align={!rtlLayout ? 'end' : 'start'} className="drp-user">
              <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
                <img src={mail} width="40px" height="40px" alt="mail"></img>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="profile-notification" style={{ width: '1250px' }}>
                <div className="pro-head">
                  <img src={mail} alt="mail"></img>
                  <span className="d-inline-block m-b-0">E-Mails Enviados</span>
                </div>
                <InforEmail></InforEmail>
              </Dropdown.Menu>
            </Dropdown>
          </ListGroup.Item>
        ) : (
          <></>
        )}
        {Decode64(sessionStorage.getItem('system')) === '1' || Decode64(sessionStorage.getItem('system')) === '2' ? (
          <ListGroup.Item as="li" bsPrefix=" ">
            <Dropdown align={!rtlLayout ? 'end' : 'start'} className="drp-user">
              {/* mantém exatamente como antes: abre o dropdown com InforFluxo */}
              <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
                <img src={bell} width="40px" height="40px" alt="bell"></img>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="profile-notification" style={{ width: '1400px' }}>
                <div className="pro-head">
                  <img src={bell} alt="bell"></img>
                  <span className="d-inline-block m-b-0">Fluxo de Processos</span>
                </div>
                <InforFluxo></InforFluxo>
              </Dropdown.Menu>
            </Dropdown>
          </ListGroup.Item>
        ) : (
          <></>
        )}
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align={!rtlLayout ? 'end' : 'start'} className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              {sessionStorage.getItem('photo') === undefined ||
              sessionStorage.getItem('photo') === '' ||
              sessionStorage.getItem('photo') === null ? (
                <img src={user} width="35px" height="35px" alt="user" />
              ) : (
                <img src={`data:image/jpeg;base64,${sessionStorage.getItem('photo')}`} width="35px" height="35px" alt="user" />
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification" style={{ width: '450px' }}>
              <div className="pro-head">
                <Row>
                  <Col lg={8}>
                    {sessionStorage.getItem('photo') === undefined ||
                    sessionStorage.getItem('photo') === '' ||
                    sessionStorage.getItem('photo') === null ? (
                      <img src={user} className="img-radius" alt="User Profile" />
                    ) : (
                      <img src={`data:image/jpeg;base64,${sessionStorage.getItem('photo')}`} alt="User Profile" />
                    )}
                    <span>{Decode64(sessionStorage.getItem('user'))}</span>
                  </Col>
                  <Col lg={1}>
                    <Link
                      onClick={(e) => {
                        e.preventDefault(); // Impede a navegação padrão
                        logOff(); // Chama o método logOff
                      }}
                      className="dud-logout"
                      title="Logout"
                    >
                      <i className="feather icon-log-out" />
                    </Link>
                  </Col>
                </Row>
              </div>
              <InforUser></InforUser>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align={!rtlLayout ? 'end' : 'start'} className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <img src={info} width="25px" height="25px" alt="info"></img>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification" style={{ width: '470px' }}>
              <div className="pro-head">
                <img src={info} alt="info"></img>
                <span className="d-inline-block m-b-0">Informações do Sistema</span>
              </div>
              <InforAbout></InforAbout>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />

      {/* ADIÇÃO: Notificador — no "Ver agora" abre o modal da lista */}
      <FluxoNotifier
        habilitado={Decode64(sessionStorage.getItem('system')) === '1' || Decode64(sessionStorage.getItem('system')) === '2'}
        onOpenFluxo={() => setShowLista(true)}
      />

      {/* ADIÇÃO: Modal com AGGrid (Ft02027) */}
      <ListaNotificacoes show={showLista} onHide={() => setShowLista(false)} />
    </React.Fragment>
  );
};

export default NavRight;
