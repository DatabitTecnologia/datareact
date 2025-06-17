import React, { useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const CreateRadio = (props) => {
  const { valuesfield, setValuesfield } = props;
  const { refs } = props;
  const [itens, setItens] = React.useState([]);
  const [values, setValues] = React.useState([]);

  useEffect(() => {
    setItens(props.itens.split(','));
    setValues(props.values.split(','));
  }, []);

  const handleChangefield = (e, index, indexvalue) => {
    if (e.target.checked) {
      valuesfield[index] = values[indexvalue];
      setValuesfield([...valuesfield]);
    }
  };

  const handleKeyDown = (event, index) => {
    const key = event.keyCode;
    const campo = event.target.name;
    let campoFoco = '';
    switch (key) {
      case 13: {
        if (index < props.fields.length - 1) {
          if (props.interval) {
            if (campo.includes('_2')) {
              campoFoco = props.fields[props.index + 1].campo;
            } else {
              campoFoco = props.name + '_2';
            }
          } else {
            campoFoco = props.fields[props.index + 1].campo;
          }
          try {
            document.getElementById(campoFoco).focus();
          } catch (error) {
            //console.log(error);
          }
        }
        break;
      }
    }
  };

  return (
    <React.Fragment>
      <div style={{ width: props.measure, padding: '5px 5px 5px 5px' }}>
        <Row>
          <Form.Group className="mb-2">
            <p className="mb-1 text-muted" style={{ textAlign: 'left', marginLeft: '0.5rem' }}>
              {props.title} :
            </p>
            <Row style={{ marginTop: '0.6rem', marginLeft: '0.5rem' }}>
              {itens.map((item, index) => (
                <Col key={index}>
                  <Form.Check
                    key={index}
                    type="radio"
                    id={props.name + '-' + index}
                    name={props.name + '-' + index}
                    checked={valuesfield[props.index] == values[index]}
                    label={itens[index]}
                    onChange={(e) => handleChangefield(e, props.index, index)}
                    onKeyDown={props.onkeydown !== undefined ? props.onkeydown : (event) => handleKeyDown(event, props.index)}
                    style={
                      !props.required ? { backgroundColor: '#fff', fontSize: '13px' } : { backgroundColor: '#e2ecfa', fontSize: '13px' }
                    }
                    disabled={props.disabled}
                    readOnly={props.readonly}
                    ref={(el) => {
                      refs.current[props.index] = el; // Preenche as refs com os elementos
                    }}
                  ></Form.Check>
                </Col>
              ))}
            </Row>
          </Form.Group>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default CreateRadio;
