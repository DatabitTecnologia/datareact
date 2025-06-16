import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { NumericFormat } from 'react-number-format';

const CreateNumber = (props) => {
  const { valuesfield, setValuesfield } = props;
  const { valuesfield2, setValuesfield2 } = props;
  const { refs } = props;

  const onChangedecimal = (value) => {
    let texto = value;
    texto = texto.replace(',', '.');
    return texto;
  };

  const handleChangefield = (e, index) => {
    valuesfield[index] = onChangedecimal(e.target.value);
    setValuesfield([...valuesfield]);
  };

  const handleChangefield2 = (e, index) => {
    valuesfield2[index] = onChangedecimal(e.target.value);
    setValuesfield2([...valuesfield2]);
  };

  const handleKeyDown = (event, index) => {
    const key = event.keyCode;
    const campo = event.target.name;
    let campoFoco = '';
    switch (key) {
      case 40:
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
      case 38: {
        if (index > 0 || props.interval) {
          try {
            if (props.interval) {
              if (campo.includes('_2')) {
                campoFoco = props.name;
              } else {
                campoFoco = props.fields[props.index - 1].campo;
              }
            } else {
              campoFoco = props.fields[props.index - 1].campo;
            }

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
          <Col>
            <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
              {props.title} :
            </p>
            <NumericFormat
              id={props.name}
              name={props.name}
              className="form-control"
              value={valuesfield[props.index]}
              onChange={(e) => handleChangefield(e, props.index)}
              onBlur={props.methodBlur}
              allowNegative
              //thousandSeparator="."
              decimalSeparator=","
              decimalScale={props.decimal}
              fixedDecimalScale
              textAlign="rigth"
              ref={(el) => {
                refs.current[props.index] = el; // Preenche as refs com os elementos
              }}
              onKeyDown={props.onkeydown !== undefined ? props.onkeydown : (event) => handleKeyDown(event, props.index)}
              disabled={props.disabled}
              readOnly={props.readonly}
              style={
                !props.required ? { textAlign: 'right', backgroundColor: '#f4f7fa' } : { textAlign: 'right', backgroundColor: '#e2ecfa' }
              }
              autoComplete="off"
            ></NumericFormat>
          </Col>
          {props.interval ? (
            <Col>
              <div style={{ marginLeft: '-14px' }}>
                <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
                  até :
                </p>
                <NumericFormat
                  id={props.name + '_2'}
                  name={props.name + '_2'}
                  className="form-control"
                  value={valuesfield2[props.index]}
                  onChange={(e) => handleChangefield2(e, props.index)}
                  onBlur={props.methodBlur}
                  allowNegative
                  decimalSeparator=","
                  decimalScale={props.decimal}
                  fixedDecimalScale
                  onKeyDown={props.onkeydown !== undefined ? props.onkeydown : (event) => handleKeyDown(event, props.index)}
                  disabled={props.disabled}
                  readOnly={props.readonly}
                  autoComplete="off"
                ></NumericFormat>
              </div>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default CreateNumber;
