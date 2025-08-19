import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList } from '../../../../../api/crudapi';
import AGGrid from '../../../../../components/AGGrid';
import aprovado from '../../../../../assets/images/databit/aprovado.png';
import requisicao from '../../../../../assets/images/databit/requisicao.png';
import os from '../../../../../assets/images/databit/os.png';
import equipamento from '../../../../../assets/images/databit/equipamento.png';
import GmoOs from '../os';
import GmoRequisicao from '../requisicao';
import GmoSite from '../site';
import GmoRetirada from '../retirada';

const GmoEquipamento = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const { item, somentepre } = props;
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [validations, setValidations] = React.useState([]);
  const [totais, setTotais] = React.useState([]);
  const { showparque, setShowparque } = props;
  const [showos, setShowos] = React.useState(false);
  const [showreq, setShowreq] = React.useState(false);
  const [showret, setShowret] = React.useState(false);
  const [showsite, setShowsite] = React.useState(false);
  const [itemselec, setItemselec] = React.useState([]);
  const { operacao, setOperacao } = props;

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'numserie', headerName: 'Serial', width: 166 },
      { headerClassName: 'header-list', field: 'pat', headerName: 'PAT', width: 106 },
      { headerClassName: 'header-list', field: 'ultpb', headerName: 'Medidor PB', width: 115, type: 'number' },
      { headerClassName: 'header-list', field: 'ultcor', headerName: 'Medidor COR', width: 115, type: 'number' },
      { headerClassName: 'header-list', field: 'site', headerName: 'Site', width: 339 },
      { headerClassName: 'header-list', field: 'cidade', headerName: 'Cidade', width: 179 },
      { headerClassName: 'header-list', field: 'uf', headerName: 'UF', width: 70 },
      { headerClassName: 'header-list', field: 'cep', headerName: 'Cep', width: 100 },
      { headerClassName: 'header-list', field: 'depto', headerName: 'Departamento', width: 199 },
      { headerClassName: 'header-list', field: 'numreq', headerName: 'Requisição', width: 95 },
      { headerClassName: 'header-list', field: 'dtentrega', headerName: 'Entrega', width: 110, type: 'date' },
      { headerClassName: 'header-list', field: 'numos', headerName: 'OS', width: 76 },
      { headerClassName: 'header-list', field: 'concos', headerName: 'Conclusão', width: 106 },
      { headerClassName: 'header-list', field: 'pre', headerName: 'Pré', width: 90 }
    ]);

    setTotais([
      {
        id: 0,
        name: 'Total de Equipamentos',
        value: 0,
        color: 'rgb(51, 153, 255)',
        background: `linear-gradient(rgba(51, 153, 255), transparent)`,
        colortitle: '#ffff',
        icon: equipamento
      },

      {
        id: 1,
        name: 'Total de Requisições',
        value: 0,
        color: 'rgb(0, 102, 153)',
        background: `linear-gradient(rgba(0, 102, 153), transparent)`,
        colortitle: '#ffff',
        icon: requisicao
      },
      {
        id: 2,
        name: 'Requisições Concluídas',
        value: 0,
        color: 'rgb(51, 204, 255)',
        background: `linear-gradient(rgba(51, 204, 255), transparent)`,
        colortitle: '#ffff',
        icon: aprovado
      },
      {
        id: 3,
        name: 'Total Ordens de Serviço',
        value: 0,
        color: 'rgb(0, 204, 0)',
        background: `linear-gradient( rgba(0, 204, 0), transparent)`,
        colortitle: '#ffff',
        icon: os
      },
      {
        id: 4,
        name: 'Ordens de Serviço Concluídas',
        value: 0,
        color: 'rgb(210, 210, 0)',
        background: `linear-gradient(rgba(210, 210, 0), transparent)`,
        colortitle: '#ffff',
        icon: aprovado
      }
    ]);
    setCarregando(true);
    let filter = "CONTRATO = '" + item.contrato + "' and EQUIP = '" + item.produto + "' ";
    if (parseInt(somentepre) === 0) {
      filter = filter + " AND PRE = '" + item.precontrato + "' ";
    } else if (parseInt(somentepre) === 1) {
      filter = filter + " AND PRE = '" + item.precontrato + "' and CODSITE = '" + item.codsite + "' ";
    }
    apiList(
      'GmoItemVW',
      'CONTRATO,NUMSERIE,PAT,EQUIP,REFERENCIA,NOME,ULTPB,ULTCOR,SITE,NUMOS,CONCOS,NUMREQ,DTENTREGA,CIDADE,UF,CEP,DEPTO,PRE,CODSITE',
      'case when CONCOS is null and DTENTREGA is null then 0 ' +
        '     when CONCOS is not null and DTENTREGA is null then 1 ' +
        '     when CONCOS is null and DTENTREGA is not null then 2 ' +
        '     when CONCOS is not null and DTENTREGA is not null then 3 ' +
        'end as status',
      filter
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
      }
    });

    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['status', 'status', 'status', 'status'];
    validation['sinal'] = [1, 1, 1, 1];
    validation['tipotab'] = 'G';
    validation['valorval'] = [0, 1, 2, 3];
    validation['cor'] = ['#ffff', '#66ccff', '#ffff99', '#66ffff'];
    validation['total'] = 4;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);
  }, []);

  useEffect(() => {
    if (totais !== undefined && totais.length > 0) {
      totais[0].value = 0;
      totais[1].value = 0;
      totais[2].value = 0;
      totais[3].value = 0;
      totais[4].value = 0;
      setTotais([...totais]);
    }
    if (rows !== undefined && rows.length > 0) {
      rows.forEach((element) => {
        totais[0].value += 1;
        if (element.numos !== undefined && element.numos !== null && element.numos !== '') {
          totais[3].value += 1;
          if (element.concos !== undefined && element.concos !== null && element.concos !== '') {
            totais[4].value += 1;
          }
        }
        if (element.numreq !== undefined && element.numreq !== null && element.numreq !== '') {
          totais[1].value += 1;
          if (element.dtentrega !== undefined && element.dtentrega !== null && element.dtentrega !== '') {
            totais[2].value += 1;
          }
        }
      });
      setTotais([...totais]);
    }
  }, [rows]);

  const Fechar = () => {
    setShowparque(false);
  };
  const handleCloseos = () => {
    setShowos(false);
  };

  const handleClosereq = () => {
    setShowreq(false);
  };

  const handleCloseret = () => {
    setShowret(false);
  };

  const handleClosesite = () => {
    setShowsite(false);
  };

  const Requisicao = () => {
    if (operacao !== 'D') {
      setShowreq(true);
    } else {
      setShowret(true);
    }
  };

  return (
    <React.Fragment>
      <div id="frmgmoequip" name="frmgmoequip">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col>
            <Card style={{ marginBottom: '0px' }} className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Apuração de Equipamentos</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '10px', marginRight: '10px', height: '35px' }}>
                <Col style={{ marginTop: '10px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#fff', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Os e Requisição pendente
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: '10px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#66ccff', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        OS Concluída
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: '10px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#ffff99', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Requisição Concluída
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: '10px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#66ffff', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        OS e Requisição Concluídas
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <AGGrid
                  width="100%"
                  height="460px"
                  rows={rows}
                  columns={columns}
                  loading={carregando}
                  validations={validations}
                  item={itemselec}
                  setItem={(data) => setItemselec(data)}
                ></AGGrid>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row style={{ marginTop: '5px' }}>
              <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
                <Row>
                  {totais.map((data, index) => {
                    return (
                      <Col key={index}>
                        <Card
                          style={{
                            backgroundColor: data.color,
                            height: '142px',
                            marginBottom: '2px'
                          }}
                          key={index}
                        >
                          <Card.Body key={index}>
                            <Row key={index}>
                              <Col key={index} md={2} xl={3}>
                                <img src={data.icon} alt={data.icon}></img>
                              </Col>
                              <Col key={index} md={1} xl={7}>
                                <h5 style={{ color: data.colortitle }}>{data.name}</h5>
                              </Col>
                            </Row>
                            <h3 key={index} className="mb-1 f-w-300" style={{ textAlign: 'right', color: data.colortitle }}>
                              {data.value}
                            </h3>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Card>
            </Row>
          </Col>
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'right' }}>
          <Col>
            <Row style={{ textAlign: 'right' }}>
              <Col>
                <Button id="btnOS" className="btn btn-primary shadow-2 mb-2" onClick={() => setShowos(true)}>
                  <i className={'feather icon-airplay'} />
                  Ordem Serviço
                </Button>
                <Button id="btnReq" className="btn btn-primary shadow-2 mb-2" onClick={() => Requisicao()}>
                  <i className={'feather icon-box'} />
                  Requisição
                </Button>
                <Button id="btnSite" className="btn btn-primary shadow-2 mb-2" onClick={() => setShowsite(true)}>
                  <i className={'feather icon-map-pin'} />
                  Site
                </Button>
                <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={() => Fechar()}>
                  <i className={'feather icon-x-circle'} />
                  Fechar
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal backdrop="static" size="xl" show={showos} centered={true} onHide={handleCloseos}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-airplay'} />
            &nbsp;Ordem de Serviço : {itemselec !== undefined ? itemselec.numos : ''}
          </Modal.Header>
          <ModalBody>
            {itemselec !== undefined ? <GmoOs itemselec={itemselec} setItemselec={(data) => setItemselec(data)}></GmoOs> : <></>}
          </ModalBody>
          <ModalFooter>
            <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleCloseos}>
              <i className={'feather icon-x-circle'} />
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
        <Modal backdrop="static" size="xl" show={showreq} centered={true} onHide={handleClosereq}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-box'} />
            &nbsp;Requisição : {itemselec !== undefined ? itemselec.numreq : ''}
          </Modal.Header>
          <ModalBody>
            {itemselec !== undefined ? (
              <GmoRequisicao itemselec={itemselec} setItemselec={(data) => setItemselec(data)} tipoop={2}></GmoRequisicao>
            ) : (
              <></>
            )}
          </ModalBody>
          <ModalFooter>
            <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleClosereq}>
              <i className={'feather icon-x-circle'} />
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
        <Modal backdrop="static" size="xl" show={showret} centered={true} onHide={handleCloseret}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-box'} />
            &nbsp;Retirada : {itemselec !== undefined ? itemselec.numreq : ''}
          </Modal.Header>
          <ModalBody>
            {itemselec !== undefined ? (
              <GmoRetirada itemselec={itemselec} setItemselec={(data) => setItemselec(data)} tipoop={2}></GmoRetirada>
            ) : (
              <></>
            )}
          </ModalBody>
          <ModalFooter>
            <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleCloseret}>
              <i className={'feather icon-x-circle'} />
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
        <Modal backdrop="static" size="xl" show={showsite} centered={true} onHide={handleClosesite}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-map-pin'} />
            &nbsp;Site : {itemselec !== undefined ? itemselec.site : ''}
          </Modal.Header>
          <ModalBody>
            {itemselec !== undefined ? <GmoSite itemselec={itemselec} setItemselec={(data) => setItemselec(data)}></GmoSite> : <></>}
          </ModalBody>
          <ModalFooter>
            <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleClosesite}>
              <i className={'feather icon-x-circle'} />
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default GmoEquipamento;
