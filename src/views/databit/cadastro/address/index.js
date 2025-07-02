import React, { useEffect } from 'react';
import { apiList, apiFind } from '../../../../api/crudapi';
import { LinearProgress } from '@mui/material';
import { Row, Col, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import GoogleMap from 'google-map-react';
import { CreateObject } from '../../../../components/CreateObject';
import { getCEP } from '../../../../api/correios';
import { getZipCode } from '../../../../api/location';
import { useToasts } from 'react-toast-notifications';
import Pointer from '../../../../assets/images/databit/pointer_blue.png';
import { Decode64 } from '../../../../utils/crypto';

const AnyReactComponent = ({ text }) => <img src={Pointer} alt="pointer" />;

const Address = (props) => {
  const { valuesaddress, setValuesaddress } = props;
  const { valuesaddressdisable, setValuesaddressdisable } = props;
  const { valuesaddressrequired, setValuesaddressrequired } = props;
  const { typeaddress, setTypeaddress } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [types, setTypes] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const { disabled, setDisabled } = props;
  const { rowselect, setRowselect } = props;
  const [nametype, setNametype] = React.useState();
  const [typeselec, setTypeselec] = React.useState();
  const { statusend, setStatusend } = props;
  const { addToast } = useToasts();
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
    console.log('Entrou')
    Filtrar();
  }, []);

  const Filtrar = () => {
    setCarregando(true);
    apiList('EnderecoConfigVW', 'TB04002_CODIGO, TB04002_NOME', '', "TB00013_TABELA = '" + props.table + "' ").then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setTypes(response.data);
        setTypeselec('01');
        props.setTypeaddress('01');
        setNametype(response.data[0].nome);
      }
    });
  };

  const SetType = (type, index) => {
    setNametype(types[index].nome);
    setTypeselec(type);
    props.setTypeaddress(type);
  };

  useEffect(() => {
    FiltrarEndereco(typeselec);
  }, [typeselec]);

  useEffect(() => {
    if (statusend === 1) {
      // Inclusão
      valuesaddress[0] = '';
      valuesaddress[1] = '';
      valuesaddress[2] = 0;
      valuesaddress[3] = '';
      valuesaddress[4] = '';
      valuesaddress[5] = '';
      valuesaddress[6] = 'MG';
      valuesaddress[7] = '';
      valuesaddress[8] = '';
      valuesaddress[9] = '';
      valuesaddress[10] = '';
      valuesaddress[11] = '';
      valuesaddress[12] = '';
      valuesaddress[13] = '';
      valuesaddress[14] = '';
      valuesaddress[15] = '';
      valuesaddress[16] = '';
      setValuesaddress([...valuesaddress]);
      setStatusend(0);
    }
    if (statusend === 2) {
      // Cancelar
      FiltrarEndereco(typeselec);
      setStatusend(0);
    }
  }, [statusend]);

  useEffect(() => {
    if (!disabled) {
      let valor = valuesaddress[0];
      if (valor !== undefined && valor !== '' && valor !== null) {
        if (valor.length === 8) {
          setCarregando(true);
          getCEP(valor).then((response) => {
            if (response.status === 200) {
              try {
                valuesaddress[1] = response.data.logradouro.toUpperCase().substring(0, 60);
                valuesaddress[4] = response.data.bairro.toUpperCase().substring(0, 30);
                valuesaddress[5] = response.data.localidade.toUpperCase().substring(0, 30);
                valuesaddress[6] = response.data.uf.toUpperCase();
              } catch (error) {
                addToast('Endereço não encontrado !', {
                  placement: 'bottom-rigth',
                  appearance: 'warning',
                  autoDismiss: true
                });
              }
              setCarregando(false);
            }
          });
        }
      }
    }
  }, [valuesaddress[0]]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB00012_CEP',
        funcao: 'Cep',
        tipo: 'varchar',
        nome: 'campo',
        tamanho: 10,
        tipoobject: 8,
        widthfield: 10,
        measure: '8rem',
        disabled: disabled,
        tipomascara: 3
      },
      {
        id: 1,
        campo: 'TB00012_END',
        funcao: 'Logradouro',
        tipo: 'varchar',
        nome: 'end',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 25,
        measure: '25rem',
        disabled: true
      },
      {
        id: 2,
        campo: 'TB00012_NUM',
        funcao: 'Nº',
        tipo: 'int',
        nome: 'num',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: true
      },
      {
        id: 3,
        campo: 'TB00012_COMP',
        funcao: 'Compl.',
        tipo: 'varchar',
        nome: 'num',
        tamanho: 10,
        tipoobject: 1,
        widthfield: 10,
        measure: '10rem',
        disabled: true
      },
      {
        id: 4,
        campo: 'TB00012_BAIRRO',
        funcao: 'Bairro',
        tipo: 'varchar',
        nome: 'bairro',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 15,
        measure: '15rem',
        disabled: true
      },
      {
        id: 5,
        campo: 'TB00012_CIDADE',
        funcao: 'Cidade',
        tipo: 'varchar',
        nome: 'cidade',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 15,
        measure: '15rem',
        disabled: true
      },
      {
        id: 6,
        campo: 'TB00012_ESTADO',
        funcao: 'Estado',
        tipo: 'varchar',
        nome: 'estado',
        tamanho: 2,
        tipoobject: 11,
        widthfield: 14,
        measure: '14rem',
        options: states,
        disabled: true
      },
      {
        id: 7,
        campo: 'TB00012_PAIS',
        funcao: 'País',
        tipo: 'varchar',
        nome: 'cidade',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 20,
        measure: '20rem',
        disabled: true
      },
      {
        id: 8,
        campo: 'TB00012_FONE',
        funcao: 'Fone',
        tipo: 'varchar',
        nome: 'fone',
        tamanho: 10,
        tipoobject: 8,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        tipomascara: 4
      },
      {
        id: 9,
        campo: 'TB00012_FONEAUX',
        funcao: 'Fone 2',
        tipo: 'varchar',
        nome: 'foneaux',
        tamanho: 10,
        tipoobject: 8,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        tipomascara: 4
      },
      {
        id: 10,
        campo: 'TB00012_FAX',
        funcao: 'Fone 3',
        tipo: 'varchar',
        nome: 'fax',
        tamanho: 10,
        tipoobject: 8,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        tipomascara: 4
      },
      {
        id: 11,
        campo: 'TB00012_CELULAR',
        funcao: 'Celular',
        tipo: 'varchar',
        nome: 'celular',
        tamanho: 11,
        tipoobject: 8,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        tipomascara: 5
      },
      {
        id: 12,
        campo: 'TB00012_CELULAR2',
        funcao: 'WhatsAPP',
        tipo: 'varchar',
        nome: 'celular2',
        tamanho: 11,
        tipoobject: 8,
        widthfield: 12,
        measure: '12rem',
        disabled: true,
        tipomascara: 5
      },
      {
        id: 13,
        campo: 'TB00012_CONTATO',
        funcao: 'Contato',
        tipo: 'varchar',
        nome: 'contato',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 15,
        measure: '15.5rem',
        disabled: true
      },
      {
        id: 14,
        campo: 'TB00012_EMAIL',
        funcao: 'Email',
        tipo: 'varchar',
        nome: 'email',
        tamanho: 200,
        tipoobject: 1,
        widthfield: 31,
        measure: '32rem',
        disabled: true
      },
      {
        id: 15,
        campo: 'TB00012_SITE',
        funcao: 'Site',
        tipo: 'varchar',
        nome: 'site',
        tamanho: 200,
        tipoobject: 1,
        widthfield: 30,
        measure: '32rem',
        disabled: true
      },
      {
        id: 16,
        campo: 'TB00012_MSN',
        funcao: 'Skype',
        tipo: 'varchar',
        nome: 'msn',
        tamanho: 200,
        tipoobject: 1,
        widthfield: 30,
        measure: '31.5rem',
        disabled: true
      }
    ]);
  }, [valuesaddress]);

  const FiltrarEndereco = (type) => {
    if (props.rowselect !== undefined) {
      setCarregando(true);
      apiFind(
        'Endereco',
        'TB00012_BAIRRO,TB00012_CELULAR,TB00012_CEP,TB00012_CIDADE,TB00012_CODIGO,TB00012_COMP,' +
          'TB00012_CONTATO,TB00012_EMAIL,TB00012_END,TB00012_ESTADO,TB00012_FAX,TB00012_FONE,' +
          'TB00012_FONEAUX,TB00012_NUM,TB00012_SITE,TB00012_TABELA,TB00012_TIPO,TB00012_CELULAR2' +
          'TB00012_MSN,TB00012_PAIS,TB00012_TABELA,TB0012_TIPO,TB00012_CODIGO',
        '',
        "TB00012_TABELA = '" +
          props.table +
          "' and TB00012_TIPO = '" +
          type +
          "' AND TB00012_CODIGO = '" +
          props.rowselect[props.table + '_CODIGO'] +
          "' "
      ).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          valuesaddress[0] = response.data.cep;
          valuesaddress[1] = response.data.end;
          valuesaddress[2] = response.data.num;
          valuesaddress[3] = response.data.comp;
          valuesaddress[4] = response.data.bairro;
          valuesaddress[5] = response.data.cidade;
          valuesaddress[6] = response.data.estado;
          valuesaddress[7] = response.data.pais;
          valuesaddress[8] = response.data.fone;
          valuesaddress[9] = response.data.foneaux;
          valuesaddress[10] = response.data.fax;
          valuesaddress[11] = response.data.celular;
          valuesaddress[12] = response.data.celular2;
          valuesaddress[13] = response.data.contato;
          valuesaddress[14] = response.data.email;
          valuesaddress[15] = response.data.site;
          valuesaddress[16] = response.data.msn;
          setValuesaddress([...valuesaddress]);
        }
      });
    } else {
      setCarregando(false);
    }
  };

  const handleKeyDown = (event, index) => {
    const key = event.keyCode;
    let campoFoco = '';
    switch (key) {
      case 40:
      case 13: {
        if (index < fields.length - 1) {
          campoFoco = fields[index + 1].campo;
          try {
            document.getElementById(campoFoco).focus();
          } catch (error) {
            //console.log(error);
          }
        }
        break;
      }
      case 38: {
        if (index > 0) {
          campoFoco = fields[index - 1].campo;
          try {
            document.getElementById(campoFoco).focus();
          } catch (error) {
            //console.log(error);
          }
        }
        break;
      }
    }
  };

  const handleClosemapa = () => {
    setShowmapa(false);
  };

  const Mapa = () => {
    getZipCode(valuesaddress[0]).then((response) => {
      if (response.status === 200) {
        try {
          let tmplocation = response.data.results[0].geometry.location;
          let locationfim = [];
          tmplocation['name'] = valuesaddress[1];
          locationfim = locationfim.concat(tmplocation);
          setLocation(locationfim);
          setShowmapa(true);
        } catch (error) {
          setLocation([]);
          addToast('Não foi possível buscar as coordenadas deste Endereço !', {
            placement: 'bottom-rigth',
            appearance: 'warning',
            autoDismiss: true
          });
        }
      }
    });
  };

  return (
    <React.Fragment>
      <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
      <Row style={{ marginTop: '10px' }}>
        <Col lg={10}>
          {types.map((type, index) => {
            return (
              <Button key={type.codigo} className="btn btn-primary  mb-2" onClick={() => SetType(type.codigo, index)} disabled={!disabled}>
                {type.nome}
              </Button>
            );
          })}
        </Col>
        <Col>
          <Button className="btn btn-success  mb-2" onClick={(e) => Mapa()}>
            <i className={'feather icon-map'} />
            Visualizar Mapa
          </Button>
        </Col>
      </Row>
      <Row>
        <Row style={{ marginTop: '10px', marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
          <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
            Tipo selecionado: {nametype}
          </p>
        </Row>
        {fields.map((field, index) => {
          return (
            <CreateObject
              key={index}
              field={field}
              index={index}
              fields={fields}
              valuesfield={valuesaddress}
              setValuesfield={(data) => setValuesaddress(data)}
              disabled={valuesaddressdisable[index]}
              onkeydown={(event) => handleKeyDown(event, field.id)}
              required={valuesaddressrequired[index]}
              invisible={false}
            ></CreateObject>
          );
        })}
      </Row>
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
    </React.Fragment>
  );
};

export default Address;
