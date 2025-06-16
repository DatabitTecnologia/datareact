import React, { useEffect, useState } from 'react';
import { Col, Button, Modal, ModalBody, Row } from 'react-bootstrap';
import Browse from '../Browse';
import { getClass } from '../../api/apiconnect';

const CreateMult = (props) => {
  const { valuesfield, setValuesfield, valuesfield2, setValuesfield2 } = props;
  const { refs } = props;
  const [itemselec, setItemselec] = React.useState([]);
  const [fieldsbrowse, setFieldsbrowse] = React.useState('');
  const [codigos, setCodigos] = React.useState();
  const [nomes, setNomes] = React.useState();
  const [nameclass, setNameclass] = React.useState('');
  const [title, setTitle] = React.useState('');

  const [showbrowse, setShowbrowse] = useState(false);
  const handleClosebrowse = () => setShowbrowse(true);

  useEffect(() => {
    let tabelas = "'TB01001', 'TB01007', 'TB01008', 'TB01009', 'TB01017'";
    if (tabelas.includes(props.table)) {
      setFieldsbrowse(props.table + '_CODIGO,' + props.table + '_NOME,' + props.table + '_CPF,' + props.table + '_CNPJ');
    } else {
      setFieldsbrowse(props.table + '_CODIGO,' + props.table + '_NOME');
    }
    getClass(props.table).then((response) => {
      if (response.status === 200) {
        setNameclass(response.data[0].name);
        setTitle(response.data[0].title);
      }
    });
  }, []);

  useEffect(() => {
    valuesfield[props.index] = codigos;
    setValuesfield([...valuesfield]);
    valuesfield2[props.index] = nomes;
    setValuesfield2([...valuesfield2]);
  }, [codigos, showbrowse]);

  const limpar = () => {
    setCodigos('TODOS');
    setNomes('TODOS');
  };

  return (
    <React.Fragment>
      <div style={{ width: '100%', padding: '5px 5px 5px 5px' }}>
        <Row style={{ marginLeft: '1px' }}>
          <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
            {props.title} :
          </p>
          <Col sm={12} lg={2} style={{ marginBottom: '10px' }}>
            <Row>
              <Button
                id="btnSelecoes"
                className="btn btn-primary shadow-2 mb-2"
                onClick={() => setShowbrowse(true)}
                disabled={props.disabled}
              >
                <i className={'feather icon-list'} /> Abrir seleções
              </Button>
              <Modal backdrop="static" size="xl" show={showbrowse} centered={true} onHide={handleClosebrowse}>
                <Modal.Header className="h5" closeButton>
                  <i className={'feather icon-list h1'} />
                  &nbsp;Tela de seleção
                </Modal.Header>
                <Modal.Body>
                  <Browse
                    object={props.table}
                    table={props.table}
                    fields={fieldsbrowse}
                    classobject={nameclass}
                    tipo="2"
                    setShowbrowse={(data) => setShowbrowse(data)}
                    setItemselec={(data) => setItemselec(data)}
                    setCodigos={(data) => setCodigos(data)}
                    setNomes={(data) => setNomes(data)}
                  ></Browse>
                </Modal.Body>
              </Modal>
              <Button
                id="btnLimpar"
                style={{ marginTop: '12px' }}
                className="btn btn-primary shadow-2 mb-2"
                onClick={() => limpar()}
                disabled={props.disabled}
              >
                <i className={'feather icon-x'} /> Limpar seleções
              </Button>
            </Row>
          </Col>

          <Col sm={12} lg={10} style={{ marginBottom: '10px' }}>
            <textarea
              rows="4"
              id={props.name + '_nome'}
              name={props.name + '_nome'}
              className="form-control"
              value={valuesfield2[props.index]}
              ref={(el) => {
                refs.current[props.index] = el; // Preenche as refs com os elementos
              }}
              readOnly
            ></textarea>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default CreateMult;
