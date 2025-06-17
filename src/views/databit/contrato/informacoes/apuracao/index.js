import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card, Collapse, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiList, apiInsert, apiUpdate, apiDelete, apiFind, apiID } from '../../../../../api/crudapi';
import { Link } from 'react-router-dom';
import { Confirmation } from '../../../../../components/Confirmation';
import AGGrid from '../../../../../components/AGGrid';

const ContratoApuracao = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [fieldsinfor, setFieldsinfor] = React.useState([]);
  const [fieldsfranquia, setFieldsfranquia] = React.useState([]);
  const [rowsequip, setRowsequip] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [disabled, setDisabled] = React.useState(true);
  const [itemselec, setItemselec] = React.useState();
  const { cabecalho, setCabecalho } = props;
  const { valuesname, setValuesname } = props;
  const [indexitem, setIndexitem] = React.useState(0);
  const [totais, setTotais] = React.useState([]);
  const [valuesinvisible, setValuesinvisible] = React.useState([]);
  const [contrato, setContrato] = React.useState([]);
  const [showsave, setShowsave] = useState(false);

  const [inclusao, setInclusao] = React.useState(false);
  const [contratada, setContratada] = React.useState(0);
  const [aprovada, setAprovada] = React.useState(0);
  const [liberada, setLiberada] = React.useState(0);
  const [altinfor, setAltinfor] = React.useState();
  const [dtgerado, setDtgerado] = React.useState('');
  const [validations, setValidations] = React.useState([]);
  const [operacaotipo, setOperacaotipo] = React.useState('');

  useEffect(() => {
    setCarregando(true);
    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['defequip', 'operacaotipo'];
    validation['sinal'] = [1, 1];
    validation['tipotab'] = 'G';
    validation['valorval'] = ['S', 'R'];
    validation['cor'] = ['#ffff99', '#ff0000'];
    validation['corline'] = ['#000', '#ffff'];
    validation['total'] = 2;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);

    apiFind(
      'Precontrato',
      'TB02264_CONTRATO,TB02264_NOME,TB02264_QTDECONTRATA,TB02264_VLRCONTRATA,TB02264_TIPOCONTR,TB02264_TIPOFRANQUIA,TB02264_ANALFRANQUIA,TB02264_FRANQTOTAL,TB02264_VLRFRANQTOTAL,TB02264_FRANQPB,' +
        'TB02264_VLRFRANQPB,TB02264_FRANQCOLOR,TB02264_VLRFRANQCOLOR,TB02264_FRANQDG,TB02264_VLRFRANQDG,TB02264_FRANQGF,TB02264_VLRFRANQGF,TB02264_FRANQGFC,TB02264_VLRFRANQGFC,TB02264_OBS,' +
        'TB02264_CODIGO,TB02264_STATUS,TB02264_DTGERADO,TB02264_TIPOPRE',
      '',
      " TB02264_CODIGO = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
    ).then((response) => {
      if (response.status === 200) {
        setContrato(response.data);
        let tempgerado = response.data.dtgerado;
        let tipopre = response.data.tipopre;
        setDtgerado(tempgerado);
        let statusatual = response.data.status;
        if (statusatual !== '' && statusatual !== undefined) {
          apiFind('PrecontratoStatus', '*', '', "TB01136_CODIGO = '" + statusatual + "' ").then((response) => {
            if (response.status === 200) {
              setAltinfor(response.data.altinfor === 'S');
              apiFind('PrecontratoTipo', '*', '', "TB01138_CODIGO = '" + tipopre + "' ").then((response) => {
                if (response.status === 200) {
                  setOperacaotipo(response.data.operacao);
                  setCarregando(false);
                }
              });
            }
          });
        }

        setValuesinvisible([
          false,
          false,
          false,
          false,
          true,
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
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false
        ]);

        setFieldsinfor([
          {
            id: 0,
            campo: 'TB02247_CODIGO',
            funcao: 'Código',
            tipo: 'varchar',
            nome: 'codigo',
            tamanho: 5,
            tipoobject: 1,
            widthfield: 6,
            measure: '6rem',
            invisible: valuesinvisible[0],
            readonly: true,
            disabled: disabled
          },
          {
            id: 1,
            campo: 'TB02247_PRODUTO',
            funcao: 'Equipamento',
            tipo: 'varchar',
            nome: 'produto',
            tipoobject: 2,
            tamanho: 5,
            widthfield: 62,
            measure: '62rem',
            tabelaref: 'TB01010',
            widthname: 53,
            invisible: valuesinvisible[1],
            disabled: disabled
          },
          {
            id: 2,
            campo: 'TB02247_qtfechada',
            funcao: 'Contratada',
            tipo: 'int',
            nome: 'qtfechada',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 10,
            measure: '10rem',
            invisible: valuesinvisible[2],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 3,
            campo: 'TB02247_QTAPROVADA',
            funcao: 'Aprovada',
            tipo: 'int',
            nome: 'qtaprovada',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 10,
            measure: '10rem',
            invisible: valuesinvisible[3],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 4,
            campo: 'TB02247_QTLIBERADA',
            funcao: 'Em Contrato',
            tipo: 'int',
            nome: 'qtliberada',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 10,
            measure: '10rem',
            invisible: valuesinvisible[4],
            decimal: 0,
            disabled: true
          },
          {
            id: 5,
            campo: 'TB02247_SITUACAOEQUIP',
            funcao: 'Situação',
            tipo: 'int',
            nome: 'situacaoequip',
            tamanho: 1,
            tipoobject: 11,
            widthfield: 10,
            measure: '10rem',
            itens: 'Novo,Usado',
            values: '0,1',
            invisible: valuesinvisible[5],
            disabled: disabled
          },
          {
            id: 6,
            campo: 'TB02247_OPERACAO',
            funcao: 'Operação',
            tipo: 'int',
            nome: 'operacao',
            tamanho: 1,
            tipoobject: 11,
            widthfield: 15,
            measure: '15rem',
            itens: 'Páginas Produzidas,Páginas Excedentes,Apenas valor FIXO',
            values: '0,1,2',
            invisible: valuesinvisible[6],
            disabled: disabled
          },
          {
            id: 7,
            campo: 'TB02247_VLRFIXO',
            funcao: 'Valor Fixo',
            tipo: 'numeric',
            nome: 'vlrfixo',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 13,
            measure: '13rem',
            invisible: valuesinvisible[7],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 26,
            campo: 'TB02247_CODSITE',
            funcao: 'Tipo Endereço',
            tipo: 'varchar',
            nome: 'codsite',
            tipoobject: 2,
            tamanho: 6,
            widthfield: 57,
            measure: '57rem',
            tabelaref: 'TB02176',
            widthname: 48,
            invisible: valuesinvisible[26],
            disabled: disabled,
            filteraux: " AND TB02176_CONTRATO = '" + cabecalho[valuesname.indexOf('contrato')] + "' "
          },
          {
            id: 27,
            campo: 'TB02247_PREVISAO',
            funcao: 'Previsao',
            tipo: 'datetime',
            nome: 'previsao',
            tamanho: 11,
            tipoobject: 5,
            widthfield: 11,
            measure: '11rem',
            disabled: disabled,
            invisible: valuesinvisible[27]
          },
          {
            id: 28,
            campo: 'TB02247_DEFEQUIP',
            funcao: 'Tipo Equipamento',
            tipo: 'int',
            nome: 'operacao',
            tamanho: 1,
            tipoobject: 11,
            widthfield: 10,
            measure: '10rem',
            itens: 'Orginal,Substituto',
            values: 'O,S',
            invisible: valuesinvisible[28],
            disabled: disabled
          },
          {
            id: 29,
            campo: 'TB02247_PRODUTO2',
            funcao: 'Equipamento de Origem',
            tipo: 'varchar',
            nome: 'produto',
            tipoobject: 2,
            tamanho: 5,
            widthfield: 58,
            measure: '58rem',
            tabelaref: 'TB01010',
            widthname: 49,
            invisible: valuesinvisible[29],
            disabled: disabled,
            filteraux:
              "AND TB01010_CODIGO IN (SELECT TB02247_PRODUTO FROM TB02247 WHERE TB02247_PRECONTRATO  = '" +
              cabecalho[valuesname.indexOf('codigo')] +
              "' AND TB02247_DEFEQUIP = 'O') AND TB01010_CODIGO <> '" +
              valuesfield[1] +
              "' "
          },
          {
            id: 30,
            campo: 'TB02247_OPERACAOTIPO',
            funcao: 'Movimentação',
            tipo: 'varchar',
            nome: 'operacaotipo',
            tamanho: 1,
            tipoobject: 11,
            widthfield: 11,
            measure: '11rem',
            itens: 'Adicionar,Retirar',
            values: 'A,R',
            invisible: valuesinvisible[30],
            disabled: disabled
          }
        ]);

        setFieldsfranquia([
          {
            id: 8,
            campo: 'TB02247_FRANQTOTAL',
            funcao: 'Franquia TOTAL',
            tipo: 'int',
            nome: 'franqtotal',
            tamanho: 9,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[8],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 9,
            campo: 'TB02247_VLRFRANQTOTAL',
            funcao: 'Valor Franquia',
            tipo: 'numeric',
            nome: 'vlrfranqtotal',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[9],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 10,
            campo: 'TB02247_VLRUNITTOTAL',
            funcao: 'Cópia TOTAL',
            tipo: 'int',
            nome: 'vlrunittotal',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 12,
            measure: '11.5rem',
            invisible: valuesinvisible[10],
            decimal: 5,
            disabled: disabled
          },
          {
            id: 11,
            campo: 'TB02247_FRANQPB',
            funcao: 'Franquia A4 PB',
            tipo: 'int',
            nome: 'franqpb',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[11],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 12,
            campo: 'TB02247_VLRFRANQPB',
            funcao: 'Valor Franquia',
            tipo: 'numeric',
            nome: 'vlrfranqpb',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[12],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 13,
            campo: 'TB02247_VLRUNITPB',
            funcao: 'Cópia A4 PB',
            tipo: 'int',
            nome: 'vlrunitpb',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 12,
            measure: '11.5rem',
            invisible: valuesinvisible[13],
            decimal: 5,
            disabled: disabled
          },
          {
            id: 14,
            campo: 'TB02247_FRANQCOLOR',
            funcao: 'Franquia A4 COLOR',
            tipo: 'int',
            nome: 'franqcolor',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[14],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 15,
            campo: 'TB02247_VLRFRANQCOLOR',
            funcao: 'Valor Franquia',
            tipo: 'numeric',
            nome: 'vlrfranqcolor',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[15],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 16,
            campo: 'TB02247_VLRUNITCOLOR',
            funcao: 'Cópia A4 COLOR',
            tipo: 'int',
            nome: 'vlrunitcolor',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11.5rem',
            invisible: valuesinvisible[16],
            decimal: 5,
            disabled: disabled
          },
          {
            id: 17,
            campo: 'TB02247_FRANQDG',
            funcao: 'Franquia Digitalização',
            tipo: 'int',
            nome: 'franqdg',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[17],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 18,
            campo: 'TB02247_VLRFRANQDG',
            funcao: 'Valor Franquia',
            tipo: 'numeric',
            nome: 'vlrfranqdg',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[18],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 19,
            campo: 'TB02247_VLRUNITDG',
            funcao: 'Cópia Digitalização',
            tipo: 'int',
            nome: 'vlrunitdg',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11.5rem',
            invisible: valuesinvisible[19],
            decimal: 5,
            disabled: disabled
          },
          {
            id: 20,
            campo: 'TB02247_FRANQGF',
            funcao: 'Franquia A3 PB',
            tipo: 'int',
            nome: 'franqgf',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[20],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 21,
            campo: 'TB02247_VLRFRANQGF',
            funcao: 'Valor Franquia',
            tipo: 'numeric',
            nome: 'vlrfranqgf',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[21],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 22,
            campo: 'TB02247_VLRUNITGF',
            funcao: 'Cópia A3 PB',
            tipo: 'int',
            nome: 'vlrunitgf',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11.5rem',
            invisible: valuesinvisible[22],
            decimal: 5,
            disabled: disabled
          },
          {
            id: 23,
            campo: 'TB02247_FRANQGFC',
            funcao: 'Franquia A3 COLOR',
            tipo: 'int',
            nome: 'franqgfc',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[23],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 24,
            campo: 'TB02247_VLRFRANQGFC',
            funcao: 'Valor Franquia',
            tipo: 'numeric',
            nome: 'vlrfranqgfc',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[24],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 25,
            campo: 'TB02247_VLRUNITGFC',
            funcao: 'Cópia A3 COLOR',
            tipo: 'int',
            nome: 'vlrunitgfc',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11.5rem',
            invisible: valuesinvisible[25],
            decimal: 5,
            disabled: disabled
          }
        ]);

        setColumns([
          { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 76 },
          { headerClassName: 'header-list', field: 'produto', headerName: 'Cod.Equip', width: 76 },
          { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 91 },
          { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição do Equipamento', width: 325 },
          { headerClassName: 'header-list', field: 'nomesite', headerName: 'Descrição do Endereço', width: 160 },
          { headerClassName: 'header-list', field: 'nomesituacao', headerName: 'Situação', width: 78 },
          { headerClassName: 'header-list', field: 'qtfechada', headerName: 'Contratada', width: 80, type: 'number' },
          { headerClassName: 'header-list', field: 'qtaprovada', headerName: 'Aprovada', width: 80, type: 'number' },
          { headerClassName: 'header-list', field: 'qtliberada', headerName: 'Contrato', width: 80, type: 'number' }
        ]);
      }
    });
  }, []);

  useEffect(() => {
    if (columns.length > 0) {
      Filtrar();
    }
  }, [columns]);

  const Filtrar = () => {
    setCarregando(true);
    apiList(
      'ContratoItemVW',
      'TB02274_TIPO,TB02274_PRODUTO,TB02274_CODSERV,' +
        'TB02274_QTCONTRATADA,TB02274_QTAPROVADA,TB02274_QTLIBERADA,TB02274_CODITEM,TB02274_NOMEITEM,TB02274_TIPOITEM,TB02274_CODIGO,TB02274_IDITEM,',
      '',
      "TB02274_CODIGO = '" +
        cabecalho[valuesname.indexOf('codigo')] +
        "'  and TB02274_QTCONTRATADA+TB02274_QTAPROVADA+TB02274_QTLIBERADA > 0 order by TB02274_NOMEITEM"
    ).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setRows(response.data);
      }
    });
  };

  useEffect(() => {
    if (rows.length > 0) {
      setCarregando(true);
      apiList(
        'ContratoApuracaoVW',
        'TB02247_PRECONTRATO, TB02247_CODITEM,TB02247_IDITEM, TB02247_CODIGO, TB02247_PRODUTO, TB02247_qtfechada, TB02247_qtfechadaB, TB02247_QTAPROVADA, ' +
          'TB02247_QTAPROVADAB, TB02247_QTLIBERADA, TB02247_QTLIBERADAB, TB02247_SITUACAOEQUIP, TB02247_OPERACAO,TB02247_VLRFIXO, TB02247_FRANQTOTAL, TB02247_FRANQPB, ' +
          'TB02247_FRANQCOLOR, TB02247_FRANQDG, TB02247_FRANQGF,TB02247_FRANQGFC, TB02247_VLRFRANQTOTAL, TB02247_VLRFRANQPB, TB02247_VLRFRANQCOLOR, TB02247_VLRFRANQDG, ' +
          'TB02247_VLRFRANQGF, TB02247_VLRFRANQGFC, TB02247_VLRUNITTOTAL, TB02247_VLRUNITPB, TB02247_VLRUNITCOLOR, TB02247_VLRUNITDG,TB02247_VLRUNITGF, TB02247_VLRUNITGFC, TB02247_OBS,' +
          'TB01010_REFERENCIA, TB01010_CODBARRAS,TB01010_CODAUXILIAR, TB02247_NOMEPROD, TB02247_NOMESITUACAO,TB02247_NOMEOPERACAO,TB02247_CODSITE,TB02247_NOMESITE,' +
          'TB02247_PREVISAO,TB02247_DEFEQUIP,TB02247_PRODUTO2,TB02247_OPERACAOTIPO',
        '',
        "TB02247_PRECONTRATO = '" +
          cabecalho[valuesname.indexOf('codigo')] +
          "'  and TB02247_CODITEM = '" +
          rows[indexitem].coditem +
          "' and TB02247_IDITEM = '" +
          rows[indexitem].iditem +
          "' order by TB02247_NOMEPROD"
      ).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setCarregando(false);
          setRowsequip(response.data);
        }
      });
    }
  }, [indexitem, rows]);

  useEffect(() => {
    if (rowsequip.length > 0) {
      setCarregando(true);
      apiFind(
        'ContratoTotal',
        'TB02275_QTCONTRATADA,TB02275_QTAPROVADA,TB02275_QTLIBERADA',
        '',
        "TB02275_PRECONTRATO = '" +
          cabecalho[valuesname.indexOf('codigo')] +
          "'  and TB02275_CODITEM = '" +
          rows[indexitem].coditem +
          "' and TB02275_IDITEM = '" +
          rows[indexitem].iditem +
          "' "
      ).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          setTotais(response.data);
          valuesfield[0] = '';
          valuesfield[1] = '';
          valuesfield[2] = 0;
          valuesfield[3] = 0;
          valuesfield[4] = 0;
          valuesfield[5] = 0;
          valuesfield[6] = 0;
          valuesfield[7] = 0;
          valuesfield[8] = 0;
          valuesfield[9] = 0;
          valuesfield[10] = 0;
          valuesfield[11] = 0;
          valuesfield[12] = 0;
          valuesfield[13] = 0;
          valuesfield[14] = 0;
          valuesfield[15] = 0;
          valuesfield[16] = 0;
          valuesfield[17] = 0;
          valuesfield[18] = 0;
          valuesfield[19] = 0;
          valuesfield[20] = 0;
          valuesfield[21] = 0;
          valuesfield[22] = 0;
          valuesfield[23] = 0;
          valuesfield[24] = 0;
          valuesfield[25] = 0;
          valuesfield[26] = '';
          valuesfield[27] = undefined;
          valuesfield[28] = 'O';
          valuesfield[29] = '';
          if (operacaotipo === 'D') {
            valuesfield[30] = 'R';
          } else {
            valuesfield[30] = 'A';
          }
          setValuesfield([...valuesfield]);
          valuesfield2[1] = '';
          valuesfield2[26] = '';
          setValuesfield2([...valuesfield2]);
        }
      });
    }
  }, [rowsequip]);

  useEffect(() => {
    if (itemselec !== undefined) {
      valuesfield2[1] = '';
      setValuesfield2([...valuesfield2]);
      valuesfield[0] = itemselec['codigo'];
      valuesfield[1] = itemselec['produto'];
      valuesfield[2] = itemselec['qtfechada'];
      valuesfield[3] = itemselec['qtaprovada'];
      valuesfield[4] = itemselec['qtliberada'];
      valuesfield[5] = itemselec['situacaoequip'];
      valuesfield[6] = itemselec['operacao'];
      valuesfield[7] = itemselec['vlrfixo'];
      valuesfield[8] = itemselec['franqtotal'];
      valuesfield[9] = itemselec['vlrfranqtotal'];
      valuesfield[10] = itemselec['vlrunittotal'];
      valuesfield[11] = itemselec['franqpb'];
      valuesfield[12] = itemselec['vlrfranqpb'];
      valuesfield[13] = itemselec['vlrunitpb'];
      valuesfield[14] = itemselec['franqcolor'];
      valuesfield[15] = itemselec['vlrfranqcolor'];
      valuesfield[16] = itemselec['vlrunitcolor'];
      valuesfield[17] = itemselec['franqdg'];
      valuesfield[18] = itemselec['vlrfranqdg'];
      valuesfield[19] = itemselec['vlrunitdg'];
      valuesfield[20] = itemselec['franqgf'];
      valuesfield[21] = itemselec['vlrfranqgf'];
      valuesfield[22] = itemselec['vlrunitgf'];
      valuesfield[23] = itemselec['franqgfc'];
      valuesfield[24] = itemselec['vlrfranqgfc'];
      valuesfield[25] = itemselec['vlrunitgfc'];
      valuesfield[26] = itemselec['codsite'];

      if (itemselec['previsao'] !== undefined && itemselec['previsao'] !== null) {
        const dt1 =
          itemselec['previsao'].substring(3, 5) +
          '/' +
          itemselec['previsao'].substring(0, 2) +
          '/' +
          itemselec['previsao'].substring(6, 10);
        const datafim = new Date(dt1);
        valuesfield[27] = datafim;
      }
      valuesfield[28] = itemselec['defequip'];
      valuesfield[29] = itemselec['produto2'];
      valuesfield[30] = itemselec['operacaotipo'];
      setValuesfield([...valuesfield]);

      setContratada(itemselec['qtfechada']);
      setAprovada(itemselec['qtaprovada']);
      setLiberada(itemselec['qtliberada']);
    }
  }, [itemselec]);

  useEffect(() => {
    desabilitarCampos();
  }, [valuesfield[6]]);

  useEffect(() => {
    const defequip = valuesfield[28];
    valuesinvisible[29] = defequip === 'O';
    setValuesinvisible([...valuesinvisible]);
  }, [valuesfield[28]]);

  const desabilitarCampos = () => {
    if (contrato.tipofranquia === 'G') {
      valuesinvisible[8] = contrato.analfranquia === 'M';
      valuesinvisible[9] = contrato.analfranquia === 'M';
      valuesinvisible[10] = contrato.tipofranquia === 'T';
    } else {
      valuesinvisible[8] = true;
      valuesinvisible[9] = true;
      valuesinvisible[10] = true;
    }
    valuesinvisible[30] = operacaotipo !== 'A';
    setValuesinvisible([...valuesinvisible]);
    /*if (parseInt(valuesfield[6]) === 0) {
      valuesinvisible[8] = true;
      valuesinvisible[9] = true;
      valuesinvisible[10] = contrato.tipofranquia === 'T';

      valuesinvisible[11] = true;
      valuesinvisible[12] = true;
      valuesinvisible[13] = contrato.tipofranquia === 'G';

      valuesinvisible[14] = true;
      valuesinvisible[15] = true;
      valuesinvisible[16] = contrato.tipofranquia === 'G';

      valuesinvisible[17] = true;
      valuesinvisible[18] = true;
      valuesinvisible[19] = contrato.tipofranquia === 'G';

      valuesinvisible[20] = true;
      valuesinvisible[21] = true;
      valuesinvisible[22] = contrato.tipofranquia === 'G';

      valuesinvisible[23] = true;
      valuesinvisible[24] = true;
      valuesinvisible[25] = contrato.tipofranquia === 'G';
    } else {
      if (contrato.tipofranquia === 'G') {
        valuesinvisible[8] = contrato.analfranquia === 'M';
        valuesinvisible[9] = contrato.analfranquia === 'M';
        valuesinvisible[10] = contrato.tipofranquia === 'T';
      } else {
        valuesinvisible[8] = true;
        valuesinvisible[9] = true;
        valuesinvisible[10] = true;
      }

      valuesinvisible[11] = contrato.analfranquia !== 'M';
      valuesinvisible[12] = contrato.analfranquia !== 'M';
      valuesinvisible[13] = contrato.tipofranquia === 'G';

      valuesinvisible[14] = contrato.analfranquia !== 'M';
      valuesinvisible[15] = contrato.analfranquia !== 'M';
      valuesinvisible[16] = contrato.tipofranquia === 'G';

      valuesinvisible[17] = contrato.analfranquia !== 'M';
      valuesinvisible[18] = contrato.analfranquia !== 'M';
      valuesinvisible[19] = contrato.tipofranquia === 'G';

      valuesinvisible[20] = contrato.analfranquia !== 'M';
      valuesinvisible[21] = contrato.analfranquia !== 'M';
      valuesinvisible[22] = contrato.tipofranquia === 'G';

      valuesinvisible[23] = contrato.analfranquia !== 'M';
      valuesinvisible[24] = contrato.analfranquia !== 'M';
      valuesinvisible[25] = contrato.tipofranquia === 'G';
    }
    valuesinvisible[30] = operacaotipo !== 'A';
    setValuesinvisible([...valuesinvisible]);*/
  };

  const Incluir = () => {
    apiID('ContratoApuracao').then((response) => {
      if (response.status === 200) {
        valuesfield[0] = response.data.mensagem;
        valuesfield[1] = '';
        valuesfield[2] = 0;
        valuesfield[3] = 0;
        valuesfield[4] = 0;
        valuesfield[5] = 0;
        valuesfield[6] = 0;
        valuesfield[7] = 0;
        valuesfield[8] = 0;
        valuesfield[9] = 0;
        valuesfield[10] = 0;
        valuesfield[11] = 0;
        valuesfield[12] = 0;
        valuesfield[13] = 0;
        valuesfield[14] = 0;
        valuesfield[15] = 0;
        valuesfield[16] = 0;
        valuesfield[17] = 0;
        valuesfield[18] = 0;
        valuesfield[19] = 0;
        valuesfield[20] = 0;
        valuesfield[21] = 0;
        valuesfield[22] = 0;
        valuesfield[23] = 0;
        valuesfield[24] = 0;
        valuesfield[25] = 0;
        valuesfield[26] = '';
        valuesfield[27] = undefined;
        valuesfield[28] = 'O';
        valuesfield[29] = '';
        if (operacaotipo === 'D') {
          valuesfield[30] = 'R';
        } else {
          valuesfield[30] = 'A';
        }
        setValuesfield([...valuesfield]);
        valuesfield2[1] = '';
        valuesfield2[26] = '';
        setValuesfield2([...valuesfield2]);
        setDisabled(false);
        desabilitarCampos();
        setInclusao(true);
        setShowsave(true);
        setContratada(0);
        setAprovada(0);
        setLiberada(0);
        try {
          document.getElementById('TB02247_PRODUTO').focus();
        } catch (error) {
          //console.log(error);
        }
      }
    });
  };

  const Excluir = () => {
    if (rows.length > 0 && valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      Confirmation('frmequipamento', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          apiDelete('ContratoApuracao', itemselec).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              if (response.data.status === 1) {
                setItemselec(undefined);
                setDisabled(true);
                setShowsave(false);
                Filtrar();
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          });
        }
      });
    } else {
      setItemvariant(1);
      setMensagem('Não possui nenhum registro para ser excluído !');
    }
  };

  const Editar = () => {
    setDisabled(false);
    desabilitarCampos();
    setInclusao(false);
    try {
      document.getElementById('TB02247_PRODUTO').focus();
    } catch (error) {
      //console.log(error);
    }
  };

  const Salvar = () => {
    if (document.getElementById('TB02247_PRODUTO').value === undefined || document.getElementById('TB02247_PRODUTO').value === '') {
      setItemvariant(1);
      setMensagem('Campo Equipamento é preenchimento obrigatório !');
      document.getElementById('TB02247_PRODUTO').focus();
    } else {
      setCarregando(true);
      try {
        let item = {};
        item['codigo'] = valuesfield[0];
        item['produto'] = valuesfield[1];
        item['qtfechada'] = valuesfield[2];
        item['qtaprovada'] = valuesfield[3];
        item['qtliberada'] = valuesfield[4];
        item['situacaoequip'] = valuesfield[5];
        item['operacao'] = valuesfield[6];
        item['vlrfixo'] = valuesfield[7];
        item['franqtotal'] = valuesfield[8];
        item['vlrfranqtotal'] = valuesfield[9];
        item['vlrunittotal'] = valuesfield[10];
        item['franqpb'] = valuesfield[11];
        item['vlrfranqpb'] = valuesfield[12];
        item['vlrunitpb'] = valuesfield[13];
        item['franqcolor'] = valuesfield[14];
        item['vlrfranqcolor'] = valuesfield[15];
        item['vlrunitcolor'] = valuesfield[16];
        item['franqdg'] = valuesfield[17];
        item['vlrfranqdg'] = valuesfield[18];
        item['vlrunitdg'] = valuesfield[19];
        item['franqgf'] = valuesfield[20];
        item['vlrfranqgf'] = valuesfield[21];
        item['vlrunitgf'] = valuesfield[22];
        item['franqgfc'] = valuesfield[23];
        item['vlrfranqgfc'] = valuesfield[24];
        item['vlrunitgfc'] = valuesfield[25];
        item['coditem'] = rows[indexitem].coditem;
        item['iditem'] = rows[indexitem].iditem;
        item['qtfechadab'] = contratada;
        item['qtaprovadab'] = aprovada;
        item['qtliberadab'] = liberada;
        item['precontrato'] = cabecalho[valuesname.indexOf('codigo')];
        item['contrato'] = cabecalho[valuesname.indexOf('contrato')];
        item['nome'] = valuesfield2[1];
        item['codsite'] = valuesfield[26];
        if (valuesfield[27] !== '' && valuesfield[27] !== undefined && valuesfield[27] !== null) {
          const tmdata1 = Date.parse(valuesfield[27]);
          const dt1 = new Date(tmdata1);
          const data1 = dt1.toLocaleDateString('en-US');
          item['previsao'] = data1 + ' 00:00:00';
        } else {
          item['previsao'] = null;
        }
        item['defequip'] = valuesfield[28];
        item['produto2'] = valuesfield[29];
        item['operacaotipo'] = valuesfield[30];
        if (inclusao) {
          apiInsert('ContratoApuracao', item).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              if (response.data.status === 1) {
                setDisabled(response.data.status === 1);
                setItemselec(undefined);
                setShowsave(false);
                Filtrar();
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          });
        } else {
          apiUpdate('ContratoApuracao', item).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              if (response.data.status === 1) {
                setDisabled(response.data.status === 1);
                setItemselec(undefined);
                setShowsave(false);
                Filtrar();
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          });
        }
      } catch (error) {
        setItemvariant(-1);
        setMensagem(error);
      }
    }
  };

  const handleCloseShowsave = () => {
    setItemselec(undefined);
    setDisabled(true);
    setShowsave(false);
  };

  const Cancelar = () => {
    setItemselec(undefined);
    setDisabled(true);
    setShowsave(false);
  };

  const clickGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setShowsave(true);
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setItemselec(newSelection);
      setShowsave(true);
    }
    if (altinfor) {
      if (event.key === 'Delete') {
        setItemselec(newSelection);
        Excluir();
      }
    }
  };

  return (
    <React.Fragment>
      <div id="frmequipamento" name="frmequipamento">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px' }}>
          <Row style={{ marginTop: '10px' }}>
            <Col style={{ marginTop: '5px' }}>
              <Row>
                <Col lg={1}>
                  <div style={{ height: '25px', width: '25px', backgroundColor: '#ffff99', border: 'solid', borderWidth: '2px' }}></div>
                </Col>
                <Col>
                  <p style={{ marginTop: '4px' }} className="text-muted">
                    Equipamento Substituído
                  </p>
                </Col>
              </Row>
            </Col>
            <Col style={{ marginTop: '5px' }}>
              <Row>
                <Col lg={1}>
                  <div style={{ height: '25px', width: '25px', backgroundColor: '#ff0000', border: 'solid', borderWidth: '2px' }}></div>
                </Col>
                <Col>
                  <p style={{ marginTop: '4px' }} className="text-muted">
                    Retirada de Equipamento
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          {rows.map((item, index) => (
            <Row key={index}>
              <Card key={index}>
                <Card.Header key={index}>
                  <Card.Title as="h5" key={index}>
                    <Link onClick={() => setIndexitem(index)} to="#" key={index}>
                      {item.nomeitem}
                    </Link>
                  </Card.Title>
                </Card.Header>

                <Collapse in={indexitem === index} key={index}>
                  {rows.length > 0 ? (
                    <div key={index}>
                      <Row>
                        <AGGrid
                          width="100%"
                          height="260px"
                          rows={rowsequip}
                          columns={columns}
                          loading={carregando}
                          onKeyDown={keyGrid}
                          onDoubleClick={dblClickGrid}
                          onCelClick={clickGrid}
                          validations={validations}
                        ></AGGrid>
                      </Row>

                      <Row
                        className="border-total"
                        style={{ marginLeft: '0.5px', marginRight: '0.5px', marginBottom: '10px', padding: '5px 5px 5px 5px' }}
                      >
                        <Col>
                          <h5 className="mb-1 text-muted">
                            Total Contratada : {totais.qtcontratada} / {rows[indexitem].qtcontratada}
                          </h5>
                        </Col>
                        <Col>
                          <h5 className="mb-1 text-muted">
                            Total Aprovada : {totais.qtaprovada} / {rows[indexitem].qtaprovada}
                          </h5>
                        </Col>
                        <Col>
                          <h5 className="mb-1 text-muted">
                            Total Liberada : {totais.qtliberada} / {rows[indexitem].qtliberada}
                          </h5>
                        </Col>
                      </Row>
                      {altinfor ? (
                        <Row style={{ textAlign: 'right', marginTop: '10px' }}>
                          <Col>
                            <Button id="btnIncluir" className="btn btn-primary  mb-2" onClick={Incluir}>
                              <i className={'feather icon-star'} /> Novo Equipamento
                            </Button>
                            <Button id="btnExcluir" className="btn btn-success  mb-2" disabled={!disabled} onClick={Excluir}>
                              <i className={'feather icon-trash'} /> Excluir Equipamento
                            </Button>
                          </Col>
                        </Row>
                      ) : (
                        <></>
                      )}

                      <div id="frmitem" name="frmitem">
                        <Modal backdrop="static" size="xl" show={showsave} centered={true} onHide={handleCloseShowsave}>
                          <Modal.Header className="h5" closeButton>
                            <i className={'feather icon-printer h1'} />
                            &nbsp;Definição de Equipamentos
                          </Modal.Header>
                          <ModalBody>
                            <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
                            <Row>
                              <Col>
                                <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
                                  <Card.Header>
                                    <Card.Title as="h5">Informações Cadastrais</Card.Title>
                                  </Card.Header>

                                  <div>
                                    <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                                      {fieldsinfor.map((field, index) => (
                                        <CreateObject
                                          key={index}
                                          field={field}
                                          index={field.id}
                                          fields={fieldsinfor}
                                          valuesfield={valuesfield}
                                          setValuesfield={(data) => setValuesfield(data)}
                                          valuesfield2={valuesfield2}
                                          setValuesfield2={(data) => setValuesfield2(data)}
                                          invisible={valuesinvisible[field.id]}
                                          disabled={disabled}
                                        ></CreateObject>
                                      ))}
                                    </Row>
                                  </div>
                                </Card>
                              </Col>
                            </Row>
                            <Row style={{ marginTop: '5px' }}>
                              <Col style={{ marginLeft: '10px' }}>
                                <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
                                  <Card.Header>
                                    <Card.Title as="h5">Informações de Franquia / Cópias </Card.Title>
                                  </Card.Header>

                                  <div>
                                    <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                                      {fieldsfranquia.map((field, index) => (
                                        <CreateObject
                                          key={index}
                                          field={field}
                                          index={field.id}
                                          fields={fieldsfranquia}
                                          valuesfield={valuesfield}
                                          setValuesfield={(data) => setValuesfield(data)}
                                          valuesfield2={valuesfield2}
                                          invisible={valuesinvisible[field.id]}
                                          disabled={disabled}
                                        ></CreateObject>
                                      ))}
                                    </Row>
                                  </div>
                                </Card>
                              </Col>
                            </Row>
                          </ModalBody>
                          <ModalFooter>
                            {altinfor ? (
                              <Row style={{ textAlign: 'rigth' }}>
                                <Col>
                                  <Button id="btnEditar" className="btn shadow-2 mb-2" disabled={!disabled} onClick={Editar}>
                                    <i className={'feather icon-edit'} /> Editar
                                  </Button>
                                  <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" disabled={disabled} onClick={Salvar}>
                                    <i className={'feather icon-save'} /> Salvar
                                  </Button>
                                  <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" disabled={disabled} onClick={Cancelar}>
                                    <i className={'feather icon-x'} />
                                    Cancelar
                                  </Button>
                                </Col>
                              </Row>
                            ) : (
                              <></>
                            )}
                            <Row>
                              <Alert
                                show={mensagem !== '' && mensagem !== undefined}
                                dismissible
                                variant={alertVariants[itemvariant]}
                                onClick={() => setMensagem(undefined)}
                              >
                                {mensagem}
                              </Alert>
                            </Row>
                          </ModalFooter>
                        </Modal>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </Collapse>
              </Card>
            </Row>
          ))}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ContratoApuracao;
