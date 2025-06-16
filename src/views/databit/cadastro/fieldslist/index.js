import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalBody, ModalFooter, Form } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiExec, apiInsert, apiDropdown } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';
import AGGrid from '../../../../components/AGGrid';
import SaveList from '../savelist';

const FieldsList = (props) => {
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columnsselec, setColumnsselec] = React.useState([]);
  const [rowsselect, setRowsselect] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [ordernar, setOrdenar] = React.useState(false);
  const [itemselect, setItemselect] = React.useState();
  const [itemselect2, setItemselect2] = React.useState();
  const [ordem, setOrdem] = React.useState(0);
  const [statusprocessa, setStatusprocessa] = React.useState();
  const [showsave, setShowsave] = useState(false);
  const handleCloseShowsave = () => setShowsave(false);

  const Filtrar = () => {
    setCarregando(true);
    setOrdenar(false);
    apiList(
      'Paramfield',
      'TB00003_CAMPO, TB00003_FUNCAO, 0 as TB00003_ORDEM, TB00003_SELEC, TB00003_TABELA',
      '',
      "TB00003_TABELA = '" +
        props.object +
        "' and not exists (select * from TB00101 where TB00101_TABELA = '" +
        props.object +
        "' " +
        " and TB00101_CAMPO = TB00003_CAMPO and TB00101_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "') " +
        'order by TB00003_FUNCAO '
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
      }
    });

    apiList(
      'Fieldlist',
      'TB00101_CAMPO, TB00101_FUNCAO, TB00101_ORDEM, TB00101_SELEC, TB00101_TABELA, TB00101_USER',
      '',
      "TB00101_TABELA = '" +
        props.object +
        "' and TB00101_SELEC = 'S' and TB00101_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "' order by TB00101_ORDEM"
    ).then((response) => {
      if (response.status === 200) {
        setRowsselect(response.data);
        setCarregando(false);
        setOrdenar(true);
      }
    });
  };

  useEffect(() => {
    props.setOptiontitle('Opções de listagem');
    setColumns([
      { headerClassName: 'header-list', field: 'campo', headerName: 'Nome Campo', width: 200 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Descrição do Campo', width: 300 }
    ]);
    setColumnsselec([
      { headerClassName: 'header-list', field: 'ordem', headerName: 'Ordem', width: 70 },
      { headerClassName: 'header-list', field: 'campo', headerName: 'Nome Campo', width: 200 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Descrição do Campo', width: 220 }
    ]);

    Filtrar();
  }, []);

  useEffect(() => {
    rowsselect.forEach((item, i) => {
      item.ordem = i + 1;
      setOrdem(i + 1);
    });
  }, [ordernar]);

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
      rowsbkp2 = rowsbkp2.sort((a) => a.ordem);
      let maxid = Math.max(...rowsselect.map((item) => item.id));
      if (maxid === -Infinity) {
        maxid = 0;
      }
      itemselect['id'] = maxid + 1;
      itemselect['ordem'] = ordem + 1;
      let rowsfim = rowsbkp2.concat(itemselect);
      setRows(rowsbkp1);
      setRowsselect(rowsfim);
      setOrdem(ordem + 1);
    }
  };

  const Subtract = () => {
    if (itemselect2 !== undefined) {
      let rowsbkp1 = rows.slice(0, rows.length);
      let rowsbkp2 = rowsselect.slice(0, rowsselect.length);
      rowsbkp2 = rowsselect.filter((item) => item.campo !== itemselect2.campo);
      itemselect2['ordem'] = 0;
      let maxid = Math.max(...rows.map((item) => item.id));
      if (maxid === -Infinity) {
        maxid = 0;
      }
      itemselect2['id'] = maxid + 1;
      let rowsfim = rowsbkp1.concat(itemselect2);
      let tmpordem = 0;
      rowsbkp2.forEach((item) => {
        tmpordem += 1;
        item['ordem'] = tmpordem;
      });
      setOrdem(tmpordem);
      setRows(rowsfim);
      setRowsselect(rowsbkp2);
    }
  };

  const Upp = () => {
    if (itemselect2 !== undefined) {
      if (itemselect2['ordem'] !== 1) {
        let rowsbkp2 = rowsselect.slice(0, rowsselect.length);
        let itematual = rowsbkp2.findIndex((a) => a.ordem === itemselect2.ordem);
        let itemant = rowsbkp2.findIndex((a) => a.ordem === itemselect2.ordem - 1);
        rowsbkp2[itematual]['ordem'] = rowsbkp2[itematual]['ordem'] - 1;
        rowsbkp2[itemant]['ordem'] = rowsbkp2[itemant]['ordem'] + 1;
        setRowsselect(rowsbkp2);
      }
    }
  };

  const Down = () => {
    if (itemselect2 !== undefined) {
      if (itemselect2['ordem'] !== ordem) {
        let rowsbkp2 = rowsselect.slice(0, rowsselect.length);
        let itematual = rowsbkp2.findIndex((a) => a.ordem === itemselect2.ordem);
        let itemant = rowsbkp2.findIndex((a) => a.ordem === itemselect2.ordem + 1);
        rowsbkp2[itematual]['ordem'] = rowsbkp2[itematual]['ordem'] + 1;
        rowsbkp2[itemant]['ordem'] = rowsbkp2[itemant]['ordem'] - 1;
        setRowsselect(rowsbkp2);
      }
    }
  };

  const Salvar = () => {
    setCarregando(true);
    setStatusprocessa('Gravando informações, aguarde');
    apiExec(
      "DELETE FROM TB00101 WHERE TB00101_TABELA = '" +
        props.object +
        "' AND TB00101_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "' ",
      'N'
    ).then((response) => {
      if (response.status === 200) {
        rowsselect.forEach((item) => {
          item.selec = 'S';
          item.user = Decode64(sessionStorage.getItem('user'));
          setStatusprocessa('Gravando informações campo : ' + item.funcao);
          apiInsert('Fieldlist', item).then((response) => {
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
          <div style={{ width: '4%', marginLeft: '15px' }}>
            <Row>
              {itemselect !== undefined ? (
                <Button id="btnAddlist" className="btn-icon" onClick={() => Add()}>
                  <i className={'feather icon-chevron-right'} />
                </Button>
              ) : (
                <></>
              )}
              {itemselect2 !== undefined ? (
                <Button id="btnRetlist" className="btn-icon" onClick={() => Subtract()}>
                  <i className={'feather icon-chevron-left'} />
                </Button>
              ) : (
                <></>
              )}
              <p></p>
              <p></p>
              <p></p>
              {itemselect2 !== undefined ? (
                <Button id="btnUpplist" className="btn-icon" onClick={() => Upp()}>
                  <i className={'feather icon-chevron-up'} />
                </Button>
              ) : (
                <></>
              )}
              {itemselect2 !== undefined ? (
                <Button id="btnDownlist" className="btn-icon" onClick={() => Down()}>
                  <i className={'feather icon-chevron-down'} />
                </Button>
              ) : (
                <></>
              )}
              <p></p>
              <p></p>
              <p></p>
              <Button id="btnSaveoption" className="btn-icon btn-success" onClick={() => setShowsave(true)}>
                <i className={'feather icon-star'} />
              </Button>
            </Row>
            <Modal backdrop="static" size="lg" show={showsave} centered={true} onHide={handleCloseShowsave}>
              <Modal.Header className="h5" closeButton>
                <i className={'feather icon-list h1'} />
                &nbsp;Salvar opção de listagem
              </Modal.Header>
              <ModalBody>
                <SaveList
                  rowsselect={rowsselect}
                  showsave={showsave}
                  setShowsave={(data) => setShowsave(data)}
                  user={Decode64(sessionStorage.getItem('user'))}
                  object={props.object}
                ></SaveList>
              </ModalBody>
            </Modal>
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

export default FieldsList;
