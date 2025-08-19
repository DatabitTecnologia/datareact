import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Board from 'react-trello';
import { useToasts } from 'react-toast-notifications';
import { Decode64 } from '../../../../utils/crypto';
import { CreateObject } from '../../../../components/CreateObject';
import { apiFields, apiFind, apiUpdate, apiList, apiInsert } from '../../../../api/crudapi';
import InforOportunidade from '../inforoportunidade';
import StatusFluxo from '../status/fluxo';
import StatusHistorico from '../status/historico';
import chance5 from '../../../../assets/images/databit/chance5.png';
import chance4 from '../../../../assets/images/databit/chance4.png';
import chance3 from '../../../../assets/images/databit/chance3.png';
import chance2 from '../../../../assets/images/databit/chance2.png';
import chance1 from '../../../../assets/images/databit/chance1.png';
import AGGrid from '../../../../components/AGGrid';
import DashboardFind from '../../dashboard/find';
import { findModule } from '../../dashboard/findmodule';

const OportunidadePainel = (props) => {
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
      { headerClassName: 'header-list', field: 'TB02255_CODIGO', headerName: 'Código', width: 96 },
      { headerClassName: 'header-list', field: 'TB02255_DATA', headerName: 'Data', width: 107, type: 'date' },
      { headerClassName: 'header-list', field: 'TB02255_NOMECLIENTE', headerName: 'Nome / Razão Social', width: 360 },
      { headerClassName: 'header-list', field: 'TB02255_NOMEVEND', headerName: 'Vendedor', width: 200 },
      { headerClassName: 'header-list', field: 'TB02255_PREVISAOFIM', headerName: 'Previsão', width: 107, type: 'date' },
      { headerClassName: 'header-list', field: 'TB02255_QTDE', headerName: 'Quantidade', width: 120, type: 'number', decimal: 3 },
      { headerClassName: 'header-list', field: 'TB02255_VLRNOTA', headerName: 'Valor Total', width: 125, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'TB02255_NOMESTATUS', headerName: 'Status', width: 200 },
      {
        headerClassName: 'header-list',
        field: 'chance',
        headerName: 'Chance',
        width: 200,
        renderCell: (params) => {
          switch (params.data.TB02255_CHANCE) {
            case 0:
            case 1: {
              return <img src={chance1} alt={params.data.TB02255_CHANCE} width="180" height="30" />;
            }
            case 2: {
              return <img src={chance2} alt={params.data.TB02255_CHANCE} width="180" height="30" />;
            }
            case 3: {
              return <img src={chance3} alt={params.data.TB02255_CHANCE} width="180" height="30" />;
            }
            case 4: {
              return <img src={chance4} alt={params.data.TB02255_CHANCE} width="180" height="30" />;
            }
            case 5: {
              return <img src={chance5} alt={params.data.TB02255_CHANCE} width="180" height="30" />;
            }
          }
        }
      }
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
      false,
      true,
      false,
      false,
      false
    ]);
    setFields([
      {
        id: 0,
        campo: 'TB02255_CODIGO',
        funcao: 'Oportunidade',
        tipo: 'varchar',
        nome: 'codigo',
        tipoobject: 2,
        tamanho: 6,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB02255',
        widthname: 22,
        disabled: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'TB02255_CODCLI',
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
        campo: 'TB02255_CODPROSPECT',
        funcao: 'Prospect',
        tipo: 'varchar',
        nome: 'codprospect',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01127',
        widthname: 23,
        disabled: valuesdisable[2]
      },

      {
        id: 5,
        campo: 'TB02255_STATUS',
        funcao: 'Status',
        tipo: 'varchar',
        nome: 'status',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01129',
        widthname: 23,
        disabled: valuesdisable[5]
      },
      {
        id: 6,
        campo: 'TB02255_CODVEN',
        funcao: 'Vendedor',
        tipo: 'varchar',
        nome: 'vendedor',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB01006',
        widthname: 22,
        disabled: valuesdisable[6]
      },
      {
        id: 7,
        campo: 'TB02255_CODEMP',
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
        id: 8,
        campo: 'TB02255_PRE',
        funcao: 'Pré-Contrato',
        tipo: 'varchar',
        nome: 'pre',
        tipoobject: 2,
        tamanho: 6,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB02264',
        widthname: 23,
        disabled: valuesdisable[8]
      },
      {
        id: 9,
        campo: 'TB02255_CONTRATO',
        funcao: 'Número Contrato',
        tipo: 'varchar',
        nome: 'contrato',
        tipoobject: 1,
        tamanho: 12,
        widthfield: 12,
        measure: '12rem',
        disabled: valuesdisable[9]
      },
      {
        id: 10,
        campo: 'TB02255_DATA1',
        funcao: 'Data de',
        tipo: 'datetime',
        nome: 'datade',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[10]
      },
      {
        id: 11,
        campo: 'TB02255_DATA2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'dataate',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[11]
      },
      {
        id: 12,
        campo: 'TB02255_PREVISAO1',
        funcao: 'Previsão de',
        tipo: 'datetime',
        nome: 'previsaode',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[12]
      },
      {
        id: 13,
        campo: 'TB02255_PREVISAO2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'previsaoate',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[13]
      },
      {
        id: 14,
        campo: 'TB02255_QTDE1',
        funcao: 'Quantidade de',
        tipo: 'int',
        nome: 'qtdede',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        decimal: 0,
        disabled: valuesdisable[14]
      },
      {
        id: 15,
        campo: 'TB02255_QTDE2',
        funcao: 'Até',
        tipo: 'int',
        nome: 'qtdeate',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        decimal: 0,
        disabled: valuesdisable[15]
      },
      {
        id: 16,
        campo: 'TB02255_VLRNOTA1',
        funcao: 'Valor de',
        tipo: 'numeric',
        nome: 'valorde',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        decimal: 2,
        disabled: valuesdisable[16]
      },
      {
        id: 17,
        campo: 'TB02255_VLRNOTA2',
        funcao: 'Até',
        tipo: 'numeric',
        nome: 'valorate',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        decimal: 2,
        disabled: valuesdisable[17]
      },
      {
        id: 20,
        campo: 'TB02255_CHANCE',
        funcao: 'Chance de Fechamento',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 11,
        measure: '11rem',
        itens: '0 - Todos,1 - Muito Baixa,2 - Baixa,3 - Média,4 - Alta,5 - Muito Alta',
        values: '0,1,2,3,4,5',
        disabled: valuesdisable[20]
      }
    ]);

    setFieldsselec([
      {
        id: 3,
        campo: 'TB02255_TIPOOP',
        funcao: 'Tipo de Oportunidade',
        tipo: 'varchar',
        nome: 'tipoop',
        tipoobject: 12,
        tamanho: 4,
        widthfield: 14,
        measure: '14rem',
        tabelaref: 'TB01132',
        campolist: 'TB01132_NOME',
        camporefdrop: 'TB01132_CODIGO',
        firstdefault: false,
        disabled: valuesdisable[3]
      },
      {
        id: 4,
        campo: 'TB02255_CLASSIFICACAO',
        funcao: 'Classificação',
        tipo: 'varchar',
        nome: 'classificacao',
        tipoobject: 12,
        tamanho: 5,
        widthfield: 14,
        measure: '14rem',
        tabelaref: 'TB01133',
        campolist: 'TB01133_NOME',
        camporefdrop: 'TB01133_CODIGO',
        firstdefault: false,
        disabled: valuesdisable[4]
      },
      {
        id: 18,
        campo: 'TB02255_CODIGO',
        funcao: 'Selecionado',
        tipo: 'varchar',
        nome: 'codigo',
        tipoobject: 1,
        tamanho: 6,
        widthfield: 6,
        measure: '6rem',
        tabelaref: 'TB02255',
        widthname: 15,
        disabled: valuesdisable[18]
      },
      {
        id: 19,
        campo: 'TB02255_OCULTA',
        funcao: 'Ocultar Filtros',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '7rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: valuesdisable[19]
      },
      {
        id: 21,
        campo: 'TB02255_VISUALIZAR',
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
    setTrello(undefined);
    let sql =
      " TB02255_SITUACAO = 'A' AND EXISTS (SELECT TB01129_CODIGO FROM TB01129 WHERE TB01129_CODIGO = TB02255_STATUS AND TB01129_PAINEL = 'S') ";
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      sql = sql + " and TB02255_CODIGO = '" + valuesfield[0] + "' ";
    }
    if (valuesfield[1] !== '' && valuesfield[1] !== undefined) {
      sql = sql + " and TB02255_CODCLI = '" + valuesfield[1] + "' ";
    }
    if (valuesfield[2] !== '' && valuesfield[2] !== undefined) {
      sql = sql + " and TB02255_CODPROSPECT = '" + valuesfield[2] + "' ";
    }
    if (valuesfield[3] !== '' && valuesfield[3] !== undefined) {
      sql = sql + " and TB02255_TIPOOP = '" + valuesfield[3] + "' ";
    }
    if (valuesfield[4] !== '' && valuesfield[4] !== undefined) {
      sql = sql + " and TB02255_CLASSIFICACAO = '" + valuesfield[4] + "' ";
    }
    if (valuesfield[5] !== '' && valuesfield[5] !== undefined) {
      sql = sql + " and TB02255_STATUS = '" + valuesfield[5] + "' ";
    }
    if (valuesfield[6] !== '' && valuesfield[6] !== undefined) {
      sql = sql + " and TB02255_CODVEN = '" + valuesfield[6] + "' ";
    } else {
      if (Decode64(sessionStorage.getItem('manager')) === 'N') {
        const seller = Decode64(sessionStorage.getItem('seller'));
        if (seller !== 'ZZZZ') {
          sql = sql + " and TB02255_CODVEN = '" + seller + "' ";
        }
      }
    }
    if (valuesfield[7] !== '' && valuesfield[7] !== undefined) {
      sql = sql + " and TB02255_CODEMP = '" + valuesfield[7] + "' ";
    }
    if (valuesfield[8] !== '' && valuesfield[8] !== undefined) {
      sql = sql + " and TB02255_PRE = '" + valuesfield[8] + "' ";
    }
    if (valuesfield[9] !== '' && valuesfield[9] !== undefined) {
      sql = sql + " and TB02255_CONTRATO LIKE '" + valuesfield[8] + "%' ";
    }
    if (
      valuesfield[10] !== '' &&
      valuesfield[10] !== undefined &&
      valuesfield[10] !== null &&
      valuesfield[11] !== '' &&
      valuesfield[11] !== undefined &&
      valuesfield[11] !== null
    ) {
      const tmdata1 = Date.parse(valuesfield[10]);
      const dt1 = new Date(tmdata1);
      const data1 = dt1.toLocaleDateString('en-US');

      const tmdata2 = Date.parse(valuesfield[11]);
      const dt2 = new Date(tmdata2);
      const data2 = dt2.toLocaleDateString('en-US');
      sql = sql + " and TB02255_DATA BETWEEN '" + data1 + " 00:00:00' AND '" + data2 + " 23:59:00' ";
    }
    if (
      valuesfield[12] !== '' &&
      valuesfield[12] !== undefined &&
      valuesfield[12] !== null &&
      valuesfield[13] !== '' &&
      valuesfield[13] !== undefined &&
      valuesfield[13] !== null
    ) {
      const tmdata3 = Date.parse(valuesfield[12]);
      const dt3 = new Date(tmdata3);
      const data3 = dt3.toLocaleDateString('en-US');

      const tmdata4 = Date.parse(valuesfield[13]);
      const dt4 = new Date(tmdata4);
      const data4 = dt4.toLocaleDateString('en-US');
      sql = sql + " and TB02255_PREVISAO BETWEEN '" + data3 + " 00:00:00' AND '" + data4 + " 23:59:00' ";
    }
    if (valuesfield[14] !== '' && valuesfield[14] !== undefined && valuesfield[15] !== '' && valuesfield[15] !== undefined) {
      sql = sql + " and TB02255_QTDE BETWEEN '" + valuesfield[14] + "' AND '" + valuesfield[15] + "' ";
    }
    if (valuesfield[16] !== '' && valuesfield[16] !== undefined && valuesfield[17] !== '' && valuesfield[17] !== undefined) {
      sql = sql + " and TB02255_VLRNOTA BETWEEN '" + valuesfield[16] + "' AND '" + valuesfield[17] + "' ";
    }
    if (valuesfield[20] !== '' && valuesfield[20] !== undefined) {
      let chance = parseInt(valuesfield[20]);
      if (chance !== 0) {
        sql = sql + ' and TB02255_CHANCE = ' + valuesfield[20];
      }
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
        " AND TB02255_STATUS IN (SELECT TB01143_STATUS FROM TB01143 WHERE TB01143_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "') ";
      filterstatus =
        filterstatus +
        " and ((TB01130_STATUS IN ( SELECT TB01131_STATUS FROM TB01131 WHERE TB01131_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "'))) ";
    }

    apiList('OportunidadeWorkflow', 'TB01130_STATUS,TB01130_STATUSFIM', '', filterstatus).then((response) => {
      if (response.status === 200) {
        setStatusfilter(response.data);
        setFiltroSQL(sql);
      }
    });
  };

  useEffect(() => {
    if (filtroSQL !== undefined) {
      let tmpfilter = filtroSQL;
      apiList('OportunidadeTipoStatus', '*', '', "TB01154_TIPO = '" + valuesfield[3] + "'").then((response) => {
        if (response.status === 200) {
          const tipostatus = response.data;
          if (tipostatus.length > 0) {
            tmpfilter =
              tmpfilter + " and ((TB02255_STATUS IN ( SELECT TB01154_STATUS FROM TB01154 WHERE TB01154_TIPO = '" + valuesfield[3] + "'))) ";
          }
          tmpfilter = tmpfilter + ' order by TB02255_PREVISAOFIM ';
          apiFields(
            'OportunidadePainelVW',
            '*',
            "convert(varchar(10),tb02255_previsaofim,111) + ' ' + convert(varchar(10),tb02255_previsaofim,108) as PREVFIM, convert(varchar(10),dateadd(HOUR,1,tb02255_previsaofim),111) + ' ' + convert(varchar(10),dateadd(HOUR,1,tb02255_previsaofim),108) as PREVFIM2",
            tmpfilter
          ).then((response) => {
            if (response.status === 200) {
              setRows(response.data);
              findModule('PN02255').then((response) => {
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
          if (!tmpstatus.includes(item.TB02255_STATUS)) {
            validation['campo'] = validation['campo'].concat('TB02255_STATUS');
            validation['sinal'] = validation['sinal'].concat(1);
            validation['valorval'] = validation['valorval'].concat(item.TB02255_STATUS);
            validation['cor'] = validation['cor'].concat(item.TB01129_COLOR);
            validation['corline'] = validation['corline'].concat(item.TB01129_COLOR2);
            tmpstatus = tmpstatus + item.TB02255_STATUS + ',';
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
      let filterstatus = " TB01129_SITUACAO = 'A' AND TB01129_PAINEL = 'S' ";
      if (!admin && !master && !manager) {
        filterstatus =
          filterstatus +
          " and ((TB01129_CODIGO IN ( SELECT TB01131_STATUS FROM TB01131 WHERE TB01131_USER = '" +
          Decode64(sessionStorage.getItem('user')) +
          "')) ";
        filterstatus =
          filterstatus +
          " or (TB01129_CODIGO IN ( SELECT TB01143_STATUS FROM TB01143 WHERE TB01143_USER = '" +
          Decode64(sessionStorage.getItem('user')) +
          "'))) ";
      }
      apiList('OportunidadeTipoStatus', '*', '', "TB01154_TIPO = '" + valuesfield[3] + "'").then((response) => {
        if (response.status === 200) {
          const tipostatus = response.data;
          if (tipostatus.length > 0) {
            filterstatus =
              filterstatus +
              " and ((TB01129_CODIGO IN ( SELECT TB01154_STATUS FROM TB01154 WHERE TB01154_TIPO = '" +
              valuesfield[3] +
              "'))) ";
          }
          filterstatus = filterstatus + " order by ISNULL(TB01129_INICIAL,'N') DESC, TB01129_NOME ";
          apiList('OportunidadeStatus', '*', '', filterstatus).then((response) => {
            if (response.status === 200) {
              console.log(response.data);
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
      if (seller !== 'ZZZZ' && (valuesfield[6] === '' || valuesfield[6] === undefined || valuesfield[6] === null)) {
        valuesfield[6] = Decode64(sessionStorage.getItem('seller'));
        valuesdisable[6] = true;
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
      let oportuinidades = [];

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
        //if (rows !== undefined && rows.length > 0) {
        oportuinidades = rows.filter((valor) => valor.TB02255_STATUS === element.codigo);
        cards = [];
        oportuinidades.forEach((element, index) => {
          card = {};
          card['id'] = element.TB02255_CODIGO;
          card['title'] = element.TB02255_TITULO;
          card['label'] = element.TB02255_CODIGO;
          card['cardStyle'] = { width: 275, maxWidth: 275, margin: 'auto', marginBottom: 5, marginLeft: 5, marginRight: 5 };
          card['description'] = element.TB02255_TRELLO;
          card['hideCardDeleteIcon'] = true;
          cards = cards.concat(card);
        });
        if (oportuinidades.length > 0) {
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
    valuesfield[18] = itemselec.TB02255_CODIGO;
    setValuesfield([...valuesfield]);
  }, [itemselec]);

  useEffect(() => {
    if (!showwfluxo && rows.length > 0) {
      Filtrar();
    }
  }, [showwfluxo]);

  const beforeDelete = () => {
    addToast('Não é permitido excluir oportunidades neste módulo !', {
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
    setTitulo('Nova Oportunidade');
    setIcon('feather icon-star h1');
    setShowinfor(true);
  };

  const Visualizar = () => {
    if (valuesfield[18] !== '' && valuesfield[18] !== undefined) {
      let item = {};
      item['TB02255_CODIGO'] = valuesfield[18];
      setRowselect(item);
      setTitulo('Oportunidade selecionada');
      setIcon('feather icon-check-circle h1');
      setShowinfor(true);
    }
  };

  const Fluxo = () => {
    if (valuesfield[18] !== '' && valuesfield[18] !== undefined) {
      setShowfluxo(true);
    }
  };

  const handleClosefluxo = () => {
    setShowfluxo(false);
    Filtrar();
  };

  const Hist = () => {
    if (valuesfield[18] !== '' && valuesfield[18] !== undefined) {
      setShowhist(true);
    }
  };

  const handleClosehist = () => {
    setShowhist(false);
  };

  const handleCardClick = (cardId) => {
    const now = Date.now();
    valuesfield2[18] = undefined;
    setValuesfield2([...valuesfield2]);
    valuesfield[18] = cardId;
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
                <Card.Title as="h5">Painel de Acompanhamento (Oportunidades)</Card.Title>
              </Card.Header>

              {valuesfield[19] === 'N' || valuesfield[19] === undefined ? (
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
                  {valuesfield[21] === 'S' || valuesfield[21] === undefined ? (
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
                        if (statusfilter !== undefined) {
                          let filter = statusfilter.filter((item) => item.status === sourceLaneId && item.statusfim === targetLaneId);
                          if (filter.length === 0) {
                            addToast(
                              'Não é possível passar a oportunidade ' +
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
                            apiFind(
                              'Oportunidade',
                              'TB02255_CODIGO, TB02255_STATUS, TB02255_PREVISAO, TB02255_HORA, ',
                              '',
                              "TB02255_CODIGO = '" + cardId + "'"
                            ).then((response) => {
                              if (response.status === 200) {
                                let item = response.data;
                                item.status = targetLaneId;
                                const tmdata1 =
                                  item.previsao.substring(3, 5) +
                                  '/' +
                                  item.previsao.substring(0, 2) +
                                  '/' +
                                  item.previsao.substring(6, 10);
                                const dt1 = new Date(tmdata1);
                                const data1 = dt1.toLocaleDateString('en-US');
                                item.previsao = data1 + ' 00:00:00';

                                apiUpdate('Oportunidade', item).then((response) => {
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
                                      retorno = true;
                                    }
                                    addToast(response.data.mensagem, {
                                      placement: 'bottom-rigth',
                                      appearance: typemens,
                                      autoDismiss: dismiss
                                    });
                                    if (retorno) {
                                      let item2 = {};
                                      item2['codigo'] = cardId;
                                      item2['status'] = targetLaneId;
                                      item2['previsao'] = data1 + ' 00:00:00';
                                      item2['hora'] = item.hora;
                                      item2['user'] = Decode64(sessionStorage.getItem('user'));
                                      apiInsert('OportunidadeHistorico', item2).then((response) => {
                                        if (response.status === 200) {
                                          if (response.data.status !== 1) {
                                            typemens = 'error';
                                            dismiss = false;
                                            retorno = false;
                                            Filtrar();
                                          } else {
                                            retorno = true;
                                          }
                                          setCarregando(false);
                                          addToast(response.data.mensagem, {
                                            placement: 'bottom-rigth',
                                            appearance: typemens,
                                            autoDismiss: dismiss
                                          });

                                          return retorno;
                                        }
                                      });
                                    }
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
                        rowHeight={47}
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
            <InforOportunidade
              openmodal={true}
              showinfor={showinfor}
              rowselect={rowselect}
              setRowselect={(data) => setRowselect(data)}
              setShowinfor={(data) => setShowinfor(data)}
              onupdate={onupdate}
              setOnupdate={(data) => setOnupdate(data)}
            ></InforOportunidade>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="lg" show={showwfluxo} centered={true} onHide={handleClosefluxo}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-zap h1'} />
            &nbsp;Definição de Fluxo
          </Modal.Header>
          <ModalBody>
            <StatusFluxo oportunidade={valuesfield[18]} showwfluxo={showwfluxo} setShowfluxo={(data) => setShowfluxo(data)}></StatusFluxo>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="xl" show={showhist} centered={true} onHide={handleClosehist}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-list h1'} />
            &nbsp;Histórico de Atendimento
          </Modal.Header>
          <ModalBody>
            <StatusHistorico oportunidade={valuesfield[18]} showhist={showhist} setShowhist={(data) => setShowhist(data)}></StatusHistorico>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" fullscreen={true} show={showdash} centered={true} onHide={handleCloseShowdash}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-bar-chart h1'} />
            &nbsp;Gráficos
          </Modal.Header>
          <ModalBody>
            <DashboardFind
              module={'PN02255'}
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

export default OportunidadePainel;
