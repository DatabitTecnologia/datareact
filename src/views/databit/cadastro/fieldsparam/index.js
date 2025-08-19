import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiExec, apiUpdate } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';
import Parameter from '../parameter';

const FieldsParam = (props) => {
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columnsselec, setColumnsselec] = React.useState([]);
  const [rowsselect, setRowsselect] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [itemselect, setItemselect] = React.useState();
  const [itemselect2, setItemselect2] = React.useState();
  const [statusprocessa, setStatusprocessa] = React.useState();

  const [showparam, setShowparam] = useState(false);
  const handleCloseShowparam = () => setShowparam(false);

  const Filtrar = () => {
    setCarregando(true);
    apiList(
      'Paramfield',
      '*',
      '',
      "TB00003_TABELA = '" +
        props.object +
        "' and TB00003_SELEC2 = 'N' and (charindex('" +
        props.table +
        "',TB00003_CAMPO)> 0 or charindex('TB00012',TB00003_CAMPO)> 0) ORDER BY TB00003_FUNCAO"
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
      }
    });

    apiList('Paramfield', '*', '', "TB00003_TABELA = '" + props.object + "' and TB00003_SELEC2 = 'S' ORDER BY TB00003_FUNCAO").then(
      (response) => {
        if (response.status === 200) {
          setRowsselect(response.data);
          setCarregando(false);
        }
      }
    );
  };

  useEffect(() => {
    props.setOptiontitle('Parametrizações');
    setColumns([
      { headerClassName: 'header-list', field: 'campo', headerName: 'Nome Campo', width: 200 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Descrição do Campo', width: 290 }
    ]);
    setColumnsselec([
      { headerClassName: 'header-list', field: 'campo', headerName: 'Nome Campo', width: 200 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Descrição do Campo', width: 310 }
    ]);
    Filtrar();
  }, []);

  const keyGrid = (newSelection, event) => {
    setItemselect(newSelection);
    if (event.key === 'Enter') {
      Add();
    }
  };

  const keyGrid2 = (newSelection, event) => {
    setItemselect2(newSelection);
    if (event.key === 'Enter') {
      Subtract();
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
      "UPDATE TB00003 SET TB00003_SELEC2 = 'N', TB00003_VALOR = NULL, TB00003_DIGITA = 'N' WHERE TB00003_TABELA = '" + props.object + "' ",
      'N'
    ).then((response) => {
      if (response.status === 200) {
        rowsselect.forEach((item) => {
          item.selec2 = 'S';
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
                <Button id="btnFixparam" className="btn-icon" onClick={() => Add()}>
                  <i className={'feather icon-chevron-right'} />
                </Button>
              ) : (
                <></>
              )}
              {itemselect2 !== undefined ? (
                <Button id="btnLibparam" className="btn-icon" onClick={() => Subtract()}>
                  <i className={'feather icon-chevron-left'} />
                </Button>
              ) : (
                <></>
              )}

              <p></p>
              <p></p>
              <p></p>
              {itemselect2 !== undefined ? (
                <Button id="btnEditar" className="btn-icon btn-success" onClick={() => setShowparam(true)}>
                  <i className={'feather icon-edit'} />
                </Button>
              ) : (
                <></>
              )}
              <Modal backdrop="static" size="lg" show={showparam} centered={true} onHide={handleCloseShowparam}>
                <Modal.Header className="h5" closeButton>
                  <i className={'feather icon-tablet h1'} />
                  &nbsp;Parametrização de campos
                </Modal.Header>
                <ModalBody>
                  <Parameter
                    itemselect={itemselect2}
                    setItemselect={(data) => setItemselect2(data)}
                    showparam={showparam}
                    setShowparam={(data) => setShowparam(data)}
                  ></Parameter>
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

export default FieldsParam;
