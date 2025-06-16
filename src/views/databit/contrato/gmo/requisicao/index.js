import React, { useEffect } from 'react';
import { Row, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiFind } from '../../../../../api/crudapi';
import { CreateObject } from '../../../../../components/CreateObject';

const GmoRequisicao = (props) => {
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
        funcao: 'Requisição',
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
        campo: 'DTREQ',
        funcao: 'Data',
        tipo: 'datetime',
        nome: 'dtreq',
        tipoobject: 1,
        tamanho: 8,
        widthfield: 8,
        measure: '8rem',
        disabled: true
      },
      {
        id: 2,
        campo: 'DTEXEC',
        funcao: 'Execução',
        tipo: 'datetime',
        nome: 'dtexec',
        tipoobject: 1,
        tamanho: 8,
        widthfield: 8,
        measure: '8rem',
        disabled: true
      },
      {
        id: 3,
        campo: 'NUMORC',
        funcao: 'Orçamento',
        tipo: 'varchar',
        nome: 'numorc',
        tamanho: 8,
        tipoobject: 1,
        widthfield: 8,
        measure: '8rem',
        disabled: true
      },
      {
        id: 4,
        campo: 'CODCLI',
        funcao: 'Cliente',
        tipo: 'varchar',
        nome: 'codcli',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 34,
        measure: '34rem',
        tabelaref: 'TB01008',
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
        campo: 'VEND',
        funcao: 'Vendedor',
        tipo: 'varchar',
        nome: 'vend',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 33,
        measure: '33rem',
        tabelaref: 'TB01006',
        widthname: 24,
        disabled: true
      },
      {
        id: 7,
        campo: 'TIPODESC',
        funcao: 'Operação',
        tipo: 'varchar',
        nome: 'tipodesc',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01021',
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
        tabelaref: 'TB01014',
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
        tabelaref: 'TB01021',
        widthname: 24,
        disabled: true
      },
      {
        id: 11,
        campo: 'DTENTREGA',
        funcao: 'Entrega',
        tipo: 'datetime',
        nome: 'dtentrega',
        tipoobject: 1,
        tamanho: 8,
        widthfield: 8,
        measure: '8rem',
        disabled: true
      },
      {
        id: 12,
        campo: 'RECEBIDO',
        funcao: 'Recebido por',
        tipo: 'datetime',
        nome: 'recebido',
        tipoobject: 1,
        tamanho: 50,
        widthfield: 20,
        measure: '20rem',
        disabled: true
      },
      {
        id: 13,
        campo: 'MOTORISTA',
        funcao: 'Motorista',
        tipo: 'varchar',
        nome: 'motorista',
        tamanho: 50,
        tipoobject: 1,
        widthfield: 37,
        measure: '37rem',
        disabled: true
      },
      {
        id: 15,
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
    apiFind('GmoReqVW', '*', '', "CODIGO = '" + itemselec.numreq + "' and TIPO = " + tipoop).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setReq(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (req !== undefined) {
      valuesfield[0] = req.codigo;
      valuesfield[1] = req.data;
      valuesfield[2] = req.dataexec;
      valuesfield[3] = req.numorc;
      valuesfield[4] = req.codcli;
      valuesfield[5] = req.codemp;
      valuesfield[6] = req.vend;
      valuesfield[7] = req.tipodesc;
      valuesfield[8] = req.condpag;
      valuesfield[9] = req.natureza;
      valuesfield[10] = req.status;
      valuesfield[11] = req.dtentrega;
      valuesfield[12] = req.recebido;
      valuesfield[13] = req.motorista;
      valuesfield[14] = req.obs;
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

export default GmoRequisicao;
