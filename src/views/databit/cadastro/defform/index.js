import React, { useEffect } from 'react';
import { Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiList, apiInsert, apiUpdate, apiDelete, apiID } from '../../../../api/crudapi';
import { Confirmation } from '../../../../components/Confirmation';
import AGGrid from '../../../../components/AGGrid';
import { Decode64 } from '../../../../utils/crypto';

const DefForm = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [inclusao, setInclusao] = React.useState(false);
  const [itemselec, setItemselec] = React.useState();
  const [newcode, setNewcode] = React.useState('');

  const typeespcial = [
    { value: 1, label: 'Definição de Endereços' },
    { value: 2, label: 'Itens de Oportunidade' },
    { value: 3, label: 'Definição de Foto' },
    { value: 4, label: 'Assinatura de E-Mail' },
    { value: 5, label: 'Visualização da Proposta' },
    { value: 6, label: 'Configuração de Dashboards' },
    { value: 7, label: 'Itens de Compra (DataPartner)' },
    { value: 8, label: 'Módulos de Movimentação' }
  ];

  useEffect(() => {
    setCarregando(true);
    setColumns([
      { headerClassName: 'header-list', field: 'ordem', headerName: 'Ordem', width: 100, type: 'number' },
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 80 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição Formulário', width: 680 },
      { headerClassName: 'header-list', field: 'nomegrupo', headerName: 'Grupo', width: 177 }
    ]);
    setFields([
      {
        id: 0,
        campo: 'TB00108_CODIGO',
        funcao: 'Código',
        tipo: 'varchar',
        nome: 'codigo',
        tamanho: 4,
        tipoobject: 1,
        disabled: true,
        widthfield: 6,
        measure: '6rem',
        readonly: true
      },
      {
        id: 1,
        campo: 'TB00108_NOME',
        funcao: 'Descrição Formulário',
        tipo: 'varchar',
        nome: 'nome',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 39,
        measure: '39rem',
        disabled: true,
        charnormal: true
      },
      {
        id: 2,
        campo: 'TB00108_LARGURA',
        funcao: 'Largura (%)',
        tipo: 'int',
        nome: 'largura',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: true
      },
      {
        id: 3,
        campo: 'TB00108_SITUACAO',
        funcao: 'Situação do Form',
        tipo: 'varchar',
        nome: 'situacao',
        tamanho: 1,
        tipoobject: 10,
        widthfield: 10.5,
        measure: '10.5rem',
        itens: 'Ativo,Inativo',
        values: 'A,I',
        disabled: true
      },
      {
        id: 4,
        campo: 'TB00108_GRUPO',
        funcao: 'Grupo formulário',
        tipo: 'varchar',
        nome: 'grupo',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 44,
        measure: '44rem',
        disabled: true,
        tabelaref: 'TB00107',
        widthname: 34,
        filteraux: " AND TB00107_TABELA = '" + props.object + "'"
      },
      {
        id: 5,
        campo: 'TB00108_TIPO',
        funcao: 'Tipo de Formulário',
        tipo: 'varchar',
        nome: 'tipo',
        tamanho: 1,
        tipoobject: 10,
        widthfield: 10.5,
        measure: '23rem',
        itens: 'Simples,Especial',
        values: '0,1',
        disabled: true
      },
      {
        id: 6,
        campo: 'TB00108_TIPOESPECIAL',
        funcao: 'Tipo de Modulo',
        tipo: 'int',
        nome: 'tipoespecial',
        tamanho: 70,
        tipoobject: 11,
        widthfield: 60,
        measure: '66rem',
        options: typeespcial,
        disabled: true
      }
    ]);
    Filtrar();
  }, []);

  useEffect(() => {
    if (fields.length > 0) {
      if (valuesfield[5] == '1') {
        document.getElementById('TB00108_TIPOESPECIAL').disabled = false;
      } else {
        document.getElementById('TB00108_TIPOESPECIAL').disabled = true;
      }
    }
  }, [valuesfield[5]]);

  const Filtrar = () => {
    apiList(
      'FormVW',
      'TB00108_CODIGO, TB00108_NOME, TB00108_SITUACAO, TB00108_GRUPO, TB00108_PADRAO, TB00108_TIPO, TB00108_CODREACT, TB00108_LARGURA, TB00108_ORDEM',
      'TB00107_NOME AS nomegrupo',
      "TB00108_GRUPO IN (SELECT TB00107_CODIGO FROM TB00107 WHERE TB00107_TABELA = '" +
        props.object +
        "') and TB00108_SYSTEM = " +
        Decode64(sessionStorage.getItem('system')) +
        ' order by TB00108_ORDEM '
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
      }
    });
  };

  useEffect(() => {
    if (rows.length > 0 && itemselec === undefined) {
      setItemselec(rows[0]);
    }
  }, [rows]);

  useEffect(() => {
    if (itemselec !== undefined) {
      console.log('Teste');
      const keys = Object.keys(itemselec);
      const values = Object.values(itemselec);
      keys.forEach((item, index) => {
        fields.forEach((item2, index2) => {
          if (item === item2.nome) {
            valuesfield[index2] = values[index];
            setValuesfield([...valuesfield]);
          }
        });
      });
      valuesfield2[4] = itemselec.nomegrupo;
      setValuesfield2([...valuesfield2]);
    } else {
      valuesfield[0] = newcode;
      valuesfield[1] = '';
      valuesfield[2] = 1;
      valuesfield[3] = 'A';
      valuesfield[4] = '';
      valuesfield[5] = '0';
      valuesfield[6] = '';
      setValuesfield([...valuesfield]);
      console.log(valuesfield);
    }
  }, [itemselec]);

  const Incluir = () => {
    setCarregando(true);
    apiID('Form').then((response) => {
      if (response.status === 200) {
        valuesfield[0] = response.data.mensagem;
        setNewcode(response.data.mensagem);
        valuesfield[1] = '';
        valuesfield[2] = 1;
        valuesfield[3] = 'A';
        valuesfield[4] = '';
        valuesfield[5] = '0';
        valuesfield[6] = '';
        setValuesfield([...valuesfield]);
        console.log(valuesfield);
        setDisabled(false);
        setCarregando(false);
        setInclusao(true);
        setItemselec(undefined);
        document.getElementById('TB00108_TIPOESPECIAL').disabled = true;
      }
    });
  };

  const Excluir = () => {
    if (rows.length > 0 && valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      Confirmation('frmform', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          apiDelete('Form', itemselec).then((response) => {
            if (response.status === 200) {
              setItemvariant(response.data.status + 1);
              setMensagem(response.data.mensagem);
              setCarregando(false);
              if (response.data.status === 1) {
                const rowsbkp1 = rows.slice(0, rows.length);
                const i = rowsbkp1.findIndex((x) => x === itemselec);
                rowsbkp1.splice(i, 1);
                setRows(rowsbkp1);
                valuesfield[0] = '';
                valuesfield[1] = '';
                valuesfield[2] = '';
                valuesfield[3] = '';
                valuesfield[4] = '';
                valuesfield[5] = '';
                valuesfield[6] = '';
                setValuesfield([...valuesfield]);
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          });
        }
      });
    } else {
      setItemvariant(1);
      setMensagem('Não possui nenhum registro para ser excluído !');
    }
  };

  const Editar = () => {
    if (rows.length > 0) {
      setDisabled(false);
      setInclusao(false);
      if (valuesfield[5] === '1') {
        document.getElementById('TB00108_TIPOESPECIAL').disabled = false;
      } else {
        document.getElementById('TB00108_TIPOESPECIAL').disabled = true;
      }
    } else {
      setItemvariant(1);
      setMensagem('Não possui nenhum registro para ser alterado !');
    }
  };

  const Salvar = () => {
    setCarregando(true);
    try {
      let item = {};
      fields.forEach((field, index) => {
        item[field.nome] = valuesfield[index];
      });
      item['tabela'] = props.object;
      if (inclusao) {
        item['padrao'] = 'N';
        item['ordem'] = rows.length + 1;
        item['id'] = rows.length + 1;
        item['nomegrupo'] = valuesfield2[4];
      } else {
        item['padrao'] = itemselec.padrao;
        item['ordem'] = itemselec.ordem;
        item['id'] = itemselec.id;
        item['nomegrupo'] = itemselec.nomegrupo;
      }
      item['system'] = Decode64(sessionStorage.getItem('system'));
      if (inclusao) {
        apiInsert('Form', item).then((response) => {
          if (response.status === 200) {
            setItemvariant(response.data.status + 1);
            setMensagem(response.data.mensagem);
            if (response.data.status === 1) {
              valuesfield[0] = response.data.id;
              setValuesfield([...valuesfield]);
              setDisabled(response.data.status === 1);
              setCarregando(false);
              const rowsbkp1 = rows.slice(0, rows.length);
              const rowsbkp2 = rowsbkp1.concat(item);
              setRows(rowsbkp2);
            }
          } else {
            setItemvariant(-1);
            setMensagem(response.data);
          }
        });
      } else {
        apiUpdate('Form', item).then((response) => {
          if (response.status === 200) {
            setItemvariant(response.data.status + 1);
            setMensagem(response.data.mensagem);
            if (response.data.status === 1) {
              setDisabled(response.data.status === 1);
              setCarregando(false);
              const rowsbkp1 = rows.slice(0, rows.length);
              const i = rowsbkp1.findIndex((x) => x === itemselec);
              const keys = Object.keys(item);
              const valuesitem = Object.values(item);
              const values = rowsbkp1[i];
              keys.forEach((item, index) => {
                if (item !== 'id') {
                  values[item] = valuesitem[index];
                }
              });
              setRows(rowsbkp1);
            }
          } else {
            setItemvariant(-1);
            setMensagem(response.data);
          }
        });
      }
    } catch (error) {
      setItemvariant(-1);
      setMensagem(error);
    }
  };

  const Cancelar = () => {
    if (inclusao) {
      if (rows.length > 0) {
        setItemselec(rows[0]);
      } else {
        valuesfield[0] = '';
        valuesfield[1] = '';
        valuesfield[2] = '';
        valuesfield[3] = '';
      }
    } else {
      const keys = Object.keys(itemselec);
      const values = Object.values(itemselec);
      keys.forEach((item, index) => {
        fields.forEach((item2, index2) => {
          if (item === item2.nome) {
            valuesfield[index2] = values[index];
            setValuesfield([...valuesfield]);
          }
        });
      });
    }
    setDisabled(true);
  };

  const Upp = (item) => {
    if (item !== undefined) {
      try {
        const rowsbkp = rows.slice(0, rows.length);

        const itemant = rowsbkp.find((element) => element.ordem === item.ordem - 1);

        const itemselec = rowsbkp.find((element) => element === item);

        if (itemant !== undefined && itemselec !== undefined) {
          itemant.ordem = itemant.ordem + 1;
          itemselec.ordem = itemselec.ordem - 1;
          setCarregando(true);
          setDisabled(false);
          apiUpdate('Form', itemant).then((response) => {
            if (response.status === 200) {
              apiUpdate('Form', itemselec).then((response) => {
                if (response.status === 200) {
                  rowsbkp.sort();
                  const rowsfim = rowsbkp.toSorted((ordem) => ordem);
                  setRows(rowsfim);
                  setCarregando(false);
                  setDisabled(true);
                }
              });
            }
          });
        }
      } catch (error) {
        setItemvariant(-1);
        setMensagem(error);
      }
    }
  };

  const Down = (item) => {
    if (item !== undefined) {
      try {
        const rowsbkp = rows.slice(0, rows.length);

        const itemant = rowsbkp.find((element) => element.ordem === item.ordem + 1);

        const itemselec = rowsbkp.find((element) => element === item);

        if (itemant !== undefined && itemselec !== undefined) {
          itemant.ordem = itemant.ordem - 1;
          itemselec.ordem = itemselec.ordem + 1;
          setCarregando(true);
          setDisabled(false);
          apiUpdate('Form', itemant).then((response) => {
            if (response.status === 200) {
              apiUpdate('Form', itemselec).then((response) => {
                if (response.status === 200) {
                  rowsbkp.sort();
                  const rowsfim = rowsbkp.toSorted((ordem) => ordem);
                  setRows(rowsfim);
                  setCarregando(false);
                  setDisabled(true);
                }
              });
            }
          });
        }
      } catch (error) {
        setItemvariant(-1);
        setMensagem(error);
      }
    }
  };

  return (
    <React.Fragment>
      <div id="frmform" name="frmform">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">Formulários</Card.Title>
          </Card.Header>
          <Row style={{ marginLeft: '10px' }}>
            <Row style={{ marginLeft: '1px' }}>
              {fields.map((field, index) => (
                <CreateObject
                  key={index}
                  field={field}
                  index={index}
                  fields={fields}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={disabled}
                  invisible={false}
                ></CreateObject>
              ))}
            </Row>
            <Row>
              <AGGrid
                width="100%"
                height="280px"
                rows={rows}
                columns={columns}
                loading={carregando}
                item={itemselec}
                setItem={(data) => setItemselec(data)}
              ></AGGrid>
            </Row>
            <Row style={{ textAlign: 'right', marginTop: '10px' }}>
              <Col>
                <Button id="btnUp" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={() => Upp(itemselec)}>
                  <i className={'feather icon-chevron-up'} /> Subir
                </Button>
                <Button id="btnDown" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={() => Down(itemselec)}>
                  <i className={'feather icon-chevron-down'} /> Descer
                </Button>
                <Button id="btnIncluir" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={Incluir}>
                  <i className={'feather icon-star'} /> Novo
                </Button>
                <Button id="btnExcluir" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={Excluir}>
                  <i className={'feather icon-trash'} /> Excluir
                </Button>
                <Button id="btnEditar" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={Editar}>
                  <i className={'feather icon-edit'} /> Editar
                </Button>
                <Button id="btnSalvar" className="btn btn-success shadow-2 mb-3" disabled={disabled} onClick={Salvar}>
                  <i className={'feather icon-save'} /> Salvar
                </Button>
                <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-3" disabled={disabled} onClick={Cancelar}>
                  <i className={'feather icon-x'} /> Cancelar
                </Button>
              </Col>
            </Row>
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
        </Card>
      </div>
    </React.Fragment>
  );
};

export default DefForm;
