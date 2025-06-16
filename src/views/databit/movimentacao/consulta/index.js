import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { Decode64 } from '../../../../utils/crypto';
import { CreateObject } from '../../../../components/CreateObject';
import { apiList } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';
import { findModule } from '../../dashboard/findmodule';
import DashboardFind from '../../dashboard/find';
import { addMonths } from '../../../../utils/addmonths';
import chance1 from '../../../../assets/images/databit/chance1.png';
import chance2 from '../../../../assets/images/databit/chance2.png';
import chance3 from '../../../../assets/images/databit/chance3.png';
import chance4 from '../../../../assets/images/databit/chance4.png';
import chance5 from '../../../../assets/images/databit/chance5.png';
import MovimentacaoConsultaItem from '../produto';
import StatusHistorico from '../../prevenda/status/historico';
import MovimentacaoHistorico from '../historico';

const MovimentacaoConsulta = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [itemselec, setItemselec] = React.useState();
  const [fieldsfilter, setFieldsfilter] = React.useState([]);
  const [validations, setValidations] = React.useState([]);
  const [dashboards, setDashboards] = React.useState([]);
  const [showdash, setShowdash] = useState(false);
  const handleCloseShowdash = () => setShowdash(false);
  const [showitem, setShowitem] = useState(false);
  const handleCloseShowitem = () => setShowitem(false);
  const [showhistpre, setShowhistpre] = useState(false);
  const handleCloseShowhistpre = () => setShowhistpre(false);
  const [showhistven, setShowhistven] = useState(false);
  const handleCloseShowhistven = () => setShowhistven(false);

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

    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 100 },
      { headerClassName: 'header-list', field: 'codemp', headerName: 'Emp.', width: 70 },
      { headerClassName: 'header-list', field: 'data', headerName: 'Data', width: 116, type: 'date' },
      { headerClassName: 'header-list', field: 'nomecli', headerName: 'Nome / Razão Social do Cliente', width: 310 },
      { headerClassName: 'header-list', field: 'nomevend', headerName: 'Nome Vendedor', width: 210 },
      { headerClassName: 'header-list', field: 'nomepag', headerName: 'Condição', width: 170 },
      { headerClassName: 'header-list', field: 'qtde', headerName: 'Qtde.', width: 92, type: 'number' },
      { headerClassName: 'header-list', field: 'vlrnota', headerName: 'Valor', width: 122, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'operacao', headerName: 'Operação', width: 126 },
      {
        headerClassName: 'header-list',
        field: 'chance',
        headerName: 'Chance (Pré-Vendas)',
        width: 200,
        renderCell: (params) => {
          switch (params.data.chance) {
            case 0:
            case 1: {
              return <img src={chance1} alt={params.data.chance} width="180" height="30" />;
            }
            case 2: {
              return <img src={chance2} alt={params.data.chance} width="180" height="30" />;
            }
            case 3: {
              return <img src={chance3} alt={params.data.chance} width="180" height="30" />;
            }
            case 4: {
              return <img src={chance4} alt={params.data.chance} width="180" height="30" />;
            }
            case 5: {
              return <img src={chance5} alt={params.data.chance} width="180" height="30" />;
            }
          }
        }
      }
    ]);

    const data2 = new Date();
    const data1 = addMonths(data2, -1);
    valuesfield[11] = data1;
    valuesfield[12] = data2;
    setValuesfield([...valuesfield]);

    setFields([
      {
        id: 0,
        campo: 'CODIGO',
        funcao: 'Código',
        tipo: 'varchar',
        nome: 'codigo',
        tipoobject: 1,
        tamanho: 6,
        widthfield: 6,
        measure: '6rem',
        disabled: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'CODCLI',
        funcao: 'Cliente',
        tipo: 'varchar',
        nome: 'codcli',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 29,
        measure: '30rem',
        tabelaref: 'TB01008',
        widthname: 21,
        disabled: valuesdisable[1]
      },
      {
        id: 2,
        campo: 'CODVEN',
        funcao: 'Vendedor',
        tipo: 'varchar',
        nome: 'vendedor',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 30,
        measure: '30rem',
        tabelaref: 'TB01006',
        widthname: 21,
        disabled: valuesdisable[2]
      },
      {
        id: 3,
        campo: 'CODEMP',
        funcao: 'Empresa',
        tipo: 'varchar',
        nome: 'empresa',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 29,
        measure: '29rem',
        tabelaref: 'TB01007',
        widthname: 20,
        disabled: valuesdisable[3]
      },
      {
        id: 4,
        campo: 'CONDPAG',
        funcao: 'Condição',
        tipo: 'varchar',
        nome: 'condpag',
        tipoobject: 2,
        tamanho: 3,
        widthfield: 36,
        measure: '36rem',
        tabelaref: 'TB01014',
        widthname: 27,
        disabled: valuesdisable[4]
      },
      {
        id: 5,
        campo: 'STATUPRE',
        funcao: 'Status Pré-Venda',
        tipo: 'varchar',
        nome: 'statuspre',
        tipoobject: 2,
        tamanho: 3,
        widthfield: 30,
        measure: '30rem',
        tabelaref: 'TB01156',
        widthname: 21,
        disabled: valuesdisable[5]
      },
      {
        id: 6,
        campo: 'STATUSVEN',
        funcao: 'Status Venda',
        tipo: 'varchar',
        nome: 'statusven',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 29,
        measure: '29rem',
        tabelaref: 'TB01021',
        widthname: 20,
        disabled: valuesdisable[6]
      },
      {
        id: 7,
        campo: 'TIPODESC',
        funcao: 'Operação Venda',
        tipo: 'varchar',
        nome: 'statusven',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 36,
        measure: '36rem',
        tabelaref: 'TB01022',
        widthname: 27,
        disabled: valuesdisable[7]
      },
      {
        id: 8,
        campo: 'TIPOPRE',
        funcao: 'Tipo Venda',
        tipo: 'varchar',
        nome: 'tipopre',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 30,
        measure: '30rem',
        tabelaref: 'TB01160',
        widthname: 21,
        disabled: valuesdisable[8]
      },
      {
        id: 9,
        campo: 'TIPOOP',
        funcao: 'Tipo Operação',
        tipo: 'varchar',
        nome: 'tipoop',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 14,
        measure: '14rem',
        itens: 'Todos,Pré-Vendas,Orçamentos,Vendas',
        values: 'T,0,1,2',
        disabled: valuesdisable[9]
      },
      {
        id: 10,
        campo: 'CHANCE',
        funcao: 'Chance de Fechamento',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 15,
        measure: '15rem',
        itens: '0 - Todos,1 - Muito Baixa,2 - Baixa,3 - Média,4 - Alta,5 - Muito Alta',
        values: '0,1,2,3,4,5',
        disabled: valuesdisable[10]
      }
    ]);

    setFieldsfilter([
      {
        id: 11,
        campo: 'DATA1',
        funcao: 'Data de',
        tipo: 'datetime',
        nome: 'data1',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '9rem',
        disabled: valuesdisable[11]
      },
      {
        id: 12,
        campo: 'DATA2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'data2',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '9rem',
        disabled: valuesdisable[12]
      },
      {
        id: 13,
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
        disabled: valuesdisable[13]
      }
    ]);
    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['tipoop', 'tipoop', 'tipoop'];
    validation['sinal'] = [1, 1, 1];
    validation['tipotab'] = 'G';
    validation['valorval'] = [0, 1, 2];
    validation['cor'] = ['#ccffeb', '#ffff', '#b3e6ff'];
    validation['total'] = 3;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);
  }, []);

  useEffect(() => {
    if (Decode64(sessionStorage.getItem('manager')) === 'N') {
      let seller = Decode64(sessionStorage.getItem('seller'));
      if (seller !== 'ZZZZ' && (valuesfield[9] === '' || valuesfield[9] === undefined || valuesfield[9] === null)) {
        valuesfield[2] = Decode64(sessionStorage.getItem('seller'));
        valuesdisable[2] = true;
        setValuesfield([...valuesfield]);
        setValuesdisable([...valuesdisable]);
      }
    }
    Filtrar();
  }, [fields]);

  const Filtrar = () => {
    setCarregando(true);
    let sql = ' 0 = 0 ';
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      sql = sql + " and CODIGO = '" + valuesfield[0] + "' ";
    }
    if (valuesfield[1] !== '' && valuesfield[1] !== undefined) {
      sql = sql + " and CODCLI = '" + valuesfield[1] + "' ";
    }
    if (valuesfield[2] !== '' && valuesfield[2] !== undefined) {
      sql = sql + " and VEND = '" + valuesfield[2] + "' ";
    }
    if (valuesfield[3] !== '' && valuesfield[3] !== undefined) {
      sql = sql + " and CODEMP = '" + valuesfield[3] + "' ";
    }
    if (valuesfield[4] !== '' && valuesfield[4] !== undefined) {
      sql = sql + " and CONDPAG = '" + valuesfield[4] + "' ";
    }
    if (valuesfield[5] !== '' && valuesfield[5] !== undefined) {
      sql = sql + " and STATUS = '" + valuesfield[5] + "' AND  TIPOOP = 0 ";
    }
    if (valuesfield[6] !== '' && valuesfield[6] !== undefined) {
      sql = sql + " and STATUS = '" + valuesfield[6] + "' AND  TIPOOP <> 0 ";
    }
    if (valuesfield[7] !== '' && valuesfield[7] !== undefined) {
      sql = sql + " and TIPODESC = '" + valuesfield[7] + "' ";
    }
    if (valuesfield[8] !== '' && valuesfield[8] !== undefined) {
      sql = sql + " and TIPO = '" + valuesfield[8] + "' ";
    }
    if (valuesfield[9] !== '' && valuesfield[9] !== 'T' && valuesfield[9] !== undefined) {
      sql = sql + " and TIPOOP = '" + valuesfield[9] + "' ";
    }
    if (valuesfield[10] !== '' && valuesfield[10] !== undefined) {
      let chance = parseInt(valuesfield[10]);
      if (chance !== 0) {
        sql = sql + ' and CHANCE = ' + valuesfield[10];
      }
    }
    if (
      valuesfield[11] !== '' &&
      valuesfield[11] !== undefined &&
      valuesfield[11] !== null &&
      valuesfield[12] !== '' &&
      valuesfield[12] !== undefined &&
      valuesfield[12] !== null
    ) {
      const tmdata3 = Date.parse(valuesfield[11]);
      const dt3 = new Date(tmdata3);
      const data3 = dt3.toLocaleDateString('en-US');

      const tmdata4 = Date.parse(valuesfield[12]);
      const dt4 = new Date(tmdata4);
      const data4 = dt4.toLocaleDateString('en-US');
      sql = sql + " and DATA BETWEEN '" + data3 + " 00:00:00' AND '" + data4 + " 23:59:00' ";
    }
    sql = sql + ' ORDER BY DATA DESC ';
    apiList('ConsultaMovimentoVW', '*', '', sql).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        findModule('CN02022').then((response) => {
          setCarregando(false);
          setDashboards(response.data);
        });
      }
    });
  };

  const Historico = () => {
    if (itemselec !== undefined) {
      if (itemselec.tipoop === 0) {
        setShowhistpre(true);
      } else {
        setShowhistven(true);
      }
    }
  };

  return (
    <React.Fragment>
      <div id="frmconsulta" name="frmconsulta">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px' }}>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Consulta de Movimentações</Card.Title>
              </Card.Header>
              {valuesfield[13] === 'N' ? (
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
                <Col style={{ textAlign: 'left', marginTop: '30px' }}>
                  <Button id="btnFiltrar" className="btn-primary shadow-2 mb-2" onClick={(e) => Filtrar()}>
                    <i className={'feather icon-filter'} /> Filtrar
                  </Button>
                  <Button id="brnProdutos" className="btn btn-warning shadow-2 mb-2" onClick={(e) => setShowitem(true)}>
                    <i className={'feather icon-box'} /> Produtos
                  </Button>
                  <Button id="btnHistorico" className="btn btn-success shadow-2 mb-2" onClick={(e) => Historico()}>
                    <i className={'feather icon-list'} /> Histórico
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
                  rowHeight={42}
                  rows={rows}
                  columns={columns}
                  loading={carregando}
                  item={itemselec}
                  setItem={(data) => setItemselec(data)}
                  validations={validations}
                  focus={true}
                ></AGGrid>
              </div>
              <Row style={{ marginLeft: '10px', marginRight: '10px', height: '35px', marginBottom: '10px' }}>
                <Col style={{ marginTop: '5px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#ccffeb', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Pré-Vendas
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: '5px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#fff', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Orçamentos
                      </p>
                    </Col>
                  </Row>
                </Col>

                <Col style={{ marginTop: '5px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#b3e6ff', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Vendas
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Row>
        </Row>
        <Modal backdrop="static" fullscreen={true} show={showdash} centered={true} onHide={handleCloseShowdash}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-bar-chart h1'} />
            &nbsp;Gráficos
          </Modal.Header>
          <ModalBody>
            <DashboardFind
              module={'CN02022'}
              showdash={showdash}
              principal={false}
              setShowdash={(data) => setShowdash(data)}
            ></DashboardFind>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="xl" show={showitem} centered={true} onHide={handleCloseShowitem}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-box h1'} />
            &nbsp;Produtos da Movimentação selecionada
          </Modal.Header>
          <ModalBody>
            {itemselec !== undefined ? (
              <MovimentacaoConsultaItem codigo={itemselec.codigo} tipo={itemselec.tipoop}></MovimentacaoConsultaItem>
            ) : (
              <></>
            )}
          </ModalBody>
          <ModalFooter>
            <Row style={{ textAlign: 'right' }}>
              <Col style={{ textAlign: 'right' }}>
                <Button id="btnFechar" className="btn-success shadow-2 mb-2" onClick={(e) => setShowitem(false)}>
                  <i className={'feather icon-x'} /> Fechar
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
        <Modal backdrop="static" size="xl" show={showhistpre} centered={true} onHide={handleCloseShowhistpre}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-list h1'} />
            &nbsp;Histórico de Atendimento
          </Modal.Header>
          <ModalBody>
            {itemselec !== undefined ? (
              <StatusHistorico
                prevenda={itemselec.codigo}
                showhist={showhistpre}
                setShowhist={(data) => setShowhistpre(data)}
              ></StatusHistorico>
            ) : (
              <></>
            )}
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="xl" show={showhistven} centered={true} onHide={handleCloseShowhistven}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-list h1'} />
            &nbsp;Histórico de Atendimento
          </Modal.Header>
          <ModalBody>
            {itemselec !== undefined ? (
              <MovimentacaoHistorico
                codigo={itemselec.codigo}
                tipo={'V'}
                showhist={showhistven}
                setShowhist={(data) => setShowhistven(data)}
              ></MovimentacaoHistorico>
            ) : (
              <></>
            )}
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default MovimentacaoConsulta;
