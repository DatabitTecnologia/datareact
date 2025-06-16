import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { apiGetPicturelist } from '../../../../../api/crudapi';

const Cards = (props) => {
  const { config, columns, series, labels } = props;
  const [image, setImage] = React.useState([]);

  useEffect(() => {
    apiGetPicturelist('VW00022', 'IDQUERY', 'IMAGE', "DASHBOARD = '" + config.codigo + "'", 'NOMEQUERY', '').then((response) => {
      if (response.status === 200) {
        setImage(response.data);
      }
    });
  }, []);

  return (
    <React.Fragment>
      {series !== undefined && image !== undefined && image.length > 0 ? (
        <div>
          <Row>
            {series.map((serie, index) => {
              const value = serie.data[0] ?? 0;
              return (
                <Col lg={4} key={index} style={{ width: config.width, height: config.height, marginRight: '15px', marginBottom: '15px' }}>
                  <Card
                    style={{
                      backgroundColor: config.colors[index].color,
                      boxShadow: '0rem 0rem 1rem 0.0rem',
                      height: config.height,
                      width: config.width,
                      borderRadius: '5%'
                    }}
                  >
                    <Card.Body>
                      <Row>
                        <Col key={index} md={2} xl={3}>
                          {image[index].picture !== undefined &&
                          image[index].picture !== null &&
                          image[index].picture !== '' &&
                          image[index].picture !== 'MHg=' ? (
                            <img
                              style={{ height: '60px', width: '60px' }}
                              src={`data:image/jpeg;base64,${image[index].picture}`}
                              alt={serie.id}
                            ></img>
                          ) : (
                            <></>
                          )}
                        </Col>
                        <Col key={index} md={1} xl={7}>
                          <h5 style={{ color: config.colorstitle[index].colorstitle }}>{serie.name}</h5>
                        </Col>
                      </Row>
                      <h3
                        className="mb-2 f-w-300"
                        style={{
                          bottom: '10px',
                          textAlign: 'right',
                          right: 10,
                          position: 'absolute',
                          color: config.colorstitle[index].colorstitle
                        }}
                      >
                        {value.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </h3>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default Cards;
