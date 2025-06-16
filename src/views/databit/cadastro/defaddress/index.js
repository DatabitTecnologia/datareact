import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiInsert, apiExec } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';

const DefAddress = (props) => {
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columnsselec, setColumnsselec] = React.useState([]);
  const [rowsselect, setRowsselect] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [itemselect, setItemselect] = React.useState();
  const [itemselect2, setItemselect2] = React.useState();
  const [statusprocessa, setStatusprocessa] = React.useState();

  const Filtrar = () => {
    setCarregando(true);
    apiList(
      'EnderecoTipo',
      'TB04002_CODIGO,TB04002_NOME',
      '',
      "TB04002_CODIGO NOT IN (SELECT TB00013_TIPO FROM TB00013 WHERE TB00013_TABELA = '" +
        props.object +
        "') and TB04002_SITUACAO = 'A' order by TB04002_CODIGO "
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
      } else {
        setCarregando(false);
      }
    });
    apiList(
      'EnderecoConfigVW',
      'TB04002_CODIGO,TB04002_NOME',
      '',
      "TB00013_TABELA = '" + props.object + "'  order by TB04002_CODIGO "
    ).then((response) => {
      if (response.status === 200) {
        setRowsselect(response.data);
        setCarregando(false);
      } else {
        setCarregando(false);
      }
    });
  };

  useEffect(() => {
    props.setOptiontitle('Definições de endereço');
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 120 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição do Endereço', width: 400 }
    ]);
    setColumnsselec([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 120 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição do Endereço', width: 400 }
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
      rowsbkp1 = rows.filter((item) => item.nome !== itemselect.nome);
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
      rowsbkp2 = rowsselect.filter((item) => item.nome !== itemselect2.nome);
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
    apiExec("DELETE FROM TB00013 WHERE TB00013_TABELA = '" + props.object + "' ", 'N').then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        rowsselect.forEach((item) => {
          setCarregando(true);
          setStatusprocessa('Gravando informações tipo : ' + item.nome);
          const resultado = { tipo: item.codigo, tabela: props.object };
          apiInsert('EnderecoConfig', resultado).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              setStatusprocessa('');
            } else {
              setCarregando(false);
            }
          });
        });
      } else {
        setCarregando(false);
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
            <i className={'feather icon-repeat'} /> Refazer tipos
          </Button>
        </Col>
      </Row>
      <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
      <Row style={{ display: 'flex', height: '60%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '48%', marginRight: '15px' }}>
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
          <div style={{ width: '4%', marginLeft: '5px' }}>
            <Row>
              {itemselect !== undefined ? (
                <Button id="btnAddadress" className="btn-icon" onClick={() => Add()}>
                  <i className={'feather icon-chevron-right'} />
                </Button>
              ) : (
                <></>
              )}
              {itemselect2 !== undefined ? (
                <Button id="btnRetadress" className="btn-icon" onClick={() => Subtract()}>
                  <i className={'feather icon-chevron-left'} />
                </Button>
              ) : (
                <></>
              )}
            </Row>
          </div>
          <div style={{ width: '48%', marginLeft: '10px' }}>
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

export default DefAddress;
