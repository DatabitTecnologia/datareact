import React, { useEffect } from 'react';
import { Row, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiFind } from '../../../../../api/crudapi';
import { CreateObject } from '../../../../../components/CreateObject';
import { getZipCode } from '../../../../../api/location';
import GoogleMap from 'google-map-react';
import { DATABIT } from '../../../../../config/constant';
import Pointer from '../../../../../assets/images/databit/pointer_green.png';
import { Decode64 } from '../../../../../utils/crypto';

const AnyReactComponent = ({ text }) => <img src={Pointer} alt="pointer" />;

const GmoSite = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const { itemselec, setItemselc } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [site, setSite] = React.useState([]);
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
    setFields([
      {
        id: 0,
        campo: 'TB02176_CODIGO',
        funcao: 'Código',
        tipo: 'varchar',
        nome: 'codigo',
        tamanho: 6,
        tipoobject: 1,
        disabled: true,
        widthfield: 6,
        measure: '6rem',
        readonly: true
      },
      {
        id: 1,
        campo: 'TB02176_NOME',
        funcao: 'Descrição',
        tipo: 'varchar',
        nome: 'nome',
        tamanho: 255,
        tipoobject: 1,
        widthfield: 59,
        measure: '59rem',
        disabled: true
      },
      {
        id: 2,
        campo: 'TB02176_CEP',
        funcao: 'Cep',
        tipo: 'varchar',
        nome: 'campo',
        tamanho: 10,
        tipoobject: 8,
        widthfield: 10,
        measure: '8rem',
        disabled: true,
        tipomascara: 3
      },
      {
        id: 3,
        campo: 'TB02176_END',
        funcao: 'Logradouro',
        tipo: 'varchar',
        nome: 'end',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 37,
        measure: '39rem',
        disabled: true
      },
      {
        id: 4,
        campo: 'TB02176_NUM',
        funcao: 'Nº',
        tipo: 'int',
        nome: 'num',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 41,
        measure: '8rem',
        disabled: true
      },
      {
        id: 5,
        campo: 'TB02176_COMP',
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
        id: 6,
        campo: 'TB02176_BAIRRO',
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
        id: 7,
        campo: 'TB02176_CIDADE',
        funcao: 'Cidade',
        tipo: 'varchar',
        nome: 'cidade',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 22,
        measure: '22rem',
        disabled: true
      },
      {
        id: 8,
        campo: 'TB02176_ESTADO',
        funcao: 'Estado',
        tipo: 'varchar',
        nome: 'estado',
        tamanho: 2,
        tipoobject: 11,
        widthfield: 15,
        measure: '15rem',
        options: states,
        disabled: true
      },
      {
        id: 9,
        campo: 'TB02176_FONE',
        funcao: 'Fone',
        tipo: 'varchar',
        nome: 'fone',
        tamanho: 10,
        tipoobject: 8,
        widthfield: 13,
        measure: '13rem',
        disabled: true,
        tipomascara: 5
      },
      {
        id: 10,
        campo: 'TB02176_CONTATO',
        funcao: 'Contato',
        tipo: 'varchar',
        nome: 'contato',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 20,
        measure: '20.5rem',
        disabled: true
      },
      {
        id: 11,
        campo: 'TB02176_EMAIL',
        funcao: 'Email',
        tipo: 'varchar',
        nome: 'email',
        tamanho: 200,
        tipoobject: 1,
        widthfield: 45,
        measure: '45rem',
        disabled: true
      }
    ]);
    setCarregando(true);
    apiFind(
      'ContratoSite',
      'TB02176_CODIGO,TB02176_NOME,TB02176_END,TB02176_CEP,TB02176_END,TB02176_NUM,TB02176_COMP,TB02176_BAIRRO,' +
        'TB02176_CIDADE,TB02176_ESTADO,TB02176_CONTATO,TB02176_FONE,TB02176_EMAIL,TB02176_OPORTUNIDADE',
      '',
      " TB02176_CODIGO = '" + itemselec.codsite + "' "
    ).then((response) => {
      if (response.status === 200) {
        setSite(response.data);
        setCarregando(false);
      }
    });
  }, []);

  useEffect(() => {
    if (site !== undefined) {
      getZipCode(site['cep']).then((response) => {
        if (response.status === 200) {
          valuesfield[0] = site['codigo'];
          valuesfield[1] = site['nome'];
          valuesfield[2] = site['cep'];
          valuesfield[3] = site['end'];
          valuesfield[4] = site['num'];
          valuesfield[5] = site['comp'];
          valuesfield[6] = site['bairro'];
          valuesfield[7] = site['cidade'];
          valuesfield[8] = site['estado'];
          valuesfield[9] = site['fone'];
          valuesfield[10] = site['contato'];
          valuesfield[11] = site['email'];
          setValuesfield([...valuesfield]);
          try {
            let tmplocation = response.data.results[0].geometry.location;
            tmplocation['name'] = site['nome'];
            let locationfim = [];
            locationfim = locationfim.concat(tmplocation);
            setLocation(locationfim);
          } catch (error) {
            setLocation([]);
          }
        }
      });
    }
  }, [site]);

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
        <Row style={{ marginLeft: '5px', marginBottom: '5px' }}>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Visualização em Mapa</Card.Title>
              </Card.Header>
              <Row
                style={{
                  marginTop: '5px',
                  marginLeft: '5px',
                  marginRight: '5px',
                  marginBottom: '5px',
                  height: '240px',
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
            </Card>
          </Row>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default GmoSite;
