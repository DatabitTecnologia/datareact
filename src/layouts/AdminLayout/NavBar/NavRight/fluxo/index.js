import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiList } from '../../../../../api/crudapi';
import AGGrid from '../../../../../components/AGGrid';
import { Decode64 } from '../../../../../utils/crypto';

const InforFluxo = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [itemselec, setItemselec] = React.useState([]);
  const [itemselecfile, setItemselecfile] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [rows2, setRows2] = React.useState([]);
  const [columns2, setColumns2] = React.useState([]);
  const [validations, setValidations] = React.useState([]);
  const [validations2, setValidations2] = React.useState([]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'OPCAO',
        funcao: 'Deseja visualizar qual módulo',
        tipo: 'varchar',
        nome: 'modulo',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 15,
        measure: '15rem',
        itens: 'Oportunidades,Pré-Contratos',
        values: '0,1',
        disabled: false
      }
    ]);
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 90 },
      { headerClassName: 'header-list', field: 'data', headerName: 'Data', width: 110 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Histórico', width: 205 },
      { headerClassName: 'header-list', field: 'nomecli', headerName: 'Nome do Cliente', width: 230 },
      { headerClassName: 'header-list', field: 'contato', headerName: 'Contato', width: 180 },
      { headerClassName: 'header-list', field: 'qtde', headerName: 'Qtde.', width: 80, type: 'number', decimal: 0 },
      { headerClassName: 'header-list', field: 'vlrnota', headerName: 'Valor Total', width: 120, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'classificacao', headerName: 'Classificação', width: 160 },
      { headerClassName: 'header-list', field: 'nomestatus', headerName: 'Status', width: 180 }
    ]);
    setColumns2([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 90 },
      { headerClassName: 'header-list', field: 'contrato', headerName: 'Contrato', width: 120 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Histórico', width: 200 },
      { headerClassName: 'header-list', field: 'nomecli', headerName: 'Nome do Cliente', width: 230 },
      { headerClassName: 'header-list', field: 'contato', headerName: 'Contato', width: 180 },
      { headerClassName: 'header-list', field: 'qtcontratada', headerName: 'Qt.Contratada', width: 80, type: 'number', decimal: 0 },
      { headerClassName: 'header-list', field: 'vlrcontrata', headerName: 'R$ Contratado', width: 120, type: 'number', decimal: 2 },
      { headerClassName: 'header-list', field: 'qtaprovada', headerName: 'Qt.Aprovada', width: 80, type: 'number', decimal: 0 },
      { headerClassName: 'header-list', field: 'qtliberada', headerName: 'Qt.Liberada', width: 80, type: 'number', decimal: 0 },
      { headerClassName: 'header-list', field: 'nomestatus', headerName: 'Status', width: 180 }
    ]);
    valuesfield[0] = '0';
    setValuesfield([...valuesfield]);
    let filter = ' 0 = 0 ';
    let seller = Decode64(sessionStorage.getItem('seller'));
    if (seller !== 'ZZZZ' && (valuesfield[6] === '' || valuesfield[6] === undefined || valuesfield[6] === null)) {
      filter = filter + " and CODVEN = '" + seller + "' ";
    }
    setCarregando(true);
    apiList('OportunidadeFluxoVW', '*', '', filter).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        apiList('PrecontratoFluxoVW', '*', '', filter).then((response) => {
          setRows2(response.data);
          setCarregando(false);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (rows !== undefined && rows.length > 0) {
      let tmpvalidations = [];
      let validation = {};
      let tmpstatus = '';
      let totais = -1;
      validation['campo'] = [];
      validation['tipotab'] = 'G';
      validation['sinal'] = [];
      validation['valorval'] = [];
      validation['cor'] = [];
      validation['corline'] = [];
      if (rows !== undefined && rows.length > 0) {
        rows.forEach((item) => {
          if (!tmpstatus.includes(item.status)) {
            validation['campo'] = validation['campo'].concat('status');
            validation['sinal'] = validation['sinal'].concat(1);
            validation['valorval'] = validation['valorval'].concat(item.status);
            validation['cor'] = validation['cor'].concat(item.color);
            validation['corline'] = validation['corline'].concat(item.color2);
            tmpstatus = tmpstatus + item.status + ',';
            totais += 1;
          }
        });
      }
      validation['total'] = totais;
      tmpvalidations = tmpvalidations.concat(validation);
      setValidations(tmpvalidations);
    }
  }, [rows]);

  useEffect(() => {
    if (rows !== undefined && rows.length > 0) {
      let tmpvalidations = [];
      let validation = {};
      let tmpstatus = '';
      let totais = -1;
      validation['campo'] = [];
      validation['tipotab'] = 'G';
      validation['sinal'] = [];
      validation['valorval'] = [];
      validation['cor'] = [];
      validation['corline'] = [];
      rows2.forEach((item) => {
        if (!tmpstatus.includes(item.status)) {
          validation['campo'] = validation['campo'].concat('status');
          validation['sinal'] = validation['sinal'].concat(1);
          validation['valorval'] = validation['valorval'].concat(item.status);
          validation['cor'] = validation['cor'].concat(item.color);
          validation['corline'] = validation['corline'].concat(item.color2);
          tmpstatus = tmpstatus + item.status + ',';
          totais += 1;
        }
      });
      validation['total'] = totais;
      tmpvalidations = tmpvalidations.concat(validation);
      setValidations2(tmpvalidations);
    }
  }, [rows2]);

  return (
    <React.Fragment>
      <div id="frmfluxo" name="frmfluxo" style={{ marginLeft: '10px', marginBottom: '10px', marginTop: '10px', marginRight: '10px' }}>
        <Row>
          <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
          <div style={{ marginBottom: '10px' }}>
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
          {valuesfield[0] === '0' ? (
            <div>
              <AGGrid
                width="100%"
                height="555px"
                rows={rows}
                columns={columns}
                loading={carregando}
                item={itemselec}
                setItem={(data) => setItemselec(data)}
                validations={validations}
              ></AGGrid>
            </div>
          ) : (
            <div>
              <AGGrid
                width="100%"
                height="555px"
                rows={rows2}
                columns={columns2}
                loading={carregando}
                item={itemselec}
                setItem={(data) => setItemselec(data)}
                validations={validations2}
              ></AGGrid>
            </div>
          )}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default InforFluxo;
