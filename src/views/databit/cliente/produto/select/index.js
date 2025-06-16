import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalFooter, ModalBody, Alert, Card, Form } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiFind, apiGetPicture, apiInsert, apiUpdate, apiSetPicture } from '../../../../../api/crudapi';
import { CreateObject } from '../../../../../components/CreateObject';
import nopicture from '../../../../../assets/images/databit/nopicture.png';
import { getBase64 } from '../../../../../utils/crypto';

const ClienteProdutoSelec = (props) => {
  const { itemselec, codcli } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [foto, setFoto] = React.useState();
  const [disabled, setDisabled] = React.useState(true);
  const [inclusao, setInclusao] = React.useState(false);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const { showselec, setShowselec } = props;
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [showfile, setShowfile] = useState(false);
  const [url, setUrl] = React.useState();
  const [img64, setImg64] = useState('');

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'produto',
        funcao: 'Produto',
        tipo: 'varchar',
        nome: 'produto',
        tamanho: 5,
        tipoobject: 2,
        widthfield: 51,
        measure: '51rem',
        tabelaref: 'TB01010',
        widthname: 42,
        disabled: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'referencia',
        funcao: 'Referência',
        tipo: 'varchar',
        nome: 'referencia',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 18,
        measure: '18rem',
        disabled: valuesdisable[1]
      },
      {
        id: 2,
        campo: 'codbarras',
        funcao: 'Código Barras',
        tipo: 'varchar',
        nome: 'codbarras',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 17,
        measure: '17rem',
        disabled: valuesdisable[2]
      },
      {
        id: 3,
        campo: 'codauxiliar',
        funcao: 'Código Auxiliar',
        tipo: 'varchar',
        nome: 'codauxiliar',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 16,
        measure: '16rem',
        disabled: valuesdisable[3]
      },
      {
        id: 4,
        campo: 'marca',
        funcao: 'Marca',
        tipo: 'varchar',
        nome: 'marca',
        tamanho: 5,
        tipoobject: 2,
        widthfield: 21,
        measure: '21rem',
        tabelaref: 'TB01047',
        widthname: 12,
        disabled: valuesdisable[4]
      },
      {
        id: 5,
        campo: 'prunit',
        funcao: 'Preço Unitário',
        tipo: 'varchar',
        nome: 'marca',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[5],
        decimal: 2
      },
      {
        id: 6,
        campo: 'prazo',
        funcao: 'Entrega (Dias)',
        tipo: 'varchar',
        nome: 'prazo',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[6]
      },
      {
        id: 7,
        campo: 'datafim',
        funcao: 'Data Validade',
        tipo: 'varchar',
        nome: 'datafim',
        tamanho: 60,
        tipoobject: 5,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[7]
      },
      {
        id: 8,
        campo: 'situacao',
        funcao: 'Situação do Produto',
        tipo: 'int',
        nome: 'situacao',
        tamanho: 1,
        tipoobject: 10,
        widthfield: 25,
        measure: '25rem',
        itens: 'Ativo,Inativo,Suspenso',
        values: 'A,I,S',
        disabled: valuesdisable[8]
      }
    ]);
  }, []);

  useEffect(() => {
    if (itemselec === undefined) {
      setInclusao(true);
      setDisabled(false);
      setValuesdisable([false, true, true, true, true, false, false, false, false]);
      valuesfield[8] = 'A';
      setValuesfield([...valuesfield]);
    } else {
      setInclusao(false);
      setValuesdisable([true, true, true, true, true, true, true, true, true]);
      valuesfield[0] = itemselec.produto;
      valuesfield[5] = itemselec.prunit;
      valuesfield[6] = itemselec.prazo;
      if (itemselec.datafim !== undefined) {
        const dt1 = itemselec.datafim.substring(3, 5) + '/' + itemselec.datafim.substring(0, 2) + '/' + itemselec.datafim.substring(6, 10);
        const datafim = new Date(dt1);
        valuesfield[7] = datafim;
      }
      valuesfield[8] = itemselec.situacao;
      setValuesfield([...valuesfield]);
    }
  }, [itemselec]);

  useEffect(() => {
    if (valuesfield[0] !== undefined) {
      const codprod = valuesfield[0];
      if (codprod.length === 5) {
        setCarregando(true);
        apiFind(
          'Produto',
          'TB01010_REFERENCIA,TB01010_CODBARRAS,TB01010_CODAUXILIAR,TB01010_MARCA',
          '',
          "TB01010_CODIGO = '" + codprod + "' "
        ).then((response) => {
          if (response.status === 200) {
            valuesfield[1] = response.data.referencia;
            valuesfield[2] = response.data.codbarras;
            valuesfield[3] = response.data.codauxiliar;
            valuesfield[4] = response.data.marca;
            setValuesfield([...valuesfield]);
            apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', codprod).then((response) => {
              setFoto(response.data[0].picture);
              setCarregando(false);
            });
          }
        });
      }
    }
  }, [valuesfield[0]]);

  const Editar = () => {
    setInclusao(false);
    setDisabled(false);
    setValuesdisable([true, true, true, true, true, false, false, false, false]);
  };

  const Salvar = () => {
    if (valuesfield[0] === undefined || valuesfield[0] === '' || valuesfield[0] === null) {
      setItemvariant(1);
      setMensagem('Campo PRODUTO é preenchimento obrigatório !');
    } else {
      let item = {};
      item['codcli'] = codcli;
      item['produto'] = valuesfield[0];
      item['prunit'] = valuesfield[5];
      item['prazo'] = valuesfield[6];
      if (valuesfield[7] !== undefined) {
        const tmdata1 = Date.parse(valuesfield[7]);
        const dt1 = new Date(tmdata1);
        const data1 = dt1.toLocaleDateString('en-US');
        item['datafim'] = data1 + ' 00:00:00';
      }
      item['situacao'] = valuesfield[8];
      setCarregando(true);
      if (inclusao) {
        apiInsert('ClienteProduto', item).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              setShowselec(false);
            }
          } else {
            setCarregando(false);
            setItemvariant(-1);
            setMensagem(response.data);
          }
        });
      } else {
        apiUpdate('ClienteProduto', item).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              setShowselec(false);
            }
          } else {
            setCarregando(false);
            setItemvariant(-1);
            setMensagem(response.data);
          }
        });
      }
    }
  };

  const handleCloseShowFile = () => {
    setShowfile(false);
  };

  const salvarFoto = () => {
    setCarregando(true);
    apiSetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', valuesfield[0], img64).then((response) => {
      if (response.status === 200) {
        apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', valuesfield[0]).then((response) => {
          setFoto(response.data[0].picture);
          setCarregando(false);
          setShowfile(false);
        });
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frmclienteprodutoselec" name="frmclienteprodutoselec">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Informações do Produto selecionado</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '5px' }}>
              <Col lg={2}>
                <Row style={{ width: '100%', textAlign: 'center' }}>
                  <Col>
                    {foto === undefined || foto === '' || foto === null ? (
                      <img src={nopicture} alt="foto" width={'230px'} height={'230px'} onDoubleClick={(e) => setShowfile(true)} />
                    ) : (
                      <img
                        src={`data:image/jpeg;base64,${foto}`}
                        alt="foto"
                        width={'230px'}
                        height={'230px'}
                        onDoubleClick={(e) => setShowfile(true)}
                      />
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
                      disabled={valuesdisable[field.id]}
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
          <Row style={{ textAlign: 'rigth' }}>
            <Col>
              <Button id="btnEditprod" className="btn" disabled={!disabled} onClick={(e) => Editar()}>
                <i className={'feather icon-edit'} /> Editar
              </Button>
              <Button id="btnSalvprod" className="btn btn-success" disabled={disabled} onClick={(e) => Salvar()}>
                <i className={'feather icon-save'} /> Salvar
              </Button>
              <Button id="btnCancprod" className="btn btn-warning" disabled={disabled} onClick={(e) => setShowselec(false)}>
                <i className={'feather icon-x'} /> Cancelar
              </Button>
            </Col>
          </Row>
        </Row>
        <Modal backdrop="static" size="lg" show={showfile} centered={true} onHide={handleCloseShowFile}>
          <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-camera h1'} />
            &nbsp;Definição da Foto
          </Modal.Header>
          <ModalBody>
            <Form.Group controlId="formFile" className="mb-1">
              <Form.Label>Favor escolher o arquivo:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  setUrl(URL.createObjectURL(e.target.files[0]));
                  getBase64(e.target.files[0])
                    .then((res) => {
                      let pos = res.indexOf('base64') + 7;
                      res = res.substring(pos);
                      setImg64(res);
                    })
                    .catch((err) => console.log(err));
                }}
              />
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                {url !== undefined && (url !== null) & (url !== '') ? <img src={url} alt="avatar" width="416" height="416" /> : <></>}
              </div>
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <Row style={{ textAlign: 'rigth' }}>
              <Col>
                <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={(e) => salvarFoto()}>
                  <i className={'feather icon-save'} /> Salvar
                </Button>
                <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={(e) => handleCloseShowFile()}>
                  <i className={'feather icon-x'} />
                  Cancelar
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ClienteProdutoSelec;
