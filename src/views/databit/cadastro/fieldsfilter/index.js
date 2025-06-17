import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiExec, apiInsert, apiDropdown } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';
import AGGrid from '../../../../components/AGGrid';
import SetFilter from '../setfilter';
import SaveFilter from '../savefilter';

const FieldsFilter = (props) => {
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columnsselec, setColumnsselec] = React.useState([]);
  const [rowsselect, setRowsselect] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [ordernar, setOrdenar] = React.useState(false);
  const [itemselect, setItemselect] = React.useState();
  const [itemselect2, setItemselect2] = React.useState();
  const [ordem2, setOrdem2] = React.useState(0);
  const [statusprocessa, setStatusprocessa] = React.useState();
  const [optionslist, setOptionslist] = React.useState([]);
  const [statusprocessamodal, setStatusprocessamodal] = React.useState();

  const [showsave, setShowsave] = useState(false);
  const handleCloseShowsave = () => setShowsave(false);
  const [showfilter, setShowfilter] = useState(false);
  const handleCloseShowfilter = () => setShowfilter(false);

  const Filtrar = () => {
    setCarregando(true);
    setOrdenar(false);
    apiList(
      'Paramfield',
      'TB00003_CAMPO, TB00003_FUNCAO, TB00003_FILTRO, TB00003_ORDEM2, TB00003_TIPOFILTRO, TB00003_TABELA, ' +
        'TB00003_USER, TB00003_FOREIGN, TB00003_KEY, TB00003_TABELAREF, TB00003_CAMPOREF, TB00003_DESCRICAOREF, TB00003_ISFOREIGN, TB00003_TIPO, TB00003_TAMANHO, TB00003_DECIMAL ',
      '',
      "TB00003_TABELA = '" +
        props.object +
        "' and not exists (select * from TB00102 where TB00102_TABELA = '" +
        props.object +
        "' " +
        " and TB00102_CAMPO = TB00003_CAMPO and TB00102_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "') " +
        'order by TB00003_FUNCAO '
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
      }
    });

    apiList(
      'Fieldfilter',
      'TB00102_CAMPO, TB00102_FUNCAO, TB00102_FILTRO, TB00102_ORDEM2, TB00102_TIPOFILTRO, TB00102_TABELA, ' +
        'TB00102_USER, TB00102_FOREIGN, TB00102_KEY, TB00102_TABELAREF, TB00102_CAMPOREF, TB00102_DESCRICAOREF, TB00102_ISFOREIGN, TB00102_TIPO, TB00102_TAMANHO, TB00102_DECIMAL ',
      'case TB00102_TIPOFILTRO ' +
        "  when 1 then 'Exata' " +
        "  when 2 then 'Aproximada' " +
        "  when 3 then 'Por Intervalo' " +
        "  when 4 then 'Multi-Seleção' " +
        '  end  as nometipo',
      "TB00102_TABELA = '" +
        props.object +
        "' and TB00102_FILTRO = 'S' and TB00102_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "' order by TB00102_ORDEM2"
    ).then((response) => {
      if (response.status === 200) {
        setRowsselect(response.data);
        setCarregando(false);
        setOrdenar(true);
      }
    });
  };

  useEffect(() => {
    props.setOptiontitle('Definição de filtros');
    setColumns([
      { headerClassName: 'header-list', field: 'campo', headerName: 'Nome Campo', width: 200 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Descrição do Campo', width: 300 }
    ]);
    setColumnsselec([
      { headerClassName: 'header-list', field: 'ordem2', headerName: 'Ordem', width: 60 },
      { headerClassName: 'header-list', field: 'campo', headerName: 'Nome Campo', width: 164 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Descrição do Campo', width: 277 }
    ]);

    Filtrar();
  }, []);

  useEffect(() => {
    rowsselect.forEach((item, i) => {
      item.ordem2 = i + 1;
      setOrdem2(i + 1);
    });
  }, [ordernar]);

  useEffect(() => {
    setStatusprocessamodal('');
    apiDropdown(
      'TB00105',
      'TB00105_CODIGO',
      'TB00105_NOME',
      "TB00105_USER = '" + Decode64(sessionStorage.getItem('user')) + "' AND TB00105_TABELA = '" + props.object + "' "
    ).then((response) => {
      if (response.status === 200) {
        setOptionslist(response.data);
        if (optionslist.length === 0) {
          setOptionslist([{ value: -1, label: 'Não possui itens' }]);
        }
      }
    });
  }, [ordernar]);

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
      rowsbkp2 = rowsbkp2.sort((a) => a.ordem2);
      let maxid = Math.max(...rowsselect.map((item) => item.id));
      if (maxid === -Infinity) {
        maxid = 0;
      }
      itemselect['id'] = maxid + 1;
      itemselect['ordem2'] = ordem2 + 1;
      let rowsfim = rowsbkp2.concat(itemselect);
      setRows(rowsbkp1);
      setRowsselect(rowsfim);
      setOrdem2(ordem2 + 1);
    }
  };

  const Subtract = () => {
    if (itemselect2 !== undefined) {
      let rowsbkp1 = rows.slice(0, rows.length);
      let rowsbkp2 = rowsselect.slice(0, rowsselect.length);
      rowsbkp2 = rowsselect.filter((item) => item.campo !== itemselect2.campo);
      itemselect2['ordem2'] = 0;
      let maxid = Math.max(...rows.map((item) => item.id));
      if (maxid === -Infinity) {
        maxid = 0;
      }
      itemselect2['id'] = maxid + 1;
      let rowsfim = rowsbkp1.concat(itemselect2);
      let tmpordem2 = 0;
      rowsbkp2.forEach((item) => {
        tmpordem2 += 1;
        item['ordem2'] = tmpordem2;
      });
      setOrdem2(tmpordem2);
      setRows(rowsfim);
      setRowsselect(rowsbkp2);
    }
  };

  const Upp = () => {
    if (itemselect2 !== undefined) {
      if (itemselect2['ordem2'] !== 1) {
        let rowsbkp2 = rowsselect.slice(0, rowsselect.length);
        let itematual = rowsbkp2.findIndex((a) => a.ordem2 === itemselect2.ordem2);
        let itemant = rowsbkp2.findIndex((a) => a.ordem2 === itemselect2.ordem2 - 1);
        rowsbkp2[itematual]['ordem2'] = rowsbkp2[itematual]['ordem2'] - 1;
        rowsbkp2[itemant]['ordem2'] = rowsbkp2[itemant]['ordem2'] + 1;
        setRowsselect(rowsbkp2);
      }
    }
  };

  const Down = () => {
    if (itemselect2 !== undefined) {
      if (itemselect2['ordem2'] !== ordem2) {
        let rowsbkp2 = rowsselect.slice(0, rowsselect.length);
        let itematual = rowsbkp2.findIndex((a) => a.ordem2 === itemselect2.ordem2);
        let itemant = rowsbkp2.findIndex((a) => a.ordem2 === itemselect2.ordem2 + 1);
        rowsbkp2[itematual]['ordem2'] = rowsbkp2[itematual]['ordem2'] + 1;
        rowsbkp2[itemant]['ordem2'] = rowsbkp2[itemant]['ordem2'] - 1;
        setRowsselect(rowsbkp2);
      }
    }
  };

  const Salvar = () => {
    setCarregando(true);
    setStatusprocessa('Gravando informações, aguarde');
    apiExec(
      "DELETE FROM TB00102 WHERE TB00102_TABELA = '" +
        props.object +
        "' AND TB00102_USER = '" +
        Decode64(sessionStorage.getItem('user')) +
        "' ",
      'N'
    ).then((response) => {
      if (response.status === 200) {
        rowsselect.forEach((item) => {
          item.filtro = 'S';
          item.user = Decode64(sessionStorage.getItem('user'));
          setStatusprocessa('Gravando informações campo : ' + item.funcao);
          apiInsert('Fieldfilter', item).then((response) => {
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
          <div style={{ width: '4%', marginLeft: '13px' }}>
            <Row>
              {itemselect !== undefined ? (
                <Button id="btnAddfilter" className="btn-icon" onClick={() => Add()}>
                  <i className={'feather icon-chevron-right'} />
                </Button>
              ) : (
                <></>
              )}
              {itemselect2 !== undefined ? (
                <Button id="btnRetfilter" className="btn-icon" onClick={() => Subtract()}>
                  <i className={'feather icon-chevron-left'} />
                </Button>
              ) : (
                <></>
              )}
              <p></p>
              <p></p>
              <p></p>
              {itemselect2 !== undefined ? (
                <Button id="btnUppfilter" className="btn-icon" onClick={() => Upp()}>
                  <i className={'feather icon-chevron-up'} />
                </Button>
              ) : (
                <></>
              )}
              {itemselect2 !== undefined ? (
                <Button id="btnDownfiler" className="btn-icon" onClick={() => Down()}>
                  <i className={'feather icon-chevron-down'} />
                </Button>
              ) : (
                <></>
              )}
              <p></p>
              <p></p>
              <p></p>
              {itemselect2 !== undefined ? (
                <Button id="btnAltfilter" className="btn-icon btn-warning" onClick={() => setShowfilter(true)}>
                  <i className={'feather icon-edit'} />
                </Button>
              ) : (
                <></>
              )}
              <Modal backdrop="static" size="lg" show={showfilter} centered={true} onHide={handleCloseShowfilter}>
                <Modal.Header className="h5" closeButton>
                  <i className={'feather icon-filter h1'} />
                  &nbsp;Tipos de filtro
                </Modal.Header>
                <ModalBody>
                  <SetFilter
                    itemselect={itemselect2}
                    setItemselect={(data) => setItemselect2(data)}
                    showfilter={showfilter}
                    setShowfilter={(data) => setShowfilter(data)}
                    object={props.object}
                  ></SetFilter>
                </ModalBody>
              </Modal>
              <Button id="btnSaveoption" className="btn-icon btn-success" onClick={() => setShowsave(true)}>
                <i className={'feather icon-star'} />
              </Button>
            </Row>
            <Modal backdrop="static" size="lg" show={showsave} centered={true} onHide={handleCloseShowsave}>
              <Modal.Header className="h5" closeButton>
                <i className={'feather icon-filter h1'} />
                &nbsp;Salvar opção de filtro
              </Modal.Header>
              <ModalBody>
                <SaveFilter
                  rowsselect={rowsselect}
                  showsave={showsave}
                  setShowsave={(data) => setShowsave(data)}
                  user={Decode64(sessionStorage.getItem('user'))}
                  object={props.object}
                ></SaveFilter>
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

export default FieldsFilter;
