import React, { useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { apiDropdown } from '../../api/crudapi';

const CreateSelect = (props) => {
  const { valuesfield, setValuesfield } = props;
  const { valuesfield2, setValuesfield2 } = props;
  const { refs } = props;

  const [optionsselect, setOptionsselect] = React.useState([]);
  const { filteraux, setFilteraux } = props;

  useEffect(() => {
    if (props.tabelaref !== undefined) {
      if (optionsselect.length === 0) {
        apiDropdown(props.tabelaref, props.fieldvalue, props.fieldlist, filteraux).then((response) => {
          if (response.status === 200) {
            setOptionsselect(response.data);
          }
        });
      }
    } else {
      setOptionsselect(props.options);
    }
  }, []);

  useEffect(() => {
    if (props.tabelaref === undefined) {
      if (props.valuesoption !== undefined && props.valuesoption.length > 0) {
        if (
          valuesfield[props.index] === '' ||
          valuesfield[props.index] === undefined ||
          valuesfield[props.index] === null ||
          !props.valuesoption.includes(String(valuesfield[props.index]))
        ) {
          valuesfield[props.index] = props.valuesoption[0];
          setValuesfield([...valuesfield]);
        }
      }
    }
  }, [valuesfield[props.index]]);

  useEffect(() => {
    if (
      props.tabelaref !== undefined &&
      (valuesfield[props.index] === '' || valuesfield[props.index] === undefined || valuesfield[props.index] === null)
    ) {
      apiDropdown(props.tabelaref, props.fieldvalue, props.fieldlist, filteraux).then((response) => {
        if (response.status === 200) {
          setOptionsselect(response.data);
          if (props.firstdefault) {
            try {
              valuesfield[props.index] = response.data[0].value;
              setValuesfield([...valuesfield]);
            } catch (error) {
              valuesfield[props.index] = '';
              setValuesfield([...valuesfield]);
            }
          }
        }
      });
    }
  }, [filteraux]);

  const handleChangefield = (e, index) => {
    if (e.target.value !== undefined && !props.disabled) {
      valuesfield[index] = e.target.value;
      setValuesfield([...valuesfield]);
      if (valuesfield2) {
        valuesfield2[index] = e.target.options[e.target.selectedIndex].text;
        setValuesfield2([...valuesfield2]);
      }
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
          <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
            {props.title} :
          </p>
          <Col>
            <div>
              <div>
                <Form.Select
                  id={props.name}
                  name={props.name}
                  style={
                    !props.required
                      ? { backgroundColor: '#f4f7fa', fontSize: '14px', height: '44px' }
                      : { backgroundColor: '#e2ecfa', fontSize: '14px', height: '44px' }
                  }
                  value={valuesfield[props.index]}
                  onChange={(e) => handleChangefield(e, props.index)}
                  onClick={(e) => handleChangefield(e, props.index)}
                  onKeyDown={props.onkeydown !== undefined ? props.onkeydown : (event) => handleKeyDown(event, props.index)}
                  disabled={props.disabled}
                  ref={(el) => {
                    refs.current[props.index] = el; // Preenche as refs com os elementos
                  }}
                >
                  {props.tabelaref !== undefined && !props.firstdefault ? (
                    <option className="form-control" value={''} key={-1}></option>
                  ) : (
                    <></>
                  )}
                  {optionsselect !== undefined && optionsselect.length > 0 ? (
                    optionsselect.map((option, index) => {
                      return (
                        <option className="form-control" value={option.value} key={index}>
                          {option.label}
                        </option>
                      );
                    })
                  ) : (
                    <option className="form-control" value={''} key={-1}></option>
                  )}
                </Form.Select>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default CreateSelect;
