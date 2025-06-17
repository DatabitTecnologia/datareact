import React, { createRef, useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Modal, ModalBody } from 'react-bootstrap';
import { apiList, apiUpdate } from '../../../../api/crudapi';
import { useTimer } from 'react-timer-hook';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Messages from '../messages';
import { ValidationForm, TextInputGroup } from 'react-bootstrap4-form-validation';
import { dateSQL } from '../../../../utils/dateSQL';
import { sendMessage } from '../../../../api/datawhats';
import ring1 from '../../../../assets/audio/databit/ring1.mp3';
import ChatUpload from '../upload';
import { imageUrlToBase64 } from '../../../../utils/crypto';

const ChatFullScreen = (props) => {
  const formRef = createRef();
  const { contato, sound, whatsapp } = props;
  const [newMsg, setNewMsg] = React.useState('');
  const [idchat, setIdchat] = React.useState(0);
  const { rowschat, setRowschat } = props;
  const { photo, setPhoto } = props;
  const [lenchat, setLenchat] = React.useState(0);
  const [scrollEl, setScrollEl] = React.useState();
  const [showupload, setShowupload] = useState(false);

  const audio = new Audio(ring1);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 3);

  function MyTimer({ expiryTimestamp }) {
    const { totalSeconds, seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
      expiryTimestamp,
      onExpire: () => console.warn('onExpire called'),
      autoStart: true
    });
    if (seconds === 0) {
      const time = new Date();
      ListMgs();
      time.setSeconds(time.getSeconds() + 3);
      restart(time);
    }
  }

  const ListMgs = () => {
    apiList('DatawhatsTalkVW', '*', '', "CONTATO = '" + contato.codigo + "' ORDER BY TIME,IDCHAT ").then((response) => {
      if (response.status === 200) {
        setRowschat(response.data);
      }
    });
  };

  useEffect(() => {
    if (lenchat !== rowschat.length) {
      setLenchat(rowschat.length);
      if (sound) {
        audio.play();
      }
    }

    rowschat.forEach((chat) => {
      if (chat.tipoarq > -1) {
        if (chat.isfile === 0) {
          console.log(chat.msg);
          imageUrlToBase64(chat.msg)
            .then((res) => {
              let pos = res.indexOf('base64') + 7;
              res = res.substring(pos);
              apiSetFile('TB08026', 'TB08026_ID', 'TB08026_FILE', chat.idchat, res).then((response) => {
                if (response.status === 200) {
                  console.log(response.data);
                }
              });
            })
            .catch((err) => console.log(err));
        }
      }
    });

    rowschat.forEach((chat) => {
      if (chat.dtenvio === undefined || chat.dtenvio === null) {
        let atual = new Date();
        chat.dtenvio = dateSQL(atual);
        chat.id = chat.idchat;
        apiUpdate('DatawhatsTalk', chat).then((response) => {
          if (response.status === 200) {
            console.log(response.data);
          }
        });
      }
    });
  }, [rowschat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMsg !== undefined && newMsg !== '') {
      let item = {};
      let atual = new Date();
      item['chat'] = Decode64(sessionStorage.getItem('chat'));
      item['chatvinculado'] = idchat;
      item['data'] = dateSQL(atual);
      item['dtenvio'] = dateSQL(atual);
      item['time'] = dateSQL(atual);
      item['msg'] = newMsg;
      item['tipo'] = 1;
      item['tipomens'] = 0;
      item['type'] = 1;
      item['enviado'] = 1;
      item['id'] = rowschat.length + 1;
      let tmpchat = rowschat.slice(0, rowschat.length);
      tmpchat = tmpchat.concat(item);
      setRowschat([...tmpchat]);
      resetForm();
      sendMessage(whatsapp, newMsg).then((response) => {
        if (response.status === 200) {
          setNewMsg('');
        }
      });
    }
  };

  const handleChange = (e) => {
    setNewMsg(e.target.value);
  };

  const resetForm = () => {
    formRef.current.resetValidationState(true);
  };

  const handleErrorSubmit = () => {
    //console.log(errorInputs);
  };
  const handleCloseupload = () => {
    setShowupload(false);
    ListMgs();
  };

  return (
    <React.Fragment>
      <div>
        <MyTimer expiryTimestamp={time} />
      </div>
      <div id="frmchat" name="frmchat">
        <Row>
          <Row>
            <Card style={{ marginBottom: '5px', marginLeft: '10px' }}>
              <div className="h-list-body">
                <div className="main-friend-cont scroll-div">
                  <Row
                    className="main-friend-list"
                    style={{ marginLeft: '2px', marginRight: '2px', marginTop: '10px', marginBottom: '10px', height: '585px' }}
                  >
                    <PerfectScrollbar
                      containerRef={(ref) => {
                        setScrollEl(ref);
                      }}
                      style={{
                        backgroundColor: 'rgb(230, 245, 255)'
                      }}
                    >
                      {rowschat !== undefined && rowschat.length > 0 ? (
                        rowschat.map((message, index) => {
                          return <Messages key={index} message={message} name={contato.nome} photo={photo} />;
                        })
                      ) : (
                        <></>
                      )}
                    </PerfectScrollbar>
                  </Row>
                </div>
              </div>
              <hr />
              <div className="msg-form" style={{ marginBottom: '10px' }}>
                <ValidationForm ref={formRef} onSubmit={handleSubmit} onErrorSubmit={handleErrorSubmit}>
                  <Row>
                    <Col>
                      <Form.Group as={Col} style={{ width: '1700px' }}>
                        <TextInputGroup
                          name="newMsg"
                          id="newMsg"
                          placeholder="Digite sua mensagem"
                          value={newMsg}
                          onChange={handleChange}
                          autoComplete="off"
                          disabled={contato.nome === undefined}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Button
                        type="submit"
                        variant="link"
                        className="btn-theme btn-icon btn-msg-send"
                        disabled={contato.nome === undefined}
                      >
                        <i className="feather icon-play" />
                      </Button>
                      <Button
                        variant="link"
                        className="btn-theme btn-icon btn-msg-send"
                        disabled={contato.nome === undefined}
                        onClick={(e) => setShowupload(true)}
                      >
                        <i className="feather icon-upload" />
                      </Button>
                    </Col>
                  </Row>
                </ValidationForm>
              </div>
            </Card>
          </Row>
        </Row>
      </div>
      <Modal backdrop="static" size="lg" show={showupload} centered={true} onHide={handleCloseupload}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-upload h1'} />
          &nbsp;Upload de Arquivos
        </Modal.Header>
        <ModalBody>
          <ChatUpload contato={contato} showupload={showupload} setShowupload={(data) => setShowupload(data)}></ChatUpload>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ChatFullScreen;
