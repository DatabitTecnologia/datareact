import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { apiFind } from '../../api/crudapi';
import { useToasts } from 'react-toast-notifications';
import Browse from '../Browse';
import { getClass } from '../../api/apiconnect';
import { Decode64 } from '../../utils/crypto';

const CreateFind = (props) => {
  const { findOnly } = props;
  const { valuesfield, setValuesfield } = props;
  const { valuesfield2, setValuesfield2 } = props;
  const { refs } = props;
  const { addToast } = useToasts();
  const [carregando, setCarregando] = React.useState(false);
  const [itemselec, setItemselec] = React.useState([]);
  const [fieldsbrowse, setFieldsbrowse] = React.useState('');
  const [nameclass, setNameclass] = React.useState('');
  const [title, setTitle] = React.useState('aa');
  const [typeclass, setTypeclass] = React.useState([]);

  const [showbrowse, setShowbrowse] = useState(false);
  const handleClosebrowse = () => setShowbrowse(false);

  useEffect(() => {
    let tabelas = "'TB01001', 'TB01007', 'TB01008', 'TB01009', 'TB01017'";
    if (tabelas.includes(props.table)) {
      setFieldsbrowse(props.table + '_CODIGO,' + props.table + '_NOME,' + props.table + '_CPF,' + props.table + '_CNPJ');
    } else {
      setFieldsbrowse(props.table + '_CODIGO,' + props.table + '_NOME');
    }
    try {
      getClass(Decode64(sessionStorage.getItem('urlconnect')), props.table).then((response) => {
        if (response !== undefined) {
          if (response.status === 200) {
            try {
              setNameclass(response.data[0].name);
              setTitle(response.data[0].title);
              setTypeclass(response.data);
            } catch (error) {
              //console.log('Tabela : ' + props.table + ' ' + error);
            }
          }
        }
      });
    } catch (error) {
      //console.log(error + '' + nameclass);
    }
  }, []);

  useEffect(() => {
    let codigo = valuesfield[props.index];
    let nome = valuesfield2[props.index];
    if (codigo !== '' && codigo !== undefined && codigo !== null) {
      if (nome === '' || nome === undefined || nome === null) {
        try {
          getClass(Decode64(sessionStorage.getItem('urlconnect')), props.table).then((response) => {
            if (response !== undefined) {
              if (response.status === 200) {
                try {
                  setNameclass(response.data[0].name);
                  setTitle(response.data[0].title);
                  setTypeclass(response.data);
                  setCarregando(true);
                  apiFind(
                    response.data[0].name,
                    props.table + '_CODIGO,' + props.table + '_NOME',
                    '',
                    props.table + "_CODIGO = '" + codigo + "' "
                  ).then((response) => {
                    setCarregando(false);
                    if (response !== undefined) {
                      if (response.status === 200) {
                        if (response.data) {
                          nome = response.data.nome;
                          valuesfield2[props.index] = response.data.nome;
                          setValuesfield2([...valuesfield2]);
                        }
                      }
                    }
                  });
                } catch (error) {
                  //console.log('Tabela : ' + props.table + ' ' + error);
                }
              }
            }
          });
        } catch (error) {
          //console.log(error + '' + nameclass);
        }
      }
    }
  }, [valuesfield]);

  useEffect(() => {
    if (itemselec !== undefined) {
      valuesfield[props.index] = itemselec.codigo;
      setValuesfield([...valuesfield]);
      valuesfield2[props.index] = itemselec.nome;
      setValuesfield2([...valuesfield2]);
    }
  }, [itemselec]);

  const handleFind = (e, size) => {
    if (e.target.value !== '' && e.target.value !== undefined) {
      const texto = e.target.value;
      const textoformatado = texto.padStart(size, '0');
      e.target.value = textoformatado;
    }
    let codigo = e.target.value;
    let nome = '';
    let filteradd = '';
    if (props.filteraux !== undefined && props.filteraux !== '' && props.filteraux !== null) {
      filteradd = props.filteraux;
    }
    if (props.table === 'TB02176' && parseInt(sessionStorage.getItem('perfil')) === 1) {
      filteradd = filteradd + " and TB02176_CODIGO = '" + Decode64(sessionStorage.getItem('temple')) + "' ";
    }
    if (props.table === 'TB01008' && parseInt(sessionStorage.getItem('perfil')) === 2) {
      filteradd = filteradd + " and TB01008_CODIGO = '" + Decode64(sessionStorage.getItem('partner')) + "' ";
    }
    if (codigo !== '' && codigo != undefined && codigo != null) {
      setCarregando(true);
      apiFind(
        nameclass,
        props.table + '_CODIGO,' + props.table + '_NOME',
        '',
        props.table + "_CODIGO = '" + codigo + "' and " + props.table + "_SITUACAO = 'A' " + filteradd
      ).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          if (response.data) {
            apiFind(nameclass, props.table + '_CODIGO,' + props.table + '_NOME', '', props.table + "_CODIGO = '" + codigo + "' ").then(
              (response) => {
                if (response.status === 200) {
                  valuesfield[props.index] = codigo;
                  setValuesfield([...valuesfield]);
                  valuesfield2[props.index] = nome;
                  setValuesfield2([...valuesfield2]);
                }
              }
            );
          } else {
            addToast('Código ' + codigo + ' não encontrado !', {
              placement: 'bottom-rigth',
              appearance: 'warning',
              autoDismiss: true
            });

            valuesfield[props.index] = '';
            setValuesfield([...valuesfield]);
            valuesfield2[props.index] = '';
            setValuesfield2([...valuesfield2]);
            setShowbrowse(true);
          }
        }
      });
    } else {
      valuesfield[props.index] = '';
      setValuesfield([...valuesfield]);
      valuesfield2[props.index] = '';
      setValuesfield2([...valuesfield2]);
    }
  };

  const handleChangefield = (e, index) => {
    valuesfield[index] = e.target.value;
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
        <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
          {props.title} :
        </p>
        <Row>
          <Col style={{ width: '6rem' }}>
            <div name={props.name}>
              <input
                id={props.name}
                name={props.name}
                className="form-control"
                maxLength={props.size}
                value={valuesfield[props.index]}
                onChange={(e) => handleChangefield(e, props.index)}
                placeholder={props.placeholder}
                onBlur={(e) => handleFind(e, props.size, 1)}
                style={{ width: !findOnly || findOnly === undefined ? '6rem' : props.widthfield + 1 + 'rem' }}
                onKeyDown={props.onkeydown !== undefined ? props.onkeydown : (event) => handleKeyDown(event, props.index)}
                disabled={props.disabled}
                readOnly={props.readonly}
                autoComplete="off"
                ref={(el) => {
                  refs.current[props.index] = el; // Preenche as refs com os elementos
                }}
              ></input>
            </div>
          </Col>

          {!findOnly || findOnly === undefined ? (
            <Col style={{ width: props.widthname - 1 + 'rem', marginLeft: '0.3rem' }}>
              <div>
                <input
                  id={props.name + '_nome'}
                  name={props.name + '_nome'}
                  className="form-control"
                  value={valuesfield2[props.index]}
                  disabled
                  style={{ width: props.widthname - 1 + 'rem' }}
                  autoComplete="off"
                ></input>
              </div>
            </Col>
          ) : (
            <></>
          )}

          {!findOnly || findOnly === undefined ? (
            <Col style={{ width: '2rem', marginLeft: '5px' }}>
              <Button id="btnSearch" className="btn-icon" onClick={() => setShowbrowse(true)} disabled={props.disabled}>
                {carregando ? (
                  <div className="spinner-border spinner-border-sm mr-1" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <i className={'feather icon-search'} />
                )}
              </Button>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </div>
      <Modal backdrop="static" size="xl" show={showbrowse} centered={true} onHide={handleClosebrowse}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-search h1'} />
          &nbsp;Tela de pesquisa
        </Modal.Header>
        <Modal.Body>
          <Browse
            object={props.table}
            table={props.table}
            fields={fieldsbrowse}
            classobject={nameclass}
            filteraux={props.filteraux}
            tipo="1"
            itemselec={itemselec}
            setShowbrowse={(data) => setShowbrowse(data)}
            setItemselec={(data) => setItemselec(data)}
          ></Browse>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default CreateFind;
