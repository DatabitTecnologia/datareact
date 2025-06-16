import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Chart from 'react-apexcharts';
import AGGrid from '../../../../../components/AGGrid';
import { apiExec } from '../../../../../api/crudapi';
import { CreateObject } from '../../../../../components/CreateObject';

const AcompanhamentoLucro = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const { contrato, setContrato } = props;
  const [options, setOptions] = React.useState({});
  const [series, setSeries] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'MES', headerName: 'Mês', width: 86 },
      { headerClassName: 'header-list', field: 'VLRRECEITAS', headerName: 'R$ Receitas', width: 87, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'VLRCONSUMO', headerName: 'R$ Cons.', width: 87, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'VLROS', headerName: 'R$ OS', width: 92, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'VLRPIS', headerName: 'R$ PIS.', width: 92, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'VLRCOFINS', headerName: 'R$ COFINS', width: 92, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'VLRIR', headerName: 'R$ IR', width: 92, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'VLRCSLL', headerName: 'R$ CSLL.', width: 92, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'VLRIMPOSTOS', headerName: 'R$ Impostos', width: 92, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'VLRLUCRO', headerName: 'R$ Lucro', width: 92, type: 'number', decimal: 2 }
    ]);
    setFields([
      {
        id: 0,
        campo: 'TB02126_ULTMESES',
        funcao: 'Últimos (Meses)',
        tipo: 'int',
        nome: 'ulmeses',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 9,
        measure: '9rem',
        itens: '12,11,10,9,8,7,6',
        values: '12,11,10,9,8,7,6'
      }
    ]);
  }, []);

  useEffect(() => {
    Filtrar();
  }, [fields]);

  const Filtrar = () => {
    if (valuesfield !== undefined && valuesfield.length > 0) {
      setCarregando(true);
      apiExec("exec SP02192 '" + contrato.codigo + "' ", 'S').then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          setRows(response.data);
        }
      });
    }
  };

  useEffect(() => {
    let tmpoptions = {};
    let xaxis = {};
    let categories = [];
    let tmpseries = [];
    let nameserie = {};
    let itop = 1;
    rows.forEach((element, index) => {
      if (itop <= valuesfield[0]) {
        categories = categories.concat(element.MES);
        if (index === 0) {
          for (var i = 1; i <= 10; i++) {
            if (columns[i] !== undefined) {
              let colunas = Object.values(columns[i]);
              nameserie = {};
              nameserie['name'] = colunas[2];
              nameserie['data'] = [];
              tmpseries = tmpseries.concat(nameserie);
            }
          }
        }
        itop += 1;
      }
    });
    itop = 1;
    rows.forEach((element) => {
      if (itop <= valuesfield[0]) {
        let valores = Object.values(element);
        let valor = [];
        for (var i = 2; i <= 10; i++) {
          valor = valor.concat(valores[i]);
        }
        valor.forEach((value, index2) => {
          tmpseries.forEach((value2, index3) => {
            if (index2 === index3) {
              value2.data = value2.data.concat(value);
            }
          });
        });
        itop += 1;
      }
    });
    xaxis['categories'] = categories;
    tmpoptions['xaxis'] = xaxis;
    setOptions(tmpoptions);
    setSeries([...tmpseries]);
  }, [rows]);

  return (
    <React.Fragment>
      <div id="frmlucro" name="frmlucro">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col style={{ marginLeft: '5px', width: '50%' }}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Demonstrativo de Lucratividade</Card.Title>
              </Card.Header>
              <Row style={{ marginTop: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <AGGrid width="100%" height="356px" rows={rows} columns={columns} loading={carregando}></AGGrid>
                </div>
              </Row>
            </Card>
          </Col>
          <Col style={{ marginLeft: '5px', width: '45%' }}>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Gráfico Evolutivo</Card.Title>
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
                  ></CreateObject>
                ))}
                <Col style={{ marginTop: '30px' }}>
                  <Button id="btnFiltrar" className="btn-primary shadow-2 mb-2" onClick={() => Filtrar()}>
                    <i className={'feather icon-filter'} /> Filtrar
                  </Button>
                </Col>
              </Row>
              <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
                <Chart options={options} series={series} type="area" width="100%" height="278px" />
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AcompanhamentoLucro;
