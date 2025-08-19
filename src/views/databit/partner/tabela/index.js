import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalBody, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import AGGrid from '../../../../components/AGGrid';
import { CreateObject } from '../../../../components/CreateObject';
import nopicture from '../../../../assets/images/databit/nopicture.png';
import ClienteProdutoSelec from '../../cliente/produto/select';
import { apiList, apiGetPicture } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';

const PartnerTabela = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [itemselec, setItemselec] = React.useState([]);
  const [foto, setFoto] = React.useState();
  const [fields, setFields] = React.useState([]);
  const [fieldsfilter, setFieldsfilter] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [showselec, setShowselec] = React.useState(false);
  const [validations, setValidations] = React.useState([]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'produto',
        funcao: 'Código',
        tipo: 'varchar',
        nome: 'produto',
        tamanho: 5,
        tipoobject: 1,
        widthfield: 6,
        measure: '6rem',
        disabled: true
      },
      {
        id: 1,
        campo: 'referencia',
        funcao: 'Referência',
        tipo: 'varchar',
        nome: 'referencia',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 13,
        measure: '13rem',
        disabled: true
      },
      {
        id: 2,
        campo: 'codbarras',
        funcao: 'Código Barras',
        tipo: 'varchar',
        nome: 'codbarras',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 13,
        measure: '13rem',
        disabled: true
      },
      {
        id: 3,
        campo: 'codauxiliar',
        funcao: 'Código Auxiliar',
        tipo: 'varchar',
        nome: 'codauxiliar',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 13,
        measure: '13rem',
        disabled: true
      },
      {
        id: 5,
        campo: 'marca',
        funcao: 'Marca',
        tipo: 'varchar',
        nome: 'marca',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 30,
        measure: '30rem',
        disabled: true
      },
      {
        id: 4,
        campo: 'nomeproduto',
        funcao: 'Descrição Produto',
        tipo: 'varchar',
        nome: 'nomeproduto',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 45,
        measure: '45rem',
        disabled: true
      },

      {
        id: 6,
        campo: 'prunit',
        funcao: 'Preço Unitário',
        tipo: 'varchar',
        nome: 'marca',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: true,
        decimal: 2
      },
      {
        id: 7,
        campo: 'prazo',
        funcao: 'Entrega (Dias)',
        tipo: 'varchar',
        nome: 'prazo',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 10,
        measure: '10rem',
        disabled: true
      },
      {
        id: 8,
        campo: 'datafim',
        funcao: 'Data Validade',
        tipo: 'varchar',
        nome: 'datafim',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 10,
        measure: '10rem',
        disabled: true
      },
      {
        id: 9,
        campo: 'nomegrupo',
        funcao: 'Grupo',
        tipo: 'varchar',
        nome: 'nomegrupo',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 38,
        measure: '38rem',
        disabled: true
      },
      {
        id: 10,
        campo: 'nomegrupo',
        funcao: 'Sub-Grupo',
        tipo: 'varchar',
        nome: 'nomesubgrupo',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 37,
        measure: '37rem',
        disabled: true
      }
    ]);

    setFieldsfilter([
      {
        id: 11,
        campo: 'codcli',
        funcao: 'Parceiro',
        tipo: 'varchar',
        nome: 'codcli',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 42,
        measure: '42rem',
        tabelaref: 'TB01008',
        widthname: 33,
        disabled: false
      }
    ]);

    setColumns([
      { headerClassName: 'header-list', field: 'produto', headerName: 'Código', width: 106 },
      { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 126 },
      { headerClassName: 'header-list', field: 'codbarras', headerName: 'Cód. Barras', width: 126 },
      { headerClassName: 'header-list', field: 'codauxiliar', headerName: 'Cód. Auxiliar', width: 126 },
      { headerClassName: 'header-list', field: 'nomeproduto', headerName: 'Descrição do Produto', width: 595 },
      { headerClassName: 'header-list', field: 'prunit', headerName: 'Preço Unitário', width: 165, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'prazo', headerName: 'Entrega', width: 140, type: 'number' },
      { headerClassName: 'header-list', field: 'datafim', headerName: 'Validade', width: 140, type: 'date' }
    ]);

    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['situacao', 'situacao'];
    validation['sinal'] = [1, 1];
    validation['tipotab'] = 'G';
    validation['valorval'] = ['I', 'S'];
    validation['cor'] = ['#ffff99', '#66ff99'];
    validation['total'] = 2;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);
  }, []);

  useEffect(() => {
    if (parseInt(sessionStorage.getItem('perfil')) === 2) {
      valuesfield[11] = Decode64(sessionStorage.getItem('partner'));
    }
  }, [fields]);

  useEffect(() => {
    if (itemselec !== undefined) {
      apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', itemselec.produto).then((response) => {
        setFoto(response.data[0].picture);
        valuesfield[0] = itemselec.produto;
        valuesfield[1] = itemselec.referencia;
        valuesfield[2] = itemselec.codbarras;
        valuesfield[3] = itemselec.codauxiliar;
        valuesfield[4] = itemselec.nomeproduto;
        valuesfield[5] = itemselec.nomemarca;
        valuesfield[6] = itemselec.prunit;
        valuesfield[7] = itemselec.prazo;
        valuesfield[8] = itemselec.datafim;
        valuesfield[9] = itemselec.nomegrupo;
        valuesfield[10] = itemselec.nomesubgrupo;
        setValuesfield([...valuesfield]);
      });
    }
  }, [itemselec]);

  const Filtrar = () => {
    setCarregando(true);
    apiList('ClienteProdutoVW', '*', '', "codcli = '" + valuesfield[11] + "'").then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
      }
    });
  };

  useEffect(() => {
    if (!showselec && valuesfield[11] !== '' && valuesfield[11] !== undefined && valuesfield[11] !== null) {
      Filtrar();
    }
  }, [showselec]);

  const handleCloseselec = () => {
    setShowselec(false);
  };

  const clickGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setShowselec(true);
  };

  return (
    <React.Fragment>
      <div id="frmclienteproduto" name="frmclienteproduto">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Tabela de Preços</Card.Title>
            </Card.Header>
            <Row style={{ marginLeft: '5px' }}>
              <Col>
                <Row>
                  {fieldsfilter.map((field, index) => (
                    <CreateObject
                      key={index}
                      field={field}
                      index={field.id}
                      fields={fieldsfilter}
                      valuesfield={valuesfield}
                      setValuesfield={(data) => setValuesfield(data)}
                      valuesfield2={valuesfield2}
                      setValuesfield2={(data) => setValuesfield2(data)}
                      disabled={parseInt(sessionStorage.getItem('perfil')) === 2}
                    ></CreateObject>
                  ))}
                </Row>
              </Col>
              <Col>
                <Row style={{ height: '20px', marginTop: '40px' }}>
                  <Col lg={1}>
                    <div style={{ height: '25px', width: '25px', backgroundColor: '#ffff99', border: 'solid', borderWidth: '2px' }}></div>
                  </Col>
                  <Col lg={11}>
                    <p style={{ marginTop: '4px', marginLeft: '10px' }} className="text-muted">
                      Produto Inativo
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row style={{ height: '20px', marginTop: '40px' }}>
                  <Col lg={1}>
                    <div style={{ height: '25px', width: '25px', backgroundColor: '#66ff99', border: 'solid', borderWidth: '2px' }}></div>
                  </Col>
                  <Col lg={11}>
                    <p style={{ marginTop: '4px', marginLeft: '10px' }} className="text-muted">
                      Produto Suspenso
                    </p>
                  </Col>
                </Row>
              </Col>

              <Col style={{ textAlign: 'right', marginTop: '30px' }}>
                <Button id="btnFiltrar" className="btn btn-success shadow-2 mb-2" onClick={() => Filtrar()}>
                  <i className={'feather icon-filter'} /> Filtrar
                </Button>
              </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
              <AGGrid
                width="100%"
                height="280px"
                rows={rows}
                columns={columns}
                loading={carregando}
                item={itemselec}
                setItem={(data) => setItemselec(data)}
                onDoubleClick={dblClickGrid}
                onCelClick={clickGrid}
                validations={validations}
                focus={true}
              ></AGGrid>
            </Row>
          </Card>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Informações do Produto selecionado</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              <Col lg={1}>
                <Row style={{ width: '100%', marginRight: '20px' }}>
                  <Col>
                    {foto === undefined || foto === '' || foto === null ? (
                      <img src={nopicture} alt="foto" width={'250px'} height={'250px'} />
                    ) : (
                      <img src={`data:image/jpeg;base64,${foto}`} alt="foto" width={'250px'} height={'250px'} />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col lg={11}>
                <Row style={{ marginLeft: '180px', marginRight: '5px', marginBottom: '3px' }}>
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
                      disabled={true}
                    ></CreateObject>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
        </Row>
        <Modal backdrop="static" size="xl" show={showselec} centered={true} onHide={handleCloseselec}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-box'} />
            &nbsp;Lançamento de Itens
          </Modal.Header>
          <ModalBody>
            <ClienteProdutoSelec
              itemselec={itemselec}
              showselec={showselec}
              codcli={valuesfield[11]}
              setShowselec={(data) => setShowselec(data)}
            ></ClienteProdutoSelec>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default PartnerTabela;
