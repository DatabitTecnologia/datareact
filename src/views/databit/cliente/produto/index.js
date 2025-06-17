import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalBody, Alert, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiDelete, apiList, apiGetPicture } from '../../../../api/crudapi';
import { Confirmation } from '../../../../components/Confirmation';
import AGGrid from '../../../../components/AGGrid';
import nopicture from '../../../../assets/images/databit/nopicture.png';
import { CreateObject } from '../../../../components/CreateObject';
import ClienteProdutoSelec from './select';

const ClienteProduto = (props) => {
  const { cliente } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [itemselec, setItemselec] = React.useState([]);
  const [foto, setFoto] = React.useState();
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
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
        widthfield: 15,
        measure: '15rem',
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
        widthfield: 15,
        measure: '15rem',
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
        widthfield: 15,
        measure: '15rem',
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
        widthfield: 51,
        measure: '51rem',
        disabled: true
      },
      {
        id: 5,
        campo: 'nomeproduto',
        funcao: 'Marca',
        tipo: 'varchar',
        nome: 'marca',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 21,
        measure: '21rem',
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
      }
    ]);
    setColumns([
      { headerClassName: 'header-list', field: 'produto', headerName: 'Código', width: 106 },
      { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 106 },
      { headerClassName: 'header-list', field: 'nomeproduto', headerName: 'Descrição do Produto', width: 495 },
      { headerClassName: 'header-list', field: 'prunit', headerName: 'Preço Unitário', width: 145, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'prazo', headerName: 'Entrega', width: 100, type: 'number' },
      { headerClassName: 'header-list', field: 'datafim', headerName: 'Validade', width: 100 }
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
        setValuesfield([...valuesfield]);
      });
    }
  }, [itemselec]);

  useEffect(() => {
    if (!showselec) {
      Filtrar();
    }
  }, [showselec]);

  const Filtrar = () => {
    setCarregando(true);
    apiList('ClienteProdutoVW', '*', '', "codcli = '" + cliente + "'").then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
      }
    });
  };

  const ExcluirProduto = () => {
    console.log(valuesfield[0]);
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      Confirmation('frmclienteproduto', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          apiDelete('ClienteProduto', itemselec).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                setItemselec(undefined);
                setFoto(undefined);
                valuesfield[0] = '';
                valuesfield[1] = '';
                valuesfield[2] = '';
                valuesfield[3] = '';
                valuesfield[4] = '';
                valuesfield[5] = '';
                valuesfield[6] = '';
                valuesfield[7] = '';
                valuesfield[8] = '';
                setValuesfield([...valuesfield]);
                Filtrar();
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          });
        }
      });
    } else {
      setItemvariant(1);
      setMensagem('Não possui nenhum registro para ser excluído !');
    }
  };

  const handleCloseselec = () => {
    setShowselec(false);
  };

  const IncluirProduto = () => {
    setItemselec(undefined);
    setShowselec(true);
  };

  const clickGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setShowselec(true);
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setItemselec(newSelection);
      setShowselec(true);
    }
    if (event.key === 'Delete') {
      setItemselec(newSelection);
      ExcluirProduto();
    }
  };

  return (
    <React.Fragment>
      <div id="frmclienteproduto" name="frmclienteproduto">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px', marginTop: '-15px' }}>
            <Card.Header>
              <Card.Title as="h5">Produtos Comercializados</Card.Title>
            </Card.Header>
            <Row>
              <Col>
                <Row style={{ height: '20px', marginTop: '5px', marginBottom: '5px' }}>
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
                <Row style={{ height: '20px', marginTop: '5px', marginBottom: '5px' }}>
                  <Col lg={1}>
                    <div style={{ height: '25px', width: '25px', backgroundColor: '#66ff99', border: 'solid', borderWidth: '2px' }}></div>
                  </Col>
                  <Col lg={11}>
                    <p style={{ marginTop: '4px', marginLeft: '10px' }} className="text-muted">
                      Produto Suspenso
                    </p>
                  </Col>
                </Row>
                =
              </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
              <AGGrid
                width="100%"
                height="260px"
                rows={rows}
                columns={columns}
                loading={carregando}
                item={itemselec}
                setItem={(data) => setItemselec(data)}
                onKeyDown={keyGrid}
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
            <Row style={{ marginTop: '5px' }}>
              <Col lg={2}>
                <Row style={{ width: '100%', textAlign: 'center' }}>
                  <Col>
                    {foto === undefined || foto === '' || foto === null ? (
                      <img src={nopicture} alt="foto" width={'230px'} height={'230px'} />
                    ) : (
                      <img src={`data:image/jpeg;base64,${foto}`} alt="foto" width={'230px'} height={'230px'} />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row style={{ marginLeft: '65px', marginRight: '5px', marginBottom: '3px' }}>
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
        <hr></hr>
        <Row>
          <Alert
            show={mensagem !== '' && mensagem !== undefined}
            dismissible
            variant={alertVariants[itemvariant]}
            onClick={() => setMensagem(undefined)}
          >
            {mensagem}
          </Alert>
        </Row>
        <Row style={{ textAlign: 'right', marginTop: '10px' }}>
          <Col>
            <Button id="btnNovoprod" className="btn" onClick={(e) => IncluirProduto()}>
              <i className={'feather icon-star'} /> Incluir
            </Button>
            <Button id="btnDelprod" className="btn-success" onClick={(e) => ExcluirProduto()}>
              <i className={'feather icon-trash'} /> Excluir
            </Button>
          </Col>
        </Row>
        <Modal backdrop="static" id="frmbrowse" size="xl" show={showselec} centered={true} onHide={handleCloseselec}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-box'} />
            &nbsp;Lançamento de Itens
          </Modal.Header>
          <ModalBody>
            <ClienteProdutoSelec
              itemselec={itemselec}
              showselec={showselec}
              codcli={cliente}
              setShowselec={(data) => setShowselec(data)}
            ></ClienteProdutoSelec>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ClienteProduto;
