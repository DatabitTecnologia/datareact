import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { lines, areas, colunas, barras, mixeds, pizzas, radials, cards, lists } from '../model';
import { apiUpdate } from '../../../../api/crudapi';

const DashboardSelect = (props) => {
  const { itemselec, disabled } = props;
  const [carregando, setCarregando] = React.useState(false);
  const { showselect, setShowselect } = props;
  const [typeselect, setTypeselect] = React.useState(0);

  useEffect(() => {
    if (typeselect > 0) {
      itemselec.tipo = typeselect;
      setCarregando(true);
      apiUpdate('Dashboard', itemselec).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setCarregando(false);
          setShowselect(false);
        }
      });
    }
  }, [typeselect]);

  return (
    <React.Fragment>
      <div id="frmselect" name="frmselect">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Gráficos de Linhas</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              {lines.map((grafico) => {
                return (
                  <Col key={grafico.id} lg={3}>
                    <Row key={grafico.id} className="div-dashboard">
                      <img
                        key={grafico.id}
                        src={grafico.image}
                        alt={grafico.image}
                        width="450"
                        height="238"
                        onDoubleClick={(e) => setTypeselect(grafico.id)}
                      />
                    </Row>
                    <Row
                      key={grafico.id}
                      style={{
                        textAlign: 'center',
                        border: 'solid',
                        borderWidth: '2px',
                        width: '100%',
                        marginLeft: '1px',
                        marginTop: '10px',
                        borderColor: '#0066ff',
                        backgroundColor: '#cce6ff'
                      }}
                    >
                      <h5 key={grafico.id} style={{ marginTop: '5px', marginBottom: '5px', color: '#0066ff' }}>
                        {grafico.name}
                      </h5>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Row>
        <Row style={{ marginTop: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Gráficos de Àreas</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              {areas.map((grafico) => {
                return (
                  <Col key={grafico.id} lg={3}>
                    <Row key={grafico.id} className="div-dashboard">
                      <img
                        key={grafico.id}
                        src={grafico.image}
                        alt={grafico.image}
                        width="450"
                        height="238"
                        onDoubleClick={(e) => setTypeselect(grafico.id)}
                      />
                    </Row>
                    <Row
                      key={grafico.id}
                      style={{
                        textAlign: 'center',
                        border: 'solid',
                        borderWidth: '2px',
                        width: '100%',
                        marginLeft: '1px',
                        marginTop: '10px',
                        borderColor: '#0066ff',
                        backgroundColor: '#cce6ff'
                      }}
                    >
                      <h5 key={grafico.id} style={{ marginTop: '5px', marginBottom: '5px', color: '#0066ff' }}>
                        {grafico.name}
                      </h5>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Row>
        <Row style={{ marginTop: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Gráficos de Colunas</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              {colunas.map((grafico) => {
                return (
                  <Col key={grafico.id} lg={3}>
                    <Row key={grafico.id} className="div-dashboard">
                      <img
                        key={grafico.id}
                        src={grafico.image}
                        alt={grafico.image}
                        width="450"
                        height="238"
                        onDoubleClick={(e) => setTypeselect(grafico.id)}
                      />
                    </Row>
                    <Row
                      key={grafico.id}
                      style={{
                        textAlign: 'center',
                        border: 'solid',
                        borderWidth: '2px',
                        width: '100%',
                        marginLeft: '1px',
                        marginTop: '10px',
                        borderColor: '#0066ff',
                        backgroundColor: '#cce6ff'
                      }}
                    >
                      <h5 key={grafico.id} style={{ marginTop: '5px', marginBottom: '5px', color: '#0066ff' }}>
                        {grafico.name}
                      </h5>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Row>
        <Row style={{ marginTop: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Gráficos de Barras</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              {barras.map((grafico) => {
                return (
                  <Col key={grafico.id} lg={3}>
                    <Row key={grafico.id} className="div-dashboard">
                      <img
                        key={grafico.id}
                        src={grafico.image}
                        alt={grafico.image}
                        width="450"
                        height="238"
                        onDoubleClick={(e) => setTypeselect(grafico.id)}
                      />
                    </Row>
                    <Row
                      key={grafico.id}
                      style={{
                        textAlign: 'center',
                        border: 'solid',
                        borderWidth: '2px',
                        width: '100%',
                        marginLeft: '1px',
                        marginTop: '10px',
                        borderColor: '#0066ff',
                        backgroundColor: '#cce6ff'
                      }}
                    >
                      <h5 key={grafico.id} style={{ marginTop: '5px', marginBottom: '5px', color: '#0066ff' }}>
                        {grafico.name}
                      </h5>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Row>
        <Row style={{ marginTop: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Gráficos Mistos</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              {mixeds.map((grafico) => {
                return (
                  <Col key={grafico.id} lg={3}>
                    <Row key={grafico.id} className="div-dashboard">
                      <img
                        key={grafico.id}
                        src={grafico.image}
                        alt={grafico.image}
                        width="450"
                        height="238"
                        onDoubleClick={(e) => setTypeselect(grafico.id)}
                      />
                    </Row>
                    <Row
                      key={grafico.id}
                      style={{
                        textAlign: 'center',
                        border: 'solid',
                        borderWidth: '2px',
                        width: '100%',
                        marginLeft: '1px',
                        marginTop: '10px',
                        borderColor: '#0066ff',
                        backgroundColor: '#cce6ff'
                      }}
                    >
                      <h5 key={grafico.id} style={{ marginTop: '5px', marginBottom: '5px', color: '#0066ff' }}>
                        {grafico.name}
                      </h5>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Row>
        <Row style={{ marginTop: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Gráficos de Pizza</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              {pizzas.map((grafico) => {
                return (
                  <Col key={grafico.id} lg={3}>
                    <Row key={grafico.id} className="div-dashboard">
                      <img
                        key={grafico.id}
                        src={grafico.image}
                        alt={grafico.image}
                        width="450"
                        height="238"
                        onDoubleClick={(e) => setTypeselect(grafico.id)}
                      />
                    </Row>
                    <Row
                      key={grafico.id}
                      style={{
                        textAlign: 'center',
                        border: 'solid',
                        borderWidth: '2px',
                        width: '100%',
                        marginLeft: '1px',
                        marginTop: '10px',
                        borderColor: '#0066ff',
                        backgroundColor: '#cce6ff'
                      }}
                    >
                      <h5 key={grafico.id} style={{ marginTop: '5px', marginBottom: '5px', color: '#0066ff' }}>
                        {grafico.name}
                      </h5>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Row>
        <Row style={{ marginTop: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Gráficos de Radial</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              {radials.map((grafico) => {
                return (
                  <Col key={grafico.id} lg={3}>
                    <Row key={grafico.id} className="div-dashboard">
                      <img
                        key={grafico.id}
                        src={grafico.image}
                        alt={grafico.image}
                        width="450"
                        height="238"
                        onDoubleClick={(e) => setTypeselect(grafico.id)}
                      />
                    </Row>
                    <Row
                      key={grafico.id}
                      style={{
                        textAlign: 'center',
                        border: 'solid',
                        borderWidth: '2px',
                        width: '100%',
                        marginLeft: '1px',
                        marginTop: '10px',
                        borderColor: '#0066ff',
                        backgroundColor: '#cce6ff'
                      }}
                    >
                      <h5 key={grafico.id} style={{ marginTop: '5px', marginBottom: '5px', color: '#0066ff' }}>
                        {grafico.name}
                      </h5>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Row>
        <Row style={{ marginTop: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Cartões</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              {cards.map((grafico) => {
                return (
                  <Col key={grafico.id} lg={3}>
                    <Row key={grafico.id} className="div-dashboard">
                      <img
                        key={grafico.id}
                        src={grafico.image}
                        alt={grafico.image}
                        width="450"
                        height="168"
                        onDoubleClick={(e) => setTypeselect(grafico.id)}
                      />
                    </Row>
                    <Row
                      key={grafico.id}
                      style={{
                        textAlign: 'center',
                        border: 'solid',
                        borderWidth: '2px',
                        width: '100%',
                        marginLeft: '1px',
                        marginTop: '10px',
                        borderColor: '#0066ff',
                        backgroundColor: '#cce6ff'
                      }}
                    >
                      <h5 key={grafico.id} style={{ marginTop: '5px', marginBottom: '5px', color: '#0066ff' }}>
                        {grafico.name}
                      </h5>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Row>
        <Row style={{ marginTop: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Listagem</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              {lists.map((grafico) => {
                return (
                  <Col key={grafico.id} lg={3}>
                    <Row key={grafico.id} className="div-dashboard">
                      <img
                        key={grafico.id}
                        src={grafico.image}
                        alt={grafico.image}
                        width="450"
                        height="168"
                        onDoubleClick={(e) => setTypeselect(grafico.id)}
                      />
                    </Row>
                    <Row
                      key={grafico.id}
                      style={{
                        textAlign: 'center',
                        border: 'solid',
                        borderWidth: '2px',
                        width: '100%',
                        marginLeft: '1px',
                        marginTop: '10px',
                        borderColor: '#0066ff',
                        backgroundColor: '#cce6ff'
                      }}
                    >
                      <h5 key={grafico.id} style={{ marginTop: '5px', marginBottom: '5px', color: '#0066ff' }}>
                        {grafico.name}
                      </h5>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DashboardSelect;
