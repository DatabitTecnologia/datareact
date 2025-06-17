import React, { useEffect } from 'react';
import { CreateObject } from '../../CreateObject';
import { Row, Col, Button, Card } from 'react-bootstrap';
import AGGrid from '..';
import { agruparDados } from '../../../utils/group';

const AGGridGroup = (props) => {
  const { columns, rows, modulo } = props;
  const { showgroup, setShowgroup } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);

  const [rowsgroup, setRowsgroup] = React.useState([]);
  const [columnsgroup, setColumnsgroup] = React.useState([]);

  useEffect(() => {
    const options = columns
      .map((element) => ({
        value: element.field,
        label: element.headerName,
        type: element.type
      }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR', { sensitivity: 'base' }));

    const optionsfim = options.filter((item) => item.type !== 'number' && item.type !== 'numericColumn');

    setFields([
      {
        id: 0,
        campo: 'FIELD',
        funcao: 'Deseja agrupar por',
        tipo: 'varchar',
        nome: 'field',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 30,
        measure: '30rem',
        options: optionsfim,
        disabled: parseInt(valuesfield[0]) === 0,
        invisible: false
      }
    ]);
    valuesfield[0] = optionsfim[0].value;
    setValuesfield([...valuesfield]);
  }, []);

  useEffect(() => {
    const ordemTipo = {
      numericColumn: 3,
      number: 2,
      string: 1,
      undefined: 0
    };

    setColumnsgroup(
      columns
        .filter((item) => item.field === valuesfield[0] || item.type === 'number' || item.type === 'numericColumn')
        .sort((a, b) => {
          const prioridadeA = ordemTipo[a.type] ?? 0;
          const prioridadeB = ordemTipo[b.type] ?? 0;
          return prioridadeA - prioridadeB; // decrescente
        })
    );
    setRowsgroup(agruparDados(rows, valuesfield[0]));
  }, [valuesfield[0]]);

  return (
    <React.Fragment>
      <div id="frmgroup" name="frmgroup">
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">Opções de Agrupamento</Card.Title>
          </Card.Header>
        </Card>
        <Row style={{ marginLeft: '1px', marginBottom: '10px' }}>
          {fields.map((field, index) => (
            <CreateObject
              key={index}
              field={field}
              index={field.id}
              fields={fields}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              disabled={field.disabled}
            />
          ))}
        </Row>
        <Row>
          <AGGrid width="100%" height="460px" rows={rowsgroup} columns={columnsgroup} permgroup={false} modulo={modulo}></AGGrid>
        </Row>

        <Row style={{ textAlign: 'right', marginTop: '20px' }}>
          <Col>
            <Button id="btnFechar" className="btn-primary shadow-2 mb-3" onClick={(e) => setShowgroup(false)}>
              <i className={'feather icon-x'} />
              Fechar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
export default AGGridGroup;
