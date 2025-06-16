import React, { useEffect } from 'react';
import { Row, Card, Col, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList } from '../../../../../api/crudapi';
import { CreateObject } from '../../../../../components/CreateObject';
import AGGrid from '../../../../../components/AGGrid';
import GmoRequisicao from '../requisicao';
import GmoRetirada from '../retirada';

const GmoTransito = (props) => {
  const { precontrato, produto, codsite } = props;
  const { showtran, setShowtran } = props;
  const [itemselec, setItemselec] = React.useState([]);
  const [itemselec2, setItemselec2] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [rows2, setRows2] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [columns2, setColumns2] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [showreq, setShowreq] = React.useState(false);
  const [showret, setShowret] = React.useState(false);
  const { operacao, setOperacao } = props;

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'numreq', headerName: 'Req.', width: 80 },
      { headerClassName: 'header-list', field: 'dtreq', headerName: 'Data', width: 110, type: 'date' },
      { headerClassName: 'header-list', field: 'codop', headerName: 'Op.', width: 50 },
      { headerClassName: 'header-list', field: 'nomeop', headerName: 'Descrição Operação', width: 210 },
      { headerClassName: 'header-list', field: 'codstatus', headerName: 'St.', width: 50 },
      { headerClassName: 'header-list', field: 'nomestatus', headerName: 'Status Atual', width: 215 },
      { headerClassName: 'header-list', field: 'nometipo', headerName: 'Tipo', width: 95 },
      { headerClassName: 'header-list', field: 'qtprod', headerName: 'Quant.', width: 80, type: 'number' },
      { headerClassName: 'header-list', field: 'prunit', headerName: 'Valor UN.', width: 100, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'totvalor', headerName: 'Valor Total', width: 100, type: 'number', decimal: 2 }
    ]);
    setColumns2([
      { headerClassName: 'header-list', field: 'data', headerName: 'Data', width: 170 },
      { headerClassName: 'header-list', field: 'user', headerName: 'Usuário', width: 175 },
      { headerClassName: 'header-list', field: 'status', headerName: 'Status', width: 60 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição Status', width: 680 }
    ]);
    setFields([
      {
        id: 0,
        campo: 'OBS',
        funcao: 'Observaçõoes',
        tipo: 'varchar',
        nome: 'obs',
        tamanho: 8000,
        tipoobject: 6,
        widthfield: 48,
        measure: '48rem',
        charnormal: true,
        lines: 3,
        disabled: true
      }
    ]);
    setCarregando(true);
    let entsai = 0;
    if (operacao === 'R') {
      entsai = 1;
    }
    apiList(
      'GmoTransitoVW',
      '*',
      '',
      "PRECONTRATO = '" + precontrato + "' AND PRODUTO = '" + produto + "' AND CODSITE = '" + codsite + "' and ENTSAI = " + entsai
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
      }
    });
  }, []);

  useEffect(() => {
    if (itemselec !== undefined) {
      let tipo = 'V';
      if (operacao === 'R') {
        tipo = 'C';
      }
      apiList(
        'Historico',
        '*',
        '',
        "TB02130_CODIGO = '" + itemselec.numreq + "' and TB02130_TIPO = '" + tipo + "' ORDER BY TB02130_DATA DESC "
      ).then((response) => {
        if (response.status === 200) {
          setRows2(response.data);
          try {
            valuesfield[0] = response.data[0].obs;
            setValuesfield([...valuesfield]);
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  }, [itemselec]);

  useEffect(() => {
    if (itemselec2 !== undefined) {
      valuesfield[0] = itemselec2.obs;
      setValuesfield([...valuesfield]);
    }
  }, [itemselec2]);

  const handleClosereq = () => {
    setShowreq(false);
  };

  const handleCloseret = () => {
    setShowret(false);
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    if (operacao !== 'R') {
      setShowreq(true);
    } else {
      setShowret(true);
    }
  };

  return (
    <React.Fragment>
      <div id="frmlistreq" name="frmlistreq">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '10px', marginTop: '-12px' }}>
          <Card.Header>
            <Card.Title style={{ marginBottom: '10px' }} as="h5">
              Listagem de Requisições em Trânsito
            </Card.Title>
          </Card.Header>
          <Row style={{ marginTop: '10px' }}>
            <AGGrid
              width="100%"
              height="263px"
              rows={rows}
              columns={columns}
              loading={carregando}
              item={itemselec}
              setItem={(data) => setItemselec(data)}
              onDoubleClick={dblClickGrid}
            ></AGGrid>
          </Row>
        </Card>

        <Row style={{ marginTop: '10px' }}>
          <AGGrid
            width="100%"
            height="223px"
            rows={rows2}
            columns={columns2}
            loading={carregando}
            item={itemselec2}
            setItem={(data) => setItemselec2(data)}
          ></AGGrid>
        </Row>
        <Row style={{ marginTop: '10px', marginLeft: '5px', marginRight: '5px', marginBottom: '10px' }}>
          {fields.map((field, index) => (
            <CreateObject
              key={index}
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
        </Row>

        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            {rows !== undefined && rows.length > 0 ? (
              <Button id="btnVisualizar" className="btn btn-success shadow-2 mb-2" onClick={(e) => setShowreq(true)}>
                <i className={'feather icon-eye'} /> Visualizar
              </Button>
            ) : (
              <></>
            )}
            <Button id="btnFechar" className="btn btn-warning shadow-2 mb-2" onClick={(e) => setShowtran(false)}>
              <i className={'feather icon-x'} /> Fechar
            </Button>
          </Col>
        </Row>
      </div>
      <Modal backdrop="static" size="xl" show={showreq} centered={true} onHide={handleClosereq}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-box'} />
          &nbsp;Requisição : {itemselec !== undefined ? itemselec.numreq : ''}
        </Modal.Header>
        <ModalBody>
          {itemselec !== undefined ? (
            <GmoRequisicao itemselec={itemselec} setItemselec={(data) => setItemselec(data)} tipoop={itemselec.tipo}></GmoRequisicao>
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
            <GmoRetirada itemselec={itemselec} setItemselec={(data) => setItemselec(data)} tipoop={itemselec.tipo}></GmoRetirada>
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
    </React.Fragment>
  );
};

export default GmoTransito;
