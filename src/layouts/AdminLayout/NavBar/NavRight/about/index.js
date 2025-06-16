import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { CreateObject } from '../../../../../components/CreateObject';
import { Decode64 } from '../../../../../utils/crypto';
import { version } from 'jszip';

const InforAbout = () => {
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB00035_NOME',
        funcao: 'Nome do Sistema',
        tipo: 'varchar',
        nome: 'nome',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 48,
        measure: '48rem',
        charnormal: true
      },
      {
        id: 1,
        campo: 'TB00035_VERSAO',
        funcao: 'Número da Versão',
        tipo: 'varchar',
        nome: 'versao',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 14,
        measure: '13.7rem',
        charnormal: true
      },
      {
        id: 2,
        campo: 'TB00035_DATA',
        funcao: 'Data e hora da geração',
        tipo: 'varchar',
        nome: 'data',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 14,
        measure: '14.8rem',
        charnormal: true
      }
    ]);

    valuesfield[0] = 'Sistema ' + Decode64(sessionStorage.getItem('namesystem')) + ' for DATABIT';
    valuesfield[1] = Decode64(sessionStorage.getItem('version'));
    valuesfield[2] = Decode64(sessionStorage.getItem('dateversion'));
    setValuesfield([...valuesfield]);
  }, []);

  return (
    <React.Fragment>
      <div id="frmabout" name="armabout">
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '15px' }}>
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
              disabled={true}
            ></CreateObject>
          ))}
        </Row>
        <hr></hr>
        <Row style={{ marginBottom: '10px', textAlign: 'center' }}>
          <div className="site-databit">
            <a className="fa-xs" href="https://www.databit.com.br/" target="blank">
              Copyright © 2024 by DataBit Tecnologia e Sistemas LTDA. All rights reserved
            </a>
          </div>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default InforAbout;
