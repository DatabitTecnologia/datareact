import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { Decode64 } from '../../../../utils/crypto';
import { CreateObject } from '../../../../components/CreateObject';
import { apiFields, apiList, apiFind, apiUpdate } from '../../../../api/crudapi';
import InforPrecontrato from '../inforprecontrato';
import StatusFluxo from '../status/fluxo';
import StatusHistorico from '../status/historico';
import AGGrid from '../../../../components/AGGrid';
import ContratoInformacoes from '../../contrato/informacoes';
import PendenciaTotal from './total';
import ContratoAcompanhamento from '../../contrato/acompanhamento';
import GmoResumo from '../../contrato/gmo/resumo';
import DashboardFind from '../../dashboard/find';
import { findModule } from '../../dashboard/findmodule';
import { PrecontratoReport } from '../report';
import { Confirmation } from '../../../../components/Confirmation';

const PrecontratoPendencia = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [fieldsselec, setFieldsselec] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesname, setValuesname] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [valuesselec, setValuesselec] = React.useState([]);
  const [valuesfieldpre, setValuesfieldpre] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [rowsstatus, setRowsstatus] = React.useState([]);
  const [showinfor, setShowinfor] = useState(false);
  const [titulo, setTitulo] = React.useState('');
  const [icon, setIcon] = React.useState('');
  const [rowselect, setRowselect] = React.useState();
  const [showwfluxo, setShowfluxo] = useState(false);
  const [showhist, setShowhist] = useState(false);
  const [onupdate, setOnupdate] = React.useState(false);
  const [itemselec, setItemselec] = React.useState();
  const [codselec, setCodselec] = React.useState();
  const [contratoselec, setContratoselec] = React.useState();
  const [showinforpre, setShowinforpre] = useState(false);
  const [showtotal, setShowtotal] = useState(false);
  const [showacompanha, setShowacompanha] = useState(false);
  const [showgmoequip, setShowgmoequip] = useState(false);
  const [validations, setValidations] = React.useState([]);
  const [fieldsfilter, setFieldsfilter] = React.useState([]);
  const [operacao, setOperacao] = React.useState('');
  const [filtroSQL, setFiltroSQL] = React.useState(undefined);
  const [dashboards, setDashboards] = React.useState([]);
  const [showdash, setShowdash] = useState(false);
  const handleCloseShowdash = () => setShowdash(false);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'TB02264_CODIGO', headerName: 'Código', width: 86 },
      { headerClassName: 'header-list', field: 'TB02264_CONTRATO', headerName: 'Contrato', width: 114 },
      {
        headerClassName: 'header-list',
        field: 'TB02264_DTCAD',
        headerName: 'Data',
        width: 121,
        type: 'date'
      },
      { headerClassName: 'header-list', field: 'TB02264_OPERACAOTIPO', headerName: 'Operação', width: 100 },
      { headerClassName: 'header-list', field: 'TB01008_NOME', headerName: 'Nome / Razão Social do Cliente', width: 305 },
      {
        headerClassName: 'header-list',
        field: 'TB02264_VLRCONTRATA',
        headerName: 'R$ Contrato',
        width: 118,
        type: 'number',
        decimal: 2
      },
      { headerClassName: 'header-list', field: 'TB02264_QTCONTRATADA', headerName: 'Contratada', width: 88, type: 'number' },
      { headerClassName: 'header-list', field: 'TB02264_QTAPROVADA', headerName: 'Aprovada', width: 80, type: 'number' },
      { headerClassName: 'header-list', field: 'TB02264_QTPENDENTE', headerName: 'Pendente', width: 80, type: 'number' },
      { headerClassName: 'header-list', field: 'TB02264_QTLIBERADA', headerName: 'Contrato', width: 80, type: 'number' },
      //{ headerClassName: 'header-list', field: 'TB02264_QTTRANSITO', headerName: 'Trânsito', width: 80, type: 'number' },
      { headerClassName: 'header-list', field: 'TB02264_QTENTREGUE', headerName: 'Entregue', width: 80, type: 'number' },
      { headerClassName: 'header-list', field: 'TB02264_QTINSTALADA', headerName: 'Instalada', width: 80, type: 'number' },
      { headerClassName: 'header-list', field: 'TB02264_QTALIBERAR', headerName: 'À Liberar', width: 80, type: 'number' },
      {
        headerClassName: 'header-list',
        field: 'TB02264_PREVISAO',
        headerName: 'Previsão',
        width: 106,
        type: 'date'
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
      false
    ]);

    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['statuspre', 'statuspre', 'operacao'];
    validation['sinal'] = [1, 1, 1];
    validation['tipotab'] = 'G';
    validation['valorval'] = [1, 2, 'D', '1'];
    validation['cor'] = ['#ccf5ff', '#00ffcc', '#ff4d4d'];
    validation['corline'] = ['#000', '#000', '#fff'];
    validation['total'] = 3;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);

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
        id: 3,
        campo: 'TB02264_TIPOPRE',
        funcao: 'Tipo de Pré-Contrato',
        tipo: 'varchar',
        nome: 'tipoop',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB01132',
        widthname: 22,
        disabled: valuesdisable[3]
      },

      {
        id: 4,
        campo: 'TB02264_STATUS',
        funcao: 'Status',
        tipo: 'varchar',
        nome: 'status',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01136',
        widthname: 23,
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
        measure: '23rem',
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
        campo: 'TB02264_PREVISAO1',
        funcao: 'Previsão de',
        tipo: 'datetime',
        nome: 'prevde',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[10]
      },
      {
        id: 11,
        campo: 'TB02264_PREVISAO2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'prevate',
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
      }
    ]);

    setFieldsfilter([
      {
        id: 16,
        campo: 'TB02260_OPERACAO',
        funcao: 'Situação',
        tipo: 'varchar',
        nome: 'operacao',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 8,
        measure: '8rem',
        itens: 'Pendente,Finalizado,Todos',
        values: 'P,F,T',
        disabled: valuesdisable[16]
      },
      {
        id: 17,
        campo: 'TB02260_OCULTA',
        funcao: 'Filtros',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '6rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: valuesdisable[17]
      }
    ]);
  }, []);

  const Filtrar = () => {
    let sql =
      " TB02264_SITUACAO = 'A' AND TB01136_PENDENCIA = 'S'  AND EXISTS (SELECT TB02111_CODIGO FROM TB02111 WHERE TB02111_CODIGO = TB02264_CONTRATO) ";
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
      sql = sql + " and TB02264_PREVISAO BETWEEN '" + data3 + " 00:00:00' AND '" + data4 + " 23:59:00' ";
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
    if (valuesfield[16] !== 'T') {
      if (valuesfield[16] === undefined) {
        valuesfield[16] = 'P';
      }
      if (valuesfield[16] === 'P') {
        sql = sql + ' AND ((TB02264_QTCONTRATADA <> TB02264_QTINSTALADA) OR (TB02264_QTAPROVADA = 0)) AND (TB02264_MANUAL = 0) ';
      } else {
        sql = sql + ' AND (((TB02264_QTCONTRATADA = TB02264_QTINSTALADA) AND TB02264_QTAPROVADA > 0) OR (TB02264_MANUAL = 1))';
      }
    }
    sql = sql + ' order by CAST(CONVERT(VARCHAR(10),TB02264_ULTMOV,101) AS DATETIME) desc';
    setCarregando(true);
    let admin = Decode64(sessionStorage.getItem('admin')) === 'S';
    let master = Decode64(sessionStorage.getItem('master')) === 'S';
    let manager = Decode64(sessionStorage.getItem('manager')) === 'S';
    let filterstatus = ' 0 = 0 ';
    if (!admin && !master && !manager) {
      filterstatus =
        filterstatus +
        " and TB01137_STATUS IN ( SELECT TB01139_STATUS FROM TB01139 WHERE TB01139_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "') ";
    }
    setFiltroSQL(sql);
  };

  useEffect(() => {
    if (filtroSQL !== undefined) {
      apiFields(
        'PrecontratoVW',
        'TB02264_CODIGO,TB02264_CONTRATO,TB02264_DTCAD,TB02264_OPERACAOTIPO,TB01008_NOME,TB02264_VLRCONTRATA,TB02264_QTCONTRATADA,TB02264_QTAPROVADA,TB02264_QTPENDENTE,TB02264_QTLIBERADA,TB02264_QTENTREGUE,TB02264_QTINSTALADA,TB02264_QTALIBERAR,TB02264_PREVISAO,TB01138_OPERACAO,TB02264_MANUAL',
        'case when (((TB02264_QTCONTRATADA = TB02264_QTINSTALADA) AND TB02264_QTAPROVADA > 0) OR (TB02264_MANUAL = 1)) then 1 else case when (TB02264_QTINSTALADA = TB02264_QTAPROVADA) and (TB02264_QTINSTALADA - TB02264_QTAPROVADA) <> 0 then 2 else 0 end end as statuspre,' +
          ' TB01138_OPERACAO AS operacao ',
        filtroSQL
      ).then((response) => {
        if (response.status === 200) {
          setRows(response.data);
          setFiltroSQL(undefined);
          findModule('AN02264').then((response) => {
            setCarregando(false);
            setDashboards(response.data);
          });
        }
      });
    }
  }, [filtroSQL]);

  useEffect(() => {
    if (rows !== undefined) {
      let admin = Decode64(sessionStorage.getItem('admin')) === 'S';
      let master = Decode64(sessionStorage.getItem('master')) === 'S';
      let manager = Decode64(sessionStorage.getItem('manager')) === 'S';
      let filterstatus = " TB01136_SITUACAO = 'A' AND TB01136_PAINEL = 'S' ";
      if (!admin && !master && !manager) {
        filterstatus =
          filterstatus +
          " and TB01136_CODIGO IN ( SELECT TB01139_STATUS FROM TB01139 WHERE TB01139_USER = '" +
          Decode64(sessionStorage.getItem('user')) +
          "') ";
      }
      filterstatus = filterstatus + " order by ISNULL(TB01136_INICIAL,'N') DESC, TB01136_NOME ";
      apiList('PrecontratoStatus', '*', '', filterstatus).then((response) => {
        if (response.status === 200) {
          setRowsstatus(response.data);
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

  const handleCloseinfor = () => {
    setShowinfor(false);
    Filtrar();
  };

  const handleClosetotal = () => {
    setShowtotal(false);
  };

  const handleCloseacompanha = () => {
    setShowacompanha(false);
  };

  const Visualizar = () => {
    if (itemselec !== undefined) {
      let item = {};
      item['TB02264_CODIGO'] = itemselec.TB02264_CODIGO;
      setRowselect(item);
      setTitulo('Pré-Contrato selecionado');
      setIcon('feather icon-check-circle h1');
      setShowinfor(true);
    }
  };

  const Fluxo = () => {
    if (itemselec !== undefined) {
      setShowfluxo(true);
    }
  };

  const handleClosefluxo = () => {
    setShowfluxo(false);
    Filtrar();
  };

  const Hist = () => {
    if (itemselec !== '' && itemselec !== undefined) {
      setShowhist(true);
    }
  };

  const handleClosehist = () => {
    setShowhist(false);
  };

  useEffect(() => {
    if (itemselec !== undefined) {
      setCodselec(itemselec.TB02264_CODIGO);
      setContratoselec(itemselec.TB02264_CONTRATO);
      setOperacao(itemselec.TB01138_OPERACAO);
    }
  }, [itemselec]);

  const Informacoes = () => {
    if (itemselec !== undefined) {
      setCarregando(true);
      apiFind('Precontrato', '*', '', "TB02264_CODIGO = '" + itemselec.TB02264_CODIGO + "' ").then((response) => {
        if (response.status === 200) {
          setValuesselec(response.data);
          apiList(
            'FieldFormVW',
            'TB00109_ORDEM,TB00109_TABELA,TB00109_CAMPO,TB00109_ISPRIMARY,TB00109_FUNCAO,TB00109_SELEC,TB00109_FORM,TB00109_TIPO,TB00109_TAMANHO,' +
              'TB00109_FOREIGN,TB00109_KEY,TB00109_TABELAREF,TB00109_CAMPOREF,TB00109_DESCRICAOREF,TB00109_ISFOREIGN,TB00109_TIPOOBJECT,TB00109_TIPOMASCARA,' +
              'TB00109_DECIMAL,TB00109_LARGURA,TB00109_VALUECHECKED,TB00109_VALUEUNCHECKED,TB00109_ITENS,TB00109_VALUES,TB00109_VIEW,TB00109_MASCARA,TB00109_TIPOMULT,' +
              'TB00109_DISABLEINSERT,TB00109_DISABLEUPDATE,TB00109_CAMPOLIST,TB00109_CAMPOREFDROP,TB00109_FILTERAUX,TB00109_CHARNORMAL',
            "cast(1 as int) as line, cast(TB00109_LARGURA as int) as widthfield, cast(TB00109_LARGURA as varchar(10))+'rem' as measure, cast(TB00109_LARGURA - 10 as int) as widthname," +
              ' case TB00109_TIPOOBJECT ' +
              "      when 1 then 'Texto Simples' " +
              "      when 2 then 'Pesquisa' " +
              "      when 4 then 'Numérico' " +
              "      when 5 then 'Data' " +
              "      when 6 then 'Mult-Texto' " +
              "      when 8 then 'Texto Especial' " +
              ' end as nometipo, LOWER(SUBSTRING(TB00109_CAMPO,9,50)) as namefield, ' +
              "TB00003_SELEC2 as selec2, UPPER(TB00003_VALOR) as valor, isnull(TB00003_DIGITA,'S') as digita, " +
              'TB00003_SELEC3 as selec3, TB00003_SELEC4 as selec4,TB00003_SINAL as sinal,' +
              'TB00003_TIPOTAB as tipotab,TB00003_VALORVAL as valorval, TB00003_MENSAGEM as mensagem,TB00003_VOLTAR as voltar, cast(0 as int) as taborder, TB00003_CAMVAL1 as camval1',
            "TB00109_TABELA = 'TB02264' ORDER BY TB00109_FORM,TB00109_ORDEM "
          ).then((response) => {
            if (response.status === 200) {
              setFieldsselec(response.data);
              setCarregando(false);
            }
          });
        }
      });
    }
  };

  const Acompanhamento = () => {
    if (itemselec !== '' && itemselec !== undefined) {
      setShowacompanha(true);
    }
  };

  useEffect(() => {
    fieldsselec.forEach((element, index) => {
      valuesname[index] = element.namefield;
      try {
        if (element.tipoobject !== 5) {
          if (valuesselec[element.namefield] !== null) {
            valuesfieldpre[index] = valuesselec[element.namefield];
          } else {
            if (element.tipoobject !== 2) {
              valuesfieldpre[index] = '';
            }
          }
        } else {
          if (valuesselec[element.namefield] !== undefined) {
            const dt1 =
              valuesselec[element.namefield].substring(3, 5) +
              '/' +
              valuesselec[element.namefield].substring(0, 2) +
              '/' +
              valuesselec[element.namefield].substring(6, 10);
            const datafim = new Date(dt1);
            valuesfieldpre[index] = datafim;
          }
        }
      } catch (error) {
        //console.log(error);
      }
    });
    setValuesname([...valuesname]);
    setValuesfieldpre([...valuesfieldpre]);
  }, [fieldsselec]);

  useEffect(() => {
    if (valuesfieldpre !== undefined && valuesfieldpre.length > 0) {
      setShowinforpre(true);
    }
  }, [valuesfieldpre]);

  const handleCloseinfopre = () => {
    setShowinforpre(false);
    Filtrar();
  };

  const handleClosegmoequip = () => {
    setShowgmoequip(false);
  };

  const clickGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setShowgmoequip(true);
  };

  const keyGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  const Report = () => {
    PrecontratoReport(itemselec.TB02264_CODIGO);
  };

  const Finalizar = () => {
    if (rows.length > 0 && itemselec !== undefined) {
      Confirmation('frmpendencia', 'Deseja FINALIZAR este item ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          let item = {};
          item['codigo'] = itemselec.TB02264_CODIGO;
          item['manual'] = 1;
          apiUpdate('Precontrato', item).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              Filtrar();
            }
          });
        }
      });
    }
  };

  return (
    <React.Fragment>
      <div id="frmpendencia" name="frmpendencia">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px' }}>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Análise de Pendências</Card.Title>
              </Card.Header>
              {valuesfield[17] === 'N' ? (
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

              <Row style={{ marginLeft: '5px', marginBottom: '5px' }}>
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
              </Row>
              <Row>
                <Col style={{ textAlign: 'center', marginBottom: '5px' }}>
                  <Button id="btnFiltrar" className="btn-primary shadow-2 mb-2" onClick={() => Filtrar()}>
                    <i className={'feather icon-filter'} /> Filtrar
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
                  <Button id="btnInfor" className="btn btn-primary shadow-2 mb-2" onClick={() => Informacoes()}>
                    <i className={'feather icon-info'} /> Informações
                  </Button>
                  <Button id="btnAcompanhamento" className="btn btn-primary shadow-2 mb-2" onClick={() => Acompanhamento()}>
                    <i className={'feather icon-book'} /> Acompanhamento
                  </Button>
                  <Button id="btnGmo" className="btn btn-primary shadow-2 mb-2" onClick={() => setShowgmoequip(true)}>
                    <i className={'feather icon-shuffle'} /> GMO
                  </Button>
                  <Button id="btnTotais" className="btn btn-primary shadow-2 mb-2" onClick={() => setShowtotal(true)}>
                    <i className={'feather icon-plus'} /> Totais
                  </Button>
                  <Button id="btnReport" className="btn btn-primary shadow-2 mb-2" onClick={() => Report()}>
                    <i className={'feather icon-printer'} /> Resumo
                  </Button>
                  {itemselec !== undefined && parseInt(itemselec.TB02264_MANUAL) === 0 ? (
                    <Button id="btnFinalizar" className="btn btn-primary shadow-2 mb-2" onClick={(e) => Finalizar()}>
                      <i className={'feather icon-check'} /> Finalizar
                    </Button>
                  ) : (
                    <></>
                  )}
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
            </Card>
          </Row>
        </Row>
        <Modal backdrop="static" size="xl" show={showinfor} centered={true} onHide={handleCloseinfor}>
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
            <StatusFluxo precontrato={codselec} showwfluxo={showwfluxo} setShowfluxo={(data) => setShowfluxo(data)}></StatusFluxo>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="xl" show={showhist} centered={true} onHide={handleClosehist}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-list h1'} />
            &nbsp;Histórico de Atendimento
          </Modal.Header>
          <ModalBody>
            <StatusHistorico precontrato={codselec} showhist={showhist} setShowhist={(data) => setShowhist(data)}></StatusHistorico>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="xl" show={showinforpre} centered={true} onHide={handleCloseinfopre}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-info'} />
            &nbsp;Informaçoes do Pré-Contrato
          </Modal.Header>
          <ModalBody>
            <ContratoInformacoes
              valuesfield={valuesfieldpre}
              setValuesfield={(data) => setValuesfieldpre(data)}
              valuesname={valuesname}
              setValuesname={(data) => setValuesname(data)}
            ></ContratoInformacoes>
          </ModalBody>
        </Modal>

        <Modal backdrop="static" size="xl" show={showtotal} centered={true} onHide={handleClosetotal}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-plus'} />
            &nbsp;Totalizadores
          </Modal.Header>
          <ModalBody>
            <PendenciaTotal rows={rows} setRows={(data) => setRows(data)}></PendenciaTotal>
          </ModalBody>
          <ModalFooter>
            <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleClosetotal}>
              <i className={'feather icon-x-circle'} />
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
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
        <Modal backdrop="static" fullscreen={true} show={showgmoequip} centered={true} onHide={handleClosegmoequip}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-shuffle'} />
            &nbsp; Gestão de Movimentação de Objetos (GMO) - Equipamentos
          </Modal.Header>
          <ModalBody>
            <GmoResumo
              precontrato={codselec}
              contrato={contratoselec}
              showgmoequip={showgmoequip}
              operacao={operacao}
              setShowgmoequip={(data) => setShowgmoequip(data)}
            ></GmoResumo>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" fullscreen={true} show={showdash} centered={true} onHide={handleCloseShowdash}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-bar-chart h1'} />
            &nbsp;Gráficos
          </Modal.Header>
          <ModalBody>
            <DashboardFind
              module={'AN02264'}
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

export default PrecontratoPendencia;
