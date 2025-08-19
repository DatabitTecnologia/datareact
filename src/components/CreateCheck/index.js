import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

const CreateCheck = (props) => {
  const { valuesfield, setValuesfield } = props;
  const { refs } = props;

  const handleChangefield = (e, index) => {
    if (e.target.checked) {
      valuesfield[index] = props.valuechecked;
    } else {
      valuesfield[index] = props.valueunchecked;
    }
    setValuesfield([...valuesfield]);
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
          if (props.interval) {
            if (campo.includes('_2')) {
              campoFoco = props.name;
            } else {
              campoFoco = props.fields[props.index - 1].campo;
            }
          } else {
            campoFoco = props.fields[props.index - 1].campo;
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
          <Col>
            <input
              id={props.name}
              name={props.name}
              value={valuesfield[props.index]}
              onClick={(e) => handleChangefield(e, props.index)}
              type="checkbox"
              className="custom-control-input mx-2"
              defaultChecked={valuesfield[props.index] === props.valuechecked}
              onKeyDown={props.onkeydown !== undefined ? props.onkeydown : (event) => handleKeyDown(event, props.index)}
              disabled={props.disabled}
              readOnly={props.readonly}
              checked={valuesfield[props.index] === props.valuechecked}
              style={!props.required ? { backgroundColor: '#f4f7fa', fontSize: '13px' } : { backgroundColor: '#e2ecfa', fontSize: '13px' }}
              ref={(el) => {
                refs.current[props.index] = el; // Preenche as refs com os elementos
              }}
            ></input>
            <label className="custom-control-label" id={props.name} style={{ fontSize: '13px' }} htmlFor={props.name}>
              {props.title}
            </label>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default CreateCheck;
