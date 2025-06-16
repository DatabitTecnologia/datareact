import React, { useEffect, useState } from 'react';
import { CreateObject } from '../../../../components/CreateObject';
import AGGrid from '../../../../components/AGGrid';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiInsert, apiExec } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';

const ClienteCondicao = (props) => {
  const [fieldsfilter, setFieldsfilter] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columnsselec, setColumnsselec] = React.useState([]);
  const [rowsselect, setRowsselect] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [statusprocessa, setStatusprocessa] = React.useState();
  const [itemselect, setItemselect] = React.useState();
  const [itemselect2, setItemselect2] = React.useState();
  const [filtered, setFiltered] = React.useState(false);

  const Filtrar = () => {
    setCarregando(true);
    apiList(
      'Condicaorec',
      '*',
      '',
      "TB01014_SITUACAO = 'A' AND NOT EXISTS (SELECT TB01153_CONDPAG FROM TB01153 WHERE TB01153_CONDPAG = TB01014_CODIGO AND TB01153_CODCLI =  '" +
        valuesfield[0] +
        "') order by TB01014_NOME"
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
      }
    });

    apiList('ClienteCondicaoVW', '*', 'TB01153_CONDPAG as codigo', "TB01153_CODCLI= '" + valuesfield[0] + "' order by TB01014_NOME ").then(
      (response) => {
        if (response.status === 200) {
          setRowsselect(response.data);
          setFiltered(true);
          setCarregando(false);
        }
      }
    );
  };

  useEffect(() => {
    setFieldsfilter([
      {
        id: 0,
        campo: 'codcli',
        funcao: 'Parceiro',
        tipo: 'varchar',
        nome: 'codcli',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 42,
        measure: '42rem',
        tabelaref: 'TB01008',
        widthname: 33,
        disabled: false
      }
    ]);
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 80 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição da Condição', width: 630 }
    ]);
    setColumnsselec([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 80 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição da Condição', width: 630 }
    ]);
  }, []);

  useEffect(() => {
    if (parseInt(sessionStorage.getItem('perfil')) === 2) {
      valuesfield[0] = Decode64(sessionStorage.getItem('partner'));
    }
  }, [fieldsfilter]);

  useEffect(() => {
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined && valuesfield[0] !== null) {
      Filtrar();
    }
  }, [valuesfield[0]]);

  const Add = (item) => {
    if (item !== undefined) {
      const rowsbkp1 = rows.slice(0, rows.length);
      const i = rowsbkp1.findIndex((x) => x === item);
      rowsbkp1.splice(i, 1);
      item.id = rowsselect.length + 1;
      const rowsbkp2 = rowsselect.concat(item);
      setRows(rowsbkp1);
      setRowsselect(rowsbkp2);
    }
  };

  const Subtract = (item) => {
    if (item !== undefined) {
      const rowsbkp1 = rowsselect.slice(0, rowsselect.length);
      const i = rowsbkp1.findIndex((x) => x === item);
      rowsbkp1.splice(i, 1);
      item.id = rows.length + 1;
      const rowsbkp2 = rows.concat(item);
      setRows(rowsbkp2);
      setRowsselect(rowsbkp1);
    }
  };

  const Salvar = () => {
    setCarregando(true);
    let iteminsert = {};
    setStatusprocessa('Gravando informações, aguarde');
    apiExec("DELETE FROM TB01153 WHERE TB01153_CODCLI = '" + valuesfield[0] + "' ", 'N').then((response) => {
      if (response.status === 200) {
        rowsselect.forEach((item) => {
          iteminsert['codcli'] = valuesfield[0];
          iteminsert['condpag'] = item.codigo;
          apiInsert('ClienteCondicao', iteminsert).then((response) => {
            if (response.status === 200) {
              setStatusprocessa('');
            }
          });
        });
        setCarregando(false);
        setStatusprocessa('Operação realizada com Sucesso !');
      }
    });
  };

  const clickGrid = (newSelection) => {
    setItemselect(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    Add(newSelection);
  };

  const keyGrid = (newSelection, event) => {
    setItemselect(newSelection);
    if (event.key === 'Enter') {
      Add(newSelection);
    }
  };

  const clickGrid2 = (newSelection) => {
    setItemselect2(newSelection);
  };

  const dblClickGrid2 = (newSelection) => {
    Subtract(newSelection);
  };

  const keyGrid2 = (newSelection, event) => {
    setItemselect2(newSelection);
    if (event.key === 'Enter') {
      Subtract(newSelection);
    }
  };

  return (
    <React.Fragment>
      <div id="frmclientecondicao" name="frmclientecondicao">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Definição de Condições de Pagamento</Card.Title>
            </Card.Header>
            <Row style={{ marginLeft: '5px' }}>
              <Col>
                <Row>
                  {fieldsfilter.map((field, index) => (
                    <CreateObject
                      key={index}
                      field={field}
                      index={field.id}
                      fields={fieldsfilter}
                      valuesfield={valuesfield}
                      setValuesfield={(data) => setValuesfield(data)}
                      valuesfield2={valuesfield2}
                      setValuesfield2={(data) => setValuesfield2(data)}
                      disabled={parseInt(sessionStorage.getItem('perfil')) === 2}
                    ></CreateObject>
                  ))}
                </Row>
              </Col>
              <Col style={{ textAlign: 'right', marginTop: '30px' }}>
                <Button id="btnFiltrar" className="btn btn-success shadow-2 mb-2" onClick={() => Filtrar()}>
                  <i className={'feather icon-filter'} /> Filtrar
                </Button>
              </Col>
            </Row>
          </Card>
        </Row>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Listagem de Condições de Pagamento</Card.Title>
            </Card.Header>
            {filtered ? (
              <Row style={{ marginTop: '10px' }}>
                <Col>
                  <Button id="btnGravar" className="btn btn-success shadow-2 mb-2" onClick={() => Salvar()}>
                    <i className={'feather icon-save'} /> Salvar alterações
                  </Button>
                  <Button id="btnRefazer" className="btn btn-warning shadow-2 mb-2" onClick={() => Filtrar()}>
                    <i className={'feather icon-repeat'} /> Refazer Listagem
                  </Button>
                </Col>
              </Row>
            ) : (
              <></>
            )}

            <Row style={{ display: 'flex', height: '60%' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '48%', marginRight: '5px' }}>
                  <AGGrid
                    width="100%"
                    height="410px"
                    rows={rows}
                    columns={columns}
                    loading={carregando}
                    onKeyDown={keyGrid}
                    onDoubleClick={dblClickGrid}
                    onCelClick={clickGrid}
                  ></AGGrid>
                </div>
                <div style={{ width: '4%', marginLeft: '30px' }}>
                  <Row>
                    <Button id="btnAddlist" className="btn-icon" onClick={() => Add(itemselect)}>
                      <i className={'feather icon-chevron-right'} />
                    </Button>
                    <Button id="btnRetlist" className="btn-icon" onClick={() => Subtract(itemselect2)}>
                      <i className={'feather icon-chevron-left'} />
                    </Button>
                  </Row>
                </div>
                <div style={{ width: '48%', marginLeft: '5px' }}>
                  <AGGrid
                    width="100%"
                    height="410px"
                    rows={rowsselect}
                    columns={columnsselec}
                    loading={carregando}
                    onKeyDown={keyGrid2}
                    onDoubleClick={dblClickGrid2}
                    onCelClick={clickGrid2}
                  ></AGGrid>
                </div>
              </div>
              <span className="h6">{statusprocessa}</span>
            </Row>
          </Card>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ClienteCondicao;
