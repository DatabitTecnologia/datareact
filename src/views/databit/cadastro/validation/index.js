import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { CreateObject } from '../../../../components/CreateObject';
import { SketchPicker } from 'react-color';

const Validation = (props) => {
  const { itemselect, object } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const { showvalid, setShowvalid } = props;
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [cor, setCor] = React.useState('#fff');

  useEffect(() => {
    setValuesdisable([true, true, false, false, false, false, false, false]);
    valuesfield[0] = itemselect.campo;
    valuesfield[1] = itemselect.funcao;
    valuesfield[2] = itemselect.sinal;
    valuesfield[3] = itemselect.tipotab;
    valuesfield[4] = itemselect.valorval;
    valuesfield[5] = itemselect.camval1;
    valuesfield[6] = itemselect.mensagem;
    valuesfield[7] = itemselect.voltar;
    if (valuesfield[2] === undefined || valuesfield[2] === null || valuesfield[2] === 0) {
      valuesfield[2] = '1';
    }
    if (valuesfield[3] === undefined || valuesfield[3] === null) {
      valuesfield[3] = 'V';
    }
    if (valuesfield[7] === undefined || valuesfield[7] === null) {
      valuesfield[7] = 'N';
    }
    setCor(itemselect.corweb);
    validCor(itemselect.corweb);
    setValuesfield([...valuesfield]);
  }, []);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB00003_CAMPO',
        funcao: 'Campo selecionado',
        tipo: 'varchar',
        nome: 'codigo',
        tipoobject: 1,
        tamanho: 100,
        widthfield: 15,
        measure: '15rem',
        disabled: valuesdisable[0],
        invisible: false
      },
      {
        id: 1,
        campo: 'TB00003_FUNCAO',
        funcao: 'Função',
        tipo: 'varchar',
        nome: 'funcao',
        tipoobject: 1,
        tamanho: 100,
        widthfield: 32,
        measure: '32rem',
        disabled: valuesdisable[1],
        invisible: false
      },
      {
        id: 2,
        campo: 'TB00103_OPERACAO',
        funcao: 'Operação',
        tipo: 'varchar',
        nome: 'operacao',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 24,
        measure: '24rem',
        itens:
          '( = ) Igual,( <> ) Diferente,( > ) Maior,( < ) Menor,( >= ) Maior e igual,( <= ) Menor e igual,( $ ) Contém,( !$ ) Não contém,( EX ) Existir',
        values: '1,2,3,4,5,6,7,8,9',
        disabled: valuesdisable[2],
        invisible: false
      },
      {
        id: 3,
        campo: 'TB00103_VERIFICA',
        funcao: 'Verificação por',
        tipo: 'varchar',
        nome: 'verfica',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 24,
        measure: '23rem',
        itens: 'Digitar valor,Valor de outro campo',
        values: 'V,C',
        disabled: valuesdisable[3],
        invisible: false
      },
      {
        id: 4,
        campo: 'TB00003_VALORVAL',
        funcao: 'Digitar valor',
        tipo: 'varchar',
        nome: 'valorval',
        tipoobject: 1,
        tamanho: 100,
        widthfield: 47,
        measure: '47rem',
        disabled: valuesdisable[4],
        invisible: valuesfield[3] === 'C'
      },
      {
        id: 5,
        campo: 'TB00003_CAMPO2',
        funcao: 'Defina qual campo',
        tipo: 'varchar',
        nome: 'campo',
        tamanho: 4,
        tipoobject: 12,
        widthfield: 47,
        measure: '47rem',
        tabelaref: 'TB00003',
        campolist: 'TB00003_FUNCAO',
        camporefdrop: 'TB00003_CAMPO',
        filteraux: "TB00003_TABELA = '" + object + "' ",
        disabled: valuesdisable[5],
        invisible: valuesfield[3] === 'V'
      },
      {
        id: 6,
        campo: 'TB00003_MENSAGEM',
        funcao: 'Mensagem',
        tipo: 'varchar',
        nome: 'mensagem',
        tipoobject: 1,
        tamanho: 100,
        widthfield: 35,
        measure: '35rem',
        disabled: valuesdisable[6],
        invisible: false,
        charnormal: true
      },
      {
        id: 7,
        campo: 'TB00003_MENSAGEM',
        funcao: 'Travar ao Salvar',
        tipo: 'varchar',
        nome: 'travar',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 12,
        measure: '12rem',
        itens: 'Não,Sim',
        values: 'N,S',
        disabled: valuesdisable[7],
        invisible: false
      }
    ]);
  }, [valuesfield[3]]);

  const handleChangecor = (color) => {
    if (color !== null) {
      setCor(color.hex);
    }
  };

  useEffect(() => {
    valuesfield[8] = cor;
    console.log(cor);
  }, [cor]);

  const validCor = (color) => {
    if (color === null) {
      return '#33ccff';
    } else {
      return color;
    }
  };

  const Salvar = () => {
    itemselect.sinal = valuesfield[2];
    itemselect.tipotab = valuesfield[3];
    itemselect.valorval = valuesfield[4];
    itemselect.camval1 = valuesfield[5];
    itemselect.mensagem = valuesfield[6];
    itemselect.voltar = valuesfield[7];
    itemselect.corweb = cor;
    setValuesfield([...valuesfield]);
    setShowvalid(false);
  };

  return (
    <React.Fragment>
      <div id="validation" name="validation">
        <Row style={{ marginLeft: '5px', marginTop: '-25px' }}>
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
              invisible={field.invisible}
            ></CreateObject>
          ))}
        </Row>
        <Row>
          <Button style={{ backgroundColor: validCor(cor), borderColor: '#fff' }}>Cor da listagem</Button>
        </Row>
        <Row style={{ textAlign: 'center' }}>
          <Col lg={4}></Col>
          <Col lg={4}>
            <SketchPicker height="100%" width="100%" color={validCor(cor)} onChangeComplete={(color) => handleChangecor(color)} />
          </Col>
          <Col lg={4}></Col>
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={() => Salvar()}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={() => setShowvalid(false)}>
              <i className={'feather icon-x'} />
              Cancelar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Validation;
