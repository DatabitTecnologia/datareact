import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiFind, apiList } from '../../../../../api/crudapi';
import AGGrid from '../../../../../components/AGGrid';
import GmoEquipamento from '../equipamento';
import ProdutoInfor from '../../../produto/informacoes';
import aprovado from '../../../../../assets/images/databit/aprovado.png';
import contratado from '../../../../../assets/images/databit/contratado.png';
import liberado from '../../../../../assets/images/databit/liberado.png';
import pendente from '../../../../../assets/images/databit/pendente.png';
import instalada from '../../../../../assets/images/databit/instalado.png';
import entregue from '../../../../../assets/images/databit/entregue2.png';
import aliberar from '../../../../../assets/images/databit/aliberar.png';
import transito from '../../../../../assets/images/databit/transito.png';
import desinstalada from '../../../../../assets/images/databit/desinstalado.png';
import retirar from '../../../../../assets/images/databit/retirar.png';
import retirada from '../../../../../assets/images/databit/retirada.png';
import GmoResumoQtde from './qtde';
import GmoResumoRequisicao from './requisicao';
import GmoTransito from '../transito';
import GmoResumoPedido from './pedido';
import { Password } from '../../../../../components/Password';

const GmoResumo = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [contrato, setContrato] = React.useState([]);
  const [fieldscontrato, setFieldscontrato] = React.useState([]);
  const [fieldsfilter, setFieldsfilter] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const { showgmoequip, setShowgmoequip } = props;
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [itemselec, setItemselec] = React.useState();
  const [showparque, setShowparque] = React.useState(false);
  const [showprod, setShowprod] = React.useState(false);
  const [totais, setTotais] = React.useState([]);
  const [validations, setValidations] = React.useState([]);
  const [showlanc, setShowlanc] = React.useState(false);
  const [showreq, setShowreq] = React.useState(false);
  const [showped, setShowped] = React.useState(false);
  const [gerado, setGerado] = React.useState(false);
  const [showtran, setShowtran] = React.useState(false);
  const { operacao, setOperacao } = props;
  const [senhareq, setSenhareq] = React.useState([]);
  const [operacaotipo, setOperacaotipo] = React.useState('');

  // <<< mantém lista de seriais selecionados vinda do filho
  const [seriaisSelecionados, setSeriaisSelecionados] = useState([]);

  useEffect(() => {
    setTotais([
      {
        id: 0,
        name: 'Contratado',
        value: 0,
        color: 'rgb(51, 153, 255)',
        background: `linear-gradient(rgba(51, 153, 255), transparent)`,
        colortitle: '#ffff',
        icon: contratado,
        visible: true
      },
      {
        id: 1,
        name: 'Total Aprovado',
        value: 0,
        color: 'rgb(0, 204, 0)',
        background: `linear-gradient( rgba(0, 204, 0), transparent)`,
        colortitle: '#ffff',
        icon: aprovado,
        visible: true
      },
      {
        id: 2,
        name: 'Total Pendente',
        value: 0,
        color: 'rgb(51, 204, 255)',
        background: `linear-gradient(rgba(51, 204, 255), transparent)`,
        colortitle: '#ffff',
        icon: pendente,
        visible: true
      },
      {
        id: 3,
        name: 'Em Contrato',
        value: 0,
        color: 'rgb(210, 210, 0)',
        background: `linear-gradient(rgba(210, 210, 0), transparent)`,
        colortitle: '#ffff',
        icon: liberado,
        visible: true
      },
      {
        id: 4,
        name: 'Em Trânsito',
        value: 0,
        color: 'rgb(255, 0, 0)',
        background: `linear-gradient(rgb(255, 0, 0), transparent)`,
        colortitle: '#ffff',
        icon: transito,
        visible: true
      },
      {
        id: 5,
        name: 'Total Entregue',
        value: 0,
        color: 'rgb(0, 102, 153  )',
        background: `linear-gradient(rgb(0, 102, 153), transparent)`,
        colortitle: '#ffff',
        icon: entregue,
        visible: true
      },
      {
        id: 6,
        name: 'Total Retirado',
        value: 0,
        color: 'rgb(0, 204, 122)',
        background: `linear-gradient(rgb(0, 204, 122), transparent)`,
        colortitle: '#ffff',
        icon: retirada,
        visible: true
      },
      {
        id: 7,
        name: 'Total Instalado',
        value: 0,
        color: 'rgb(255, 204, 102)',
        background: `linear-gradient(rgb(255, 204, 102), transparent)`,
        colortitle: '#ffff',
        icon: instalada,
        visible: true
      },
      {
        id: 8,
        name: 'Desinstalado',
        value: 0,
        color: 'rgb(102, 153, 0)',
        background: `linear-gradient(rgb(102, 153, 0), transparent)`,
        colortitle: '#ffff',
        icon: desinstalada,
        visible: true
      },
      {
        id: 9,
        name: 'Total à Liberar',
        value: 0,
        color: 'rgb(153, 204, 255)',
        background: `linear-gradient(rgb(153, 204, 255), transparent)`,
        colortitle: '#ffff',
        icon: aliberar,
        visible: true
      },
      {
        id: 10,
        name: 'Total à Retirar',
        value: 0,
        color: 'rgb(255, 0, 102)',
        background: `linear-gradient(rgb(255, 0, 102), transparent)`,
        colortitle: '#ffff',
        icon: retirar,
        visible: true
      }
    ]);

    setFieldscontrato([
      {
        id: 0,
        campo: 'TB02111_CODIGO',
        funcao: 'Nº Contrato',
        tipo: 'varchar',
        nome: 'codigo',
        tamanho: 12,
        tipoobject: 1,
        widthfield: 14,
        measure: '14rem',
        disabled: true
      },
      {
        id: 1,
        campo: 'TB02111_CODCLI',
        funcao: 'Cliente',
        tipo: 'varchar',
        nome: 'codcli',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01008',
        widthname: 23,
        disabled: true
      },
      {
        id: 2,
        campo: 'TB02260_NOME',
        funcao: 'Título Contrato',
        tipo: 'varchar',
        nome: 'nome',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 31,
        measure: '31rem',
        disabled: true
      },
      {
        id: 3,
        campo: 'TB02111_QTDECONTRATA',
        funcao: 'Qt. Contratada',
        tipo: 'int',
        nome: 'qtdecontrata',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        decimal: 0
      },
      {
        id: 4,
        campo: 'TB02111_VLRCONTRATA',
        funcao: 'Valor Contratado',
        tipo: 'numeric',
        nome: 'vlrcontrata',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: true,
        decimal: 2
      },
      {
        id: 5,
        campo: 'TB02111_QTDE',
        funcao: 'Qt. Instalada',
        tipo: 'int',
        nome: 'qtde',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: true,
        decimal: 0
      },
      {
        id: 6,
        campo: 'TB02111_VLRNOTA',
        funcao: 'Valor Contrato',
        tipo: 'numeric',
        nome: 'vlrnota',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        disabled: true,
        decimal: 2
      }
    ]);

    setFieldsfilter([
      {
        id: 7,
        campo: 'TB02111_PRECONTRATO',
        funcao: 'Opções de Seleção',
        tipo: 'varchar',
        nome: 'precontrato',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 25,
        measure: '25rem',
        itens: 'Somente do Pré-Contrato selecionado, Somente do Pré-Contrato e Site selecionados,Todos os Pré-Contratos',
        values: '0,1,2',
        disabled: false
      },
      {
        id: 8,
        campo: 'TB02111_PENDENTE',
        funcao: 'Opções de Exibição',
        tipo: 'varchar',
        nome: 'precontrato',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 20,
        measure: '20rem',
        itens: 'Todos os registros, Somente os itens pendentes,Somente itens concluídos',
        values: '0,1,2',
        disabled: false
      },
      {
        id: 9,
        campo: 'TB02111_REQUISICAO',
        funcao: 'Gerar Requisição',
        tipo: 'varchar',
        nome: 'requisicao',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 12,
        measure: '12rem',
        itens: 'Instalação,Desistalação',
        values: 'A,R',
        disabled: false
      }
    ]);

    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['status', 'defequip', 'operacaotipo', 'qtlanc'];
    validation['sinal'] = [1, 1, 1, 3];
    validation['tipotab'] = 'G';
    validation['valorval'] = [1, 'S', 'R', 0];
    validation['cor'] = ['#80ffd4', '#ffff99', '#ff0000', '#66ffff'];
    validation['corline'] = ['#000', '#000', '#ffff', '#000'];
    validation['total'] = 4;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);

    Filtrar();
  }, []);

  useEffect(() => {
    if (operacaotipo !== 'R' || operacaotipo === undefined || operacaotipo === '') {
      setColumns([
        { headerClassName: 'header-list', field: 'precontrato', headerName: 'Pré', width: 80 },
        { headerClassName: 'header-list', field: 'data', headerName: 'Data', width: 116, type: 'date' },
        { headerClassName: 'header-list', field: 'produto', headerName: 'Cód.', width: 70 },
        { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 120 },
        { headerClassName: 'header-list', field: 'nome', headerName: 'Modelo Equipamento', width: 180 },
        { headerClassName: 'header-list', field: 'qtcontratada', headerName: 'Contratada', width: 85, type: 'number' },
        { headerClassName: 'header-list', field: 'qtaprovada', headerName: 'Aprovada', width: 75, type: 'number' },
        { headerClassName: 'header-list', field: 'qtpendente', headerName: 'Pendente', width: 75, type: 'number' },
        { headerClassName: 'header-list', field: 'qtliberada', headerName: 'Contrato', width: 75, type: 'number' },
        { headerClassName: 'header-list', field: 'qttransito', headerName: 'Trãnsito', width: 75, type: 'number' },
        { headerClassName: 'header-list', field: 'qtentregue', headerName: 'Entregue', width: 75, type: 'number' },
        { headerClassName: 'header-list', field: 'qtinstalada', headerName: 'Instalada', width: 80, type: 'number' },
        { headerClassName: 'header-list', field: 'qtaliberar', headerName: 'À Liberar', width: 80, type: 'number' },
        { headerClassName: 'header-list', field: 'site', headerName: 'Site', width: 186 },
        { headerClassName: 'header-list', field: 'cidade', headerName: 'Cidade', width: 144 },
        { headerClassName: 'header-list', field: 'uf', headerName: 'UF', width: 60 },
        { headerClassName: 'header-list', field: 'cep', headerName: 'Cep', width: 95 },
        { headerClassName: 'header-list', field: 'previsao', headerName: 'Previsão', width: 116, type: 'date' },
        { headerClassName: 'header-list', field: 'qtlanc', headerName: 'Qt.Req.', width: 65, type: 'number' }
      ]);
    } else {
      setColumns([
        { headerClassName: 'header-list', field: 'precontrato', headerName: 'Pré', width: 80 },
        { headerClassName: 'header-list', field: 'data', headerName: 'Data', width: 116, type: 'date' },
        { headerClassName: 'header-list', field: 'produto', headerName: 'Cód.', width: 70 },
        { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 120 },
        { headerClassName: 'header-list', field: 'nome', headerName: 'Modelo Equipamento', width: 240 },
        { headerClassName: 'header-list', field: 'qtcontratada', headerName: 'Contratada', width: 80, type: 'number' },
        { headerClassName: 'header-list', field: 'qtaprovada', headerName: 'Aprovada', width: 75, type: 'number' },
        { headerClassName: 'header-list', field: 'qtpendente', headerName: 'Pendente', width: 75, type: 'number' },
        { headerClassName: 'header-list', field: 'qttransito', headerName: 'Trãnsito', width: 75, type: 'number' },
        { headerClassName: 'header-list', field: 'qtentregue', headerName: 'Retirado', width: 75, type: 'number' },
        { headerClassName: 'header-list', field: 'qtinstalada', headerName: 'Desinstalada', width: 100, type: 'number' },
        { headerClassName: 'header-list', field: 'qtaliberar', headerName: 'À Retirar', width: 80, type: 'number' },
        { headerClassName: 'header-list', field: 'site', headerName: 'Site', width: 186 },
        { headerClassName: 'header-list', field: 'cidade', headerName: 'Cidade', width: 144 },
        { headerClassName: 'header-list', field: 'uf', headerName: 'UF', width: 60 },
        { headerClassName: 'header-list', field: 'cep', headerName: 'Cep', width: 95 },
        { headerClassName: 'header-list', field: 'previsao', headerName: 'Previsão', width: 116, type: 'date' },
        { headerClassName: 'header-list', field: 'qtlanc', headerName: 'Qt.Req.', width: 65, type: 'number' }
      ]);
    }
  }, [operacaotipo]);

  useEffect(() => {
    if (itemselec !== undefined) {
      setOperacaotipo(itemselec.operacaotipo);
    }
  }, [itemselec]);

  const Filtrar = () => {
    setCarregando(true);
    let filter = "PRECONTRATO = '" + props.precontrato + "' ";
    let option = parseInt(valuesfield[8]);
    switch (option) {
      case 1:
        filter = filter + ' AND  ((QTCONTRATADA <> QTINSTALADA) OR (QTAPROVADA = 0))  ';
        break;
      case 2:
        filter = filter + '  AND ((QTCONTRATADA = QTINSTALADA) AND QTAPROVADA > 0)';
        break;
    }
    apiFind('Contrato', '*', '', "TB02111_CODIGO = '" + props.contrato + "' ").then((response) => {
      if (response.status === 200) {
        setContrato(response.data);
        apiList(
          'GmoVW',
          '*',
          ' case when ((QTCONTRATADA = QTINSTALADA) AND QTAPROVADA > 0) then 1 else case when (QTINSTALADA = QTAPROVADA) and (QTINSTALADA - QTAPROVADA) <> 0 then 2 else 0 end end as statuspre, ' +
            ' QTTRANORC + QTTRANPED AS qttransito',
          filter
        ).then((response) => {
          if (response.status === 200) {
            setRows(response.data);
            apiFind('Senha', 'TB00008_ATIVO,TB00008_SENHA,TB00008_FUNCAO', '', 'TB00008_ID = 168').then((response2) => {
              if (response2.status === 200) {
                setCarregando(false);
                setSenhareq(response2.data);
              }
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    Filtrar();
  }, [valuesfield[8]]);

  useEffect(() => {
    if (gerado && !showreq && !showped) {
      setGerado(false);
      Filtrar();
    }
  }, [gerado, showreq, showped]);

  useEffect(() => {
    valuesfield[0] = contrato.codigo;
    valuesfield[1] = contrato.codcli;
    valuesfield[2] = contrato.nome;
    valuesfield[3] = contrato.qtdecontrata;
    valuesfield[4] = contrato.vlrcontrata;
    valuesfield[5] = contrato.qtde;
    valuesfield[6] = contrato.vlrnota;
    setValuesfield([...valuesfield]);
  }, [contrato]);

  useEffect(() => {
    if (totais !== undefined && totais.length > 0) {
      totais[0].value = 0;
      totais[1].value = 0;
      totais[2].value = 0;
      totais[3].value = 0;
      totais[4].value = 0;
      totais[5].value = 0;
      totais[6].value = 0;
      totais[7].value = 0;
      totais[8].value = 0;
      totais[9].value = 0;
      totais[10].value = 0;
      setTotais([...totais]);
    }
    if (rows !== undefined && rows.length > 0) {
      rows.forEach((element) => {
        //console.log('[GmoResumo] qtinstalada row:', element.qtinstalada);
        totais[0].value += element.qtcontratada;
        totais[1].value += element.qtaprovada;
        totais[2].value += element.qtpendente;
        if (element.operacaotipo !== 'R') totais[3].value += element.qtliberada;
        totais[4].value += element.qttransito;
        if (element.operacaotipo !== 'R') {
          totais[5].value += element.qtentregue;
          totais[7].value += element.qtinstalada;
          totais[9].value += element.qtaliberar;
        } else {
          totais[6].value += element.qtentregue;
          totais[8].value += element.qtinstalada;
          totais[10].value += element.qtaliberar;
        }
      });
      setTotais([...totais]);
    }
  }, [rows]);

  const Fechar = () => setShowgmoequip(false);
  const handleCloseparque = () => setShowparque(false);
  const handleCloseprod = () => setShowprod(false);
  const handleCloselanc = () => setShowlanc(false);
  const handleClosereq = () => setShowreq(false);
  const handleCloseped = () => setShowped(false);
  const handleClosetran = () => setShowtran(false);

  const showLanc = () => {
    Password('frmgmo', senhareq.senha, 168, senhareq.funcao, senhareq.ativo === 'S').then((result) => {
      if (result.isConfirmed) {
        //console.log('[GmoResumo] Abrindo modal Qtde...');
        setShowlanc(true);
      }
    });
  };

  const showReq = () => {
    Password('frmgmo', senhareq.senha, 168, senhareq.funcao, senhareq.ativo === 'S').then((result) => {
      if (result.isConfirmed) {
        if (valuesfield[9] === 'A') {
          //console.log('GmoResumo Abrindo Requisição... Seriais atuais:', seriaisSelecionados);
          setShowreq(true);
        } else {
          setShowped(true);
        }
      }
    });
  };

  const clickGrid = (newSelection) => setItemselec(newSelection);
  const dblClickGrid = (newSelection) => {
    //console.log('[GmoResumo] dblClickGrid', newSelection);
    if (newSelection.operacaotipo === valuesfield[9]) {
      setItemselec(newSelection);
      showLanc();
    }
  };
  const keyGrid = (newSelection) => setItemselec(newSelection);

  return (
    <React.Fragment>
      <div id="frmgmo" name="frmgmo">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col style={{ marginLeft: '10px', marginBottom: '4px', marginTop: '-18px' }}>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Informações Cadastrais</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                {fieldscontrato.map((field, index) => (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fieldscontrato}
                    valuesfield={valuesfield}
                    setValuesfield={(data) => setValuesfield(data)}
                    valuesfield2={valuesfield2}
                    setValuesfield2={(data) => setValuesfield2(data)}
                    disabled={true}
                  />
                ))}
              </Row>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col style={{ marginLeft: '10px', width: '50%' }}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Apuração de Equipamentos</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
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
                    disabled={false}
                  />
                ))}

                <Col style={{ marginTop: '35px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#66ffff', border: 'solid', borderWidth: '2px' }} />
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px', marginLeft: '5px' }} className="text-muted">
                        Equipamento selecionado
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: '35px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#80ffd4', border: 'solid', borderWidth: '2px' }} />
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px', marginLeft: '5px' }} className="text-muted">
                        Equipamento concluído
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: '35px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#ffff99', border: 'solid', borderWidth: '2px' }} />
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px', marginLeft: '5px' }} className="text-muted">
                        Equipamento substituído
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: '35px' }}>
                  <Row>
                    <Col lg={1}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#ff0000', border: 'solid', borderWidth: '2px' }} />
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px', marginLeft: '5px' }} className="text-muted">
                        Retirada de Equipamento
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row style={{ marginTop: '10px' }}>
                <AGGrid
                  width="100%"
                  height="283px"
                  rows={rows}
                  columns={columns}
                  loading={carregando}
                  item={itemselec}
                  setItem={(data) => setItemselec(data)}
                  onKeyDown={keyGrid}
                  onDoubleClick={dblClickGrid}
                  onCelClick={clickGrid}
                  validations={validations}
                />
              </Row>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Row style={{ marginTop: '5px' }}>
              <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
                <Row>
                  {totais.map((data, index) => (
                    <Col key={index}>
                      {data.visible ? (
                        <Card
                          style={{ backgroundColor: data.color, height: '120px', marginBottom: '2px', boxShadow: '0rem 0rem 1rem 0.1rem' }}
                        >
                          <Card.Body>
                            <Row>
                              <Col md={2} xl={3}>
                                <img style={{ height: '30px', width: '30px' }} src={data.icon} alt={data.icon} />
                              </Col>
                              <h6 style={{ color: data.colortitle, marginTop: '3px' }}>{data.name}</h6>
                            </Row>
                            <h3 className="mb-1 f-w-300" style={{ textAlign: 'right', color: data.colortitle }}>
                              {data.value}
                            </h3>
                          </Card.Body>
                        </Card>
                      ) : null}
                    </Col>
                  ))}
                </Row>
              </Card>
            </Row>
          </Col>
        </Row>

        <hr />
        <Row style={{ textAlign: 'right' }}>
          <Col>
            {itemselec !== undefined && operacaotipo === valuesfield[9] ? (
              <Button id="btnEditar" className="btn btn-success shadow-2 mb-2" onClick={() => showLanc()}>
                <i className={'feather icon-edit'} /> Editar Qtde.
              </Button>
            ) : null}

            {itemselec !== undefined && operacaotipo === valuesfield[9] ? (
              <Button id="btnGerar" className="btn btn-warning shadow-2 mb-2" onClick={() => showReq()}>
                <i className={'feather icon-layers'} /> Gerar Requisições
              </Button>
            ) : null}

            {itemselec !== undefined ? (
              <Button id="btnTransito" className="btn btn-primary shadow-2 mb-2" onClick={() => setShowtran(true)}>
                <i className={'feather icon-map'} /> Em Trânsito
              </Button>
            ) : null}

            {itemselec !== undefined ? (
              <Button id="btnEquip" className="btn btn-primary shadow-2 mb-2" onClick={() => setShowparque(true)}>
                <i className={'feather icon-printer'} /> Equipamentos
              </Button>
            ) : null}

            {itemselec !== undefined ? (
              <Button id="btnModelo" className="btn btn-primary shadow-2 mb-2" onClick={() => setShowprod(true)}>
                <i className={'feather icon-search'} /> Modelo
              </Button>
            ) : null}

            <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={() => Fechar()}>
              <i className={'feather icon-x-circle'} /> Fechar
            </Button>
          </Col>
        </Row>
      </div>

      {/* Modais */}
      <Modal backdrop="static" fullscreen show={showparque} centered onHide={handleCloseparque}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-printer'} />
          &nbsp; Equipamento selecionado: {itemselec ? `${itemselec.produto} - ${itemselec.referencia} - ${itemselec.nome}` : ''}
        </Modal.Header>
        <ModalBody>
          {itemselec ? (
            <GmoEquipamento
              item={itemselec}
              showparque={showparque}
              setShowparque={(data) => setShowparque(data)}
              somentepre={valuesfield[7]}
              operacao={operacao}
            />
          ) : null}
        </ModalBody>
      </Modal>

      <Modal backdrop="static" fullscreen show={showprod} centered onHide={handleCloseprod}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-search'} />
          &nbsp; Equipamento selecionado: {itemselec ? `${itemselec.produto} - ${itemselec.referencia} - ${itemselec.nome}` : ''}
        </Modal.Header>
        <ModalBody>{itemselec ? <ProdutoInfor produto={itemselec.produto} /> : null}</ModalBody>
        <ModalFooter>
          <Button id="btnFecharprod" className="btn btn-success shadow-2 mb-2" onClick={handleCloseprod}>
            <i className={'feather icon-x-circle'} /> Fechar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal backdrop="static" size="xl" show={showlanc} centered onHide={handleCloselanc}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-edit'} />
          &nbsp; Solicitação de Requisição
        </Modal.Header>
        <ModalBody>
          {itemselec ? (
            <GmoResumoQtde
              itemselec={itemselec}
              setItemselec={(data) => setItemselec(data)}
              showlanc={showlanc}
              setShowlanc={(data) => setShowlanc(data)}
              rows={rows}
              setRows={(data) => setRows(data)}
              onSaveSeriais={(lista) => {
                //console.log('[GmoResumo] recebidos do Qtde:', lista);
                setSeriaisSelecionados(lista || []);
              }}
            />
          ) : null}
        </ModalBody>
      </Modal>

      <Modal backdrop="static" size="xl" show={showreq} centered onHide={handleClosereq}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-layers'} />
          &nbsp; Geração de Requisições (Instalação)
        </Modal.Header>
        <ModalBody>
          {itemselec ? (
            <GmoResumoRequisicao
              codemp={itemselec.codemp}
              contrato={itemselec}
              showreq={showreq}
              setShowreq={(data) => setShowreq(data)}
              rows={rows}
              setRows={(data) => setRows(data)}
              gerado={gerado}
              setGerado={(data) => setGerado(data)}
              seriaisSelecionados={seriaisSelecionados} // << repassa para o Requisição
              setSeriaisSelecionados={setSeriaisSelecionados}
            />
          ) : null}
        </ModalBody>
      </Modal>

      <Modal backdrop="static" size="xl" show={showped} centered onHide={handleCloseped}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-layers'} />
          &nbsp; Geração de Requisições (Desinstalação)
        </Modal.Header>
        <ModalBody>
          {itemselec ? (
            <GmoResumoPedido
              precontrato={itemselec.precontrato}
              codemp={itemselec.codemp}
              contrato={itemselec}
              showped={showped}
              setShowped={(data) => setShowped(data)}
              rows={rows}
              setRows={(data) => setRows(data)}
              gerado={gerado}
              setGerado={(data) => setGerado(data)}
              seriaisSelecionados={seriaisSelecionados}
              setSeriaisSelecionados={setSeriaisSelecionados}
            />
          ) : null}
        </ModalBody>
      </Modal>

      <Modal backdrop="static" size="xl" show={showtran} centered onHide={handleClosetran}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-map'} />
          &nbsp; Requisições em Trânsito
        </Modal.Header>
        <ModalBody>
          {itemselec ? (
            <GmoTransito
              precontrato={itemselec.precontrato}
              produto={itemselec.produto}
              codsite={itemselec.codsite}
              operacao={operacaotipo}
              showtran={showtran}
              setShowtran={(data) => setShowtran(data)}
            />
          ) : null}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default GmoResumo;
