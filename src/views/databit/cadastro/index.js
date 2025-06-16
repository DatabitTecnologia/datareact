import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Button, Card, Modal, ModalBody, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiFields, apiFieldsList, apiList, apiExec, apiFind, apiUpdate } from '../../../api/crudapi';
import { converterMillis } from '../../../utils/converterMillis';
import { Decode64 } from '../../../utils/crypto';
import { useToasts } from 'react-toast-notifications';
import Filter from './filter';
import FieldsList from './fieldslist';
import FieldsParam from './fieldsparam';
import FieldsRequired from './fieldsrequired';
import FieldsValidation from './fieldsvalidation';
import FieldsFilter from './fieldsfilter';
import DefAddress from './defaddress';
import OptionInfor from './optioninfor';
import OptionList from './optionlist';
import Campanha from '../campanha';
import { findModule } from '../dashboard/findmodule';
import DashboardFind from '../dashboard/find';
import { InputDatabit } from '../../../components/Input';
import AGGrid from '../../../components/AGGrid';

const Cadastro = (props) => {
  const [columns, setColumns] = React.useState([]);
  const [columnsvisible, setColumnsvisible] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [rowselect, setRowselect] = React.useState();
  const [filters, setFilters] = React.useState(' 0 = 0 and (' + props.table + "_SITUACAO = 'A') ");
  const [filtersfim, setFiltersfim] = React.useState('');
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [option, setOption] = React.useState(1);
  const [rowslist, setRowslist] = React.useState([]);
  const [optiontitle, setOptiontitle] = React.useState('');
  const [situacao, setSituacao] = React.useState('A');
  const [showfilter, setShowfilter] = useState(false);
  const handleClosefilter = () => setShowfilter(false);
  const [showconfig, setShowconfig] = useState(false);
  const handleCloseconfig = () => setShowconfig(false);
  const [showlist, setShowlist] = useState(false);
  const handleCloselist = () => setShowlist(false);
  const { addToast } = useToasts();
  const [showinfor, setShowinfor] = useState(false);
  const [validations, setValidations] = React.useState([]);
  const [onupdate, setOnupdate] = React.useState(false);
  const { codseller, setCodseller } = props;
  const [permissions, setPermissions] = React.useState([]);
  const [showcampanha, setShowcampanha] = useState(false);
  const handleClosecampanha = () => setShowcampanha(false);
  const { possuicampanhas, fieldemail, fieldwhats } = props;
  const [dashboards, setDashboards] = React.useState([]);
  const [showdash, setShowdash] = useState(false);
  const handleCloseShowdash = () => setShowdash(false);
  const [modulo, setModulo] = React.useState('');
  const [selectedLine, setselectedLine] = React.useState(-1);

  useEffect(() => {
    sessionStorage.setItem('lineselect', -1);
  }, []);

  useEffect(() => {
    Filtrar();
  }, [showconfig, filters, showlist]);

  useEffect(() => {
    if (onupdate) {
      Filtrar(true);
      setOnupdate(false);
    }
  }, [onupdate]);

  useEffect(() => {
    if (showinfor) {
      try {
        sessionStorage.setItem('lineselect', rowselect.id);
      } catch (error) {
        sessionStorage.setItem('lineselect', rows.length);
      }
    } else {
      setselectedLine([parseInt(sessionStorage.getItem('lineselect'))]);
    }
  }, [showinfor]);

  useEffect(() => {
    if (permissions === undefined || Decode64(sessionStorage.getItem('admin')) === 'S') {
      let item = {};
      item['user'] = Decode64(sessionStorage.getItem('user'));
      item['tabela'] = props.table;
      item['inc'] = 'S';
      item['exc'] = 'S';
      item['alt'] = 'S';
      item['opc'] = 'S';
      item['eml'] = 'S';
      item['graficos'] = 'S';
      item['campanhas'] = 'S';
      item['docs'] = 'S';
      item['rel'] = 'S';
      setPermissions(item);
    }
  }, [permissions]);

  const Filtrar = async () => {
    setCarregando(true);
    let inicio = new Date();
    apiExec(
      "EXEC SP00009 '" +
        props.table +
        "', '" +
        props.object +
        "', '" +
        props.primarykey +
        "', '" +
        Decode64(sessionStorage.getItem('user')) +
        "', '" +
        props.termlist +
        "', '" +
        props.fieldsdefault +
        "'," +
        Decode64(sessionStorage.getItem('system')),
      'N'
    ).then((response) => {
      if (response.status === 200) {
        apiFind(
          'Modulo',
          '*',
          '',
          "TB00120_TABELA = '" + props.table + "' and TB00120_SYSTEM = " + Decode64(sessionStorage.getItem('system'))
        ).then((response) => {
          if (response.status === 200) {
            setModulo(response.data.nome);
            apiList(
              'Paramfield',
              'TB00003_CAMPO,TB00003_VALORVAL,TB00003_CAMVAL1,TB00003_SINAL,TB00003_TIPOTAB',
              'TB00003_CORWEB as cor ',
              " TB00003_TABELA = '" + props.object + "' AND TB00003_SELEC4 = 'S' AND TB00003_CORWEB <> '' AND TB00003_CORWEB IS NOT NULL"
            ).then((response) => {
              if (response.status === 200) {
                setValidations(response.data);
                let fieldsextra = '';
                response.data.forEach((element) => {
                  fieldsextra = fieldsextra + element.campo + ',';
                  if (element.camval1 !== '' && element.camval1 !== undefined) {
                    fieldsextra = fieldsextra + element.camval1 + ',';
                  }
                });
                fieldsextra = fieldsextra.substring(0, fieldsextra.length - 1);
                apiFieldsList(props.object, fieldsextra).then((response) => {
                  if (response.status === 200) {
                    setColumns(response.data);
                    setOption(1);
                    let sfields = '';
                    response.data.forEach((element) => {
                      sfields = sfields + element.field + ',';
                    });
                    sfields = sfields.substring(0, sfields.length - 1);
                    let filterfim = filters;
                    if (props.filterseller) {
                      if (!filterfim.includes(props.codseller)) {
                        filterfim =
                          filterfim +
                          ' and (' +
                          props.table +
                          '_' +
                          codseller +
                          " = '" +
                          Decode64(sessionStorage.getItem('seller')) +
                          "') ";
                      }
                    }
                    if (props.filteraux !== undefined && props.filteraux !== '') {
                      filterfim = filterfim + ' and  ' + props.filteraux;
                    }
                    setFiltersfim(filterfim);
                    apiFields(props.classobject, sfields, '', filterfim, 0, true, props.primarykey).then((response) => {
                      if (response.status === 200) {
                        setRows(response.data);
                        setCarregando(false);

                        apiFind(
                          'Permissao',
                          '*',
                          '',
                          "TB00037_TABELA = '" + props.table + "' and TB00037_USER = '" + Decode64(sessionStorage.getItem('user')) + "' "
                        ).then((response) => {
                          if (response.status === 200) {
                            setPermissions(response.data);
                            findModule(props.table).then((response) => {
                              setDashboards(response.data);
                              if (!onupdate || onupdate === undefined) {
                                let fim = new Date();
                                let dif = fim - inicio;
                                addToast('Tempo de processamento : ' + converterMillis(dif), {
                                  placement: 'bottom-rigth',
                                  appearance: 'success',
                                  autoDismiss: true
                                });
                              } else {
                                setOnupdate(false);
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  };

  const setConfig = () => {
    switch (option) {
      case 1: {
        return (
          <FieldsList
            rowslist={rowslist}
            setRowslist={(data) => setRowslist(data)}
            object={props.object}
            setOptiontitle={(data) => setOptiontitle(data)}
          ></FieldsList>
        );
      }
      case 2: {
        return <FieldsParam object={props.object} setOptiontitle={(data) => setOptiontitle(data)}></FieldsParam>;
      }
      case 3: {
        return <FieldsRequired object={props.object} setOptiontitle={(data) => setOptiontitle(data)}></FieldsRequired>;
      }
      case 4: {
        return <FieldsValidation object={props.object} setOptiontitle={(data) => setOptiontitle(data)}></FieldsValidation>;
      }
      case 5: {
        return <DefAddress object={props.table} setOptiontitle={(data) => setOptiontitle(data)}></DefAddress>;
      }
      case 6: {
        return <FieldsFilter object={props.object} setOptiontitle={(data) => setOptiontitle(data)}></FieldsFilter>;
      }
      default: {
        return (
          <FieldsList
            rowslist={rowslist}
            setRowslist={(data) => setRowslist(data)}
            object={props.object}
            setOptiontitle={(data) => setOptiontitle(data)}
          ></FieldsList>
        );
      }
    }
  };

  const Incluir = () => {
    setRowselect(undefined);
    setShowinfor(true);
  };

  const Acessar = () => {
    if (rowselect !== undefined) {
      setShowinfor(true);
    }
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setShowinfor(true);
    }
  };

  const dblClickGrid = (newSelection) => {
    setShowinfor(true);
  };

  const updateModulo = () => {
    InputDatabit('frmcadastro', 'Renomear Módulo', 'Favor digitar o novo Módulo', modulo).then((result) => {
      if (result !== undefined && result !== '') {
        let item = {};
        item['tabela'] = props.table;
        item['nome'] = result;
        item['system'] = Decode64(sessionStorage.getItem('system'));
        setCarregando(true);
        apiUpdate('Modulo', item).then((response) => {
          if (response.status === 200) {
            setModulo(result);
            setCarregando(false);
            addToast(response.data.mensagem, {
              placement: 'bottom-rigth',
              appearance: 'success',
              autoDismiss: true
            });
          }
        });
      }
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          {showinfor === false ? (
            <div name="frmcadastro" id="frmcadastro">
              <Card className="Recent-Users">
                <Card.Header>
                  <Card.Title as="h5">{modulo}</Card.Title>
                </Card.Header>
              </Card>
              <Col style={{ textAlign: 'center' }}>
                <OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Filtrar Registros</Tooltip>}>
                  <Button id="btnFilros" className="btn btn-primary shadow-2 mb-3" onClick={() => Filtrar()}>
                    <i className={'feather icon-filter'} /> Filtrar Registros
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Filtrar Registros</Tooltip>}>
                  {filters === ' 0 = 0 and (' + props.table + "_SITUACAO = 'A') " ? (
                    <Button id="btnFilros" className="btn btn-primary shadow-2 mb-3" onClick={() => setShowfilter(true)}>
                      <i className={'feather icon-check-square'} /> Opções Filtros
                    </Button>
                  ) : (
                    <Button id="btnFilros" className="btn btn-success shadow-2 mb-3" onClick={() => setShowfilter(true)}>
                      <i className={'feather icon-check-square'} /> Opções Filtros
                    </Button>
                  )}
                </OverlayTrigger>
                <Modal backdrop="static" size="xl" show={showfilter} centered={true} onHide={handleClosefilter}>
                  <Modal.Header className="h5" closeButton>
                    <i className={'feather icon-filter h1'} />
                    &nbsp;Filtrar registros
                  </Modal.Header>
                  <ModalBody>
                    <Filter
                      setFilters={(data) => setFilters(data)}
                      filters={filters}
                      valuesfield={valuesfield}
                      valuesfield2={valuesfield2}
                      termlist={props.termlist}
                      object={props.object}
                      table={props.table}
                      handleClosefilter={handleClosefilter}
                      situacao={situacao}
                      setValuesfield={(data) => setValuesfield(data)}
                      setValuesfield2={(data) => setValuesfield2(data)}
                      setSituacao={(data) => setSituacao(data)}
                    ></Filter>
                  </ModalBody>
                </Modal>
                <OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Opções de listagem</Tooltip>}>
                  <Button id="btnOplist" className="btn btn-primary shadow-2 mb-3" onClick={() => setShowlist(true)}>
                    <i className={'feather icon-list'} />
                    Opções Listagem
                  </Button>
                </OverlayTrigger>
                <Modal backdrop="static" size="xl" show={showlist} centered={true} onHide={handleCloselist}>
                  <Modal.Header className="h5" closeButton>
                    <i className={'feather icon-list h1'} />
                    &nbsp;Definir opção de listagem
                  </Modal.Header>
                  <ModalBody>
                    <OptionList
                      user={Decode64(sessionStorage.getItem('user'))}
                      object={props.object}
                      showlist={showlist}
                      setShowlist={(data) => setShowlist(data)}
                    ></OptionList>
                  </ModalBody>
                </Modal>
                {permissions.inc === 'S' ? (
                  <OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Novo registro</Tooltip>}>
                    <Button id="btnnovo" className="btn btn-primary shadow-2 mb-3" onClick={() => Incluir()}>
                      <i className={'feather icon-star'} /> Novo
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <></>
                )}

                <OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Acessar registro desejado</Tooltip>}>
                  <Button id="btnacessar" className="btn btn-primary shadow-2 mb-3" onClick={() => Acessar()}>
                    <i className={'feather icon-check'} /> Acessar
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Configurações</Tooltip>}>
                  <Button id="btnConfig" className="btn btn-primary shadow-2 mb-3" onClick={() => setShowconfig(true)}>
                    <i className={'feather icon-settings'} /> Config.
                  </Button>
                </OverlayTrigger>
                <Modal backdrop="static" size="xl" show={showconfig} centered={true} onHide={handleCloseconfig}>
                  <Modal.Header className="h5" closeButton>
                    <i className={'feather icon-settings h1'} />
                    &nbsp;{optiontitle}
                  </Modal.Header>
                  <ModalBody>
                    <Button id="btnListagem" onClick={() => setOption(1)} className="btn btn-primary shadow-2 mb-3">
                      <i className={'feather icon-list'} /> Listagem
                    </Button>
                    {permissions.opc === 'S' ? (
                      <Button id="btnParam" onClick={() => setOption(2)} className="btn btn-primary shadow-2 mb-3">
                        <i className={'feather icon-tablet'} /> Parametrizações
                      </Button>
                    ) : (
                      <></>
                    )}
                    {permissions.opc === 'S' ? (
                      <Button id="btnRequired" onClick={() => setOption(3)} className="btn btn-primary shadow-2 mb-3">
                        <i className={'feather icon-flag'} /> Obrigatóriedade
                      </Button>
                    ) : (
                      <></>
                    )}
                    {permissions.opc === 'S' ? (
                      <Button id="btnValidation" onClick={() => setOption(4)} className="btn btn-primary shadow-2 mb-3">
                        <i className={'feather icon-award'} /> Validações
                      </Button>
                    ) : (
                      <></>
                    )}
                    {permissions.opc === 'S' ? (
                      <Button id="btnAddrres" onClick={() => setOption(5)} className="btn btn-primary shadow-2 mb-3">
                        <i className={'feather icon-map-pin'} />
                        Endereços
                      </Button>
                    ) : (
                      <></>
                    )}
                    <Button id="btnFilter" onClick={() => setOption(6)} className="btn btn-primary shadow-2 mb-3">
                      <i className={'feather icon-filter'} /> Filtros
                    </Button>
                    <Row>
                      <Col>{setConfig()}</Col>
                    </Row>
                  </ModalBody>
                </Modal>

                {permissions.graficos === 'S' && dashboards !== undefined && dashboards.length > 0 ? (
                  <OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Gráficos e Dashboards</Tooltip>}>
                    <Button id="btnGraficos" className="btn btn-success shadow-2 mb-3" onClick={(e) => setShowdash(true)}>
                      <i className={'feather icon-bar-chart'} /> Gráficos
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <></>
                )}

                <Modal backdrop="static" fullscreen={true} show={showdash} centered={true} onHide={handleCloseShowdash}>
                  <Modal.Header className="h5" closeButton>
                    <i className={'feather icon-bar-chart h1'} />
                    &nbsp;Gráficos
                  </Modal.Header>
                  <ModalBody>
                    <DashboardFind
                      module={props.table}
                      showdash={showdash}
                      principal={false}
                      setShowdash={(data) => setShowdash(data)}
                    ></DashboardFind>
                  </ModalBody>
                </Modal>

                {permissions.campanhas === 'S' && possuicampanhas ? (
                  <OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Campanhas</Tooltip>}>
                    <Button id="btnCampanhas" onClick={() => setShowcampanha(true)} className="btn btn-warning shadow-2 mb-3">
                      <i className={'feather icon-loader'} /> Campanhas
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <></>
                )}
                <Modal backdrop="static" size="xl" show={showcampanha} centered={true} onHide={handleClosecampanha}>
                  <Modal.Header className="h5" closeButton>
                    <i className={'feather icon-loader h1'} />
                    &nbsp;Definição de Campanhas
                  </Modal.Header>
                  <ModalBody>
                    <Campanha
                      table={props.table}
                      modulo={props.title}
                      object={props.object}
                      tabcampanha={props.tabcampanha}
                      classobject={props.classobject}
                      classcampanha={props.classcampanha}
                      filters={filtersfim}
                      showcampanha={showcampanha}
                      fieldemail={fieldemail}
                      fieldwhats={fieldwhats}
                      setShowcampanha={(data) => setShowcampanha()}
                    ></Campanha>
                  </ModalBody>
                </Modal>

                {Decode64(sessionStorage.getItem('admin')) === 'S' ? (
                  <OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Renomear Módulo</Tooltip>}>
                    <Button id="btnModulo" className="btn btn-success shadow-2 mb-3" onClick={(e) => updateModulo()}>
                      <i className={'feather icon-credit-card'} /> Módulo
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <></>
                )}
              </Col>
              <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
              <AGGrid
                width="100%"
                height="560px"
                modulo={modulo}
                rows={rows}
                columns={columns}
                loading={carregando}
                onKeyDown={keyGrid}
                onDoubleClick={dblClickGrid}
                validations={validations}
                item={rowselect}
                setItem={(data) => setRowselect(data)}
                focus={true}
                selectedLine={selectedLine}
                columnsvisible={columnsvisible}
                setColumnsvisible={(data) => setColumnsvisible(data)}
              ></AGGrid>
            </div>
          ) : (
            <div>
              <OptionInfor
                option={props.moduleoption}
                rowselect={rowselect}
                showinfor={showinfor}
                setShowinfor={(data) => setShowinfor(data)}
                setRowselect={(data) => setRowselect(data)}
                onupdate={onupdate}
                setOnupdate={(data) => setOnupdate(data)}
              ></OptionInfor>
            </div>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Cadastro;

/*
<OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Copiar registro desejado</Tooltip>}>
                  <Button id="btncopiar" className="btn btn-primary shadow-2 mb-3">
                    <i className={'feather icon-copy'} /> Copiar
                  </Button>
                </OverlayTrigger>
                
 
                {permissions.rel === 'S' ? (
                  <OverlayTrigger placement="top" overlay={<Tooltip className="mb-2">Relatório</Tooltip>}>
                    <Button id="btnRelatorio" onClick={() => setShowprint(true)} className="btn btn-primary shadow-2 mb-3">
                      <i className={'feather icon-printer'} /> Relatório
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <></>
                )}
                <Modal backdrop="static" size="lg" show={showprint} centered={true} onHide={handleCloseprint}>
                  <Modal.Header className="h5" closeButton>
                    <i className={'feather icon-printer h1'} />
                    &nbsp;Relatório
                  </Modal.Header>
                  <ModalBody>
                    <ReportOptions
                      title={modulo}
                      columns={columnsvisible.filter((col) => !col.hide)}
                      data={rows}
                      orientation="landscape"
                      showprint={showprint}
                      setShowprint={(data) => setShowprint(data)}
                    ></ReportOptions>
                  </ModalBody>
                </Modal>
                
                */
