import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiExec, apiList, apiInsert } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';

const OptionList = (props) => {
  const { object, user } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [columnsoption, setColumnsoption] = React.useState([]);
  const [rowsoption, setRowsoption] = React.useState([]);
  const { showlist, setShowlist } = props;

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB00103_OPTION',
        funcao: 'Modelo selecionado',
        tipo: 'varchar',
        nome: 'campo',
        tamanho: 4,
        tipoobject: 12,
        widthfield: 69,
        measure: '69rem',
        tabelaref: 'TB00103',
        campolist: 'TB00103_NOME',
        camporefdrop: 'TB00103_CODIGO',
        filteraux: "(TB00103_USER = '" + user + "' or TB00103_USER = 'ALL') AND TB00103_TABELA = '" + object + "' ",
        disabled: false
      }
    ]);
    setColumnsoption([
      { headerClassName: 'header-list', field: 'ordem', headerName: 'Ordem', width: 70 },
      { headerClassName: 'header-list', field: 'campo', headerName: 'Nome Campo', width: 300 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Descrição do Campo', width: 710 }
    ]);
  }, []);

  useEffect(() => {
    if (valuesfield[0] !== undefined && valuesfield[0] !== '') {
      setRowsoption([]);
      setCarregando(true);
      apiList(
        'OptionlistField',
        'TB00104_CAMPO, TB00104_FUNCAO, TB00104_ORDEM, TB00104_SELEC, TB00104_TABELA, TB00104_USER, TB00104_OPTION',
        '',
        "TB00104_OPTION = '" + valuesfield[0] + "' ORDER BY TB00104_ORDEM"
      ).then((response) => {
        if (response.status === 200) {
          setRowsoption(response.data);
          setCarregando(false);
        }
      });
    }
  }, [valuesfield[0]]);

  const SalvarOpcao = () => {
    let itemadd = {};
    if (valuesfield[0] !== undefined && valuesfield[0] !== '') {
      setCarregando(true);
      apiExec("DELETE FROM TB00101 WHERE TB00101_TABELA = '" + object + "' and TB00101_USER = '" + user + "' ", 'N').then((response) => {
        if (response.status === 200) {
          rowsoption.forEach((item) => {
            itemadd = {
              campo: item.campo,
              tabela: props.object,
              user: user,
              funcao: item.funcao,
              ordem: item.ordem,
              selec: item.selec
            };
            apiInsert('Fieldlist', itemadd).then((response) => {
              if (response.status === 200) {
                setCarregando(false);
                setShowlist(false);
              }
            });
          });
        }
      });
    } else {
      setShowlist(false);
    }
  };

  return (
    <React.Fragment>
      <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
      <div id="optionlist" name="optionlist">
        <Row style={{ marginBottom: '15px' }}>
          <Col>
            {fields.map((field) => (
              <CreateObject
                key={field.id}
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
          </Col>
        </Row>
        <Row>
          <AGGrid width="100%" height="350px" rows={rowsoption} columns={columnsoption} loading={carregando}></AGGrid>
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'right' }}>
          <Col>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={() => SalvarOpcao()}>
              <i className={'feather icon-check'} /> Aplicar
            </Button>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={() => setShowlist(false)}>
              <i className={'feather icon-x'} />
              Cancelar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default OptionList;
