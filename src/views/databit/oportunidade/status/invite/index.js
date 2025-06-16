import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiInvite, apiSendEmail } from '../../../../../api/apiemail';
import { Decode64 } from '../../../../../utils/crypto';

import { apiInsert, apiSetFile, apiExec } from '../../../../../api/crudapi';

const StatusInvite = (props) => {
  const { data, hora, movimento, showinvite, setShowinvite, showfluxo, setShowfluxo } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB00111_DEST',
        funcao: 'Destinatário(s)',
        tipo: 'varchar',
        nome: 'dest',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 48,
        measure: '48rem',
        charnormal: true,
        lines: 3
      },
      {
        id: 1,
        campo: 'TB00111_SUBJECT',
        funcao: 'Assunto',
        tipo: 'varchar',
        nome: 'subject',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 48,
        measure: '48rem',
        charnormal: true
      },

      {
        id: 2,
        campo: 'TB00111_LOCALIZACAO',
        funcao: 'Localização',
        tipo: 'varchar',
        nome: 'subject',
        tamanho: 8000,
        tipoobject: 6,
        widthfield: 41,
        measure: '41rem',
        charnormal: true,
        lines: 4
      },
      {
        id: 3,
        campo: 'TB00111_OBS',
        funcao: 'Observações',
        tipo: 'text',
        nome: 'body',
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        lines: 8
      },
      {
        id: 4,
        campo: 'TB00111_PREVISAO',
        funcao: 'Data',
        tipo: 'datetime',
        nome: 'previsao',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem'
      },
      {
        id: 5,
        campo: 'TB00111_HORA',
        funcao: 'Hora',
        tipo: 'varchar',
        nome: 'Hora',
        tipoobject: 8,
        tamanho: 6,
        widthfield: 6,
        measure: '6rem',
        tipomascara: 7
      }
    ]);
    valuesfield[0] = Decode64(sessionStorage.getItem('email'));
    valuesfield[4] = data;
    valuesfield[5] = hora;
    setValuesfield([...valuesfield]);
  }, []);

  const Enviar = () => {
    setCarregando(true);
    const tmdata1 = Date.parse(valuesfield[4]);
    const dt1 = new Date(tmdata1);
    const data1 = dt1.toLocaleDateString('en-US');
    apiInvite(valuesfield[0], valuesfield[1], valuesfield[2], valuesfield[3], data1, valuesfield[5]).then((response) => {
      console.log(response);
      if (response.status === 200) {
        let nomearquivo = response.data.arquivo;
        let extensao = 'text/calendar';
        let tamanho = response.data.tamanho;
        let base64 = response.data.base64;

        setCarregando(true);
        let itememail = {};
        itememail['email'] = Decode64(sessionStorage.getItem('from'));
        itememail['dest'] = valuesfield[0];
        itememail['subject'] = valuesfield[1];
        itememail['body'] = valuesfield[3];
        itememail['tabela'] = 'TB02255';
        itememail['mov'] = movimento;
        itememail['modulo'] = 'DataClient - Criação de Oportunidade';
        let codigo = '';
        let codigofile = '';
        apiInsert('Email', itememail).then((response) => {
          if (response.status === 200) {
            codigo = response.data.id;
            let files = [];
            let itemfile = {};
            itemfile['email'] = codigo;
            itemfile['arquivo'] = nomearquivo;
            itemfile['tipo'] = 1;
            itemfile['tamanho'] = tamanho;
            itemfile['ext'] = extensao;
            let itemfile2 = {};
            itemfile2['base64'] = base64;
            itemfile2['file'] = nomearquivo;
            files = files.concat(itemfile2);
            apiInsert('Attachment', itemfile).then((response) => {
              if (response.status === 200) {
                codigofile = response.data.id;
                apiSetFile('TB00112', 'TB00112_CODIGO', 'TB00112_BYTES', codigofile, base64).then((response) => {
                  if (response.status === 200) {
                    apiSendEmail(
                      Decode64(sessionStorage.getItem('enterprise')),
                      valuesfield[0],
                      valuesfield[1],
                      valuesfield[3],
                      files
                    ).then((response) => {
                      setCarregando(false);
                      if (response.status === 200) {
                        apiExec("UPDATE TB00111 SET TB00111_DTENV = GETDATE() WHERE TB00111_CODIGO = '" + codigo + "' ", 'N').then(
                          (response) => {
                            if (response.status === 200) {
                              setCarregando(false);
                              setShowinvite(false);
                              setShowfluxo(false);
                            }
                          }
                        );
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frminvite" name="frminvite">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
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
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button id="btnEnviar" className="btn btn-success shadow-2 mb-2" onClick={(e) => Enviar()}>
              <i className={'feather icon-mail'} /> Enviar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default StatusInvite;
