import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';

const Parameter = (props) => {
  const { itemselect, setItemselect } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const { showparam, setShowparam } = props;
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);

  useEffect(() => {
    console.log(itemselect);
    setValuesdisable([true, true, false, false]);
    let tipocampo = 1;
    if (itemselect.tabelaref !== '' && itemselect.tabelaref !== undefined && itemselect.tabelaref !== null) {
      tipocampo = 2;
    }
    setFields([
      {
        id: 0,
        campo: 'TB00003_CAMPO',
        funcao: 'Campo selecionado',
        tipo: 'varchar',
        nome: 'codigo',
        tipoobject: 1,
        tamanho: 12,
        widthfield: 15,
        measure: '15rem',
        disabled: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'TB00003_FUNCAO',
        funcao: 'Função',
        tipo: 'varchar',
        nome: 'funcao',
        tipoobject: 1,
        tamanho: 12,
        widthfield: 32,
        measure: '32rem',
        disabled: valuesdisable[1]
      },
      {
        id: 2,
        campo: 'TB00003_VALOR',
        funcao: 'Valor do Campo',
        tipo: 'varchar',
        nome: 'valor',
        tipoobject: tipocampo,
        tamanho: itemselect.tamanho,
        widthfield: 47,
        measure: '47rem',
        tabelaref: itemselect.tabelaref,
        widthname: 38,
        disabled: valuesdisable[2]
      },
      {
        id: 3,
        campo: 'TB00003_VALOR',
        funcao: 'Campo livre para digitação',
        tipo: 'varchar',
        nome: 'digitacao',
        tamanho: tipocampo,
        tipoobject: 9,
        widthfield: 1,
        measure: '33rem',
        valuechecked: 'S',
        valueunchecked: 'N',
        disabled: valuesdisable[3]
      }
    ]);
    valuesfield[0] = itemselect.campo;
    valuesfield[1] = itemselect.funcao;
    valuesfield[2] = itemselect.valor;
    valuesfield[3] = itemselect.digita;
    setValuesfield([...valuesfield]);
  }, []);

  const Salvar = () => {
    itemselect.valor = valuesfield[2];
    itemselect.digita = valuesfield[3];
    setItemselect(itemselect);
    setShowparam(false);
  };

  return (
    <React.Fragment>
      <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
      <div id="param" name="param">
        <Row style={{ marginLeft: '5px' }}>
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

        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={() => Salvar()}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={() => setShowparam(false)}>
              <i className={'feather icon-x'} />
              Cancelar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Parameter;
