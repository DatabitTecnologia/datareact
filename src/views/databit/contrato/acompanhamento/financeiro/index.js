import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import AGGrid from '../../../../../components/AGGrid';
import { apiExec, apiFields, apiList } from '../../../../../api/crudapi';
import { CreateObject } from '../../../../../components/CreateObject';

const AcompanhamentoFinanceiro = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const { contrato, setContrato } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [validations, setValidations] = React.useState([]);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'TB04010_CODIGO', headerName: 'Título', width: 96 },
      { headerClassName: 'header-list', field: 'TB04010_DATA', headerName: 'Emissão', width: 110, type: 'date' },
      { headerClassName: 'header-list', field: 'TB04010_MES', headerName: 'Mês', width: 86 },
      { headerClassName: 'header-list', field: 'TB04010_CODEMP', headerName: 'Emp.', width: 55 },
      { headerClassName: 'header-list', field: 'TB04010_DTVENC', headerName: 'Venc.', width: 110, type: 'date' },
      { headerClassName: 'header-list', field: 'TB04010_NOME', headerName: 'Histórico', width: 398 },
      { headerClassName: 'header-list', field: 'TB04003_NOME', headerName: 'Tipo Documento', width: 300 },
      { headerClassName: 'header-list', field: 'TB04010_VLRBRUTO', headerName: 'R$ Bruto', width: 118, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'TB04010_VLRACRES', headerName: 'R$ Acres.', width: 118, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'TB04010_VLRDESCONTO', headerName: 'R$ Desc.', width: 118, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'TB04010_VLRTITULO', headerName: 'R$ Título', width: 118, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'TB04011_DTBAIXA', headerName: 'Baixa', width: 100, decimal: 2, type: 'date' },
      { headerClassName: 'header-list', field: 'TB04010_VLRPAGO', headerName: 'R$ Pago', width: 118, type: 'number', decimal: 2 }
    ]);
    let tmpvalidations = [];

    let validation = {};
    validation['campo'] = ['STATUSREAL', 'STATUSREAL', 'STATUSREAL', 'STATUSREAL', 'STATUSREAL'];
    validation['sinal'] = [1, 1, 1, 1, 1];
    validation['tipotab'] = 'G';
    validation['valorval'] = [0, 1, 2, 3, 4];
    validation['cor'] = ['#ffff', '#ffff99', '#66ccff', '#66ffff', '#99ffcc'];
    validation['total'] = 4;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);

    setFields([
      {
        id: 0,
        campo: 'TB04010_STATUSREAL',
        funcao: 'Situação dos Títulos',
        tipo: 'int',
        nome: 'statusreal',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 15,
        measure: '15rem',
        itens:
          'Todos os Títulos,Títulos em Aberto,Títulos Vencidos,Títulos á Vencer,Pagos(Todos),Pagos(Definitivo),Pagos(Aguardando),Previsão de Contratos',
        values: '0,1,2,3,4,5,6,7'
      }
    ]);
  }, []);

  useEffect(() => {
    Filtrar();
  }, [fields]);

  const Filtrar = () => {
    if (valuesfield !== undefined && valuesfield.length > 0) {
      setCarregando(true);
      apiFields(
        'ReceberVW',
        'TB04010_CODIGO,TB04010_DATA,TB04010_MES,TB04010_CODEMP,TB04010_DTVENC,TB04010_NOME,TB04003_NOME,TB04010_VLRBRUTO,TB04010_VLRACRES,TB04010_VLRDESCONTO,TB04010_VLRTITULO,TB04011_DTBAIXA,TB04010_VLRPAGO,STATUSREAL',
        '',
        "TB04010_CONTRATO = '" + contrato.codigo + "' " + filter
      ).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          setRows(response.data);
        }
      });
    }
  };

  useEffect(() => {}, [rows]);

  useEffect(() => {
    let tipo = parseInt(valuesfield[0]);
    setFilter('');
    switch (tipo) {
      case 1: {
        setFilter(' AND TB04010_VLRPAGO = 0 AND TB04010_VLRTITULO > 0');
        break;
      }
      case 2: {
        setFilter(
          ' AND TB04010_VLRPAGO = 0 AND CAST(CONVERT(VARCHAR(10),TB04010_DTVENC,101) AS DATETIME) < GETDATE() AND TB04010_VLRTITULO > 0'
        );
        break;
      }
      case 3: {
        setFilter(
          ' AND TB04010_VLRPAGO = 0 AND CAST(CONVERT(VARCHAR(10),TB04010_DTVENC,101) AS DATETIME) >= GETDATE() AND TB04010_VLRTITULO > 0'
        );
        break;
      }
      case 4: {
        setFilter(' AND TB04010_VLRPAGO > 0 AND TB04010_VLRTITULO > 0 ');
        break;
      }
      case 5: {
        setFilter(' AND TB04010_VLRPAGO > 0 and TB04010_STATUSREC <> 2 AND TB04010_VLRTITULO > 0 ');
        break;
      }
      case 6: {
        setFilter(' AND TB04010_VLRPAGO > 0 and TB04010_STATUSREC = 2 AND TB04010_VLRTITULO > 0 ');
        break;
      }
      case 7: {
        setFilter(" AND TB04010_PROVISAO = 'S' ");
        break;
      }
    }
  }, [valuesfield[0]]);
  return (
    <React.Fragment>
      <div id="frmfinanceiro" name="frmfinanceiro">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col style={{ marginLeft: '5px' }}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Informações Financeiras</Card.Title>
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

                <Col style={{ marginTop: '35px' }}>
                  <Row>
                    <Col lg={2}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#ffff99', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Títulos Vencídos
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: '35px' }}>
                  <Row>
                    <Col lg={2}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#fff', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Títulos à Vencer
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: '35px' }}>
                  <Row>
                    <Col lg={2}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#66ccff', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Pagos (Definitivo)
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: '35px' }}>
                  <Row>
                    <Col lg={2}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#66ffff', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Pagos (Aguardando)
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: '35px' }}>
                  <Row>
                    <Col lg={2}>
                      <div style={{ height: '25px', width: '25px', backgroundColor: '#99ffcc', border: 'solid', borderWidth: '2px' }}></div>
                    </Col>
                    <Col>
                      <p style={{ marginTop: '4px' }} className="text-muted">
                        Previsões de Contratos
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <AGGrid width="100%" height="295px" rows={rows} columns={columns} loading={carregando} validations={validations}></AGGrid>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AcompanhamentoFinanceiro;
