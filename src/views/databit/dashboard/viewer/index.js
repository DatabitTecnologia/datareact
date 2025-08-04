import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, ModalBody, ModalFooter, Alert } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiFind, apiList, apiExec, apiBrowse } from '../../../../api/crudapi';
import { CreateObject } from '../../../../components/CreateObject';
import DashboardConvert from '../convert';
import DashboardList from '../list';
import DashboardHelp from '../help';
import DashboardParam from '../param';
import DashboardListResult from '../listresult';
import { Decode64 } from '../../../../utils/crypto';

const DashboardViewer = (props) => {
  const { dashboard } = props;
  const [infor, setInfor] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [querys, setQuerys] = React.useState([]);
  const [config, setConfig] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [series, setSeries] = React.useState([]);
  const [showlist, setShowlist] = React.useState(false);
  const handleCloseShowlist = () => setShowlist(false);
  const [showhelp, setShowhelp] = React.useState(false);
  const handleCloseShowhelp = () => setShowhelp(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [showfilter, setShowfilter] = React.useState(false);
  const handleCloseShowfilter = () => setShowfilter(false);
  const [filters, setFilters] = React.useState([]);
  const [valuesfilter, setValuesfilter] = React.useState([]);
  const [valuesfilter2, setValuesfilter2] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [paramdefault, setParamdefault] = React.useState(false);
  const [resutlist, setResultlist] = React.useState([]);
  const [object, setObject] = React.useState('');
  const [view, setView] = React.useState();
  const [colresult, setColresult] = React.useState([]);

  const Filtrar = () => {
    apiFind(
      'Dashboard',
      '*',
      "case when TB00115_TIPOaltura = 0 THEN CAST(TB00115_ALTURA AS varchar(10))+'px' else CAST(TB00115_ALTURA AS varchar(10))+'%' end as height, " +
        "case when TB00115_TIPOlargura = 0 THEN CAST(TB00115_LARGURA AS varchar(10))+'px' else CAST(TB00115_LARGURA AS varchar(10))+'%' end as width",
      "TB00115_CODIGO = '" + dashboard.codigo + "' "
    ).then((response) => {
      if (response.status === 200) {
        setInfor(response.data);
        apiList('DashboardQueryVW', '*', '', "DASHBOARD = '" + dashboard.codigo + "' ORDER BY ORDEM").then((response) => {
          if (response.status === 200) {
            setCarregando(true);
            apiList(
              'DashboardParamVW',
              '*',
              "cast(1 as int) as line, cast(LARGURA as int) as widthfield, cast(LARGURA as varchar(10))+'rem' as measure, cast(LARGURA - 10 as int) as widthname," +
                ' case TIPOOBJECT ' +
                "      when 1 then 'Texto Simples' " +
                "      when 2 then 'Pesquisa' " +
                "      when 4 then 'Numérico' " +
                "      when 5 then 'Data' " +
                "      when 6 then 'Mult-Texto' " +
                "      when 8 then 'Texto Especial' " +
                "      when 99 then 'Variável de Ambiente' " +
                ' end as nometipo ',
              "DASHBOARD = '" + dashboard.codigo + "' ORDER BY ORDEM,ORDEMPARAM"
            ).then((response) => {
              setFilters(response.data);
              apiList('DashboardQueryVW', '*', '', "DASHBOARD = '" + dashboard.codigo + "' order by ORDEM ").then((response) => {
                if (response.status === 200) {
                  setQuerys(response.data);
                  setCarregando(false);
                }
              });
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    if (!showfilter) {
      setFields([
        {
          id: 0,
          campo: 'FERRAMENTAS',
          funcao: 'Barra de Ferramentas',
          tipo: 'int',
          nome: 'toollbar',
          tamanho: 1,
          tipoobject: 9,
          widthfield: 1,
          measure: '12rem',
          valuechecked: '1',
          valueunchecked: '0'
        },
        {
          id: 1,
          campo: 'LABEL',
          funcao: 'Exibir Valores',
          tipo: 'int',
          nome: 'toollbar',
          tamanho: 1,
          tipoobject: 9,
          widthfield: 1,
          measure: '12rem',
          valuechecked: 1,
          valueunchecked: 0
        }
      ]);
      Filtrar();
    }
  }, [showfilter]);

  useEffect(() => {
    valuesfield[1] = 1;
    setValuesfield([...valuesfield]);
  }, [fields]);

  useEffect(() => {
    Processar();
  }, [querys]);

  async function Processar() {
    if (querys !== undefined && querys.length > 0) {
      let tempquerys = querys.slice(0, querys.length);
      tempquerys = tempquerys.sort((a, b) => a.ordem - b.ordem);
      let valserie = [];
      let valcolumns = [];
      const tmpconfig = {};
      tmpconfig['height'] = infor.height;
      tmpconfig['width'] = infor.width;
      tmpconfig['series'] = [];
      tmpconfig['columns'] = [];
      tmpconfig['colors'] = [];
      tmpconfig['colorstitle'] = [];
      tmpconfig['images'] = [];
      tmpconfig['codigo'] = dashboard.codigo;
      setSeries([]);
      let tmpfilter = [];
      let indice = 0;
      let filter = '';
      let tmpfilters = '';
      tempquerys.forEach((item) => {
        filter = item.filter;
        if (filters !== undefined && filters.length > 0) {
          tmpfilters = filters.filter((filtro) => filtro.query === item.query || filtro.type === 1);
          tmpfilters.forEach((filtro) => {
            let param = filtro.nomefiltro;
            let valor = undefined;
            if (filtro.type === 0) {
              valor = valuesfilter[indice];
            } else {
              let session = param;
              session = session.slice(2, -2);
              session = session.toLowerCase();
              valor = Decode64(sessionStorage.getItem(session));
            }
            if (valor === undefined) {
              if (filtro.defaultfield !== '' && filtro.defaultfield !== undefined && filtro.defaultfield !== null) {
                let valuedefault = filtro.defaultfield;
                switch (filtro.tipoobject) {
                  case 4: {
                    // Numérico
                    valor = filtro.defaultfield;
                    break;
                  }
                  case 5: {
                    // Data
                    const tmdata = Date.parse(filtro.defaultfield);
                    const dt = new Date(tmdata);
                    const data = dt.toLocaleDateString('en-US');
                    valor = "'" + data + "'";
                    valuedefault = dt;
                    break;
                  }
                  default: {
                    // Outros
                    valor = "'" + filtro.defaultfield + "'";
                    break;
                  }
                }
                if (valuesfilter[indice] === undefined) {
                  valuesfilter[indice] = valuedefault;
                  setValuesfilter(valuesfilter);
                }
              } else {
                switch (filtro.tipoobject) {
                  case 4: {
                    // Numérico
                    valor = '0';
                    break;
                  }
                  case 5: {
                    // Data
                    valor = 'NULL';
                    break;
                  }
                  default: {
                    // Outros
                    valor = "''";
                    break;
                  }
                }
              }
            } else {
              switch (filtro.tipoobject) {
                case 5: {
                  // Data
                  const tmdata = Date.parse(valor);
                  const dt = new Date(tmdata);
                  const data = dt.toLocaleDateString('en-US');
                  valor = "'" + data + "'";
                  break;
                }
                default: {
                  // Outros
                  valor = "'" + valor + "'";
                  break;
                }
              }
            }
            filter = filter.replace(new RegExp(param, 'g'), valor);
            indice += 1;
          });
        }
        tmpfilter = tmpfilter.concat(filter);
      });

      tempquerys.forEach((item, index) => {
        setCarregando(true);
        let sql = '';
        if (item.tipoquery === 0) {
          if (dashboard.tipo < 34) {
            // Linhas, Areas, Colunas, Barras e Misto
            sql =
              "exec SP00011  '" +
              item.object +
              "','" +
              item.campox +
              "','" +
              item.campoy +
              "','" +
              item.campovalor +
              "','" +
              item.campoordem +
              "'," +
              item.ranking +
              ",'" +
              item.tipoordem +
              "','" +
              tmpfilter[index] +
              "'";
          } else if (dashboard.tipo >= 34 && dashboard.tipo <= 35) {
            // Pizza e Biscoito
            sql =
              'select top ' +
              item.ranking +
              ' ' +
              item.campox +
              ', sum(' +
              item.campovalor +
              ') as ' +
              item.campovalor +
              ' from ' +
              item.object;
            if (tmpfilter[index] !== undefined && tmpfilter[index] !== '') {
              sql += ' where ' + tmpfilter[index];
            }
            sql += 'group by ' + item.campox + ' order by 2 ' + item.tipoordem;
          } else if (dashboard.tipo >= 36 && dashboard.tipo <= 41) {
            // Radial
            sql =
              'select top ' + item.ranking + ' ' + item.campox + ', ' + item.campovalor + ' as ' + item.campovalor + ' from ' + item.object;
            if (tmpfilter[index] !== undefined && tmpfilter[index] !== '') {
              sql += ' where ' + tmpfilter[index];
            }
            sql += ' order by ' + item.campox + ' ' + item.tipoordem;
          } else if (dashboard.tipo === 42) {
            // Card
            sql = 'select sum(' + item.campovalor + ') as ' + item.campovalor + ' from ' + item.object;
            if (tmpfilter[index] !== undefined && tmpfilter[index] !== '') {
              sql += ' where ' + tmpfilter[index];
            }
          } else if (dashboard.tipo === 43) {
            // Listagem
            setCarregando(true);
            apiBrowse(item.object).then(async (response) => {
              if (response.status === 200) {
                setObject(item.object);
                if ((item.ranking ?? 0) <= 0) {
                  sql = 'select row_number() over (order by ' + item.campoordem + ' ' + item.tipoordem + ') as id,';
                } else {
                  sql =
                    'select top ' + item.ranking + ' row_number() over (order by ' + item.campoordem + ' ' + item.tipoordem + ') as id,';
                }
                const fieldsquery = response.data;
                setColresult(response.data);
                fieldsquery.forEach((campo) => {
                  if (campo.type !== 'date') {
                    sql += '[' + campo.field + '],';
                  } else {
                    sql += 'CONVERT(VARCHAR(10),[' + campo.field + '],103) as [' + campo.field + '],';
                  }
                });
                sql = sql.slice(0, -1) + ' from ' + item.object;
                if (tmpfilter[index] !== undefined && tmpfilter[index] !== '') {
                  sql += ' where ' + tmpfilter[index];
                }
                sql += ' order by ' + item.campoordem + ' ' + item.tipoordem;
                apiExec(sql, 'S').then(async (response) => {
                  if (response.status === 200) {
                    setResultlist(response.data);
                    setView(1);
                    setCarregando(false);
                    return;
                  }
                });
              }
            });
          }
        } else {
          sql = 'exec ' + item.object + ' ' + tmpfilter[index];
          if (dashboard.tipo === 43) {
            setCarregando(true);
            apiExec(sql, 'S').then(async (response) => {
              if (response.status === 200) {
                setResultlist(response.data);
                setView(0);
                setCarregando(false);
                return;
              }
            });
          }
        }
        apiExec(sql, 'S').then((response) => {
          if (response.status === 200) {
            let result = response.data;

            const qry = item;

            let tmpcolumns = [];
            if (result.status !== -1 || item.tipoquery !== 0) {
              if (item.tipoquery === 0) {
                tmpcolumns = Object.keys(result[0]);
                tmpcolumns.forEach((col) => {
                  const pos = valcolumns.indexOf(col);
                  if (pos < 0) {
                    valcolumns = valcolumns.concat(col);
                  }
                });
              } else {
                result.forEach((row, index2) => {
                  tmpcolumns = tmpcolumns.concat(row[qry.campox]);
                });
                tmpcolumns.forEach((col) => {
                  const pos = valcolumns.indexOf(col);
                  if (pos < 0) {
                    valcolumns = valcolumns.concat(col);
                  }
                });
              }

              valcolumns = valcolumns.sort((a, b) => a - b);
              let columnsfim = [...new Set(valcolumns)];

              setColumns(columnsfim);

              tmpconfig['type'] = qry.tipodash;
              tmpconfig['titlex'] = qry.titulox;
              tmpconfig['titley'] = qry.tituloy;

              let corfim = {};
              corfim['id'] = qry.ordem;
              corfim['color'] = qry.color;
              tmpconfig['colors'] = tmpconfig['colors'].concat(corfim);
              const colorsorder = tmpconfig['colors'].sort((a, b) => a.id - b.id);
              tmpconfig['colors'] = colorsorder;

              if (dashboard.tipo === 42) {
                corfim = {};
                corfim['id'] = qry.ordem;
                corfim['colorstitle'] = qry.colortitle;
                tmpconfig['colorstitle'] = tmpconfig['colorstitle'].concat(corfim);

                const colorsorder2 = tmpconfig['colorstitle'].sort((a, b) => a.id - b.id);
                tmpconfig['colorstitle'] = colorsorder2;

                corfim = {};
                corfim['id'] = qry.ordem;
                corfim['image'] = qry.imagem;
                tmpconfig['images'] = tmpconfig['images'].concat(corfim);

                const imageorder = tmpconfig['images'].sort((a, b) => a.id - b.id);
                tmpconfig['images'] = imageorder;
              }

              let tmpserie = {};
              if (dashboard.tipo < 34) {
                // Pizza e Radial
                if (item.tipoquery === 0) {
                  if (qry.campoy === qry.campovalor) {
                    tmpserie['data'] = [];
                    valcolumns.forEach((col) => {
                      tmpserie['data'] = tmpserie['data'].concat(0);
                    });
                    const linha = result[0];
                    tmpserie['id'] = qry.ordem;
                    tmpserie['name'] = qry.nome;
                    if (qry.type > -1) {
                      switch (qry.type) {
                        case 0: {
                          tmpserie['type'] = 'line';
                          break;
                        }
                        case 1: {
                          tmpserie['type'] = 'column';
                          break;
                        }
                        case 2: {
                          tmpserie['type'] = 'area';
                          break;
                        }
                      }
                    }
                    tmpcolumns.forEach((col) => {
                      const pos = columnsfim.indexOf(col);
                      tmpserie['data'][pos] = linha[col];
                    });
                    valserie = valserie.concat(tmpserie);
                  } else {
                    tmpserie['data'] = [];
                    valcolumns.forEach((col) => {
                      if (col !== qry.campoy) {
                        tmpserie['data'] = tmpserie['data'].concat(0);
                      }
                    });
                    result.forEach((row, index2) => {
                      tmpserie['id'] = index2;
                      tmpserie['name'] = row[qry.campoy];
                      if (qry.type > -1) {
                        switch (qry.type) {
                          case 0: {
                            tmpserie['type'] = 'line';
                            break;
                          }
                          case 1: {
                            tmpserie['type'] = 'column';
                            break;
                          }
                          case 2: {
                            tmpserie['type'] = 'area';
                            break;
                          }
                        }
                      }
                      tmpcolumns.forEach((col) => {
                        if (col !== qry.campoy) {
                          const pos = columnsfim.indexOf(col);
                          tmpserie['data'][pos] = row[col];
                        }
                      });
                      valserie = valserie.concat(tmpserie);
                    });
                  }
                } else {
                  tmpserie['data'] = [];
                  tmpserie['id'] = qry.ordem;
                  tmpserie['name'] = qry.nome;
                  if (qry.type > -1) {
                    switch (qry.type) {
                      case 0: {
                        tmpserie['type'] = 'line';
                        break;
                      }
                      case 1: {
                        tmpserie['type'] = 'column';
                        break;
                      }
                      case 2: {
                        tmpserie['type'] = 'area';
                        break;
                      }
                    }
                  }
                  result.forEach((row, index2) => {
                    tmpserie['data'] = tmpserie['data'].concat(row[qry.campoy]);
                  });
                  valserie = valserie.concat(tmpserie);
                }
              } else {
                tmpserie['data'] = [];
                tmpserie['id'] = qry.ordem;
                tmpserie['name'] = qry.nome;
                tmpcolumns = [];
                result.forEach((row, index2) => {
                  tmpserie['data'] = tmpserie['data'].concat(row[item.campovalor]);
                  tmpcolumns = tmpcolumns.concat(row[item.campox]);
                });
                valserie = valserie.concat(tmpserie);
                setColumns(tmpcolumns);
              }
              const seriesfim = valserie.sort((a, b) => a.id - b.id);
              setSeries(seriesfim);
              setConfig(tmpconfig);
            } else {
              const mensagem = result.mensagem;
              if (!mensagem.includes('No results')) {
                setItemvariant(0);
                setMensagem(result.mensagem);
              }
            }
            setCarregando(false);
          }
        });
      });
    }
  }

  return (
    <React.Fragment>
      {dashboard.tipo <= 41 ? (
        <div id="frmviewer" name="frmviewer">
          <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>

          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">{infor.nome}</Card.Title>
            </Card.Header>
            <Card.Body>
              {parseInt(valuesfield) === 1 && (
                <Row style={{ textAlign: 'right', marginBottom: '5px' }}>
                  <Col>
                    <Button id="btnFiltrar" className="btn-icon btn-primary" onClick={Filtrar}>
                      <i className={'feather icon-filter'} />
                    </Button>
                    <Button id="btnParam" className="btn-icon btn-primary" onClick={() => setShowfilter(true)}>
                      <i className={'feather icon-external-link'} />
                    </Button>
                    {dashboard.tipo !== 43 && (
                      <Button id="btnList" className="btn-icon btn-success" onClick={() => setShowlist(true)}>
                        <i className={'feather icon-list'} />
                      </Button>
                    )}
                    <Button id="btnHelp" className="btn-icon btn-warning" onClick={() => setShowhelp(true)}>
                      <i className={'feather icon-help-circle'} />
                    </Button>
                  </Col>
                </Row>
              )}

              <Row>
                {series?.length > 0 && (
                  <DashboardConvert config={config} columns={columns} series={series} labels={parseInt(valuesfield[1]) === 1} />
                )}
              </Row>
            </Card.Body>
          </Card>
          <Row style={{ marginTop: '10px' }}>
            {fields.map((field, index) => (
              <CreateObject
                key={index}
                field={field}
                index={field.id}
                fields={fields}
                valuesfield={valuesfield}
                setValuesfield={setValuesfield}
                disabled={false}
              />
            ))}
          </Row>

          <Row>
            <Alert
              show={mensagem !== '' && mensagem !== undefined}
              dismissible
              variant={alertVariants[itemvariant]}
              onClick={() => setMensagem(undefined)}
            >
              {mensagem}
            </Alert>
          </Row>
        </div>
      ) : (
        <>
          {dashboard.tipo === 42 && ( // Painel
            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
              {series?.length > 0 && (
                <DashboardConvert config={config} columns={columns} series={series} labels={parseInt(valuesfield?.[1] ?? '0', 10) === 1} />
              )}
            </Row>
          )}
          {dashboard.tipo === 43 && ( // Listagem
            <div id="frmviewer" name="frmviewer">
              <Card className="Recent-Users" style={{ marginBottom: '10px' }}>
                <Card.Header>
                  <Card.Title as="h5">{infor.nome}</Card.Title>
                </Card.Header>
                <Card.Body>
                  {parseInt(valuesfield) === 1 && (
                    <Row style={{ textAlign: 'right', marginBottom: '5px' }}>
                      <Col>
                        <Button id="btnFiltrar" className="btn-icon btn-primary" onClick={Filtrar}>
                          <i className={'feather icon-filter'} />
                        </Button>
                        <Button id="btnParam" className="btn-icon btn-success" onClick={() => setShowfilter(true)}>
                          <i className={'feather icon-external-link'} />
                        </Button>

                        <Button id="btnHelp" className="btn-icon btn-warning" onClick={() => setShowhelp(true)}>
                          <i className={'feather icon-help-circle'} />
                        </Button>
                      </Col>
                    </Row>
                  )}
                  <Row>
                    {resutlist !== undefined && (
                      <DashboardListResult
                        resutlist={resutlist}
                        setResultlist={(data) => setResultlist(data)}
                        colresult={colresult}
                        setColresult={(data) => setColresult(data)}
                        report={infor.nome}
                      />
                    )}
                  </Row>
                </Card.Body>
              </Card>
              <Row>
                {fields.map((field, index) => (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fields}
                    valuesfield={valuesfield}
                    setValuesfield={setValuesfield}
                    disabled={false}
                  />
                ))}
              </Row>
            </div>
          )}
        </>
      )}
      <Modal backdrop="static" size="xl" show={showlist} centered onHide={handleCloseShowlist}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-list h1'} />
          &nbsp;Visualização em Listagem
        </Modal.Header>
        <ModalBody>
          <DashboardList columns={columns} series={series} />
        </ModalBody>
        <ModalFooter>
          <Row style={{ textAlign: 'right', marginBottom: '5px' }}>
            <Col>
              <Button id="btnSair" className="btn btn-success" onClick={() => setShowlist(false)}>
                <i className={'feather icon-x'} />
                Fechar
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>

      <Modal backdrop="static" size="xl" show={showhelp} centered onHide={handleCloseShowhelp}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-help-circle h1'} />
          &nbsp;Help
        </Modal.Header>
        <ModalBody>
          <DashboardHelp dashboard={dashboard} />
        </ModalBody>
        <ModalFooter>
          <Row style={{ textAlign: 'right', marginBottom: '5px' }}>
            <Col>
              <Button id="btnSair" className="btn btn-success" onClick={() => setShowhelp(false)}>
                <i className={'feather icon-x'} />
                Fechar
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>

      <Modal backdrop="static" size="xl" show={showfilter} centered onHide={handleCloseShowfilter}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-external-link h1'} />
          &nbsp;Parâmetros de Filtros
        </Modal.Header>
        <ModalBody>
          <DashboardParam
            dashboard={dashboard}
            showfilter={showfilter}
            querys={querys}
            setQuerys={setQuerys}
            setShowfilter={setShowfilter}
            filters={filters}
            setFilters={setFilters}
            valuesfilter={valuesfilter}
            setValuesfilter={setValuesfilter}
            valuesfilter2={valuesfilter2}
            setValuesfilter2={setValuesfilter2}
            paramdefault={paramdefault}
            setParamdefault={setParamdefault}
          />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default DashboardViewer;
