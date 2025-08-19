import React, { useEffect } from 'react';
import { Row, Col, Button, Modal, ModalBody, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { useToasts } from 'react-toast-notifications';
import AGGrid from '../../../../components/AGGrid';
import { apiDelete, apiExec, apiFind } from '../../../../api/crudapi';
import { Confirmation } from '../../../../components/Confirmation';
import LancServ from '../lancserv';
import ArredondaServ from '../arredondaserv';

const Servico = (props) => {
  const { cabecalho, disabled, tableserv, columnsserv } = props;
  const { classcab, classserv, tablemov, fieldsimpserv, fieldsarredondaserv } = props;
  const { eventsserv, setEventsserv } = props;
  const { movimento, setMovimento } = props;
  const { refreshprice, setRefreshprice } = props;

  const [rows, setRows] = React.useState([]);
  const [servselec, setServselec] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [showselec, setShowselec] = React.useState(false);
  const [showarredonda, setShowarredonda] = React.useState(false);
  const [inclusao, setInclusao] = React.useState(false);
  const { addToast } = useToasts();
  const [processando, setProcessando] = React.useState(false);
  const [servatual, setservatual] = React.useState(null);
  const [selectedLine, setselectedLine] = React.useState([0]);

  useEffect(() => {
    sessionStorage.setItem('lineselect', 0);
  }, []);

  useEffect(() => {
    //if (!showselec && !showarredonda) {
    setselectedLine([parseInt(sessionStorage.getItem('lineselect'))]);
    Filtrar();
    //} else {
    //  sessionStorage.setItem('lineselect', [servselec.id]);
    //}
  }, [showselec, showarredonda]);

  useEffect(() => {
    if (refreshprice) {
      Filtrar();
      setRefreshprice(false);
    }
  }, [refreshprice]);

  const Filtrar = async () => {
    setCarregando(true);
    apiFind(classcab, '*', '', tablemov + "_CODIGO = '" + cabecalho.codigo + "' ").then((response) => {
      if (response.status === 200) {
        setMovimento(response.data);
        apiExec("exec SP02306 '" + tableserv + "', '" + cabecalho.codigo + "' ", 'S').then((response) => {
          setCarregando(false);
          setRows(response.data);
        });
      }
    });
  };

  const Incluir = () => {
    if (getEventsserv(1)) {
      setInclusao(true);
      setShowselec(true);
    }
  };

  const Excluir = () => {
    if (servselec !== undefined) {
      if (getEventsserv(3)) {
        Confirmation('frmserv', 'Confirma a exclusão deste Serviço ?').then((result) => {
          if (result.isConfirmed) {
            apiDelete(classserv, servselec).then((response) => {
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
                        getEventsserv(4);
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

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setInclusao(false);
      setServselec(newSelection);
      setShowselec(true);
    }
  };

  const dblClickGrid = (newSelection) => {
    setInclusao(false);
    setServselec(newSelection);
    setShowselec(true);
  };

  const getEventsserv = (type) => {
    let retorno = true;
    if (eventsserv !== undefined && eventsserv.length > 0) {
      setCarregando(true);
      let tmpevent = eventsserv.filter((element) => element.type === parseInt(type));
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

  const handleCloseselec = () => {
    setShowselec(false);
  };

  const handleClosearredonda = () => {
    setShowarredonda(false);
  };

  const arredondaItemServ = () => {
    if (getEventsserv(1)) {
      setShowarredonda(true);
    }
  };

  return (
    <React.Fragment>
      <div id="frmserv" name="frmserv">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users">
          <Card.Header>
            <Card.Title as="h5">Definição de Serviços</Card.Title>
          </Card.Header>
          <Row style={{ textAlign: 'right', marginTop: '20px', marginRight: '10px' }}>
            <Col>
              <Button id="btnNovoserv" className="btn-primary shadow-2 mb-3" disabled={!disabled} onClick={(e) => Incluir()}>
                <i className={'feather icon-star'} /> Incluir
              </Button>
              <Button
                id="btnDelserv"
                className="btn-primary shadow-2 mb-3"
                disabled={!disabled}
                onClick={(e) => {
                  Excluir();
                }}
              >
                <i className={'feather icon-trash'} /> Excluir
              </Button>
              <Button id="btnArredonda" className="btn-success shadow-2 mb-3" disabled={!disabled} onClick={(e) => arredondaItemServ()}>
                <i className={'feather icon-airplay'} />
                Arredondamento
              </Button>
            </Col>
          </Row>
          <Row style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px', marginBottom: '10px' }}>
            <AGGrid
              width="100%"
              height="390px"
              rows={rows}
              columns={columnsserv}
              loading={carregando}
              item={servselec}
              setItem={(data) => setServselec(data)}
              disabled={!disabled}
              onKeyDown={keyGrid}
              onDoubleClick={dblClickGrid}
              focus={true}
              forcefocus={true}
              selectedLine={selectedLine}
            ></AGGrid>
          </Row>
        </Card>

        <Modal backdrop="static" size="xl" show={showselec} centered={true} onHide={handleCloseselec}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-cpu'} />
            &nbsp;Serviço Selecionado
          </Modal.Header>
          <ModalBody>
            <LancServ
              cabecalho={cabecalho}
              tableserv={tableserv}
              classserv={classserv}
              tablemov={tablemov}
              fieldsimpserv={fieldsimpserv}
              inclusao={inclusao}
              servselec={servselec}
              eventsserv={eventsserv}
              setEventsserv={(data) => setEventsserv(data)}
              showselec={showselec}
              setShowselec={(data) => setShowselec(data)}
            ></LancServ>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="xl" show={showarredonda} centered={true} onHide={handleClosearredonda}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-airplay'} />
            &nbsp;Arredondamento
          </Modal.Header>
          <ModalBody>
            <ArredondaServ
              cabecalho={cabecalho}
              itemselec={servselec}
              classserv={classserv}
              fieldsarredondaserv={fieldsarredondaserv}
              showarredonda={showarredonda}
              setShowarredonda={(data) => setShowarredonda(data)}
            ></ArredondaServ>
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
                <h5 className="modal-title mb-2">Processando serv...</h5>
                <p>
                  <strong>{servatual?.codserv + '-' + servatual?.nomeserv || 'Aguarde...'}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Servico;
