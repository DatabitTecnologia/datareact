import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiGetPicturelist, apiInsert, apiDelete } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';
import user from '../../../../assets/images/databit/User.png';

const DashboardUser = (props) => {
  const { dashboard, disabled } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const [columns2, setColumns2] = React.useState([]);
  const [filteruser, setFilteruser] = React.useState('');
  const [filteruser2, setFilteruser2] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [users2, setUsers2] = React.useState([]);
  const [userselec, setUserselec] = React.useState([]);
  const [userselec2, setUserselec2] = React.useState([]);

  useEffect(() => {
    setColumns([
      {
        headerClassName: 'header-list',
        field: 'picture',
        headerName: '',
        width: 75,
        renderCell: (params) => {
          if (params.data.picture !== 'MHg=') {
            return (
              <img
                src={`data:image/jpeg;base64,${params.data.picture}`}
                alt={params.data.NOME}
                className="rounded-circle"
                width="55"
                height="55"
              />
            );
          } else {
            return <img src={user} alt={params.data.NOME} className="rounded-circle" width="55" height="55" />;
          }
        }
      },
      {
        headerClassName: 'header-list',
        field: 'contato',
        headerName: 'Listagem de Usuários',
        width: 390,
        renderCell: (params) => {
          return (
            <Row style={{ textAlign: 'left', padding: '4px 4px 4px 4px' }}>
              <h6 style={{ fontSize: '14px' }}>{params.data.NOME}</h6>
              <Row>
                <Col lg={10}>
                  <h6 style={{ fontSize: '11px' }}>Setor: {params.data.SETOR}</h6>
                </Col>
              </Row>
              <Row>
                <Col lg={10}>
                  <h6 style={{ fontSize: '11px' }}>Email: {params.data.EMAIL}</h6>
                </Col>
              </Row>
            </Row>
          );
        }
      }
    ]);
    setColumns2([
      {
        headerClassName: 'header-list',
        field: 'picture',
        headerName: '',
        width: 75,
        renderCell: (params) => {
          if (params.data.picture !== 'MHg=') {
            return (
              <img
                src={`data:image/jpeg;base64,${params.data.picture}`}
                alt={params.data.NOME}
                className="rounded-circle"
                width="55"
                height="55"
              />
            );
          } else {
            return <img src={user} alt={params.data.NOME} className="rounded-circle" width="55" height="55" />;
          }
        }
      },
      {
        headerClassName: 'header-list',
        field: 'contato',
        headerName: 'Usuários selecionados',
        width: 390,
        renderCell: (params) => {
          return (
            <Row style={{ textAlign: 'left', padding: '4px 4px 4px 4px' }}>
              <h6 style={{ fontSize: '14px' }}>{params.data.NOME}</h6>
              <Row>
                <Col lg={10}>
                  <h6 style={{ fontSize: '11px' }}>Setor: {params.data.SETOR}</h6>
                </Col>
              </Row>
              <Row>
                <Col lg={10}>
                  <h6 style={{ fontSize: '11px' }}>Email: {params.data.EMAIL}</h6>
                </Col>
              </Row>
            </Row>
          );
        }
      }
    ]);
    setCarregando(true);
    FilterUserAll();
  }, []);

  const FilterUserAll = () => {
    if (dashboard !== undefined && dashboard !== '') {
      let filter = " NOT EXISTS (SELECT * FROM TB00117 WHERE TB00117_USER = NOME AND TB00117_DASHBOARD = '" + dashboard.codigo + "') ";
      if (filteruser !== undefined && filteruser !== '') {
        filter = filter + " AND NOME LIKE '" + filteruser + "%' ";
      }
      filter = filter + ' ORDER BY NOME ';
      setCarregando(true);
      apiGetPicturelist('VW00020', 'NOME', 'PHOTO', filter, 'NOME,SETOR,EMAIL', '').then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
          setCarregando(false);
          FilterUserSelec();
        }
      });
    }
  };

  const FilterUserSelec = () => {
    if (dashboard !== undefined && dashboard !== '') {
      let filter = " DASHBOARD = '" + dashboard.codigo + "' ";
      if (filteruser2 !== undefined && filteruser2 !== '') {
        filter = filter + " AND NOME LIKE '" + filteruser2 + "%' ";
      }

      filter = filter + ' ORDER BY NOME ';
      setCarregando(true);
      apiGetPicturelist('VW00023', 'CHAVE', 'PHOTO', filter, 'NOME,DASHBOARD,SETOR,EMAIL', '').then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setCarregando(false);
          setUsers2(response.data);
        }
      });
    }
  };

  const Add = (user) => {
    if (user !== undefined) {
      const item = {};
      item['user'] = user.NOME;
      item['dashboard'] = dashboard.codigo;
      setCarregando(true);
      apiInsert('DashboardUser', item).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          const rowsbkp1 = users.slice(0, users.length);
          const i = rowsbkp1.findIndex((x) => x.NOME === user.NOME);
          rowsbkp1.splice(i, 1);
          setUsers(rowsbkp1);
          FilterUserAll();
        }
      });
    }
  };

  const Subtract = (user) => {
    if (user !== undefined) {
      const item = {};
      item['user'] = user.NOME;
      item['dashboard'] = dashboard.codigo;
      setCarregando(true);
      apiDelete('DashboardUser', item).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          const rowsbkp1 = users2.slice(0, users2.length);
          const i = rowsbkp1.findIndex((x) => x.NOME === user.NOME);
          rowsbkp1.splice(i, 1);
          setUsers2(rowsbkp1);
          FilterUserAll();
        }
      });
    }
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      if (!disabled) {
        setUserselec(newSelection);
        Add(newSelection);
      }
    }
  };

  const dblClickGrid = (newSelection) => {
    if (disabled) {
      setUserselec(newSelection);
      Add(newSelection);
    }
  };

  const keyGrid2 = (newSelection, event) => {
    if (event.key === 'Enter') {
      if (disabled) {
        setUserselec2(newSelection);
        Subtract(newSelection);
      }
    }
  };

  const dblClickGrid2 = (newSelection) => {
    if (disabled) {
      setUserselec(newSelection);
      Subtract(newSelection);
    }
  };

  const handleChangeuser = (e) => {
    setFilteruser(e.target.value);
  };

  const handleChangeuser2 = (e) => {
    setFilteruser2(e.target.value);
  };

  return (
    <React.Fragment>
      <div id="frmdashuser" name="frmdashuser">
        <Row>
          <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
          <Row>
            <Col>
              <Row style={{ marginLeft: '10px', marginTop: '10px' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '47%', marginRight: '5px', marginBottom: '10px' }}>
                    <Row>
                      <Col style={{ marginBottom: '10px' }}>
                        <input
                          id="edtprocurar"
                          onChange={(e) => handleChangeuser(e)}
                          style={{ width: '401px' }}
                          className="form-control"
                          placeholder="Usuário a procurar"
                          disabled={!disabled}
                        />
                      </Col>
                      <Col style={{ width: '2rem', marginLeft: '-15px' }}>
                        <Button
                          id="btnSearch"
                          value={filteruser}
                          className="btn-icon"
                          style={{ color: '#fff', textAlign: 'center' }}
                          onClick={(e) => FilterUserAll()}
                          disabled={!disabled}
                        >
                          <div role="status">
                            <i className={'feather icon-search'} />
                          </div>
                        </Button>
                      </Col>
                    </Row>
                    <AGGrid
                      width="100%"
                      height="530px"
                      rows={users}
                      rowHeight={70}
                      loading={carregando}
                      columns={columns}
                      item={userselec}
                      setItem={(data) => setUserselec(data)}
                      onKeyDown={keyGrid}
                      onDoubleClick={dblClickGrid}
                    ></AGGrid>
                  </div>
                  <div style={{ width: '8%', marginLeft: '13px' }}>
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
                    <Row>
                      <Button id="btnAddlist" className="btn-icon" onClick={() => Add(userselec)} disabled={!disabled}>
                        <i className={'feather icon-chevron-right'} />
                      </Button>
                      <Button id="btnRetlist" className="btn-icon" onClick={() => Subtract(userselec2)} disabled={!disabled}>
                        <i className={'feather icon-chevron-left'} />
                      </Button>
                    </Row>
                    <br></br>
                  </div>
                  <div style={{ width: '47%', marginLeft: '5px', marginBottom: '10px' }}>
                    <Row>
                      <Col style={{ marginBottom: '10px' }}>
                        <input
                          id="edtprocurar"
                          onChange={(e) => handleChangeuser2(e)}
                          style={{ width: '401px' }}
                          className="form-control"
                          placeholder="Usuário a procurar"
                          disabled={!disabled}
                        />
                      </Col>
                      <Col style={{ width: '2rem', marginLeft: '-15px' }}>
                        <Button
                          id="btnSearch"
                          value={filteruser2}
                          className="btn-icon"
                          style={{ color: '#fff', textAlign: 'center' }}
                          onClick={(e) => FilterUserSelec()}
                          disabled={!disabled}
                        >
                          <div role="status">
                            <i className={'feather icon-search'} />
                          </div>
                        </Button>
                      </Col>
                    </Row>
                    <AGGrid
                      width="100%"
                      height="530px"
                      rows={users2}
                      rowHeight={70}
                      loading={carregando}
                      columns={columns2}
                      item={userselec2}
                      setItem={(data) => setUserselec2(data)}
                      onKeyDown={keyGrid2}
                      onDoubleClick={dblClickGrid2}
                    ></AGGrid>
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

export default DashboardUser;
