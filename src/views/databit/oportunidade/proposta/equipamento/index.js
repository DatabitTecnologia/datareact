import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card, Collapse, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiList, apiInsert, apiUpdate, apiDelete, apiFind, apiID } from '../../../../../api/crudapi';
import { Link } from 'react-router-dom';
import { Confirmation } from '../../../../../components/Confirmation';
import AGGrid from '../../../../../components/AGGrid';

const PropostaEquipamento = (props) => {
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
  const [altproposta, setAltproposta] = React.useState();
  const [precontrato, setPrecontrato] = React.useState('');
  const [operacaotipo, setOperacaotipo] = React.useState('');
  const [validations, setValidations] = React.useState([]);

  useEffect(() => {
    setCarregando(true);
    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['operacaotipo'];
    validation['sinal'] = [1];
    validation['tipotab'] = 'G';
    validation['valorval'] = ['R'];
    validation['cor'] = ['#ff0000'];
    validation['corline'] = ['#ffff'];
    validation['total'] = 1;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);

    apiFind(
      'PropostaContrato',
      'TB02260_CONTRATO,TB02260_NOME,TB02260_QTDECONTRATA,TB02260_VLRCONTRATA,TB02260_TIPOCONTR,TB02260_TIPOFRANQUIA,TB02260_ANALFRANQUIA,TB02260_FRANQTOTAL,TB02260_VLRFRANQTOTAL,TB02260_FRANQPB,' +
        'TB02260_VLRFRANQPB,TB02260_FRANQCOLOR,TB02260_VLRFRANQCOLOR,TB02260_FRANQDG,TB02260_VLRFRANQDG,TB02260_FRANQGF,TB02260_VLRFRANQGF,TB02260_FRANQGFC,TB02260_VLRFRANQGFC,TB02260_OBS,TB02260_CODIGO,TB02260_TIPOPRE',
      '',
      " TB02260_CODIGO = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
    ).then((response) => {
      if (response.status === 200) {
        setContrato(response.data);
        const tipopre = response.data.tipopre;
        apiFind(
          'Oportunidade',
          'TB02255_CODIGO,TB02255_STATUS,TB02255_PRE',
          '',
          " TB02255_CODIGO = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
        ).then((response) => {
          if (response.status === 200) {
            let tmppre = response.data.pre;
            setPrecontrato(tmppre);
            let statusatual = response.data.status;
            if (statusatual !== '' && statusatual !== undefined) {
              apiFind('OportunidadeStatus', '*', '', "TB01129_CODIGO = '" + statusatual + "' ").then((response) => {
                if (response.status === 200) {
                  setAltproposta(response.data.altproposta === 'S');
                  apiFind('PrecontratoTipo', 'TB01138_OPERACAO', '', "TB01138_CODIGO = '" + tipopre + "' ").then((response) => {
                    if (response.status === 200) {
                      setCarregando(false);
                      setOperacaotipo(response.data.operacao);
                    }
                  });
                }
              });
            }
          }
        });

        setValuesinvisible([
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
          false,
          false,
          false,
          false,
          false
        ]);

        setFieldsinfor([
          {
            id: 0,
            campo: 'TB02261_CODIGO',
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
            campo: 'TB02261_PRODUTO',
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
            campo: 'TB02261_QTCONTRATADA',
            funcao: 'Contratada',
            tipo: 'int',
            nome: 'qtcontratada',
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
            campo: 'TB02261_SITUACAOEQUIP',
            funcao: 'Situação',
            tipo: 'int',
            nome: 'situacaoequip',
            tamanho: 1,
            tipoobject: 11,
            widthfield: 10,
            measure: '10rem',
            itens: 'Novo,Usado',
            values: '0,1',
            invisible: valuesinvisible[3],
            disabled: disabled
          },
          {
            id: 4,
            campo: 'TB02261_OPERACAO',
            funcao: 'Operação',
            tipo: 'int',
            nome: 'operacao',
            tamanho: 1,
            tipoobject: 11,
            widthfield: 15,
            measure: '15rem',
            itens: 'Páginas Produzidas,Páginas Excedentes,Apenas valor FIXO',
            values: '0,1,2',
            invisible: valuesinvisible[4],
            disabled: disabled
          },
          {
            id: 5,
            campo: 'TB02261_VLRFIXO',
            funcao: 'Valor Fixo',
            tipo: 'numeric',
            nome: 'vlrfixo',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 13,
            measure: '13rem',
            invisible: valuesinvisible[5],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 24,
            campo: 'TB02261_CODSITE',
            funcao: 'Tipo Endereço',
            tipo: 'varchar',
            nome: 'codsite',
            tipoobject: 2,
            tamanho: 6,
            widthfield: 46,
            measure: '46rem',
            tabelaref: 'TB02263',
            widthname: 37,
            invisible: valuesinvisible[24],
            disabled: disabled,
            filteraux: " AND TB02263_OPORTUNIDADE = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
          },
          {
            id: 25,
            campo: 'TB02261_PREVISAO',
            funcao: 'Previsao',
            tipo: 'datetime',
            nome: 'previsao',
            tamanho: 11,
            tipoobject: 5,
            widthfield: 11,
            measure: '11rem',
            disabled: disabled,
            invisible: valuesinvisible[25]
          },
          {
            id: 26,
            campo: 'TB02261_OPERACAOTIPO',
            funcao: 'Movimentação',
            tipo: 'varchar',
            nome: 'operacaotipo',
            tamanho: 1,
            tipoobject: 11,
            widthfield: 11,
            measure: '11rem',
            itens: 'Adicionar,Retirar',
            values: 'A,R',
            invisible: valuesinvisible[26],
            disabled: disabled
          }
        ]);

        setFieldsfranquia([
          {
            id: 6,
            campo: 'TB02261_FRANQTOTAL',
            funcao: 'Franquia TOTAL',
            tipo: 'int',
            nome: 'franqtotal',
            tamanho: 9,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[6],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 7,
            campo: 'TB02261_VLRFRANQTOTAL',
            funcao: 'Valor Franquia',
            tipo: 'numeric',
            nome: 'vlrfranqtotal',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[7],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 8,
            campo: 'TB02261_VLRUNITTOTAL',
            funcao: 'Cópia TOTAL',
            tipo: 'int',
            nome: 'vlrunittotal',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 12,
            measure: '11.5rem',
            invisible: valuesinvisible[8],
            decimal: 5,
            disabled: disabled
          },
          {
            id: 9,
            campo: 'TB02261_FRANQPB',
            funcao: 'Franquia A4 PB',
            tipo: 'int',
            nome: 'franqpb',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[9],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 10,
            campo: 'TB02261_VLRFRANQPB',
            funcao: 'Valor Franquia',
            tipo: 'numeric',
            nome: 'vlrfranqpb',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[10],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 11,
            campo: 'TB02261_VLRUNITPB',
            funcao: 'Cópia A4 PB',
            tipo: 'int',
            nome: 'vlrunitpb',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 12,
            measure: '11.5rem',
            invisible: valuesinvisible[11],
            decimal: 5,
            disabled: disabled
          },
          {
            id: 12,
            campo: 'TB02261_FRANQCOLOR',
            funcao: 'Franquia A4 COLOR',
            tipo: 'int',
            nome: 'franqcolor',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[12],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 13,
            campo: 'TB02261_VLRFRANQCOLOR',
            funcao: 'Valor Franquia',
            tipo: 'numeric',
            nome: 'vlrfranqcolor',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[13],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 14,
            campo: 'TB02261_VLRUNITCOLOR',
            funcao: 'Cópia A4 COLOR',
            tipo: 'int',
            nome: 'vlrunitcolor',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11.5rem',
            invisible: valuesinvisible[14],
            decimal: 5,
            disabled: disabled
          },
          {
            id: 15,
            campo: 'TB02261_FRANQDG',
            funcao: 'Franquia Digitalização',
            tipo: 'int',
            nome: 'franqdg',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[15],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 16,
            campo: 'TB02261_VLRFRANQDG',
            funcao: 'Valor Franquia',
            tipo: 'numeric',
            nome: 'vlrfranqdg',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[16],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 17,
            campo: 'TB02261_VLRUNITDG',
            funcao: 'Cópia Digitalização',
            tipo: 'int',
            nome: 'vlrunitdg',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11.5rem',
            invisible: valuesinvisible[17],
            decimal: 5,
            disabled: disabled
          },
          {
            id: 18,
            campo: 'TB02261_FRANQGF',
            funcao: 'Franquia A3 PB',
            tipo: 'int',
            nome: 'franqgf',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[18],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 19,
            campo: 'TB02261_VLRFRANQGF',
            funcao: 'Valor Franquia',
            tipo: 'numeric',
            nome: 'vlrfranqgf',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[19],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 20,
            campo: 'TB02261_VLRUNITGF',
            funcao: 'Cópia A3 PB',
            tipo: 'int',
            nome: 'vlrunitgf',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11.5rem',
            invisible: valuesinvisible[20],
            decimal: 5,
            disabled: disabled
          },
          {
            id: 21,
            campo: 'TB02261_FRANQGFC',
            funcao: 'Franquia A3 COLOR',
            tipo: 'int',
            nome: 'franqgfc',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[21],
            decimal: 0,
            disabled: disabled
          },
          {
            id: 22,
            campo: 'TB02261_VLRFRANQGFC',
            funcao: 'Valor Franquia',
            tipo: 'numeric',
            nome: 'vlrfranqgfc',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11rem',
            invisible: valuesinvisible[22],
            decimal: 2,
            disabled: disabled
          },
          {
            id: 23,
            campo: 'TB02261_VLRUNITGFC',
            funcao: 'Cópia A3 COLOR',
            tipo: 'int',
            nome: 'vlrunitgfc',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 11,
            measure: '11.5rem',
            invisible: valuesinvisible[23],
            decimal: 5,
            disabled: disabled
          }
        ]);

        setColumns([
          { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 76 },
          { headerClassName: 'header-list', field: 'produto', headerName: 'Cod.Equip', width: 76 },
          { headerClassName: 'header-list', field: 'referencia', headerName: 'Referência', width: 111 },
          { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição do Equipamento', width: 400 },
          { headerClassName: 'header-list', field: 'nomesite', headerName: 'Descrição do Endereço', width: 200 },
          { headerClassName: 'header-list', field: 'nomesituacao', headerName: 'Situação', width: 78 },
          { headerClassName: 'header-list', field: 'qtcontratada', headerName: 'Contratada', width: 100, type: 'number' }
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
      'PropostaItemVW',
      'TB02258_TIPO,TB02258_PRODUTO,TB02258_CODSERV,' +
        'TB02258_QTCONTRATADA,TB02258_QTAPROVADA,TB02258_QTLIBERADA,TB02258_CODITEM,TB02258_NOMEITEM,TB02258_TIPOITEM,TB02258_CODIGO,TB02258_IDITEM,',
      '',
      "TB02258_CODIGO = '" +
        cabecalho[valuesname.indexOf('codigo')] +
        "'  and TB02258_QTCONTRATADA+TB02258_QTAPROVADA+TB02258_QTLIBERADA > 0 order by TB02258_NOMEITEM"
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
        'PropostaEquipamentoVW',
        'TB02261_OPORTUNIDADE, TB02261_CODITEM,TB02261_IDITEM, TB02261_CODIGO, TB02261_PRODUTO, TB02261_QTCONTRATADA, TB02261_QTCONTRATADAB, TB02261_QTAPROVADA, ' +
          'TB02261_QTAPROVADAB, TB02261_QTLIBERADA, TB02261_QTLIBERADAB, TB02261_SITUACAOEQUIP, TB02261_OPERACAO,TB02261_VLRFIXO, TB02261_FRANQTOTAL, TB02261_FRANQPB, ' +
          'TB02261_FRANQCOLOR, TB02261_FRANQDG, TB02261_FRANQGF,TB02261_FRANQGFC, TB02261_VLRFRANQTOTAL, TB02261_VLRFRANQPB, TB02261_VLRFRANQCOLOR, TB02261_VLRFRANQDG, ' +
          'TB02261_VLRFRANQGF, TB02261_VLRFRANQGFC, TB02261_VLRUNITTOTAL, TB02261_VLRUNITPB, TB02261_VLRUNITCOLOR, TB02261_VLRUNITDG,TB02261_VLRUNITGF, TB02261_VLRUNITGFC, TB02261_OBS,' +
          'TB01010_REFERENCIA, TB01010_CODBARRAS,TB01010_CODAUXILIAR, TB01010_NOME, TB02261_NOMESITUACAO,TB02261_NOMEOPERACAO,TB02261_CODSITE,TB02261_NOMESITE,TB02261_PREVISAO,TB02261_OPERACAOTIPO',
        '',
        "TB02261_OPORTUNIDADE = '" +
          cabecalho[valuesname.indexOf('codigo')] +
          "'  and TB02261_CODITEM = '" +
          rows[indexitem].coditem +
          "' and TB02261_IDITEM = '" +
          rows[indexitem].iditem +
          "' order by TB01010_NOME"
      ).then((response) => {
        if (response.status === 200) {
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
        'PropostaEquipamentoTotal',
        'TB02262_QTCONTRATADA,TB02262_QTAPROVADA,TB02262_QTLIBERADA',
        '',
        "TB02262_OPORTUNIDADE = '" +
          cabecalho[valuesname.indexOf('codigo')] +
          "'  and TB02262_CODITEM = '" +
          rows[indexitem].coditem +
          "' and TB02262_IDITEM = '" +
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
          valuesfield[24] = '';
          valuesfield[25] = undefined;
          if (operacaotipo === 'D') {
            valuesfield[26] = 'R';
          } else {
            valuesfield[26] = 'A';
          }
          setValuesfield([...valuesfield]);
          valuesfield2[1] = '';
          setValuesfield2([...valuesfield2]);
        }
      });
    }
  }, [rowsequip]);

  useEffect(() => {
    if (itemselec !== undefined) {
      valuesfield2[1] = '';
      valuesfield2[24] = '';
      setValuesfield2([...valuesfield2]);

      valuesfield[0] = itemselec['codigo'];
      valuesfield[1] = itemselec['produto'];
      valuesfield[2] = itemselec['qtcontratada'];
      valuesfield[3] = itemselec['situacaoequip'];
      valuesfield[4] = itemselec['operacao'];
      valuesfield[5] = itemselec['vlrfixo'];
      valuesfield[6] = itemselec['franqtotal'];
      valuesfield[7] = itemselec['vlrfranqtotal'];
      valuesfield[8] = itemselec['vlrunittotal'];
      valuesfield[9] = itemselec['franqpb'];
      valuesfield[10] = itemselec['vlrfranqpb'];
      valuesfield[11] = itemselec['vlrunitpb'];
      valuesfield[12] = itemselec['franqcolor'];
      valuesfield[13] = itemselec['vlrfranqcolor'];
      valuesfield[14] = itemselec['vlrunitcolor'];
      valuesfield[15] = itemselec['franqdg'];
      valuesfield[16] = itemselec['vlrfranqdg'];
      valuesfield[17] = itemselec['vlrunitdg'];
      valuesfield[18] = itemselec['franqgf'];
      valuesfield[19] = itemselec['vlrfranqgf'];
      valuesfield[20] = itemselec['vlrunitgf'];
      valuesfield[21] = itemselec['franqgfc'];
      valuesfield[22] = itemselec['vlrfranqgfc'];
      valuesfield[23] = itemselec['vlrunitgfc'];
      valuesfield[24] = itemselec['codsite'];

      if (itemselec['previsao'] !== undefined && itemselec['previsao'] !== null) {
        const dt1 =
          itemselec['previsao'].substring(3, 5) +
          '/' +
          itemselec['previsao'].substring(0, 2) +
          '/' +
          itemselec['previsao'].substring(6, 10);
        const datafim = new Date(dt1);
        valuesfield[25] = datafim;
      }
      valuesfield[26] = itemselec['operacaotipo'];

      setValuesfield([...valuesfield]);

      setContratada(itemselec['qtcontratada']);
      setAprovada(itemselec['qtaprovada']);
      setLiberada(itemselec['qtliberada']);
    }
  }, [itemselec]);

  useEffect(() => {
    desabilitarCampos();
  }, [valuesfield[4]]);

  const desabilitarCampos = () => {
    if (contrato.tipofranquia === 'G') {
      valuesinvisible[6] = contrato.analfranquia === 'M';
      valuesinvisible[7] = contrato.analfranquia === 'M';
      valuesinvisible[8] = contrato.tipofranquia === 'T';
    } else {
      valuesinvisible[6] = true;
      valuesinvisible[7] = true;
      valuesinvisible[8] = true;
    }
    valuesinvisible[26] = operacaotipo !== 'A';
    setValuesinvisible([...valuesinvisible]);
    /*if (parseInt(valuesfield[4]) === 0) {
      valuesinvisible[6] = true;
      valuesinvisible[7] = true;
      valuesinvisible[8] = contrato.tipofranquia === 'T';

      valuesinvisible[9] = true;
      valuesinvisible[10] = true;
      valuesinvisible[11] = contrato.tipofranquia === 'G';

      valuesinvisible[12] = true;
      valuesinvisible[13] = true;
      valuesinvisible[14] = contrato.tipofranquia === 'G';

      valuesinvisible[15] = true;
      valuesinvisible[16] = true;
      valuesinvisible[17] = contrato.tipofranquia === 'G';

      valuesinvisible[18] = true;
      valuesinvisible[19] = true;
      valuesinvisible[20] = contrato.tipofranquia === 'G';

      valuesinvisible[21] = true;
      valuesinvisible[22] = true;
      valuesinvisible[23] = contrato.tipofranquia === 'G';
    } else if (parseInt(valuesfield[4]) === 1) {
      if (contrato.tipofranquia === 'G') {
        valuesinvisible[6] = contrato.analfranquia === 'M';
        valuesinvisible[7] = contrato.analfranquia === 'M';
        valuesinvisible[8] = contrato.tipofranquia === 'T';
      } else {
        valuesinvisible[6] = true;
        valuesinvisible[7] = true;
        valuesinvisible[8] = true;
      }

      valuesinvisible[9] = contrato.analfranquia !== 'M';
      valuesinvisible[10] = contrato.analfranquia !== 'M';
      valuesinvisible[11] = contrato.tipofranquia === 'G';

      valuesinvisible[12] = contrato.analfranquia !== 'M';
      valuesinvisible[13] = contrato.analfranquia !== 'M';
      valuesinvisible[14] = contrato.tipofranquia === 'G';

      valuesinvisible[15] = contrato.analfranquia !== 'M';
      valuesinvisible[16] = contrato.analfranquia !== 'M';
      valuesinvisible[17] = contrato.tipofranquia === 'G';

      valuesinvisible[18] = contrato.analfranquia !== 'M';
      valuesinvisible[19] = contrato.analfranquia !== 'M';
      valuesinvisible[20] = contrato.tipofranquia === 'G';

      valuesinvisible[21] = contrato.analfranquia !== 'M';
      valuesinvisible[22] = contrato.analfranquia !== 'M';
      valuesinvisible[23] = contrato.tipofranquia === 'G';
    } else {
      valuesinvisible[6] = true;
      valuesinvisible[7] = true;
      valuesinvisible[8] = true;

      valuesinvisible[9] = true;
      valuesinvisible[10] = true;
      valuesinvisible[11] = true;

      valuesinvisible[12] = true;
      valuesinvisible[13] = true;
      valuesinvisible[14] = true;

      valuesinvisible[15] = true;
      valuesinvisible[16] = true;
      valuesinvisible[17] = true;

      valuesinvisible[18] = true;
      valuesinvisible[19] = true;
      valuesinvisible[20] = true;

      valuesinvisible[21] = true;
      valuesinvisible[22] = true;
      valuesinvisible[23] = true;
    }
    valuesinvisible[26] = operacaotipo !== 'A';
    setValuesinvisible([...valuesinvisible]);*/
  };

  const Incluir = () => {
    apiID('PropostaEquipamento').then((response) => {
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
        valuesfield[24] = '';
        valuesfield[25] = undefined;
        if (operacaotipo === 'D') {
          valuesfield[26] = 'R';
        } else {
          valuesfield[26] = 'A';
        }
        setValuesfield([...valuesfield]);
        valuesfield2[1] = '';
        valuesfield2[24] = '';
        setValuesfield2([...valuesfield2]);
        setDisabled(false);
        desabilitarCampos();
        setInclusao(true);
        setShowsave(true);
        setContratada(0);
        setAprovada(0);
        setLiberada(0);
        try {
          document.getElementById('TB02261_PRODUTO').focus();
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
          apiDelete('PropostaEquipamento', itemselec).then((response) => {
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
      document.getElementById('TB02261_PRODUTO').focus();
    } catch (error) {
      //console.log(error);
    }
  };

  const Salvar = () => {
    if (document.getElementById('TB02261_PRODUTO').value === undefined || document.getElementById('TB02261_PRODUTO').value === '') {
      setItemvariant(1);
      setMensagem('Campo Equipamento é preenchimento obrigatório !');
      document.getElementById('TB02261_PRODUTO').focus();
    } else {
      setCarregando(true);
      try {
        let item = {};
        item['codigo'] = valuesfield[0];
        item['produto'] = valuesfield[1];
        item['qtcontratada'] = valuesfield[2];
        item['situacaoequip'] = valuesfield[3];
        item['operacao'] = valuesfield[4];
        item['vlrfixo'] = valuesfield[5];
        item['franqtotal'] = valuesfield[6];
        item['vlrfranqtotal'] = valuesfield[7];
        item['vlrunittotal'] = valuesfield[8];
        item['franqpb'] = valuesfield[9];
        item['vlrfranqpb'] = valuesfield[10];
        item['vlrunitpb'] = valuesfield[11];
        item['franqcolor'] = valuesfield[12];
        item['vlrfranqcolor'] = valuesfield[13];
        item['vlrunitcolor'] = valuesfield[14];
        item['franqdg'] = valuesfield[15];
        item['vlrfranqdg'] = valuesfield[16];
        item['vlrunitdg'] = valuesfield[17];
        item['franqgf'] = valuesfield[18];
        item['vlrfranqgf'] = valuesfield[19];
        item['vlrunitgf'] = valuesfield[20];
        item['franqgfc'] = valuesfield[21];
        item['vlrfranqgfc'] = valuesfield[22];
        item['vlrunitgfc'] = valuesfield[23];
        item['oportunidade'] = cabecalho[valuesname.indexOf('codigo')];
        item['coditem'] = rows[indexitem].coditem;
        item['iditem'] = rows[indexitem].iditem;
        item['qtcontratadab'] = contratada;
        item['qtaprovadab'] = aprovada;
        item['qtliberadab'] = liberada;
        item['codsite'] = valuesfield[24];
        if (valuesfield[25] !== '' && valuesfield[25] !== undefined && valuesfield[25] !== null) {
          const tmdata1 = Date.parse(valuesfield[25]);
          const dt1 = new Date(tmdata1);
          const data1 = dt1.toLocaleDateString('en-US');
          item['previsao'] = data1 + ' 00:00:00';
        } else {
          item['previsao'] = null;
        }
        item['operacaotipo'] = valuesfield[26];
        if (inclusao) {
          apiInsert('PropostaEquipamento', item).then((response) => {
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
          apiUpdate('PropostaEquipamento', item).then((response) => {
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
    if (altproposta && (precontrato === '' || precontrato === undefined || precontrato === null)) {
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
                      </Row>
                      {altproposta && (precontrato === '' || precontrato === undefined || precontrato === null) ? (
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
                            {parseInt(valuesfield[4]) < 2 ? (
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
                            ) : (
                              <></>
                            )}
                          </ModalBody>
                          <ModalFooter>
                            {altproposta && (precontrato === '' || precontrato === undefined || precontrato === null) ? (
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

export default PropostaEquipamento;
