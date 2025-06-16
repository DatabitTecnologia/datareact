import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiDropdown, apiList, apiInsert, apiExec } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';
import Select from 'react-select';
import { CreateObject } from '../../../../components/CreateObject';
import { calcObject } from '../../../../utils/calcObject';
import AGGrid from '../../../../components/AGGrid';

const Filter = (props) => {
  const [fields, setFields] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const { valuesfield, valuesfield2 } = props;
  const { setValuesfield, setValuesfield2 } = props;
  const { situacao, setSituacao } = props;
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [carregandomodal, setCarregandomodal] = React.useState(false);
  const [statusprocessamodal, setStatusprocessamodal] = React.useState();
  const [columnsoption, setColumnsoption] = React.useState([]);
  const [rowsoption, setRowsoption] = React.useState([]);
  const [optionslist, setOptionslist] = React.useState([]);
  const [optionselec, setOptionselec] = React.useState();

  const [showoption, setShowoption] = useState(false);
  const handleCloseoption = () => setShowoption(false);

  const Filtrar = () => {
    apiList(
      'Fieldfilter',
      'TB00102_CAMPO, TB00102_FUNCAO, TB00102_FILTRO, TB00102_ORDEM2, TB00102_TIPOFILTRO, TB00102_TABELA, TB00102_TAMANHO, ' +
        'TB00102_USER, TB00102_FOREIGN, TB00102_KEY, TB00102_TABELAREF, TB00102_CAMPOREF, TB00102_DESCRICAOREF, TB00102_ISFOREIGN, TB00102_TIPO, TB00102_TIPOOBJECT, TB00102_TIPOMASCARA, TB00102_DECIMAL ',
      "cast(0 as int) as line, cast(0 as int) as widthfield, cast('' as varchar(10)) as measure, cast(0 as int) as widthname",
      "TB00102_TABELA = '" +
        props.object +
        "' and TB00102_FILTRO = 'S' and TB00102_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "' order by TB00102_ORDEM2"
    ).then((response) => {
      if (response.status === 200) {
        setFields(response.data);
        setCarregando(false);
      }
    });
  };

  useEffect(() => {
    setCarregando(true);
    Filtrar();
  }, [showoption]);

  useEffect(() => {
    calcObject(fields, 70);
    let camposelec = '';
    let seller = Decode64(sessionStorage.getItem('seller'));
    let tmpdisable = [];
    fields.forEach((field, index) => {
      camposelec = field.campo;
      if (camposelec.includes('VENDEDOR') || camposelec.includes('CODVEN')) {
        //console.log(camposelec);
        if (Decode64(sessionStorage.getItem('manager')) === 'N') {
          if (seller !== 'ZZZZ') {
            valuesfield[index] = Decode64(sessionStorage.getItem('seller'));
            setValuesfield([...valuesfield]);
            tmpdisable = tmpdisable.concat(true);
          }
        } else {
          tmpdisable = tmpdisable.concat(false);
        }
      } else {
        tmpdisable = tmpdisable.concat(false);
      }
    });
    setValuesdisable(tmpdisable);
  }, [fields]);

  useEffect(() => {
    apiDropdown(
      'TB00105',
      'TB00105_CODIGO',
      'TB00105_NOME',
      " (TB00105_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "' or TB00105_USER = 'ALL') AND TB00105_TABELA = '" +
        props.object +
        "' "
    ).then((response) => {
      if (response.status === 200) {
        setOptionslist(response.data);
        if (optionslist.length === 0) {
          setOptionslist([{ value: -1, label: 'Não possui itens' }]);
        }
      }
    });
    setColumnsoption([
      { headerClassName: 'header-list', field: 'ordem2', headerName: 'Ordem', width: 70 },
      { headerClassName: 'header-list', field: 'campo', headerName: 'Nome Campo', width: 150 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Descrição do Campo', width: 370 },
      { headerClassName: 'header-list', field: 'nometipo', headerName: 'Tipo Consulta', width: 155 }
    ]);
    setRowsoption([]);
  }, [showoption]);

  const aplicar = () => {
    let filter = ' 0 = 0';
    if (situacao !== 'T') {
      filter = filter + ' and (' + props.table + "_SITUACAO = '" + situacao + "') ";
    }
    fields.forEach((field, index) => {
      if (valuesfield[index] !== '' && valuesfield[index] !== undefined && valuesfield[index] !== 'TODOS') {
        filter = filter + ' and (' + field.campo;
        if (field.tipo !== 'datetime' && field.tipo !== 'smalldatetime') {
          switch (field.tipofiltro) {
            case 1:
              filter = filter + " = '" + valuesfield[index] + "' ";
              break;
            case 2:
              filter = filter + " like '" + valuesfield[index] + "%' ";
              break;
            case 3:
              filter = filter + " between '" + valuesfield[index] + "' ";
              filter = filter + " and '" + valuesfield2[index] + "' ";
              break;
            case 4:
              filter = filter + ' in ' + valuesfield[index];
              break;
            default:
              filter = filter + " = '" + valuesfield[index] + "' ";
          }
        } else {
          const tmdata1 = Date.parse(valuesfield[index]);
          const dt1 = new Date(tmdata1);
          const data1 = dt1.toLocaleDateString('en-US');
          switch (field.tipofiltro) {
            case 1:
              filter = filter + " = '" + data1 + " 00:00:00' ";
              break;
            case 2:
              filter = filter + " = '" + data1 + " 00:00:00' ";
              break;
            case 3: {
              const tmdata2 = Date.parse(valuesfield2[index]);
              const dt2 = new Date(tmdata2);
              const data2 = dt2.toLocaleDateString('en-US');
              filter = filter + " between '" + data1 + " 00:00:00' ";
              filter = filter + " and '" + data2 + " 23:59:00' ";
              break;
            }
            default:
              filter = filter + " = '" + data1 + " 00:00:00' ";
          }
        }
        filter = filter + ')';
      }
    });
    props.setFilters(filter);
    props.handleClosefilter();
  };

  const limpar = () => {
    setSituacao('A');
    props.setFilters(' 0 = 0 and (' + props.table + "_SITUACAO = 'A') ");
    fields.forEach((field, index) => {
      valuesfield[index] = '';
      valuesfield2[index] = '';
    });
    props.handleClosefilter();
  };

  const handleChangesituacao = (e, type) => {
    switch (type) {
      case 0:
        if (e.target.checked) {
          setSituacao('T');
        }
        break;
      case 1:
        if (e.target.checked) {
          setSituacao('A');
        }
        break;
      case 2:
        if (e.target.checked) {
          setSituacao('I');
        }
        break;
      case 3:
        if (e.target.checked) {
          setSituacao('S');
        }
        break;
    }
  };

  const handleChangeoption = (e) => {
    setCarregandomodal(true);
    apiList(
      'OptionfilterField',
      'TB00106_CAMPO, TB00106_FUNCAO, TB00106_FILTRO, TB00106_ORDEM2, TB00106_TIPOFILTRO, TB00106_TABELA, TB00106_TAMANHO ' +
        'TB00106_USER, TB00106_FOREIGN, TB00106_KEY, TB00106_TABELAREF, TB00106_CAMPOREF, TB00106_DESCRICAOREF, TB00106_ISFOREIGN, TB00106_TIPO, TB00106_DECIMAL ',
      'case TB00106_TIPOFILTRO ' +
        "  when 1 then 'Exata' " +
        "  when 2 then 'Aproximada' " +
        "  when 3 then 'Por Intervalo' " +
        "  when 4 then 'Multi-Seleção' " +
        '  end  as nometipo',
      "TB00106_OPTION = '" + e.target.value + "' ORDER BY TB00106_ORDEM2"
    ).then((response) => {
      if (response.status === 200) {
        setRowsoption(response.data);
        setCarregandomodal(false);
        setOptionselec(e.target.value);
      }
    });
  };

  const CancelarOpcao = () => {
    handleCloseoption();
  };

  const SalvarOpcao = () => {
    let itemadd = {};
    if (optionselec !== undefined && optionselec !== -1) {
      setCarregandomodal(true);
      apiExec(
        "DELETE FROM TB00102 WHERE TB00102_TABELA = '" +
          props.object +
          "' and TB00102_USER = '" +
          Decode64(sessionStorage.getItem('user')) +
          "' ",
        'N'
      ).then((response) => {
        if (response.status === 200) {
          rowsoption.forEach((item) => {
            itemadd = {
              campo: item.campo,
              tabela: props.object,
              user: Decode64(sessionStorage.getItem('user')),
              ordem2: item.ordem2,
              filtro: 'S',
              funcao: item.funcao,
              foreign: item.foreign,
              key: item.key,
              tabelaref: item.tabelaref,
              camporef: item.camporef,
              descricaoref: item.descricaoref,
              isforeign: item.isforeign,
              tipofiltro: item.tipofiltro,
              tipo: item.tipo,
              tamanho: item.tamanho,
              decimal: item.decimal
            };
            apiInsert('Fieldfilter', itemadd).then((response) => {
              if (response.status === 200) {
                setStatusprocessamodal('Salvando campo : ' + item.funcao);
                setCarregandomodal(false);
                setStatusprocessamodal('');
                handleCloseoption();
              }
            });
          });
        }
      });
    } else {
      handleCloseoption();
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Button id="btnaplicar" onClick={aplicar} className="btn btn-success shadow-2 mb-3">
            <i className={'feather icon-filter'} /> Filtrar registros
          </Button>
          <Button id="btnlimpar" onClick={limpar} className="btn btn-warning shadow-2 mb-3">
            <i className={'feather icon-x'} /> Limpar filtro
          </Button>
          <Button id="btnOptions" onClick={() => setShowoption(true)} className="btn btn-primary shadow-2 mb-3">
            <i className={'feather icon-info'} /> Opções de filtros
          </Button>
          <Modal backdrop="static" size="lg" show={showoption} centered={true} onHide={handleCloseoption}>
            <Modal.Header className="h5" closeButton>
              <i className={'feather icon-filter h1'} />
              &nbsp;Definir opção de filtro
            </Modal.Header>
            <ModalBody>
              <Row style={{ marginBottom: '10px' }}>
                <Col>
                  <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
                    Escolha uma opção desejada :
                  </p>
                  <Form.Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="opcoes"
                    options={optionslist}
                    onChange={(e) => handleChangeoption(e)}
                    style={{ backgroundColor: '#f4f7fa', fontSize: '14px', height: '44px' }}
                  >
                    {optionslist.map((option, index) => {
                      return (
                        <option className="form-control" value={option.value} key={index}>
                          {option.label}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Row>

              <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
                Listagem de campos :
              </p>
              <AGGrid width="100%" height="465px" rows={rowsoption} columns={columnsoption} loading={carregando}></AGGrid>

              <p></p>
              <p></p>
              <div id="linear-progress">{carregandomodal && <LinearProgress color="primary" />}</div>
              <span className="h6">{statusprocessamodal}</span>
            </ModalBody>
            <ModalFooter>
              <Row style={{ textAlign: 'rigth' }}>
                <Col>
                  <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={() => SalvarOpcao()}>
                    <i className={'feather icon-check'} /> Aplicar
                  </Button>
                  <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={() => CancelarOpcao()}>
                    <i className={'feather icon-x'} />
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>

      <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
      <Row>
        <hr></hr>
        <Col>
          <Form.Check
            className="mb-1 text-muted"
            style={{ fontSize: '13px' }}
            type="radio"
            label="Todos"
            name="todos"
            id="rbtodos"
            checked={situacao === 'T'}
            onChange={(e) => handleChangesituacao(e, 0)}
          />
        </Col>
        <Col>
          <Form.Check
            className="mb-1 text-muted"
            style={{ fontSize: '13px' }}
            type="radio"
            label="Ativos"
            name="ativo"
            id="rbativo"
            checked={situacao === 'A'}
            onChange={(e) => handleChangesituacao(e, 1)}
          />
        </Col>
        <Col>
          <Form.Check
            className="mb-1 text-muted"
            style={{ fontSize: '13px' }}
            type="radio"
            label="Inativos"
            name="inativo"
            id="rbinativo"
            checked={situacao === 'I'}
            onChange={(e) => handleChangesituacao(e, 2)}
          />
        </Col>
        <Col>
          <Form.Check
            className="mb-1 text-muted"
            style={{ fontSize: '13px' }}
            type="radio"
            label="Suspensos"
            name="suspendo"
            id="rbsuspenso"
            checked={situacao === 'S'}
            onChange={(e) => handleChangesituacao(e, 3)}
          />
        </Col>
        <hr></hr>
      </Row>

      <Row>
        {fields.map((field, index) => {
          return (
            <CreateObject
              key={index}
              field={field}
              index={index}
              fields={fields}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesfield2={valuesfield2}
              setValuesfield2={(data) => setValuesfield2(data)}
              invisible={false}
              disabled={valuesdisable[index]}
            ></CreateObject>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export default Filter;
