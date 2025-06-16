import React, { useEffect } from 'react';
import { Row, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiFind } from '../../../../../api/crudapi';
import { CreateObject } from '../../../../../components/CreateObject';

const GmoRetirada = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const { itemselec, setItemselc, tipoop } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [req, setReq] = React.useState([]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'CODIGO',
        funcao: 'Código',
        tipo: 'varchar',
        nome: 'codigo',
        tamanho: 6,
        tipoobject: 1,
        widthfield: 14,
        measure: '7rem',
        disabled: true
      },
      {
        id: 1,
        campo: 'DATA',
        funcao: 'Data',
        tipo: 'datetime',
        nome: 'data',
        tipoobject: 1,
        tamanho: 8,
        widthfield: 8,
        measure: '8rem',
        disabled: true
      },
      {
        id: 2,
        campo: 'DTENTRADA',
        funcao: 'Entrada',
        tipo: 'datetime',
        nome: 'dtentrada',
        tipoobject: 1,
        tamanho: 8,
        widthfield: 8,
        measure: '8rem',
        disabled: true
      },
      {
        id: 3,
        campo: 'CODPRE',
        funcao: 'Pedido',
        tipo: 'varchar',
        nome: 'codpre',
        tamanho: 8,
        tipoobject: 1,
        widthfield: 8,
        measure: '8rem',
        disabled: true
      },
      {
        id: 4,
        campo: 'CODFOR',
        funcao: 'Fornecedor',
        tipo: 'varchar',
        nome: 'codfor',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 34,
        measure: '34rem',
        tabelaref: 'TB01001',
        widthname: 25,
        disabled: true
      },
      {
        id: 5,
        campo: 'CODEMP',
        funcao: 'Empresa',
        tipo: 'varchar',
        nome: 'codemp',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01007',
        widthname: 23,
        disabled: true
      },
      {
        id: 6,
        campo: 'TRANSP',
        funcao: 'Trabsportadora',
        tipo: 'varchar',
        nome: 'transp',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 33,
        measure: '33rem',
        tabelaref: 'TB01009',
        widthname: 24,
        disabled: true
      },
      {
        id: 7,
        campo: 'OPCOM',
        funcao: 'Operação',
        tipo: 'varchar',
        nome: 'opcom',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01078',
        widthname: 23,
        disabled: true
      },
      {
        id: 8,
        campo: 'CONDPAG',
        funcao: 'Condição',
        tipo: 'varchar',
        nome: 'condpag',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 33,
        measure: '33rem',
        tabelaref: 'TB01012',
        widthname: 24,
        disabled: true
      },
      {
        id: 9,
        campo: 'CFOP',
        funcao: 'CFOP',
        tipo: 'varchar',
        nome: 'cfop',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01011',
        widthname: 23,
        disabled: true
      },
      {
        id: 10,
        campo: 'STATUS',
        funcao: 'Status',
        tipo: 'varchar',
        nome: 'status',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 33,
        measure: '33rem',
        tabelaref: 'TB01039',
        widthname: 24,
        disabled: true
      },
      {
        id: 11,
        campo: 'OBS',
        funcao: 'Observações',
        tipo: 'text',
        nome: 'obs',
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        disabled: true,
        lines: 4
      }
    ]);
    setCarregando(true);
    console.log(tipoop);
    apiFind('GmoComVW', '*', '', "CODIGO = '" + itemselec.numreq + "' and TIPO = " + tipoop).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        console.log(response.data);
        setReq(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (req !== undefined) {
      valuesfield[0] = req.codigo;
      valuesfield[1] = req.data;
      valuesfield[2] = req.dtentrada;
      valuesfield[3] = req.codpre;
      valuesfield[4] = req.codfor;
      valuesfield[5] = req.codemp;
      valuesfield[6] = req.transp;
      valuesfield[7] = req.opcom;
      valuesfield[8] = req.condpag;
      valuesfield[9] = req.natureza;
      valuesfield[10] = req.status;
      valuesfield[11] = req.obs;
      setValuesfield([...valuesfield]);
    }
  }, [req]);

  return (
    <React.Fragment>
      <div id="frmreq" name="frmreq">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginBottom: '5px' }}>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Informações</Card.Title>
              </Card.Header>
              <div style={{ textAlign: 'center' }}>
                <Row style={{ marginLeft: '5px', marginRight: '5px', textAlign: 'center' }}>
                  {fields.map((field) => (
                    <CreateObject
                      key={field.id}
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
            </Card>
          </Row>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default GmoRetirada;
