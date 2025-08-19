import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiFind } from '../../../../../api/crudapi';

const ProdutoConsultaObs = (props) => {
  const { produto } = props;
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const { optionselec } = props;
  const [fields, setFields] = React.useState([]);

  useEffect(() => {
    valuesfield[0] = '';
    setValuesfield([...valuesfield]);
    apiFind('Produto', 'TB01010_OBS,TB01010_OBSINT,TB01010_OBSNF', '', "TB01010_CODIGO = '" + produto + "' ").then((response) => {
      if (response.status === 200) {
        switch (optionselec) {
          case 0: {
            valuesfield[0] = response.data.obs;
            setValuesfield([...valuesfield]);
            setFields([
              {
                id: 0,
                campo: 'TB01010_OBS',
                funcao: 'Observações Normais',
                tipo: 'text',
                nome: 'obs',
                tipoobject: 6,
                tamanho: 10,
                widthfield: 10,
                measure: '10rem',
                disabled: true,
                lines: 11
              }
            ]);
            break;
          }
          case 1: {
            valuesfield[0] = response.data.obsint;
            setValuesfield([...valuesfield]);
            setFields([
              {
                id: 0,
                campo: 'TB01010_OBSINT',
                funcao: 'Observações Internas',
                tipo: 'text',
                nome: 'obsint',
                tipoobject: 6,
                tamanho: 10,
                widthfield: 10,
                measure: '10rem',
                disabled: true,
                lines: 11
              }
            ]);
            break;
          }
          case 2: {
            valuesfield[0] = response.data.obsnf;
            setValuesfield([...valuesfield]);
            setFields([
              {
                id: 0,
                campo: 'TB01010_OBSNF',
                funcao: 'Observações Nota Fiscal',
                tipo: 'text',
                nome: 'obsnf',
                tipoobject: 6,
                tamanho: 10,
                widthfield: 10,
                measure: '10rem',
                disabled: true,
                lines: 11
              }
            ]);
            break;
          }
        }
      }
    });
  }, [produto]);

  return (
    <React.Fragment>
      <div id="frmserial" name="frmserial">
        <Card className="Recent-Users">
          <Row>
            <Col>
              <Row style={{ marginTop: '5px', marginRight: '5px', marginLeft: '5px' }}>
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
            </Col>
          </Row>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default ProdutoConsultaObs;
