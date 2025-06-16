import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Chart from 'react-apexcharts';
import AGGrid from '../../../../../components/AGGrid';
import { apiExec } from '../../../../../api/crudapi';
import { CreateObject } from '../../../../../components/CreateObject';

const AcompanhamentoOs = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const { contrato, setContrato } = props;
  const [options, setOptions] = React.useState({});
  const [series, setSeries] = React.useState([]);
  const [options2, setOptions2] = React.useState({});
  const [series2, setSeries2] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [fields2, setFields2] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [rows2, setRows2] = React.useState([]);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'CODIGO', headerName: 'Código', width: 110 },
      { headerClassName: 'header-list', field: 'NOME', headerName: 'Descrição', width: 415 },
      { headerClassName: 'header-list', field: 'QTDE', headerName: 'Quant.', width: 135, type: 'number' },
      { headerClassName: 'header-list', field: 'VALOR', headerName: 'Custo', width: 135, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'PERC', headerName: '%', width: 105, type: 'number', decimal: 2 }
    ]);
    //setCarregando(true);

    setFields([
      {
        id: 0,
        campo: 'TB02126_MES',
        funcao: 'Meses',
        tipo: 'varchar',
        nome: 'mes',
        tamanho: 7,
        tipoobject: 12,
        widthfield: 7,
        measure: '7rem',
        tabelaref: 'VW02193',
        campolist: 'TB02126_MES',
        camporefdrop: 'TB02126_MES',
        filteraux:
          "TB02126_CONTRATO = '" +
          contrato.codigo +
          "' ORDER BY cast(substring(TB02126_MES,1,2)+'/01/'+substring(TB02126_MES,4,4) AS DATETIME) DESC",
        firstdefault: true
      },
      {
        id: 1,
        campo: 'TB02126_OPTIONS',
        funcao: 'Opções de Visualização',
        tipo: 'int',
        nome: 'options',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 40,
        measure: '40rem',
        itens: 'Técnico,Condição Final,Equipamento',
        values: '1,2,3'
      }
    ]);
    setFields2([
      {
        id: 2,
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
      },
      {
        id: 3,
        campo: 'TB02126_TIPO',
        funcao: 'Campo de Visualização',
        tipo: 'int',
        nome: 'tipo',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 15,
        measure: '15rem',
        itens: 'Quantidade,Valor',
        values: '0,1'
      }
    ]);
  }, []);

  useEffect(() => {
    valuesfield[1] = 1;
    valuesfield[3] = 0;
    setValuesfield([...valuesfield]);
  }, [fields2]);

  useEffect(() => {
    Filtrar();
  }, [valuesfield]);

  const Filtrar = () => {
    if (valuesfield !== undefined && valuesfield.length > 0) {
      setCarregando(true);
      let resultado = [];
      apiExec("exec SP02190 '" + contrato.codigo + "'," + valuesfield[1], 'S').then((response) => {
        if (response.status === 200) {
          resultado = response.data;
          if (resultado !== undefined && resultado.length > 0) {
            let resultado2 = resultado.filter((item) => item.MES === valuesfield[0]);
            setRows(resultado2);
            apiExec("exec SP02191 '" + contrato.codigo + "' ", 'S').then((response) => {
              setRows2(response.data);
              setCarregando(false);
            });
          } else {
            setCarregando(false);
          }
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
    nameserie = {};
    if (valuesfield[3] === 0) {
      nameserie['name'] = 'Quantidade';
    } else {
      nameserie['name'] = 'Valor R$';
    }
    nameserie['data'] = [];
    tmpseries = tmpseries.concat(nameserie);
    if (rows2 !== undefined && rows2.length > 0) {
      rows2.forEach((element) => {
        if (itop <= 10) {
          categories = categories.concat(element.MES);
          if (valuesfield[3] === 0) {
            nameserie['data'] = nameserie['data'].concat(element.QTDE);
          } else {
            nameserie['data'] = nameserie['data'].concat(element.VALOR);
          }
          itop += 1;
        }
      });
    }
    xaxis['categories'] = categories;
    tmpoptions['xaxis'] = xaxis;
    setOptions(tmpoptions);
    setSeries([...tmpseries]);
  }, [rows2]);

  useEffect(() => {
    let tmpoptions = {};
    let tmpseries = [];
    let categories = [];
    let itop = 1;
    if (rows !== undefined && rows.length > 0) {
      rows.forEach((element) => {
        if (itop <= parseInt(valuesfield[2])) {
          categories = categories.concat(element.NOME);
          tmpseries = tmpseries.concat(element.VALOR);
          itop += 1;
        }
      });
    }
    tmpoptions['labels'] = categories;
    setOptions2(tmpoptions);
    setSeries2([...tmpseries]);
  }, [rows]);

  return (
    <React.Fragment>
      <div id="frmos" name="frmos">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col style={{ marginLeft: '5px', width: '50%' }}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Informações de Ordens de Serviço</Card.Title>
              </Card.Header>
              <div>
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
              </div>
              <Row style={{ marginTop: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <AGGrid width="100%" height="314px" rows={rows} columns={columns} loading={carregando}></AGGrid>
                </div>
              </Row>
            </Card>
          </Col>
          <Col style={{ marginLeft: '5px', width: '45%' }}>
            <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
              <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
                <Card.Header>
                  <Card.Title as="h5">Gráfico de Informações (Top 10)</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Chart options={options2} series={series2} type="pie" width="100%" height="347px" />
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Gráfico Evolutivo</Card.Title>
              </Card.Header>
              <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                {fields2.map((field, index) => (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fields2}
                    valuesfield={valuesfield}
                    setValuesfield={(data) => setValuesfield(data)}
                    valuesfield2={valuesfield2}
                    setValuesfield2={(data) => setValuesfield2(data)}
                  ></CreateObject>
                ))}
              </Row>
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

export default AcompanhamentoOs;
