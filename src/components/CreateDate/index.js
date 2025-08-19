import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateDate = (props) => {
  const { valuesfield, setValuesfield } = props;
  const { valuesfield2, setValuesfield2 } = props;
  const { refs } = props;

  useEffect(() => {}, [valuesfield[props.index]]);

  const handleChangefield = (date, index) => {
    valuesfield[index] = date;
    setValuesfield([...valuesfield]);
  };

  const handleChangefield2 = (date, index) => {
    valuesfield2[index] = date;
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
            <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
              {props.title} :
            </p>
            <DatePicker
              id={props.name}
              name={props.name}
              className="form-control"
              value={valuesfield[props.index]}
              onChange={(date) => handleChangefield(date, props.index)}
              onBlur={props.methodBlur}
              selected={valuesfield[props.index]}
              placeholderText="DD/MM/AAAA"
              dateFormat="dd/MM/yyyy"
              locale="en"
              onKeyDown={props.onkeydown !== undefined ? props.onkeydown : (event) => handleKeyDown(event, props.index)}
              disabled={props.disabled}
              readOnly={props.readonly}
              style={!props.required ? { backgroundColor: '#f4f7fa' } : { backgroundColor: '#e2ecfa' }}
              popperClassName="custom-datepicker-popper"
              ref={(el) => {
                refs.current[props.index] = el; // Preenche as refs com os elementos
              }}
            ></DatePicker>
          </Col>
          {props.interval ? (
            <Col>
              <div style={{ marginLeft: '-14px' }}>
                <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
                  até :
                </p>
                <DatePicker
                  id={props.name + '_2'}
                  name={props.name + '_2'}
                  className="form-control"
                  value={valuesfield2[props.index]}
                  onChange={(date) => handleChangefield2(date, props.index)}
                  onBlur={props.methodBlur}
                  selected={valuesfield2[props.index]}
                  placeholderText="DD/MM/AAAA"
                  dateFormat="dd/MM/yyyy"
                  onKeyDown={props.onkeydown !== undefined ? props.onkeydown : (event) => handleKeyDown(event, props.index)}
                  disabled={props.disabled}
                  readOnly={props.readonly}
                  popperClassName="custom-datepicker-popper"
                ></DatePicker>
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

export default CreateDate;
