import React, { useEffect } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import AGGrid from '../../../../../components/AGGrid';
import { apiFind, apiExec } from '../../../../../api/crudapi';
import { Decode64 } from '../../../../../utils/crypto';
import { CreateObject } from '../../../../../components/CreateObject';

const ProdutoConsultaTabela = (props) => {
  const { produto } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'CODIGO', headerName: 'Código', width: 80 },
      { headerClassName: 'header-list', field: 'NOME', headerName: 'Descrição Tabela', width: 630 },
      { headerClassName: 'header-list', field: 'VALOR', headerName: 'Valor', width: 150, type: 'number', decimal: 2 }
    ]);
    valuesfield[0] = Decode64(sessionStorage.getItem('enterprise'));
    setFields([
      {
        id: 0,
        campo: 'TB02001_CADEMP',
        funcao: 'Empresa',
        tipo: 'varchar',
        nome: 'cademp',
        tipoobject: 12,
        tamanho: 8,
        widthfield: 33,
        measure: '33rem',
        tabelaref: 'TB01007',
        campolist: 'TB01007_NOME',
        camporefdrop: 'TB01007_CODIGO',
        filteraux: "TB01007_NOME <> '' AND TB01007_NOME IS NOT NULL ",
        firstdefault: true
      },
      {
        id: 1,
        campo: 'TB02001_OPERACAO',
        funcao: 'Operação',
        tipo: 'varchar',
        nome: 'operacao',
        tipoobject: 12,
        tamanho: 2,
        widthfield: 33,
        measure: '33rem',
        tabelaref: 'TB01022',
        campolist: 'TB01022_NOME',
        camporefdrop: 'TB01022_CODIGO',
        filteraux: "TB01022_NOME <> '' AND TB01022_NOME IS NOT NULL ",
        firstdefault: true
      },
      {
        id: 2,
        campo: 'TB02001_CONDPAG',
        funcao: 'Condição',
        tipo: 'varchar',
        nome: 'condpag',
        tipoobject: 12,
        tamanho: 2,
        widthfield: 20,
        measure: '20rem',
        tabelaref: 'TB01014',
        campolist: 'TB01014_NOME',
        camporefdrop: 'TB01014_CODIGO',
        filteraux: "TB01014_NOME <> '' AND TB01014_NOME IS NOT NULL ",
        firstdefault: true
      },
      {
        id: 3,
        campo: 'TB02001_VENDACONS',
        funcao: 'Venda pra Consumo',
        tipo: 'varchar',
        nome: 'condpag',
        tipoobject: 11,
        tamanho: 1,
        widthfield: 9,
        measure: '9rem',
        itens: 'Sim,Não',
        values: 'S,N',
        firstdefault: true
      }
    ]);
    Processar();
  }, [produto]);

  const Processar = () => {
    setCarregando(true);
    const sql =
      "exec SP00015 '" +
      valuesfield[0] +
      "','" +
      produto +
      "','" +
      valuesfield[1] +
      "','" +
      valuesfield[2] +
      "','" +
      'ZZZZZZZ' +
      "','" +
      valuesfield[3] +
      "','" +
      Decode64(sessionStorage.getItem('user')) +
      "','" +
      0 +
      "'";
    apiExec(sql, 'S').then((response) => {
      setCarregando(false);
      setRows(response.data);
    });
  };

  return (
    <React.Fragment>
      <div id="frmtabela" name="frmtabela">
        <Card className="Recent-Users">
          <Row style={{ marginLeft: '2px', marginBottom: '10px' }}>
            <Col lg={4}>
              <Row style={{ marginBottom: '4px' }}>
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
                    disabled={false}
                  ></CreateObject>
                ))}
              </Row>
              <Row style={{ textAlign: 'center' }}>
                <Col>
                  <Button id="btnProcessar" className="btn-primary" onClick={(e) => Processar()}>
                    <i className={'feather icon-tag'} /> Processar
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col lg={8}>
              <Row style={{ marginTop: '5px', marginRight: '2px', marginLeft: '2px' }}>
                <AGGrid width="100%" height="280px" rows={rows} columns={columns} loading={carregando}></AGGrid>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default ProdutoConsultaTabela;
