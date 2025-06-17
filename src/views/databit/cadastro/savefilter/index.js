import React, { useEffect } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import AGGrid from '../../../../components/AGGrid';
import { apiInsert, apiExec } from '../../../../api/crudapi';

const SaveFilter = (props) => {
  const { object, user, rowsselect } = props;
  const [fields, setFields] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const { showsave, setShowsave } = props;
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [mensagem, setMensagem] = React.useState('');

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'ordem2', headerName: 'Ordem', width: 60 },
      { headerClassName: 'header-list', field: 'campo', headerName: 'Nome Campo', width: 150 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Descrição do Campo', width: 433 },
      { headerClassName: 'header-list', field: 'nometipo', headerName: 'Tipo Filtro', width: 104 }
    ]);
  }, []);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB00103_OPTION',
        funcao: 'Opções de gravação',
        tipo: 'varchar',
        nome: 'situacao',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 24,
        measure: '24rem',
        itens: 'Nova opção,Opção já existente',
        values: '0,1',
        disabled: false,
        invisible: false
      },
      {
        id: 1,
        campo: 'TB00103_OPTION2',
        funcao: 'Opções de exibição',
        tipo: 'varchar',
        nome: 'situacao',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 24,
        measure: '24rem',
        itens: 'Todos usuários,Somente eu',
        values: '0,1',
        disabled: false,
        invisible: false
      },
      {
        id: 2,
        campo: 'TB00103_NOME',
        funcao: 'Nova opção',
        tipo: 'varchar',
        nome: 'codigo',
        tipoobject: 1,
        tamanho: 100,
        widthfield: 48,
        measure: '48rem',
        disabled: false,
        invisible: parseInt(valuesfield[0]) === 1,
        charnormal: true
      },
      {
        id: 3,
        campo: 'TB00103_OPTION',
        funcao: 'Modelo existente',
        tipo: 'varchar',
        nome: 'campo',
        tamanho: 4,
        tipoobject: 12,
        widthfield: 48,
        measure: '48rem',
        tabelaref: 'TB00105',
        campolist: 'TB00105_NOME',
        camporefdrop: 'TB00105_CODIGO',
        filteraux: "(TB00105_USER = '" + user + "' or TB00105_USER = 'ALL') AND TB00105_TABELA = '" + object + "' ",
        disabled: false,
        invisible: parseInt(valuesfield[0]) === 0
      }
    ]);
  }, [valuesfield[0]]);

  const SalvarOpcao = () => {
    let nomeuser = '';
    if (parseInt(valuesfield[1]) === 0) {
      nomeuser = 'ALL';
    } else {
      nomeuser = user;
    }
    if (parseInt(valuesfield[0]) === 0) {
      if (valuesfield[2] !== '' && valuesfield[2] !== undefined) {
        setCarregando(true);
        let item = { nome: valuesfield[2], user: nomeuser, tabela: object };
        apiInsert('Optionfilter', item).then((response) => {
          if (response.status === 200) {
            let idoption = response.data.id;
            let itemadd = {};
            apiExec("DELETE FROM TB00106 WHERE TB00106_OPTION = '" + idoption + "' ", 'N').then((response) => {
              if (response.status === 200) {
                rowsselect.forEach((item) => {
                  itemadd = {
                    option: idoption,
                    campo: item.campo,
                    ordem2: item.ordem2,
                    filtro: 'S',
                    funcao: item.funcao,
                    foreign: item.foreign,
                    key: item.key,
                    tabelaref: item.tabelaref,
                    camporef: item.camporef,
                    descricaoref: item.descricaoref,
                    isforeign: item.isforeign,
                    tipofiltro: item.tipofiltro,
                    tipo: item.tipo,
                    tamanho: item.tamanho,
                    decimal: item.decimal
                  };
                  apiInsert('OptionfilterField', itemadd).then((response) => {
                    if (response.status === 200) {
                      setCarregando(false);
                      setShowsave(false);
                    }
                  });
                });
              }
            });
          }
        });
      } else {
        setItemvariant(1);
        setMensagem('Nome da opção é preenchimento Obrigatório !');
      }
    } else {
      let itemadd = {};
      apiExec("DELETE FROM TB00106 WHERE TB00106_OPTION = '" + valuesfield[3] + "' ", 'N').then((response) => {
        if (response.status === 200) {
          rowsselect.forEach((item) => {
            itemadd = {
              option: idoption,
              campo: item.campo,
              ordem2: item.ordem2,
              filtro: 'S',
              funcao: item.funcao,
              foreign: item.foreign,
              key: item.key,
              tabelaref: item.tabelaref,
              camporef: item.camporef,
              descricaoref: item.descricaoref,
              isforeign: item.isforeign,
              tipofiltro: item.tipofiltro,
              tipo: item.tipo,
              tamanho: item.tamanho,
              decimal: item.decimal
            };
            apiInsert('OptionlistField', itemadd).then((response) => {
              if (response.status === 200) {
                setCarregando(false);
                setShowsave(false);
              }
            });
          });
        }
      });
    }
  };

  return (
    <React.Fragment>
      <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
      <div id="optionlist" name="optionlist">
        <Row style={{ marginBottom: '15px', marginLeft: '2px' }}>
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
              invisible={field.invisible}
            ></CreateObject>
          ))}
        </Row>
        <Row>
          <AGGrid width="100%" height="410px" rows={rowsselect} columns={columns} loading={carregando}></AGGrid>
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'right' }}>
          <Col>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={() => SalvarOpcao()}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={() => setShowsave(false)}>
              <i className={'feather icon-x'} />
              Cancelar
            </Button>
          </Col>
        </Row>
        <Row>
          <Alert
            show={mensagem !== '' && mensagem !== undefined}
            dismissible
            variant={alertVariants[itemvariant]}
            onClick={() => setMensagem(undefined)}
          >
            {mensagem}
          </Alert>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default SaveFilter;
