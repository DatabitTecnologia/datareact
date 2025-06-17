import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiList, apiInsert, apiUpdate, apiDelete, apiID, apiFind } from '../../../../../api/crudapi';
import { getCEP } from '../../../../../api/correios';
import { Confirmation } from '../../../../../components/Confirmation';
import AGGrid from '../../../../../components/AGGrid';

const PreContratoEndereco = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [disabled, setDisabled] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const { cabecalho, setCabecalho } = props;
  const { valuesname, setValuesname } = props;
  const [inclusao, setInclusao] = React.useState(false);
  const [itemselec, setItemselec] = React.useState();
  const [fieldsaddress, setFieldsaddress] = React.useState([]);
  const [showsave, setShowsave] = useState(false);
  const [altinfor, setAltinfor] = React.useState();
  const [dtgerado, setDtgerado] = React.useState('');

  const states = [
    { value: 'AC', label: 'Acre (AC)' },
    { value: 'AL', label: 'Alagoas (AL)' },
    { value: 'AP', label: 'Amapá (AP)' },
    { value: 'AM', label: 'Amazonas (AM)' },
    { value: 'BA', label: 'Bahia (BA)' },
    { value: 'CE', label: 'Ceará (CE)' },
    { value: 'DF', label: 'Distrito Federal (DF)' },
    { value: 'ES', label: 'Espírito Santo (ES)' },
    { value: 'GO', label: 'Goiás (GO)' },
    { value: 'MA', label: 'Maranhão (MA)' },
    { value: 'MT', label: 'Mato Grosso (MT)' },
    { value: 'MS', label: 'Mato Grosso do Sul (MS)' },
    { value: 'MG', label: 'Minas Gerais (MG)' },
    { value: 'PA', label: 'Pará (PA)' },
    { value: 'PB', label: 'Paraíba (PB)' },
    { value: 'PR', label: 'Paraná (PR)' },
    { value: 'PE', label: 'Pernambuco (PE)' },
    { value: 'PI', label: 'Piauí (PI)' },
    { value: 'RJ', label: 'Rio de Janeiro (RJ)' },
    { value: 'RN', label: 'Rio Grande do Norte (RN)' },
    { value: 'RS', label: 'Rio Grande do Sul (RS)' },
    { value: 'RO', label: 'Rondônia (RO)' },
    { value: 'RR', label: 'Roraima (RR)' },
    { value: 'SC', label: 'Santa Catarina (SC)' },
    { value: 'SP', label: 'São Paulo (SP)' },
    { value: 'SE', label: 'Sergipe (SE)' },
    { value: 'TO', label: 'Tocantins (TO)' }
  ];

  useEffect(() => {
    Filtrar();
  }, []);

  const Filtrar = () => {
    setCarregando(true);
    apiList(
      'PrecontratoEndereco',
      'TB02269_CODIGO,TB02269_NOME,TB02269_END,TB02269_CEP,TB02269_END,TB02269_NUM,TB02269_COMP,TB02269_BAIRRO,' +
        'TB02269_CIDADE,TB02269_ESTADO,TB02269_CONTATO,TB02269_FONE,TB02269_EMAIL,TB02269_OPORTUNIDADE',
      '',
      " TB02269_PRECONTRATO= '" + cabecalho[valuesname.indexOf('codigo')] + "' "
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        apiFind(
          'Precontrato',
          'TB02264_CODIGO,TB02264_STATUS,TB02264_DTGERADO',
          '',
          " TB02264_CODIGO = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
        ).then((response) => {
          if (response.status === 200) {
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

        setFieldsaddress([
          {
            id: 0,
            campo: 'TB02269_CODIGO',
            funcao: 'Código',
            tipo: 'varchar',
            nome: 'codigo',
            tamanho: 6,
            tipoobject: 1,
            disabled: false,
            widthfield: 6,
            measure: '6rem',
            readonly: true
          },
          {
            id: 1,
            campo: 'TB02269_NOME',
            funcao: 'Descrição',
            tipo: 'varchar',
            nome: 'nome',
            tamanho: 255,
            tipoobject: 1,
            widthfield: 62,
            measure: '62.5rem',
            disabled: disabled
          },
          {
            id: 2,
            campo: 'TB02269_CEP',
            funcao: 'Cep',
            tipo: 'varchar',
            nome: 'campo',
            tamanho: 10,
            tipoobject: 8,
            widthfield: 10,
            measure: '8rem',
            disabled: disabled,
            tipomascara: 3
          },
          {
            id: 3,
            campo: 'TB02269_END',
            funcao: 'Logradouro',
            tipo: 'varchar',
            nome: 'end',
            tamanho: 60,
            tipoobject: 1,
            widthfield: 27,
            measure: '27.5rem',
            disabled: disabled
          },
          {
            id: 4,
            campo: 'TB02269_NUM',
            funcao: 'Nº',
            tipo: 'int',
            nome: 'num',
            tamanho: 10,
            tipoobject: 4,
            widthfield: 41,
            measure: '8rem',
            disabled: disabled
          },
          {
            id: 5,
            campo: 'TB02269_COMP',
            funcao: 'Compl.',
            tipo: 'varchar',
            nome: 'num',
            tamanho: 10,
            tipoobject: 1,
            widthfield: 10,
            measure: '10rem',
            disabled: disabled
          },
          {
            id: 6,
            campo: 'TB02269_BAIRRO',
            funcao: 'Bairro',
            tipo: 'varchar',
            nome: 'bairro',
            tamanho: 30,
            tipoobject: 1,
            widthfield: 15,
            measure: '15rem',
            disabled: disabled
          },
          {
            id: 7,
            campo: 'TB02269_CIDADE',
            funcao: 'Cidade',
            tipo: 'varchar',
            nome: 'cidade',
            tamanho: 30,
            tipoobject: 1,
            widthfield: 20,
            measure: '20rem',
            disabled: disabled
          },
          {
            id: 8,
            campo: 'TB02269_ESTADO',
            funcao: 'Estado',
            tipo: 'varchar',
            nome: 'estado',
            tamanho: 2,
            tipoobject: 11,
            widthfield: 15,
            measure: '15rem',
            options: states,
            disabled: disabled
          },
          {
            id: 9,
            campo: 'TB02269_FONE',
            funcao: 'Fone',
            tipo: 'varchar',
            nome: 'fone',
            tamanho: 10,
            tipoobject: 8,
            widthfield: 13,
            measure: '13rem',
            disabled: disabled,
            tipomascara: 5
          },
          {
            id: 10,
            campo: 'TB02269_CONTATO',
            funcao: 'Contato',
            tipo: 'varchar',
            nome: 'contato',
            tamanho: 30,
            tipoobject: 1,
            widthfield: 20,
            measure: '20.5rem',
            disabled: disabled
          },
          {
            id: 11,
            campo: 'TB02269_EMAIL',
            funcao: 'Email',
            tipo: 'varchar',
            nome: 'email',
            tamanho: 200,
            tipoobject: 1,
            widthfield: 70,
            measure: '70rem',
            disabled: disabled
          }
        ]);
      }

      setColumns([
        { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 96 },
        { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição do Endereço', width: 364 },
        { headerClassName: 'header-list', field: 'cidade', headerName: 'Cidade', width: 155 },
        { headerClassName: 'header-list', field: 'estado', headerName: 'UF', width: 60 },
        { headerClassName: 'header-list', field: 'contato', headerName: 'Contato', width: 155 },
        { headerClassName: 'header-list', field: 'email', headerName: 'E-Mail', width: 210 }
      ]);
    }, []);
  };

  useEffect(() => {
    if (!disabled) {
      let valor = valuesfield[2];
      if (valor.length === 8) {
        setCarregando(true);
        getCEP(valor).then((response) => {
          if (response.status === 200) {
            try {
              valuesfield[3] = response.data.logradouro.toUpperCase().substring(0, 60);
              valuesfield[6] = response.data.bairro.toUpperCase().substring(0, 30);
              valuesfield[7] = response.data.localidade.toUpperCase().substring(0, 30);
              valuesfield[8] = response.data.uf.toUpperCase();
            } catch (error) {
              setItemvariant(1);
              setMensagem('Endereço não encontrado !');
            }
            setCarregando(false);
          }
        });
      }
    }
  }, [valuesfield[2]]);

  useEffect(() => {
    if (itemselec !== undefined) {
      valuesfield[0] = itemselec['codigo'];
      valuesfield[1] = itemselec['nome'];
      valuesfield[2] = itemselec['cep'];
      valuesfield[3] = itemselec['end'];
      valuesfield[4] = itemselec['num'];
      valuesfield[5] = itemselec['comp'];
      valuesfield[6] = itemselec['bairro'];
      valuesfield[7] = itemselec['cidade'];
      valuesfield[8] = itemselec['estado'];
      valuesfield[9] = itemselec['fone'];
      valuesfield[10] = itemselec['contato'];
      valuesfield[11] = itemselec['email'];
      valuesfield[12] = cabecalho[valuesname.indexOf('codigo')];
      setValuesfield([...valuesfield]);
    }
  }, [itemselec]);

  const Incluir = () => {
    apiID('PrecontratoEndereco').then((response) => {
      if (response.status === 200) {
        valuesfield[0] = response.data.mensagem;
        valuesfield[1] = '';
        valuesfield[2] = '';
        valuesfield[3] = '';
        valuesfield[4] = 0;
        valuesfield[5] = '';
        valuesfield[6] = '';
        valuesfield[7] = '';
        valuesfield[8] = '';
        valuesfield[9] = '';
        valuesfield[10] = '';
        valuesfield[11] = '';
        valuesfield[12] = cabecalho[valuesname.indexOf('codigo')];
        setValuesfield([...valuesfield]);
        setDisabled(false);
        setInclusao(true);
        setShowsave(true);
        try {
          document.getElementById('TB02269_NOME').focus();
        } catch (error) {
          //console.log(error);
        }
      }
    });
  };

  const Excluir = () => {
    if (rows.length > 0 && valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      Confirmation('frmendereco', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          apiDelete('PrecontratoEndereco', itemselec).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              if (response.data.status === 1) {
                setItemselec(undefined);
                setDisabled(true);
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

  const Editar = () => {
    setDisabled(false);
    setInclusao(false);
    try {
      document.getElementById('TB02269_NOME').focus();
    } catch (error) {
      //console.log(error);
    }
  };

  const Salvar = () => {
    if (document.getElementById('TB02269_NOME').value === undefined || document.getElementById('TB02269_NOME').value === '') {
      setItemvariant(1);
      setMensagem('Campo Descrição é preenchimento obrigatório !');
      document.getElementById('TB02262_NOME').focus();
    } else {
      setCarregando(true);
      try {
        let item = {};
        item['codigo'] = valuesfield[0];
        item['nome'] = valuesfield[1];
        item['cep'] = valuesfield[2];
        item['end'] = valuesfield[3];
        item['num'] = valuesfield[4];
        item['comp'] = valuesfield[5];
        item['bairro'] = valuesfield[6];
        item['cidade'] = valuesfield[7];
        item['estado'] = valuesfield[8];
        item['fone'] = valuesfield[9];
        item['contato'] = valuesfield[10];
        item['email'] = valuesfield[11];
        item['precontrato'] = cabecalho[valuesname.indexOf('codigo')];

        //console.log(item);
        if (inclusao) {
          apiInsert('PrecontratoEndereco', item).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              console.log(response.data);
              if (response.data.status === 1) {
                setDisabled(response.data.status === 1);
                setItemselec(undefined);
                setDisabled(true);
                setShowsave(false);
                Filtrar();
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          });
        } else {
          apiUpdate('PrecontratoEndereco', item).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              if (response.data.status === 1) {
                setDisabled(response.data.status === 1);
                setItemselec(undefined);
                setDisabled(true);
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

  const handleCloseShowsave = () => {
    setItemselec(undefined);
    setDisabled(true);
    setShowsave(false);
  };

  const Cancelar = () => {
    setItemselec(undefined);
    setDisabled(true);
    setShowsave(false);
  };

  const clickGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setShowsave(true);
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      setItemselec(newSelection);
      setShowsave(true);
    }
    if (altinfor && (dtgerado === '' || dtgerado === undefined || dtgerado === null)) {
      if (event.key === 'Delete') {
        setItemselec(newSelection);
        Excluir();
      }
    }
  };

  return (
    <React.Fragment>
      <div id="frmendereco" name="frmendereco">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginBottom: '20px' }}>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Listagem de Endereços</Card.Title>
              </Card.Header>
              <AGGrid
                width="100%"
                height="350px"
                rows={rows}
                columns={columns}
                loading={carregando}
                onKeyDown={keyGrid}
                onDoubleClick={dblClickGrid}
                onCelClick={clickGrid}
              ></AGGrid>
            </Card>
          </Row>
          {altinfor && (dtgerado === '' || dtgerado === undefined || dtgerado === null) ? (
            <Row style={{ textAlign: 'right', marginTop: '10px' }}>
              <Col>
                <Button id="btnIncluir" className="btn btn-primary  mb-2" onClick={Incluir}>
                  <i className={'feather icon-star'} /> Novo Endereço
                </Button>
                <Button id="btnExcluir" className="btn btn-success  mb-2" disabled={!disabled} onClick={Excluir}>
                  <i className={'feather icon-trash'} /> Excluir Endereço
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
              <i className={'feather icon-map-pin h1'} />
              &nbsp;Definição de Endereços
            </Modal.Header>
            <ModalBody>
              <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
              <Row>
                <Col>
                  <div>
                    <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                      {fieldsaddress.map((field, index) => (
                        <CreateObject
                          key={index}
                          field={field}
                          index={field.id}
                          fields={fieldsaddress}
                          valuesfield={valuesfield}
                          setValuesfield={(data) => setValuesfield(data)}
                          valuesfield2={valuesfield2}
                          setValuesfield2={(data) => setValuesfield2(data)}
                          disabled={disabled}
                        ></CreateObject>
                      ))}
                    </Row>
                  </div>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              {altinfor && (dtgerado === '' || dtgerado === undefined || dtgerado === null) ? (
                <Row style={{ textAlign: 'rigth' }}>
                  <Col>
                    <Button id="btnEditar" className="btn shadow-2 mb-2" disabled={!disabled} onClick={Editar}>
                      <i className={'feather icon-edit'} /> Editar
                    </Button>
                    <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" disabled={disabled} onClick={Salvar}>
                      <i className={'feather icon-save'} /> Salvar
                    </Button>
                    <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" disabled={disabled} onClick={Cancelar}>
                      <i className={'feather icon-x'} />
                      Cancelar
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

export default PreContratoEndereco;
