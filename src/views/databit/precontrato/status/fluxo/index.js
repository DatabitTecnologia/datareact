import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiFind, apiUpdate, apiInsert, apiDocument } from '../../../../../api/crudapi';
import { Decode64 } from '../../../../../utils/crypto';
import Email from '../../../email';

const StatusFluxo = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [itemselec, setItemselec] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [showemail, setShowemail] = useState(false);
  const [email, setEmail] = React.useState();
  const [filesdefault, setFilesdefault] = React.useState([]);
  const [subjectdefault, setSubjectdefault] = React.useState();
  const [bodydefault, setBodydefault] = React.useState();

  useEffect(() => {
    setValuesdisable([true, false, false]);
    setCarregando(true);
    apiFind('Precontrato', '*', '', "TB02264_CODIGO = '" + props.precontrato + "' ").then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setItemselec(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (itemselec !== undefined && itemselec !== null) {
      valuesfield[0] = itemselec.status;
      setValuesfield([...valuesfield]);
      let admin = Decode64(sessionStorage.getItem('admin')) === 'S';
      let master = Decode64(sessionStorage.getItem('master')) === 'S';
      let manager = Decode64(sessionStorage.getItem('manager')) === 'S';

      let filterstatus =
        " AND (TB01136_CODIGO IN ( SELECT TB01137_STATUSFIM FROM TB01137 WHERE TB01137_STATUS = '" + valuesfield[0] + "') ";
      if (!admin && !master && !manager) {
        filterstatus =
          filterstatus +
          " AND TB01136_CODIGO IN ( SELECT TB01139_STATUS FROM TB01139 WHERE TB01139_USER = '" +
          Decode64(sessionStorage.getItem('user')) +
          "') ";
      }
      filterstatus = filterstatus + " ) or (TB01136_CODIGO = '" + valuesfield[0] + "')";

      setFields([
        {
          id: 0,
          campo: 'TB02264_STATUS',
          funcao: 'Status Atual',
          tipo: 'varchar',
          nome: 'statusatual',
          tipoobject: 2,
          tamanho: 2,
          widthfield: 49,
          measure: '49rem',
          tabelaref: 'TB01136',
          widthname: 38,
          disabled: valuesdisable[0]
        },
        {
          id: 1,
          campo: 'TB02264_STATUS2',
          funcao: 'Novo Status',
          tipo: 'varchar',
          nome: 'statusnovo',
          tipoobject: 2,
          tamanho: 2,
          widthfield: 49,
          measure: '49rem',
          tabelaref: 'TB01136',
          widthname: 38,
          disabled: valuesdisable[1],
          filteraux: filterstatus
        },
        {
          id: 2,
          campo: 'TB02264_OBS',
          funcao: 'Observações',
          tipo: 'text',
          nome: 'obs',
          tipoobject: 6,
          tamanho: 10,
          widthfield: 10,
          measure: '10rem',
          disabled: valuesdisable[2],
          lines: 8
        }
      ]);
    }
    setCarregando(true);
    if (itemselec.contato !== undefined && itemselec.contato !== '' && itemselec.contato !== null) {
      apiFind('Contato', 'TB01128_CODIGO,TB01128_EMAIL', '', "TB01128_CODIGO = '" + itemselec.contato + "' ").then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          setEmail(response.data.email);
        }
      });
    } else {
      apiFind(
        'Endereco',
        'TB00012_CODIGO,TB00012_EMAIL',
        '',
        "TB00012_CODIGO = '" + itemselec.codcli + "' AND TB00012_TABELA = 'TB01008' AND TB00012_TIPO = '01' "
      ).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          setEmail(response.data.email);
        }
      });
    }
  }, [itemselec]);

  const Salvar = () => {
    if (document.getElementById('TB02264_STATUS2').value === undefined || document.getElementById('TB02264_STATUS2').value === '') {
      setItemvariant(1);
      setMensagem('Campo Novo Status é preenchimento obrigatório !');
      document.getElementById('TB02264_STATUS2').focus();
    } else {
      try {
        let item = {};
        item['codigo'] = itemselec.codigo;
        item['status'] = valuesfield[1];
        item['user'] = Decode64(sessionStorage.getItem('user'));
        setCarregando(true);
        apiUpdate('Precontrato', item).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              if (props.cabecalho !== undefined) {
                props.cabecalho[props.valuesname.indexOf('status')] = valuesfield[1];
                props.cabecalho2[props.valuesname.indexOf('status')] = valuesfield2[1];
                props.setCabecalho([...props.cabecalho]);
                props.setCabecalho2([...props.cabecalho2]);
              }
              item['obs'] = valuesfield[2];
              apiInsert('PrecontratoHistorico', item).then((response) => {
                if (response.status === 200) {
                  const tipo = itemselec.tipopre;
                  const status = valuesfield[1];
                  apiFind('PrecontratoStatus', 'TB01136_CODIGO,TB01136_PROPOSTA', '', "TB01136_CODIGO = '" + status + "' ").then(
                    (response) => {
                      if (response.status === 200) {
                        const proposta = response.data.proposta;
                        if (proposta === 0) {
                          setCarregando(false);
                          handleClosefluxo();
                        } else {
                          apiFind('PrecontratoTipo', 'TB01138_CODIGO,TB01138_MODELO', '', "TB01138_CODIGO = '" + tipo + "' ").then(
                            (response) => {
                              if (response.status === 200) {
                                const modelo = response.data.modelo;
                                if (modelo === undefined || modelo === null || modelo === '') {
                                  setCarregando(false);
                                  handleClosefluxo();
                                } else {
                                  apiDocument(modelo, itemselec.codigo).then((response) => {
                                    if (response.status === 200) {
                                      setCarregando(false);
                                      let listarq = [];
                                      let arquivo = {};
                                      arquivo['nome'] = response.data.arquivo;
                                      arquivo['ext'] = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                                      arquivo['tamanho'] = response.data.tamanho;
                                      arquivo['base64'] = response.data.base64;
                                      listarq = listarq.concat(arquivo);
                                      setFilesdefault([...listarq]);
                                      setSubjectdefault(response.data.titulo);
                                      setBodydefault(response.data.mensagem);
                                      setShowemail(true);
                                    }
                                  });
                                }
                              }
                            }
                          );
                        }
                      }
                    }
                  );
                }
              });
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          }
        });
      } catch (error) {
        setCarregando(false);
        setItemvariant(-1);
        setMensagem(error);
      }
    }
  };

  const handleClosefluxo = () => {
    props.setShowfluxo(false);
  };

  const handleCloseemail = () => {
    setShowemail(false);
    props.setShowfluxo(false);
  };

  return (
    <React.Fragment>
      <div id="frmfluxo" name="frmfluxo">
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
              disabled={valuesdisable[field.id]}
            ></CreateObject>
          ))}
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col style={{ textAlign: 'rigth' }}>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={() => Salvar()}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Modal backdrop="static" size="xl" show={showemail} centered={true} onHide={handleCloseemail}>
              <Modal.Header className="h5" closeButton>
                <i className={'feather icon-mail h1'} />
                &nbsp;Envio de E-Mail
              </Modal.Header>
              <ModalBody>
                <Email
                  tabela="TB02255"
                  movimento={itemselec.codigo}
                  showemail={showemail}
                  emails={email}
                  setShowemail={(data) => setShowemail(data)}
                  modulo="DataClient - Criação de Pré-Contrato"
                  filesdefault={filesdefault}
                  subjectdefault={subjectdefault}
                  bodydefault={bodydefault}
                  sendauto={false}
                ></Email>
              </ModalBody>
            </Modal>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={() => handleClosefluxo()}>
              <i className={'feather icon-x'} />
              Cancelar
            </Button>
          </Col>
        </Row>
        <Row>
          <Alert
            show={mensagem !== '' && mensagem !== undefined}
            dismissible
            variant={alertVariants[itemvariant]}
            onClick={() => setMensagem(undefined)}
          >
            {mensagem}
          </Alert>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default StatusFluxo;
