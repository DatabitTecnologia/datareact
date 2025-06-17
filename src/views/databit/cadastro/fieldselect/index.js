import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { getListClass, getListClassall } from '../../../../api/apiconnect';
import { apiUpdate, apiInsert, apiFind, apiCreateField, apiExec, apiUpdateField } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';

const FieldSelect = (props) => {
  const { updatefield } = props;
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const handleClosefield = () => setShowfield(false);
  const [showfield, setShowfield] = useState(false);
  const [carregando, setCarregando] = React.useState(false);
  const [itemselec, setItemselec] = React.useState([]);
  const [fieldsdefault, setFieldsdefault] = React.useState([]);
  const [fieldspesquisa, setFieldspesquisa] = React.useState([]);
  const [fieldsmult, setFieldsmult] = React.useState([]);
  const [fieldsnumerico, setFieldsnumerico] = React.useState([]);
  const [fieldsespecial, setFieldsespecial] = React.useState([]);
  const [fieldschecked, setFieldschecked] = React.useState([]);
  const [fieldsradio, setFieldsradio] = React.useState([]);
  const [fieldsdropdown, setFieldsdropdown] = React.useState([]);
  const [tipocampo, setTipocampo] = React.useState();
  const [listclass, setListclass] = React.useState([]);
  const [listclassall, setListclassall] = React.useState([]);
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const [disabletipo, setDisabletipo] = useState(true);
  const [fieldtypes, setFieldtypes] = React.useState([]);
  const [carregacampos, setCarregacampos] = useState(false);
  const [carregaobjetos, setCarregaobjetos] = useState(false);
  const [salvo, setSalvo] = useState(false);

  const types = [
    { value: '1', label: 'Texto Simples' },
    { value: '2', label: 'Pesquisa' },
    //{ value: '3', label: 'Multi-Seleção' },
    { value: '4', label: 'Numérico' },
    { value: '5', label: 'Data' },
    //{ value: '6', label: 'Multi-Texto' },
    { value: '8', label: 'Texto Especial' },
    { value: '9', label: 'CheckBox' },
    { value: '10', label: 'Radio' },
    { value: '11', label: 'DropDown Simples' },
    { value: '12', label: 'DropDown Tabela' },
    { value: '13', label: 'Password' }
  ];

  const typesupdate = [
    { value: '1', label: 'Texto Simples' },
    { value: '2', label: 'Pesquisa' },
    { value: '8', label: 'Texto Especial' },
    { value: '9', label: 'CheckBox' },
    { value: '10', label: 'Radio' },
    { value: '11', label: 'DropDown Simples' },
    { value: '12', label: 'DropDown Tabela' },
    { value: '13', label: 'Password' }
  ];

  const typesmask = [
    { value: '0', label: 'Nenhum' },
    { value: '1', label: 'CPF' },
    { value: '2', label: 'CNPJ' },
    { value: '3', label: 'CEP' },
    { value: '4', label: 'Fone Fixo' },
    { value: '5', label: 'Mobile / WhatsAPP' },
    { value: '6', label: 'Plano de Contas' },
    { value: '7', label: 'Hora' },
    { value: '8', label: 'Outro' }
  ];

  useEffect(() => {
    setCarregando(true);
    getListClassall(Decode64(sessionStorage.getItem('urlconnect')), props.table).then((response) => {
      if (response.status === 200) {
        setListclassall(response.data);
        getListClass(Decode64(sessionStorage.getItem('urlconnect')), props.table).then((response) => {
          if (response.status === 200) {
            setListclass(response.data);
            if (updatefield) {
              apiFind(
                'FieldForm',
                'TB00109_TABELA,TB00109_CAMPO,TB00109_ISPRIMARY,TB00109_FUNCAO,TB00109_SELEC,TB00109_ORDEM,TB00109_FORM,TB00109_TIPO,TB00109_TAMANHO,' +
                  'TB00109_FOREIGN,TB00109_KEY,TB00109_TABELAREF,TB00109_CAMPOREF,TB00109_DESCRICAOREF,TB00109_ISFOREIGN,TB00109_TIPOOBJECT,TB00109_TIPOMASCARA,' +
                  'TB00109_DECIMAL,TB00109_LARGURA,TB00109_VALUECHECKED,TB00109_VALUEUNCHECKED,TB00109_ITENS,TB00109_VALUES,TB00109_VIEW,TB00109_MASCARA,TB00109_TIPOMULT,' +
                  'TB00109_DISABLEINSERT,TB00109_DISABLEUPDATE,TB00109_CAMPOLIST,TB00109_CAMPOREFDROP,TB00109_FILTERAUX,TB00109_CHARNORMAL',
                "cast(0 as int) as line, cast(0 as int) as widthfield, cast('' as varchar(10)) as measure, cast(0 as int) as widthname," +
                  ' case TB00109_TIPOOBJECT ' +
                  "      when 1 then 'Texto Simples' " +
                  "      when 2 then 'Pesquisa' " +
                  "      when 4 then 'Numérico' " +
                  "      when 5 then 'Data' " +
                  "      when 6 then 'Mult-Texto' " +
                  "      when 8 then 'Texto Especial' " +
                  "      when 9 then 'CheckBox' " +
                  "      when 10 then 'Radio' " +
                  "      when 11 then 'DropDown' " +
                  "      when 12 then 'DropDown' " +
                  "      when 13 then 'Password' " +
                  ' end as nometipo ',
                "TB00109_TABELA = '" +
                  props.table +
                  "' AND TB00109_CAMPO = '" +
                  props.itemselect.campo +
                  "' and TB00109_SYSTEM = " +
                  Decode64(sessionStorage.getItem('system'))
              ).then((response) => {
                if (response.status === 200) {
                  setItemselec(response.data);
                  setTipocampo(itemselec.tipoobject);

                  apiFind(
                    'Form',
                    'TB00108_CODIGO, TB00108_NOME, TB00108_SITUACAO, TB00108_GRUPO, TB00108_PADRAO, TB00108_TIPO, TB00108_CODREACT, TB00108_LARGURA, TB00108_ORDEM',
                    '',
                    "TB00108_CODIGO= '" + response.data.form + "' "
                  ).then((response) => {
                    if (response.status === 200) {
                      valuesfield2[6] = response.data.nome;
                      setValuesfield2([...valuesfield2]);
                      setCarregando(false);
                      setCarregacampos(true);
                    }
                  });
                }
              });
            } else {
              setCarregando(false);
              setCarregacampos(true);
            }
          }
        });
      }
    });
  }, []);

  const GetTypeFields = () => {
    let listvalues;
    if (!updatefield) {
      listvalues = types;
    } else {
      if (
        props.itemselect.tipoobject === 1 ||
        props.itemselect.tipoobject === 4 ||
        props.itemselect.tipoobject === 9 ||
        props.itemselect.tipoobject === 10 ||
        props.itemselect.tipoobject === 11 ||
        props.itemselect.tipoobject === 13
      ) {
        listvalues = typesupdate;
      } else {
        listvalues = types;
      }
    }
    return listvalues;
  };

  useEffect(() => {
    if (carregacampos) {
      if (updatefield) {
        valuesfield[0] = itemselec.campo;
        valuesfield[1] = itemselec.funcao;
        valuesfield[2] = itemselec.tipoobject;
        valuesfield[3] = itemselec.tamanho;
        valuesfield[4] = itemselec.ordem;
        valuesfield[5] = itemselec.largura;
        valuesfield[6] = itemselec.form;
        valuesfield[7] = itemselec.selec;
        valuesfield[8] = itemselec.tabelaref;
        valuesfield[9] = itemselec.tipomult;
        valuesfield[10] = itemselec.decimal;
        valuesfield[11] = itemselec.tipomascara;
        valuesfield[12] = itemselec.mascara;
        valuesfield[13] = itemselec.valuechecked;
        valuesfield[14] = itemselec.valueunchecked;
        valuesfield[15] = itemselec.itens;
        valuesfield[16] = itemselec.values;
        valuesfield[17] = itemselec.disableinsert;
        valuesfield[18] = itemselec.disableupdate;
        valuesfield[19] = itemselec.campolist;
        valuesfield[20] = itemselec.camporefdrop;
        valuesfield[21] = itemselec.filteraux;
        valuesfield[22] = itemselec.charnormal;
      } else {
        valuesfield[1] = itemselec.funcao;
        valuesfield[2] = '1';
        valuesfield[3] = 10;
        valuesfield[4] = props.ultordem + 1;
        valuesfield[6] = props.formselec;
        valuesfield[5] = 10;
        valuesfield[7] = 'S';
        valuesfield[10] = 0;
        valuesfield[11] = 0;
        valuesfield[17] = 'N';
        valuesfield[18] = 'N';
        setValuesfield([...valuesfield]);
      }
      setValuesfield([...valuesfield]);
      setCarregaobjetos(true);
    }
  }, [carregacampos]);

  const Salvar = () => {
    if (
      document.getElementById('TB00109_TAMANHO').value <= 0 ||
      document.getElementById('TB00109_TAMANHO').value === undefined ||
      document.getElementById('TB00109_TAMANHO').value === '0' ||
      document.getElementById('TB00109_TAMANHO').value === ''
    ) {
      setItemvariant(1);
      setMensagem('Campo tamanho não poderá possuir valores zerados, negativos ou nulos !');
      document.getElementById('TB00109_TAMANHO').focus();
    } else if (
      document.getElementById('TB00109_ORDEM').value <= 0 ||
      document.getElementById('TB00109_ORDEM').value === undefined ||
      document.getElementById('TB00109_ORDEM').value === '0' ||
      document.getElementById('TB00109_ORDEM').value === ''
    ) {
      setItemvariant(1);
      setMensagem('Campo ordem não poderá possuir valores zerados, negativos ou nulos !');
      document.getElementById('TB00109_ORDEM').focus();
    } else if (
      document.getElementById('TB00109_LARGURA').value <= 0 ||
      document.getElementById('TB00109_LARGURA').value === undefined ||
      document.getElementById('TB00109_LARGURA').value === '0' ||
      document.getElementById('TB00109_LARGURA').value === ''
    ) {
      setItemvariant(1);
      setMensagem('Campo largura não poderá possuir valores zerados, negativos ou nulos !');
      document.getElementById('TB00109_LARGURA').focus();
    } else if (document.getElementById('TB00109_CAMPO').value === '' || document.getElementById('TB00109_CAMPO').value === undefined) {
      setItemvariant(1);
      setMensagem('Nome do campo é de preenchimento obrigatório !');
      document.getElementById('TB00109_CAMPO').focus();
    } else if (document.getElementById('TB00109_FUNCAO').value === '' || document.getElementById('TB00109_FUNCAO').value === undefined) {
      setItemvariant(1);
      setMensagem('Descrição do campo é de preenchimento obrigatório !');
      document.getElementById('TB00109_FUNCAO').focus();
    } else {
      let item = {};
      let campo = valuesfield[0];
      if (campo.includes(props.table + '_')) {
        item['campo'] = campo;
      } else {
        item['campo'] = props.table + '_' + campo;
      }
      valuesfield[0] = item['campo'];
      setValuesfield([...valuesfield]);
      item['funcao'] = valuesfield[1];
      item['tipoobject'] = valuesfield[2];
      item['tamanho'] = valuesfield[3];
      item['ordem'] = valuesfield[4];
      item['largura'] = valuesfield[5];
      if (valuesfield[6] !== undefined && valuesfield[6] !== null && valuesfield[6] !== '') {
        item['form'] = valuesfield[6];
      } else {
        item['form'] = props.formselec;
      }

      item['selec'] = valuesfield[7];
      item['tabelaref'] = valuesfield[8];
      item['tipomult'] = valuesfield[9];
      item['decimal'] = valuesfield[10];
      item['tipomascara'] = valuesfield[11];
      item['mascara'] = valuesfield[12];
      item['valuechecked'] = valuesfield[13];
      item['valueunchecked'] = valuesfield[14];
      item['itens'] = valuesfield[15];
      item['values'] = valuesfield[16];
      item['disableinsert'] = valuesfield[17];
      item['disableupdate'] = valuesfield[18];
      item['campolist'] = valuesfield[19];
      item['camporefdrop'] = valuesfield[20];
      item['filteraux'] = valuesfield[21];
      item['tabela'] = props.table;
      item['view'] = props.object;
      item['isprimary'] = 0;
      item['charnormal'] = valuesfield[22];
      item['system'] = Decode64(sessionStorage.getItem('system'));

      switch (parseInt(valuesfield[2])) {
        case 1: {
          item['tipo'] = 'varchar';
          break;
        }
        case 2: {
          item['tipo'] = 'varchar';
          break;
        }
        case 8: {
          item['tipo'] = 'varchar';
          break;
        }
        case 9: {
          if (!updatefield) {
            item['tipo'] = 'varchar';
          }
          break;
        }
        case 10: {
          if (!updatefield) {
            item['tipo'] = 'varchar';
          }
          break;
        }
        case 11: {
          if (!updatefield) {
            item['tipo'] = 'varchar';
          }
          break;
        }
        case 12: {
          if (!updatefield) {
            item['tipo'] = 'varchar';
          }
          break;
        }
        case 3: {
          item['tipo'] = 'text';
          break;
        }
        case 6: {
          item['tipo'] = 'text';
          break;
        }
        case 4: {
          if (item['decimal'] > 0) {
            item['tipo'] = 'numeric';
          } else {
            item['tipo'] = 'int';
          }
          break;
        }
        case 5: {
          item['tipo'] = 'datetime';
          break;
        }
        default: {
          item['tipo'] = 'varchar';
          break;
        }
      }

      if ((parseInt(valuesfield[2]) === 2 || parseInt(valuesfield[2]) === 12) && !updatefield) {
        item['foreign'] = valuesfield[0];
        item['key'] = 'FK_' + props.table + '_' + valuesfield[8] + '_' + valuesfield[0];
        item['camporef'] = valuesfield[8] + '_CODIGO';
        item['descricaoref'] = valuesfield2[8];
        if (valuesfield[2] === '2') {
          item['isforeign'] = 1;
        } else {
          item['isforeign'] = 0;
        }
      } else {
        item['isforeign'] = 0;
      }

      if ((parseInt(valuesfield[2]) === 2 || parseInt(valuesfield[2]) === 12) && !updatefield) {
        item['isforeign'] = 1;
        item['tabelaref'] = valuesfield[8];
        item['foreign'] = valuesfield[0];
        item['camporef'] = valuesfield[8] + '_CODIGO';
        item['descricaoref'] = valuesfield2[8];
      }
      if (!updatefield) {
        item['user'] = 1;
      }

      let item2 = {};
      item2['campo'] = item['campo'];
      item2['tabela'] = item['view'];
      item2['funcao'] = item['funcao'];
      item2['tamanho'] = item['tamanho'];
      item2['selec'] = 'N';
      item2['selec2'] = 'N';
      item2['selec3'] = 'N';
      item2['selec4'] = 'N';
      item2['filtro'] = 'N';
      item2['voltar'] = 'N';
      if ((parseInt(valuesfield[2]) === 2 || parseInt(valuesfield[2]) === 12) && !updatefield) {
        item2['foreign'] = valuesfield[0];
        item2['key'] = 'FK_' + props.table + '_' + valuesfield[8] + '_' + valuesfield[0];
        item2['camporef'] = valuesfield[8] + '_CODIGO';
        item2['descricaoref'] = valuesfield2[8];
        if (valuesfield[2] === '2') {
          item['isforeign'] = 1;
        } else {
          item['isforeign'] = 0;
        }
      } else {
        item2['isforeign'] = 0;
      }

      if ((parseInt(valuesfield[2]) === 2 || parseInt(valuesfield[2]) === 12) && !updatefield) {
        item2['isforeign'] = 1;
        item2['tabelaref'] = valuesfield[8];
        item2['foreign'] = valuesfield[0];
        item2['camporef'] = valuesfield[8] + '_CODIGO';
        item2['descricaoref'] = valuesfield2[8];
      }

      item2['disableinsert'] = valuesfield[17];
      item2['disableedit'] = valuesfield[18];
      item2['campolist'] = valuesfield[19];
      item2['camporefdrop'] = valuesfield[20];
      item2['filteraux'] = valuesfield[21];
      item2['charnormal'] = valuesfield[22];
      item2['system'] = Decode64(sessionStorage.getItem('system'));
      if (!updatefield) {
        item2['user'] = 1;
      }

      if (!updatefield) {
        setCarregando(true);
        apiCreateField(item).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              apiInsert('Paramfield', item2).then((response) => {
                if (response.status === 200) {
                  if (response.data.status === 1) {
                    apiExec("EXEC SP00012 '" + props.object + "','" + props.table + "','" + props.primarykey + "'", 'N').then(
                      (response) => {
                        if (response.status === 200) {
                          if (response.data.status === 1) {
                            apiInsert('FieldForm', item).then((response) => {
                              if (response.status === 200) {
                                setItemvariant(response.data.status + 1);
                                setMensagem(response.data.mensagem);
                                setCarregando(false);
                                setSalvo(response.data.status === 1);
                                if (response.data.status === 1) {
                                  props.handleClosefield();
                                }
                              } else {
                                setItemvariant(-1);
                                setMensagem(response.data.mensagem);
                                return;
                              }
                            });
                          } else {
                            setCarregando(false);
                            setItemvariant(0);
                            setMensagem(response.data.mensagem);
                            return;
                          }
                        } else {
                          setItemvariant(-1);
                          setMensagem(response.data.mensagem);
                          return;
                        }
                      }
                    );
                  } else {
                    setCarregando(false);
                    setItemvariant(0);
                    setMensagem(response.data.mensagem);
                    return;
                  }
                } else {
                  setCarregando(false);
                  setItemvariant(-1);
                  setMensagem(response.data.mensagem);
                  return;
                }
              });
            } else {
              setCarregando(false);
              setItemvariant(0);
              setMensagem(response.data.mensagem);
              return;
            }
          } else {
            setCarregando(false);
            setItemvariant(-1);
            setMensagem(response.data.mensagem);
            return;
          }
        });
      } else {
        setCarregando(true);
        apiUpdateField(item).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              apiUpdate('Paramfield', item2).then((response) => {
                if (response.data.status === 1) {
                  apiUpdate('FieldForm', item).then((response) => {
                    if (response.status === 200) {
                      setItemvariant(response.data.status + 1);
                      setMensagem(response.data.mensagem);
                      setCarregando(false);
                      setSalvo(response.data.status === 1);
                      if (response.data.status === 1) {
                        props.handleClosefield();
                      }
                    } else {
                      setCarregando(true);
                      setItemvariant(-1);
                      setMensagem(response.data);
                      return;
                    }
                  });
                } else {
                  setCarregando(false);
                  setItemvariant(-1);
                  setMensagem(response.data.mensagem);
                  return;
                }
              });
            } else {
              setCarregando(false);
              setItemvariant(-1);
              setMensagem(response.data.mensagem);
              return;
            }
          }
        });
      }
    }
  };

  useEffect(() => {
    setTipocampo(parseInt(valuesfield[2]));
  }, [valuesfield]);

  useEffect(() => {
    if (valuesfield[8] !== null && valuesfield[8] !== undefined) {
      setCarregando(true);
      apiFind('Paramfield', 'TB00003_TAMANHO', '', "TB00003_CAMPO = '" + valuesfield[8] + "_CODIGO' ").then((response) => {
        if (response.status === 200) {
          valuesfield[3] = response.data.tamanho;
          if (valuesfield[3] === undefined) {
            valuesfield[3] = 10;
          }
          setValuesfield([...valuesfield]);
          setCarregando(false);
        }
      });
    }
  }, [valuesfield[8]]);

  useEffect(() => {
    if (carregaobjetos) {
      setFieldsdefault([
        {
          id: 0,
          campo: 'TB00109_CAMPO',
          funcao: 'Campo',
          tipo: 'varchar',
          nome: 'campo',
          tamanho: 15,
          tipoobject: 1,
          widthfield: 15,
          measure: '15rem',
          disabled: updatefield
        },

        {
          id: 1,
          campo: 'TB00109_FUNCAO',
          funcao: 'Descrição do Campo',
          tipo: 'varchar',
          nome: 'funcao',
          tamanho: 200,
          tipoobject: 1,
          widthfield: 32,
          measure: '32rem',
          charnormal: true
        },
        {
          id: 2,
          campo: 'TB00109_TIPOOBJECT',
          funcao: 'Tipo de Objeto',
          tipo: 'varchar',
          nome: 'tipoobject',
          tamanho: 10,
          tipoobject: 11,
          widthfield: 8,
          measure: '23rem',
          options: types,
          disabled:
            disabletipo &&
            updatefield &&
            valuesfield[2] !== 1 &&
            valuesfield[2] !== 4 &&
            valuesfield[2] !== 9 &&
            valuesfield[2] !== 10 &&
            valuesfield[2] !== 11
        },
        {
          id: 3,
          campo: 'TB00109_TAMANHO',
          funcao: 'Tamanho',
          tipo: 'int',
          nome: 'tananho',
          tamanho: 12,
          tipoobject: 4,
          widthfield: 8,
          measure: '8rem',
          disabled: updatefield || valuesfield[2] === 2
        },
        {
          id: 4,
          campo: 'TB00109_ORDEM',
          funcao: 'Ordem',
          tipo: 'int',
          nome: 'ordem',
          tamanho: 11,
          tipoobject: 4,
          widthfield: 8,
          measure: '8rem'
        },
        {
          id: 5,
          campo: 'TB00109_LARGURA',
          funcao: 'Largura (rem)',
          tipo: 'int',
          nome: 'largura',
          tamanho: 12,
          tipoobject: 4,
          widthfield: 8,
          measure: '8rem'
        },
        {
          id: 6,
          campo: 'TB00109_FORM',
          funcao: 'Formulário selecionado',
          tipo: 'varchar',
          nome: 'form',
          tipoobject: 2,
          tamanho: 4,
          widthfield: 47,
          measure: '47rem',
          tabelaref: 'TB00108',
          widthname: 38,
          filteraux:
            " AND TB00108_GRUPO IN (SELECT TB00107_CODIGO FROM TB00107 WHERE TB00107_TABELA = '" +
            props.table +
            "') AND TB00108_SYSTEM = " +
            Decode64(sessionStorage.getItem('system'))
        },
        {
          id: 7,
          campo: 'TB00109_SELEC2',
          funcao: 'Campo VISÍVEL',
          tipo: 'varchar',
          nome: 'selec',
          tamanho: 1,
          tipoobject: 9,
          widthfield: 1,
          measure: '12rem',
          valuechecked: 'S',
          valueunchecked: 'N'
        },
        {
          id: 17,
          campo: 'TB00109_DISABLEINSERT',
          funcao: 'Desabilitar ao INCLUIR',
          tipo: 'varchar',
          nome: 'disableinsert',
          tamanho: 1,
          tipoobject: 9,
          widthfield: 1,
          measure: '12rem',
          valuechecked: 'S',
          valueunchecked: 'N'
        },
        {
          id: 18,
          campo: 'TB00109_DISABLEUPDATE',
          funcao: 'Desabilitar ao EDITAR',
          tipo: 'varchar',
          nome: 'disableupdate',
          tamanho: 1,
          tipoobject: 9,
          widthfield: 1,
          measure: '12rem',
          valuechecked: 'S',
          valueunchecked: 'N'
        },
        {
          id: 22,
          campo: 'TB00109_CHARNORMAL',
          funcao: 'Tirar a CAIXA ALTA',
          tipo: 'varchar',
          nome: 'charnormal',
          tamanho: 1,
          tipoobject: 9,
          widthfield: 1,
          measure: '12rem',
          valuechecked: '1',
          valueunchecked: '0',
          disabled: parseInt(valuesfield[2]) !== 1
        }
      ]);
      setFieldspesquisa([
        {
          id: 8,
          campo: 'TB00109_TABELAREF',
          funcao: 'Tabela de referência',
          tipo: 'varchar',
          nome: 'tabelaref',
          tamanho: 10,
          tipoobject: 11,
          widthfield: 47,
          measure: '47rem',
          options: listclass
          //disabled: props.updatefield
        },
        {
          id: 21,
          campo: 'TB00109_FILTERAUX',
          funcao: 'Filtro Auxiliar',
          tipo: 'varchar',
          nome: 'filteraux',
          tamanho: 200,
          tipoobject: 1,
          widthfield: 47,
          measure: '47rem',
          charnormal: true
        }
      ]);
      setFieldsmult([
        {
          id: 9,
          campo: 'TB00109_TIPOMULT',
          funcao: 'Resultado para ser gravado no campo',
          tipo: 'int',
          nome: 'tipomult',
          tamanho: 60,
          tipoobject: 10,
          widthfield: 47,
          measure: '47rem',
          itens: 'Código da seleção,Descrição da seleção',
          values: '0,1'
        }
      ]);

      setFieldsnumerico([
        {
          id: 10,
          campo: 'TB00108_DECIMAL',
          funcao: 'Casas decimais',
          tipo: 'int',
          nome: 'decimal',
          tamanho: 60,
          tipoobject: 4,
          widthfield: 10,
          measure: '10rem',
          disabled: updatefield
        }
      ]);

      setFieldsespecial([
        {
          id: 11,
          campo: 'TB00109_TIPOMASCARA',
          funcao: 'Tipo de Máscara',
          tipo: 'varchar',
          nome: 'tipomascara',
          tamanho: 10,
          tipoobject: 11,
          widthfield: 20,
          measure: '20rem',
          options: typesmask
        },
        {
          id: 12,
          campo: 'TB00109_MASCARA',
          funcao: 'Mascara',
          tipo: 'varchar',
          nome: 'mascara',
          tamanho: 50,
          tipoobject: 1,
          widthfield: 27,
          measure: '27rem',
          disabled: valuesfield[11] !== 7
        }
      ]);

      setFieldschecked([
        {
          id: 13,
          campo: 'TB00109_VALUECHECKED',
          funcao: 'Valor quando estiver marcado',
          tipo: 'varchar',
          nome: 'valuechecked',
          tamanho: 50,
          tipoobject: 1,
          widthfield: 24,
          measure: '24rem',
          charnormal: true
        },
        {
          id: 14,
          campo: 'TB00109_UNVALUECHECKED',
          funcao: 'Valor quando estiver desmarcado',
          tipo: 'varchar',
          nome: 'valueunchecked',
          tamanho: 50,
          tipoobject: 1,
          widthfield: 23,
          measure: '23rem',
          charnormal: true
        }
      ]);

      setFieldsradio([
        {
          id: 15,
          campo: 'TB00109_ITENS',
          funcao: 'Lista de itens (separado por vígulas e sem quebra de linha)',
          tipo: 'varchar',
          nome: 'itens',
          tamanho: 1000,
          tipoobject: 6,
          widthfield: 47,
          measure: '47rem',
          charnormal: true
        },
        {
          id: 16,
          campo: 'TB00109_VALUES',
          funcao: 'Lista de valores (separado por vírgulas e sem quebra de linha)',
          tipo: 'varchar',
          nome: 'values',
          tamanho: 1000,
          tipoobject: 6,
          widthfield: 47,
          measure: '47rem',
          charnormal: true
        }
      ]);

      setFieldsdropdown([
        {
          id: 8,
          campo: 'TB00109_TABELAREF',
          funcao: 'Tabela de referência',
          tipo: 'varchar',
          nome: 'tabelaref',
          tamanho: 10,
          tipoobject: 11,
          widthfield: 47,
          measure: '47rem',
          options: listclassall
        },
        {
          id: 19,
          campo: 'TB00109_CAMPOLIST',
          funcao: 'Campo a ser listado',
          tipo: 'varchar',
          nome: 'campolist',
          tamanho: 50,
          tipoobject: 1,
          widthfield: 24,
          measure: '24rem',
          charnormal: true
        },
        {
          id: 20,
          campo: 'TB00109_CAMPOREFDROP',
          funcao: 'Campo de referência',
          tipo: 'varchar',
          nome: 'camporefdrop',
          tamanho: 50,
          tipoobject: 1,
          widthfield: 23,
          measure: '23rem',
          charnormal: true
        },
        {
          id: 21,
          campo: 'TB00109_FILTERAUX',
          funcao: 'Filtro Auxiliar',
          tipo: 'varchar',
          nome: 'filteraux',
          tamanho: 200,
          tipoobject: 1,
          widthfield: 47,
          measure: '47rem',
          charnormal: true
        }
      ]);

      setDisabletipo(false);
    }
  }, [carregaobjetos]);

  return (
    <React.Fragment>
      <div id="frmfield" name="frmfield">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '10px' }}>
          {fieldsdefault.map((field) => {
            return (
              <CreateObject
                key={field.id}
                field={field}
                index={field.id}
                fields={fieldsdefault}
                valuesfield={valuesfield}
                setValuesfield={(data) => setValuesfield(data)}
                valuesfield2={valuesfield2}
                setValuesfield2={(data) => setValuesfield2(data)}
                disabled={field.disabled}
                invisible={false}
              ></CreateObject>
            );
          })}
        </Row>
        {tipocampo === 2 ? (
          <Row style={{ marginLeft: '10px' }}>
            {fieldspesquisa.map((field) => {
              return (
                <CreateObject
                  key={field.id}
                  field={field}
                  index={field.id}
                  fields={fieldspesquisa}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={field.disabled}
                  invisible={false}
                ></CreateObject>
              );
            })}
          </Row>
        ) : (
          <div></div>
        )}
        {tipocampo === 3 ? (
          <Row style={{ marginLeft: '10px' }}>
            {fieldsmult.map((field) => {
              return (
                <CreateObject
                  key={field.id}
                  field={field}
                  index={field.id}
                  fields={fieldsmult}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={field.disabled}
                  invisible={false}
                ></CreateObject>
              );
            })}
          </Row>
        ) : (
          <div></div>
        )}
        {tipocampo === 4 ? (
          <Row style={{ marginLeft: '10px' }}>
            {fieldsnumerico.map((field) => {
              return (
                <CreateObject
                  key={field.id}
                  field={field}
                  index={field.id}
                  fields={fieldsnumerico}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={field.disabled}
                  invisible={false}
                ></CreateObject>
              );
            })}
          </Row>
        ) : (
          <div></div>
        )}
        {tipocampo === 8 ? (
          <Row style={{ marginLeft: '10px' }}>
            {fieldsespecial.map((field) => {
              return (
                <CreateObject
                  key={field.id}
                  field={field}
                  index={field.id}
                  fields={fieldsespecial}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={field.disabled}
                  invisible={false}
                ></CreateObject>
              );
            })}
          </Row>
        ) : (
          <div></div>
        )}
        {tipocampo === 9 ? (
          <Row style={{ marginLeft: '10px' }}>
            {fieldschecked.map((field) => {
              return (
                <CreateObject
                  key={field.id}
                  field={field}
                  index={field.id}
                  fields={fieldschecked}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={field.disabled}
                  invisible={false}
                ></CreateObject>
              );
            })}
          </Row>
        ) : (
          <div></div>
        )}
        {tipocampo === 10 || tipocampo === 11 ? (
          <Row style={{ marginLeft: '10px' }}>
            {fieldsradio.map((field) => {
              return (
                <CreateObject
                  key={field.id}
                  field={field}
                  index={field.id}
                  fields={fieldsradio}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={field.disabled}
                  invisible={false}
                ></CreateObject>
              );
            })}
          </Row>
        ) : (
          <div></div>
        )}
        {tipocampo === 12 ? (
          <Row style={{ marginLeft: '10px' }}>
            {fieldsdropdown.map((field) => {
              return (
                <CreateObject
                  key={field.id}
                  field={field}
                  index={field.id}
                  fields={fieldsradio}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={field.disabled}
                  invisible={false}
                ></CreateObject>
              );
            })}
          </Row>
        ) : (
          <div></div>
        )}
        <hr></hr>
        <Row style={{ textAlign: 'right', marginTop: '10px' }}>
          <Col>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-3" disabled={salvo} onClick={Salvar}>
              <i className={'feather icon-save'} /> Salvar Campo
            </Button>
          </Col>
        </Row>
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
      </div>
    </React.Fragment>
  );
};

export default FieldSelect;
