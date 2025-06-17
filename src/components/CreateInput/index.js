import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const CreateInput = (props) => {
  const { valuesfield, setValuesfield } = props;
  const { valuesfield2, setValuesfield2 } = props;
  const { refs } = props;
  const [campoweb, setCampoweb] = React.useState(false);
  const [typepass, setTypepass] = React.useState(false);

  useEffect(() => {
    setCampoweb(props.name.includes('EMAIL') || props.name.includes('SITE')) || props.name.includes('SKYPE') || props.name.includes('MSN');
    setTypepass(props.ispassword);
  }, []);

  const handleChangefield = (e, index) => {
    if (props.charnormal === false || props.charnormal === undefined || props.charnormal === '0' || parseInt(props.charnormal) === 0) {
      if (campoweb) {
        valuesfield[index] = e.target.value;
      } else {
        valuesfield[index] = e.target.value.toUpperCase();
      }
    } else {
      valuesfield[index] = e.target.value;
    }
    setValuesfield([...valuesfield]);
  };

  const handleChangefield2 = (e, index) => {
    if (props.charnormal === false || props.charnormal === undefined || props.charnormal === '0' || parseInt(props.charnormal) === 0) {
      if (campoweb) {
        valuesfield2[index] = e.target.value;
      } else {
        valuesfield2[index] = e.target.value.toUpperCase();
      }
    } else {
      valuesfield2[index] = e.target.value;
    }
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
            <input
              id={props.name}
              name={props.name}
              type={typepass ? 'password' : 'text'}
              className="form-control"
              maxLength={props.size}
              value={valuesfield[props.index]}
              onChange={(e) => handleChangefield(e, props.index)}
              onKeyDown={props.onkeydown !== undefined ? props.onkeydown : (event) => handleKeyDown(event, props.index)}
              onBlur={props.methodBlur}
              ref={(el) => {
                refs.current[props.index] = el; // Preenche as refs com os elementos
              }}
              disabled={props.disabled}
              readOnly={props.readonly}
              style={!props.required ? { backgroundColor: '#f4f7fa' } : { backgroundColor: '#e2ecfa' }}
              autoComplete="off"
            ></input>
          </Col>
          {props.ispassword !== undefined && props.ispassword && props.viewpass ? (
            <Button
              id="btnSearch"
              style={{ marginTop: '30px' }}
              className="btn-icon"
              onClick={() => setTypepass(!typepass)}
              disabled={props.disabled}
            >
              {typepass ? <i className={'feather icon-eye'} /> : <i className={'feather icon-eye-off'} />}
            </Button>
          ) : (
            <></>
          )}

          {props.interval ? (
            <Col>
              <div style={{ marginLeft: '-14px' }}>
                <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
                  até :
                </p>
                <input
                  id={props.name + '_2'}
                  name={props.name + '_2'}
                  className="form-control"
                  maxLength={props.size}
                  value={valuesfield2[props.index]}
                  onChange={(e) => handleChangefield2(e, props.index)}
                  onKeyDown={props.onkeydown !== undefined ? props.onkeydown : (event) => handleKeyDown(event, props.index)}
                  onBlur={props.methodBlur}
                  disabled={props.disabled}
                  readOnly={props.readOnly}
                  autoComplete="off"
                ></input>
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

export default CreateInput;
