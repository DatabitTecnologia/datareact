import React, { useEffect } from 'react';
import { Row, Col, Button, Modal, ModalBody, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { useToasts } from 'react-toast-notifications';
import AGGrid from '../../../../components/AGGrid';
import { CreateObject } from '../../../../components/CreateObject';
import { apiDelete, apiGetPicture, apiExec, apiFind } from '../../../../api/crudapi';
import nopicture from '../../../../assets/images/databit/nopicture.png';
import { Confirmation } from '../../../../components/Confirmation';
import { Password } from '../../../../components/Password';
import { Message } from '../../../../components/Message';
import BrowseMov from '../browse';
import LancProd from '../lancprod';
import DescontoFull from '../desconto/full';
import FreteDesp from '../fretedesp';
import Arredonda from '../arredonda';
import CustoItem from '../custo';
import ComissaoItem from '../comissao';
import { atualizaPreco } from '../atualiza';
import SerialOut from '../serialout';

const Item = (props) => {
  const { cabecalho, disabled, tableitem, columnsitem } = props;
  const {
    fieldsitem,
    classcab,
    classitem,
    typeprice,
    tablemov,
    fieldslanc,
    fieldsimp,
    fieldsarredonda,
    entsai,
    coddest,
    tabdest,
    typestock,
    contabil
  } = props;
  const { eventsitem, setEventsitem } = props;
  const { movimento, setMovimento } = props;
  const { refreshprice, setRefreshprice } = props;

  const [rows, setRows] = React.useState([]);
  const [itemselec, setItemselec] = React.useState([]);
  const [foto, setFoto] = React.useState();
  const [carregando, setCarregando] = React.useState(false);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [showselec, setShowselec] = React.useState(false);
  const [showbrowse, setShowbrowse] = React.useState(false);
  const [showfoto, setShowfoto] = React.useState(false);
  const [showdesconto, setShowdesconto] = React.useState(false);
  const [showfretedesp, setShowfretedesp] = React.useState(false);
  const [showarredonda, setShowarredonda] = React.useState(false);
  const [showcusto, setShowcusto] = React.useState(false);
  const [showcomissao, setShowcomissao] = React.useState(false);
  const [showserial, setShowserial] = React.useState(false);
  const [inclusao, setInclusao] = React.useState(false);
  const { addToast } = useToasts();
  const [config, setConfig] = React.useState([]);
  const [processando, setProcessando] = React.useState(false);
  const [itemAtual, setItematual] = React.useState(null);
  const [selectedLine, setselectedLine] = React.useState([0]);
  const [qtlanc, setQtlanc] = React.useState(0);
  const [validations, setValidations] = React.useState([]);
  const [rowsserial, setRowsserial] = React.useState([]);

  useEffect(() => {
    sessionStorage.setItem('lineselect', 0);
  }, []);

  useEffect(() => {
    //if (!showselec && !showbrowse && !showdesconto && !showfretedesp && !showarredonda && !showcusto && !showcomissao && !showserial) {
    setselectedLine([parseInt(sessionStorage.getItem('lineselect'))]);
    Filtrar();
    //} else {
    //  sessionStorage.setItem('lineselect', [itemselec.id]);
    //}
  }, [showselec, showbrowse, showdesconto, showfretedesp, showarredonda, showcusto, showcomissao, showserial]);

  useEffect(() => {
    if (refreshprice) {
      Filtrar();
      setRefreshprice(false);
    }
  }, [refreshprice]);

  useEffect(() => {
    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['pendserie'];
    validation['sinal'] = [1];
    validation['tipotab'] = 'G';
    validation['valorval'] = ['S'];
    validation['cor'] = ['#ffffcc'];
    validation['total'] = 2;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);
  }, [rows]);

  const Filtrar = async () => {
    setCarregando(true);
    apiFind('Config', 'TB00040_TABEMPRESA,TB00040_TIPODESC', '', '').then((response) => {
      if (response.status === 200) {
        setConfig(response.data);
        apiFind(classcab, '*', '', tablemov + "_CODIGO = '" + cabecalho.codigo + "' ").then((response) => {
          if (response.status === 200) {
            setMovimento(response.data);
            apiExec("exec SP02302 '" + tableitem + "', '" + cabecalho.codigo + "' ", 'S').then((response) => {
              setCarregando(false);
              setRows(response.data);
            });
          }
        });
      }
    });
  };

  const Incluir = () => {
    if (getEventsItem(1)) {
      setInclusao(true);
      setShowbrowse(true);
    }
  };

  const Excluir = () => {
    if (itemselec !== undefined) {
      if (getEventsItem(3)) {
        Confirmation('frmitem', 'Confirma a exclusão deste Item ?').then((result) => {
          if (result.isConfirmed) {
            apiDelete(classitem, itemselec).then((response) => {
              if (response.status === 200) {
                if (response.data.status === 1) {
                  let typemens = 'success';
                  let dismiss = true;
                  if (response.data.status !== 1) {
                    typemens = 'warning';
                    dismiss = false;
                  }
                  addToast(response.data.mensagem, {
                    placement: 'bottom-rigth',
                    appearance: typemens,
                    autoDismiss: dismiss
                  });
                  setCarregando(false);
                  if (response.data.status === 1) {
                    apiFind(classcab, '*', '', tablemov + "_CODIGO = '" + cabecalho.codigo + "' ").then((response) => {
                      if (response.status === 200) {
                        Filtrar();
                        valuesfield.forEach((element, index) => {
                          valuesfield[index] = '';
                          valuesfield2[index] = '';
                        });
                        setValuesfield([...valuesfield]);
                        setValuesfield2([...valuesfield2]);
                        getEventsItem(4);
                      }
                    });
                  }
                }
              }
            });
          }
        });
      }
    }
  };

  useEffect(() => {
    if (itemselec !== undefined) {
      apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', itemselec.produto).then((response) => {
        setFoto(response.data[0].picture);
        fieldsitem.forEach((item, index) => {
          valuesfield[index] = itemselec[item.campo];
        });
        setValuesfield([...valuesfield]);
      });
    }
  }, [itemselec]);

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setInclusao(false);
      setItemselec(newSelection);
      setShowselec(true);
    }
  };

  const handleCloseselec = () => {
    setShowselec(false);
  };

  const handleClosebrowse = () => {
    setShowbrowse(false);
  };

  const handleClosedesconto = () => {
    setShowdesconto(false);
  };

  const handleClosefretedesp = () => {
    setShowfretedesp(false);
  };

  const handleClosearredonda = () => {
    setShowarredonda(false);
  };

  const handleClosecusto = () => {
    setShowcusto(false);
  };

  const handleClosecomissao = () => {
    setShowcomissao(false);
  };

  const handleCloseserial = async () => {
    if (qtlanc !== itemselec.qtprod && rowsserial.length > 0) {
      await Message(
        'frmserialout',
        '',
        'warning',
        'A quantidade de número de serie, está diferente que a quantidade lançada no produto ! !'
      );
    } else {
      setShowserial(false);
    }
  };

  const dblClickGrid = (newSelection) => {
    setInclusao(false);
    setItemselec(newSelection);
    setShowselec(true);
  };

  const getEventsItem = (type) => {
    let retorno = true;
    if (eventsitem !== undefined && eventsitem.length > 0) {
      setCarregando(true);
      let tmpevent = eventsitem.filter((element) => element.type === parseInt(type));
      tmpevent.forEach((element) => {
        if (retorno) {
          retorno = element.method();
          if (retorno === undefined) {
            retorno = true;
          }
        }
      });
      setCarregando(false);
    }
    return retorno;
  };

  const Custo = async () => {
    if (getEventsItem(1)) {
      const response = await apiFind('Senha', 'TB00008_ATIVO,TB00008_SENHA,TB00008_FUNCAO', '', 'TB00008_ID = 89');
      if (response.status === 200) {
        const senha = response.data;
        const result = await Password('frmitem', senha.senha, 89, senha.funcao, senha.ativo === 'S');
        if (result.isConfirmed) {
          setShowcusto(true);
        }
      }
    }
  };

  const Comissao = async () => {
    if (getEventsItem(1)) {
      const response = await apiFind('Senha', 'TB00008_ATIVO,TB00008_SENHA,TB00008_FUNCAO', '', 'TB00008_ID = 75');
      if (response.status === 200) {
        const senha = response.data;
        const result = await Password('frmitem', senha.senha, 75, senha.funcao, senha.ativo === 'S');
        if (result.isConfirmed) {
          setShowcomissao(true);
        }
      }
    }
  };

  const Atualiza = async () => {
    if (getEventsItem(1)) {
      const result = await Confirmation('frmitem', 'Deseja realizar a atualização de Preços ?');
      if (result.isConfirmed) {
        setProcessando(true);
        await atualizaPreco(tablemov, cabecalho, classitem, coddest, tabdest, entsai, typeprice, typestock, rows, setItematual);
        setProcessando(false);
        Filtrar();
      }
    }
  };

  const Desconto = () => {
    if (getEventsItem(1)) {
      setShowdesconto(true);
    }
  };

  const Frete = () => {
    if (getEventsItem(1)) {
      setShowfretedesp(true);
    }
  };

  const ArredondaItem = () => {
    if (getEventsItem(1)) {
      setShowarredonda(true);
    }
  };

  const Serial = () => {
    if (getEventsItem(1)) {
      setShowserial(true);
    }
  };

  return (
    <React.Fragment>
      <div id="frmitem" name="frmitem">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users">
          <Card.Header>
            <Card.Title as="h5">Definição de Produtos</Card.Title>
          </Card.Header>
          <Row style={{ textAlign: 'center', marginTop: '20px' }}>
            <Col>
              <Button id="btnNovoprod" className="btn-primary shadow-2 mb-3" disabled={!disabled} onClick={(e) => Incluir()}>
                <i className={'feather icon-star'} /> Incluir
              </Button>
              <Button
                id="btnDelprod"
                className="btn-primary shadow-2 mb-3"
                disabled={!disabled}
                onClick={(e) => {
                  Excluir();
                }}
              >
                <i className={'feather icon-trash'} /> Excluir
              </Button>
              <Button
                id="btnFoto"
                className={showfoto ? 'btn-success shadow-2 mb-3' : 'btn-primary shadow-2 mb-3'}
                disabled={!disabled}
                onClick={(e) => setShowfoto(showfoto ? false : true)}
              >
                <i className={'feather icon-camera'} /> Informações
              </Button>
              <Button id="btnDesconto" className="btn-warning shadow-2 mb-3" disabled={!disabled} onClick={(e) => Desconto()}>
                <i className={'fi flaticon-business-and-finance'} />
                Desconto
              </Button>
              <Button id="btnFrete" className="btn-success shadow-2 mb-3" disabled={!disabled} onClick={(e) => Frete()}>
                <i className={'feather icon-repeat'} />
                Frete / Despesas
              </Button>
              <Button id="btnArredonda" className="btn-primary shadow-2 mb-3" disabled={!disabled} onClick={(e) => ArredondaItem()}>
                <i className={'feather icon-airplay'} />
                Arredondamento
              </Button>
              <Button id="btnCusto" className="btn-primary shadow-2 mb-3" disabled={!disabled} onClick={(e) => Custo()}>
                <i className={'feather icon-tag'} />
                Custo
              </Button>
              <Button id="btnComissao" className="btn-primary shadow-2 mb-3" disabled={!disabled} onClick={(e) => Comissao()}>
                <i className={'feather icon-layers'} />
                Comissão
              </Button>
              <Button id="btnAtualiza" className="btn-primary shadow-2 mb-3" disabled={!disabled} onClick={(e) => Atualiza()}>
                <i className={'feather icon-thumbs-up'} />
                Atualização
              </Button>
              {itemselec ? (
                <Button
                  id="btnSerial"
                  className="btn-primary shadow-2 mb-3"
                  disabled={!disabled || itemselec.possuiserie === 'N'}
                  onClick={(e) => Serial()}
                >
                  <i className={'feather icon-bookmark'} />
                  Serial
                </Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Row style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px', marginBottom: '10px' }}>
            <AGGrid
              width="100%"
              height="390px"
              rows={rows}
              columns={columnsitem}
              loading={carregando}
              item={itemselec}
              setItem={(data) => setItemselec(data)}
              disabled={!disabled}
              onKeyDown={keyGrid}
              onDoubleClick={dblClickGrid}
              focus={true}
              forcefocus={true}
              selectedLine={selectedLine}
              validations={validations}
            ></AGGrid>
          </Row>
        </Card>
        {showfoto ? (
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Informações do item selecionado</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              <Col lg={1}>
                <Row style={{ width: '100%', marginRight: '20px' }}>
                  <Col>
                    {foto === undefined || foto === '' || foto === null ? (
                      <img src={nopicture} alt="foto" width={'300px'} height={'300px'} />
                    ) : (
                      <img src={`data:image/jpeg;base64,${foto}`} alt="foto" width={'300px'} height={'300px'} />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col lg={11}>
                <Row style={{ marginLeft: '210px', marginRight: '5px', marginBottom: '3px' }}>
                  {fieldsitem.map((field, index) => (
                    <CreateObject
                      key={index}
                      field={field}
                      index={field.id}
                      fields={fieldsitem}
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
        ) : (
          <></>
        )}

        <Modal backdrop="static" fullscreen={true} show={showbrowse} centered={true} onHide={handleClosebrowse}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-box'} />
            &nbsp;Lançamento de Itens
          </Modal.Header>
          <ModalBody>
            <BrowseMov
              cabecalho={cabecalho}
              inclusao={false}
              showbrowse={showbrowse}
              setShowbrowse={(data) => setShowbrowse(data)}
              tableitem={tableitem}
              classitem={classitem}
              typeprice={typeprice}
              tablemov={tablemov}
              fieldslanc={fieldslanc}
              fieldsimp={fieldsimp}
              entsai={entsai}
              coddest={coddest}
              tabdest={tabdest}
              typestock={typestock}
              contabil={contabil}
              eventsitem={eventsitem}
              setEventsitem={(data) => setEventsitem(data)}
            ></BrowseMov>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="xl" show={showselec} centered={true} onHide={handleCloseselec}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-box'} />
            &nbsp;Produto Selecionado
          </Modal.Header>
          <ModalBody>
            <LancProd
              cabecalho={cabecalho}
              tableitem={tableitem}
              classitem={classitem}
              typeprice={typeprice}
              tablemov={tablemov}
              fieldslanc={fieldslanc}
              fieldsimp={fieldsimp}
              inclusao={inclusao}
              showselec={showselec}
              setShowselec={(data) => setShowselec(data)}
              entsai={entsai}
              coddest={coddest}
              tabdest={tabdest}
              typestock={typestock}
              contabil={contabil}
              prodselec={itemselec}
              eventsitem={eventsitem}
              setEventsitem={(data) => setEventsitem(data)}
              config={config}
            ></LancProd>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="lg" show={showdesconto} centered={true} onHide={handleClosedesconto}>
          <Modal.Header className="h5" closeButton>
            <i className={'fi flaticon-business-and-finance'} />
            &nbsp;Desconto Global
          </Modal.Header>
          <ModalBody>
            <DescontoFull
              cabecalho={cabecalho}
              itens={rows}
              classcab={classcab}
              classitem={classitem}
              config={config}
              tablemov={tablemov}
              showdesconto={showdesconto}
              setShowdesconto={(data) => setShowdesconto(data)}
            ></DescontoFull>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="sm" show={showfretedesp} centered={true} onHide={handleClosefretedesp}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-repeat'} />
            &nbsp;Frete / Despesas
          </Modal.Header>
          <ModalBody>
            <FreteDesp
              cabecalho={cabecalho}
              itens={rows}
              classcab={classcab}
              classitem={classitem}
              config={config}
              tablemov={tablemov}
              showfretedesp={showfretedesp}
              setShowfretedesp={(data) => setShowfretedesp(data)}
            ></FreteDesp>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="xl" show={showarredonda} centered={true} onHide={handleClosearredonda}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-airplay'} />
            &nbsp;Arredondamento
          </Modal.Header>
          <ModalBody>
            <Arredonda
              cabecalho={cabecalho}
              itemselec={itemselec}
              classitem={classitem}
              fieldsarredonda={fieldsarredonda}
              showarredonda={showarredonda}
              setShowarredonda={(data) => setShowarredonda(data)}
            ></Arredonda>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="sm" show={showcusto} centered={true} onHide={handleClosecusto}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-tag'} />
            &nbsp;Atualização de Custo
          </Modal.Header>
          <ModalBody>
            {itemselec !== undefined ? (
              <CustoItem
                cabecalho={cabecalho}
                itemselec={itemselec}
                classitem={classitem}
                showcusto={showcusto}
                setShowcusto={(data) => setShowcusto(data)}
              ></CustoItem>
            ) : (
              <></>
            )}
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="sm" show={showcomissao} centered={true} onHide={handleClosecomissao}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-layers'} />
            &nbsp;Comissão
          </Modal.Header>
          <ModalBody>
            {itemselec !== undefined ? (
              <ComissaoItem
                cabecalho={cabecalho}
                itemselec={itemselec}
                classitem={classitem}
                showcomissao={showcomissao}
                setShowcomissao={(data) => setShowcomissao(data)}
              ></ComissaoItem>
            ) : (
              <></>
            )}
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="xl" show={showserial} centered={true} onHide={handleCloseserial}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-bookmark'} />
            &nbsp;Seriais
          </Modal.Header>
          <ModalBody>
            <SerialOut
              cabecalho={cabecalho}
              itemselec={itemselec}
              table={tablemov}
              showserial={showserial}
              setShowserial={(data) => setShowserial(data)}
              qtlanc={qtlanc}
              setQtlanc={(data) => setQtlanc(data)}
              rows={rowsserial}
              setRows={(data) => setRowsserial(data)}
            ></SerialOut>
          </ModalBody>
        </Modal>
        <div
          className={`modal fade ${processando ? 'show d-block' : ''}`}
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content text-center p-4">
              <div className="modal-body">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="sr-only">Carregando...</span>
                </div>
                <h5 className="modal-title mb-2">Processando item...</h5>
                <p>
                  <strong>{itemAtual?.produto + '-' + itemAtual?.nomeprod || 'Aguarde...'}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Item;
