import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Chart from 'react-apexcharts';
import AGGrid from '../../../../../components/AGGrid';
import { apiList } from '../../../../../api/crudapi';

const AcompanhamentoFatura = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const { contrato, setContrato } = props;
  const [options, setOptions] = React.useState({});
  const [series, setSeries] = React.useState([]);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'mes', headerName: 'Mês', width: 86 },
      { headerClassName: 'header-list', field: 'vlrcontr', headerName: 'R$ Fixo', width: 95, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'vlrpb', headerName: 'R$ A4 PB', width: 105, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'vlrcor', headerName: 'R$ A4 Cor', width: 105, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'vlrdg', headerName: 'R$ Digit.', width: 105, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'vlrgf', headerName: 'R$ A3 PB', width: 105, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'vlrgfc', headerName: 'R$ A3 COR', width: 105, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'vlrdesc', headerName: 'R$ Desc.', width: 102, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'vlrtotal', headerName: 'R$ Total.', width: 105, type: 'number', decimal: 2 }
    ]);
    setCarregando(true);
    apiList(
      'ContratoFaturaVW',
      'TB02126_MES,TB02126_VLRCONTR,TB02126_VLRPB,TB02126_VLRCOR,TB02126_VLRDG,TB02126_VLRGF,Tb02126_VLRGFC,TB02126_VLRDESC,TB02126_VLRTOTAL',
      '',
      "TB02126_CONTRATO = '" +
        contrato.codigo +
        "' ORDER BY cast(substring(TB02126_MES,1,2)+'/01/'+substring(TB02126_MES,4,4) AS DATETIME) DESC ",
      12
    ).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setRows(response.data);
      }
    });
  }, []);

  useEffect(() => {
    let tmpoptions = {};
    let xaxis = {};
    let categories = [];
    let tmpseries = [];
    let nameserie = {};

    rows.forEach((element, index) => {
      categories = categories.concat(element.mes);
      if (index === 0) {
        for (var i = 1; i < 10; i++) {
          if (columns[i] !== undefined) {
            let colunas = Object.values(columns[i]);
            nameserie = {};
            nameserie['name'] = colunas[2];
            nameserie['data'] = [];
            tmpseries = tmpseries.concat(nameserie);
          }
        }
      }
    });
    rows.forEach((element) => {
      let valores = Object.values(element);
      let valor = [];
      for (var i = 2; i < 10; i++) {
        valor = valor.concat(valores[i]);
      }
      valor.forEach((value, index2) => {
        tmpseries.forEach((value2, index3) => {
          if (index2 === index3) {
            value2.data = value2.data.concat(value);
          }
        });
      });
    });
    xaxis['categories'] = categories;
    tmpoptions['xaxis'] = xaxis;
    setOptions(tmpoptions);
    setSeries([...tmpseries]);
  }, [rows]);

  return (
    <React.Fragment>
      <div id="frmfatura" name="frmfatura">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col lg={6} style={{ marginLeft: '5px' }}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Últimos Faturamentos (12 Meses)</Card.Title>
              </Card.Header>
              <Row style={{ marginTop: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <AGGrid width="100%" height="356px" rows={rows} columns={columns} loading={carregando}></AGGrid>
                </div>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Gráfico Evolutivo</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
                <Chart options={options} series={series} type="area" width="100%" height="355px" />
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AcompanhamentoFatura;
