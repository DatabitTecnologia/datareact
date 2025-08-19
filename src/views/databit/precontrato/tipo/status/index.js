import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiInsert, apiList, apiExec } from '../../../../../api/crudapi';
import AGGrid from '../../../../../components/AGGrid';

const PrecontratoTipoStatus = (props) => {
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columnsselec, setColumnsselec] = React.useState([]);
  const [rowsselect, setRowsselect] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [statusprocessa, setStatusprocessa] = React.useState();
  const [itemselect, setItemselect] = React.useState();
  const [itemselect2, setItemselect2] = React.useState();

  const Filtrar = () => {
    setCarregando(true);
    apiList(
      'PrecontratoStatus',
      'TB01136_CODIGO,TB01136_NOME',
      '',
      "TB01136_SITUACAO = 'A' AND NOT EXISTS (SELECT TB01155_STATUS FROM TB01155 WHERE TB01155_STATUS = TB01136_CODIGO AND TB01155_TIPO =  '" +
        props.tipo +
        "') order by TB01136_NOME"
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
      }
    });

    apiList('PrecontratoTipoStatusVW', '*', 'TB01155_STATUS as codigo', "TB01155_TIPO= '" + props.tipo + "' order by TB01136_NOME ").then(
      (response) => {
        if (response.status === 200) {
          setRowsselect(response.data);
          setCarregando(false);
        }
      }
    );
  };

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 80 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição do Status', width: 420 }
    ]);
    setColumnsselec([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 80 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição do Status', width: 420 }
    ]);
    Filtrar();
  }, []);

  const Add = (item) => {
    if (item !== undefined) {
      const rowsbkp1 = rows.slice(0, rows.length);
      const i = rowsbkp1.findIndex((x) => x === item);
      rowsbkp1.splice(i, 1);
      item.id = rowsselect.length + 1;
      const rowsbkp2 = rowsselect.concat(item);
      setRows(rowsbkp1);
      setRowsselect(rowsbkp2);
    }
  };

  const Subtract = (item) => {
    if (item !== undefined) {
      const rowsbkp1 = rowsselect.slice(0, rowsselect.length);
      const i = rowsbkp1.findIndex((x) => x === item);
      rowsbkp1.splice(i, 1);
      item.id = rows.length + 1;
      const rowsbkp2 = rows.concat(item);
      setRows(rowsbkp2);
      setRowsselect(rowsbkp1);
    }
  };

  const Salvar = () => {
    setCarregando(true);
    let iteminsert = {};
    setStatusprocessa('Gravando informações, aguarde');
    apiExec("DELETE FROM TB01155 WHERE TB01155_TIPO = '" + props.tipo + "' ", 'N').then((response) => {
      if (response.status === 200) {
        rowsselect.forEach((item) => {
          iteminsert['status'] = item.codigo;
          iteminsert['tipo'] = props.tipo;
          apiInsert('PrecontratoTipoStatus', iteminsert).then((response) => {
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

  const clickGrid = (newSelection) => {
    setItemselect(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    Add(newSelection);
  };

  const keyGrid = (newSelection, event) => {
    setItemselect(newSelection);
    if (event.key === 'Enter') {
      Add(newSelection);
    }
  };

  const clickGrid2 = (newSelection) => {
    setItemselect2(newSelection);
  };

  const dblClickGrid2 = (newSelection) => {
    Subtract(newSelection);
  };

  const keyGrid2 = (newSelection, event) => {
    setItemselect2(newSelection);
    if (event.key === 'Enter') {
      Subtract(newSelection);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Button id="btnGravar" className="btn btn-success shadow-2 mb-2" onClick={() => Salvar()}>
            <i className={'feather icon-save'} /> Salvar alterações
          </Button>
          <Button id="btnRefazer" className="btn btn-warning shadow-2 mb-2" onClick={() => Filtrar()}>
            <i className={'feather icon-repeat'} /> Refazer Listagem
          </Button>
        </Col>
      </Row>

      <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
      <Row style={{ display: 'flex', height: '60%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '48%', marginRight: '5px' }}>
            <AGGrid
              width="100%"
              height="460px"
              rows={rows}
              columns={columns}
              loading={carregando}
              onKeyDown={keyGrid}
              onDoubleClick={dblClickGrid}
              onCelClick={clickGrid}
            ></AGGrid>
          </div>
          <div style={{ width: '4%', marginLeft: '20px' }}>
            <Row>
              <Button id="btnAddlist" className="btn-icon" onClick={() => Add(itemselect)}>
                <i className={'feather icon-chevron-right'} />
              </Button>
              <Button id="btnRetlist" className="btn-icon" onClick={() => Subtract(itemselect2)}>
                <i className={'feather icon-chevron-left'} />
              </Button>
            </Row>
          </div>
          <div style={{ width: '48%', marginLeft: '5px' }}>
            <AGGrid
              width="100%"
              height="460px"
              rows={rowsselect}
              columns={columnsselec}
              loading={carregando}
              onKeyDown={keyGrid2}
              onDoubleClick={dblClickGrid2}
              onCelClick={clickGrid2}
            ></AGGrid>
          </div>
        </div>
        <span className="h6">{statusprocessa}</span>
      </Row>
    </React.Fragment>
  );
};

export default PrecontratoTipoStatus;
