import React from 'react';
import { Row, Col, Button, Modal, ModalBody, ModalFooter, Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import InputMask from 'react-input-mask';
import { validarCPF } from '../../utils/cpf';
import { validarCNPJ } from '../../utils/cnpj';
import { useToasts } from 'react-toast-notifications';
import ConsultaCNPJ from '../../views/databit/cnpj';

const CreateInputMask = (props) => {
  const { valuesfield, setValuesfield } = props;
  const { valuesfield2, setValuesfield2 } = props;
  const { valuesname, setValuesname } = props;
  const { refs } = props;
  const [mascara, setMascara] = React.useState();
  const { addToast } = useToasts();
  const [largura, setLargura] = React.useState(props.measure);
  const [showcons, setShowcons] = React.useState(false);
  const [cnpj, setCnpj] = React.useState('');

  useEffect(() => {
    setLargura(props.measure);
    switch (props.typemask) {
      case 1: {
        // CPF
        setMascara('999.999.999-99');
        setLargura(props.size - 1 + 'rem');
        break;
      }
      case 2: {
        // CNPJ
        setMascara('99.999.999/9999-99');
        setLargura(props.size + 0 + 'rem');
        break;
      }
      case 3: {
        // CEP
        setMascara('99.999-999');

        break;
      }
      case 4: {
        // Telefone fixo
        setMascara('(99) 9999-9999');

        break;
      }
      case 5: {
        // Celular e WhatsAPP
        setMascara('(99) 99999-9999');

        break;
      }
      case 6: {
        // Plano de Contas
        setMascara('9.9.99.99.99.9999');
        break;
      }
      case 7: {
        // Hora
        setMascara('99:99');
        break;
      }
      case 8: {
        // Outro
        setMascara(props.mask);
        break;
      }
      case 9: {
        // CNPJ sem validação
        setMascara('99.999.999/9999-99');
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (mascara !== undefined && mascara !== '' && mascara !== null) {
      try {
        document.getElementById(props.name).mask = mascara;
      } catch (error) {
        console.log(error);
      }
    }
  }, [mascara]);

  const handleChangefield = (e, index) => {
    if (props.typemask !== 7 && props.typemask !== 8) {
      valuesfield[index] = justNumbers(e.target.value);
      const valor = valuesfield[index];
      switch (props.typemask) {
        case 1: {
          // CPF
          if (valor.length === 11) {
            if (!validarCPF(valor)) {
              valuesfield[index] = '';
              addToast('CPF ' + valor + ' Inválido', {
                placement: 'bottom-rigth',
                appearance: 'error',
                autoDismiss: true
              });
            }
          }
          break;
        }
        case 9:
        case 2: {
          // CNPJ
          setCnpj(valor);
          if (valor.length === 14) {
            if (!validarCNPJ(valor)) {
              valuesfield[index] = '';
              addToast('CNPJ ' + valor + '  Inválido', {
                placement: 'bottom-rigth',
                appearance: 'error',
                autoDismiss: true
              });
            }
          }
          break;
        }
      }
    } else {
      valuesfield[index] = e.target.value;
    }
    setValuesfield([...valuesfield]);
  };

  const handleChangefield2 = (e, index) => {
    if (props.typemask !== 7 && props.typemask !== 8) {
      valuesfield2[index] = justNumbers(e.target.value);
      const valor = valuesfield2[index];
      switch (props.typemask) {
        case 1: {
          // CPF
          if (valor.length === 11) {
            if (!validarCPF(valor)) {
              valuesfield2[index] = '';
              addToast('CPF ' + valor + ' Inválido', {
                placement: 'bottom-rigth',
                appearance: 'error',
                autoDismiss: true
              });
            }
          }
          break;
        }
        case 9:
        case 2: {
          // CNPJ
          if (valor.length === 14) {
            if (!validarCNPJ(valor)) {
              valuesfield2[index] = '';
              addToast('CNPJ ' + valor + '  Inválido', {
                placement: 'bottom-rigth',
                appearance: 'error',
                autoDismiss: true
              });
            }
          }

          break;
        }
      }
    } else {
      valuesfield2[index] = e.target.value;
    }
    setValuesfield2([...valuesfield2]);
  };

  function justNumbers(text) {
    if (text !== '' && text !== undefined) {
      var numbers = text.replace(/[^0-9]/g, '');
      return numbers;
    } else {
      return '';
    }
  }

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

  const handleClosecons = () => {
    setShowcons(false);
  };

  return (
    <React.Fragment>
      <div style={{ width: largura, padding: '5px 5px 5px 5px' }}>
        <Row>
          <Col>
            <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
              {props.title} :
            </p>
            <Col>
              <InputMask
                id={props.name}
                name={props.name}
                className="form-control"
                value={valuesfield[props.index]}
                onChange={(e) => handleChangefield(e, props.index)}
                onBlur={props.methodBlur}
                mask={mascara}
                ref={(el) => {
                  refs.current[props.index] = el; // Preenche as refs com os elementos
                }}
                onKeyDown={props.onkeydown !== undefined ? props.onkeydown : (event) => handleKeyDown(event, props.index)}
                disabled={props.disabled}
                readOnly={props.readonly}
                style={!props.required ? { backgroundColor: '#f4f7fa' } : { backgroundColor: '#e2ecfa' }}
                autoComplete="off"
              ></InputMask>
            </Col>
          </Col>
          {props.typemask === 2 && !props.interval ? (
            <Button
              id="btnSearch"
              style={{ marginTop: '22px', marginLeft: '-9px' }}
              className="btn-icon"
              disabled={props.disabled}
              onClick={(e) => setShowcons(true)}
            >
              <i className={'feather icon-search'} />
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
                <InputMask
                  id={props.name + '_2'}
                  name={props.name + '_2'}
                  className="form-control"
                  value={valuesfield2[props.index]}
                  onChange={(e) => handleChangefield2(e, props.index)}
                  onBlur={props.methodBlur}
                  mask={mascara}
                  onKeyDown={props.onkeydown !== undefined ? props.onkeydown : (event) => handleKeyDown(event, props.index)}
                  disabled={props.disabled}
                  readOnly={props.readonly}
                  autoComplete="off"
                ></InputMask>
              </div>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </div>
      <Modal backdrop="static" size="xl" show={showcons} centered={true} onHide={handleClosecons}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-search h1'} />
          &nbsp;Consulta de CNPJ : {valuesfield[props.index]}
        </Modal.Header>
        <ModalBody>
          <ConsultaCNPJ
            cnpjselec={valuesfield[props.index]}
            setCnpjselec={(data) => setCnpj(data)}
            valuesfield={valuesfield}
            setValuesfield={(data) => setValuesfield(data)}
            valuesname={valuesname}
            setValuesname={(data) => setValuesname(data)}
            showcons={showcons}
            setShowcons={(data) => setShowcons(data)}
          ></ConsultaCNPJ>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CreateInputMask;
