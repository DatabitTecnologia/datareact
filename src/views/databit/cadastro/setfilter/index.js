import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { CreateObject } from '../../../../components/CreateObject';

const SetFilter = (props) => {
  const { itemselect, setItemselect, object } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const { showfilter, setShowfilter } = props;
  const [valuesdisable, setValuesdisable] = React.useState([]);

  useEffect(() => {
    console.log(itemselect);
    setValuesdisable([true, true, false]);
    valuesfield[0] = itemselect.campo;
    valuesfield[1] = itemselect.funcao;
    valuesfield[2] = itemselect.tipofiltro;
    let optionfilter = '';
    let valuefilter = '';
    if (itemselect.tabelaref !== '' && itemselect.tabelaref !== undefined && itemselect.tabelaref !== null) {
      optionfilter = 'Consulta Exata,Multi-seleção';
      valuefilter = '1,4';
    } else {
      optionfilter = 'Consulta Exata,Consulta Aproximada,Consulta por Intervalo';
      valuefilter = '1,2,3';
    }
    if (valuesfield[2] === null || valuesfield[2] === undefined || valuesfield[2] === '') {
      valuesfield[2] = '1';
    }
    setValuesfield([...valuesfield]);
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
        campo: 'TB00003_TIPOFILTRO',
        funcao: 'Tipo de Filtro',
        tipo: 'varchar',
        nome: 'tipofiltro',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 48,
        measure: '48rem',
        itens: optionfilter,
        values: valuefilter,
        disabled: valuesdisable[2],
        invisible: false
      }
    ]);
  }, []);

  const Salvar = () => {
    itemselect.tipofiltro = parseInt(valuesfield[2]);
    setItemselect(itemselect);
    setValuesfield([...valuesfield]);
    setShowfilter(false);
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
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={() => Salvar()}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={() => setShowfilter(false)}>
              <i className={'feather icon-x'} />
              Cancelar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default SetFilter;
