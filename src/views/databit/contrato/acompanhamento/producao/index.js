import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Chart from 'react-apexcharts';
import AGGrid from '../../../../../components/AGGrid';
import { apiExec } from '../../../../../api/crudapi';
import { CreateObject } from '../../../../../components/CreateObject';

const AcompanhamentoProducao = (props) => {
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
      { headerClassName: 'header-list', field: 'TOTPB', headerName: 'A4 PB', width: 108, type: 'number' },
      { headerClassName: 'header-list', field: 'TOTCOLOR', headerName: 'A4 Color', width: 118, type: 'number' },
      { headerClassName: 'header-list', field: 'TOTDG', headerName: 'Digital.', width: 118, type: 'number' },
      { headerClassName: 'header-list', field: 'TOTGF', headerName: 'A3 PB', width: 118, type: 'number' },
      { headerClassName: 'header-list', field: 'TOTGFC', headerName: 'A3 Color', width: 118, type: 'number' },
      { headerClassName: 'header-list', field: 'TOTSERV', headerName: 'Serviços', width: 118, type: 'number' },
      { headerClassName: 'header-list', field: 'TOTAL', headerName: 'Total', width: 118, type: 'number' }
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
      apiExec("exec SP02254 '" + contrato.codigo + "' ", 'S').then((response) => {
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
    if (rows !== undefined && rows.length > 0) {
      rows.forEach((element, index) => {
        if (itop <= valuesfield[0]) {
          categories = categories.concat(element.MES);
          if (index === 0) {
            for (var i = 1; i <= 8; i++) {
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
          for (var i = 2; i <= 8; i++) {
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
    }
    xaxis['categories'] = categories;
    tmpoptions['xaxis'] = xaxis;
    setOptions(tmpoptions);
    setSeries([...tmpseries]);
  }, [rows]);

  return (
    <React.Fragment>
      <div id="frmproducao" name="frmproducao">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col style={{ marginLeft: '5px', width: '50%' }}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Produção de Páginas</Card.Title>
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

export default AcompanhamentoProducao;
