import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiGetPicture, apiFind } from '../../../../api/crudapi';
import { CreateObject } from '../../../../components/CreateObject';
import nopicture from '../../../../assets/images/databit/nopicture.png';
import AGGrid from '../../../../components/AGGrid';
import FieldsFilter from '../../cadastro/fieldsfilter';
import PartnerFluxo from '../fluxo';

const PartnerSelec = (props) => {
  const { compra, parceiro, valor, showinfor, setShowinfor, atualiza, setAtualiza } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [foto, setFoto] = React.useState();
  const [disabled, setDisabled] = React.useState(true);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columnshist, setColumnshist] = React.useState([]);
  const [rowshist, setRowshist] = React.useState([]);
  const [itemhist, setItemhist] = React.useState([]);
  const [showhist, setShowhist] = React.useState(false);
  const [fieldshist, setFieldshist] = React.useState([]);
  const [valuesfieldhist, setValuesfieldhist] = React.useState([]);
  const [valuesfield2hist, setValuesfield2hist] = React.useState([]);
  const [itembkp, setItembkp] = React.useState([]);
  const [status, setStatus] = React.useState();
  const [itemselec, setItemselec] = React.useState();
  const [showfluxo, setShowfluxo] = React.useState(false);

  useEffect(() => {
    setValuesdisable([true, true, true, true, true, true, true, true, true]);
    setColumns([
      { headerClassName: 'header-list', field: 'produto', headerName: 'Código', width: 76 },
      { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 136 },
      { headerClassName: 'header-list', field: 'nomeprod', headerName: 'Descrição do Produto', width: 345 },
      { headerClassName: 'header-list', field: 'qtprod', headerName: 'Quantidade', width: 125, type: 'number', decimal: 3 },
      { headerClassName: 'header-list', field: 'prunit', headerName: 'Preço Unitário', width: 125, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'totvalor', headerName: 'Valor Total', width: 145, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'entrega', headerName: 'Entrega', width: 100, type: 'date' }
    ]);
    setColumnshist([
      { headerClassName: 'header-list', field: 'iditem', headerName: 'ID', width: 60, type: 'number' },
      { headerClassName: 'header-list', field: 'data', headerName: 'Data', width: 170 },
      { headerClassName: 'header-list', field: 'user', headerName: 'Usuário', width: 175 },
      { headerClassName: 'header-list', field: 'status', headerName: 'Status', width: 60 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição Status', width: 280 }
    ]);
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
        tamanho: 21,
        tipoobject: 1,
        widthfield: 16,
        measure: '21rem',
        disabled: valuesdisable[4]
      },
      {
        id: 5,
        campo: 'qtprod',
        funcao: 'Quantidade',
        tipo: 'numeric',
        nome: 'qtprod',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[5],
        decimal: 3
      },
      {
        id: 6,
        campo: 'prunit',
        funcao: 'Preço Unitário',
        tipo: 'numeric',
        nome: 'marca',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[6],
        decimal: 2
      },
      {
        id: 7,
        campo: 'totvalor',
        funcao: 'Valor Total',
        tipo: 'numeric',
        nome: 'totvalor',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[7],
        decimal: 2
      }
    ]);

    setFieldshist([
      {
        id: 0,
        campo: 'obs',
        funcao: 'Observações',
        tipo: 'text',
        nome: 'obs',
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        disabled: false,
        lines: 6,
        readonly: true
      }
    ]);
  }, []);

  useEffect(() => {
    setCarregando(true);
    apiList('PartnerItemVW', '*', '', "codigo = '" + compra + "' and codcli = '" + parceiro + "' ").then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
      }
    });
  }, [fieldshist]);

  useEffect(() => {
    if (itemselec !== undefined) {
      setStatus(itemselec.status);
      valuesfield[0] = itemselec.produto;
      valuesfield[1] = itemselec.referencia;
      valuesfield[2] = itemselec.codbarras;
      valuesfield[3] = itemselec.codauxiliar;
      valuesfield[4] = itemselec.nomemarca;
      valuesfield[5] = itemselec.qtprod;
      valuesfield[6] = itemselec.prunit;
      valuesfield[7] = itemselec.totvalor;
      valuesfield[8] = itemselec.nomecli;
      setValuesfield([...valuesfield]);
      apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', itemselec.produto).then((response) => {
        setFoto(response.data[0].picture);
        apiList(
          'PartnerHistoricoVW',
          '*',
          '',
          "TB02302_CODIGO = '" +
            itemselec.codigo +
            "' and TB02302_CODCLI = '" +
            itemselec.codcli +
            "' and TB02302_PRODUTO = '" +
            itemselec.produto +
            "' order by TB02302_DATA desc "
        ).then((response) => {
          if (response.status === 200) {
            setRowshist(response.data);
          }
        });
      });
    }
  }, [itemselec]);

  useEffect(() => {
    if (itemhist !== undefined && itemhist !== null) {
      if (itemhist.obs !== '' && itemhist.obs !== undefined && itemhist.obs !== null) {
        valuesfieldhist[0] = itemhist.obs;
        setValuesfieldhist([...valuesfieldhist]);
      } else {
        valuesfieldhist[0] = '';
        setValuesfieldhist([...valuesfieldhist]);
      }
    }
  }, [itemhist]);

  useEffect(() => {
    if (atualiza) {
      setShowinfor(false);
    }
  }, [atualiza]);

  const handleClosehist = () => {
    setShowhist(false);
  };

  const handleClosefluxo = () => {
    setShowfluxo(false);
  };

  return (
    <React.Fragment>
      <div id="frmclienteprodutoselec" name="frmclienteprodutoselec">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Listagem de Produtos</Card.Title>
            </Card.Header>
            <Row style={{ marginBottom: '5px' }}>
              <AGGrid
                width="100%"
                height="240px"
                rows={rows}
                columns={columns}
                loading={carregando}
                item={itemselec}
                setItem={(data) => setItemselec(data)}
                focus={true}
              ></AGGrid>
            </Row>
          </Card>
        </Row>
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
              <Button id="btnHistorico" className="btn" disabled={!disabled} onClick={(e) => setShowhist(true)}>
                <i className={'feather icon-list'} /> Histórico
              </Button>
              <Button id="btnStatus" className="btn btn-success" disabled={!disabled} onClick={(e) => setShowfluxo(true)}>
                <i className={'feather icon-zap'} /> Status
              </Button>
            </Col>
          </Row>
        </Row>
        <Modal backdrop="static" size="lg" show={showhist} centered={true} onHide={handleClosehist}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-list'} />
            &nbsp;Histórico
          </Modal.Header>
          <ModalBody>
            <Row>
              <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
                <Card.Header>
                  <Card.Title as="h5">Histórico de Atendimento</Card.Title>
                </Card.Header>
                <Row>
                  <AGGrid
                    width="100%"
                    height="400px"
                    rows={rowshist}
                    columns={columnshist}
                    loading={carregando}
                    item={itemhist}
                    setItem={(data) => setItemhist(data)}
                    focus={true}
                  ></AGGrid>
                </Row>
                <Row style={{ marginLeft: '1px', marginRight: '1px' }}>
                  {fieldshist.map((field, index) => (
                    <CreateObject
                      key={index}
                      field={field}
                      index={field.id}
                      fields={FieldsFilter}
                      valuesfield={valuesfieldhist}
                      setValuesfield={(data) => setValuesfieldhist(data)}
                      valuesfield2={valuesfield2hist}
                      setValuesfield2={(data) => setValuesfield2hist(data)}
                      disabled={false}
                    ></CreateObject>
                  ))}
                </Row>
              </Card>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Row style={{ textAlign: 'rigth' }}>
              <Col>
                <Button id="btnHistorico" className="btn btn-success" onClick={(e) => setShowhist(false)}>
                  <i className={'feather icon-x'} /> Fechar
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
        <Modal backdrop="static" size="lg" show={showfluxo} centered={true} onHide={handleClosefluxo}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-zap h1'} />
            &nbsp;Definição de Fluxo
          </Modal.Header>
          <ModalBody>
            <PartnerFluxo
              compra={compra}
              parceiro={parceiro}
              valor={valor}
              itens={rows}
              statusant={status}
              showwfluxo={showfluxo}
              setShowfluxo={(data) => setShowfluxo(data)}
              atualiza={atualiza}
              setAtualiza={(data) => setAtualiza(data)}
            ></PartnerFluxo>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default PartnerSelec;
