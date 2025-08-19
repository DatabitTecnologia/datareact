import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiInsert, apiUpdate, apiFind } from '../../../../api/crudapi';
import { CreateObject } from '../../../../components/CreateObject';

const PlaceHolderField = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const { valuesfield, setValuesfield } = props;
  const { valuesfield2, setValuesfield2 } = props;
  const [disabled, setDisabled] = React.useState(true);
  const { inclusao, setInclusao } = props;
  const { itemselec, setItemselec } = props;
  const [fields, setFields] = React.useState([]);
  const { tabela, setTabela } = props;
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const { showsave, setShowsave } = props;
  const { cabecalho, setCabecalho } = props;
  const { valuesname, setValuesname } = props;
  const [tabelaref, setTabelaref] = React.useState('');

  useEffect(() => {
    setValuesdisable([true, true, true, true, true, true, true, true, true, true, true, true, true, true]);
    if (itemselec !== undefined && !inclusao) {
      valuesfield[0] = itemselec['codigo'];
      valuesfield[1] = itemselec['placeholder'];
      valuesfield[2] = itemselec['tipo'];
      valuesfield[3] = itemselec['tipotabela'];
      valuesfield[4] = itemselec['valor'];
      valuesfield[5] = itemselec['campo'];
      valuesfield[6] = itemselec['tamanho'];
      valuesfield[7] = itemselec['tabela'];
      valuesfield[8] = itemselec['campochave'];
      valuesfield[9] = itemselec['camporef'];
      valuesfield[10] = itemselec['tabela2'];
      valuesfield[11] = itemselec['campochave2'];
      valuesfield[12] = itemselec['camporef2'];
      valuesfield[13] = itemselec['sql'];
      valuesfield[14] = cabecalho[valuesname.indexOf('codigo')];
      setValuesfield([...valuesfield]);
    }
    setFields([
      {
        id: 0,
        campo: 'TB01141_CODIGO',
        funcao: 'Código',
        tipo: 'varchar',
        nome: 'codigo',
        tamanho: 4,
        tipoobject: 1,
        disabled: valuesdisable[0],
        widthfield: 4,
        measure: '4rem',
        readonly: true
      },
      {
        id: 1,
        campo: 'TB01141_PLACEHOLDER',
        funcao: 'PlaceHolder',
        tipo: 'varchar',
        nome: 'placeholder',
        tamanho: 60,
        tipoobject: 1,
        disabled: valuesdisable[1],
        widthfield: 36,
        measure: '36rem'
      },
      {
        id: 2,
        campo: 'TB01141_TIPO',
        funcao: 'Tipo de Leitura',
        tipo: 'int',
        nome: 'tipo',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 14,
        measure: '14rem',
        itens: 'Definir Campo,Valor Fixo,Referência Tabela,Data,Data Extenso',
        values: '0,1,2,3,4',
        disabled: valuesdisable[2]
      },
      {
        id: 3,
        campo: 'TB01141_TIPOTABELA',
        funcao: 'Tipo de Exibiçao',
        tipo: 'int',
        nome: 'tipotabela',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 14,
        measure: '14rem',
        itens: 'Individual,Individual(SQL),Listagem(SQL)',
        values: '0,1,2',
        disabled: valuesdisable[3]
      },
      {
        id: 4,
        campo: 'TB01141_VALOR',
        funcao: 'Valor Fixo',
        tipo: 'varchar',
        nome: 'valor',
        tamanho: 60,
        tipoobject: 1,
        disabled: valuesdisable[4],
        widthfield: 17,
        measure: '17rem'
      },
      {
        id: 5,
        campo: 'TB01141_CAMPO',
        funcao: 'Nome do Campo',
        tipo: 'int',
        nome: 'campo',
        tamanho: 1,
        tipoobject: 12,
        widthfield: 40,
        measure: '40rem',
        tabelaref: 'VW00019',
        campolist: 'descricao',
        camporefdrop: 'campo',
        filteraux: "tabela = '" + tabela + "' ",
        disabled: valuesdisable[5],
        firstdefault: false
      },
      {
        id: 6,
        campo: 'TB01141_TAMANHO',
        funcao: 'Tamanho Máximo',
        tipo: 'int',
        nome: 'tamanho',
        tamanho: 60,
        tipoobject: 4,
        disabled: valuesdisable[6],
        widthfield: 11,
        measure: '11rem'
      },
      {
        id: 7,
        campo: 'TB01141_TABELA',
        funcao: 'Tabela',
        tipo: 'varchar',
        nome: 'tabela',
        tamanho: 1,
        tipoobject: 12,
        widthfield: 23,
        measure: '23rem',
        tabelaref: 'VW00018',
        campolist: 'descricao',
        camporefdrop: 'tabela',
        filteraux: "descricao <> '' and descricao is not null ",
        disabled: valuesdisable[7],
        firstdefault: false
      },
      {
        id: 8,
        campo: 'TB01141_CAMPOCHAVE',
        funcao: 'Campo Chave',
        tipo: 'varchar',
        nome: 'campochave',
        tamanho: 1,
        tipoobject: 12,
        widthfield: 23,
        measure: '23rem',
        tabelaref: 'VW00019',
        campolist: 'descricao',
        camporefdrop: 'campo',
        filteraux: "tabela = '" + valuesfield[7] + "' and descricao <> '' and descricao is not null ",
        disabled: valuesdisable[8],
        firstdefault: false
      },
      {
        id: 9,
        campo: 'TB01141_CAMPOREF',
        funcao: 'Campo Referência',
        tipo: 'varchar',
        nome: 'camporef',
        tamanho: 1,
        tipoobject: 12,
        widthfield: 22,
        measure: '22rem',
        tabelaref: 'VW00019',
        campolist: 'descricao',
        camporefdrop: 'campo',
        filteraux: "tabela = '" + valuesfield[7] + "' and descricao <> '' and descricao is not null ",
        disabled: valuesdisable[9],
        firstdefault: false
      },
      {
        id: 13,
        campo: 'TB01141_SQL',
        funcao: 'Filtro Complementar (SQL)',
        tipo: 'text',
        nome: 'sql',
        tamanho: 60,
        tipoobject: 6,
        disabled: valuesdisable[13],
        widthfield: 40,
        measure: '40rem'
      }
    ]);
  }, []);

  useEffect(() => {
    if (!disabled) {
      const valor = parseInt(valuesfield[2]);
      switch (valor) {
        case 0: {
          // Deifnir Campo
          valuesdisable[3] = true;
          valuesdisable[4] = true;
          valuesdisable[5] = false;
          valuesdisable[6] = false;
          valuesdisable[7] = true;
          valuesdisable[8] = true;
          valuesdisable[9] = true;
          valuesdisable[10] = true;
          valuesdisable[11] = true;
          valuesdisable[12] = true;
          break;
        }
        case 1: {
          // Valor Fixo
          valuesdisable[3] = true;
          valuesdisable[4] = false;
          valuesdisable[5] = true;
          valuesdisable[6] = true;
          valuesdisable[7] = true;
          valuesdisable[8] = true;
          valuesdisable[9] = true;
          valuesdisable[10] = true;
          valuesdisable[11] = true;
          valuesdisable[12] = true;
          break;
        }
        case 2: {
          // Campo Referência
          valuesdisable[3] = false;
          valuesdisable[4] = true;
          valuesdisable[5] = false;
          valuesdisable[6] = false;
          valuesdisable[7] = false;
          valuesdisable[8] = false;
          valuesdisable[9] = false;
          valuesdisable[10] = false;
          valuesdisable[11] = false;
          valuesdisable[12] = false;
          break;
        }
        case 3: {
          // Data
          valuesdisable[3] = true;
          valuesdisable[4] = true;
          valuesdisable[5] = true;
          valuesdisable[6] = true;
          valuesdisable[7] = true;
          valuesdisable[8] = true;
          valuesdisable[9] = true;
          valuesdisable[10] = true;
          valuesdisable[11] = true;
          valuesdisable[12] = true;
          break;
        }
        case 4: {
          // Data por Extenso
          valuesdisable[3] = true;
          valuesdisable[4] = true;
          valuesdisable[5] = true;
          valuesdisable[6] = true;
          valuesdisable[7] = true;
          valuesdisable[8] = true;
          valuesdisable[9] = true;
          valuesdisable[10] = true;
          valuesdisable[11] = true;
          valuesdisable[12] = true;
          break;
        }
      }
      setValuesdisable([...valuesdisable]);
    }
  }, [valuesfield[2]]);

  useEffect(() => {
    if (parseInt(valuesfield[2]) !== 2 && !disabled) {
      const campo = valuesfield[5];
      if (campo !== undefined && campo !== '' && campo !== null) {
        apiFind('FieldVW', '*', '', "tabela = '" + tabela + "' and campo = '" + campo + "' ").then((response) => {
          if (response.status === 200) {
            valuesfield[6] = response.data.tamanho;
            setValuesfield([...valuesfield]);
          }
        });
      }
    }
  }, [valuesfield[5]]);

  useEffect(() => {
    if (fields !== undefined && fields.length > 0) {
      const tablefilter = valuesfield[7];
      if (tabelaref !== tablefilter && tablefilter !== undefined) {
        fields[8].filteraux = "tabela = '" + tablefilter + "' and descricao <> '' and descricao is not null ";
        fields[9].filteraux = "tabela = '" + tablefilter + "' and descricao <> '' and descricao is not null ";
        setFields([...fields]);
        setTabelaref(tablefilter);
      }
    }
  }, [valuesfield[7]]);

  useEffect(() => {
    if (!disabled) {
      const campo = valuesfield[9];
      if (campo !== undefined && campo !== '' && campo !== null) {
        apiFind('FieldVW', '*', '', "tabela = '" + valuesfield[7] + "' and campo = '" + campo + "' ").then((response) => {
          if (response.status === 200) {
            valuesfield[6] = response.data.tamanho;
            setValuesfield([...valuesfield]);
          }
        });
      }
    }
  }, [valuesfield[9]]);

  useEffect(() => {
    if (valuesfield[10] !== '' && valuesfield[10] !== undefined && !disabled) {
      const campo = valuesfield[12];
      if (campo !== undefined && campo !== '' && campo !== null) {
        apiFind('FieldVW', '*', '', "tabela = '" + valuesfield[10] + "' and campo = '" + campo + "' ").then((response) => {
          if (response.status === 200) {
            valuesfield[6] = response.data.tamanho;
            setValuesfield([...valuesfield]);
          }
        });
      }
    }
  }, [valuesfield[12]]);

  useEffect(() => {
    if (inclusao) {
      valuesdisable[1] = false;
      valuesdisable[2] = false;
      valuesdisable[3] = false;
      valuesdisable[4] = false;
      valuesdisable[5] = false;
      valuesdisable[6] = false;
      valuesdisable[7] = false;
      valuesdisable[8] = false;
      valuesdisable[9] = false;
      valuesdisable[10] = false;
      valuesdisable[11] = false;
      valuesdisable[12] = false;
      valuesdisable[13] = false;
      valuesfield[7] = undefined;
      valuesfield[8] = undefined;
      valuesfield[9] = undefined;
      setValuesfield([...valuesfield]);
      setValuesdisable([...valuesdisable]);
      setDisabled(false);
      try {
        document.getElementById('TB02263_NOME').focus();
      } catch (error) {
        //console.log(error);
      }
    }
  }, [inclusao]);

  const Editar = () => {
    setDisabled(false);
    setInclusao(false);
    valuesdisable[1] = false;
    valuesdisable[2] = false;
    valuesdisable[3] = false;
    valuesdisable[4] = false;
    valuesdisable[5] = false;
    valuesdisable[6] = false;
    valuesdisable[7] = false;
    valuesdisable[8] = false;
    valuesdisable[9] = false;
    valuesdisable[10] = false;
    valuesdisable[11] = false;
    valuesdisable[12] = false;
    valuesdisable[13] = false;
    setValuesdisable([...valuesdisable]);
    try {
      document.getElementById('TB02263_NOME').focus();
    } catch (error) {
      //console.log(error);
    }
  };

  const Salvar = () => {
    if (document.getElementById('TB01141_PLACEHOLDER').value === undefined || document.getElementById('TB01141_PLACEHOLDER').value === '') {
      setItemvariant(1);
      setMensagem('PlaceHolder é preenchimento obrigatório !');
      document.getElementById('TB01141_PLACEHOLDER').focus();
    } else {
      setCarregando(true);
      try {
        let item = {};
        item['codigo'] = valuesfield[0];
        item['placeholder'] = valuesfield[1];
        item['tipo'] = valuesfield[2];
        item['tipotabela'] = valuesfield[3];
        item['valor'] = valuesfield[4];
        item['campo'] = valuesfield[5];
        item['tamanho'] = valuesfield[6];
        item['tabela'] = valuesfield[7];
        item['campochave'] = valuesfield[8];
        item['camporef'] = valuesfield[9];
        item['tabela2'] = valuesfield[10];
        item['campochave2'] = valuesfield[11];
        item['camporef2'] = valuesfield[12];
        item['sql'] = valuesfield[13];
        item['modelo'] = cabecalho[valuesname.indexOf('codigo')];
        if (inclusao) {
          apiInsert('PlaceHolder', item).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              if (response.data.status === 1) {
                setDisabled(response.data.status === 1);
                setItemselec(undefined);
                setDisabled(true);
                setShowsave(false);
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          });
        } else {
          apiUpdate('PlaceHolder', item).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              if (response.data.status === 1) {
                setDisabled(response.data.status === 1);
                setItemselec(undefined);
                setDisabled(true);
                setShowsave(false);
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

  const Cancelar = () => {
    setItemselec(undefined);
    setDisabled(true);
    setShowsave(false);
  };

  return (
    <React.Fragment>
      <div id="frmholder" name="frmholder">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col>
            <div>
              <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                {fields.map((field, index) => (
                  <CreateObject
                    key={index}
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
          </Col>
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button id="btnEditar" className="btn shadow-2 mb-2" disabled={!disabled} onClick={(e) => Editar()}>
              <i className={'feather icon-edit'} /> Editar
            </Button>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" disabled={disabled} onClick={(e) => Salvar()}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" disabled={disabled} onClick={(e) => Cancelar()}>
              <i className={'feather icon-x'} />
              Cancelar
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

export default PlaceHolderField;
