import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Board from 'react-trello';
import { useToasts } from 'react-toast-notifications';
import { Decode64 } from '../../../../utils/crypto';
import { CreateObject } from '../../../../components/CreateObject';
import { apiFields, apiFind, apiUpdate, apiList, apiInsert } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';
import { Password } from '../../../../components/Password';
import PartnerSelec from '../selec';
import PartnerConcluir from '../concluir';

const PartnerPainel = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [fieldsselec, setFieldsselec] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [rowsstatus, setRowsstatus] = React.useState([]);
  const [trello, setTrello] = React.useState();
  const [statusfilter, setStatusfilter] = React.useState([]);
  const { addToast } = useToasts();
  const [showinfor, setShowinfor] = useState(false);
  const [lastClick, setLastClick] = useState(0);
  const [filtroSQL, setFiltroSQL] = React.useState(undefined);
  const [compraselec, setCompraselec] = React.useState(undefined);
  const [parceiroselec, setParceiroselec] = React.useState(undefined);
  const [statusselec, setStatusselec] = React.useState(undefined);
  const [valorselec, setValorselec] = React.useState(undefined);
  const [columns, setColumns] = React.useState([]);
  const [itemselec, setItemselec] = React.useState([]);
  const [validations, setValidations] = React.useState([]);
  const [atualiza, setAtualiza] = React.useState(false);
  const [showconcluir, setShowconcluir] = React.useState(false);
  const [validar, setValidar] = useState(false);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Compra', width: 76 },
      { headerClassName: 'header-list', field: 'nomecli', headerName: 'Nome / Razão Social do Parceiro', width: 295 },
      { headerClassName: 'header-list', field: 'nomesite', headerName: 'Nome do Templo', width: 305 },
      { headerClassName: 'header-list', field: 'data', headerName: 'Data Compra', width: 107, type: 'date' },
      { headerClassName: 'header-list', field: 'historico', headerName: 'Histórico', width: 190 },
      { headerClassName: 'header-list', field: 'qtprod', headerName: 'Quantidade', width: 125, type: 'number', decimal: 3 },
      { headerClassName: 'header-list', field: 'totvalor', headerName: 'Valor Total', width: 125, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'nomestatus', headerName: 'Status', width: 200 },
      { headerClassName: 'header-list', field: 'entrega', headerName: 'Entrega', width: 100 }
    ]);
    setValuesdisable([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    setFields([
      {
        id: 0,
        campo: 'TB02301_CODIGO',
        funcao: 'Compra',
        tipo: 'varchar',
        nome: 'codigo',
        tipoobject: 2,
        tamanho: 6,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB02300',
        widthname: 22,
        disabled: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'TB02301_CODCLI',
        funcao: 'Parceiro',
        tipo: 'varchar',
        nome: 'codcli',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01008',
        widthname: 23,
        disabled: valuesdisable[1]
      },
      {
        id: 2,
        campo: 'TB02301_CODSITE',
        funcao: 'Templo',
        tipo: 'varchar',
        nome: 'codsite',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB02176',
        widthname: 23,
        disabled: valuesdisable[2]
      },
      {
        id: 3,
        campo: 'TB02301_TIPO',
        funcao: 'Tipo',
        tipo: 'varchar',
        nome: 'tipo',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB01152',
        widthname: 22,
        disabled: valuesdisable[3]
      },
      {
        id: 4,
        campo: 'TB02301_STATUS',
        funcao: 'Status',
        tipo: 'varchar',
        nome: 'status',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01148',
        widthname: 23,
        disabled: valuesdisable[4]
      },
      {
        id: 5,
        campo: 'TB02301_PRODUTO',
        funcao: 'Produto',
        tipo: 'varchar',
        nome: 'status',
        tipoobject: 2,
        tamanho: 5,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01010',
        widthname: 23,
        disabled: valuesdisable[5]
      },
      {
        id: 6,
        campo: 'TB02301_NOME',
        funcao: 'Histórico',
        tipo: 'numeric',
        nome: 'valorde',
        tipoobject: 1,
        tamanho: 60,
        widthfield: 23,
        measure: '23rem',
        disabled: valuesdisable[6]
      },
      {
        id: 7,
        campo: 'TB02301_DATA1',
        funcao: 'Data de',
        tipo: 'datetime',
        nome: 'datade',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[7]
      },
      {
        id: 8,
        campo: 'TB02301_DATA2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'dataate',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[8]
      },
      {
        id: 9,
        campo: 'TB02301_ENTREGA1',
        funcao: 'Entrega de',
        tipo: 'datetime',
        nome: 'entregade',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[9]
      },
      {
        id: 10,
        campo: 'TB02301_ENTREGA2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'entregaate',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[10]
      },
      {
        id: 11,
        campo: 'TB02301_QTDE1',
        funcao: 'Quantidade de',
        tipo: 'int',
        nome: 'qtdede',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        decimal: 0,
        disabled: valuesdisable[11]
      },
      {
        id: 12,
        campo: 'TB02301_QTDE2',
        funcao: 'Até',
        tipo: 'int',
        nome: 'qtdeate',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        decimal: 0,
        disabled: valuesdisable[12]
      },
      {
        id: 13,
        campo: 'TB02301_VLRNOTA1',
        funcao: 'Valor de',
        tipo: 'numeric',
        nome: 'valorde',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        decimal: 2,
        disabled: valuesdisable[13]
      },
      {
        id: 14,
        campo: 'TB02301_VLRNOTA2',
        funcao: 'Até',
        tipo: 'numeric',
        nome: 'valorate',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        decimal: 2,
        disabled: valuesdisable[14]
      }
    ]);

    setFieldsselec([
      {
        id: 15,
        campo: 'TB02301_OCULTA',
        funcao: 'Ocultar Filtros',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '15rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: valuesdisable[15]
      },
      {
        id: 16,
        campo: 'TB02301_VISUALIZAR',
        funcao: 'Opções Visualização',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '15rem',
        itens: 'Painel,Listagem',
        values: 'S,N',
        disabled: valuesdisable[16]
      }
    ]);
  }, []);

  const Filtrar = () => {
    setTrello(undefined);
    let sql = " EXISTS (SELECT TB01148_CODIGO FROM TB01148 WHERE TB01148_CODIGO = status AND TB01148_PAINEL = 'S') ";
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      sql = sql + " and codigo = '" + valuesfield[0] + "' ";
    }
    if (valuesfield[1] !== '' && valuesfield[1] !== undefined) {
      sql = sql + " and codcli = '" + valuesfield[1] + "' ";
    }
    if (valuesfield[2] !== '' && valuesfield[2] !== undefined) {
      sql = sql + " and codsite = '" + valuesfield[2] + "' ";
    }
    if (valuesfield[3] !== '' && valuesfield[3] !== undefined) {
      sql = sql + " and tipo = '" + valuesfield[3] + "' ";
    }
    if (valuesfield[4] !== '' && valuesfield[4] !== undefined) {
      sql = sql + " and status = '" + valuesfield[4] + "' ";
    }
    if (valuesfield[5] !== '' && valuesfield[5] !== undefined) {
      sql = sql + " and codigo in (select TB02301_CODIGO from TB02301 where TB02301_PRODUTO = '" + valuesfield[5] + "') ";
    }
    if (valuesfield[6] !== '' && valuesfield[6] !== undefined) {
      sql = sql + " and historico like '" + valuesfield[6] + "%' ";
    }
    if (
      valuesfield[7] !== '' &&
      valuesfield[7] !== undefined &&
      valuesfield[7] !== null &&
      valuesfield[8] !== '' &&
      valuesfield[8] !== undefined &&
      valuesfield[8] !== null
    ) {
      const tmdata1 = Date.parse(valuesfield[7]);
      const dt1 = new Date(tmdata1);
      const data1 = dt1.toLocaleDateString('en-US');

      const tmdata2 = Date.parse(valuesfield[8]);
      const dt2 = new Date(tmdata2);
      const data2 = dt2.toLocaleDateString('en-US');
      sql = sql + " and data BETWEEN '" + data1 + " 00:00:00' AND '" + data2 + " 23:59:00' ";
    }
    if (
      valuesfield[9] !== '' &&
      valuesfield[9] !== undefined &&
      valuesfield[9] !== null &&
      valuesfield[10] !== '' &&
      valuesfield[10] !== undefined &&
      valuesfield[10] !== null
    ) {
      const tmdata1 = Date.parse(valuesfield[9]);
      const dt1 = new Date(tmdata1);
      const data1 = dt1.toLocaleDateString('en-US');

      const tmdata2 = Date.parse(valuesfield[10]);
      const dt2 = new Date(tmdata2);
      const data2 = dt2.toLocaleDateString('en-US');
      sql = sql + " and entrega BETWEEN '" + data1 + " 00:00:00' AND '" + data2 + " 23:59:00' ";
    }
    if (valuesfield[11] !== '' && valuesfield[11] !== undefined && valuesfield[12] !== '' && valuesfield[12] !== undefined) {
      sql = sql + " and qtprod BETWEEN '" + valuesfield[14] + "' AND '" + valuesfield[15] + "' ";
    }
    if (valuesfield[13] !== '' && valuesfield[13] !== undefined && valuesfield[14] !== '' && valuesfield[14] !== undefined) {
      sql = sql + " and totvalor BETWEEN '" + valuesfield[13] + "' AND '" + valuesfield[14] + "' ";
    }

    setCarregando(true);
    setFiltroSQL(undefined);
    let admin = Decode64(sessionStorage.getItem('admin')) === 'S';
    let master = Decode64(sessionStorage.getItem('master')) === 'S';
    let manager = Decode64(sessionStorage.getItem('manager')) === 'S';
    let filterstatus = ' 0 = 0 ';
    if (!admin && !master && !manager) {
      sql =
        sql +
        " AND status IN (SELECT TB01151_STATUS FROM TB01151 WHERE TB01151_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "') ";
      filterstatus =
        filterstatus +
        " and ((TB01149_STATUS IN ( SELECT TB01150_STATUS FROM TB01150 WHERE TB01150_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "'))) ";
    }
    sql = sql + ' order by entrega ';
    apiList('PartnerWorkflow', 'TB01149_STATUS,TB01149_STATUSFIM', '', filterstatus).then((response) => {
      if (response.status === 200) {
        setStatusfilter(response.data);
        setFiltroSQL(sql);
      }
    });
  };

  useEffect(() => {
    if (atualiza) {
      Filtrar();
      setAtualiza(false);
    }
  }, [atualiza]);

  useEffect(() => {
    if (filtroSQL !== undefined) {
      apiFields('PartnerPainelVW', '*', '', filtroSQL).then((response) => {
        if (response.status === 200) {
          setRows(response.data);
          setCarregando(false);
        }
      });
    }
  }, [filtroSQL]);

  useEffect(() => {
    if (parseInt(sessionStorage.getItem('perfil')) === 1) {
      valuesfield[2] = Decode64(sessionStorage.getItem('temple'));
      valuesdisable[2] = true;
      setValuesfield([...valuesfield]);
      setValuesdisable([...valuesdisable]);
    } else if (parseInt(sessionStorage.getItem('perfil')) === 2) {
      valuesfield[1] = Decode64(sessionStorage.getItem('partner'));
      valuesdisable[1] = true;
      setValuesfield([...valuesfield]);
      setValuesdisable([...valuesdisable]);
    }
    Filtrar();
  }, [fields]);

  useEffect(() => {
    if (rowsstatus !== undefined) {
      let item = {};
      let card = {};
      let data = {
        lanes: []
      };
      let cards = [];
      let compras = [];

      rowsstatus.forEach((element) => {
        item = {};
        item['id'] = element.codigo;
        item['title'] = element.nome;
        item['label'] = element.codigo;
        if (
          element.color !== '' &&
          element.color !== undefined &&
          element.color !== null &&
          element.color2 !== '' &&
          element.color2 !== undefined &&
          element.color2 !== null
        ) {
          item['style'] = {
            width: 275,
            backgroundColor: element.color,
            color: element.color2,
            maxHeight: 600,
            borderRadius: 10,
            marginBottom: 20,
            whiteSpace: 'normal', // Permite quebra de linha se necessário
            wordBreak: 'break-word' // Garante a quebra do texto longo
          };
        } else if (element.color !== '' && element.color !== undefined && element.color !== null) {
          item['style'] = {
            width: 275,
            backgroundColor: element.color,
            maxHeight: 600,
            borderRadius: 10,
            marginBottom: 20,

            whiteSpace: 'normal', // Permite quebra de linha se necessário
            wordBreak: 'break-word' // Garante a quebra do texto longo
          };
        } else {
          item['style'] = {
            width: 275,
            maxHeight: 600,
            borderRadius: 10,
            marginBottom: 20,
            whiteSpace: 'normal', // Permite quebra de linha se necessário
            wordBreak: 'break-word' // Garante a quebra do texto longo
          };
        }
        compras = rows.filter((valor) => valor.status === element.codigo);
        cards = [];
        compras.forEach((element, index) => {
          card = {};
          card['id'] = element.codigo + '-' + element.codcli + '-' + element.totvalor;
          card['title'] = element.codigo;
          card['cardStyle'] = { width: 275, maxWidth: 275, margin: 'auto', marginBottom: 5, marginLeft: 5, marginRight: 5 };
          card['description'] = element.trello;
          card['hideCardDeleteIcon'] = true;
          cards = cards.concat(card);
        });
        if (compras.length > 0) {
          item['cards'] = cards;
        } else {
          item['cards'] = [];
        }
        data.lanes = data.lanes.concat(item);
      });
      setTrello(data);
    }
  }, [rowsstatus]);

  useEffect(() => {
    if (rows !== undefined) {
      let tmpvalidations = [];
      let validation = {};
      let tmpstatus = '';
      let totais = 0;
      validation['campo'] = [];
      validation['tipotab'] = 'G';
      validation['sinal'] = [];
      validation['valorval'] = [];
      validation['cor'] = [];
      validation['corline'] = [];
      if (rows !== undefined && rows.length > 0) {
        rows.forEach((item) => {
          if (!tmpstatus.includes(item.status)) {
            validation['campo'] = validation['campo'].concat('status');
            validation['sinal'] = validation['sinal'].concat(1);
            validation['valorval'] = validation['valorval'].concat(item.status);
            validation['cor'] = validation['cor'].concat(item.color);
            validation['corline'] = validation['corline'].concat(item.color2);
            tmpstatus = tmpstatus + item.status + ',';
            totais += 1;
          }
        });
      }
      validation['total'] = totais;
      tmpvalidations = tmpvalidations.concat(validation);
      setValidations(tmpvalidations);

      let admin = Decode64(sessionStorage.getItem('admin')) === 'S';
      let master = Decode64(sessionStorage.getItem('master')) === 'S';
      let manager = Decode64(sessionStorage.getItem('manager')) === 'S';
      let filterstatus = " TB01148_SITUACAO = 'A' AND TB01148_PAINEL = 'S' ";
      if (!admin && !master && !manager) {
        filterstatus =
          filterstatus +
          " and ((TB01148_CODIGO IN ( SELECT TB01150_STATUS FROM TB01150 WHERE TB01150_USER = '" +
          Decode64(sessionStorage.getItem('user')) +
          "')) ";
        filterstatus =
          filterstatus +
          " or (TB01148_CODIGO IN ( SELECT TB01151_STATUS FROM TB01151 WHERE TB01151_USER = '" +
          Decode64(sessionStorage.getItem('user')) +
          "'))) ";
      }
      filterstatus = filterstatus + " order by ISNULL(TB01148_INICIAL,'N') DESC, TB01148_NOME ";
      apiList('PartnerStatus', '*', '', filterstatus).then((response) => {
        if (response.status === 200) {
          setRowsstatus(response.data);
        }
      });
    }
  }, [rows]);

  useEffect(() => {
    setCompraselec(itemselec.codigo);
    setParceiroselec(itemselec.codcli);
    setValorselec(itemselec.totvalor);
    setStatusselec(itemselec.status);
  }, [itemselec]);

  const Visualizar = () => {
    if (compraselec !== '' && compraselec !== undefined) {
      setShowinfor(true);
    }
  };

  const handleCardClick = (cardId) => {
    const now = Date.now();
    if (now - lastClick < 300) {
      setCompraselec(cardId.substr(0, 6));
      setParceiroselec(cardId.substr(7, 8));
      setValorselec(parseFloat(cardId.substr(16, 50)));
      Visualizar();
    }
    setLastClick(now);
  };

  const handleCloseinfor = () => {
    setShowinfor(false);
  };

  const clickGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setShowinfor(true);
  };

  const handleCloseconcluir = () => {
    if (validar) {
      setShowconcluir(false);
    }
  };

  return (
    <React.Fragment>
      <div id="frmpainel" name="frmpainel">
        <Row style={{ marginLeft: '5px', marginBottom: '20px' }}>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Painel de Acompanhamento</Card.Title>
              </Card.Header>

              {valuesfield[15] === 'N' || valuesfield[15] === undefined ? (
                <div>
                  <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                    {fields.map((field, index) => (
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

              {valuesfield[15] === 'N' || valuesfield[15] === undefined ? <hr></hr> : <></>}
              <Row style={{ marginBottom: '10px' }}></Row>
              <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
              {trello !== undefined ? (
                <Row>
                  <Col>
                    <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                      {fieldsselec.map((field, index) => (
                        <CreateObject
                          key={field.id}
                          field={field}
                          index={field.id}
                          fields={fieldsselec}
                          valuesfield={valuesfield}
                          setValuesfield={(data) => setValuesfield(data)}
                          valuesfield2={valuesfield2}
                          setValuesfield2={(data) => setValuesfield2(data)}
                          disabled={valuesdisable[field.id]}
                        ></CreateObject>
                      ))}
                    </Row>
                  </Col>
                  <Col style={{ textAlign: 'right', marginTop: '30px' }}>
                    <Button id="btnFiltrar" className="btn btn-success shadow-2 mb-2" onClick={() => Filtrar()}>
                      <i className={'feather icon-filter'} /> Filtrar
                    </Button>
                  </Col>
                </Row>
              ) : (
                <></>
              )}
              <hr></hr>

              {trello !== undefined ? (
                <div>
                  {valuesfield[16] === 'S' || valuesfield[16] === undefined ? (
                    <Board
                      data={trello}
                      style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: '#04a9f5', maxHeight: '650px' }}
                      onBeforeCardDelete={() => {
                        return beforeDelete();
                      }}
                      cardStyle={{
                        borderRadius: '10px', // Bordas arredondadas dos cards
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Sombra nos cards
                        padding: '10px', // Espaçamento interno dos cards
                        marginRight: '3px',
                        marginLeft: '3px'
                      }}
                      onCardClick={(cardId) => handleCardClick(cardId)}
                      handleDragEnd={(cardId, sourceLaneId, targetLaneId) => {
                        const compra = cardId.substr(0, 6);
                        const codcli = cardId.substr(7, 8);
                        const valor = parseFloat(cardId.substr(16, 50));
                        if (statusfilter !== undefined) {
                          let filter = statusfilter.filter((item) => item.status === sourceLaneId && item.statusfim === targetLaneId);
                          if (filter.length === 0) {
                            addToast(
                              'Não é possível passar a compra ' +
                                compra +
                                ' para o status ' +
                                targetLaneId +
                                ', não está no fluxo correto, ou o usuário não possui permissão !',
                              {
                                placement: 'bottom-rigth',
                                appearance: 'warning',
                                autoDismiss: true
                              }
                            );
                            return false;
                          } else {
                            setCarregando(true);
                            apiFind('PartnerStatus', '*', '', "TB01148_CODIGO = '" + targetLaneId + "' ").then((response) => {
                              if (response.status === 200) {
                                const item = response.data;
                                if (item.valor1 + item.valor2 > 0) {
                                  if (!(valor >= item.valor1 && valor <= item.valor2)) {
                                    setCarregando(false);
                                    addToast(
                                      'Não foi possível passar para este Status, pois o valor da compra está fora da faixa de aprovação !',
                                      {
                                        placement: 'bottom-rigth',
                                        appearance: 'warning',
                                        autoDismiss: true
                                      }
                                    );
                                    Filtrar();
                                    return false;
                                  }
                                }
                                Password(
                                  'frmpainel',
                                  item.senha,
                                  0,
                                  'Senha de Liberação',
                                  item.senha !== undefined && item.senha !== '' && item.senha !== null
                                ).then((result) => {
                                  if (!result.isConfirmed) {
                                    Filtrar();
                                    return false;
                                  } else {
                                    apiList(
                                      'PartnerItem',
                                      '*',
                                      '',
                                      "TB02301_CODIGO = '" + compra + "' AND tb02301_CODCLI = '" + codcli + "'"
                                    ).then((response) => {
                                      if (response.status === 200) {
                                        const itens = response.data;
                                        itens.forEach((item) => {
                                          let item2 = {};
                                          item2['codigo'] = compra;
                                          item2['codcli'] = codcli;
                                          item2['produto'] = item.produto;
                                          item2['status'] = targetLaneId;
                                          item2['qtprodb'] = item.qtprod;
                                          item2['totvalorb'] = item.totvalor;
                                          apiUpdate('PartnerItem', item2).then((response) => {
                                            if (response.status === 200) {
                                              let item3 = {};
                                              item3['codigo'] = compra;
                                              item3['codcli'] = codcli;
                                              item3['produto'] = item.produto;
                                              item3['status'] = targetLaneId;
                                              item3['user'] = Decode64(sessionStorage.getItem('user'));
                                              apiInsert('PartnerHistorico', item3).then((response) => {
                                                if (response.status === 200) {
                                                  console.log('Produto : ' + item.produto);
                                                }
                                              });
                                              setCarregando(false);
                                            }
                                          });
                                        });
                                      }
                                    });
                                    addToast('Operação realizada com Sucesso !', {
                                      placement: 'bottom-rigth',
                                      appearance: 'success',
                                      autoDismiss: true
                                    });
                                    setCompraselec(compra);
                                    setParceiroselec(codcli);
                                    setStatusselec(targetLaneId);
                                    setValorselec(valor);
                                    if (item.tipo === 1) {
                                      setShowconcluir(true);
                                    }
                                    return true;
                                  }
                                });
                              }
                            });
                          }
                        }
                      }}
                    />
                  ) : (
                    <Row style={{ marginBottom: '5px' }}>
                      <AGGrid
                        width="100%"
                        height="650px"
                        rows={rows}
                        columns={columns}
                        loading={carregando}
                        item={itemselec}
                        setItem={(data) => setItemselec(data)}
                        validations={validations}
                        onDoubleClick={dblClickGrid}
                        onCelClick={clickGrid}
                        focus={true}
                      ></AGGrid>
                    </Row>
                  )}
                </div>
              ) : (
                <></>
              )}
            </Card>
          </Row>
        </Row>
      </div>
      <Modal backdrop="static" size="xl" show={showinfor} centered={true} onHide={handleCloseinfor}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-shopping-cart'} />
          &nbsp;Produtos da Compra: {compraselec}
        </Modal.Header>
        <ModalBody>
          <PartnerSelec
            compra={compraselec}
            parceiro={parceiroselec}
            valor={valorselec}
            atualiza={atualiza}
            setAtualiza={(data) => setAtualiza(data)}
            showinfor={showinfor}
            setShowinfor={(data) => setShowinfor(data)}
          ></PartnerSelec>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="lg" show={showconcluir} centered={true} onHide={handleCloseconcluir}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-check'} />
          &nbsp;Conclusão da Compra: {compraselec}
        </Modal.Header>
        <ModalBody>
          <PartnerConcluir
            compra={compraselec}
            parceiro={parceiroselec}
            status={statusselec}
            valor={valorselec}
            validar={validar}
            setValidar={(data) => setValidar(data)}
          ></PartnerConcluir>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default PartnerPainel;
