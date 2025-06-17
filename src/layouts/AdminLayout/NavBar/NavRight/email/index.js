import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiList } from '../../../../../api/crudapi';
import AGGrid from '../../../../../components/AGGrid';
import { Decode64 } from '../../../../../utils/crypto';

const InforEmail = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [itemselec, setItemselec] = React.useState([]);
  const [itemselecfile, setItemselecfile] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [rowsfile, setRowsfile] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [columnsfile, setColumnsfile] = React.useState([]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB00111_DEST',
        funcao: 'Destinatário(s)',
        tipo: 'varchar',
        nome: 'dest',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 76,
        measure: '76rem',
        charnormal: true,
        lines: 3,
        readonly: true
      },
      {
        id: 1,
        campo: 'TB00111_SUBJECT',
        funcao: 'Assunto',
        tipo: 'varchar',
        nome: 'subject',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 76,
        measure: '76rem',
        charnormal: true,
        readonly: true
      },
      {
        id: 2,
        campo: 'TB00111_BODY',
        funcao: 'Corpo do E-mail',
        tipo: 'text',
        nome: 'body',
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        lines: 6,
        readonly: true
      }
    ]);
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'ID', width: 70 },
      { headerClassName: 'header-list', field: 'dtcad', headerName: 'Data', width: 160, type: 'dateTime' },
      { headerClassName: 'header-list', field: 'modulo', headerName: 'Módulo', width: 265 },
      { headerClassName: 'header-list', field: 'mov', headerName: 'Código', width: 80 },
      { headerClassName: 'header-list', field: 'dest', headerName: 'Destinatário(s)', width: 230 },
      { headerClassName: 'header-list', field: 'subject', headerName: 'Assunto', width: 240 },
      { headerClassName: 'header-list', field: 'dtenv', headerName: 'Enviado em', width: 160, type: 'dateTime' }
    ]);

    setCarregando(true);
  }, []);

  useEffect(() => {
    let filter = " TB00111_OPCAD = '" + Decode64(sessionStorage.getItem('user')) + "' ";
    filter = filter + ' order by TB00111_DTENV desc ';
    apiList('Email', '*', '', filter).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setRows(response.data);
      }
    });
  }, [columnsfile]);

  useEffect(() => {
    if (rows.length > 0) {
      setItemselec(rows[0]);
    }
  }, [rows]);

  useEffect(() => {
    if (itemselec !== undefined && itemselec !== null) {
      if (itemselec.body !== '' && itemselec.body !== undefined && itemselec.body !== null) {
        valuesfield[0] = itemselec.dest;
        valuesfield[1] = itemselec.subject;
        valuesfield[2] = itemselec.body;
        setValuesfield([...valuesfield]);
      } else {
        valuesfield[0] = '';
        valuesfield[1] = '';
        valuesfield[2] = '';
        setValuesfield([...valuesfield]);
      }
    }
  }, [itemselec]);

  return (
    <React.Fragment>
      <div
        id="frmhistorico"
        name="frmhistorico"
        style={{ marginLeft: '10px', marginBottom: '10px', marginTop: '10px', marginRight: '10px' }}
      >
        <Row>
          <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
          <div>
            <AGGrid
              width="100%"
              height="305px"
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
        </Row>
      </div>
    </React.Fragment>
  );
};

export default InforEmail;
