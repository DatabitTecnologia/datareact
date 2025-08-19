import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiExec, apiUpdate, apiFieldsDict } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';
import Validation from '../validation';

const FieldsValidation = (props) => {
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columnsselec, setColumnsselec] = React.useState([]);
  const [rowsselect, setRowsselect] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [itemselect, setItemselect] = React.useState();
  const [itemselect2, setItemselect2] = React.useState();
  const [statusprocessa, setStatusprocessa] = React.useState();
  const [fields, setFields] = React.useState([]);

  const [showvalid, setShowvalid] = useState(false);
  const handleCloseShowvalid = () => setShowvalid(false);

  const Filtrar = () => {
    setCarregando(true);
    apiList(
      'Paramfield',
      'TB00003_CAMPO, TB00003_FUNCAO, TB00003_SINAL,' +
        'TB00003_TIPOTAB,TB00003_VALORVAL,TB00003_MENSAGEM,TB00003_CAMVAL1,' +
        'TB00003_VOLTAR,TB00003_COR, TB00003_TABELA, TB00003_CORWEB',
      '',
      "TB00003_TABELA = '" +
        props.object +
        "' and TB00003_SELEC4 = 'N' and (charindex('" +
        props.table +
        "',TB00003_CAMPO)> 0 or charindex('TB00012',TB00003_CAMPO)> 0) ORDER BY TB00003_FUNCAO"
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
      }
    });

    apiList(
      'Paramfield',
      'TB00003_CAMPO, TB00003_FUNCAO, TB00003_SINAL,' +
        'TB00003_TIPOTAB,TB00003_VALORVAL,TB00003_MENSAGEM,TB00003_CAMVAL1,' +
        'TB00003_VOLTAR,TB00003_COR, TB00003_TABELA, TB00003_CORWEB',
      '',
      "TB00003_TABELA = '" + props.object + "' and TB00003_SELEC4 = 'S' ORDER BY TB00003_FUNCAO "
    ).then((response) => {
      if (response.status === 200) {
        setRowsselect(response.data);
      }
    });

    apiFieldsDict(props.object).then((response) => {
      if (response.status === 200) {
        setFields(response.data);
        setCarregando(false);
      }
    });
  };

  useEffect(() => {
    props.setOptiontitle('Validações');
    setColumns([
      { headerClassName: 'header-list', field: 'campo', headerName: 'Nome Campo', width: 200 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Descrição do Campo', width: 300 }
    ]);
    setColumnsselec([
      { headerClassName: 'header-list', field: 'campo', headerName: 'Nome Campo', width: 200 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Descrição do Campo', width: 300 }
    ]);
    Filtrar();
  }, []);

  const keyGrid = (newSelection, event) => {
    setItemselect(newSelection);
    if (event.key === 'Enter') {
      Add(newSelection);
    }
  };

  const keyGrid2 = (newSelection, event) => {
    setItemselect2(newSelection);
    if (event.key === 'Enter') {
      Subtract(newSelection);
    }
  };

  const Add = () => {
    if (itemselect !== undefined) {
      let rowsbkp1 = rows.slice(0, rows.length);
      let rowsbkp2 = rowsselect.slice(0, rowsselect.length);
      rowsbkp1 = rows.filter((item) => item.campo !== itemselect.campo);
      let maxid = Math.max(...rowsselect.map((item) => item.id));
      if (maxid === -Infinity) {
        maxid = 0;
      }
      itemselect['id'] = maxid + 1;
      let rowsfim = rowsbkp2.concat(itemselect);
      setRows(rowsbkp1);
      setRowsselect(rowsfim);
    }
  };

  const Subtract = () => {
    if (itemselect2 !== undefined) {
      let rowsbkp1 = rows.slice(0, rows.length);
      let rowsbkp2 = rowsselect.slice(0, rowsselect.length);
      rowsbkp2 = rowsselect.filter((item) => item.campo !== itemselect2.campo);
      let maxid = Math.max(...rows.map((item) => item.id));
      if (maxid === -Infinity) {
        maxid = 0;
      }
      itemselect2['id'] = maxid + 1;
      let rowsfim = rowsbkp1.concat(itemselect2);
      setRows(rowsfim);
      setRowsselect(rowsbkp2);
    }
  };

  const Salvar = () => {
    setCarregando(true);
    setStatusprocessa('Gravando informações, aguarde');
    apiExec(
      "UPDATE TB00003 SET TB00003_SELEC4 = 'N', TB00003_VALORVAL = null,TB00003_SINAL = 0," +
        'TB00003_TIPOTAB = null,TB00003_MENSAGEM = null,TB00003_CAMVAL1 = null,' +
        "TB00003_VOLTAR = null,TB00003_COR = null,TB00003_CORWEB = null WHERE TB00003_TABELA = '" +
        props.object +
        "' ",
      'N'
    ).then((response) => {
      if (response.status === 200) {
        rowsselect.forEach((item) => {
          item.selec4 = 'S';
          setStatusprocessa('Gravando informações campo : ' + item.funcao);
          apiUpdate('Paramfield', item).then((response) => {
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

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Button id="btnGravar" className="btn btn-success shadow-2 mb-2" onClick={() => Salvar()}>
            <i className={'feather icon-save'} /> Salvar alterações
          </Button>
          <Button id="btnRefazer" className="btn btn-warning shadow-2 mb-2" onClick={() => Filtrar()}>
            <i className={'feather icon-repeat'} /> Refazer campos
          </Button>
        </Col>
      </Row>
      <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
      <Row style={{ display: 'flex', height: '60%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '48%', marginRight: '5px' }}>
            <AGGrid
              width="100%"
              height="465px"
              rows={rows}
              columns={columns}
              loading={carregando}
              onKeyDown={keyGrid}
              onDoubleClick={Add}
              item={itemselect}
              setItem={(data) => setItemselect(data)}
            ></AGGrid>
          </div>
          <div style={{ width: '4%', marginLeft: '20px' }}>
            <Row>
              {itemselect !== undefined ? (
                <Button id="btnValid" className="btn-icon" onClick={() => Add()}>
                  <i className={'feather icon-chevron-right'} />
                </Button>
              ) : (
                <></>
              )}
              {itemselect2 !== undefined ? (
                <Button id="btnNotvalid" className="btn-icon" onClick={() => Subtract()}>
                  <i className={'feather icon-chevron-left'} />
                </Button>
              ) : (
                <></>
              )}
              <p></p>
              <p></p>
              <p></p>
              {itemselect2 !== undefined ? (
                <Button id="btnAltvalid" className="btn-icon btn-success" onClick={() => setShowvalid(true)}>
                  <i className={'feather icon-edit'} />
                </Button>
              ) : (
                <></>
              )}
              <Modal backdrop="static" size="lg" show={showvalid} centered={true} onHide={handleCloseShowvalid}>
                <Modal.Header className="h5" closeButton>
                  <i className={'feather icon-award h1'} />
                  &nbsp;Validações de campos
                </Modal.Header>
                <ModalBody>
                  <Validation
                    itemselect={itemselect2}
                    setItemselect={(data) => setItemselect2(data)}
                    showvalid={showvalid}
                    setShowvalid={(data) => setShowvalid(data)}
                    object={props.object}
                  ></Validation>
                </ModalBody>
              </Modal>
            </Row>
          </div>
          <div style={{ width: '48%', marginLeft: '5px' }}>
            <AGGrid
              width="100%"
              height="465px"
              rows={rowsselect}
              columns={columnsselec}
              loading={carregando}
              onKeyDown={keyGrid2}
              onDoubleClick={Subtract}
              item={itemselect2}
              setItem={(data) => setItemselect2(data)}
            ></AGGrid>
          </div>
        </div>
        <span className="h6">{statusprocessa}</span>
      </Row>
    </React.Fragment>
  );
};

export default FieldsValidation;
