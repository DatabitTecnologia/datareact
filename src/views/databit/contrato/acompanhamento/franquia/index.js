import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';

const AcompanhamentoFranquia = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [fieldsfranquia, setFieldsfranquia] = React.useState([]);
  const [fieldsobs, setFieldsobs] = React.useState([]);
  const [fieldsadd, setFieldsadd] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const { contrato, setContrato } = props;

  useEffect(() => {
    setFieldsfranquia([
      {
        id: 0,
        campo: 'TB02111_FRANQTOTAL',
        funcao: 'Franquia TOTAL',
        tipo: 'int',
        nome: 'franqtotal',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        disabled: true,
        decimal: 0
      },
      {
        id: 1,
        campo: 'TB02260_VLRFRANQTOTAL',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrfranqtotal',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        decimal: 2
      },
      {
        id: 2,
        campo: 'TB02111_FRANQPB',
        funcao: 'Franquia A4 PB',
        tipo: 'int',
        nome: 'franqpb',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        disabled: true,
        decimal: 0
      },
      {
        id: 3,
        campo: 'TB02111_VLRNOTAPB',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrnotapb',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        decimal: 2
      },
      {
        id: 4,
        campo: 'TB02111_FRANQCOLOR',
        funcao: 'Franquia A4 COLOR',
        tipo: 'int',
        nome: 'franqcolor',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        disabled: true,
        decimal: 0
      },
      {
        id: 5,
        campo: 'TB02111_VLRNOTACL',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrnotacl',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        decimal: 2
      },
      {
        id: 6,
        campo: 'TB02111_FRANQDG',
        funcao: 'Franquia Digitalização',
        tipo: 'int',
        nome: 'franqdg',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        disabled: true,
        decimal: 0
      },
      {
        id: 7,
        campo: 'TB02111_VLRNOTADG',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrnotadg',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        decimal: 2
      },
      {
        id: 8,
        campo: 'TB02111_FRANQGF',
        funcao: 'Franquia A3 PB',
        tipo: 'int',
        nome: 'franqgf',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        disabled: true,
        decimal: 0
      },
      {
        id: 9,
        campo: 'TB02111_VLRNOTAGF',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrnotagf',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        decimal: 2
      },
      {
        id: 10,
        campo: 'TB02111_FRANQGFC',
        funcao: 'Franquia A3 COLOR',
        tipo: 'int',
        nome: 'franqgfc',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        disabled: true,
        decimal: 0
      },
      {
        id: 11,
        campo: 'TB02111_VLRNOTAGFC',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrnotagfc',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        decimal: 2
      }
    ]);

    setFieldsadd([
      {
        id: 12,
        campo: 'TB02111_TIPOCONTR',
        funcao: 'Tipo Contrato',
        tipo: 'varchar',
        nome: 'tipocontr',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 15,
        measure: '15rem',
        itens: 'Contrato de Locação,Contrato de Garantia,Contrato de Manutenção,Serviço Avulso',
        values: 'L,G,M,A',
        disabled: true
      },
      {
        id: 13,
        campo: 'TB02111_TIPOFRANQUIA',
        funcao: 'Tipo de Franquia',
        tipo: 'varchar',
        nome: 'tipofranquia',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 15,
        measure: '15rem',
        itens: 'Por Tonalidade,Global',
        values: 'T,G',
        disabled: true
      },
      {
        id: 14,
        campo: 'TB02111_ANALFRANQUIA',
        funcao: 'Analise de Franquia',
        tipo: 'varchar',
        nome: 'analfranquia',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 16,
        measure: '16rem',
        itens: 'Por Contrato (Total),Por Equipamento,Por Grupo,Compensatório,Compensatório por Grupo',
        values: 'T,M,G,E,W',
        disabled: true
      }
    ]);

    setFieldsobs([
      {
        id: 15,
        campo: 'TB02111_OBS',
        funcao: 'Observações',
        tipo: 'text',
        nome: 'obs',
        tipoobject: 6,
        widthfield: 11,
        measure: '11rem',
        disabled: true,
        lines: 15
      }
    ]);
  }, []);

  useEffect(() => {
    valuesfield[0] = contrato.franqtotal;
    valuesfield[1] = 0;
    valuesfield[2] = contrato.franqpb;
    valuesfield[3] = contrato.vlrnotapb;
    valuesfield[4] = contrato.franqcolor;
    valuesfield[5] = contrato.vlrnotacl;
    valuesfield[6] = contrato.franqdg;
    valuesfield[7] = contrato.vlrnotadg;
    valuesfield[8] = contrato.franqgf;
    valuesfield[9] = contrato.vlrnotagf;
    valuesfield[10] = contrato.franqgfc;
    valuesfield[11] = contrato.vlrnotagfc;
    valuesfield[12] = contrato.tipocontr;
    valuesfield[13] = contrato.tipofranquia;
    valuesfield[14] = contrato.analfranquia;
    valuesfield[15] = contrato.obs;
    setValuesfield([...valuesfield]);
  }, [contrato]);

  return (
    <React.Fragment>
      <div id="frmfranquia" name="frmfranquia">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col lg={5} style={{ marginLeft: '10px' }}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Informações de Franquia</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '15px', marginRight: '5px' }}>
                {fieldsfranquia.map((field, index) => (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fieldsfranquia}
                    valuesfield={valuesfield}
                    setValuesfield={(data) => setValuesfield(data)}
                    valuesfield2={valuesfield2}
                    setValuesfield2={(data) => setValuesfield2(data)}
                    disabled={true}
                  ></CreateObject>
                ))}
              </Row>
            </Card>
            <Card className="Recent-Users" style={{ marginTop: '-27px' }}>
              <Card.Header>
                <Card.Title as="h5">Informações Adicionais</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '15px', marginRight: '5px' }}>
                {fieldsadd.map((field, index) => (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fieldsadd}
                    valuesfield={valuesfield}
                    setValuesfield={(data) => setValuesfield(data)}
                    valuesfield2={valuesfield2}
                    setValuesfield2={(data) => setValuesfield2(data)}
                    disabled={true}
                  ></CreateObject>
                ))}
              </Row>
            </Card>
          </Col>
          <Col>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Observações</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
                {fieldsobs.map((field, index) => (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fieldsobs}
                    valuesfield={valuesfield}
                    setValuesfield={(data) => setValuesfield(data)}
                    valuesfield2={valuesfield2}
                    setValuesfield2={(data) => setValuesfield2(data)}
                    disabled={true}
                  ></CreateObject>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AcompanhamentoFranquia;
