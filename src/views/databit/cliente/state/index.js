import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Row, Col, Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiExec, apiInsert } from '../../../../api/crudapi';

// Importa o arquivo topojson com o mapa do Brasil
const BRAZIL_TOPOJSON = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson';

// Coordenadas para a posição das siglas dos estados
const STATE_LABELS = {
  Acre: [-70.55, -9.91],
  Alagoas: [-36.95, -9.62],
  Amapá: [-52.0, 1.41],
  Amazonas: [-65.0, -3.47],
  Bahia: [-41.5, -12.96],
  Ceará: [-39.0, -5.2],
  'Distrito Federal': [-47.93, -15.83],
  'Espírito Santo': [-40.31, -19.19],
  Goiás: [-49.4, -15.93],
  Maranhão: [-44.2, -4.56],
  'Mato Grosso': [-55.0, -12.64],
  'Mato Grosso do Sul': [-54.5, -20.51],
  'Minas Gerais': [-44.0, -19.92],
  Pará: [-52.29, -3.13],
  Paraíba: [-36.5, -7.12],
  Paraná: [-51.5, -24.89],
  Pernambuco: [-37.9, -8.28],
  Piauí: [-43.0, -6.6],
  'Rio de Janeiro': [-43.2, -22.91],
  'Rio Grande do Norte': [-36.6, -5.22],
  'Rio Grande do Sul': [-53.5, -30.03],
  Rondônia: [-63.0, -10.83],
  Roraima: [-61.4, 2.82],
  'Santa Catarina': [-50.0, -27.33],
  'São Paulo': [-46.63, -23.55],
  Sergipe: [-37.07, -10.57],
  Tocantins: [-48.0, -10.25]
};

// Siglas dos estados
const STATE_SIGLAS = {
  Acre: 'AC',
  Alagoas: 'AL',
  Amapá: 'AP',
  Amazonas: 'AM',
  Bahia: 'BA',
  Ceará: 'CE',
  'Distrito Federal': 'DF',
  'Espírito Santo': 'ES',
  Goiás: 'GO',
  Maranhão: 'MA',
  'Mato Grosso': 'MT',
  'Mato Grosso do Sul': 'MS',
  'Minas Gerais': 'MG',
  Pará: 'PA',
  Paraíba: 'PB',
  Paraná: 'PR',
  Pernambuco: 'PE',
  Piauí: 'PI',
  'Rio de Janeiro': 'RJ',
  'Rio Grande do Norte': 'RN',
  'Rio Grande do Sul': 'RS',
  Rondônia: 'RO',
  Roraima: 'RR',
  'Santa Catarina': 'SC',
  'São Paulo': 'SP',
  Sergipe: 'SE',
  Tocantins: 'TO'
};

const STATE_NAMES = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SP: 'São Paulo',
  SC: 'Santa Catarina',
  SE: 'Sergipe',
  TO: 'Tocantins'
};

