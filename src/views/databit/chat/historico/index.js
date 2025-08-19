import React, { createRef, useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Messages from '../messages';
import { apiList } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';
import { CreateObject } from '../../../../components/CreateObject';
import jpg from '../../../../assets/images/databit/jpg.png';
import pdf from '../../../../assets/images/databit/pdf.png';
import doc from '../../../../assets/images/databit/doc.png';
import xls from '../../../../assets/images/databit/xls.png';
import mp3 from '../../../../assets/images/databit/mp3.png';
import avi from '../../../../assets/images/databit/avi.png';
import all from '../../../../assets/images/databit/all.png';
import ViewerDoc from '../../documento/viewer';
import { base64toBlob } from '../../../../utils/crypto';
import { apiGetFile } from '../../../../api/crudapi';

const ChatHistorico = (props) => {
  const { contato, photo } = props;
  const formRef = createRef();
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [columns2, setColumns2] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [scrollEl, setScrollEl] = React.useState();
  const [rowschat, setRowschat] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [itemselec, setItemselec] = React.useState();
  const [url, setUrl] = React.useState();
  const [ext, setExt] = React.useState();
  const [arq64, setArq64] = React.useState();
  const [itemchat, setItemchat] = React.useState();
  const [showviewer, setShowviewer] = React.useState(false);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'idchat', headerName: 'ID', width: 66 },
      { headerClassName: 'header-list', field: 'data', headerName: 'Data', width: 167, type: 'dateTime' },
      { headerClassName: 'header-list', field: 'atendente', headerName: 'Atendente', width: 200 }
    ]);

    setFields([
      {
        id: 0,
        campo: 'TB08024_CONVERSA',
        funcao: 'Digite as iniciais da conversa',
        tipo: 'varchar',
        nome: 'conversa',
        tipoobject: 1,
        tamanho: 100,
        widthfield: 22,
        measure: '22rem',
        disabled: false,
        charnormal: true
      },
      {
        id: 1,
        campo: 'TB08024_VISUALIZA',
        funcao: 'Visualização',
        tipo: 'varchar',
        nome: 'visualiza',
        tamanho: 1,
        tipoobject: 10,
        widthfield: 33,
        measure: '33rem',
        itens: 'Via Chat,Via Listagem',
        values: '0,1',
        disabled: false
      }
    ]);
    Filtrar();
  }, []);

  const Filtrar = () => {
    setCarregando(true);
    let filter = " CONTATO = '" + contato.codigo + "' AND (RECEBIDO + ENVIADO) > 0 ";
    if (valuesfield[0] !== undefined && valuesfield[0] !== '') {
      filter =
        filter +
        " AND EXISTS (SELECT TB08026_ID FROM TB08026 WHERE TB08026_CHATVINCULADO = IDCHAT AND CAST(TB08026_OBS AS VARCHAR(8000)) LIKE '" +
        valuesfield[0] +
        "%' )";
    }
    filter = filter + ' ORDER BY DATA DESC ';

    apiList('DatawhatsChatVW', '*', 'IDCHAT AS idchat', filter).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
      }
    });
  };

  useEffect(() => {
    if (valuesfield[1] === undefined) {
      valuesfield[1] = '0';
      setValuesfield([...valuesfield]);
    }
    if (rows !== undefined && rows.length > 0) {
      setItemselec(rows[0]);
    }
  }, [rows]);

  useEffect(() => {
    if (itemselec !== undefined) {
      let filter = "CHATVINCULADO = '" + itemselec.idchat + "' ";
      if (valuesfield[0] !== undefined && valuesfield[0] !== '') {
        filter = filter + " AND CAST(MSG AS VARCHAR(8000)) LIKE '" + valuesfield[0] + "%' ";
      }
      filter = filter + ' ORDER BY TIME,IDCHAT ';
      apiList('DatawhatsTalkVW', '*', '', filter).then((response) => {
        if (response.status === 200) {
          setRowschat(response.data);
        }
      });
    }
  }, [itemselec]);

  useEffect(() => {
    if (itemchat !== undefined) {
      console.log(itemchat);
      apiGetFile('TB08026', 'TB08026_ID', 'TB08026_FILE', itemchat.idchat).then((response) => {
        setArq64(response.data[0].arq);
        const s64 = base64toBlob(response.data[0].arq, itemchat.ext);
        const url = URL.createObjectURL(s64);
        console.log(url);
        setUrl(url);
        setExt(itemchat.ext);
        if (itemchat.ext === 'ogg') {
          setExt('mp3');
        }
      });
    }
  }, [itemchat]);

  useEffect(() => {
    setColumns2([
      { headerClassName: 'header-list', field: 'idchat', headerName: 'ID', width: 56 },
      { headerClassName: 'header-list', field: 'time', headerName: 'Data', width: 177 },
      { headerClassName: 'header-list', field: 'tipoatende', headerName: 'Origem', width: 150 },
      { headerClassName: 'header-list', field: 'nometipo', headerName: 'Tipo Mensagem', width: 150 },
      {
        headerClassName: 'header-list',
        field: 'msg',
        headerName: 'Mensagem',
        width: 750,
        type: 'text'
      },
      {
        headerClassName: 'header-list',
        field: 'tipoarq',
        headerName: 'Arquivo',
        width: 90,
        renderCell: (params) => {
          switch (params.data.tipoarq) {
            case -1: {
              return <></>;
            }
            case 0: {
              return <img src={pdf} alt={'pdf'} onDoubleClick={(e) => SelectFile()} />;
            }
            case 1: {
              return <img src={jpg} alt={'jpg'} onDoubleClick={(e) => SelectFile()} />;
            }
            case 2: {
              return <img src={mp3} alt={'mp3'} onDoubleClick={(e) => SelectFile()} />;
            }
            case 3: {
              return <img src={xls} alt={'xls'} onDoubleClick={(e) => SelectFile()} />;
            }
            case 4: {
              return <img src={doc} alt={'doc'} onDoubleClick={(e) => SelectFile()} />;
            }
            case 5: {
              return <img src={avi} alt={'avi'} onDoubleClick={(e) => SelectFile()} />;
            }
            case 6: {
              return <img src={all} alt={'all'} onDoubleClick={(e) => SelectFile()} />;
            }
          }
        }
      }
    ]);
  }, [valuesfield[1]]);

  const Download = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SelectFile = () => {
    setShowviewer(true);
  };

  const handleCloseviewer = () => {
    setShowviewer(false);
  };

  return (
    <React.Fragment>
      <div id="historico" name="historico">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col lg={3} style={{ marginLeft: '5px' }}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Histórico de Conversas</Card.Title>
              </Card.Header>
              <div>
                <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                  <Col lg={9}>
                    {fields.map((field, index) => (
                      <CreateObject
                        key={field.id}
                        field={field}
                        index={field.id}
                        fields={fields}
                        valuesfield={valuesfield}
                        setValuesfield={(data) => setValuesfield(data)}
                        valuesfield2={valuesfield2}
                        setValuesfield2={(data) => setValuesfield2(data)}
                        disabled={false}
                      ></CreateObject>
                    ))}
                  </Col>
                  <Col>
                    <Button
                      style={{ marginTop: '28px', marginLeft: '29px' }}
                      variant="link"
                      className="btn-primary btn-icon btn-msg-send"
                      onClick={(e) => Filtrar()}
                    >
                      <i className="feather icon-filter" />
                    </Button>
                  </Col>
                </Row>
              </div>
              <Row style={{ marginTop: '1px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <AGGrid
                    width="100%"
                    height="450px"
                    rows={rows}
                    item={itemselec}
                    setItem={(data) => setItemselec(data)}
                    columns={columns}
                    loading={carregando}
                  ></AGGrid>
                </div>
              </Row>
            </Card>
          </Col>
          <Col>
            <Row>
              <Card style={{ marginBottom: '5px' }}>
                <Card.Header style={{ marginLeft: '-30px' }}>
                  <Row>
                    <Col lg={1}>
                      <img
                        className="media-object img-radius img-radius m-t-5"
                        src={contato.nome !== undefined ? `${photo}` : interrogacao}
                        alt={'foto'}
                        width="90"
                        height="90"
                        style={{ marginLeft: '13px' }}
                      />
                    </Col>
                    <Col lg={11}>
                      <Row style={{ textAlign: 'left', marginTop: '15px', marginLeft: '2px' }}>
                        <h6 style={{ fontSize: '16px' }}>{contato.nome !== undefined ? contato.nome : 'Contato não selecionado'}</h6>
                        <h6 style={{ fontSize: '11px' }}>{contato.nome !== undefined ? contato.cliente : 'Contato não selecionado'}</h6>
                        <h6 style={{ fontSize: '11px' }}>{contato.nome !== undefined ? contato.cargo : 'Contato não selecionado'}</h6>
                      </Row>
                    </Col>
                  </Row>
                </Card.Header>
                {parseInt(valuesfield[1]) === 0 ? (
                  <div className="h-list-body">
                    <div className="main-friend-cont scroll-div">
                      <Row
                        className="main-friend-list"
                        style={{ marginLeft: '2px', marginRight: '2px', marginTop: '10px', marginBottom: '10px', height: '520px' }}
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
                ) : (
                  <Row style={{ marginTop: '1px' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <AGGrid
                        width="100%"
                        height="532px"
                        rowHeight={75}
                        rows={rowschat}
                        item={itemchat}
                        setItem={(data) => setItemchat(data)}
                        columns={columns2}
                        loading={carregando}
                      ></AGGrid>
                    </div>
                  </Row>
                )}
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
      <Modal backdrop="static" fullscreen={true} show={showviewer} centered={true} onHide={handleCloseviewer}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-see h1'} />
          &nbsp;Visualizar Documento
        </Modal.Header>
        <Modal.Body>
          <ViewerDoc url={url} ext={ext}></ViewerDoc>
        </Modal.Body>
        <Modal.Footer>
          <Button id="btnDownload" className="btn btn-success shadow-2 mb-2" onClick={(e) => Download(url, 'Download.' + itemchat.ext)}>
            <i className={'feather icon-download'} /> Download
          </Button>
          <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleCloseviewer}>
            <i className={'feather icon-x-circle'} /> Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ChatHistorico;
