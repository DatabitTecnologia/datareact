import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiInsert, apiDelete } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';
import { getSystem } from '../../../../api/apiconnect';
import { Decode64 } from '../../../../utils/crypto';

const DashboardSystem = (props) => {
  const { dashboard, disabled } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [rows2, setRows2] = React.useState([]);
  const [columns2, setColumns2] = React.useState([]);
  const [itemselec, setItemselec] = React.useState([]);
  const [itemselec2, setItemselec2] = React.useState([]);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'id', headerName: 'ID', width: 80 },
      { headerClassName: 'header-list', field: 'name', headerName: 'Descrição Sistema', width: 340 }
    ]);
    setColumns2([
      { headerClassName: 'header-list', field: 'system', headerName: 'ID', width: 80 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição Sistema', width: 340 }
    ]);
    Filtrar();
  }, []);

  useEffect(() => {
    if (rows2 !== undefined) {
      filterSystem();
    }
  }, [rows2]);

  const Filtrar = () => {
    setCarregando(true);
    apiList('DashboardSystem', 'TB00119_DASHBOARD,TB00119_SYSTEM,TB00119_NOME', '', "TB00119_DASHBOARD ='" + dashboard.codigo + "' ").then(
      (response) => {
        if (response.status === 200) {
          setRows2(response.data);
          setCarregando(false);
        }
      }
    );
  };

  const filterSystem = () => {
    let systems = '';
    rows2.forEach((item) => {
      systems = systems + '(' + item.system + '),';
    });
    setRows([]);
    getSystem(Decode64(sessionStorage.getItem('urlconnect'))).then((response) => {
      if (response.status === 200) {
        let tmpvalue = response.data;
        let value = [];
        if (systems !== '') {
          value = tmpvalue.filter((x) => !systems.includes('(' + x.id + ')'));
        } else {
          value = tmpvalue;
        }
        setRows(value);
      }
    });
  };

  const Add = (system) => {
    if (system !== undefined) {
      let item = {};
      item['dashboard'] = dashboard.codigo;
      item['system'] = system.id;
      item['nome'] = system.name;
      setCarregando(true);
      apiInsert('DashboardSystem', item).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          Filtrar();
        }
      });
    }
  };

  const Subtract = (system) => {
    if (system !== undefined) {
      const item = {};
      item['dashboard'] = dashboard.codigo;
      item['system'] = system.system;
      setCarregando(true);
      apiDelete('DashboardSystem', item).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          Filtrar();
        }
      });
    }
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      if (disabled) {
        setItemselec(newSelection);
        Add(newSelection);
      }
    }
  };

  const dblClickGrid = (newSelection) => {
    if (disabled) {
      setItemselec(newSelection);
      Add(newSelection);
    }
  };

  const keyGrid2 = (newSelection, event) => {
    if (event.key === 'Enter') {
      if (disabled) {
        setItemselec2(newSelection);
        Subtract(newSelection);
      }
    }
  };

  const dblClickGrid2 = (newSelection) => {
    if (disabled) {
      setItemselec2(newSelection);
      Subtract(newSelection);
    }
  };

  return (
    <React.Fragment>
      <div id="frmdashmodule" name="frmdashmodule">
        <Row>
          <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
          <Row>
            <Col>
              <Row style={{ marginLeft: '5px' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '46%' }}>
                    <Row>
                      <AGGrid
                        width="100%"
                        height="568px"
                        rows={rows}
                        loading={carregando}
                        columns={columns}
                        item={itemselec}
                        setItem={(data) => setItemselec(data)}
                        onKeyDown={keyGrid}
                        onDoubleClick={dblClickGrid}
                      ></AGGrid>
                    </Row>
                  </div>
                  <div style={{ width: '7%', marginLeft: '16px' }}>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Row style={{ marginLeft: '5px' }}>
                      <Button id="btnAddlist" className="btn-icon" onClick={() => Add(itemselec)} disabled={!disabled}>
                        <i className={'feather icon-chevron-right'} />
                      </Button>
                      <Button id="btnRetlist" className="btn-icon" onClick={() => Subtract(itemselec2)} disabled={!disabled}>
                        <i className={'feather icon-chevron-left'} />
                      </Button>
                    </Row>
                    <br></br>
                  </div>
                  <div style={{ width: '46%' }}>
                    <Row>
                      <AGGrid
                        width="100%"
                        height="568px"
                        rows={rows2}
                        loading={carregando}
                        columns={columns2}
                        item={itemselec2}
                        setItem={(data) => setItemselec2(data)}
                        onKeyDown={keyGrid2}
                        onDoubleClick={dblClickGrid2}
                      ></AGGrid>
                    </Row>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DashboardSystem;
