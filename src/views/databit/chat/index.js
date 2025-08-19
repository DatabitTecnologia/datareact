import React, { createRef, useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { useTimer } from 'react-timer-hook';
import { apiGetPicturelist, apiExec, apiInsert, apiFind, apiList, apiUpdate, apiSetFile } from '../../../api/crudapi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AGGrid from '../../../components/AGGrid';
import user from '../../../assets/images/databit/User.png';
import Messages from './messages';
import { ValidationForm, TextInputGroup } from 'react-bootstrap4-form-validation';
import { Decode64, imageUrlToBase64 } from '../../../utils/crypto';
import { dateSQL } from '../../../utils/dateSQL';
import { sendMessage } from '../../../api/datawhats';
import interrogacao from '../../../assets/images/databit/interrogacaoblue.png';
import ring1 from '../../../assets/audio/databit/ring1.mp3';
import Filter from '../cadastro/filter';
import InforContato from '../contato/inforcontato';
import ChatHistorico from './historico';
import ChatUpload from './upload';
import ChatFullScreen from './fullscreen';

const DataChat = (props) => {
  const formRef = createRef();
  const [rows, setRows] = React.useState([]);
  const [rowsfilter, setRowsfilter] = React.useState([]);
  const [contatos, setContatos] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [scrollEl, setScrollEl] = React.useState();
  const [newMsg, setNewMsg] = React.useState('');
  const [contato, setContato] = React.useState([]);
  const [idchat, setIdchat] = React.useState(0);
  const [inicio, setInicio] = React.useState(false);
  const [rowschat, setRowschat] = React.useState([]);
  const [photo, setPhoto] = React.useState();
  const [codcontato, setCodcontato] = React.useState();
  const [whatsapp, setWhatsapp] = React.useState('');
  const [lenchat, setLenchat] = React.useState(0);
  const [sound, setSound] = React.useState(true);
  const [filters, setFilters] = React.useState(" 0 = 0 and (TB01128_SITUACAO = 'A') ");
  const [showfilter, setShowfilter] = useState(false);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [situacao, setSituacao] = React.useState('A');
  const [rowselect, setRowselect] = React.useState();
  const [itemselec, setItemselec] = React.useState();
  const [showinfor, setShowinfor] = useState(false);
  const [titulo, setTitulo] = React.useState('');
  const [icon, setIcon] = React.useState('');
  const [onupdate, setOnupdate] = React.useState(false);
  const [showhist, setShowhist] = useState(false);
  const [showupload, setShowupload] = useState(false);
  const [showfullscreen, setShowfullscreen] = useState(false);

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
      Filtrar();
      time.setSeconds(time.getSeconds() + 3);
      restart(time);
    }
  }

  const Filtrar = () => {
    let tmpfilter = filters;
    let seller = Decode64(sessionStorage.getItem('seller'));
    if (seller !== 'ZZZZ') {
      tmpfilter += " AND TB01128_CODVEN = '" + Decode64(sessionStorage.getItem('seller')) + "' ";
    }
    apiList('Contato', 'TB01128_CODIGO,TB01128_NOME', '', tmpfilter).then((response) => {
      if (response.status === 200) {
        setRowsfilter(response.data);
      }
    });
  };

  useEffect(() => {
    setColumns([
      {
        headerClassName: 'header-list',
        field: 'picture',
        headerName: '',
        width: 75,
        renderCell: (params) => {
          if (params.data.picture !== 'MHg=') {
            return (
              <img
                src={`data:image/jpeg;base64,${params.data.picture}`}
                alt={params.data.contato.NOME}
                className="rounded-circle"
                width="55"
                height="55"
              />
            );
          } else {
            return <img src={user} alt={params.data.contato.NOME} className="rounded-circle" width="55" height="55" />;
          }
        }
      },
      {
        headerClassName: 'header-list',
        field: 'contato',
        headerName: 'Listagem de contatos',
        width: 283,
        renderCell: (params) => {
          return (
            <Row style={{ textAlign: 'left', padding: '4px 4px 4px 4px' }}>
              <h6 style={{ fontSize: '13px' }}>{params.data.contato.nome}</h6>
              <h6 style={{ fontSize: '11px' }}>{params.data.contato.cliente}</h6>
              <Row>
                <Col lg={10}>
                  <h6 style={{ fontSize: '11px' }}>{params.data.contato.cargo}</h6>
                </Col>
                <Col lg={1}>
                  {params.data.contato.pend > 0 ? (
                    <Row style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '18px',
                          backgroundColor: '#3399ff',
                          textAlign: 'center',
                          padding: '2px 2px 2px 2px'
                        }}
                      >
                        <h6 style={{ fontSize: '11px', color: '#fff' }}>{params.data.contato.pend}</h6>
                      </div>
                    </Row>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
            </Row>
          );
        }
      }
    ]);
    setCarregando(true);
    Filtrar();
  }, []);

  useEffect(() => {
    let codigos = '';
    if (rowsfilter !== undefined && rowsfilter.length > 0) {
      rowsfilter.forEach((element) => {
        codigos += element.codigo;
      });
      apiGetPicturelist(
        'VW01132',
        'CODIGO',
        'PHOTO',
        "CHARINDEX(CODIGO,'" + codigos + "') > 0 ORDER BY NOME",
        'CODIGO,TIPO,NOME,WHATSAPP,CARGO,CODVEN,CLIENT,CODCLI,CHAT,PEND',
        ''
      ).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          setRows(response.data);
        }
      });
    } else {
      setCarregando(false);
    }
  }, [rowsfilter]);

  useEffect(() => {
    if (contato.whatsapp !== undefined) {
      setCarregando(true);
      if (contato.picture !== 'MHg=') {
        setPhoto(`data:image/jpeg;base64,${contato.picture}`);
      } else {
        setPhoto(user);
      }
      setCodcontato(contato.codigo);
      setWhatsapp(contato.whatsapp);
      apiExec(
        "UPDATE TB08014 SET TB08014_ACAO = 9999,TB08014_DTFECHADO = GETDATE(),TB08014_FECHADO = 'S' WHERE TB08014_CONTATO = '" +
          contato.codigo +
          "' AND DATEDIFF(DAY,TB08014_DATA,GETDATE()) > 0 AND TB08014_ATENDENTE = '" +
          Decode64(sessionStorage.getItem('user')) +
          "' ",
        'N'
      ).then((response) => {
        if (response.status === 200) {
          apiFind(
            'DatawhatsChat',
            '*',
            '',
            "TB08014_CONTATO = '" +
              contato.codigo +
              "' AND TB08014_DTFECHADO IS null AND TB08014_ATENDENTE = '" +
              Decode64(sessionStorage.getItem('user')) +
              "' "
          ).then((response) => {
            if (response.status === 200) {
              if (response.data) {
                setIdchat(response.data.id);
                setCarregando(false);
              } else {
                let item = {};
                let atual = new Date();
                item['chat'] = Decode64(sessionStorage.getItem('chat'));
                item['whatsapp'] = contato.whatsapp;
                item['whatsappdisp'] = Decode64(sessionStorage.getItem('whatsapp'));
                item['data'] = dateSQL(atual);
                item['ultenvio'] = dateSQL(atual);
                item['acao'] = 1;
                item['fechado'] = 'N';
                item['erro'] = 'N';
                item['idcontato'] = contato.whatsapp;
                item['nomeagenda'] = contato.nome;
                item['status'] = 0;
                item['acaoauto'] = 0;
                item['tipochat'] = 1;
                item['atendente'] = Decode64(sessionStorage.getItem('user'));
                item['setor'] = 'COMERCIAL';
                item['contato'] = contato.codigo;
                apiInsert('DatawhatsChat', item).then((response) => {
                  if (response.status === 200) {
                    console.log(response.data);
                    apiExec("select cast(IDENT_CURRENT('TB08014') as int) as seq", 'S').then((response) => {
                      if (response.status === 200) {
                        setIdchat(response.data[0].seq);
                      }
                    });
                  }
                });
              }
            }
          });
        }
      });
    }
  }, [contato]);

  useEffect(() => {
    if (idchat !== undefined && idchat > 0) {
      apiFind('DatawhatsFila', '*', '', 'TB08021_CHATVINCULADO = ' + idchat).then((response) => {
        if (response.status === 200) {
          if (response.data) {
            setInicio(true);
            ListMgs();
            setCarregando(false);
          } else {
            let item = {};
            let atual = new Date();
            item['chat'] = Decode64(sessionStorage.getItem('chat'));
            item['whatsapp'] = contato.whatsapp;
            item['whatsappdisp'] = Decode64(sessionStorage.getItem('whatsapp'));
            item['data'] = dateSQL(atual);
            item['idcontato'] = '55' + contato.whatsapp + '@c.us';
            item['nomeagenda'] = contato.nome;
            item['nomeperfil'] = contato.nome;
            item['status'] = 0;
            item['ordem'] = 99;
            item['chatvinculado'] = idchat;
            item['atendente'] = Decode64(sessionStorage.getItem('user'));
            item['tipo'] = 0;
            item['setor'] = 'COMERCIAL';
            apiInsert('DatawhatsFila', item).then((response) => {
              if (response.status === 200) {
                setInicio(true);
                ListMgs();
                setCarregando(false);
              }
            });
          }
        }
      });
    }
  }, [idchat]);

  useEffect(() => {
    if (rows !== undefined && rows.length > 0) {
      let tmpcontato = [];
      let item = {};
      let item2 = {};
      rows.forEach((element, index) => {
        item = {};
        item2 = {};
        item2['nome'] = element.NOME;
        item2['cliente'] = element.CLIENT;
        item2['cargo'] = 'Cargo : ' + element.CARGO;
        item2['whatsapp'] = 'WhatsAPP: ' + element.WHATSAPP;
        item2['pend'] = element.PEND;

        item['id'] = index;
        item['picture'] = element.picture;
        item['contato'] = item2;
        item['codigo'] = element.CODIGO;
        item['codcli'] = element.CODCLI;
        item['tipo'] = element.TIPO;
        item['nome'] = element.NOME;
        item['chat'] = element.CHAT;
        item['pend'] = element.PEND;
        item['whatsapp'] = element.WHATSAPP;
        item['cliente'] = element.CLIENT;
        item['cargo'] = 'Cargo : ' + element.CARGO;
        tmpcontato = tmpcontato.concat(item);
      });
      setContatos(tmpcontato);
      if (inicio) {
        ListMgs();
      }
    }
  }, [rows]);

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
        try {
          if (response.status === 200) {
            setNewMsg('');
          }
        } catch (error) {
          //
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

  const ListMgs = () => {
    apiList('DatawhatsTalkVW', '*', '', "CONTATO = '" + codcontato + "' ORDER BY TIME,IDCHAT ").then((response) => {
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

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setItemselec(newSelection);
      setContato(newSelection);
    }
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setContato(newSelection);
  };

  const handleClosefilter = () => {
    setCarregando(true);
    setShowfilter(false);
    Filtrar();
  };

  const Visualizar = () => {
    let item = {};

    item['TB01128_CODIGO'] = itemselec.codigo;
    setRowselect(item);
    setTitulo('Contato selecionado');
    setIcon('feather icon-check-circle h1');
    setShowinfor(true);
  };

  const Novo = () => {
    setRowselect(undefined);
    setTitulo('Novo Contato');
    setIcon('feather icon-star h1');
    setShowinfor(true);
  };

  const handleCloseinfor = () => {
    setShowinfor(false);
    Filtrar();
  };

  const handleClosehist = () => {
    setShowhist(false);
  };

  const handleCloseupload = () => {
    setShowupload(false);
    ListMgs();
  };

  const handleClosefull = () => {
    setShowfullscreen(false);
  };

  return (
    <React.Fragment>
      <div>
        <MyTimer expiryTimestamp={time} />
      </div>
      <div id="frmchat" name="frmchat">
        <Row>
          <Card className="Recent-Users" style={{ marginBottom: '-10px' }}>
            <Card.Header>
              <Card.Title as="h5">Controle de Chat</Card.Title>
            </Card.Header>
            <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
            <Row style={{ marginBottom: '8px' }}>
              <Col lg={3}>
                <Row style={{ marginTop: '10px' }}>
                  <AGGrid
                    width="100%"
                    height="695px"
                    rows={contatos}
                    rowHeight={70}
                    loading={carregando}
                    columns={columns}
                    item={itemselec}
                    setItem={(data) => setItemselec(data)}
                    onKeyDown={keyGrid}
                    onDoubleClick={dblClickGrid}
                  ></AGGrid>
                </Row>
              </Col>
              <Col lg={9} className="main-friend-cont scroll-div">
                <Row style={{ marginTop: '5px' }}>
                  <Card style={{ marginBottom: '5px' }}>
                    <Card.Header style={{ marginLeft: '-30px' }}>
                      <Row>
                        <Col lg={1}>
                          <img
                            className="media-object img-radius img-radius m-t-5"
                            src={contato.nome !== undefined ? `${photo}` : interrogacao}
                            alt={'foto'}
                            width="80"
                            height="80"
                            style={{ marginLeft: '15px' }}
                          />
                        </Col>
                        <Col lg={9}>
                          <Row style={{ textAlign: 'left', marginTop: '15px', marginLeft: '2px' }}>
                            <h6 style={{ fontSize: '16px' }}>{contato.nome !== undefined ? contato.nome : 'Contato não selecionado'}</h6>
                            <h6 style={{ fontSize: '11px' }}>{contato.nome !== undefined ? contato.cliente : 'Contato não selecionado'}</h6>
                            <h6 style={{ fontSize: '11px' }}>{contato.nome !== undefined ? contato.cargo : 'Contato não selecionado'}</h6>
                          </Row>
                        </Col>
                      </Row>
                    </Card.Header>
                    <div className="h-list-body">
                      <div className="main-friend-cont scroll-div">
                        <Row
                          className="main-friend-list"
                          style={{ marginLeft: '2px', marginRight: '2px', marginTop: '10px', marginBottom: '10px', height: '405px' }}
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
                            <Form.Group as={Col} style={{ width: '1040px' }}>
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
                    <div>
                      <Row style={{ textAlign: 'center' }}>
                        <Col>
                          <Button id="btnIncluir" className="btn btn-primary shadow-2 mb-3" onClick={() => Novo()}>
                            <i className={'feather icon-star'} /> Novo Contato
                          </Button>
                          <Button
                            id="btnVisualizar"
                            className="btn btn-primary shadow-2 mb-3"
                            disabled={contato.nome === undefined}
                            onClick={() => Visualizar()}
                          >
                            <i className={'feather icon-eye'} /> Visualizar Contato
                          </Button>
                          <Button
                            id="btnHistorico"
                            className="btn btn-primary shadow-2 mb-3"
                            disabled={contato.nome === undefined}
                            onClick={(e) => setShowhist(true)}
                          >
                            <i className={'feather icon-list'} /> Historico Conversas
                          </Button>
                          {filters === " 0 = 0 and (TB01128_SITUACAO = 'A') " ? (
                            <Button id="btnFilros" className="btn btn-primary shadow-2 mb-3" onClick={() => setShowfilter(true)}>
                              <i className={'feather icon-filter'} /> Opções Filtros
                            </Button>
                          ) : (
                            <Button id="btnFilros" className="btn btn-success shadow-2 mb-3" onClick={() => setShowfilter(true)}>
                              <i className={'feather icon-filter'} /> Opções Filtros
                            </Button>
                          )}
                          <Button
                            id="btnFullscreen"
                            className="btn btn-success shadow-2 mb-3"
                            disabled={contato.nome === undefined}
                            onClick={() => setShowfullscreen(true)}
                          >
                            <i className={'feather icon-maximize'} /> Tela Cheia
                          </Button>
                          {sound ? (
                            <Button id="btnSound1" className="btn btn-warning shadow-2 mb-3" onClick={(e) => setSound(false)}>
                              <i className={'feather icon-volume-x'} /> Tirar Som
                            </Button>
                          ) : (
                            <Button id="btnSound2" className="btn btn-warning shadow-2 mb-3" onClick={(e) => setSound(true)}>
                              <i className={'feather icon-volume-2'} /> Ativar Som
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Row>
              </Col>
            </Row>
          </Card>
        </Row>
      </div>
      <Modal backdrop="static" size="xl" show={showfilter} centered={true} onHide={handleClosefilter}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-filter h1'} />
          &nbsp;Filtrar registros
        </Modal.Header>
        <ModalBody>
          <Filter
            setFilters={(data) => setFilters(data)}
            filters={filters}
            valuesfield={valuesfield}
            valuesfield2={valuesfield2}
            termlist="Definição de Contatos"
            object="VW01125"
            table="TB01128"
            handleClosefilter={handleClosefilter}
            situacao={situacao}
            setValuesfield={(data) => setValuesfield(data)}
            setValuesfield2={(data) => setValuesfield2(data)}
            setSituacao={(data) => setSituacao(data)}
          ></Filter>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" fullscreen={true} show={showinfor} centered={true} onHide={handleCloseinfor} contentClassName="modal-mov">
        <Modal.Header className="h5" closeButton>
          <i className={icon} />
          &nbsp;{titulo}
        </Modal.Header>
        <ModalBody>
          <InforContato
            openmodal={true}
            showinfor={showinfor}
            rowselect={rowselect}
            setRowselect={(data) => setRowselect(data)}
            setShowinfor={(data) => setShowinfor(data)}
            onupdate={onupdate}
            setOnupdate={(data) => setOnupdate(data)}
          ></InforContato>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" fullscreen={true} show={showhist} centered={true} onHide={handleClosehist}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-list h1'} />
          &nbsp;Histórico de Conversas
        </Modal.Header>
        <ModalBody>
          <ChatHistorico contato={contato} photo={photo}></ChatHistorico>
        </ModalBody>
        <Modal.Footer>
          <Button id="btnFecharhist" className="btn btn-success shadow-2 mb-3" onClick={(e) => setShowhist(false)}>
            <i className={'feather icon-log-out'} /> Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal backdrop="static" size="lg" show={showupload} centered={true} onHide={handleCloseupload}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-upload h1'} />
          &nbsp;Upload de Arquivos
        </Modal.Header>
        <ModalBody>
          <ChatUpload contato={contato} showupload={showupload} setShowupload={(data) => setShowupload(data)}></ChatUpload>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" fullscreen={true} show={showfullscreen} centered={true} onHide={handleClosefull}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-message-circle h1'} />
          &nbsp;Controle de Chat : {contato.nome}
        </Modal.Header>
        <ModalBody>
          <ChatFullScreen
            contato={contato}
            sound={sound}
            rowschat={rowschat}
            setRowschat={(data) => setRowschat(data)}
            photo={photo}
            whatsapp={whatsapp}
          ></ChatFullScreen>
        </ModalBody>
        <Modal.Footer>
          <Button id="btnFecharfull" className="btn btn-success shadow-2 mb-3" onClick={(e) => setShowfullscreen(false)}>
            <i className={'feather icon-log-out'} /> Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default DataChat;
