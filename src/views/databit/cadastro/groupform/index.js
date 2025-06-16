import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiList, apiInsert, apiUpdate, apiDelete, apiID } from '../../../../api/crudapi';
import { Confirmation } from '../../../../components/Confirmation';
import AGGrid from '../../../../components/AGGrid';
import Script from '../script';
import { Decode64 } from '../../../../utils/crypto';

const GroupForm = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [inclusao, setInclusao] = React.useState(false);
  const [itemselec, setItemselec] = React.useState();
  const [showscript, setShowscript] = useState(false);
  const handleClosescript = () => setShowscript(false);

  useEffect(() => {
    setCarregando(true);
    setColumns([
      { headerClassName: 'header-list', field: 'ordem', headerName: 'Ordem', width: 100, type: 'number' },
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 80 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição Grupo', width: 600 },
      { headerClassName: 'header-list', field: 'forms', headerName: 'Qtde. Forms', width: 260, type: 'number' }
    ]);
    setFields([
      {
        id: 0,
        campo: 'TB00107_CODIGO',
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
        campo: 'TB00107_NOME',
        funcao: 'Descrição Grupo',
        tipo: 'varchar',
        nome: 'nome',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 41,
        measure: '41rem',
        disabled: true,
        charnormal: true
      },
      {
        id: 2,
        campo: 'TB00107_FORMS',
        funcao: 'Quant. Formulários',
        tipo: 'int',
        nome: 'forms',
        tamanho: 60,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: true
      },
      {
        id: 3,
        campo: 'TB00107_SITUACAO',
        funcao: 'Situação do Grupo',
        tipo: 'int',
        nome: 'situacao',
        tamanho: 60,
        tipoobject: 10,
        widthfield: 10.5,
        measure: '10.5rem',
        itens: 'Ativo,Inativo',
        values: 'A,I',
        disabled: true
      }
    ]);
    Filtrar();
  }, []);

  const Filtrar = () => {
    apiList(
      'GroupForm',
      'TB00107_CODIGO,TB00107_NOME,TB00107_SITUACAO,TB00107_TABELA,TB00107_FORMS,TB00107_PADRAO,TB00107_ORDEM',
      '',
      "TB00107_TABELA = '" +
        props.object +
        "' and TB00107_SYSTEM = " +
        Decode64(sessionStorage.getItem('system')) +
        ' order by TB00107_ORDEM '
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
  }, [itemselec]);

  const Incluir = () => {
    setCarregando(true);
    apiID('GroupForm').then((response) => {
      if (response.status === 200) {
        valuesfield[0] = response.data.mensagem;
        valuesfield[1] = '';
        valuesfield[2] = 1;
        valuesfield[3] = 'A';
        setValuesfield([...valuesfield]);
        setDisabled(false);
        setCarregando(false);
        setInclusao(true);
      }
    });
  };

  const Excluir = () => {
    if (rows.length > 0 && valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      Confirmation('frmgroupform', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          apiDelete('GroupForm', itemselec).then((response) => {
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
      } else {
        item['padrao'] = itemselec.padrao;
        item['ordem'] = itemselec.ordem;
        item['id'] = itemselec.id;
      }
      item['system'] = Decode64(sessionStorage.getItem('system'));
      if (inclusao) {
        apiInsert('GroupForm', item).then((response) => {
          if (response.status === 200) {
            setItemvariant(response.data.status + 1);
            setMensagem(response.data.mensagem);
            setCarregando(false);
            if (response.data.status === 1) {
              valuesfield[0] = response.data.id;
              setValuesfield([...valuesfield]);
              setDisabled(response.data.status === 1);
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
        apiUpdate('GroupForm', item).then((response) => {
          if (response.status === 200) {
            setItemvariant(response.data.status + 1);
            setMensagem(response.data.mensagem);
            setCarregando(false);
            if (response.data.status === 1) {
              setDisabled(response.data.status === 1);

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
          apiUpdate('GroupForm', itemant).then((response) => {
            if (response.status === 200) {
              apiUpdate('GroupForm', itemselec).then((response) => {
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
          apiUpdate('GroupForm', itemant).then((response) => {
            if (response.status === 200) {
              apiUpdate('GroupForm', itemselec).then((response) => {
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
      <div id="frmgroupform" name="frmgroupform">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">Grupos</Card.Title>
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
                  disabled={disabled}
                  invisible={false}
                ></CreateObject>
              ))}
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <AGGrid
                width="100%"
                height="450px"
                rows={rows}
                columns={columns}
                loading={carregando}
                item={itemselec}
                setItem={(data) => setItemselec(data)}
              ></AGGrid>
            </Row>
            <Row style={{ textAlign: 'center', marginTop: '10px' }}>
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
                <Button id="btnScript" className="btn btn-success shadow-2 mb-3" disabled={!disabled} onClick={() => setShowscript(true)}>
                  <i className={'feather icon-zap'} /> Gerar Script
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
        <Modal backdrop="static" fullscreen={true} show={showscript} centered={true} onHide={handleClosescript}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-zap h1'} />
            &nbsp;Geração de Script
          </Modal.Header>
          <ModalBody>
            <Script table={props.object} view={props.view} modulo={props.modulo} option={1}></Script>
          </ModalBody>
          <ModalFooter>
            <Row style={{ textAlign: 'rigth', marginTop: '10px' }}>
              <Col>
                <Button id="btnFechar" className="btn btn-success shadow-2 mb-3" onClick={() => setShowscript(false)}>
                  <i className={'feather icon-x'} /> Fechar
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default GroupForm;
