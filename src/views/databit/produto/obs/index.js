import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { CreateObject } from '../../../../components/CreateObject';

const ProdutoObs = (props) => {
  const { valuesfield, setValuesfield } = props;
  const { valuesfield2, setValuesfield2 } = props;
  const { optionselec } = props;
  const [fields, setFields] = React.useState([]);
  const [termo, setTermo] = React.useState('Observações Normais');
  const [campo, setCampo] = React.useState('TB01010_OBS');
  const [nome, setNome] = React.useState('obs');
  const [id, setId] = React.useState(10);

  useEffect(() => {
    switch (optionselec) {
      case 0: {
        setId(10);
        setTermo('Observações Normais');
        setCampo('TB01010_OBS');
        setNome('obs');
        break;
      }
      case 1: {
        setId(11);
        setTermo('Observações Internas');
        setCampo('TB01010_OBSINT');
        setNome('obsint');
        break;
      }
      case 2: {
        setId(12);
        setTermo('Observações Nota Fiscal');
        setCampo('TB01010_OBSNF');
        setNome('obsnf');
        break;
      }
    }
  }, []);

  useEffect(() => {
    setFields([
      {
        id: id,
        campo: campo,
        funcao: termo,
        tipo: 'text',
        nome: nome,
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        disabled: true,
        lines: 15
      }
    ]);
  }, [id, termo, campo, nome]);

  return (
    <React.Fragment>
      <div id="frmobs" name="frmobs">
        <Row style={{ height: '350px' }}>
          <Col>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">{termo}</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '3px' }}>
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
                    disabled={true}
                  ></CreateObject>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ProdutoObs;
