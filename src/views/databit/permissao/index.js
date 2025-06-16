import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Modal, ModalBody } from 'react-bootstrap';
import { onMenu } from '../../../api/apiconnect';
import { LinearProgress } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Box from '@mui/material/Box';
import user from '../../../assets/images/databit/User.png';
import AGGrid from '../../../components/AGGrid';
import Crud from './crud';
import { apiGetPicturelist, apiInsert, apiDelete } from '../../../api/crudapi';
import { Decode64 } from '../../../utils/crypto';

const Permissao = (props) => {
  const [options, setOptions] = React.useState([]);
  const [filtermenu, setFiltermenu] = React.useState('');
  const [filteruser, setFilteruser] = React.useState('');
  const [filteruser2, setFilteruser2] = React.useState('');
  const [loadingmenu, setLoadingmenu] = React.useState(false);
  const [loadinguser, setLoadinguser] = React.useState(false);
  const [loadinguser2, setLoadinguser2] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [users2, setUsers2] = React.useState([]);
  const [usersview, setUsersview] = React.useState([]);
  const [usersview2, setUsersview2] = React.useState([]);
  const [modulo, setModulo] = React.useState('');
  const [userselec, setUserselec] = React.useState([]);
  const [userselec2, setUserselec2] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [columns2, setColumns2] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [scrollEl, setScrollEl] = React.useState();
  const [menuselec, setMenuselec] = React.useState();
  const [menuall, setMenuall] = React.useState();
  const [showcrud, setShowcrud] = React.useState(false);

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
    FilterMenu();
  }, []);

  useEffect(() => {
    if (loadingmenu) {
      FilterMenu();
      setLoadingmenu(false);
    }
  }, [loadingmenu]);

  useEffect(() => {
    if (loadinguser) {
      FilterUserAll(false);
      setLoadinguser(false);
    }
  }, [loadinguser]);

  useEffect(() => {
    if (loadinguser2) {
      FilterUserSelec();
      setLoadinguser2(false);
    }
  }, [loadinguser2]);

  useEffect(() => {
    if (modulo !== undefined) {
      if (menuall !== undefined && menuall.length > 0) {
        let tmpfilter = menuall.filter((x) => x.object === modulo);
        setMenuselec(tmpfilter);
      }
      setUsers([]);
      setUsers2([]);
      FilterUserAll(true);
    }
  }, [modulo]);

  useEffect(() => {
    setUsersview([]);
    if (users !== undefined && users.length > 0) {
      let tmpuser = [];
      let item = {};
      let item2 = {};
      users.forEach((element, index) => {
        item = {};
        item2 = {};
        item2['nome'] = element.NOME;
        item2['cargo'] = 'Setor : ' + element.SETOR;

        item['id'] = index;
        item['picture'] = element.picture;
        item['nome'] = element.NOME;
        item['setor'] = 'Setor : ' + element.SETOR;
        item['contato'] = item2;
        tmpuser = tmpuser.concat(item);
      });
      setUsersview(tmpuser);
    }
  }, [users]);

  useEffect(() => {
    setUsersview2([]);
    if (users2 !== undefined && users2.length > 0) {
      let tmpuser = [];
      let item = {};
      let item2 = {};
      users2.forEach((element, index) => {
        item = {};
        item2 = {};
        item2['nome'] = element.NOME;
        item2['cargo'] = 'Setor : ' + element.SETOR;

        item['id'] = index;
        item['picture'] = element.picture;
        item['nome'] = element.NOME;
        item['tabela'] = element.TABELA;
        item['inc'] = element.INC;
        item['exc'] = element.EXC;
        item['alt'] = element.ALT;
        item['rel'] = element.REL;
        item['opc'] = element.OPC;
        item['eml'] = element.EML;
        item['exp'] = element.EXP;
        item['graficos'] = element.GRAFICOS;
        item['campanhas'] = element.CAMPANHAS;
        item['docs'] = element.DOCS;
        item['setor'] = 'Setor : ' + element.SETOR;
        item['contato'] = item2;
        tmpuser = tmpuser.concat(item);
      });
      setUsersview2(tmpuser);
    }
  }, [users2]);

  let menufim = [];

  const FilterMenu = () => {
    onMenu(Decode64(sessionStorage.getItem('urlconnect')), Decode64(sessionStorage.getItem('system')), '', filtermenu, true, true).then(
      (response) => {
        if (response.status === 200) {
          let value = response.data;
          setMenuall(response.data);
          let menus = '';
          if (value !== undefined && value.length > 0) {
            value.forEach((menu, index) => {
              if (menu.fixo === 0) {
                if (!menus.includes(menu.ord + '*')) {
                  let value2 = value.filter((valor) => valor.name === menu.name);
                  let tmpmodulo = undefined;
                  if (menu.qtsub === 1) {
                    tmpmodulo = menu.object;
                  }
                  let itemennu = (
                    <TreeItem
                      key={index}
                      itemId={index}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <i className={menu.icon} /> &nbsp; {menu.title}
                        </Box>
                      }
                      onClick={(e) => setModulo(tmpmodulo)}
                    >
                      {value2.map((submenu, index2) => {
                        if (menu.qtsub > 1 && submenu.fixo === 0) {
                          return (
                            <TreeItem
                              key={index2}
                              itemId={submenu.object}
                              label={<Box sx={{ display: 'flex', alignItems: 'center' }}>{submenu.titlesubmenu}</Box>}
                              onClick={(e) => setModulo(submenu.object)}
                            ></TreeItem>
                          );
                        }
                      })}
                    </TreeItem>
                  );
                  menufim = menufim.concat(itemennu);
                  setOptions(menufim);
                  menus = menus + '*' + menu.ord + '*';
                  setLoadingmenu(false);
                  setCarregando(false);
                }
              }
            });
          }
        }
      }
    );
  };

  const FilterUserAll = (userselec) => {
    if (modulo !== undefined && modulo !== '') {
      let filter = " NOT EXISTS (SELECT * FROM TB00037 WHERE TB00037_USER = NOME AND TB00037_TABELA = '" + modulo + "') ";
      if (filteruser !== undefined && filteruser !== '') {
        filter = filter + " AND NOME LIKE '" + filteruser + "%' ";
      }
      filter = filter + ' ORDER BY NOME ';
      setCarregando(true);
      apiGetPicturelist('VW00020', 'NOME', 'PHOTO', filter, 'NOME,SETOR,EMAIL', '').then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
          setCarregando(false);
          if (userselec) {
            FilterUserSelec();
          }
        }
      });
    }
  };

  const FilterUserSelec = () => {
    if (modulo !== undefined && modulo !== '') {
      let filter = " TABELA = '" + modulo + "' ";
      if (filteruser2 !== undefined && filteruser2 !== '') {
        filter = filter + " AND NOME LIKE '" + filteruser2 + "%' ";
      }

      filter = filter + ' ORDER BY NOME ';
      setCarregando(true);
      apiGetPicturelist(
        'VW00021',
        'CHAVE',
        'PHOTO',
        filter,
        'NOME,TABELA,INC,EXC,ALT,REL,OPC,EML,EXP,GRAFICOS,CAMPANHAS,DOCS,SETOR,EMAIL',
        ''
      ).then((response) => {
        if (response.status === 200) {
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
      item['tabela'] = modulo;
      item['inc'] = 'S';
      item['exc'] = 'S';
      item['alt'] = 'S';
      item['rel'] = 'S';
      item['opc'] = 'S';
      item['acs'] = 'S';
      item['eml'] = 'S';
      item['exp'] = 'S';
      item['graficos'] = 'S';
      item['campanhas'] = 'S';
      item['docs'] = 'S';
      setCarregando(true);
      apiInsert('Permissao', item).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          const rowsbkp1 = users.slice(0, users.length);
          const i = rowsbkp1.findIndex((x) => x.NOME === user.NOME);
          rowsbkp1.splice(i, 1);
          setUsers(rowsbkp1);
          setLoadinguser2(true);
        }
      });
    }
  };

  const Subtract = (user) => {
    if (user !== undefined) {
      const item = {};
      item['user'] = user.NOME;
      item['tabela'] = modulo;
      setCarregando(true);
      apiDelete('Permissao', item).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          const rowsbkp1 = users2.slice(0, users2.length);
          const i = rowsbkp1.findIndex((x) => x.NOME === user.NOME);
          rowsbkp1.splice(i, 1);
          setUsers2(rowsbkp1);
          setLoadinguser(true);
        }
      });
    }
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setUserselec(newSelection);
      Add(newSelection);
    }
  };

  const dblClickGrid = (newSelection) => {
    setUserselec(newSelection);
    Add(newSelection);
  };

  const keyGrid2 = (newSelection, event) => {
    if (event.key === 'Enter') {
      setUserselec2(newSelection);
      Subtract(newSelection);
    }
  };

  const dblClickGrid2 = (newSelection) => {
    setUserselec(newSelection);
    Subtract(newSelection);
  };

  const handleChangefilter = (e) => {
    setFiltermenu(e.target.value);
  };

  const handleChangeuser = (e) => {
    setFilteruser(e.target.value);
  };

  const handleChangeuser2 = (e) => {
    setFilteruser2(e.target.value);
  };

  const handleCloseShowcrud = () => {
    setShowcrud(false);
  };

  return (
    <React.Fragment>
      <div id="frmpermissao" name="frmpermissao">
        <Row>
          <Card className="Recent-Users" style={{ marginBottom: '-10px' }}>
            <Card.Header>
              <Card.Title as="h5">Permissão de Usuários</Card.Title>
            </Card.Header>
            <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>

            <Row style={{ marginTop: '15px' }}>
              <Col lg={4}>
                <Card className="Recent-Users">
                  <Card.Header>
                    <Card.Title as="h5">Menu de Opções</Card.Title>
                  </Card.Header>

                  <Row style={{ marginLeft: '1px', marginTop: '10px' }}>
                    <Col>
                      <input
                        id="edtprocurar"
                        onChange={(e) => handleChangefilter(e)}
                        style={{ width: '432px' }}
                        className="form-control"
                        placeholder="Opção à procurar"
                      />
                    </Col>
                    <Col style={{ width: '2rem', marginLeft: '-15px' }}>
                      <Button
                        id="btnSearch"
                        value={filtermenu}
                        className="btn-icon"
                        style={{ color: '#fff', textAlign: 'center' }}
                        onClick={(e) => setLoadingmenu(true)}
                      >
                        <div role="status">
                          <i className={'feather icon-search'} />
                        </div>
                      </Button>
                    </Col>
                  </Row>

                  <Row style={{ height: '530px', marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                    <PerfectScrollbar
                      containerRef={(ref) => {
                        setScrollEl(ref);
                      }}
                      style={{
                        backgroundColor: 'rgb(230, 245, 255)',
                        color: '#000'
                      }}
                    >
                      <SimpleTreeView>
                        {options.map((option) => {
                          return option;
                        })}
                      </SimpleTreeView>
                    </PerfectScrollbar>
                  </Row>
                </Card>
              </Col>

              <Col lg={8}>
                <Card className="Recent-Users">
                  <Card.Header>
                    {menuselec === undefined ? (
                      <Card.Title as="h5">Opção Selecionada</Card.Title>
                    ) : (
                      <Card.Title as="h5">Opção Selecionada: {menuselec[0].titlesubmenu}</Card.Title>
                    )}
                  </Card.Header>
                  <Row style={{ marginLeft: '1px', marginTop: '10px' }}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: '46%', marginRight: '5px', marginBottom: '10px' }}>
                        <Row>
                          <Col>
                            <input
                              id="edtprocurar"
                              onChange={(e) => handleChangeuser(e)}
                              style={{ width: '421px' }}
                              className="form-control"
                              placeholder="Usuário a procurar"
                              disabled={menuselec === undefined}
                            />
                          </Col>
                          <Col style={{ width: '2rem', marginLeft: '-15px' }}>
                            <Button
                              id="btnSearch"
                              value={filtermenu}
                              className="btn-icon"
                              style={{ color: '#fff', textAlign: 'center' }}
                              onClick={(e) => setLoadinguser(true)}
                              disabled={menuselec === undefined}
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
                      <div style={{ width: '4%', marginLeft: '24px' }}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Row>
                          <Button id="btnAddlist" className="btn-icon" onClick={() => Add(userselec)}>
                            <i className={'feather icon-chevron-right'} />
                          </Button>
                          <Button id="btnRetlist" className="btn-icon" onClick={() => Subtract(userselec2)}>
                            <i className={'feather icon-chevron-left'} />
                          </Button>
                        </Row>
                        <br></br>
                        {menuselec !== undefined && userselec2 !== undefined && parseInt(menuselec[0].crud) === 1 ? (
                          <Row>
                            <Button id="btnPermissao" className="btn-icon btn-success" onClick={() => setShowcrud(true)}>
                              <i className={'feather icon-edit'} />
                            </Button>
                          </Row>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div style={{ width: '46%', marginLeft: '5px', marginBottom: '10px' }}>
                        <Row>
                          <Col>
                            <input
                              id="edtprocurar"
                              onChange={(e) => handleChangeuser2(e)}
                              style={{ width: '421px' }}
                              className="form-control"
                              placeholder="Usuário a procurar"
                              disabled={menuselec === undefined}
                            />
                          </Col>
                          <Col style={{ width: '2rem', marginLeft: '-15px' }}>
                            <Button
                              id="btnSearch"
                              value={filtermenu}
                              className="btn-icon"
                              style={{ color: '#fff', textAlign: 'center' }}
                              onClick={(e) => setLoadinguser2(true)}
                              disabled={menuselec === undefined}
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
                </Card>
              </Col>
            </Row>
          </Card>
        </Row>
      </div>
      {menuselec !== undefined ? (
        <Modal backdrop="static" size="xl" show={showcrud} centered={true} onHide={handleCloseShowcrud}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-edit h1'} />
            &nbsp;Permissões: {menuselec[0].titlesubmenu}
          </Modal.Header>
          <ModalBody>
            <Crud
              user={userselec2.NOME}
              setor={userselec2.SETOR}
              email={userselec2.EMAIL}
              modulo={modulo}
              picture={userselec2.picture}
              nomemodulo={menuselec[0].titlesubmenu}
              showcrud={showcrud}
              setShowcrud={(data) => setShowcrud(data)}
            ></Crud>
          </ModalBody>
        </Modal>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default Permissao;
