import React from 'react';
import { Row, Card } from 'react-bootstrap';
import { CreateObject } from '../../../../components/CreateObject';

const Cabecalho = (props) => {
  const { disabled, fieldscab } = props;
  const { valuesfield, setValuesfield } = props;
  const { valuesfield2, setValuesfield2 } = props;
  return (
    <React.Fragment>
      <div id="frmcabecalho" name="frmcabecalho">
        <Card className="Recent-Users">
          <Card.Header>
            <Card.Title as="h5">Observações</Card.Title>
          </Card.Header>
          <Row style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px', marginBottom: '5px' }}>
            {fieldscab.map((field) => {
              return (
                <CreateObject
                  key={field.id}
                  field={field}
                  index={field.id}
                  fields={fieldscab}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={disabled}
                  onkeydown={(event) => handleKeyDown(event, field.id)}
                ></CreateObject>
              );
            })}
          </Row>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Cabecalho;
