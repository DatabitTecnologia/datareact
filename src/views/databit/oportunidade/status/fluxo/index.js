import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiFind, apiUpdate, apiInsert, apiDocument } from '../../../../../api/crudapi';
import { Decode64 } from '../../../../../utils/crypto';
import Email from '../../../email';
import StatusInvite from '../invite';

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
  const [rating, setRating] = useState(3);
  const [altrating, setAltrating] = useState(false);
  const [showinvite, setShowinvite] = useState(false);
  const [sendinvite, setSendinvite] = useState(false);

  useEffect(() => {
    setValuesdisable([true, false, false, false, false]);
    setCarregando(true);
    apiFind('Oportunidade', '*', '', "TB02255_CODIGO = '" + props.oportunidade + "' ").then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setItemselec(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (itemselec !== undefined && itemselec !== null) {
      setRating(itemselec.chance);
      valuesfield[0] = itemselec.status;
      let previsao = itemselec.previsao;
      if (previsao !== undefined) {
        const dt1 = previsao.substring(3, 5) + '/' + previsao.substring(0, 2) + '/' + previsao.substring(6, 10);
        const datafim = new Date(dt1);
        valuesfield[2] = datafim;
      }
      valuesfield[3] = itemselec.hora;
      setValuesfield([...valuesfield]);

      let admin = Decode64(sessionStorage.getItem('admin')) === 'S';
      let master = Decode64(sessionStorage.getItem('master')) === 'S';
      let manager = Decode64(sessionStorage.getItem('manager')) === 'S';

      let filterstatus =
        " AND (TB01129_CODIGO IN ( SELECT TB01130_STATUSFIM FROM TB01130 WHERE TB01130_STATUS = '" + valuesfield[0] + "') ";
      if (!admin && !master && !manager) {
        filterstatus =
          filterstatus +
          " AND TB01129_CODIGO IN ( SELECT TB01131_STATUS FROM TB01131 WHERE TB01131_USER = '" +
          Decode64(sessionStorage.getItem('user')) +
          "') ";
      }
      filterstatus = filterstatus + " ) or (TB01129_CODIGO = '" + valuesfield[0] + "')";

      setFields([
        {
          id: 0,
          campo: 'TB02255_STATUS',
          funcao: 'Status Atual',
          tipo: 'varchar',
          nome: 'statusatual',
          tipoobject: 2,
          tamanho: 2,
          widthfield: 49,
          measure: '49rem',
          tabelaref: 'TB01129',
          widthname: 38,
          disabled: valuesdisable[0]
        },
        {
          id: 1,
          campo: 'TB02255_STATUS2',
          funcao: 'Novo Status',
          tipo: 'varchar',
          nome: 'statusnovo',
          tipoobject: 2,
          tamanho: 2,
          widthfield: 49,
          measure: '49rem',
          tabelaref: 'TB01129',
          widthname: 38,
          disabled: valuesdisable[1],
          filteraux: filterstatus
        },
        {
          id: 2,
          campo: 'TB02255_PREVISAO',
          funcao: 'Nova Previsão',
          tipo: 'datetime',
          nome: 'previsao',
          tipoobject: 5,
          tamanho: 10,
          widthfield: 10,
          measure: '10rem',
          disabled: valuesdisable[2]
        },
        {
          id: 3,
          campo: 'TB02255_HORA',
          funcao: 'Hora',
          tipo: 'varchar',
          nome: 'Hora',
          tipoobject: 8,
          tamanho: 6,
          widthfield: 6,
          measure: '6rem',
          disabled: valuesdisable[3],
          tipomascara: 7
        },
        {
          id: 4,
          campo: 'TB02255_OBS',
          funcao: 'Observações',
          tipo: 'text',
          nome: 'obs',
          tipoobject: 6,
          tamanho: 10,
          widthfield: 10,
          measure: '10rem',
          disabled: valuesdisable[4],
          lines: 6
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
      switch (itemselec.tipo) {
        case 0: {
          setCarregando(true);
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
          break;
        }
        case 1: {
          setCarregando(true);
          apiFind(
            'Endereco',
            'TB00012_CODIGO,TB00012_EMAIL',
            '',
            "TB00012_CODIGO = '" + itemselec.codprospect + "' AND TB00012_TABELA = 'TB01127' AND TB00012_TIPO = '01' "
          ).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              setEmail(response.data.email);
            }
          });
          break;
        }
      }
    }
  }, [itemselec]);

  useEffect(() => {
    const status = valuesfield[1];
    apiFind('OportunidadeStatus', 'TB01129_CODIGO,TB01129_RATING,TB01129_INVITE', '', "TB01129_CODIGO = '" + status + "' ").then(
      (response) => {
        if (response.status === 200) {
          setAltrating(response.data.rating === 'S');
          setSendinvite(response.data.invite === 'S');
        }
      }
    );
  }, [valuesfield[1]]);

  const Salvar = () => {
    if (document.getElementById('TB02255_STATUS2').value === undefined || document.getElementById('TB02255_STATUS2').value === '') {
      setItemvariant(1);
      setMensagem('Campo Novo Status é preenchimento obrigatório !');
      document.getElementById('TB02255_STATUS2').focus();
    } else {
      try {
        let item = {};
        if (valuesfield[3] === undefined || valuesfield[3] === '' || valuesfield[3] === null) {
          valuesfield[3] = '08:00';
        }
        item['codigo'] = itemselec.codigo;
        item['status'] = valuesfield[1];
        const tmdata1 = Date.parse(valuesfield[2]);
        const dt1 = new Date(tmdata1);
        const data1 = dt1.toLocaleDateString('en-US');
        item['previsao'] = data1 + ' 00:00:00';
        item['hora'] = valuesfield[3];
        item['user'] = Decode64(sessionStorage.getItem('user'));
        item['chance'] = rating;
        setCarregando(true);
        apiUpdate('Oportunidade', item).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              if (props.cabecalho !== undefined) {
                props.cabecalho[props.valuesname.indexOf('status')] = valuesfield[1];
                props.cabecalho2[props.valuesname.indexOf('status')] = valuesfield2[1];
                props.cabecalho[props.valuesname.indexOf('previsao')] = valuesfield[2];
                props.cabecalho[props.valuesname.indexOf('hora')] = valuesfield[3];
                props.setCabecalho([...props.cabecalho]);
                props.setCabecalho2([...props.cabecalho2]);
              }
              item['obs'] = valuesfield[4];
              item['previsao'] = data1 + ' ' + valuesfield[3] + ':00';
              apiInsert('OportunidadeHistorico', item).then((response) => {
                if (response.status === 200) {
                  const tipo = itemselec.tipoop;
                  const status = valuesfield[1];
                  apiFind('OportunidadeStatus', 'TB01129_CODIGO,TB01129_PROPOSTA', '', "TB01129_CODIGO = '" + status + "' ").then(
                    (response) => {
                      if (response.status === 200) {
                        const proposta = response.data.proposta;
                        if (proposta === 0) {
                          setCarregando(false);
                          if (sendinvite) {
                            setShowinvite(true);
                          } else {
                            handleClosefluxo();
                          }
                        } else {
                          apiFind('OportunidadeTipo', 'TB01132_CODIGO,TB01132_MODELO', '', "TB01132_CODIGO = '" + tipo + "' ").then(
                            (response) => {
                              if (response.status === 200) {
                                const modelo = response.data.modelo;
                                if (modelo === undefined || modelo === null || modelo === '') {
                                  setCarregando(false);
                                  if (sendinvite) {
                                    setShowinvite(true);
                                  } else {
                                    handleClosefluxo();
                                  }
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

  const handleCloseinvite = () => {
    setShowinvite(false);
    props.setShowfluxo(false);
  };

  function getRating(rating) {
    switch (rating) {
      case 1:
        return 'Muito Baixa';
      case 2:
        return 'Baixa';
      case 3:
        return 'Média';
      case 4:
        return 'Alta';
      case 5:
        return 'Muito Alta';
      default:
        return 'None';
    }
  }

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
        {altrating ? (
          <div style={{ textAlign: 'center' }}>
            <Box
              sx={{
                '& > legend': { mt: 1 }
              }}
            >
              <Typography component="legend">Chance de Fechamento</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                size="large"
                sx={{
                  fontSize: '4rem'
                }}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              <Typography component="legend">{getRating(rating)}</Typography>
              <hr></hr>
            </Box>
          </div>
        ) : (
          <></>
        )}

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
                  modulo="DataClient - Criação de Oportunidade"
                  filesdefault={filesdefault}
                  subjectdefault={subjectdefault}
                  bodydefault={bodydefault}
                  sendauto={false}
                ></Email>
              </ModalBody>
            </Modal>
            <Modal backdrop="static" size="lg" show={showinvite} centered={true} onHide={handleCloseinvite}>
              <Modal.Header className="h5" closeButton>
                <i className={'feather icon-calendar h1'} />
                &nbsp;Envio de Invite
              </Modal.Header>
              <ModalBody>
                <StatusInvite
                  movimento={itemselec.codigo}
                  data={valuesfield[2]}
                  hora={valuesfield[3]}
                  showinvite={showinvite}
                  setShowinvite={(data) => setShowinvite(data)}
                  showfluxo={props.showfluxo}
                  setShowfluxo={(data) => props.setShowfluxo(data)}
                ></StatusInvite>
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
