import React, { createRef, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import user from '../../../../../assets/images/databit/User.png';
import interrogacao from '../../../../../assets/images/databit/interrogacaoblue.png';
import { apiGetPicturelist, apiList, apiUpdate, apiSetFile } from '../../../../../api/crudapi';
import AGGrid from '../../../../../components/AGGrid';
import { Decode64 } from '../../../../../utils/crypto';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Messages from '../../../../../views/databit/chat/messages';

const InforChat = (props) => {
  const formRef = createRef();
  const [rows, setRows] = React.useState([]);
  const [rowsfilter, setRowsfilter] = React.useState([]);
  const [contatos, setContatos] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [itemselec, setItemselec] = React.useState();
  const [carregando, setCarregando] = React.useState(false);
  const [filters, setFilters] = React.useState(
    " TB01128_CODIGO IN (SELECT TB08014_CONTATO FROM TB08014 WHERE TB08014_ATENDENTE = '" + Decode64(sessionStorage.getItem('user')) + "') "
  );
  const [contato, setContato] = React.useState([]);
  const [rowschat, setRowschat] = React.useState([]);
  const [photo, setPhoto] = React.useState();
  const [scrollEl, setScrollEl] = React.useState();

  const Filtrar = () => {
    apiList('Contato', 'TB01128_CODIGO,TB01128_NOME', '', filters).then((response) => {
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
        width: 65,
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
        width: 293,
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
    }
  }, [rows]);

  useEffect(() => {
    if (contato.whatsapp !== undefined) {
      if (contato.picture !== 'MHg=') {
        setPhoto(`data:image/jpeg;base64,${contato.picture}`);
      } else {
        setPhoto(user);
      }
      setCarregando(true);
      apiList('DatawhatsTalkVW', '*', '', "CONTATO = '" + contato.codigo + "' ORDER BY TIME,IDCHAT ").then((response) => {
        if (response.status === 200) {
          setRowschat(response.data);
          setCarregando(false);
        }
      });
    }
  }, [contato]);

  useEffect(() => {
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

  return (
    <React.Fragment>
      <div id="frmchat" name="frmchat" style={{ marginLeft: '10px' }}>
        <Row>
          <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
          <Row style={{ marginBottom: '8px' }}>
            <Col lg={4}>
              <Row style={{ marginTop: '10px' }}>
                <AGGrid
                  width="100%"
                  height="605px"
                  rows={contatos}
                  rowHeight={102}
                  loading={carregando}
                  columns={columns}
                  item={itemselec}
                  setItem={(data) => setItemselec(data)}
                  onKeyDown={keyGrid}
                  onDoubleClick={dblClickGrid}
                ></AGGrid>
              </Row>
            </Col>
            <Col lg={8} className="main-friend-cont scroll-div">
              <Row style={{ marginTop: '12px' }}>
                <Card style={{ marginBottom: '5px' }}>
                  <Card.Header style={{ marginLeft: '-30px' }}>
                    <Row>
                      <Col lg={1}>
                        <img
                          className="media-object img-radius img-radius m-t-5"
                          src={contato.nome !== undefined ? `${photo}` : interrogacao}
                          alt={'foto'}
                          width="70"
                          height="70"
                          style={{ marginLeft: '15px' }}
                        />
                      </Col>
                      <Col lg={9}>
                        <Row style={{ textAlign: 'left', marginTop: '15px', marginLeft: '18px' }}>
                          <h6 style={{ fontSize: '14px' }}>{contato.nome !== undefined ? contato.nome : 'Contato não selecionado'}</h6>
                          <h6 style={{ fontSize: '10px' }}>{contato.nome !== undefined ? contato.cliente : 'Contato não selecionado'}</h6>
                          <h6 style={{ fontSize: '10px' }}>{contato.nome !== undefined ? contato.cargo : 'Contato não selecionado'}</h6>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Header>
                  <div className="h-list-body">
                    <div className="main-friend-cont scroll-div">
                      <Row
                        className="main-friend-list"
                        style={{ marginLeft: '2px', marginRight: '2px', marginTop: '10px', marginBottom: '10px', height: '458px' }}
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
                </Card>
              </Row>
            </Col>
          </Row>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default InforChat;
