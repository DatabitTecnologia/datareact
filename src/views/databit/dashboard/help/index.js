import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { CreateObject } from '../../../../components/CreateObject';

const DashboardHelp = (props) => {
  const { dashboard } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'HELP',
        funcao: 'Informações do Dashboard',
        tipo: 'text',
        nome: 'script',
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10',
        lines: 30,
        readonly: true
      }
    ]);
    valuesfield[0] = dashboard.obs;
    setValuesfield([...valuesfield]);
  }, []);

  return (
    <React.Fragment>
      <div id="frmhelp" name="frmhelp">
        <Row style={{ marginLeft: '1px', marginRight: '1px' }}>
          {fields.map((field, index) => (
            <CreateObject
              key={index}
              field={field}
              index={index}
              fields={fields}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              disabled={true}
            ></CreateObject>
          ))}
        </Row>
      </div>
    </React.Fragment>
  );
};
export default DashboardHelp;
