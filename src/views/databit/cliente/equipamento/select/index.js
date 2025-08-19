import React, { useEffect, useState } from 'react';
import GoogleMap from 'google-map-react';
import { Row, Col, Button, Modal, ModalFooter, ModalBody, Alert, Card, Form } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiFind, apiGetPicture, apiInsert, apiUpdate, apiSetPicture } from '../../../../../api/crudapi';
import { CreateObject } from '../../../../../components/CreateObject';
import nopicture from '../../../../../assets/images/databit/nopicture.png';
import { getBase64 } from '../../../../../utils/crypto';
import { getCEP } from '../../../../../api/correios';
import Pointer from '../../../../../assets/images/databit/pointer_blue.png';
import { getZipCode } from '../../../../../api/location';
import { Decode64 } from '../../../../../utils/crypto';

const AnyReactComponent = ({ text }) => <img src={Pointer} alt="pointer" />;

const ClienteEquipamentoSelec = (props) => {
  const { itemselec, codcli } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [fieldsobs, setFieldsobs] = React.useState([]);
  const [fieldsaddress, setFieldsaddress] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [foto, setFoto] = React.useState();
  const [disabled, setDisabled] = React.useState(true);
  const [inclusao, setInclusao] = React.useState(false);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const { showselec, setShowselec } = props;
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [showfile, setShowfile] = useState(false);
  const [url, setUrl] = React.useState();
  const [img64, setImg64] = useState('');
  const [steps, setSteps] = React.useState([]);
  const [icons, setIcons] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [showmapa, setShowmapa] = React.useState(false);
  const [location, setLocation] = React.useState([]);

  const states = [
    { value: 'AC', label: 'Acre (AC)' },
    { value: 'AL', label: 'Alagoas (AL)' },
    { value: 'AP', label: 'Amapá (AP)' },
    { value: 'AM', label: 'Amazonas (AM)' },
    { value: 'BA', label: 'Bahia (BA)' },
    { value: 'CE', label: 'Ceará (CE)' },
    { value: 'DF', label: 'Distrito Federal (DF)' },
    { value: 'ES', label: 'Espírito Santo (ES)' },
    { value: 'GO', label: 'Goiás (GO)' },
    { value: 'MA', label: 'Maranhão (MA)' },
    { value: 'MT', label: 'Mato Grosso (MT)' },
    { value: 'MS', label: 'Mato Grosso do Sul (MS)' },
    { value: 'MG', label: 'Minas Gerais (MG)' },
    { value: 'PA', label: 'Pará (PA)' },
    { value: 'PB', label: 'Paraíba (PB)' },
    { value: 'PR', label: 'Paraná (PR)' },
    { value: 'PE', label: 'Pernambuco (PE)' },
    { value: 'PI', label: 'Piauí (PI)' },
    { value: 'RJ', label: 'Rio de Janeiro (RJ)' },
    { value: 'RN', label: 'Rio Grande do Norte (RN)' },
    { value: 'RS', label: 'Rio Grande do Sul (RS)' },
    { value: 'RO', label: 'Rondônia (RO)' },
    { value: 'RR', label: 'Roraima (RR)' },
    { value: 'SC', label: 'Santa Catarina (SC)' },
    { value: 'SP', label: 'São Paulo (SP)' },
    { value: 'SE', label: 'Sergipe (SE)' },
    { value: 'TO', label: 'Tocantins (TO)' }
  ];

  useEffect(() => {
    let tmpsteps = [];
    let tmpicons = [];
    let tmpoptions = [];
    // Cabeçalho
    tmpsteps.push('Observações');
    tmpicons.push('feather icon-file-text');
    tmpoptions.push(0);

    tmpsteps.push('Localização');
    tmpicons.push('feather icon-map');
    tmpoptions.push(1);

    setSteps(tmpsteps);
    setIcons(tmpicons);
    setOptions(tmpoptions);

    setFields([
      {
        id: 0,
        campo: 'equipamemto',
        funcao: 'Serial',
        tipo: 'varchar',
        nome: 'equipamemto',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 12,
        measure: '12rem',
        disabled: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'produto',
        funcao: 'Produto',
        tipo: 'varchar',
        nome: 'produto',
        tamanho: 5,
        tipoobject: 2,
        widthfield: 39,
        measure: '39rem',
        tabelaref: 'TB01010',
        widthname: 30,
        disabled: valuesdisable[0]
      },
      {
        id: 2,
        campo: 'referencia',
        funcao: 'Referência',
        tipo: 'varchar',
        nome: 'referencia',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 18,
        measure: '18rem',
        disabled: valuesdisable[2]
      },
      {
        id: 3,
        campo: 'codbarras',
        funcao: 'Código Barras',
        tipo: 'varchar',
        nome: 'codbarras',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 17,
        measure: '17rem',
        disabled: valuesdisable[3]
      },
      {
        id: 4,
        campo: 'codauxiliar',
        funcao: 'Código Auxiliar',
        tipo: 'varchar',
        nome: 'codauxiliar',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 16,
        measure: '16rem',
        disabled: valuesdisable[4]
      },
      {
        id: 5,
        campo: 'nomemarca',
        funcao: 'Marca',
        tipo: 'varchar',
        nome: 'marca',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[5]
      },
      {
        id: 6,
        campo: 'dtinstalacao',
        funcao: 'Data Instalação',
        tipo: 'varchar',
        nome: 'dtinstalacao',
        tamanho: 60,
        tipoobject: 5,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[6]
      },
      {
        id: 7,
        campo: 'dtvalidade',
        funcao: 'Data Validade',
        tipo: 'varchar',
        nome: 'dtvalidade',
        tamanho: 60,
        tipoobject: 5,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[7]
      },
      {
        id: 8,
        campo: 'pat',
        funcao: 'Nº Patrimônio',
        tipo: 'pat',
        nome: 'prazo',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[8]
      },
      {
        id: 23,
        campo: 'libleitura',
        funcao: 'Ler Medidores',
        tipo: 'varchar',
        nome: 'libleitura',
        tamanho: 20,
        tipoobject: 11,
        widthfield: 8,
        measure: '8rem',
        itens: 'Não,Sim',
        values: 'N,S',
        disabled: valuesdisable[23]
      }
    ]);

    setFieldsobs([
      {
        id: 9,
        campo: 'obs',
        funcao: 'Observações',
        tipo: 'text',
        nome: 'obs',
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        lines: 9,
        disabled: valuesdisable[9]
      }
    ]);

    setFieldsaddress([
      {
        id: 10,
        campo: 'cep',
        funcao: 'Cep',
        tipo: 'varchar',
        nome: 'campo',
        tamanho: 10,
        tipoobject: 8,
        widthfield: 10,
        measure: '8rem',
        disabled: valuesdisable[10],
        tipomascara: 3
      },
      {
        id: 11,
        campo: 'end',
        funcao: 'Logradouro',
        tipo: 'varchar',
        nome: 'end',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 27,
        measure: '27rem',
        disabled: valuesdisable[11]
      },
      {
        id: 12,
        campo: 'num',
        funcao: 'Nº',
        tipo: 'int',
        nome: 'num',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[12]
      },
      {
        id: 13,
        campo: 'comp',
        funcao: 'Compl.',
        tipo: 'varchar',
        nome: 'num',
        tamanho: 10,
        tipoobject: 1,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[13]
      },
      {
        id: 14,
        campo: 'bairro',
        funcao: 'Bairro',
        tipo: 'varchar',
        nome: 'bairro',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 15,
        measure: '15rem',
        disabled: valuesdisable[14]
      },
      {
        id: 15,
        campo: 'cidade',
        funcao: 'Cidade',
        tipo: 'varchar',
        nome: 'cidade',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 18,
        measure: '18rem',
        disabled: valuesdisable[15]
      },
      {
        id: 16,
        campo: 'estado',
        funcao: 'Estado',
        tipo: 'varchar',
        nome: 'estado',
        tamanho: 2,
        tipoobject: 11,
        widthfield: 14,
        measure: '14rem',
        options: states,
        disabled: valuesdisable[16]
      },

      {
        id: 17,
        campo: 'fone',
        funcao: 'Fone',
        tipo: 'varchar',
        nome: 'fone',
        tamanho: 10,
        tipoobject: 8,
        widthfield: 12,
        measure: '12rem',
        disabled: valuesdisable[17],
        tipomascara: 4
      },
      {
        id: 18,
        campo: 'foneaux',
        funcao: 'Fone 2',
        tipo: 'varchar',
        nome: 'foneaux',
        tamanho: 10,
        tipoobject: 8,
        widthfield: 12,
        measure: '12rem',
        disabled: valuesdisable[18],
        tipomascara: 4
      },
      {
        id: 19,
        campo: 'whatsapp',
        funcao: 'WhatsAPP',
        tipo: 'varchar',
        nome: 'fax',
        tamanho: 10,
        tipoobject: 8,
        widthfield: 12,
        measure: '12rem',
        disabled: valuesdisable[19],
        tipomascara: 5
      },
      {
        id: 20,
        campo: 'contato',
        funcao: 'Contato',
        tipo: 'varchar',
        nome: 'contato',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 15,
        measure: '15.5rem',
        disabled: valuesdisable[20]
      },
      {
        id: 21,
        campo: 'email',
        funcao: 'Email',
        tipo: 'varchar',
        nome: 'email',
        tamanho: 200,
        tipoobject: 1,
        widthfield: 24,
        measure: '24rem',
        disabled: valuesdisable[21],
        charnormal: true
      },
      {
        id: 22,
        campo: 'local',
        funcao: 'Local de Instalação',
        tipo: 'varchar',
        nome: 'local',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 15,
        measure: '15.5rem',
        disabled: valuesdisable[22]
      }
    ]);
  }, []);

  useEffect(() => {
    if (itemselec === undefined) {
      setInclusao(true);
      setDisabled(false);
      setValuesdisable([
        false,
        false,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]);
    } else {
      setInclusao(false);
      setValuesdisable([
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true
      ]);
      valuesfield[0] = itemselec.equipamento;
      valuesfield[1] = itemselec.produto;
      if (itemselec.dtinstalacao !== undefined && itemselec.dtinstalacao !== null) {
        const dt1 =
          itemselec.dtinstalacao.substring(3, 5) +
          '/' +
          itemselec.dtinstalacao.substring(0, 2) +
          '/' +
          itemselec.dtinstalacao.substring(6, 10);
        const datafim = new Date(dt1);
        valuesfield[6] = datafim;
      }
      if (itemselec.dtvalidade !== undefined && itemselec.dtvalidade !== null) {
        const dt1 =
          itemselec.dtvalidade.substring(3, 5) + '/' + itemselec.dtvalidade.substring(0, 2) + '/' + itemselec.dtvalidade.substring(6, 10);
        const datafim = new Date(dt1);
        valuesfield[7] = datafim;
      }
      valuesfield[8] = itemselec.pat;
      valuesfield[9] = itemselec.obs;
      valuesfield[10] = itemselec.cep;
      valuesfield[11] = itemselec.logradouro;
      valuesfield[12] = itemselec.num;
      valuesfield[13] = itemselec.comp;
      valuesfield[14] = itemselec.bairro;
      valuesfield[15] = itemselec.cidade;
      valuesfield[16] = itemselec.estado;
      valuesfield[17] = itemselec.fone;
      valuesfield[18] = itemselec.foneaux;
      valuesfield[19] = itemselec.whatsapp;
      valuesfield[20] = itemselec.contato;
      valuesfield[21] = itemselec.email;
      valuesfield[22] = itemselec.local;
      valuesfield[23] = itemselec.libleitura;
      setValuesfield([...valuesfield]);
    }
  }, [itemselec]);

  useEffect(() => {
    if (valuesfield[1] !== undefined) {
      const codprod = valuesfield[1];
      if (codprod.length === 5) {
        setCarregando(true);
        apiFind(
          'Produto',
          'TB01010_REFERENCIA,TB01010_CODBARRAS,TB01010_CODAUXILIAR,TB01010_MARCA',
          '',
          "TB01010_CODIGO = '" + codprod + "' "
        ).then((response) => {
          if (response.status === 200) {
            valuesfield[2] = response.data.referencia;
            valuesfield[3] = response.data.codbarras;
            valuesfield[4] = response.data.codauxiliar;
            const codmarca = response.data.marca;
            apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', codprod).then((response) => {
              setFoto(response.data[0].picture);
              apiFind('Marca', 'TB01047_NOME', '', "TB01047_CODIGO = '" + codmarca + "' ").then((response) => {
                if (response.status === 200) {
                  valuesfield[5] = response.data.nome;
                  setValuesfield([...valuesfield]);
                  setCarregando(false);
                }
              });
            });
          }
        });
      }
    }
  }, [valuesfield[1]]);

  useEffect(() => {
    if (!disabled) {
      let valor = valuesfield[10];
      if (valor !== undefined && valor !== '' && valor !== null) {
        if (valor.length === 8) {
          setCarregando(true);
          getCEP(valor).then((response) => {
            if (response.status === 200) {
              try {
                valuesfield[11] = response.data.logradouro.toUpperCase().substring(0, 60);
                valuesfield[14] = response.data.bairro.toUpperCase().substring(0, 30);
                valuesfield[15] = response.data.localidade.toUpperCase().substring(0, 30);
                valuesfield[16] = response.data.uf.toUpperCase();
              } catch (error) {
                setItemvariant(1);
                setMensagem('Endereço não encontrado !');
              }
              setCarregando(false);
            }
          });
        }
      }
    }
  }, [valuesfield[10]]);

  const Editar = () => {
    setInclusao(false);
    setDisabled(false);
    setValuesdisable([
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);
  };

  const Salvar = () => {
    if (valuesfield[0] === undefined || valuesfield[0] === '' || valuesfield[0] === null) {
      setItemvariant(1);
      setMensagem('Campo SERIAL é preenchimento obrigatório !');
    } else if (valuesfield[1] === undefined || valuesfield[1] === '' || valuesfield[1] === null) {
      setItemvariant(1);
      setMensagem('Campo PRODUTO é preenchimento obrigatório !');
    } else {
      let item = {};
      item['codcli'] = codcli;
      item['equipamento'] = valuesfield[0];
      item['produto'] = valuesfield[1];
      if (valuesfield[6] !== undefined) {
        const tmdata1 = Date.parse(valuesfield[6]);
        const dt1 = new Date(tmdata1);
        const data1 = dt1.toLocaleDateString('en-US');
        item['dtinstalacao'] = data1 + ' 00:00:00';
      }
      if (valuesfield[7] !== undefined) {
        const tmdata1 = Date.parse(valuesfield[7]);
        const dt1 = new Date(tmdata1);
        const data1 = dt1.toLocaleDateString('en-US');
        item['dtvalidade'] = data1 + ' 00:00:00';
      }
      item['pat'] = valuesfield[8];
      item['obs'] = valuesfield[9];
      item['cep'] = valuesfield[10];
      item['end'] = valuesfield[11];
      item['num'] = valuesfield[12];
      item['comp'] = valuesfield[13];
      item['bairro'] = valuesfield[14];
      item['cidade'] = valuesfield[15];
      item['estado'] = valuesfield[16];
      item['fone'] = valuesfield[17];
      item['foneaux'] = valuesfield[18];
      item['whatsapp'] = valuesfield[19];
      item['contato'] = valuesfield[20];
      item['email'] = valuesfield[21];
      item['local'] = valuesfield[22];
      item['libleitura'] = valuesfield[23];
      setCarregando(true);
      if (inclusao) {
        apiInsert('ClienteEquipamento', item).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              setShowselec(false);
            }
          } else {
            setCarregando(false);
            setItemvariant(-1);
            setMensagem(response.data);
          }
        });
      } else {
        apiUpdate('ClienteEquipamento', item).then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            if (response.data.status === 1) {
              setShowselec(false);
            }
          } else {
            setCarregando(false);
            setItemvariant(-1);
            setMensagem(response.data);
          }
        });
      }
    }
  };

  const handleCloseShowFile = () => {
    setShowfile(false);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleClosemapa = () => {
    setShowmapa(false);
  };

  const salvarFoto = () => {
    setCarregando(true);
    apiSetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', valuesfield[0], img64).then((response) => {
      if (response.status === 200) {
        apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', valuesfield[0]).then((response) => {
          setFoto(response.data[0].picture);
          setCarregando(false);
          setShowfile(false);
        });
      }
    });
  };

  const Mapa = () => {
    getZipCode(valuesfield[10]).then((response) => {
      if (response.status === 200) {
        try {
          let tmplocation = response.data.results[0].geometry.location;
          let locationfim = [];
          tmplocation['name'] = valuesfield[11];
          locationfim = locationfim.concat(tmplocation);
          setLocation(locationfim);
          setShowmapa(true);
        } catch (error) {
          setLocation([]);
          setItemvariant(1);
          setMensagem('Não foi possível buscar as coordenadas deste Endereço !');
        }
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frmClienteEquipamentoselec" name="frmClienteEquipamentoselec">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Informações do Produto selecionado</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '5px' }}>
              <Col lg={2}>
                <Row style={{ width: '100%', textAlign: 'center' }}>
                  <Col>
                    {foto === undefined || foto === '' || foto === null ? (
                      <img src={nopicture} alt="foto" width={'230px'} height={'230px'} onDoubleClick={(e) => setShowfile(true)} />
                    ) : (
                      <img
                        src={`data:image/jpeg;base64,${foto}`}
                        alt="foto"
                        width={'230px'}
                        height={'230px'}
                        onDoubleClick={(e) => setShowfile(true)}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row style={{ marginLeft: '65px', marginRight: '5px', marginBottom: '3px' }}>
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
              </Col>
            </Row>
          </Card>
        </Row>
        <Row style={{ textAlign: 'center', marginTop: '1px', marginBottom: '1px' }}>
          <Row>
            {steps !== undefined && steps.length > 0 ? (
              <Col>
                {steps.map((label, index) => (
                  <Button
                    key={index}
                    className={index === activeStep ? 'btn btn-success shadow-2 mb-3' : 'btn btn-primary shadow-2 mb-3'}
                    onClick={handleStep(options[index])}
                  >
                    <i className={icons[index]} /> {label}
                  </Button>
                ))}
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </Row>
        {activeStep === 0 ? (
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Observações do Equipamento</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '5px', marginLeft: '5px', marginRight: '5px' }}>
              {fieldsobs.map((field, index) => (
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
          </Card>
        ) : (
          <></>
        )}
        {activeStep === 1 ? (
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Localização do Equipamento</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '5px', marginLeft: '5px', marginRight: '5px' }}>
              {fieldsaddress.map((field, index) => (
                <CreateObject
                  key={index}
                  field={field}
                  index={field.id}
                  fields={fieldsaddress}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={valuesdisable[field.id]}
                ></CreateObject>
              ))}
              <Col style={{ marginTop: '28px' }}>
                <Button className="btn btn-success  mb-2" onClick={(e) => Mapa()}>
                  <i className={'feather icon-map'} />
                  Visualizar Mapa
                </Button>
              </Col>
            </Row>
          </Card>
        ) : (
          <></>
        )}
        <hr></hr>
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
        <Row style={{ textAlign: 'right', marginTop: '10px' }}>
          <Row style={{ textAlign: 'rigth' }}>
            <Col>
              <Button id="btnEditprod" className="btn" disabled={!disabled} onClick={(e) => Editar()}>
                <i className={'feather icon-edit'} /> Editar
              </Button>
              <Button id="btnSalvprod" className="btn btn-success" disabled={disabled} onClick={(e) => Salvar()}>
                <i className={'feather icon-save'} /> Salvar
              </Button>
              <Button id="btnCancprod" className="btn btn-warning" disabled={disabled} onClick={(e) => setShowselec(false)}>
                <i className={'feather icon-x'} /> Cancelar
              </Button>
            </Col>
          </Row>
        </Row>
        <Modal backdrop="static" size="lg" show={showfile} centered={true} onHide={handleCloseShowFile}>
          <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-camera h1'} />
            &nbsp;Definição da Foto
          </Modal.Header>
          <ModalBody>
            <Form.Group controlId="formFile" className="mb-1">
              <Form.Label>Favor escolher o arquivo:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  setUrl(URL.createObjectURL(e.target.files[0]));
                  getBase64(e.target.files[0])
                    .then((res) => {
                      let pos = res.indexOf('base64') + 7;
                      res = res.substring(pos);
                      setImg64(res);
                    })
                    .catch((err) => console.log(err));
                }}
              />
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                {url !== undefined && (url !== null) & (url !== '') ? <img src={url} alt="avatar" width="416" height="416" /> : <></>}
              </div>
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <Row style={{ textAlign: 'rigth' }}>
              <Col>
                <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={(e) => salvarFoto()}>
                  <i className={'feather icon-save'} /> Salvar
                </Button>
                <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={(e) => handleCloseShowFile()}>
                  <i className={'feather icon-x'} />
                  Cancelar
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
        <Modal backdrop="static" size="xl" show={showmapa} centered={true} onHide={handleClosemapa}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-map'} />
            &nbsp;Visualização do Mapa
          </Modal.Header>
          <ModalBody>
            <Row
              style={{
                marginTop: '5px',
                marginLeft: '5px',
                marginRight: '5px',
                marginBottom: '5px',
                height: '540px',
                textAlign: 'center'
              }}
            >
              {location !== undefined && location.length > 0 ? (
                <GoogleMap
                  bootstrapURLKeys={{ key: Decode64(localStorage.getItem('apikey_maps')) }}
                  defaultCenter={{ lat: location[0].lat, lng: location[0].lng }}
                  defaultZoom={17}
                >
                  {location.map((item, index) => (
                    <AnyReactComponent key={index} lat={item.lat} lng={item.lng} text={item.text} />
                  ))}
                </GoogleMap>
              ) : (
                <></>
              )}
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleClosemapa}>
              <i className={'feather icon-x-circle'} />
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ClienteEquipamentoSelec;
