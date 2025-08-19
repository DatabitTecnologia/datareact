import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Modal, ModalBody, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import notfound from '../../../../assets/images/databit/notfound.png';
import { lines, barras, areas, colunas, mixeds, pizzas, radials, cards, lists } from '../model';
import { CreateObject } from '../../../../components/CreateObject';
import DashboardSelect from '../select';
import DashboardQuery from '../query';
import DashboardUser from '../user';
import DashboardModule from '../module';
import DashboardSystem from '../system';
import DashboardViewer from '../viewer';
import DashboardOrder from '../order';

const DashboardConfig = (props) => {
  //const steps = ['Definição de Consultas', 'Definição de Usuários', 'Visualizar Sistemas', 'Visualizar Módulos', 'Scripts'];
  //const icons = ['feather icon-search', 'feather icon-users', 'feather icon-bookmark', 'feather icon-monitor', 'feather icon-zap'];
  const steps = ['Definição de Consultas', 'Usuários', 'Sistemas', 'Módulos', 'Ordernação'];
  const icons = ['feather icon-search', 'feather icon-users', 'feather icon-bookmark', 'feather icon-monitor', 'feather icon-list'];

  const [activeStep, setActiveStep] = React.useState(0);
  const { itemselec, disabled } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [image, setImage] = React.useState();
  const [name, setName] = React.useState();
  const [fields, setFields] = React.useState([]);
  const { valuesfield, setValuesfield } = props;
  const { valuesfield2, setValuesfield2 } = props;
  const [showselect, setShowselect] = React.useState(false);
  const handleCloseShowselect = () => setShowselect(false);
  const [showteste, setShowteste] = React.useState(false);
  const handleCloseShowteste = () => setShowteste(false);
  const [completed, setCompleted] = React.useState({});

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  useEffect(() => {
    const tipodash = parseInt(itemselec.tipo);
    if (tipodash === 0) {
      setImage(notfound);
      setName('NENHUM DASHBOARD SELECIONADO!');
    } else if (tipodash >= 1 && tipodash <= 7) {
      const line = lines.filter((x) => x.id === tipodash);
      setImage(line[0].image);
      setName(line[0].name);
    } else if (tipodash >= 8 && tipodash <= 14) {
      const area = areas.filter((x) => x.id === tipodash);
      setImage(area[0].image);
      setName(area[0].name);
    } else if (tipodash >= 15 && tipodash <= 22) {
      const coluna = colunas.filter((x) => x.id === tipodash);
      setImage(coluna[0].image);
      setName(coluna[0].name);
    } else if (tipodash >= 23 && tipodash <= 29) {
      const barra = barras.filter((x) => x.id === tipodash);
      setImage(barra[0].image);
      setName(barra[0].name);
    } else if (tipodash >= 30 && tipodash <= 33) {
      const mixed = mixeds.filter((x) => x.id === tipodash);
      setImage(mixed[0].image);
      setName(mixed[0].name);
    } else if (tipodash >= 34 && tipodash <= 35) {
      const pizza = pizzas.filter((x) => x.id === tipodash);
      setImage(pizza[0].image);
      setName(pizza[0].name);
    } else if (tipodash >= 36 && tipodash <= 41) {
      const radial = radials.filter((x) => x.id === tipodash);
      setImage(radial[0].image);
      setName(radial[0].name);
    } else if (tipodash === 42) {
      const card = cards.filter((x) => x.id === tipodash);
      setImage(card[0].image);
      setName(card[0].name);
    } else if (tipodash === 43) {
      const list = lists.filter((x) => x.id === tipodash);
      setImage(list[0].image);
      setName(list[0].name);
    }
    setFields([
      {
        id: 7,
        campo: 'TB00115_OBS',
        funcao: 'Descreva brevemente, qual é o objetivo deste Dashboard',
        tipo: 'varchar',
        nome: 'obs',
        tamanho: 1000,
        tipoobject: 6,
        widthfield: 47,
        measure: '47rem',
        charnormal: true,
        disable: disabled
      }
    ]);
  }, [itemselec, showselect]);

  return (
    <React.Fragment>
      <div id="frmconfigdash" name="frmconfigdash">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginTop: '10px' }}>
          <Col lg={4}>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Modelo selecionado</Card.Title>
              </Card.Header>
              <Row style={{ marginTop: '10px', marginBottom: '5px' }}>
                <img
                  src={image}
                  alt={image}
                  width="450"
                  height="298"
                  onDoubleClick={(e) => {
                    disabled ? setShowselect(true) : <></>;
                  }}
                />
              </Row>
              <Row
                style={{
                  textAlign: 'center',
                  border: 'solid',
                  borderWidth: '2px',
                  width: '100%',
                  marginLeft: '1px',
                  marginTop: '1px',
                  borderColor: '#0066ff',
                  backgroundColor: '#cce6ff'
                }}
              >
                <h5 style={{ marginTop: '5px', marginBottom: '5px', color: '#0066ff' }}>{name}</h5>
              </Row>
            </Card>
            <Card className="Recent-Users" style={{ marginBottom: '2px', marginTop: '10px' }}>
              <Card.Header>
                <Card.Title as="h5">Função</Card.Title>
              </Card.Header>
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
                    disabled={disabled}
                  ></CreateObject>
                ))}
              </Row>
              <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                <Button id="btnVisualizar" className="btn btn-primary" disabled={!disabled} onClick={(e) => setShowteste(true)}>
                  <i className={'feather icon-eye'} /> Visualizar
                </Button>
              </Row>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Configurações</Card.Title>
              </Card.Header>
              <Box
                sx={{ width: '100%', marginTop: '15px', marginBottom: '15px', marginLeft: '20px', marginRight: '5px', textAlign: 'center' }}
              >
                <Stepper nonLinear activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Button
                      key={index}
                      className={index === activeStep ? 'btn btn-success' : 'btn btn-primary'}
                      onClick={handleStep(index)}
                      disabled={!disabled}
                    >
                      <i className={icons[index]} /> {label}
                    </Button>
                  ))}
                </Stepper>
              </Box>

              {activeStep === 0 && itemselec.tipo > 0 ? <DashboardQuery dashboard={itemselec} disabled={disabled}></DashboardQuery> : <></>}
              {activeStep === 1 && itemselec.tipo > 0 ? <DashboardUser dashboard={itemselec} disabled={disabled}></DashboardUser> : <></>}
              {activeStep === 2 && itemselec.tipo > 0 ? (
                <DashboardSystem dashboard={itemselec} disabled={disabled}></DashboardSystem>
              ) : (
                <></>
              )}
              {activeStep === 3 && itemselec.tipo > 0 ? (
                <DashboardModule dashboard={itemselec} disabled={disabled}></DashboardModule>
              ) : (
                <></>
              )}
              {activeStep === 4 && itemselec.tipo > 0 ? <DashboardOrder dashboard={itemselec} disabled={disabled}></DashboardOrder> : <></>}
            </Card>
          </Col>
        </Row>
      </div>
      <Modal backdrop="static" fullscreen={true} show={showselect} centered={true} onHide={handleCloseShowselect}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-pie-chart h1'} />
          &nbsp;Escolha o modelo desejado
        </Modal.Header>
        <ModalBody>
          <DashboardSelect itemselec={itemselec} showselect={showselect} setShowselect={(data) => setShowselect(data)}></DashboardSelect>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="xl" show={showteste} centered={true} onHide={handleCloseShowteste}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-pie-chart h1'} />
          &nbsp;{name}
        </Modal.Header>
        <ModalBody>
          <DashboardViewer dashboard={itemselec}></DashboardViewer>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default DashboardConfig;
