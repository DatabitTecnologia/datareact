import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiUpdate, apiInsert, apiFind } from '../../../../api/crudapi';
import { CreateObject } from '../../../../components/CreateObject';
import { getListClass, getListClassall } from '../../../../api/apiconnect';
import { Decode64 } from '../../../../utils/crypto';

const ParamSelect = (props) => {
  const { queryselect, itemselec } = props;
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const handleClosefield = () => setShowfield(false);
  const [showfield, setShowfield] = useState(false);
  const [carregando, setCarregando] = React.useState(false);
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
    { value: 1, label: 'Texto Simples' },
    { value: 2, label: 'Pesquisa' },
    //{ value: 3, label: 'Multi-Seleção' },
    { value: 4, label: 'Numérico' },
    { value: 5, label: 'Data' },
    //{ value: 6, label: 'Multi-Texto' },
    { value: 8, label: 'Texto Especial' },
    { value: 9, label: 'CheckBox' },
    { value: 10, label: 'Radio' },
    { value: 11, label: 'DropDown Simples' },
    { value: 12, label: 'DropDown Tabela' },
    { value: 13, label: 'Password' }
  ];

  const typesupdate = [
    { value: 1, label: 'Texto Simples' },
    { value: 2, label: 'Pesquisa' },
    { value: 8, label: 'Texto Especial' },
    { value: 9, label: 'CheckBox' },
    { value: 10, label: 'Radio' },
    { value: 11, label: 'DropDown Simples' },
    { value: 12, label: 'DropDown Tabela' },
    { value: 13, label: 'Password' }
  ];

  const typesmask = [
    { value: 0, label: 'Nenhum' },
    { value: 1, label: 'CPF' },
    { value: 2, label: 'CNPJ' },
    { value: 3, label: 'CEP' },
    { value: 4, label: 'Fone Fixo' },
    { value: 5, label: 'Mobile / WhatsAPP' },
    { value: 6, label: 'Plano de Contas' },
    { value: 7, label: 'Hora' },
    { value: 8, label: 'Outro' }
  ];

  useEffect(() => {
    setCarregando(true);
    getListClassall(Decode64(sessionStorage.getItem('urlconnect')), '').then((response) => {
      if (response.status === 200) {
        setListclassall(response.data);
        getListClass(Decode64(sessionStorage.getItem('urlconnect')), '').then((response) => {
          if (response.status === 200) {
            setListclass(response.data);
            if (props.updatefield) {
              valuesfield[0] = itemselec.nome;
              valuesfield[1] = itemselec.funcao;
              valuesfield[2] = itemselec.tipoobject;
              valuesfield[3] = itemselec.tamanho;
              valuesfield[4] = itemselec.ordem;
              valuesfield[5] = itemselec.largura;
              valuesfield[6] = itemselec.default;
              valuesfield[7] = parseInt(itemselec.visivel);
              valuesfield[8] = itemselec.tabelaref;
              valuesfield[9] = itemselec.tipomult;
              valuesfield[10] = itemselec.decimal;
              valuesfield[11] = itemselec.tipomascara;
              valuesfield[12] = itemselec.mascara;
              valuesfield[13] = itemselec.valuechecked;
              valuesfield[14] = itemselec.valueunchecked;
              valuesfield[15] = itemselec.itens;
              valuesfield[16] = itemselec.values;
              valuesfield[17] = itemselec.campolist;
              valuesfield[18] = itemselec.camporefdrop;
              valuesfield[19] = itemselec.filteraux;
            } else {
              valuesfield[2] = '1';
              valuesfield[3] = 10;
              valuesfield[4] = props.ultordem + 1;
              valuesfield[5] = 10;
              valuesfield[7] = 1;
              valuesfield[10] = 0;
              valuesfield[11] = 0;
            }
            setValuesfield([...valuesfield]);
            setCarregaobjetos(true);
            setCarregando(false);
          }
        });
      }
    });
  }, []);

  const GetTypeFields = () => {
    let listvalues;
    if (!props.updatefield) {
      listvalues = types;
    } else {
      if (
        props.itemselec.tipoobject === 1 ||
        props.itemselec.tipoobject === 4 ||
        props.itemselec.tipoobject === 9 ||
        props.itemselec.tipoobject === 10 ||
        props.itemselec.tipoobject === 11 ||
        props.itemselec.tipoobject === 13
      ) {
        listvalues = typesupdate;
      } else {
        listvalues = types;
      }
    }
    return listvalues;
  };

  useEffect(() => {
    if (carregaobjetos) {
      setFieldsdefault([
        {
          id: 0,
          campo: 'TB00114_NOME',
          funcao: 'Parâmetro',
          tipo: 'varchar',
          nome: 'nome',
          tamanho: 15,
          tipoobject: 1,
          widthfield: 15,
          measure: '15rem'
        },

        {
          id: 1,
          campo: 'TB00114_FUNCAO',
          funcao: 'Descrição do Parâmetro',
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
          campo: 'TB00114_TIPOOBJECT',
          funcao: 'Tipo de Objeto',
          tipo: 'varchar',
          nome: 'tipoobject',
          tamanho: 10,
          tipoobject: 11,
          widthfield: 8,
          measure: '23rem',
          options: GetTypeFields
        },
        {
          id: 3,
          campo: 'TB00114_TAMANHO',
          funcao: 'Tamanho',
          tipo: 'int',
          nome: 'tananho',
          tamanho: 12,
          tipoobject: 4,
          widthfield: 8,
          measure: '8rem'
        },
        {
          id: 4,
          campo: 'TB00114_ORDEM',
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
          campo: 'TB00114_LARGURA',
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
          campo: 'TB00114_DEFAULT',
          funcao: 'Valor Default',
          tipo: 'varchar',
          nome: 'default',
          tamanho: 1000,
          tipoobject: 1,
          widthfield: 47,
          measure: '47rem',
          charnormal: true
        },
        {
          id: 7,
          campo: 'TB00114_VISIVEL',
          funcao: 'Parâmetro VISÍVEL',
          tipo: 'varchar',
          nome: 'visivel',
          tamanho: 1,
          tipoobject: 9,
          widthfield: 1,
          measure: '12rem',
          valuechecked: 1,
          valueunchecked: 0
        }
      ]);
      setFieldspesquisa([
        {
          id: 8,
          campo: 'TB00114_TABELAREF',
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
          id: 19,
          campo: 'TB00114_FILTERAUX',
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
          campo: 'TB00114_TIPOMULT',
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
          measure: '10rem'
        }
      ]);

      setFieldsespecial([
        {
          id: 11,
          campo: 'TB00114_TIPOMASCARA',
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
          campo: 'TB00114_MASCARA',
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
          campo: 'TB00114_VALUECHECKED',
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
          campo: 'TB00114_UNVALUECHECKED',
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
          campo: 'TB00114_ITENS',
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
          campo: 'TB00114_VALUES',
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
          campo: 'TB00114_TABELAREF',
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
          id: 17,
          campo: 'TB00114_CAMPOLIST',
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
          id: 18,
          campo: 'TB00114_CAMPOREFDROP',
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
          id: 19,
          campo: 'TB00114_FILTERAUX',
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

  useEffect(() => {
    setTipocampo(parseInt(valuesfield[2]));
  }, [valuesfield]);

  const Salvar = () => {
    if (
      document.getElementById('TB00114_TAMANHO').value <= 0 ||
      document.getElementById('TB00114_TAMANHO').value === undefined ||
      document.getElementById('TB00114_TAMANHO').value === '0' ||
      document.getElementById('TB00114_TAMANHO').value === ''
    ) {
      setItemvariant(1);
      setMensagem('Campo tamanho não poderá possuir valores zerados, negativos ou nulos !');
      document.getElementById('TB00114_TAMANHO').focus();
    } else if (
      document.getElementById('TB00114_ORDEM').value <= 0 ||
      document.getElementById('TB00114_ORDEM').value === undefined ||
      document.getElementById('TB00114_ORDEM').value === '0' ||
      document.getElementById('TB00114_ORDEM').value === ''
    ) {
      setItemvariant(1);
      setMensagem('Campo ordem não poderá possuir valores zerados, negativos ou nulos !');
      document.getElementById('TB00114_ORDEM').focus();
    } else if (
      document.getElementById('TB00114_LARGURA').value <= 0 ||
      document.getElementById('TB00114_LARGURA').value === undefined ||
      document.getElementById('TB00114_LARGURA').value === '0' ||
      document.getElementById('TB00114_LARGURA').value === ''
    ) {
      setItemvariant(1);
      setMensagem('Campo largura não poderá possuir valores zerados, negativos ou nulos !');
      document.getElementById('TB00114_LARGURA').focus();
    } else if (document.getElementById('TB00114_NOME').value === '' || document.getElementById('TB00114_NOME').value === undefined) {
      setItemvariant(1);
      setMensagem('Nome do parâmetro é de preenchimento obrigatório !');
      document.getElementById('TB00114_NOME').focus();
    } else if (document.getElementById('TB00114_FUNCAO').value === '' || document.getElementById('TB00114_FUNCAO').value === undefined) {
      setItemvariant(1);
      setMensagem('Descrição do parâmetro é de preenchimento obrigatório !');
      document.getElementById('TB00114_FUNCAO').focus();
    } else {
      let item = {};
      item['query'] = queryselect;
      item['nome'] = valuesfield[0];
      item['funcao'] = valuesfield[1];
      item['tipoobject'] = valuesfield[2];
      item['tamanho'] = valuesfield[3];
      item['ordem'] = valuesfield[4];
      item['largura'] = valuesfield[5];
      item['default'] = valuesfield[6];
      item['visivel'] = valuesfield[7];
      item['tabelaref'] = valuesfield[8];
      item['tipomult'] = valuesfield[9];
      item['decimal'] = valuesfield[10];
      item['tipomascara'] = valuesfield[11];
      item['mascara'] = valuesfield[12];
      item['valuechecked'] = valuesfield[13];
      item['valueunchecked'] = valuesfield[14];
      item['itens'] = valuesfield[15];
      item['values'] = valuesfield[16];
      item['campolist'] = valuesfield[17];
      item['camporefdrop'] = valuesfield[18];
      item['filteraux'] = valuesfield[19];
      if (props.updatefield) {
        item['idfiltro'] = itemselec.idfiltro;
        setCarregando(true);
        apiUpdate('QueryParam', item).then((response) => {
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
            setMensagem(response.data);
          }
        });
      } else {
        setCarregando(true);
        apiInsert('QueryParam', item).then((response) => {
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
            setMensagem(response.data);
          }
        });
      }
    }
  };

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
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-3" disabled={salvo} onClick={(e) => Salvar()}>
              <i className={'feather icon-save'} /> Salvar Parâmetro
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

export default ParamSelect;
