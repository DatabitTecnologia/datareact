import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';

const DashboardParam = (props) => {
  const { filters, setfilters } = props;
  const { valuesfilter, setValuesfilter } = props;
  const { valuesfilter2, setValuesfilter2 } = props;
  const { showfilter, setShowfilter } = props;
  const { querys, setQuerys } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const { paramdefault, setParamdefault } = props;

  useEffect(() => {
    if (paramdefault) {
      let tmpquerys = querys.filter((item) => item.param === 1);
      tmpquerys[0].nome = 'Definição de Filtros';
      setQuerys(tmpquerys);
    }
  }, [paramdefault]);

  useEffect(() => {
    console.log(valuesfilter);
    setValuesfield([...valuesfilter]);
    setValuesfield2([...valuesfilter2]);
  }, [filters]);

  const Aplicar = () => {
    setValuesfilter([...valuesfield]);
    setValuesfilter2([...valuesfield2]);
    setShowfilter(false);
  };

  const Limpar = () => {
    setValuesfilter([]);
    setValuesfilter2([]);
    setShowfilter(false);
  };

  return (
    <React.Fragment>
      <div id="frmparam" name="frmparam">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          {querys.map((query, index2) => {
            return (
              <Col key={index2}>
                <Card key={index2} className="Recent-Users">
                  <Card.Header key={index2}>
                    <Card.Title as="h5">{query.nome}</Card.Title>
                  </Card.Header>
                  {filters !== undefined && filters.length > 0 ? (
                    <Row key={index2} style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                      {filters.map((filter, index) => {
                        if (filter.query === query.query && parseInt(filter.visivel) === 1) {
                          return (
                            <CreateObject
                              key={index + '_' + index2}
                              field={filter}
                              index={filter.id}
                              fields={filters}
                              valuesfield={valuesfield}
                              setValuesfield={(data) => setValuesfield(data)}
                              valuesfield2={valuesfield2}
                              setValuesfield2={(data) => setValuesfield2(data)}
                            ></CreateObject>
                          );
                        }
                      })}
                    </Row>
                  ) : (
                    <></>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'right', marginTop: '20px' }}>
          <Col>
            <Button id="btnAplicar" className="btn btn-success shadow-2 mb-2" onClick={(e) => Aplicar()}>
              <i className={'feather icon-check'} /> Aplicar
            </Button>
            <Button id="btnSalvar" className="btn btn-warning shadow-2 mb-2" onClick={(e) => Limpar()}>
              <i className={'feather icon-x'} /> Limpar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DashboardParam;
