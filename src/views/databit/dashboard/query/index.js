import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, ModalBody, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import AGGrid from '../../../../components/AGGrid';
import { apiList, apiDelete, apiUpdate } from '../../../../api/crudapi';
import DashboardItem from '../item';
import { Confirmation } from '../../../../components/Confirmation';
import { useToasts } from 'react-toast-notifications';

const DashboardQuery = (props) => {
  const { dashboard, setDashboard, disabled } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [itemselec, setItemselec] = React.useState();
  const [showitem, setShowitem] = React.useState(false);
  const handleCloseShowitem = () => setShowitem(false);
  const { addToast } = useToasts();
  const [ordem, setOrdem] = React.useState(0);
  const [anterior, setAnterior] = React.useState();
  const [atual, setAtual] = React.useState();
  const [validations, setValidations] = React.useState([]);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'ordem', headerName: 'Ordem', width: 60, type: 'number' },
      { headerClassName: 'header-list', field: 'idquery', headerName: 'ID', width: 70, type: 'number' },
      { headerClassName: 'header-list', field: 'query', headerName: 'Query', width: 96 },
      { headerClassName: 'header-list', field: 'nomequery', headerName: 'Descrição Query', width: 170 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Legenda', width: 160 },
      { headerClassName: 'header-list', field: 'titulox', headerName: 'Eixo X', width: 120 },
      { headerClassName: 'header-list', field: 'tituloy', headerName: 'Eixo Y', width: 120 },
      { headerClassName: 'header-list', field: 'campovalor', headerName: 'Valor', width: 120 },
      {
        headerClassName: 'header-list',
        field: 'color',
        headerName: 'Cor',
        width: 50,
        renderCell: (params) => {
          return (
            <div
              style={{
                marginTop: '2px',
                height: '20px',
                width: '25px',
                backgroundColor: params.data.color,
                border: 'solid',
                borderWidth: '2px'
              }}
            ></div>
          );
        }
      }
    ]);

    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['param'];
    validation['sinal'] = [1];
    validation['tipotab'] = 'G';
    validation['valorval'] = [1];
    validation['cor'] = ['#ffff99'];
    validation['total'] = 1;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);
  }, []);

  useEffect(() => {
    if (dashboard !== undefined && !showitem) {
      setCarregando(true);
      apiList('DashboardQueryVW', '*', '', "DASHBOARD = '" + dashboard.codigo + "' ORDER BY ORDEM").then((response) => {
        if (response.status === 200) {
          let tmpordem = 0;
          setRows(response.data);
          setCarregando(false);
          response.data.forEach((item) => {
            item.ordem = tmpordem + 1;
            setOrdem(tmpordem + 1);
            tmpordem += 1;
            setCarregando(true);
            apiUpdate('FieldForm', item).then((response) => {
              if (response.status === 200) {
                setCarregando(false);
              }
            });
          });
        }
      });
    }
  }, [dashboard, showitem]);

  useEffect(() => {
    if (atual !== undefined) {
      setCarregando(true);
      apiUpdate('DashboardQuery', atual).then((response) => {
        if (response.status === 200) {
          setAtual(undefined);
          setCarregando(false);
        }
      });
    }
  }, [atual]);

  useEffect(() => {
    if (anterior !== undefined) {
      setCarregando(true);
      apiUpdate('DashboardQuery', anterior).then((response) => {
        if (response.status === 200) {
          setAnterior(undefined);
          setCarregando(false);
        }
      });
    }
  }, [anterior]);

  const Novo = () => {
    setItemselec(undefined);
    setShowitem(true);
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setShowitem(true);
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setItemselec(newSelection);
      setShowitem(true);
    }
    if (event.key === 'Delete') {
      setItemselec(newSelection);
      Excluir();
    }
  };

  const Upp = () => {
    if (itemselec !== undefined) {
      if (itemselec['ordem'] !== 1) {
        let rowsbkp2 = rows.slice(0, rows.length);
        let itematual = rows.findIndex((a) => a.ordem === itemselec.ordem);
        let itemant = rows.findIndex((a) => a.ordem === itemselec.ordem - 1);
        rowsbkp2[itematual]['ordem'] = rowsbkp2[itematual]['ordem'] - 1;
        rowsbkp2[itemant]['ordem'] = rowsbkp2[itemant]['ordem'] + 1;
        setAtual(rowsbkp2[itematual]);
        setAnterior(rowsbkp2[itemant]);
        setRows(rowsbkp2);
      }
    }
  };

  const Down = () => {
    if (itemselec !== undefined) {
      if (itemselec['ordem'] !== ordem) {
        let rowsbkp2 = rows.slice(0, rows.length);
        let itematual = rows.findIndex((a) => a.ordem === itemselec.ordem);
        let itemant = rows.findIndex((a) => a.ordem === itemselec.ordem + 1);
        rowsbkp2[itematual]['ordem'] = rowsbkp2[itematual]['ordem'] + 1;
        rowsbkp2[itemant]['ordem'] = rowsbkp2[itemant]['ordem'] - 1;
        setAtual(rowsbkp2[itematual]);
        setAnterior(rowsbkp2[itemant]);
        setRows(rowsbkp2);
      }
    }
  };

  const Excluir = () => {
    if (rows.length > 0 && itemselec !== undefined) {
      Confirmation('frmdashquery', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          apiDelete('DashboardQuery', itemselec).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              if (response.data.status === 1) {
                apiList('DashboardQueryVW', '*', '', "DASHBOARD = '" + dashboard.codigo + "' ").then((response) => {
                  if (response.status === 200) {
                    let tmpordem = 0;
                    setRows(response.data);
                    setCarregando(false);
                    response.data.forEach((item) => {
                      item.ordem = tmpordem + 1;
                      setOrdem(tmpordem + 1);
                      tmpordem += 1;
                      setCarregando(true);
                      apiUpdate('FieldForm', item).then((response) => {
                        if (response.status === 200) {
                          setCarregando(false);
                        }
                      });
                    });
                  }
                });
              }
            } else {
              addToast(response.data.mensagem, {
                placement: 'bottom-rigth',
                appearance: 'danger',
                autoDismiss: false
              });
            }
          });
        }
      });
    } else {
      addToast('Não possui nenhum registro para ser excluído !', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
    }
  };

  return (
    <React.Fragment>
      <div id="frmdashquery" name="frmdashquery">
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '10px' }}>
          <Row style={{ marginBottom: '5px' }}>
            <Col lg={3}>
              <Row>
                <Col lg={1}>
                  <div style={{ height: '25px', width: '25px', backgroundColor: '#ffff99', border: 'solid', borderWidth: '2px' }}></div>
                </Col>
                <Col lg={10}>
                  <p style={{ marginTop: '4px', marginLeft: '6px' }} className="text-muted">
                    Parâmetro Padrão
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
          <AGGrid
            width="100%"
            height="470px"
            rows={rows}
            columns={columns}
            loading={carregando}
            item={itemselec}
            setItem={(data) => setItemselec(data)}
            onKeyDown={keyGrid}
            onDoubleClick={dblClickGrid}
            validations={validations}
          ></AGGrid>
        </Row>
        <Row style={{ textAlign: 'center', marginTop: '10px' }}>
          <Col>
            <Button id="btnIncluir" className="btn btn-primary shadow-2  mb-2" disabled={!disabled} onClick={(e) => Novo()}>
              <i className={'feather icon-star'} /> Nova Consulta
            </Button>
            {rows !== undefined && rows.length > 0 ? (
              <Button id="btnExcluir" className="btn btn-primary shadow-2  mb-2" disabled={!disabled} onClick={(e) => Excluir()}>
                <i className={'feather icon-trash'} /> Excluir Consulta
              </Button>
            ) : (
              <></>
            )}
            {rows !== undefined && rows.length > 0 ? (
              <Button id="btnUp" className="btn btn-primary shadow-2 mb-2" disabled={!disabled} onClick={(e) => Upp()}>
                <i className={'feather icon-chevron-up'} /> Subir
              </Button>
            ) : (
              <></>
            )}
            {rows !== undefined && rows.length > 0 ? (
              <Button id="btnDown" className="btn btn-primary shadow-2 mb-2" disabled={!disabled} onClick={(e) => Down()}>
                <i className={'feather icon-chevron-down'} /> Descer
              </Button>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Modal backdrop="static" size="lg" show={showitem} centered={true} onHide={handleCloseShowitem}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-search h1'} />
            &nbsp;Definição de Consultas
          </Modal.Header>
          <ModalBody>
            <DashboardItem
              dashboard={dashboard}
              itemselec={itemselec}
              setItemselec={(data) => setItemselec(data)}
              rows={rows}
              setRows={(data) => setRows(data)}
              showitem={showitem}
              setShowitem={(data) => setShowitem(data)}
            ></DashboardItem>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default DashboardQuery;
