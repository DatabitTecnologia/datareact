import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { CreateObject } from '../../../../../components/CreateObject';
import { Decode64 } from '../../../../../utils/crypto';

const InforUser = () => {
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB00035_EMAIL',
        funcao: 'E-Mail',
        tipo: 'varchar',
        nome: 'empresa',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 48,
        measure: '48rem',
        charnormal: true
      },
      {
        id: 1,
        campo: 'TB00035_EMPRESA',
        funcao: 'Empresa',
        tipo: 'varchar',
        nome: 'empresa',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 48,
        measure: '48rem',
        charnormal: true
      },
      {
        id: 2,
        campo: 'TB00035_FONE',
        funcao: 'Telefone',
        tipo: 'varchar',
        nome: 'fone',
        tamanho: 8000,
        tipoobject: 8,
        widthfield: 14,
        measure: '13.7rem',
        charnormal: true,
        tipomascara: 4
      },
      {
        id: 3,
        campo: 'TB00035_WHATSAPP',
        funcao: 'WhatsApp',
        tipo: 'varchar',
        nome: 'whatsapp',
        tamanho: 8000,
        tipoobject: 8,
        widthfield: 14,
        measure: '13.8rem',
        charnormal: true,
        tipomascara: 5
      }
    ]);
    valuesfield[0] = Decode64(sessionStorage.getItem('email'));
    valuesfield[1] = Decode64(sessionStorage.getItem('nameenterprise'));
    valuesfield[2] = Decode64(sessionStorage.getItem('fone'));
    valuesfield[3] = Decode64(sessionStorage.getItem('whatsuser'));
    setValuesfield([...valuesfield]);
  }, []);

  return (
    <React.Fragment>
      <div id="frmuser" name="frmuser">
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
      </div>
    </React.Fragment>
  );
};

export default InforUser;
