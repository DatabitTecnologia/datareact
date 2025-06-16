import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiList, apiInsert, apiUpdate, apiDelete, apiFind } from '../../../../../api/crudapi';
import { Confirmation } from '../../../../../components/Confirmation';
import AGGrid from '../../../../../components/AGGrid';
import { PrecontratoReport } from '../../../precontrato/report';

const ContratoTotal = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rowsprod, setRowsprod] = React.useState([]);
  const [columnsprod, setColumnsprod] = React.useState([]);
  const [fieldsprod, setFieldsprod] = React.useState([]);
  const [valuesprod, setValuesprod] = React.useState([]);
  const [valuesprod2, setValuesprod2] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [inclusaoprod, setInclusaoprod] = React.useState(false);
  const [itemselecprod, setItemselecprod] = React.useState();
  const [ultidprod, setUltidprod] = React.useState(0);
  const { valuesname, setValuesname } = props;
  const { valuesfield, setValuesfield } = props; // Valores dos campos
  const [valuesdisableprod, setValuesdisableprod] = React.useState([]);
  const [disabledprod, setDisabledprod] = React.useState(true);
  const [showsave, setShowsave] = useState(false);
  const [altinfor, setAltinfor] = React.useState();
  const [dtgerado, setDtgerado] = React.useState('');

  useEffect(() => {
    setValuesdisableprod([true, true, true, true, true, true]);

    setColumnsprod([
      { headerClassName: 'header-list', field: 'tipoitem', headerName: 'Tipo', width: 106 },
      { headerClassName: 'header-list', field: 'nomeitem', headerName: 'Produto / Serviço', width: 640 },
      { headerClassName: 'header-list', field: 'qtcontratada', headerName: 'Contratada', width: 150, type: 'number' },
      { headerClassName: 'header-list', field: 'qtaprovada', headerName: 'Aprovada', width: 150, type: 'number' }
    ]);

    setFieldsprod([
      {
        id: 0,
        campo: 'TB02274_TIPO',
        funcao: 'Tipo',
        tipo: 'varchar',
        nome: 'tipo',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 9,
        measure: '9rem',
        itens: 'Produto,Serviço',
        values: '0,1',
        disabled: valuesdisableprod[0],
        invisible: false
      },
      {
        id: 1,
        campo: 'TB02274_PRODUTO',
        funcao: 'Produto',
        tipo: 'varchar',
        nome: 'produto',
        tipoobject: 2,
        tamanho: 5,
        widthfield: 39,
        measure: '39rem',
        tabelaref: 'TB01134',
        widthname: 30,
        disabled: valuesdisableprod[1],
        invisible: parseInt(valuesprod[0]) === 1
      },
      {
        id: 2,
        campo: 'TB02274_CODSERV',
        funcao: 'Serviço',
        tipo: 'varchar',
        nome: 'codserv',
        tipoobject: 2,
        tamanho: 5,
        widthfield: 39,
        measure: '39rem',
        tabelaref: 'TB01135',
        widthname: 20,
        disabled: valuesdisableprod[2],
        invisible: parseInt(valuesprod[0]) === 0 || valuesprod[0] === undefined
      },
      {
        id: 3,
        campo: 'TB02274_QTCONTRATADA',
        funcao: 'Contratada',
        tipo: 'int',
        nome: 'qtcontratada',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisableprod[3],
        decimal: 0,
        invisible: false
      },
      {
        id: 4,
        campo: 'TB02274_QTAPROVADA',
        funcao: 'Aprovada',
        tipo: 'int',
        nome: 'qtaprovada',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 10,
        measure: '10em',
        disabled: valuesdisableprod[4],
        decimal: 0,
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
      'ContratoItemVW',
      'TB02274_TIPO,TB02274_PRODUTO,TB02274_CODSERV,' +
        'TB02274_QTCONTRATADA,TB02274_QTAPROVADA,TB02274_QTLIBERADA,TB02274_CODITEM,TB02274_NOMEITEM,TB02274_TIPOITEM,TB02274_CODIGO,TB02274_IDITEM,',
      '',
      "TB02274_CODIGO = '" + valuesfield[valuesname.indexOf('codigo')] + "' order by TB02274_NOMEITEM"
    ).then((response) => {
      if (response.status === 200) {
        setRowsprod(response.data);
        apiFind(
          'Precontrato',
          'TB02264_CODIGO,TB02264_STATUS,TB02264_DTGERADO',
          '',
          " TB02264_CODIGO = '" + valuesfield[valuesname.indexOf('codigo')] + "' "
        ).then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            let tempgerado = response.data.dtgerado;
            setDtgerado(tempgerado);
            let statusatual = response.data.status;
            if (statusatual !== '' && statusatual !== undefined) {
              apiFind('PrecontratoStatus', '*', '', "TB01136_CODIGO = '" + statusatual + "' ").then((response) => {
                if (response.status === 200) {
                  setCarregando(false);
                  setAltinfor(response.data.altinfor === 'S');
                }
              });
            }
          }
        });
      }
    });
  };

  useEffect(() => {
    if (rowsprod.length > 0 && itemselecprod === undefined) {
      setItemselecprod(rowsprod[0]);
    } else {
      if (fieldsprod.length > 0 && fieldsprod !== undefined) {
        fieldsprod[2].invisible = true;
        setFieldsprod([...fieldsprod]);
      }
    }
    if (ultidprod === 0) {
      let item = 0;
      rowsprod.forEach((element) => {
        if (parseInt(element.iditem) > item) {
          item = parseInt(element.iditem);
        }
      });
      setUltidprod(item);
    }
  }, [rowsprod]);

  useEffect(() => {
    valuesprod2[1] = '';
    valuesprod2[2] = '';
    setValuesprod2([...valuesprod2]);
    if (itemselecprod !== undefined) {
      valuesprod[0] = itemselecprod['tipo'];
      if (parseInt(itemselecprod['tipo']) === 0 || itemselecprod['tipo'] === undefined) {
        valuesprod[1] = itemselecprod['coditem'];
        valuesprod[2] = '';
      } else {
        valuesprod[1] = '';
        valuesprod[2] = itemselecprod['coditem'];
      }
      valuesprod[3] = itemselecprod['qtcontratada'];
      valuesprod[4] = itemselecprod['qtaprovada'];
      valuesprod[5] = itemselecprod['qtliberada'];
      valuesprod[6] = itemselecprod['coditem'];
      valuesprod[7] = itemselecprod['nomeitem'];
      valuesprod[8] = itemselecprod['tipoitem'];
      valuesprod[9] = props.valuesfield[props.valuesname.indexOf('codigo')];
      valuesprod[10] = itemselecprod['iditem'];
      setValuesprod([...valuesprod]);
      if (parseInt(valuesprod[0]) === 0 || valuesprod[0] === undefined) {
        fieldsprod[1].invisible = false;
        fieldsprod[2].invisible = true;
      } else {
        fieldsprod[1].invisible = true;
        fieldsprod[2].invisible = false;
      }
      setFieldsprod([...fieldsprod]);
    }
  }, [itemselecprod]);

  useEffect(() => {
    if (fieldsprod.length > 0 && fieldsprod !== undefined) {
      fieldsprod[1].invisible = parseInt(valuesprod[0]) === 1;
      fieldsprod[2].invisible = parseInt(valuesprod[0]) === 0;
      setFieldsprod([...fieldsprod]);
    }
  }, [valuesprod[0]]);

  const IncluirProduto = () => {
    setCarregando(true);
    valuesprod[0] = 0;
    valuesprod[1] = '';
    valuesprod[2] = '';
    valuesprod[3] = 0;
    valuesprod[4] = 0;
    valuesprod[5] = 0;
    valuesprod[6] = '';
    valuesprod[7] = '';
    valuesprod[8] = '';
    valuesprod[9] = props.valuesfield[props.valuesname.indexOf('codigo')];
    valuesprod[10] = 0;
    setValuesprod([...valuesprod]);
    valuesprod2[1] = '';
    valuesprod2[2] = '';
    setValuesprod2([...valuesprod2]);
    valuesdisableprod[0] = false;
    valuesdisableprod[1] = false;
    valuesdisableprod[2] = false;
    valuesdisableprod[3] = false;
    valuesdisableprod[4] = false;
    valuesdisableprod[5] = true;
    setValuesdisableprod([...valuesdisableprod]);
    setDisabledprod(false);
    setCarregando(false);
    setInclusaoprod(true);
    setShowsave(true);
    try {
      document.getElementById('TB02274_TIPO').focus();
    } catch (error) {
      //console.log(error);
    }
  };

  const ExcluirProduto = () => {
    if (rowsprod.length > 0 && valuesprod[0] !== '' && valuesprod[0] !== undefined) {
      Confirmation('frmbasic', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          itemselecprod.id = itemselecprod.iditem;
          apiDelete('ContratoItem', itemselecprod).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                setDisabledprod(response.data.status === 1);
                setItemselecprod(undefined);
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

  const EditarProduto = () => {
    if (rowsprod.length > 0) {
      setDisabledprod(false);
      setInclusaoprod(false);
      valuesdisableprod[0] = true;
      valuesdisableprod[1] = true;
      valuesdisableprod[2] = true;
      valuesdisableprod[3] = false;
      valuesdisableprod[4] = false;
      valuesdisableprod[5] = true;
      setValuesdisableprod([...valuesdisableprod]);
      try {
        document.getElementById('TB02274_QTAPROVADA').focus();
      } catch (error) {
        //console.log(error);
      }
    } else {
      setItemvariant(1);
      setMensagem('Não possui nenhum registro para ser alterado !');
    }
  };

  const SalvarProduto = () => {
    setCarregando(true);
    if (
      document.getElementById('TB02274_TIPO').value === 0 &&
      (document.getElementById('TB02274_PRODUTO').value === undefined || document.getElementById('TB02274_PRODUTO').value === '')
    ) {
      setItemvariant(1);
      setMensagem('Campo PRODUTO é preenchimento obrigatório !');
      document.getElementById('TB02274_PRODUTO').focus();
    } else if (
      document.getElementById('TB02274_TIPO').value === 1 &&
      (document.getElementById('TB02274_CODSERV').value === undefined || document.getElementById('TB02274_CODSERV').value === '')
    ) {
      setItemvariant(1);
      setMensagem('Campo SERVIÇO é preenchimento obrigatório !');
      document.getElementById('TB02274_CODSERV').focus();
    } else {
      try {
        let item = {};
        fieldsprod.forEach((field, index) => {
          item[field.nome] = valuesprod[index];
        });
        item['codigo'] = props.valuesfield[props.valuesname.indexOf('codigo')];
        if (inclusaoprod) {
          item['id'] = rowsprod.length + 1;
          item['iditem'] = ultidprod + 1;
          setUltidprod(item['iditem']);
        } else {
          item['id'] = itemselecprod.id;
          item['iditem'] = itemselecprod.iditem;
        }
        if (valuesprod[0] === 0) {
          item['coditem'] = valuesprod[1];
          item['nomeitem'] = valuesprod2[1];
          item['nometipo'] = 'Produto';
        } else {
          item['coditem'] = valuesprod[2];
          item['nomeitem'] = valuesprod2[2];
          item['nometipo'] = 'Serviços';
        }

        let itembrowse = {};

        fieldsprod.forEach((field, index) => {
          itembrowse[field.nome] = valuesprod[index];
        });

        if (inclusaoprod) {
          itembrowse['id'] = ultidprod;
        } else {
          itembrowse['id'] = itemselecprod.iditem;
        }
        if (valuesprod[0] === 0) {
          if (inclusaoprod) {
            itembrowse['coditem'] = valuesprod[1];
            itembrowse['produto'] = valuesprod[1];
          } else {
            itembrowse['coditem'] = valuesprod[6];
            itembrowse['produto'] = valuesprod[6];
          }
          itembrowse['tipoitem'] = 'Produto';
          itembrowse['nomeitem'] = valuesprod2[1];
        } else {
          if (inclusaoprod) {
            itembrowse['coditem'] = valuesprod[2];
            itembrowse['codserv'] = valuesprod[2];
          } else {
            itembrowse['coditem'] = valuesprod[6];
            itembrowse['codserv'] = valuesprod[6];
          }
          itembrowse['tipoitem'] = 'Serviços';
          itembrowse['nomeitem'] = valuesprod2[2];
        }
        itembrowse['qtcontratada'] = valuesprod[3];
        itembrowse['qtaprovada'] = valuesprod[4];
        itembrowse['qtliberada'] = valuesprod[5];
        itembrowse['codigo'] = props.valuesfield[props.valuesname.indexOf('codigo')];
        itembrowse['iditem'] = item['iditem'];
        itembrowse['tipo'] = item['tipo'];

        if (inclusaoprod) {
          apiInsert('ContratoItem', item).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                setDisabledprod(response.data.status === 1);
                setItemselecprod(undefined);
                setShowsave(false);
                Filtrar();
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          });
        } else {
          apiUpdate('ContratoItem', item).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                setDisabledprod(response.data.status === 1);
                setItemselecprod(undefined);
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

  const CancelarProduto = () => {
    setItemselecprod(undefined);
    setDisabledprod(true);
    setShowsave(false);
  };

  const handleCloseShowsave = () => {
    setItemselecprod(undefined);
    setDisabledprod(true);
    setShowsave(false);
  };

  const clickGrid = (newSelection) => {
    setItemselecprod(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    setItemselecprod(newSelection);
    setShowsave(true);
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setItemselecprod(newSelection);
      setShowsave(true);
    }

    if (event.key === 'Delete') {
      setItemselecprod(newSelection);
      ExcluirProduto();
    }
  };

  const Report = () => {
    PrecontratoReport(props.valuesfield[props.valuesname.indexOf('codigo')]);
  };

  return (
    <React.Fragment>
      <div id="frmbasic" name="frmbasic">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Totalizadores do Pré-Contrato</Card.Title>
            </Card.Header>
            <Row style={{ marginBottom: '5px' }}>
              <AGGrid
                width="100%"
                height="360px"
                rows={rowsprod}
                columns={columnsprod}
                loading={carregando}
                onKeyDown={keyGrid}
                onDoubleClick={dblClickGrid}
                onCelClick={clickGrid}
              ></AGGrid>
            </Row>
          </Card>
          {altinfor ? (
            <Row style={{ textAlign: 'right', marginTop: '10px' }}>
              <Col>
                <Button id="btnReport" className="btn btn-primary shadow-2 mb-2" onClick={() => Report()}>
                  <i className={'feather icon-printer'} /> Resumo
                </Button>
                <Button id="btnNovoprod" className="btn" disabled={!disabledprod} onClick={IncluirProduto}>
                  <i className={'feather icon-star'} /> Incluir Totalizador
                </Button>
                <Button id="btnDelprod" className="btn-success" disabled={!disabledprod} onClick={ExcluirProduto}>
                  <i className={'feather icon-trash'} /> Excluir Totalizador
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
              <i className={'feather icon-plus-circle h1'} />
              &nbsp;Definição de Totalizadores
            </Modal.Header>
            <ModalBody>
              <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
              <Row>
                <Col>
                  <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
                    <Card.Header>
                      <Card.Title as="h5">Informações do Totalizador desejado</Card.Title>
                    </Card.Header>

                    <div>
                      <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                        {fieldsprod.map((field, index) => (
                          <CreateObject
                            key={index}
                            field={field}
                            index={index}
                            fields={fieldsprod}
                            valuesfield={valuesprod}
                            setValuesfield={(data) => setValuesprod(data)}
                            valuesfield2={valuesprod2}
                            setValuesfield2={(data) => setValuesprod2(data)}
                            disabled={valuesdisableprod[field.id]}
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
              {altinfor ? (
                <Row style={{ textAlign: 'rigth' }}>
                  <Col>
                    <Button id="btnEditprod" className="btn" disabled={!disabledprod} onClick={EditarProduto}>
                      <i className={'feather icon-edit'} /> Editar
                    </Button>
                    <Button id="btnSalvprod" className="btn btn-success" disabled={disabledprod} onClick={SalvarProduto}>
                      <i className={'feather icon-save'} /> Salvar
                    </Button>
                    <Button id="btnCancprod" className="btn btn-warning" disabled={disabledprod} onClick={CancelarProduto}>
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

export default ContratoTotal;
