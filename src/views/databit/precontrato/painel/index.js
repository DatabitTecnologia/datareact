import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Board from 'react-trello';
import { useToasts } from 'react-toast-notifications';
import { Decode64 } from '../../../../utils/crypto';
import { CreateObject } from '../../../../components/CreateObject';
import { apiFields, apiFind, apiUpdate, apiList, apiInsert } from '../../../../api/crudapi';
import InforPrecontrato from '../inforprecontrato';
import StatusFluxo from '../status/fluxo';
import StatusHistorico from '../status/historico';
import AGGrid from '../../../../components/AGGrid';
import DashboardFind from '../../dashboard/find';
import { findModule } from '../../dashboard/findmodule';

const PrecontratoPainel = (props) => {
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
  const [titulo, setTitulo] = React.useState('');
  const [icon, setIcon] = React.useState('');
  const [rowselect, setRowselect] = React.useState();
  const [showwfluxo, setShowfluxo] = useState(false);
  const [showhist, setShowhist] = useState(false);
  const [onupdate, setOnupdate] = React.useState(false);
  const [lastClick, setLastClick] = useState(0);
  const [filtroSQL, setFiltroSQL] = React.useState(undefined);
  const [columns, setColumns] = React.useState([]);
  const [validations, setValidations] = React.useState([]);
  const [itemselec, setItemselec] = React.useState([]);
  const [dashboards, setDashboards] = React.useState([]);
  const [showdash, setShowdash] = useState(false);
  const handleCloseShowdash = () => setShowdash(false);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'TB02264_CODIGO', headerName: 'Código', width: 76 },
      { headerClassName: 'header-list', field: 'TB02264_DTCAD', headerName: 'Data', width: 107, type: 'date' },
      { headerClassName: 'header-list', field: 'TB01008_NOME', headerName: 'Nome / Razão Social', width: 380 },
      { headerClassName: 'header-list', field: 'TB02264_NOME', headerName: 'Histórico', width: 200 },
      { headerClassName: 'header-list', field: 'TB02264_NOMEVEND', headerName: 'Vendedor', width: 200 },
      { headerClassName: 'header-list', field: 'TB02264_QTDECONTRATA', headerName: 'Quantidade', width: 120, type: 'number', decimal: 3 },
      { headerClassName: 'header-list', field: 'TB02264_VLRCONTRATA', headerName: 'Valor', width: 125, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'TB02264_OPERACAO', headerName: 'Operação', width: 110 },
      { headerClassName: 'header-list', field: 'TB02264_NOMESTATUS', headerName: 'Status', width: 200 }
    ]);
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
      true,
      false,
      false,
      false
    ]);
    setFields([
      {
        id: 0,
        campo: 'TB02264_CODIGO',
        funcao: 'Pré-Contrato',
        tipo: 'varchar',
        nome: 'codigo',
        tipoobject: 2,
        tamanho: 6,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB02264',
        widthname: 22,
        disabled: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'TB02264_CODCLI',
        funcao: 'Cliente',
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
        campo: 'TB02264_OPORTUNIDADE',
        funcao: 'Oportunidade',
        tipo: 'varchar',
        nome: 'oportunidade',
        tipoobject: 2,
        tamanho: 6,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB02264',
        widthname: 23,
        disabled: valuesdisable[2]
      },

      {
        id: 4,
        campo: 'TB02264_STATUS',
        funcao: 'Status',
        tipo: 'varchar',
        nome: 'status',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB01136',
        widthname: 22,
        disabled: valuesdisable[4]
      },
      {
        id: 5,
        campo: 'TB02264_CODVEN',
        funcao: 'Vendedor',
        tipo: 'varchar',
        nome: 'vendedor',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01006',
        widthname: 23,
        disabled: valuesdisable[5]
      },
      {
        id: 6,
        campo: 'TB02264_CODEMP',
        funcao: 'Empresa',
        tipo: 'varchar',
        nome: 'empresa',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01007',
        widthname: 23,
        disabled: valuesdisable[7]
      },
      {
        id: 7,
        campo: 'TB02264_CONTRATO',
        funcao: 'Número Contrato',
        tipo: 'varchar',
        nome: 'contrato',
        tipoobject: 1,
        tamanho: 12,
        widthfield: 22,
        measure: '17rem',
        disabled: valuesdisable[7]
      },
      {
        id: 8,
        campo: 'TB02264_DATA1',
        funcao: 'Cadastro de',
        tipo: 'datetime',
        nome: 'datade',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[8]
      },
      {
        id: 9,
        campo: 'TB02264_DATA2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'dataate',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[9]
      },
      {
        id: 10,
        campo: 'TB02264_VENCCONTR1',
        funcao: 'Vencimento de',
        tipo: 'datetime',
        nome: 'vencde',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[10]
      },
      {
        id: 11,
        campo: 'TB02264_VENCCONTR2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'vencate',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[11]
      },
      {
        id: 12,
        campo: 'TB02260_TIPOCONTR',
        funcao: 'Tipo Contrato',
        tipo: 'varchar',
        nome: 'tipocontr',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 19,
        measure: '19rem',
        itens: 'Todos,Contrato de Locação,Contrato de Garantia,Contrato de Manutenção,Serviço Avulso',
        values: 'Y,L,G,M,A',
        disabled: valuesdisable[12]
      },
      {
        id: 13,
        campo: 'TB02260_TIPOFRANQUIA',
        funcao: 'Tipo de Franquia',
        tipo: 'varchar',
        nome: 'tipofranquia',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 19,
        measure: '19rem',
        itens: 'Todos,Por Tonalidade,Global',
        values: 'Y,T,G',
        disabled: valuesdisable[13]
      },
      {
        id: 14,
        campo: 'TB02260_ANALFRANQUIA',
        funcao: 'Analise de Franquia',
        tipo: 'varchar',
        nome: 'analfranquia',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 19,
        measure: '19rem',
        itens: 'Todos,Por Contrato (Total),Por Equipamento,Por Grupo,Compensatório,Compensatório por Grupo',
        values: 'Y,T,M,G,E,W',
        disabled: valuesdisable[14]
      },
      {
        id: 15,
        campo: 'TB02260_OPERACAO',
        funcao: 'Operação',
        tipo: 'varchar',
        nome: 'operacao',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 19,
        measure: '19rem',
        itens: 'Todos,Alteração,Contrato,Distrato,Troca Técnica',
        values: 'X,A,C,D,T',
        disabled: valuesdisable[15]
      },
      {
        id: 16,
        campo: 'TB02260_OPERACAO',
        funcao: 'Operação',
        tipo: 'varchar',
        nome: 'operacao',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 19,
        measure: '19rem',
        itens: 'Todos,Pendente,Finalizado',
        values: 'T,0,1',
        disabled: valuesdisable[16]
      }
    ]);

    setFieldsselec([
      {
        id: 3,
        campo: 'TB02264_TIPOOP',
        funcao: 'Tipo de Pré-Contrato',
        tipo: 'varchar',
        nome: 'tipoop',
        tipoobject: 12,
        tamanho: 4,
        widthfield: 17,
        measure: '17rem',
        tabelaref: 'TB01138',
        campolist: 'TB01138_NOME',
        camporefdrop: 'TB01138_CODIGO',
        firstdefault: false,
        disabled: valuesdisable[3]
      },
      {
        id: 17,
        campo: 'TB02264_CODIGO',
        funcao: 'Selecionado',
        tipo: 'varchar',
        nome: 'codigo',
        tipoobject: 1,
        tamanho: 6,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[17]
      },
      {
        id: 18,
        campo: 'TB02264_OCULTA',
        funcao: 'Ocultar Filtros',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '7rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: valuesdisable[18]
      },
      {
        id: 20,
        campo: 'TB02264_VISUALIZAR',
        funcao: 'Opções Visualização',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '12rem',
        itens: 'Painel,Listagem',
        values: 'S,N',
        disabled: valuesdisable[21]
      }
    ]);
  }, []);

  const Filtrar = () => {
    let sql =
      " TB02264_SITUACAO = 'A'  AND EXISTS (SELECT TB01136_CODIGO FROM TB01136 WHERE TB01136_CODIGO = TB02264_STATUS AND TB01136_PAINEL = 'S') ";
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      sql = sql + " and TB02264_CODIGO = '" + valuesfield[0] + "' ";
    }
    if (valuesfield[1] !== '' && valuesfield[1] !== undefined) {
      sql = sql + " and TB02264_CODCLI = '" + valuesfield[1] + "' ";
    }
    if (valuesfield[2] !== '' && valuesfield[2] !== undefined) {
      sql = sql + " and TB02264_OPORTUNIDADE = '" + valuesfield[2] + "' ";
    }
    if (valuesfield[3] !== '' && valuesfield[3] !== undefined) {
      sql = sql + " and TB02264_TIPOPRE = '" + valuesfield[3] + "' ";
    }
    if (valuesfield[4] !== '' && valuesfield[4] !== undefined) {
      sql = sql + " and TB02264_STATUS = '" + valuesfield[4] + "' ";
    }
    if (valuesfield[5] !== '' && valuesfield[5] !== undefined) {
      sql = sql + " and TB02264_CODVEN = '" + valuesfield[5] + "' ";
    } else {
      if (Decode64(sessionStorage.getItem('manager')) === 'N') {
        const seller = Decode64(sessionStorage.getItem('seller'));
        if (seller !== 'ZZZZ') {
          sql = sql + " and TB02264_CODVEN = '" + seller + "' ";
        }
      }
    }
    if (valuesfield[6] !== '' && valuesfield[6] !== undefined) {
      sql = sql + " and TB02264_CODEMP3 = '" + valuesfield[6] + "' ";
    }
    if (valuesfield[7] !== '' && valuesfield[7] !== undefined) {
      sql = sql + " and TB02264_CONTRATO LIKE '" + valuesfield[7] + "%' ";
    }
    if (
      valuesfield[8] !== '' &&
      valuesfield[8] !== undefined &&
      valuesfield[8] !== null &&
      valuesfield[9] !== '' &&
      valuesfield[9] !== undefined &&
      valuesfield[9] !== null
    ) {
      const tmdata1 = Date.parse(valuesfield[8]);
      const dt1 = new Date(tmdata1);
      const data1 = dt1.toLocaleDateString('en-US');

      const tmdata2 = Date.parse(valuesfield[9]);
      const dt2 = new Date(tmdata2);
      const data2 = dt2.toLocaleDateString('en-US');
      sql = sql + " and TB02264_DTCAD BETWEEN '" + data1 + " 00:00:00' AND '" + data2 + " 23:59:00' ";
    }
    if (
      valuesfield[10] !== '' &&
      valuesfield[10] !== undefined &&
      valuesfield[10] !== null &&
      valuesfield[11] !== '' &&
      valuesfield[11] !== undefined &&
      valuesfield[11] !== null
    ) {
      const tmdata3 = Date.parse(valuesfield[10]);
      const dt3 = new Date(tmdata3);
      const data3 = dt3.toLocaleDateString('en-US');

      const tmdata4 = Date.parse(valuesfield[11]);
      const dt4 = new Date(tmdata4);
      const data4 = dt4.toLocaleDateString('en-US');
      sql = sql + " and TB02264_VENCCONTR BETWEEN '" + data3 + " 00:00:00' AND '" + data4 + " 23:59:00' ";
    }
    if (valuesfield[12] !== 'Y' && valuesfield[12] !== undefined) {
      sql = sql + " and TB02264_TIPOCONTR = '" + valuesfield[12] + "' ";
    }
    if (valuesfield[13] !== 'Y' && valuesfield[13] !== undefined) {
      sql = sql + " and TB02264_TIPOFRANQUIA = '" + valuesfield[13] + "' ";
    }
    if (valuesfield[14] !== 'Y' && valuesfield[14] !== undefined) {
      sql = sql + " and TB02264_ANALFRANQUIA = '" + valuesfield[14] + "' ";
    }
    if (valuesfield[15] !== 'X' && valuesfield[15] !== undefined) {
      sql = sql + " and TB01138_OPERACAO = '" + valuesfield[15] + "' ";
    }
    if (valuesfield[16] !== 'T' && valuesfield[16] !== undefined) {
      sql = sql + " and TB01136_TIPO = '" + valuesfield[16] + "' ";
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
        " AND TB02264_STATUS IN (SELECT TB01144_STATUS FROM TB01144 WHERE TB01144_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "') ";
      filterstatus =
        filterstatus +
        " and TB01137_STATUS IN ( SELECT TB01139_STATUS FROM TB01139 WHERE TB01139_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "') ";
    }
    apiList('PrecontratoWorkflow', 'TB01137_STATUS,TB01137_STATUSFIM', '', filterstatus).then((response) => {
      if (response.status === 200) {
        setStatusfilter(response.data);
        setFiltroSQL(sql);
      }
    });
  };

  useEffect(() => {
    if (filtroSQL !== undefined) {
      let tmpfilter = filtroSQL;
      apiList('PrecontratoTipoStatus', '*', '', "TB01155_TIPO = '" + valuesfield[3] + "'").then((response) => {
        if (response.status === 200) {
          const tipostatus = response.data;
          if (tipostatus.length > 0) {
            tmpfilter =
              tmpfilter + " and ((TB02264_STATUS IN ( SELECT TB01155_STATUS FROM TB01155 WHERE TB01155_TIPO = '" + valuesfield[3] + "'))) ";
          }
          tmpfilter = tmpfilter + ' order by TB02264_DTCAD ';
          apiFields('PrecontratoPainelVW', '*', '', tmpfilter).then((response) => {
            if (response.status === 200) {
              setRows(response.data);
              findModule('PN02264').then((response) => {
                setCarregando(false);
                setDashboards(response.data);
              });
            }
          });
        }
      });
    }
  }, [filtroSQL]);

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
          if (!tmpstatus.includes(item.TB02264_STATUS)) {
            validation['campo'] = validation['campo'].concat('TB02264_STATUS');
            validation['sinal'] = validation['sinal'].concat(1);
            validation['valorval'] = validation['valorval'].concat(item.TB02264_STATUS);
            validation['cor'] = validation['cor'].concat(item.TB01136_COLOR);
            validation['corline'] = validation['corline'].concat(item.TB01136_COLOR2);
            tmpstatus = tmpstatus + item.TB02264_STATUS + ',';
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
      let filterstatus = " TB01136_SITUACAO = 'A' AND TB01136_PAINEL = 'S' ";
      if (!admin && !master && !manager) {
        filterstatus =
          filterstatus +
          " and ((TB01136_CODIGO IN ( SELECT TB01139_STATUS FROM TB01139 WHERE TB01139_USER = '" +
          Decode64(sessionStorage.getItem('user')) +
          "')) ";

        filterstatus =
          filterstatus +
          " or (TB01136_CODIGO IN ( SELECT TB01144_STATUS FROM TB01144 WHERE TB01144_USER = '" +
          Decode64(sessionStorage.getItem('user')) +
          "'))) ";
      }
      apiList('PrecontratoTipoStatus', '*', '', "TB01155_TIPO = '" + valuesfield[3] + "'").then((response) => {
        if (response.status === 200) {
          const tipostatus = response.data;
          if (tipostatus.length > 0) {
            filterstatus =
              filterstatus +
              " and ((TB01136_CODIGO IN ( SELECT TB01155_STATUS FROM TB01155 WHERE TB01155_TIPO = '" +
              valuesfield[3] +
              "'))) ";
          }
          filterstatus = filterstatus + " order by ISNULL(TB01136_INICIAL,'N') DESC, TB01136_NOME ";
          apiList('PrecontratoStatus', '*', '', filterstatus).then((response) => {
            if (response.status === 200) {
              setRowsstatus(response.data);
            }
          });
        }
      });
    }
  }, [rows]);

  useEffect(() => {
    if (Decode64(sessionStorage.getItem('manager')) === 'N') {
      let seller = Decode64(sessionStorage.getItem('seller'));
      if (seller !== 'ZZZZ' && (valuesfield[5] === '' || valuesfield[5] === undefined || valuesfield[5] === null)) {
        valuesfield[5] = Decode64(sessionStorage.getItem('seller'));
        valuesdisable[5] = true;
        setValuesfield([...valuesfield]);
        setValuesdisable([...valuesdisable]);
      }
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
      let precontratos = [];

      rowsstatus.forEach((element, index) => {
        item = {};
        item['id'] = element.codigo;
        item['title'] = element.nome;
        item['titlebottom'] = element.nome;
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
        //if (rows !== undefined && rows.length > 0) {
        precontratos = rows.filter((valor) => valor.TB02264_STATUS === element.codigo);
        cards = [];
        precontratos.forEach((element, index) => {
          card = {};
          card['id'] = element.TB02264_CODIGO;
          card['title'] = element.TB01008_NOME;
          card['label'] = element.TB02264_CODIGO;
          card['cardStyle'] = { width: 275, maxWidth: 275, margin: 'auto', marginBottom: 5, marginLeft: 5, marginRight: 5 };
          card['description'] = element.TB02264_TRELLO;
          card['hideCardDeleteIcon'] = true;
          cards = cards.concat(card);
        });
        if (precontratos.length > 0) {
          item['cards'] = cards;
        } else {
          item['cards'] = [];
        }
        data.lanes = data.lanes.concat(item);
        //}
      });
      setTrello(data);
    }
  }, [rowsstatus]);

  useEffect(() => {
    valuesfield[17] = itemselec.TB02264_CODIGO;
    setValuesfield([...valuesfield]);
  }, [itemselec]);

  useEffect(() => {
    if (!showwfluxo && rows.length > 0) {
      Filtrar();
    }
  }, [showwfluxo]);

  const beforeDelete = () => {
    addToast('Não é permitido excluir Pré-Contratos neste módulo !', {
      placement: 'bottom-rigth',
      appearance: 'warning',
      autoDismiss: true
    });
  };

  const clickGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    Visualizar();
  };

  const handleCloseinfor = () => {
    setShowinfor(false);
    Filtrar();
  };

  const Novo = () => {
    setRowselect(undefined);
    setTitulo('Novo Pré-Contrato');
    setIcon('feather icon-star h1');
    setShowinfor(true);
  };

  const Visualizar = () => {
    if (valuesfield[17] !== '' && valuesfield[17] !== undefined) {
      let item = {};
      item['TB02264_CODIGO'] = valuesfield[17];
      setRowselect(item);
      setTitulo('Pré-Contrato selecionado');
      setIcon('feather icon-check-circle h1');
      setShowinfor(true);
    }
  };

  const Fluxo = () => {
    if (valuesfield[17] !== '' && valuesfield[17] !== undefined) {
      setShowfluxo(true);
    }
  };

  const handleClosefluxo = () => {
    setShowfluxo(false);
    Filtrar();
  };

  const Hist = () => {
    if (valuesfield[17] !== '' && valuesfield[17] !== undefined) {
      setShowhist(true);
    }
  };

  const handleClosehist = () => {
    setShowhist(false);
  };

  const handleCardClick = (cardId) => {
    const now = Date.now();
    valuesfield2[17] = undefined;
    setValuesfield2([...valuesfield2]);
    valuesfield[17] = cardId;
    setValuesfield([...valuesfield]);
    if (now - lastClick < 300) {
      Visualizar();
    }
    setLastClick(now);
  };

  return (
    <React.Fragment>
      <div id="frmagenda" name="frmagenda">
        <Row style={{ marginLeft: '5px', marginBottom: '20px' }}>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Painel de Acompanhamento (Pré-Contratos)</Card.Title>
              </Card.Header>

              {valuesfield[18] === 'N' || valuesfield[18] === undefined ? (
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

              {valuesfield[19] === 'N' || valuesfield[19] === undefined ? <hr></hr> : <></>}
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
                      <Col style={{ textAlign: 'right', marginTop: '30px' }}>
                        <Button id="btnFiltrar" className="btn shadow-2 mb-2" onClick={() => Filtrar()}>
                          <i className={'feather icon-filter'} /> Filtrar
                        </Button>
                        <Button id="btnNovo" className="btn btn-primary shadow-2 mb-2" onClick={() => Novo()}>
                          <i className={'feather icon-star'} /> Novo
                        </Button>
                        <Button id="btnVisualizar" className="btn btn-primary shadow-2 mb-2" onClick={() => Visualizar()}>
                          <i className={'feather icon-eye'} /> Visualizar
                        </Button>
                        <Button id="btnStatus" className="btn btn-success shadow-2 mb-2" onClick={() => Fluxo()}>
                          <i className={'feather icon-zap'} /> Status
                        </Button>
                        <Button id="btnHistorico" className="btn btn-warning shadow-2 mb-2" onClick={() => Hist()}>
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
                  </Col>
                </Row>
              ) : (
                <></>
              )}
              <hr></hr>

              {trello !== undefined ? (
                <div>
                  {valuesfield[20] === 'S' || valuesfield[20] === undefined ? (
                    <Board
                      data={trello}
                      style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: '#04a9f5', maxHeight: '650px' }}
                      onBeforeCardDelete={() => {
                        return beforeDelete();
                      }}
                      onCardClick={(cardId) => handleCardClick(cardId)}
                      cardStyle={{
                        borderRadius: '10px', // Bordas arredondadas dos cards
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Sombra nos cards
                        padding: '10px', // Espaçamento interno dos cards
                        marginRight: '3px',
                        marginLeft: '3px'
                      }}
                      handleDragEnd={(cardId, sourceLaneId, targetLaneId) => {
                        if (statusfilter !== undefined) {
                          let filter = statusfilter.filter((item) => item.status === sourceLaneId && item.statusfim === targetLaneId);
                          if (filter.length === 0) {
                            addToast(
                              'Não é possível passar o Pré-Contrato ' +
                                cardId +
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
                            apiFind('Precontrato', 'TB02264_CODIGO, TB02264_STATUS ', '', "TB02264_CODIGO = '" + cardId + "'").then(
                              (response) => {
                                if (response.status === 200) {
                                  let item = response.data;
                                  item.status = targetLaneId;
                                  apiUpdate('Precontrato', item).then((response) => {
                                    let retorno = false;
                                    if (response.status === 200) {
                                      let typemens = 'success';
                                      let dismiss = true;
                                      if (response.data.status !== 1) {
                                        setCarregando(false);
                                        typemens = 'error';
                                        dismiss = false;
                                        retorno = false;
                                        Filtrar();
                                      } else {
                                        addToast(response.data.mensagem, {
                                          placement: 'bottom-rigth',
                                          appearance: typemens,
                                          autoDismiss: dismiss
                                        });
                                        let item2 = {};
                                        item2['codigo'] = cardId;
                                        item2['status'] = targetLaneId;
                                        item2['user'] = Decode64(sessionStorage.getItem('user'));
                                        apiInsert('PrecontratoHistorico', item2).then((response) => {
                                          if (response.status === 200) {
                                            setCarregando(false);
                                            if (response.data.status !== 1) {
                                              typemens = 'error';
                                              dismiss = false;
                                              retorno = false;
                                              Filtrar();
                                            } else {
                                              retorno = true;
                                              addToast(response.data.mensagem, {
                                                placement: 'bottom-rigth',
                                                appearance: typemens,
                                                autoDismiss: dismiss
                                              });
                                              return true;
                                            }
                                          }
                                        });
                                      }
                                    }
                                  });
                                }
                              }
                            );
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
        <Modal backdrop="static" fullscreen={true} show={showinfor} centered={true} onHide={handleCloseinfor} contentClassName="modal-mov">
          <Modal.Header className="h5" closeButton>
            <i className={icon} />
            &nbsp;{titulo}
          </Modal.Header>
          <ModalBody>
            <InforPrecontrato
              openmodal={true}
              showinfor={showinfor}
              rowselect={rowselect}
              setRowselect={(data) => setRowselect(data)}
              setShowinfor={(data) => setShowinfor(data)}
              onupdate={onupdate}
              setOnupdate={(data) => setOnupdate(data)}
            ></InforPrecontrato>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="lg" show={showwfluxo} centered={true} onHide={handleClosefluxo}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-zap h1'} />
            &nbsp;Definição de Fluxo
          </Modal.Header>
          <ModalBody>
            <StatusFluxo precontrato={valuesfield[17]} showwfluxo={showwfluxo} setShowfluxo={(data) => setShowfluxo(data)}></StatusFluxo>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="xl" show={showhist} centered={true} onHide={handleClosehist}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-list h1'} />
            &nbsp;Histórico de Atendimento
          </Modal.Header>
          <ModalBody>
            <StatusHistorico precontrato={valuesfield[17]} showhist={showhist} setShowhist={(data) => setShowhist(data)}></StatusHistorico>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" fullscreen={true} show={showdash} centered={true} onHide={handleCloseShowdash}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-bar-chart h1'} />
            &nbsp;Gráficos
          </Modal.Header>
          <ModalBody>
            <DashboardFind
              module={'PN02264'}
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

export default PrecontratoPainel;
