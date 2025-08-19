import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Box from '@mui/material/Box';
import { apiList, apiInsert, apiDelete } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';
import { onMenu } from '../../../../api/apiconnect';
import { CreateObject } from '../../../../components/CreateObject';
import { Decode64 } from '../../../../utils/crypto';

const DashboardModule = (props) => {
  const { dashboard, disabled } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [filtermenu, setFiltermenu] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [loadingmenu, setLoadingmenu] = React.useState(false);
  const [scrollEl, setScrollEl] = React.useState();
  const [modulo, setModulo] = React.useState('');
  const [modulo2, setModulo2] = React.useState('');
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB00118_SYSTEM',
        funcao: 'Sistema selecionado',
        tipo: 'varchar',
        nome: 'campo',
        tamanho: 4,
        tipoobject: 12,
        widthfield: 69,
        measure: '462px',
        tabelaref: 'TB00119',
        campolist: 'TB00119_NOME',
        camporefdrop: 'TB00119_SYSTEM',
        filteraux: "TB00119_DASHBOARD = '" + dashboard.codigo + "' ",
        disabled: !disabled
      }
    ]);
    setColumns([
      { headerClassName: 'header-list', field: 'modulo', headerName: 'Código', width: 100 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição Módulo', width: 320 }
    ]);
  }, []);

  useEffect(() => {
    if (rows !== undefined) {
      filterMenu();
    }
  }, [rows]);

  useEffect(() => {
    if (valuesfield[0] !== undefined && valuesfield[0] !== '') {
      Filtrar();
    }
  }, [valuesfield[0]]);

  useEffect(() => {
    if (loadingmenu) {
      filterMenu();
      setLoadingmenu(false);
    }
  }, [loadingmenu]);

  const Filtrar = () => {
    setCarregando(true);
    apiList(
      'DashboardModule',
      'TB00118_DASHBOARD,TB00118_MODULO,TB00118_NOME',
      '',
      "TB00118_DASHBOARD ='" + dashboard.codigo + "' AND TB00118_SYSTEM = " + valuesfield[0]
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
      }
    });
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
    if (valuesfield[0] !== undefined) {
      onMenu(Decode64(sessionStorage.getItem('urlconnect')), valuesfield[0], '', filtermenu, true, false).then((response) => {
        console.log(response);
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
                      onDoubleClick={(e) => Add(tmpmodulo)}
                    >
                      {value2.map((submenu, index2) => {
                        if (menu.qtsub > 1 && submenu.fixo === 0) {
                          return (
                            <TreeItem
                              key={index2}
                              itemId={submenu.object}
                              label={<Box sx={{ display: 'flex', alignItems: 'center' }}>{submenu.titlesubmenu}</Box>}
                              onClick={(e) => setModulo(submenu.object + '-' + submenu.titlesubmenu)}
                              onDoubleClickCapture={(e) => Add(submenu.object + '-' + submenu.titlesubmenu)}
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
      });
    }
  };

  const Add = (module) => {
    if (module !== undefined && module !== '' && module !== null) {
      const indice = module.split('-');
      const codigo = indice[0];
      const nome = indice.slice(1).join('-');
      let item = {};
      item['dashboard'] = dashboard.codigo;
      item['modulo'] = codigo;
      item['nome'] = nome;
      item['system'] = valuesfield[0];
      setCarregando(true);
      apiInsert('DashboardModule', item).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          Filtrar();
        }
      });
    }
  };

  const Subtract = (module) => {
    if (module !== undefined) {
      const item = {};
      item['dashboard'] = dashboard.codigo;
      item['modulo'] = module.modulo;
      item['system'] = valuesfield[0];
      setCarregando(true);
      apiDelete('DashboardModule', item).then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          Filtrar();
        }
      });
    }
  };

  const keyGrid2 = (newSelection, event) => {
    if (event.key === 'Enter') {
      if (disabled) {
        setModulo2(newSelection);
        Subtract(newSelection);
      }
    }
  };

  const dblClickGrid2 = (newSelection) => {
    if (disabled) {
      setModulo2(newSelection);
      Subtract(newSelection);
    }
  };

  const handleChangefilter = (e) => {
    setFiltermenu(e.target.value);
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
                    <Row style={{ marginBottom: '10px' }}>
                      <Col>
                        {fields.map((field) => (
                          <CreateObject
                            key={field.id}
                            field={field}
                            index={field.id}
                            fields={fields}
                            valuesfield={valuesfield}
                            setValuesfield={(data) => setValuesfield(data)}
                            valuesfield2={valuesfield2}
                            setValuesfield2={(data) => setValuesfield2(data)}
                            disabled={!disabled}
                          ></CreateObject>
                        ))}
                      </Col>
                    </Row>

                    <Row style={{ height: '475px', width: '100%', marginLeft: '7px', marginRight: '10px', marginBottom: '10px' }}>
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
                      <Button id="btnAddlist" className="btn-icon" onClick={() => Add(modulo)} disabled={!disabled}>
                        <i className={'feather icon-chevron-right'} />
                      </Button>
                      <Button id="btnRetlist" className="btn-icon" onClick={() => Subtract(modulo2)} disabled={!disabled}>
                        <i className={'feather icon-chevron-left'} />
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
                        item={modulo2}
                        setItem={(data) => setModulo2(data)}
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

export default DashboardModule;