const ClienteState = (props) => {
  const { codcli } = props;
  const [carregando, setCarregando] = useState(false);
  const [rows, setRows] = React.useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [scale, setScale] = useState(1200); // Estado para controlar a escala
  const { showstate, setShowstate } = props;

  const allStates = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'São Paulo',
    'Santa Catarina',
    'Sergipe',
    'Tocantins'
  ];

  useEffect(() => {
    setCarregando(true);
    setSelectedStates([]);
    let tmpstate = [];
    apiList('ClienteEstado', '*', '', "TB01147_CODCLI = '" + codcli + "' ORDER BY TB01147_ESTADO").then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
        let stateName = '';
        response.data.forEach((item) => {
          stateName = STATE_NAMES[item.estado];
          tmpstate = tmpstate.concat(stateName);
        });
        setSelectedStates([...tmpstate]);
      }
    });
  }, []);

  const handleStateClick = (geo) => {
    const stateName = geo.properties.name;

    if (selectedStates.includes(stateName)) {
      setSelectedStates(selectedStates.filter((name) => name !== stateName));
    } else {
      setSelectedStates([...selectedStates, stateName]);
    }
  };

  const toggleAllStates = () => {
    if (selectedStates.length === allStates.length) {
      setSelectedStates([]); // Desmarcar todos
    } else {
      setSelectedStates(allStates); // Selecionar todos
    }
  };

  const Salvar = () => {
    setCarregando(true);
    apiExec("DELETE FROM TB01147 WHERE TB01147_CODCLI = '" + codcli + "' ", 'N').then((response) => {
      if (response.status === 200) {
        selectedStates.forEach((state) => {
          let item = {};
          item['codcli'] = codcli;
          item['estado'] = STATE_SIGLAS[state];
          setCarregando(true);
          apiInsert('ClienteEstado', item).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
            }
          });
        });
        setShowstate(false);
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frmstate" name="frmstate">
        <Row style={{ width: '100%', margin: '0' }}>
          <Col md={8}>
            <div style={{ width: '100%', height: '750px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: scale }} // Ajuste a escala conforme necessário
                style={{ width: '100%', height: '100%', cursor: 'pointer' }} // Ajustar para preencher o espaço disponível
                viewBox={'-700 100 1 1000'} // Dimensão original do SVG
              >
                <Geographies geography={BRAZIL_TOPOJSON}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isSelected = selectedStates.includes(geo.properties.name);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => handleStateClick(geo)}
                          style={{
                            default: {
                              fill: isSelected ? '#80ffaa' : '#4da6ff', // Azul se selecionado, cinza se não
                              stroke: '#000', // Cor da borda (preta, por exemplo)
                              strokeWidth: 0.5 // Espessura da borda
                            },
                            hover: {
                              fill: '#00f', // Azul ao passar o mouse
                              stroke: '#000', // Cor da borda (preta, por exemplo)
                              strokeWidth: 0.5
                            },
                            pressed: {
                              fill: '#80ffaa', // Azul ao clicar
                              stroke: '#000', // Cor da borda (preta, por exemplo)
                              strokeWidth: 0.5
                            },
                            // Aumentando a área clicável do Distrito Federal
                            ...(geo.properties.name === 'Distrito Federal' && {
                              fill: isSelected ? '#80ffaa' : '#4da6ff',
                              transform: 'scale(5)', // Aumentando o tamanho
                              transformOrigin: 'center',
                              stroke: '#000', // Cor da borda (preta, por exemplo)
                              strokeWidth: 0.5
                            })
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
                {/* Exibindo as siglas dos estados */}
                {Object.keys(STATE_LABELS).map((state) => (
                  <Marker key={state} coordinates={STATE_LABELS[state]}>
                    <text
                      textAnchor="middle"
                      style={{
                        fontFamily: 'system-ui',
                        fill: '#000',
                        fontSize: 10,
                        fontWeight: 'bold'
                      }}
                    >
                      {STATE_SIGLAS[state]}
                    </text>
                  </Marker>
                ))}
              </ComposableMap>
            </div>
          </Col>

          <Col md={4}>
            <Card className="Recent-Users" style={{ margin: '0 auto', marginTop: '-20px' }}>
              <Card.Header style={{ marginLeft: '10px' }}>
                <Card.Title as="h5" style={{ textAlign: 'center' }}>
                  Estados selecionados
                </Card.Title>
              </Card.Header>

              <ul style={{ marginTop: '2px' }}>
                {selectedStates.map((state) => (
                  <li key={state}>{state}</li>
                ))}
              </ul>
              <Row style={{ textAlign: 'center' }}>
                <Col>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip className="mb-2">
                        {selectedStates.length === allStates.length ? 'Desmarcar todos' : 'Selecionar todos'}
                      </Tooltip>
                    }
                  >
                    <Button onClick={toggleAllStates} className="btn-icon">
                      <i className={selectedStates.length === allStates.length ? 'feather icon-x-square' : 'feather icon-list'} />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Salvar</Tooltip>}>
                    <Button id="btnSalvprod" className="btn-icon btn-success" onClick={(e) => Salvar()}>
                      <i className={'feather icon-save'} />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Cancelar</Tooltip>}>
                    <Button id="btnCancprod" className="btn-icon btn-warning" onClick={(e) => setShowstate(false)}>
                      <i className={'feather icon-x'} />
                    </Button>
                  </OverlayTrigger>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
      </div>
    </React.Fragment>
  );
};

export default ClienteState;
