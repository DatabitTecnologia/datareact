import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Box from '@mui/material/Box';
import { apiList, apiUpdate } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';
import { onMenu } from '../../../../api/apiconnect';
import { Decode64 } from '../../../../utils/crypto';

const DashboardOrder = (props) => {
  const { disabled } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);

  const [options, setOptions] = React.useState([]);
  const [scrollEl, setScrollEl] = React.useState();
  const [modulo, setModulo] = React.useState('');
  const [itemselec, setItemselec] = React.useState([]);
  const [ordem, setOrdem] = React.useState(0);
  const [anterior, setAnterior] = React.useState();
  const [atual, setAtual] = React.useState();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'ordem', headerName: 'Ordem', width: 80, type: 'number' },
      { headerClassName: 'header-list', field: 'dashboard', headerName: 'Código', width: 80 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição Dashboard', width: 270 }
    ]);
    filterMenu();
  }, []);

  useEffect(() => {
    Filtrar();
  }, [modulo]);

  const Filtrar = () => {
    if (modulo !== undefined && modulo !== '' && modulo !== null) {
      const indice = modulo.split('-');
      const codigo = indice[0];
      setCarregando(true);
      apiList(
        'DashboardOrder',
        '*',
        '',
        "TB00121_MODULO ='" + codigo + "' AND TB00121_SYSTEM = " + Decode64(sessionStorage.getItem('system')) + ' ORDER BY TB00121_ORDEM '
      ).then((response) => {
        if (response.status === 200) {
          setLoading(true);
          setRows(response.data);
          setCarregando(false);
        }
      });
    }
  };

  useEffect(() => {
    if (loading) {
      let ordem = 1;
      rows.forEach((row) => {
        row.ordem = ordem;
        apiUpdate('DashboardOrder', row).then((response) => {
          if (response.status === 200) {
            console.log(row);
          }
        });
        ordem += 1;
      });
      setLoading(false);
    }
  }, [rows]);

  useEffect(() => {
    if (atual !== undefined) {
      setCarregando(true);
      apiUpdate('DashboardOrder', atual).then((response) => {
        if (response.status === 200) {
          setAtual(undefined);
          setCarregando(false);
        }
      });
    }
  }, [atual]);

  useEffect(() => {
    if (anterior !== undefined) {
      setCarregando(true);
      apiUpdate('DashboardOrder', anterior).then((response) => {
        if (response.status === 200) {
          setAnterior(undefined);
          setCarregando(false);
        }
      });
    }
  }, [anterior]);

  const Upp = () => {
    if (itemselec !== undefined) {
      if (itemselec['ordem'] !== 1) {
        let rowsbkp2 = rows.slice(0, rows.length);
        let itematual = rows.findIndex((a) => a.ordem === itemselec.ordem);
        let itemant = rows.findIndex((a) => a.ordem === itemselec.ordem - 1);
        rowsbkp2[itematual]['ordem'] = rowsbkp2[itematual]['ordem'] - 1;
        rowsbkp2[itemant]['ordem'] = rowsbkp2[itemant]['ordem'] + 1;
        setAtual(rowsbkp2[itematual]);
        setAnterior(rowsbkp2[itemant]);
        setRows(rowsbkp2);
      }
    }
  };

  const Down = () => {
    if (itemselec !== undefined) {
      if (itemselec['ordem'] !== ordem) {
        let rowsbkp2 = rows.slice(0, rows.length);
        let itematual = rows.findIndex((a) => a.ordem === itemselec.ordem);
        let itemant = rows.findIndex((a) => a.ordem === itemselec.ordem + 1);
        rowsbkp2[itematual]['ordem'] = rowsbkp2[itematual]['ordem'] + 1;
        rowsbkp2[itemant]['ordem'] = rowsbkp2[itemant]['ordem'] - 1;
        setAtual(rowsbkp2[itematual]);
        setAnterior(rowsbkp2[itemant]);
        setRows(rowsbkp2);
      }
    }
  };

  const filterMenu = () => {
    let modules = '';
    if (rows !== undefined && rows.length > 0) {
      rows.forEach((item) => {
        modules = modules + item.modulo + ',';
      });
    }
    let menufim = [];
    setOptions([]);

    onMenu(Decode64(sessionStorage.getItem('urlconnect')), Decode64(sessionStorage.getItem('system')), '', '', true, false).then(
      (response) => {
        if (response.status === 200) {
          let tmpvalue = response.data;
          let value = [];
          if (modules !== '') {
            value = tmpvalue.filter((x) => !modules.includes(x.object));
          } else {
            value = tmpvalue;
          }
          let menus = '';
          if (value !== undefined && value.length > 0) {
            value.forEach((menu, index) => {
              if (menu.title !== 'Sair' && menu.title !== 'Segurança') {
                if (!menus.includes(menu.ord + '*')) {
                  let value2 = value.filter((valor) => valor.name === menu.name);
                  let tmpmodulo = undefined;
                  if (menu.qtsub === 1) {
                    tmpmodulo = menu.object + '-' + menu.title;
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
                              onClick={(e) => setModulo(submenu.object + '-' + submenu.titlesubmenu)}
                            ></TreeItem>
                          );
                        }
                      })}
                    </TreeItem>
                  );
                  menufim = menufim.concat(itemennu);
                  setOptions(menufim);
                  menus = menus + '*' + menu.ord + '*';
                  setCarregando(false);
                }
              }
            });
          }
        }
      }
    );
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
                  <div style={{ width: '46%', marginBottom: '10px' }}>
                    <Row style={{ height: '562px', width: '100%', marginLeft: '7px', marginRight: '10px', marginBottom: '10px' }}>
                      <PerfectScrollbar
                        disabled={!disabled}
                        containerRef={(ref) => {
                          setScrollEl(ref);
                        }}
                        style={{
                          backgroundColor: 'rgb(230, 245, 255)',
                          color: '#000',
                          width: '100%'
                        }}
                      >
                        <SimpleTreeView disabled={!disabled}>
                          {options.map((option) => {
                            return option;
                          })}
                        </SimpleTreeView>
                      </PerfectScrollbar>
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
                      <Button id="btnUp" className="btn-icon" disabled={!disabled} onClick={() => Upp()}>
                        <i className={'feather icon-chevron-up'} />
                      </Button>
                      <Button id="btnDown" className="btn-icon" disabled={!disabled} onClick={() => Down()}>
                        <i className={'feather icon-chevron-down'} />
                      </Button>
                    </Row>
                    <br></br>
                  </div>
                  <div style={{ width: '46%', marginBottom: '10px' }}>
                    <Row>
                      <AGGrid
                        width="100%"
                        height="562px"
                        rows={rows}
                        loading={carregando}
                        columns={columns}
                        item={itemselec}
                        setItem={(data) => setItemselec(data)}
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

export default DashboardOrder;
