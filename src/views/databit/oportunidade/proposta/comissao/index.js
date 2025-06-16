import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiList, apiInsert, apiUpdate, apiDelete, apiFind } from '../../../../../api/crudapi';
import { Confirmation } from '../../../../../components/Confirmation';
import AGGrid from '../../../../../components/AGGrid';

const PropostaComissao = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rowscom, setRowscom] = React.useState([]);
  const [columnscom, setColumnscom] = React.useState([]);
  const [fieldscom, setFieldscom] = React.useState([]);
  const [valuescom, setValuescom] = React.useState([]);
  const [valuescom2, setValuescom2] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [inclusaocom, setInclusaocom] = React.useState(false);
  const [itemseleccom, setItemseleccom] = React.useState();
  const [ultidcom, setUltidcom] = React.useState(0);
  const { valuesname, setValuesname } = props;
  const { valuesfield, setValuesfield } = props;
  const [valuesdisablecom, setValuesdisablecom] = React.useState([]);
  const [disabledcom, setDisabledcom] = React.useState(true);
  const [showsave, setShowsave] = useState(false);
  const [altproposta, setAltproposta] = React.useState();
  const [precontrato, setPrecontrato] = React.useState('');

  useEffect(() => {
    setValuesdisablecom([true, true, true]);

    setColumnscom([
      { headerClassName: 'header-list', field: 'codven', headerName: 'Código', width: 100 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Nome do Consultor', width: 625 },
      { headerClassName: 'header-list', field: 'tipo', headerName: 'Tipo', width: 150 },
      { headerClassName: 'header-list', field: 'comissao', headerName: '% Comissão', width: 172, type: 'number', decimal: 2 }
    ]);

    setFieldscom([
      {
        id: 0,
        campo: 'TB02259_CODVEN',
        funcao: 'Consultor',
        tipo: 'varchar',
        nome: 'codven',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 40,
        measure: '40rem',
        tabelaref: 'TB01006',
        widthname: 31,
        disabled: valuesdisablecom[0],
        invisible: false
      },
      {
        id: 1,
        campo: 'TB02259_TIPO',
        funcao: 'Tipo',
        tipo: 'varchar',
        nome: 'tipo',
        tamanho: 50,
        tipoobject: 1,
        widthfield: 17,
        measure: '17rem',
        disabled: valuesdisablecom[1],
        charnormal: true
      },
      {
        id: 2,
        campo: 'TB02259_COMISSAO',
        funcao: '% Comissão',
        tipo: 'numeric',
        nome: 'comissao',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        disabled: valuesdisablecom[2],
        decimal: 2,
        invisible: false
      }
    ]);
  }, []);

  useEffect(() => {
    Filtrar();
  }, [valuesfield]);

  const Filtrar = () => {
    setCarregando(true);
    apiList(
      'PropostaComissaoVW',
      'TB02259_CODVEN,TB02259_TIPO,TB02259_COMISSAO,TB01006_NOME,TB02259_CODIGO,TB02259_IDITEM',
      '',
      "TB02259_CODIGO = '" + valuesfield[valuesname.indexOf('codigo')] + "' order by TB01006_NOME"
    ).then((response) => {
      if (response.status === 200) {
        setRowscom(response.data);
        apiFind(
          'Oportunidade',
          'TB02255_CODIGO,TB02255_STATUS,TB02255_PRE',
          '',
          " TB02255_CODIGO = '" + valuesfield[valuesname.indexOf('codigo')] + "' "
        ).then((response) => {
          if (response.status === 200) {
            let tmppre = response.data.pre;
            setPrecontrato(tmppre);
            let statusatual = response.data.status;
            if (statusatual !== '' && statusatual !== undefined) {
              apiFind('OportunidadeStatus', '*', '', "TB01129_CODIGO = '" + statusatual + "' ").then((response) => {
                if (response.status === 200) {
                  setCarregando(false);
                  setAltproposta(response.data.altproposta === 'S');
                }
              });
            }
          }
        });
      }
    });
  };

  useEffect(() => {
    if (rowscom.length > 0 && itemseleccom === undefined) {
      setItemseleccom(rowscom[0]);
    }
    if (ultidcom === 0) {
      let item = 0;
      rowscom.forEach((element) => {
        if (parseInt(element.iditem) > item) {
          item = parseInt(element.iditem);
        }
      });
      setUltidcom(item);
    }
  }, [rowscom]);

  useEffect(() => {
    valuescom2[0] = '';
    setValuescom2([...valuescom2]);
    if (itemseleccom !== undefined) {
      valuescom[0] = itemseleccom['codven'];
      valuescom[1] = itemseleccom['tipo'];
      valuescom[2] = itemseleccom['comissao'];
      valuescom[3] = itemseleccom['nome'];
      valuescom[4] = props.valuesfield[props.valuesname.indexOf('codigo')];
      valuescom[5] = itemseleccom['iditem'];
      setValuescom([...valuescom]);
    }
  }, [itemseleccom]);

  const IncluirComissao = () => {
    setCarregando(true);
    valuescom[0] = '';
    valuescom[1] = '';
    valuescom[2] = 0;
    valuescom[3] = '';
    valuescom[4] = props.valuesfield[props.valuesname.indexOf('codigo')];
    valuescom[5] = 0;
    setValuescom([...valuescom]);
    valuescom2[0] = '';
    setValuescom2([...valuescom2]);
    valuesdisablecom[0] = false;
    valuesdisablecom[1] = false;
    valuesdisablecom[2] = false;
    setValuesdisablecom([...valuesdisablecom]);
    setDisabledcom(false);
    setCarregando(false);
    setInclusaocom(true);
    setShowsave(true);
    try {
      document.getElementById('TB02259_CODVEN').focus();
    } catch (error) {
      //console.log(error);
    }
  };

  const ExcluirComissao = () => {
    if (rowscom.length > 0 && valuescom[0] !== '' && valuescom[0] !== undefined) {
      Confirmation('frmbasic', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          itemseleccom.id = itemseleccom.iditem;
          apiDelete('PropostaComissao', itemseleccom).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                setDisabledcom(response.data.status === 1);
                setItemseleccom(undefined);
                setShowsave(false);
                Filtrar();
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

  const EditarComissao = () => {
    if (rowscom.length > 0) {
      setDisabledcom(false);
      setInclusaocom(false);
      valuesdisablecom[0] = true;
      valuesdisablecom[1] = false;
      valuesdisablecom[2] = false;
      setValuesdisablecom([...valuesdisablecom]);
      try {
        document.getElementById('TB02259_TIPO').focus();
      } catch (error) {
        //console.log(error);
      }
    } else {
      setItemvariant(1);
      setMensagem('Não possui nenhum registro para ser alterado !');
    }
  };

  const SalvarComissao = () => {
    if (document.getElementById('TB02259_CODVEN').value === undefined || document.getElementById('TB02259_CODVEN').value === '') {
      setItemvariant(1);
      setMensagem('Campo Consultor é preenchimento obrigatório !');
      document.getElementById('TB02259_CODVEN').focus();
    } else {
      setCarregando(true);
      try {
        let item = {};
        fieldscom.forEach((field, index) => {
          item[field.nome] = valuescom[index];
        });
        item['codigo'] = props.valuesfield[props.valuesname.indexOf('codigo')];
        if (inclusaocom) {
          item['id'] = rowscom.length + 1;
          item['iditem'] = ultidcom + 1;
          setUltidcom(item['iditem']);
        } else {
          item['id'] = itemseleccom.id;
          item['iditem'] = itemseleccom.iditem;
        }

        let itembrowse = {};

        fieldscom.forEach((field, index) => {
          itembrowse[field.nome] = valuescom[index];
        });
        if (inclusaocom) {
          itembrowse['id'] = ultidcom;
        } else {
          itembrowse['id'] = itemseleccom.iditem;
        }
        itembrowse['nome'] = valuescom2[0];
        itembrowse['iditem'] = item['iditem'];

        if (inclusaocom) {
          apiInsert('PropostaComissao', item).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                setDisabledcom(response.data.status === 1);
                setItemseleccom(undefined);
                setShowsave(false);
                Filtrar();
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          });
        } else {
          apiUpdate('PropostaComissao', item).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                setDisabledcom(response.data.status === 1);
                setItemseleccom(undefined);
                setShowsave(false);
                Filtrar();
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
    }
  };

  const CancelarComissao = () => {
    setItemseleccom(undefined);
    setDisabledcom(true);
    setShowsave(false);
  };

  const handleCloseShowsave = () => {
    setItemseleccom(undefined);
    setDisabledcom(true);
    setShowsave(false);
  };

  const clickGrid = (newSelection) => {
    setItemseleccom(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    setItemseleccom(newSelection);
    setShowsave(true);
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setItemseleccom(newSelection);
      setShowsave(true);
    }
    if (altproposta && (precontrato === '' || precontrato === undefined || precontrato === null)) {
      if (event.key === 'Delete') {
        setItemseleccom(newSelection);
        ExcluirComissao();
      }
    }
  };

  return (
    <React.Fragment>
      <div id="frmbasic" name="frmbasic">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Definição de Comissões</Card.Title>
            </Card.Header>
            <Row style={{ marginBottom: '5px' }}>
              <AGGrid
                width="100%"
                height="360px"
                rows={rowscom}
                columns={columnscom}
                loading={carregando}
                onKeyDown={keyGrid}
                onDoubleClick={dblClickGrid}
                onCelClick={clickGrid}
              ></AGGrid>
            </Row>
          </Card>
          {altproposta && (precontrato === '' || precontrato === undefined || precontrato === null) ? (
            <Row style={{ textAlign: 'right', marginTop: '10px' }}>
              <Col>
                <Button id="btnNovocom" className="btn" disabled={!disabledcom} onClick={IncluirComissao}>
                  <i className={'feather icon-star'} /> Incluir Comissão
                </Button>
                <Button id="btnDelcom" className="btn-success" disabled={!disabledcom} onClick={ExcluirComissao}>
                  <i className={'feather icon-trash'} /> Excluir Comissão
                </Button>
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </Row>

        <div id="frmitem" name="frmitem">
          <Modal backdrop="static" size="xl" show={showsave} centered={true} onHide={handleCloseShowsave}>
            <Modal.Header className="h5" closeButton>
              <i className={'feather icon-credit-card h1'} />
              &nbsp;Definição de Comissões
            </Modal.Header>
            <ModalBody>
              <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
              <Row>
                <Col>
                  <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
                    <Card.Header>
                      <Card.Title as="h5">Informações da Comissão desejada</Card.Title>
                    </Card.Header>
                    <div>
                      <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                        {fieldscom.map((field, index) => (
                          <CreateObject
                            key={index}
                            field={field}
                            index={index}
                            fields={fieldscom}
                            valuesfield={valuescom}
                            setValuesfield={(data) => setValuescom(data)}
                            valuesfield2={valuescom2}
                            setValuesfield2={(data) => setValuescom2(data)}
                            disabled={valuesdisablecom[field.id]}
                            invisible={field.invisible}
                            readonly={field.readonly}
                          ></CreateObject>
                        ))}
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              {altproposta && (precontrato === '' || precontrato === undefined || precontrato === null) ? (
                <Row style={{ textAlign: 'rigth' }}>
                  <Col>
                    <Button id="btnEditcom" className="btn" disabled={!disabledcom} onClick={EditarComissao}>
                      <i className={'feather icon-edit'} /> Editar
                    </Button>
                    <Button id="btnSalvcom" className="btn btn-success" disabled={disabledcom} onClick={SalvarComissao}>
                      <i className={'feather icon-save'} /> Salvar
                    </Button>
                    <Button id="btnCanccom" className="btn btn-warning" disabled={disabledcom} onClick={CancelarComissao}>
                      <i className={'feather icon-x'} /> Cancelar
                    </Button>
                  </Col>
                </Row>
              ) : (
                <></>
              )}

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
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PropostaComissao;
