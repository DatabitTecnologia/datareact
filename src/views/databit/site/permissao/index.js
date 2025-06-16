import React, { useEffect, useState } from 'react';
import GoogleMap from 'google-map-react';
import { Row, Col, Button, Modal, ModalFooter, ModalBody, Alert, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiExec, apiInsert } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';
import { CreateObject } from '../../../../components/CreateObject';
import Pointer from '../../../../assets/images/databit/pointer_green.png';
import { getZipCode } from '../../../../api/location';
import { Decode64 } from '../../../../utils/crypto';

const AnyReactComponent = ({ text }) => <img src={Pointer} alt="pointer" />;

const SitePermissao = (props) => {
  const { codcli, user } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [rowsselec, setRowsselec] = React.useState([]);
  const [itemselec, setItemselec] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [selecao, setSelecao] = React.useState([]);
  const [showmapa, setShowmapa] = React.useState(false);
  const [location, setLocation] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const { showpermissao, setShowpermissao } = props;

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
    apiList('SitePermissao', '*', '', "TB01162_USER = '" + user + "' ").then((response) => {
      if (response.status === 200) {
        setRowsselec(response.data);
        setFields([
          {
            id: 0,
            campo: 'cep',
            funcao: 'Cep',
            tipo: 'varchar',
            nome: 'campo',
            tamanho: 10,
            tipoobject: 8,
            widthfield: 10,
            measure: '8rem',
            disabled: false,
            tipomascara: 3
          },
          {
            id: 1,
            campo: 'end',
            funcao: 'Logradouro',
            tipo: 'varchar',
            nome: 'end',
            tamanho: 60,
            tipoobject: 1,
            widthfield: 27,
            measure: '27rem',
            disabled: false
          },
          {
            id: 2,
            campo: 'num',
            funcao: 'Nº',
            tipo: 'int',
            nome: 'num',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 8,
            measure: '8rem',
            disabled: false
          },
          {
            id: 3,
            campo: 'comp',
            funcao: 'Compl.',
            tipo: 'varchar',
            nome: 'num',
            tamanho: 10,
            tipoobject: 1,
            widthfield: 10,
            measure: '10rem',
            disabled: false
          },
          {
            id: 4,
            campo: 'bairro',
            funcao: 'Bairro',
            tipo: 'varchar',
            nome: 'bairro',
            tamanho: 30,
            tipoobject: 1,
            widthfield: 15,
            measure: '15rem',
            disabled: false
          },
          {
            id: 5,
            campo: 'cidade',
            funcao: 'Cidade',
            tipo: 'varchar',
            nome: 'cidade',
            tamanho: 30,
            tipoobject: 1,
            widthfield: 22,
            measure: '22rem',
            disabled: false
          },
          {
            id: 6,
            campo: 'estado',
            funcao: 'Estado',
            tipo: 'varchar',
            nome: 'estado',
            tamanho: 2,
            tipoobject: 11,
            widthfield: 14,
            measure: '14rem',
            options: states,
            disabled: false
          },

          {
            id: 7,
            campo: 'fone',
            funcao: 'Fone',
            tipo: 'varchar',
            nome: 'fone',
            tamanho: 10,
            tipoobject: 8,
            widthfield: 12,
            measure: '12rem',
            disabled: false,
            tipomascara: 4
          },

          {
            id: 8,
            campo: 'contato',
            funcao: 'Contato',
            tipo: 'varchar',
            nome: 'contato',
            tamanho: 30,
            tipoobject: 1,
            widthfield: 20,
            measure: '20rem',
            disabled: false
          },
          {
            id: 9,
            campo: 'email',
            funcao: 'Email',
            tipo: 'varchar',
            nome: 'email',
            tamanho: 200,
            tipoobject: 1,
            widthfield: 24,
            measure: '24rem',
            disabled: false,
            charnormal: true
          },
          {
            id: 10,
            campo: 'contrato',
            funcao: 'Contrato',
            tipo: 'varchar',
            nome: 'contrato',
            tamanho: 12,
            tipoobject: 1,
            widthfield: 9,
            measure: '9rem',
            disabled: false
          },
          {
            id: 11,
            campo: 'nomecontrato',
            funcao: 'Descrição Contrato',
            tipo: 'varchar',
            nome: 'nomecontrato',
            tamanho: 60,
            tipoobject: 1,
            widthfield: 22,
            measure: '22rem',
            disabled: false
          }
        ]);

        setColumns([
          { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 80 },
          { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição Site', width: 250 },
          { headerClassName: 'header-list', field: 'contrato', headerName: 'Contrato', width: 90 },
          { headerClassName: 'header-list', field: 'nomecontrato', headerName: 'Descrição Contrato', width: 170 },
          { headerClassName: 'header-list', field: 'bairro', headerName: 'Bairro', width: 120 },
          { headerClassName: 'header-list', field: 'cidade', headerName: 'Cidade', width: 130 },
          { headerClassName: 'header-list', field: 'estado', headerName: 'UF', width: 65 },
          { headerClassName: 'header-list', field: 'cep', headerName: 'Cep', width: 100 }
        ]);

        Filtrar();
      }
    });
  }, []);

  const Filtrar = () => {
    setCarregando(true);
    apiList('SitePermissaoVW', '*', '', "codcli = '" + codcli + "' and situacao = 'A' ").then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
      }
    });
  };

  useEffect(() => {
    let tmpselec = [];
    rowsselec.forEach((item) => {
      let itemfind = rows.filter((item2) => item2.codigo === item.codsite);
      if (itemfind !== undefined) {
        tmpselec = tmpselec.concat(itemfind);
      }
    });
    setSelecao(tmpselec);
  }, [rows]);

  useEffect(() => {}, [rowsselec]);

  useEffect(() => {
    if (itemselec !== undefined) {
      valuesfield[0] = itemselec.cep;
      valuesfield[1] = itemselec.logradouro;
      valuesfield[2] = itemselec.num;
      valuesfield[3] = itemselec.comp;
      valuesfield[4] = itemselec.bairro;
      valuesfield[5] = itemselec.cidade;
      valuesfield[6] = itemselec.estado;
      valuesfield[7] = itemselec.fone;
      valuesfield[8] = itemselec.contato;
      valuesfield[9] = itemselec.email;
      valuesfield[10] = itemselec.contrato;
      valuesfield[11] = itemselec.nomecontrato;
      setValuesfield([...valuesfield]);
    }
  }, [itemselec]);

  const handleClosemapa = () => {
    setShowmapa(false);
  };

  const Mapa = () => {
    getZipCode(valuesfield[0]).then((response) => {
      if (response.status === 200) {
        try {
          let tmplocation = response.data.results[0].geometry.location;
          let locationfim = [];
          tmplocation['name'] = valuesfield[1];
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

  const Salvar = async () => {
    setCarregando(true);

    // Deleta permissões anteriores
    const responseexec = await apiExec("DELETE FROM TB01162 WHERE TB01162_USER = '" + user + "'", 'N');

    if (responseexec.status === 200) {
      // Insere as novas permissões
      for (const item of selecao) {
        const itemsave = {
          user: user,
          codsite: item.codigo
        };

        const responseinsert = await apiInsert('SitePermissao', itemsave);

        if (responseinsert.status === 200) {
          console.log(responseinsert.data);
          console.log('Site ' + item.nome + ' salvo com Sucesso!');
        } else {
          console.error('Erro ao salvar site ' + item.nome);
        }
      }

      setCarregando(false);
      setShowpermissao(false);
    } else {
      console.error('Erro ao executar DELETE.');
      setCarregando(false);
    }
  };

  const Limpar = () => {
    setSelecao([]);
    Filtrar();
  };

  return (
    <React.Fragment>
      <div id="frmsitepermissao" name="frmsitepermissao">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px', marginTop: '-15px' }}>
            <Card.Header>
              <Card.Title as="h5">Listagem de Sites</Card.Title>
            </Card.Header>
            <Row style={{ marginBottom: '5px' }}>
              <AGGrid
                width="100%"
                height="260px"
                rows={rows}
                columns={columns}
                loading={carregando}
                item={itemselec}
                setItem={(data) => setItemselec(data)}
                focus={true}
                multselec={true}
                selection={selecao}
                onMultselec={setSelecao}
              ></AGGrid>
            </Row>
          </Card>
        </Row>
        <Row>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Localização do Site</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '5px', marginLeft: '5px', marginRight: '5px' }}>
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
                  disabled={true}
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
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'right', marginTop: '10px' }}>
          <Row style={{ textAlign: 'rigth' }}>
            <Col>
              <Button id="btnSalvar" className="btn btn-primary" onClick={(e) => Salvar()}>
                <i className={'feather icon-save'} /> Salvar
              </Button>
              <Button id="btnLimpar" className="btn btn-primary" onClick={(e) => Limpar()}>
                <i className={'feather icon-square'} /> Limpar
              </Button>
              <Button id="btnCancelar" className="btn btn-warning" onClick={(e) => setShowpermissao(false)}>
                <i className={'feather icon-x'} /> Sair
              </Button>
            </Col>
          </Row>
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
      </div>
    </React.Fragment>
  );
};

export default SitePermissao;
