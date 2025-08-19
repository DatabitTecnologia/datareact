import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiList } from '../../../../../api/crudapi';
import AGGrid from '../../../../../components/AGGrid';

const StatusHistorico = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [itemselec, setItemselec] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const { showhist, setShowhist } = props;

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB02255_OBS',
        funcao: 'Observações',
        tipo: 'text',
        nome: 'obs',
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        disabled: false,
        lines: 6,
        readonly: true
      }
    ]);
    setColumns([
      { headerClassName: 'header-list', field: 'iditem', headerName: 'ID', width: 60 },
      { headerClassName: 'header-list', field: 'data', headerName: 'Data', width: 170, type: 'dateTime' },
      { headerClassName: 'header-list', field: 'user', headerName: 'Usuário', width: 175 },
      { headerClassName: 'header-list', field: 'status', headerName: 'Status', width: 60 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição Status', width: 450 },
      { headerClassName: 'header-list', field: 'previsao', headerName: 'Previsão', width: 170 }
    ]);
    setCarregando(true);
    apiList('OportunidadeHistoricoVW', '*', '', "TB02257_CODIGO = '" + props.oportunidade + "' order by TB02257_DATA desc ").then(
      (response) => {
        if (response.status === 200) {
          setCarregando(false);
          setRows(response.data);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (rows.length > 0) {
      setItemselec(rows[0]);
    }
  }, [rows]);

  useEffect(() => {
    if (itemselec !== undefined && itemselec !== null) {
      if (itemselec.obs !== '' && itemselec.obs !== undefined && itemselec.obs !== null) {
        valuesfield[0] = itemselec.obs;
        setValuesfield([...valuesfield]);
      } else {
        valuesfield[0] = '';
        setValuesfield([...valuesfield]);
      }
    }
  }, [itemselec]);

  const Fechar = () => {
    setShowhist(false);
  };

  return (
    <React.Fragment>
      <div id="frmhistorico" name="frmhistorico">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <div>
          <AGGrid
            width="100%"
            height="360px"
            rows={rows}
            columns={columns}
            loading={carregando}
            item={itemselec}
            setItem={(data) => setItemselec(data)}
          ></AGGrid>
        </div>
        <div>
          {fields.map((field, index) => (
            <CreateObject
              key={index}
              field={field}
              index={field.id}
              fields={fields}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesfield2={valuesfield2}
              setValuesfield2={(data) => setValuesfield2(data)}
              disabled={false}
            ></CreateObject>
          ))}
        </div>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button id="btnOK" className="btn btn-primary shadow-2 mb-2" onClick={Fechar}>
              <i className={'feather icon-x-circle'} /> Fechar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default StatusHistorico;
