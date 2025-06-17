import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { Decode64 } from '../../../../utils/crypto';
import { CreateObject } from '../../../../components/CreateObject';
import { apiList } from '../../../../api/crudapi';
import ContratoAcompanhamento from '../acompanhamento';
import AGGrid from '../../../../components/AGGrid';
import VisaoTotal from './total';
import ContratoVisaoEquipamento from './equipamento';
import { findModule } from '../../dashboard/findmodule';
import DashboardFind from '../../dashboard/find';

const ContratoVisao = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [itemselec, setItemselec] = React.useState();
  const [codselec, setCodselec] = React.useState();
  const [contratoselec, setContratoselec] = React.useState();
  const [showacompanha, setShowacompanha] = useState(false);
  const [fieldsfilter, setFieldsfilter] = React.useState([]);
  const [showtotal, setShowtotal] = useState(false);
  const [showequip, setShowequip] = useState(false);
  const [campo, setCampo] = useState('nome');
  const [nomecampo, setNomecampo] = useState('Nome / Razão Social do Cliente');
  const [validations, setValidations] = React.useState([]);
  const [dashboards, setDashboards] = React.useState([]);
  const [showdash, setShowdash] = useState(false);
  const handleCloseShowdash = () => setShowdash(false);

  useEffect(() => {
    setValuesdisable([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);

    valuesfield[11] = 'L';
    valuesfield[16] = '0';
    setValuesfield([...valuesfield]);

    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Contrato', width: 119 },
      { headerClassName: 'header-list', field: 'codemp', headerName: 'Empresa', width: 70 },
      { headerClassName: 'header-list', field: 'dtinicio', headerName: 'Início', width: 106 },
      { headerClassName: 'header-list', field: 'venccontr', headerName: 'Vencimento', width: 106, type: 'date' },
      { headerClassName: 'header-list', field: campo, headerName: nomecampo, width: 305 },
      { headerClassName: 'header-list', field: 'cidade', headerName: 'Cidade', width: 170 },
      { headerClassName: 'header-list', field: 'estado', headerName: 'UF', width: 60 },
      { headerClassName: 'header-list', field: 'nomeven', headerName: 'Nome Vendedor', width: 220 },
      { headerClassName: 'header-list', field: 'qtde', headerName: 'Qtde.', width: 88, type: 'number' },
      { headerClassName: 'header-list', field: 'qtlidas', headerName: 'Lidas.', width: 88, type: 'number' },
      { headerClassName: 'header-list', field: 'vlrnota', headerName: 'Valor', width: 88, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'nomefatura', headerName: 'Faturamento', width: 106 }
    ]);

    setFields([
      {
        id: 0,
        campo: 'CONTRATO',
        funcao: 'Número Contrato',
        tipo: 'varchar',
        nome: 'contrato',
        tipoobject: 1,
        tamanho: 12,
        widthfield: 12,
        measure: '11rem',
        disabled: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'DTINICIO',
        funcao: 'Início de',
        tipo: 'datetime',
        nome: 'dtinicio',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '9rem',
        disabled: valuesdisable[1]
      },
      {
        id: 2,
        campo: 'DTINICIO2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'dtinicio2',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '9rem',
        disabled: valuesdisable[2]
      },
      {
        id: 3,
        campo: 'VENCCONTR',
        funcao: 'Vencimento de',
        tipo: 'datetime',
        nome: 'venccontr',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '9rem',
        disabled: valuesdisable[3]
      },
      {
        id: 4,
        campo: 'VENCCONTR2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'venccontr2',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '9rem',
        disabled: valuesdisable[4]
      },
      {
        id: 5,
        campo: 'CIDADE',
        funcao: 'Cidade',
        tipo: 'varchar',
        nome: 'cidade',
        tipoobject: 1,
        tamanho: 30,
        widthfield: 12,
        measure: '20rem',
        disabled: valuesdisable[5]
      },
      {
        id: 6,
        campo: 'ESTADO',
        funcao: 'UF',
        tipo: 'varchar',
        nome: 'estado',
        tipoobject: 1,
        tamanho: 2,
        widthfield: 12,
        measure: '6rem',
        disabled: valuesdisable[6]
      },
      {
        id: 7,
        campo: 'TITULO',
        funcao: 'Título Contrato',
        tipo: 'varchar',
        nome: 'titulo',
        tipoobject: 1,
        tamanho: 60,
        widthfield: 12,
        measure: '22rem',
        disabled: valuesdisable[7]
      },
      {
        id: 8,
        campo: 'CODCLI',
        funcao: 'Cliente',
        tipo: 'varchar',
        nome: 'codcli',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01008',
        widthname: 23,
        disabled: valuesdisable[8]
      },
      {
        id: 9,
        campo: 'CODVEN',
        funcao: 'Vendedor',
        tipo: 'varchar',
        nome: 'vendedor',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB01006',
        widthname: 22,
        disabled: valuesdisable[9]
      },
      {
        id: 10,
        campo: 'CODEMP',
        funcao: 'Empresa',
        tipo: 'varchar',
        nome: 'empresa',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01007',
        widthname: 23,
        disabled: valuesdisable[10]
      },
      {
        id: 17,
        campo: 'GRUPO',
        funcao: 'Grupo Econômico',
        tipo: 'varchar',
        nome: 'grupo',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01107',
        widthname: 23,
        disabled: valuesdisable[17]
      },
      {
        id: 11,
        campo: 'TIPOCONTR',
        funcao: 'Tipo Contrato',
        tipo: 'varchar',
        nome: 'tipocontr',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 19,
        measure: '15rem',
        itens: 'Todos,Contrato de Locação,Contrato de Garantia,Contrato de Manutenção,Serviço Avulso',
        values: 'Y,L,G,M,A',
        disabled: valuesdisable[11]
      },
      {
        id: 12,
        campo: 'TIPOFRANQUIA',
        funcao: 'Tipo de Franquia',
        tipo: 'varchar',
        nome: 'tipofranquia',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 19,
        measure: '16rem',
        itens: 'Todos,Por Tonalidade,Global',
        values: 'Y,T,G',
        disabled: valuesdisable[12]
      },
      {
        id: 13,
        campo: 'ANALFRANQUIA',
        funcao: 'Analise de Franquia',
        tipo: 'varchar',
        nome: 'analfranquia',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 19,
        measure: '16rem',
        itens: 'Todos,Por Contrato (Total),Por Equipamento,Por Grupo,Compensatório,Compensatório por Grupo',
        values: 'Y,T,M,G,E,W',
        disabled: valuesdisable[13]
      },
      {
        id: 14,
        campo: 'POSFATURA',
        funcao: 'Faturamento',
        tipo: 'varchar',
        nome: 'posfatura',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 19,
        measure: '16rem',
        itens: 'Todos,Pendente,À Faturar,Faturado',
        values: 'T,0,1,2',
        disabled: valuesdisable[14]
      }
    ]);

    setFieldsfilter([
      {
        id: 15,
        campo: 'OCULTA',
        funcao: 'Ocultar Filtros',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '10rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: valuesdisable[15]
      },
      {
        id: 16,
        campo: 'CAMPO',
        funcao: 'Visualizar qual campo',
        tipo: 'varchar',
        nome: 'campo',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 19,
        measure: '23rem',
        itens: 'Nome / Razão Social do Cliente,Título do Contrato',
        values: '0,1',
        disabled: valuesdisable[16]
      }
    ]);
    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['posfatura', 'posfatura', 'posfatura'];
    validation['sinal'] = [1, 1, 1];
    validation['tipotab'] = 'G';
    validation['valorval'] = [2, 1, 0];
    validation['cor'] = ['#00ff99', '#ffff', '#ff6666'];
    validation['total'] = 3;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);
  }, []);

  useEffect(() => {
    let valor = parseInt(valuesfield[16]);
    console.log(valor);
    switch (valor) {
      case 0: {
        setCampo('nome');
        setNomecampo('Nome / Razão Social do Cliente');
        break;
      }
      case 1: {
        setCampo('titulo');
        setNomecampo('Título do Contrato');
        break;
      }
    }
  }, [valuesfield[16]]);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Contrato', width: 119 },
      { headerClassName: 'header-list', field: 'codemp', headerName: 'Empresa', width: 70 },
      { headerClassName: 'header-list', field: 'dtinicio', headerName: 'Início', width: 106 },
      { headerClassName: 'header-list', field: 'venccontr', headerName: 'Vencimento', width: 106 },
      { headerClassName: 'header-list', field: campo, headerName: nomecampo, width: 305 },
      { headerClassName: 'header-list', field: 'cidade', headerName: 'Cidade', width: 170 },
      { headerClassName: 'header-list', field: 'estado', headerName: 'UF', width: 60 },
      { headerClassName: 'header-list', field: 'nomeven', headerName: 'Nome Vendedor', width: 210 },
      { headerClassName: 'header-list', field: 'qtde', headerName: 'Qtde.', width: 88, type: 'number' },
      { headerClassName: 'header-list', field: 'qtlidas', headerName: 'Lidas.', width: 88, type: 'number' },
      { headerClassName: 'header-list', field: 'vlrnota', headerName: 'Valor', width: 88, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'nomefatura', headerName: 'Faturamento', width: 106 }
    ]);
  }, [campo]);

  const Filtrar = () => {
    setCarregando(true);
    let sql = "SITUACAO = 'A' ";
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      sql = sql + " and CODIGO LIKE '" + valuesfield[0] + "%' ";
    }
    if (
      valuesfield[1] !== '' &&
      valuesfield[1] !== undefined &&
      valuesfield[1] !== null &&
      valuesfield[2] !== '' &&
      valuesfield[2] !== undefined &&
      valuesfield[2] !== null
    ) {
      const tmdata1 = Date.parse(valuesfield[1]);
      const dt1 = new Date(tmdata1);
      const data1 = dt1.toLocaleDateString('en-US');

      const tmdata2 = Date.parse(valuesfield[2]);
      const dt2 = new Date(tmdata2);
      const data2 = dt2.toLocaleDateString('en-US');
      sql = sql + " and DTINICIO BETWEEN '" + data1 + " 00:00:00' AND '" + data2 + " 23:59:00' ";
    }
    if (
      valuesfield[3] !== '' &&
      valuesfield[3] !== undefined &&
      valuesfield[3] !== null &&
      valuesfield[4] !== '' &&
      valuesfield[4] !== undefined &&
      valuesfield[4] !== null
    ) {
      const tmdata1 = Date.parse(valuesfield[3]);
      const dt1 = new Date(tmdata1);
      const data1 = dt1.toLocaleDateString('en-US');

      const tmdata2 = Date.parse(valuesfield[4]);
      const dt2 = new Date(tmdata2);
      const data2 = dt2.toLocaleDateString('en-US');
      sql = sql + " and VENCCONTR BETWEEN '" + data1 + " 00:00:00' AND '" + data2 + " 23:59:00' ";
    }
    if (valuesfield[5] !== '' && valuesfield[5] !== undefined) {
      sql = sql + " and CIDADE LIKE '" + valuesfield[5] + "%' ";
    }
    if (valuesfield[6] !== '' && valuesfield[6] !== undefined) {
      sql = sql + " and ESTADO = '" + valuesfield[6] + "' ";
    }
    if (valuesfield[7] !== '' && valuesfield[7] !== undefined) {
      sql = sql + " and TITULO LIKE '" + valuesfield[7] + "%' ";
    }
    if (valuesfield[8] !== '' && valuesfield[8] !== undefined) {
      sql = sql + " and CODCLI = '" + valuesfield[8] + "' ";
    }
    if (valuesfield[9] !== '' && valuesfield[9] !== undefined) {
      sql = sql + " and CODVEN = '" + valuesfield[9] + "' ";
    }
    if (valuesfield[10] !== '' && valuesfield[10] !== undefined) {
      sql = sql + " and CODEMP = '" + valuesfield[10] + "' ";
    }
    if (valuesfield[11] !== 'Y' && valuesfield[11] !== undefined) {
      sql = sql + " and TIPOCONTR = '" + valuesfield[11] + "' ";
    }
    if (valuesfield[12] !== 'Y' && valuesfield[12] !== undefined) {
      sql = sql + " and TIPOFRANQUIA = '" + valuesfield[12] + "' ";
    }
    if (valuesfield[13] !== 'Y' && valuesfield[13] !== undefined) {
      sql = sql + " and NALFRANQUIA = '" + valuesfield[13] + "' ";
    }
    if (valuesfield[14] !== 'T' && valuesfield[14] !== undefined) {
      sql = sql + " and POSFATURA = '" + valuesfield[14] + "' ";
    }
    if (valuesfield[17] !== '' && valuesfield[17] !== undefined) {
      sql = sql + " and GRUPO = '" + valuesfield[17] + "' ";
    }
    apiList('ContratoVisaoVW', '*', '', sql).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        findModule('TB00164').then((response) => {
          setCarregando(false);
          setDashboards(response.data);
        });
      }
    });
  };

  useEffect(() => {
    if (Decode64(sessionStorage.getItem('manager')) === 'N') {
      let seller = Decode64(sessionStorage.getItem('seller'));
      if (seller !== 'ZZZZ' && (valuesfield[9] === '' || valuesfield[9] === undefined || valuesfield[9] === null)) {
        valuesfield[9] = Decode64(sessionStorage.getItem('seller'));
        valuesdisable[9] = true;
        setValuesfield([...valuesfield]);
        setValuesdisable([...valuesdisable]);
      }
    }
    Filtrar();
  }, [fields]);

  const handleCloseacompanha = () => {
    setShowacompanha(false);
  };

  const handleClosetotal = () => {
    setShowtotal(false);
  };

  const handleCloseequip = () => {
    setShowequip(false);
  };

  useEffect(() => {
    if (itemselec !== undefined) {
      setCodselec(itemselec.codigo);
      setContratoselec(itemselec.codigo);
    }
  }, [itemselec]);

  const Acompanhamento = () => {
    if (itemselec !== '' && itemselec !== undefined) {
      setShowacompanha(true);
    }
  };

  const clickGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setShowacompanha(true);
  };

  const keyGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  return (
    <React.Fragment>
      <div id="frmvisao" name="frmvisao">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px' }}>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Visão de Contratos</Card.Title>
              </Card.Header>
              {valuesfield[15] === 'N' ? (
                <div>
                  <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                    {fields.map((field) => (
                      <CreateObject
                        key={field.id}
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
                </div>
              ) : (
                <></>
              )}
              <Row style={{ marginLeft: '5px', marginBottom: '10px' }}>
                {fieldsfilter.map((field) => (
                  <CreateObject
                    key={field.id}
                    field={field}
                    index={field.id}
                    fields={fieldsfilter}
                    valuesfield={valuesfield}
                    setValuesfield={(data) => setValuesfield(data)}
                    valuesfield2={valuesfield2}
                    setValuesfield2={(data) => setValuesfield2(data)}
                    disabled={valuesdisable[field.id]}
                  ></CreateObject>
                ))}
                <Col style={{ textAlign: 'center', marginTop: '30px' }}>
                  <Button id="btnFiltrar" className="btn-primary shadow-2 mb-2" onClick={() => Filtrar()}>
                    <i className={'feather icon-filter'} /> Filtrar
                  </Button>
                  <Button id="btnAcompanhamento" className="btn btn-primary shadow-2 mb-2" onClick={() => Acompanhamento()}>
                    <i className={'feather icon-book'} /> Acompanhamento
                  </Button>
                  <Button id="btnTotais" className="btn btn-warning shadow-2 mb-2" onClick={() => setShowtotal(true)}>
                    <i className={'feather icon-plus'} /> Totais
                  </Button>
                  <Button id="btnTotais" className="btn btn-success shadow-2 mb-2" onClick={() => setShowequip(true)}>
                    <i className={'feather icon-printer'} /> Equipamentos
                  </Button>
                  {dashboards !== undefined && dashboards.length > 0 ? (
                    <Button id="btnGraficos" className="btn btn-success shadow-2 mb-2" onClick={(e) => setShowdash(true)}>
                      <i className={'feather icon-bar-chart'} /> Gráficos
                    </Button>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>

              <div style={{ marginBottom: '10px' }}>
                <AGGrid
                  width="100%"
                  height="500px"
                  rows={rows}
                  columns={columns}
                  loading={carregando}
                  item={itemselec}
                  setItem={(data) => setItemselec(data)}
                  onKeyDown={keyGrid}
                  onDoubleClick={dblClickGrid}
                  onCelClick={clickGrid}
                  validations={validations}
                ></AGGrid>
              </div>
              <Row style={{ marginLeft: '10px', marginRight: '10px', height: '35px', marginBottom: '10px' }}>
                <Col style={{ marginTop: '5px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#fff', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Contrato à Faturar
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: '5px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#00ff99', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Contrato Faturado
                      </p>
                    </Col>
                  </Row>
                </Col>

                <Col style={{ marginTop: '5px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#ff6666', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Contrato Pendente de Faturamento
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Row>
        </Row>
        <Modal backdrop="static" fullscreen={true} show={showacompanha} centered={true} onHide={handleCloseacompanha}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-book'} />
            &nbsp;Acompanhamento de Contratos
          </Modal.Header>
          <ModalBody>
            <ContratoAcompanhamento contrato={contratoselec}></ContratoAcompanhamento>
          </ModalBody>
          <ModalFooter>
            <Button id="btnFechar" className="btn btn-success shadow-2 mb-2" onClick={handleCloseacompanha}>
              <i className={'feather icon-x-circle'} />
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
        <Modal backdrop="static" size="lg" show={showtotal} centered={true} onHide={handleClosetotal}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-plus'} />
            &nbsp;Totalizadores
          </Modal.Header>
          <ModalBody>
            <VisaoTotal rows={rows} setRows={(data) => setRows(data)}></VisaoTotal>
          </ModalBody>
          <ModalFooter>
            <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleClosetotal}>
              <i className={'feather icon-x-circle'} />
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
        <Modal backdrop="static" fullscreen={true} show={showequip} centered={true} onHide={handleCloseequip}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-printer'} />
            &nbsp;Equipamentos do Contrato
          </Modal.Header>
          <ModalBody>
            <ContratoVisaoEquipamento
              contrato={contratoselec}
              showequip={showequip}
              setShowequip={(data) => setShowequip(data)}
            ></ContratoVisaoEquipamento>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" fullscreen={true} show={showdash} centered={true} onHide={handleCloseShowdash}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-bar-chart h1'} />
            &nbsp;Gráficos
          </Modal.Header>
          <ModalBody>
            <DashboardFind
              module={'TB00164'}
              showdash={showdash}
              principal={false}
              setShowdash={(data) => setShowdash(data)}
            ></DashboardFind>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ContratoVisao;
