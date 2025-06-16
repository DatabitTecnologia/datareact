import React, { useEffect } from 'react';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import { CreateObject } from '../../CreateObject';
import { generatePDF } from '../generatePDF';

const ReportOptions = (props) => {
  const { title, columns, data, orientation } = props;
  const { showprint, setShowprint } = props;
  const { columnnumber, setColumnnumber } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  useEffect(() => {
    valuesfield[0] = 0;
    const visibility = {};
    columnnumber.forEach((col) => {
      visibility[col.field] = col.visible !== false; // true por padrão
    });
    setColumnVisibility(visibility);
    setValuesfield([...valuesfield]);
  }, []);

  useEffect(() => {
    const options = columns
      .map((element) => ({
        value: element.field,
        label: element.headerName
      }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR', { sensitivity: 'base' }));

    setFields([
      {
        id: 0,
        campo: 'ORDER',
        funcao: 'Ordenação / Agrupamento',
        tipo: 'varchar',
        nome: 'order',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 24,
        measure: '16rem',
        itens: 'Nenhum,Ordenar,Agrupar',
        values: '0,1,2',
        disabled: false,
        invisible: false
      },
      {
        id: 1,
        campo: 'FIELD',
        funcao: 'Deseja ordernar / agrupar por',
        tipo: 'varchar',
        nome: 'field',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 30,
        measure: '30rem',
        options: options,
        disabled: parseInt(valuesfield[0]) === 0,
        invisible: false
      }
    ]);
  }, [valuesfield[0]]);

  const Print = () => {
    generatePDF(title, columns, data, orientation, valuesfield[1], parseInt(valuesfield[0]), valuesfield2[1], columnVisibility);
    setShowprint(false);
  };

  const handleCheckboxChange = (field, checked) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [field]: checked
    }));
  };

  return (
    <React.Fragment>
      <div id="frmimprimir" name="frmimprimir">
        <Card className="Recent-Users" style={{ marginBottom: '10px' }}>
          <Card.Header>
            <Card.Title as="h5">Opções de Impressão</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
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
                  disabled={field.disabled}
                />
              ))}
            </Row>
          </Card.Body>
        </Card>
        {columnnumber !== undefined && columnnumber.length > 0 ? (
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Totalizadores</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                {columnnumber.map((col, index) => (
                  <Col key={col.field} xs={12} md={4}>
                    <Form.Check
                      type="checkbox"
                      label={col.headerName}
                      checked={columnVisibility[col.field] !== false}
                      onChange={(e) => handleCheckboxChange(col.field, e.target.checked)}
                    />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        ) : (
          <></>
        )}
        <hr></hr>
        <Row style={{ textAlign: 'right', marginTop: '20px' }}>
          <Col>
            <Button id="btnImprimir" className="btn-primary shadow-2 mb-3" onClick={(e) => Print()}>
              <i className={'feather icon-printer'} />
              Imprimir
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ReportOptions;
