import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Modal, ModalBody, ModalFooter, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiList, apiUpdate } from '../../../../api/crudapi';
import FieldSelect from '../fieldselect';
import AGGrid from '../../../../components/AGGrid';
import Script from '../script';
import { Decode64 } from '../../../../utils/crypto';

const FieldsForm = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [filtered, setFiltered] = React.useState(false);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [itemselec, setItemselec] = React.useState();
  const [widthform, setWidthform] = React.useState();
  const [showfield, setShowfield] = useState(false);
  const handleClosefield = () => setShowfield(false);
  const [updatefield, setUpdatefield] = useState(false);
  const [titlemodal, setTitlemodal] = React.useState(undefined);
  const [validations, setValidations] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [showscript, setShowscript] = useState(false);
  const handleClosescript = () => setShowscript(false);
  const [selecao, setSelecao] = React.useState([]);
  const [listfields, setListfields] = React.useState([]);
  const [ordem, setOrdem] = React.useState(0);
  const [anterior, setAnterior] = React.useState();
  const [atual, setAtual] = React.useState();

  useEffect(() => {
    setWidthform(parseInt(window.screen.width * 0.06333));
    setValuesdisable([false, false, false, false]);
    setColumns([
      { headerClassName: 'header-list', field: 'ordem', headerName: 'Ordem', width: 80, type: 'number' },
      { headerClassName: 'header-list', field: 'campo', headerName: 'Nome do Campo', width: 200 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Descrição do Campo', width: 300 },
      { headerClassName: 'header-list', field: 'tipo', headerName: 'Tipo', width: 100 },
      { headerClassName: 'header-list', field: 'tamanho', headerName: 'Tamanho', width: 80, type: 'number' },
      { headerClassName: 'header-list', field: 'nometipo', headerName: 'Tipo Objeto', width: 140 },
      { headerClassName: 'header-list', field: 'largura', headerName: 'Largura (rem)', width: 140, type: 'number' }
    ]);
    setFields([
      {
        id: 0,
        campo: 'TB00109_FORM',
        funcao: 'Formulário selecionado',
        tipo: 'varchar',
        nome: 'form',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 68,
        measure: '66rem',
        tabelaref: 'TB00108',
        widthname: 57,
        filteraux:
          " AND TB00108_GRUPO IN (SELECT TB00107_CODIGO FROM TB00107 WHERE TB00107_TABELA = '" +
          props.table +
          "') and TB00108_SYSTEM = " +
          Decode64(sessionStorage.getItem('system')),
        disabled: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'TB00109_SELEC',
        funcao: 'Exibir Campos ocultos',
        tipo: 'varchar',
        nome: 'oculto',
        tamanho: 1,
        tipoobject: 9,
        widthfield: 1,
        measure: '20rem',
        valuechecked: 'S',
        valueunchecked: 'N',
        disabled: valuesdisable[1]
      },
      {
        id: 2,
        campo: 'TB00109_MULT',
        funcao: 'Ativar Multi-Seleção',
        tipo: 'varchar',
        nome: 'mult',
        tamanho: 1,
        tipoobject: 9,
        widthfield: 1,
        measure: '20rem',
        valuechecked: 'S',
        valueunchecked: 'N',
        disabled: valuesdisable[2]
      },
      {
        id: 3,
        campo: 'TB00109_CREATE',
        funcao: 'Adicionar criação de Campo',
        tipo: 'varchar',
        nome: 'create',
        tamanho: 1,
        tipoobject: 9,
        widthfield: 1,
        measure: '20rem',
        valuechecked: 'S',
        valueunchecked: 'N',
        disabled: valuesdisable[3]
      }
    ]);

    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['selec', 'user'];
    validation['sinal'] = [1, 1];
    validation['tipotab'] = 'G';
    validation['valorval'] = ['N', 1];
    validation['cor'] = ['#ffff99', '#66ff99'];
    validation['total'] = 2;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);
  }, []);

  const Filtrar = () => {
    let filtro = " TB00109_FORM = '" + valuesfield[0] + "' ";
    if (valuesfield[1] === 'N' || valuesfield[1] === undefined) {
      filtro = filtro + " and TB00109_SELEC = 'S' ";
    }
    filtro = filtro + ' ORDER BY TB00109_ORDEM ';
    setCarregando(true);
    apiList(
      'FormVW',
      'TB00108_CODIGO, TB00108_NOME, TB00108_SITUACAO, TB00108_GRUPO, TB00108_PADRAO, TB00108_TIPO, TB00108_CODREACT, TB00108_LARGURA, TB00108_ORDEM',
      'TB00107_NOME AS nomegrupo',
      "TB00108_CODIGO = '" + valuesfield[0] + "' "
    ).then((response) => {
      if (response.status === 200) {
        setWidthform(parseInt((widthform * response.data.largura) / 100));
        apiList(
          'FieldForm',
          'TB00109_TABELA,TB00109_CAMPO,TB00109_ISPRIMARY,TB00109_FUNCAO,TB00109_SELEC,TB00109_ORDEM,TB00109_FORM,TB00109_TIPO,TB00109_TAMANHO,' +
            'TB00109_FOREIGN,TB00109_KEY,TB00109_TABELAREF,TB00109_CAMPOREF,TB00109_DESCRICAOREF,TB00109_ISFOREIGN,TB00109_TIPOOBJECT,TB00109_TIPOMASCARA,' +
            'TB00109_DECIMAL,TB00109_LARGURA,TB00109_VALUECHECKED,TB00109_VALUEUNCHECKED,TB00109_ITENS,TB00109_VALUES,TB00109_VIEW,TB00109_MASCARA,TB00109_TIPOMULT,TB00109_SYSTEM,TB00109_USER',
          "cast(0 as int) as line, cast(0 as int) as widthfield, cast('' as varchar(10)) as measure, cast(0 as int) as widthname," +
            ' case TB00109_TIPOOBJECT ' +
            "      when 1 then 'Texto Simples' " +
            "      when 2 then 'Pesquisa' " +
            "      when 4 then 'Numérico' " +
            "      when 5 then 'Data' " +
            "      when 6 then 'Mult-Texto' " +
            "      when 8 then 'Texto Especial' " +
            "      when 9 then 'CheckBox' " +
            "      when 10 then 'Radio' " +
            "      when 11 then 'DropDown' " +
            "      when 12 then 'DropDown' " +
            "      when 13 then 'Password' " +
            ' end as nometipo ',
          filtro
        ).then((response) => {
          if (response.status === 200) {
            setRows(response.data);
            setCarregando(false);
            let tmpordem = 0;
            response.data.forEach((item) => {
              if (item.selec === 'S') {
                item.ordem = tmpordem + 1;
                setOrdem(tmpordem + 1);
                tmpordem += 1;
              } else {
                item.ordem = 99999;
              }
              apiUpdate('FieldForm', item).then((response) => {
                if (response.status === 200) {
                  setCarregando(false);
                }
              });
            });
            setFiltered(true);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (!showfield && valuesfield[0] !== '' && valuesfield[0] !== undefined && valuesfield[1] !== null) {
      Filtrar();
    }
  }, [showfield]);

  useEffect(() => {
    valuesdisable[3] = valuesfield[2] === 'N' || valuesfield[2] === undefined;
    setValuesdisable([...valuesdisable]);
  }, [valuesfield[2]]);

  useEffect(() => {
    let itens = '';
    if (selecao !== undefined && selecao.length > 0) {
      console.log(selecao);
      selecao.forEach((x) => {
        itens += x.campo + ',';
      });
    }
    setListfields(itens);
  }, [selecao]);

  useEffect(() => {
    if (atual !== undefined) {
      setCarregando(true);
      apiUpdate('FieldForm', atual).then((response) => {
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
      apiUpdate('FieldForm', anterior).then((response) => {
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

  const Editar = () => {
    if (itemselec !== undefined) {
      setUpdatefield(true);
      setTitlemodal('Editar Campo');
      setShowfield(true);
    }
  };

  const Incluir = () => {
    setItemselec(undefined);
    setUpdatefield(false);
    setTitlemodal('Novo Campo');
    setShowfield(true);
  };

  const clickGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  const keyGrid = (newSelection, event) => {
    setItemselec(newSelection);
    if (event.key === 'Enter') {
      setUpdatefield(true);
      setTitlemodal('Editar Campo');
      setShowfield(true);
    }
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setUpdatefield(true);
    setTitlemodal('Editar Campo');
    setShowfield(true);
  };

  return (
    <React.Fragment>
      <div id="frmform" name="frmform">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">Campos</Card.Title>
          </Card.Header>
          <Row style={{ marginLeft: '10px' }}>
            <Row style={{ marginLeft: '1px' }}>
              {fields.map((field, index) => (
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
                  disabled={valuesdisable[field.id]}
                ></CreateObject>
              ))}
            </Row>

            <Row style={{ marginTop: '5px' }}>
              <AGGrid
                width="100%"
                height="330px"
                rows={rows}
                columns={columns}
                loading={carregando}
                onKeyDown={keyGrid}
                onDoubleClick={dblClickGrid}
                onCelClick={clickGrid}
                validations={validations}
                multselec={valuesfield[2] === 'S'}
                onMultselec={setSelecao}
              ></AGGrid>
            </Row>
          </Row>
          <hr></hr>
          <Row style={{ marginBottom: '1px', marginLeft: '10px' }}>
            <Col>
              <Row style={{ height: '20px' }}>
                <Col lg={1}>
                  <div style={{ height: '25px', width: '25px', backgroundColor: '#ffff99', border: 'solid', borderWidth: '2px' }}></div>
                </Col>
                <Col lg={11}>
                  <p style={{ marginTop: '4px' }} className="text-muted">
                    Campos Ocultos
                  </p>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row style={{ height: '20px' }}>
                <Col lg={1}>
                  <div style={{ height: '25px', width: '25px', backgroundColor: '#66ff99', border: 'solid', borderWidth: '2px' }}></div>
                </Col>
                <Col lg={11}>
                  <p style={{ marginTop: '4px' }} className="text-muted">
                    Campos Personalizados
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr></hr>
          <Row style={{ textAlign: 'center', marginTop: '10px' }}>
            <Col>
              <Button id="btnfiltrar" className="btn btn-success shadow-2 mb-3" onClick={Filtrar}>
                <i className={'feather icon-filter'} /> Filtrar
              </Button>
              {valuesfield[0] !== '' && valuesfield[0] !== undefined && valuesfield[0] !== null && itemselec !== undefined ? (
                <Button id="btnUp" className="btn btn-primary shadow-2 mb-3" disabled={!filtered} onClick={() => Upp()}>
                  <i className={'feather icon-chevron-up'} /> Subir
                </Button>
              ) : (
                <></>
              )}
              {valuesfield[0] !== '' && valuesfield[0] !== undefined && valuesfield[0] !== null && itemselec !== undefined ? (
                <Button id="btnDown" className="btn btn-primary shadow-2 mb-3" disabled={!filtered} onClick={() => Down()}>
                  <i className={'feather icon-chevron-down'} /> Descer
                </Button>
              ) : (
                <></>
              )}
              {valuesfield[0] !== '' && valuesfield[0] !== undefined && valuesfield[0] !== null ? (
                <Button id="btnNovo" className="btn btn-warning shadow-2 mb-3" disabled={!filtered} onClick={() => Incluir()}>
                  <i className={'feather icon-star'} /> Novo
                </Button>
              ) : (
                <></>
              )}
              {valuesfield[0] !== '' && valuesfield[0] !== undefined && valuesfield[0] !== null && itemselec !== undefined ? (
                <Button id="btnEditar" className="btn btn-warning shadow-2 mb-3" disabled={!filtered} onClick={() => Editar()}>
                  <i className={'feather icon-edit'} /> Editar
                </Button>
              ) : (
                <></>
              )}
              {valuesfield[2] === 'S' ? (
                <Button id="btnScript" className="btn btn-success shadow-2 mb-3" disabled={!filtered} onClick={() => setShowscript(true)}>
                  <i className={'feather icon-zap'} /> Gerar Script
                </Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Modal backdrop="static" size="lg" show={showfield} centered={true} onHide={handleClosefield}>
            <Modal.Header className="h5" closeButton>
              <i className={'feather icon-list h1'} />
              &nbsp;{titlemodal}
            </Modal.Header>
            <ModalBody>
              <FieldSelect
                itemselect={itemselec}
                updatefield={updatefield}
                table={props.table}
                object={props.object}
                primarykey={props.primarykey}
                handleClosefield={handleClosefield}
                formselec={valuesfield[0]}
                formselecname={valuesfield2[0]}
                ultordem={rows.length}
              ></FieldSelect>
            </ModalBody>
          </Modal>
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
        </Card>
        <Modal backdrop="static" fullscreen={true} show={showscript} centered={true} onHide={handleClosescript}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-zap h1'} />
            &nbsp;Geração de Script
          </Modal.Header>
          <ModalBody>
            <Script table={props.table} view={props.object} option={2} itensfield={listfields} create={valuesfield[3] === 'S'}></Script>
          </ModalBody>
          <ModalFooter>
            <Row style={{ textAlign: 'rigth', marginTop: '10px' }}>
              <Col>
                <Button id="btnFechar" className="btn btn-success shadow-2 mb-3" onClick={() => setShowscript(false)}>
                  <i className={'feather icon-x'} /> Fechar
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default FieldsForm;
