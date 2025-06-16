import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { Row, Col, Button } from 'react-bootstrap';
import { CreateObject } from '../../../../components/CreateObject';
import { apiUpdate } from '../../../../api/crudapi';

const CampanhaUpdateWhats = (props) => {
  const { itemselec, setItemselec, tabcampanha, showupdwhats, setShowupdwhats, fieldwhats, classcampanha, table } = props;
  const [fields, setFields] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'WHATSAPP',
        funcao: 'Defina o novo WhatsAPP',
        tipo: 'varchar',
        nome: 'whatsapp',
        tamanho: 11,
        tipoobject: 8,
        widthfield: 11,
        measure: '11rem',
        tipomascara: 5
      }
    ]);
    valuesfield[0] = itemselec.whatsapp;
    setValuesfield([...valuesfield]);
  }, []);

  const Salvar = () => {
    itemselec.whatsapp = valuesfield[0];
    setItemselec(itemselec);
    setCarregando(true);
    let campofim = fieldwhats.replace(tabcampanha + '_', '');
    campofim = campofim.toLowerCase();
    let item = {};
    item['codigo'] = itemselec.codigo;
    item[campofim] = valuesfield[0];
    if (tabcampanha === 'TB00012') {
      item['tipo'] = '01';
      item['tabela'] = table;
    }
    apiUpdate(classcampanha, item).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setShowupdwhats(false);
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frmupdatewhats" name="frmupdatewhats" style={{ textAlign: 'center' }}>
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', textAlign: 'center' }}>
          {fields.map((field, index) => (
            <CreateObject
              key={index}
              field={field}
              index={field.id}
              fields={fields}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesfield2={valuesfield2}
              setValuesfield2={(data) => setValuesfield2(data)}
              disabled={false}
            ></CreateObject>
          ))}
        </Row>
      </div>
      <hr></hr>
      <Row style={{ textAlign: 'right' }}>
        <Col>
          <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={() => Salvar()}>
            <i className={'feather icon-save'} /> Salvar
          </Button>
          <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={() => setShowupdwhats(false)}>
            <i className={'feather icon-x'} />
            Cancelar
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default CampanhaUpdateWhats;
