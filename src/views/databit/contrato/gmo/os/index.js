import React, { useEffect } from 'react';
import { Row, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiFind } from '../../../../../api/crudapi';
import { CreateObject } from '../../../../../components/CreateObject';

const GmoOs = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const { itemselec, setItemselc } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [os, setOs] = React.useState([]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB02115_CODIGO',
        funcao: 'Nº Os',
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
        campo: 'TB02115_DATA',
        funcao: 'Abetura',
        tipo: 'datetime',
        nome: 'data',
        tipoobject: 1,
        tamanho: 13,
        widthfield: 13,
        measure: '13rem',
        disabled: true
      },
      {
        id: 2,
        campo: 'TB02115_DTFECHA',
        funcao: 'Fechamento',
        tipo: 'datetime',
        nome: 'dtfecha',
        tipoobject: 1,
        tamanho: 13,
        widthfield: 13,
        measure: '13rem',
        disabled: true
      },
      {
        id: 3,
        campo: 'TB02115_CODCLI',
        funcao: 'Cliente',
        tipo: 'varchar',
        nome: 'codcli',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01008',
        widthname: 23,
        disabled: true
      },
      {
        id: 4,
        campo: 'TB02115_CODEMP',
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
        id: 5,
        campo: 'TB02115_SERIAL',
        funcao: 'Serial',
        tipo: 'varchar',
        nome: 'serial',
        tamanho: 12,
        tipoobject: 1,
        widthfield: 12,
        measure: '12rem',
        disabled: true
      },
      {
        id: 6,
        campo: 'TB02112_PAT',
        funcao: 'PAT',
        tipo: 'varchar',
        nome: 'pat',
        tamanho: 12,
        tipoobject: 1,
        widthfield: 11,
        measure: '11rem',
        disabled: true
      },
      {
        id: 7,
        campo: 'TB02115_CONTRATO',
        funcao: 'Contrato',
        tipo: 'varchar',
        nome: 'contrato',
        tamanho: 12,
        tipoobject: 1,
        widthfield: 10,
        measure: '10rem',
        disabled: true
      },
      {
        id: 8,
        campo: 'TB02115_PRODUTO',
        funcao: 'Modelo',
        tipo: 'varchar',
        nome: 'produto',
        tipoobject: 2,
        tamanho: 5,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01010',
        widthname: 23,
        disabled: true
      },
      {
        id: 9,
        campo: 'TB02115_CODTEC',
        funcao: 'Técnico',
        tipo: 'varchar',
        nome: 'codtec',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 33,
        measure: '33rem',
        tabelaref: 'TB01024',
        widthname: 24,
        disabled: true
      },
      {
        id: 10,
        campo: 'TB02115_STATUS',
        funcao: 'Status',
        tipo: 'varchar',
        nome: 'status',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01073',
        widthname: 23,
        disabled: true
      },
      {
        id: 11,
        campo: 'TB02122_CONDICAO',
        funcao: 'Condição Final',
        tipo: 'varchar',
        nome: 'condicao',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 33,
        measure: '33rem',
        tabelaref: 'TB01055',
        widthname: 24,
        disabled: true
      },
      {
        id: 12,
        campo: 'TB02122_LAUDO',
        funcao: 'Laudo',
        tipo: 'text',
        nome: 'obs',
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        disabled: true,
        lines: 8
      }
    ]);
    setCarregando(true);
    apiFind(
      'OsVW',
      'TB02115_CODIGO,TB02115_DATA,TB02115_DTFECHA,TB02115_CODCLI,TB02115_CODEMP,TB02115_NUMSERIE,TB02115_CONTRATO,TB02115_PRODUTO,TB02115_CODTEC,TB02115_STATUS',
      'tb02122_condicao as condicao,tb02112_pat as pat,tb02122_obs as obs',
      "TB02115_CODIGO = '" + itemselec.numos + "' "
    ).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setOs(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (os !== undefined) {
      valuesfield[0] = os.codigo;
      valuesfield[1] = os.data;
      valuesfield[2] = os.dtfecha;
      valuesfield[3] = os.codcli;
      valuesfield[4] = os.codemp;
      valuesfield[5] = os.numserie;
      valuesfield[6] = os.pat;
      valuesfield[7] = os.contrato;
      valuesfield[8] = os.produto;
      valuesfield[9] = os.codtec;
      valuesfield[10] = os.status;
      valuesfield[11] = os.condicao;
      valuesfield[12] = os.obs;
      setValuesfield([...valuesfield]);
    }
  }, [os]);

  return (
    <React.Fragment>
      <div id="frmos" name="frmos">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginBottom: '5px' }}>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Informações</Card.Title>
              </Card.Header>
              <div>
                <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
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

export default GmoOs;
