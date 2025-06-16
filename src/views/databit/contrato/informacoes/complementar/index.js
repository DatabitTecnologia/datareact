import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiUpdate, apiFind, apiDocument } from '../../../../../api/crudapi';
import { base64toBlob } from '../../../../../utils/crypto';

const ContratoComplementar = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [disabled, setDisabled] = React.useState(true);
  const { cabecalho, setCabecalho } = props;
  const { valuesname, setValuesname } = props;
  const [dtgerado, setDtgerado] = React.useState('');
  const [altinfor, setAltinfor] = React.useState();
  const [modelopro, setModelopro] = React.useState();

  useEffect(() => {
    setValuesdisable([true, true, true, true, true, true, true, true]);
    setFields([
      {
        id: 0,
        campo: 'TB02111_CODEMP',
        funcao: 'Empresa do Contrato',
        tipo: 'varchar',
        nome: 'codemp',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 33,
        measure: '33.9rem',
        tabelaref: 'TB01007',
        widthname: 24,
        disabled: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'TB02111_CODEMP2',
        funcao: 'Empresa de Faturamento',
        tipo: 'varchar',
        nome: 'codemp2',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 33,
        measure: '33.9rem',
        tabelaref: 'TB01007',
        widthname: 24,
        disabled: valuesdisable[1]
      },
      {
        id: 2,
        campo: 'TB02111_DURACAO',
        funcao: 'Duração Contrato (Meses)',
        tipo: 'int',
        nome: 'duracao',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 14,
        measure: '14rem',
        decimal: 0,
        disabled: valuesdisable[2]
      },
      {
        id: 3,
        campo: 'TB02111_DIAVENC',
        funcao: 'Dia de Vencimento',
        tipo: 'int',
        nome: 'diavenc',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 14,
        measure: '14rem',
        decimal: 0,
        disabled: valuesdisable[3]
      },
      {
        id: 4,
        campo: 'TB02111_DTINICIO',
        funcao: 'Data Inicio',
        tipo: 'datetime',
        nome: 'dtinicio',
        tamanho: 11,
        tipoobject: 5,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[4]
      },
      {
        id: 5,
        campo: 'TB02111_VENCCONTR',
        funcao: 'Data Vencimento',
        tipo: 'datetime',
        nome: 'venccontr',
        tamanho: 11,
        tipoobject: 5,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[5]
      }
    ]);
    Filtrar();
  }, []);

  const Filtrar = () => {
    setCarregando(true);
    apiFind(
      'Precontrato',
      'TB02264_CODIGO,TB02264_STATUS,TB02264_DTGERADO,TB02264_TIPOPRE',
      '',
      " TB02264_CODIGO = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
    ).then((response) => {
      if (response.status === 200) {
        let tempgerado = response.data.dtgerado;
        let tipo = response.data.tipopre;
        setDtgerado(tempgerado);
        let statusatual = response.data.status;
        if (statusatual !== '' && statusatual !== undefined) {
          apiFind('PrecontratoStatus', '*', '', "TB01136_CODIGO = '" + statusatual + "' ").then((response) => {
            if (response.status === 200) {
              setAltinfor(response.data.altinfor === 'S');
              apiFind(
                'Contrato',
                'TB02111_CODEMP,TB02111_CODEMP2,TB02111_DURACAO,TB02111_DIAVENC,TB02111_DTINICIO,TB02111_VENCCONTR',
                '',
                " TB02111_CODIGO = '" + cabecalho[valuesname.indexOf('contrato')] + "' "
              ).then((response) => {
                if (response.status === 200) {
                  setCarregando(false);
                  setRows(response.data);
                  apiFind('PrecontratoTipo', '*', '', "TB01138_CODIGO = '" + tipo + "' ").then((response) => {
                    if (response.status === 200) {
                      setCarregando(false);
                      setModelopro(response.data.modelo);
                      console.log(response.data);
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
  };

  useEffect(() => {
    if (rows !== undefined) {
      const keys = Object.keys(rows);
      const values = Object.values(rows);
      keys.forEach((item, index) => {
        fields.forEach((item2, index2) => {
          if (item === item2.nome) {
            try {
              if (item2.tipoobject !== 5) {
                valuesfield[index2] = values[index];
              } else {
                if (values[index] !== undefined) {
                  const dt1 = values[index].substring(3, 5) + '/' + values[index].substring(0, 2) + '/' + values[index].substring(6, 10);
                  const datafim = new Date(dt1);
                  valuesfield[index2] = datafim;
                }
              }
              setValuesfield([...valuesfield]);
            } catch (error) {
              ////console.log(error);
            }
          }
        });
      });
    }
  }, [rows]);

  function addMonths(date, months) {
    const newDate = new Date(date.valueOf());
    const currentMonth = newDate.getMonth();
    const newMonth = parseInt(currentMonth) + parseInt(months);
    newDate.setMonth(newMonth);
    // Verifique se o dia do mês mudou após adicionar os meses
    if (newDate.getDate() !== date.getDate()) {
      // Ajuste a data para o último dia do mês anterior
      newDate.setDate(0);
    }
    return newDate;
  }

  useEffect(() => {
    if (valuesfield[4] !== undefined && valuesfield[4] !== '' && valuesfield[4] !== null) {
      const tmdata1 = Date.parse(valuesfield[4]);
      let duracao = 0;
      if (valuesfield[2] !== undefined && valuesfield[2] !== '' && valuesfield[2] !== null) {
        duracao = parseInt(valuesfield[2]);
      }
      const data = new Date(tmdata1);
      valuesfield[5] = addMonths(data, duracao);
      setValuesfield([...valuesfield]);
    }
  }, [valuesfield[2], valuesfield[4]]);

  const Editar = () => {
    setDisabled(false);
    valuesdisable[0] = false;
    valuesdisable[1] = false;
    valuesdisable[2] = false;
    valuesdisable[3] = false;
    valuesdisable[4] = false;
    valuesdisable[5] = false;
    valuesdisable[6] = true;
    valuesdisable[7] = false;
    setValuesdisable([...valuesdisable]);
    try {
      document.getElementById('TB02111_CODEMP').focus();
    } catch (error) {
      //console.log(error);
    }
  };

  const Salvar = () => {
    setCarregando(true);
    try {
      let item = {};
      fields.forEach((field, index) => {
        item[field.nome] = valuesfield[index];
      });
      item['codigo'] = cabecalho[valuesname.indexOf('contrato')];
      apiUpdate('Contrato', item).then((response) => {
        if (response.status === 200) {
          setItemvariant(response.data.status + 1);
          setMensagem(response.data.mensagem);
          setCarregando(false);
          if (response.data.status === 1) {
            setDisabled(response.data.status === 1);
            valuesdisable[0] = true;
            valuesdisable[1] = true;
            valuesdisable[2] = true;
            valuesdisable[3] = true;
            valuesdisable[4] = true;
            valuesdisable[5] = true;
            valuesdisable[6] = true;
            valuesdisable[7] = true;
            setValuesdisable([...valuesdisable]);
            setRows(item);
          }
        } else {
          setItemvariant(-1);
          setMensagem(response.data);
        }
      });
    } catch (error) {
      setItemvariant(-1);
      setMensagem(error);
    }
  };

  const Cancelar = () => {
    valuesdisable[0] = true;
    valuesdisable[1] = true;
    valuesdisable[2] = true;
    valuesdisable[3] = true;
    valuesdisable[4] = true;
    valuesdisable[5] = true;
    valuesdisable[6] = true;
    valuesdisable[7] = true;
    setValuesdisable([...valuesdisable]);
    const keys = Object.keys(rows);
    const values = Object.values(rows);
    keys.forEach((item, index) => {
      fields.forEach((item2, index2) => {
        if (item === item2.nome) {
          try {
            if (item2.tipoobject !== 5) {
              valuesfield[index2] = values[index];
            } else {
              if (values[index] !== undefined) {
                const dt1 = values[index].substring(3, 5) + '/' + values[index].substring(0, 2) + '/' + values[index].substring(6, 10);
                const datafim = new Date(dt1);
                valuesfield[index2] = datafim;
              }
            }
            setValuesfield([...valuesfield]);
          } catch (error) {
            ////console.log(error);
          }
        }
      });
    });
    setDisabled(true);
  };

  const Proposta = () => {
    setCarregando(true);
    apiDocument(modelopro, cabecalho[valuesname.indexOf('codigo')]).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        const arquivo = response.data.arquivo;
        const base64 = response.data.base64;
        const s64 = base64toBlob(base64, 'application/pdf');
        const url = URL.createObjectURL(s64);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', arquivo);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frmcontrato" name="frmcontrato">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col style={{ marginLeft: '10px' }}>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Informações Complementares</Card.Title>
              </Card.Header>

              <div>
                <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
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
                      disabled={valuesdisable[field.id]}
                    ></CreateObject>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>

        <hr></hr>

        <Row style={{ textAlign: 'right' }}>
          <Col>
            {altinfor ? (
              <Button id="btnEditar" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={Editar}>
                <i className={'feather icon-edit'} /> Editar
              </Button>
            ) : (
              <></>
            )}
            {altinfor ? (
              <Button id="btnSalvar" className="btn btn-success shadow-2 mb-3" disabled={disabled} onClick={Salvar}>
                <i className={'feather icon-save'} /> Salvar
              </Button>
            ) : (
              <></>
            )}
            {altinfor ? (
              <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-3" disabled={disabled} onClick={Cancelar}>
                <i className={'feather icon-x'} /> Cancelar
              </Button>
            ) : (
              <></>
            )}
            {modelopro !== '' && modelopro !== undefined && modelopro !== null ? (
              <Button id="btnProposta" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={Proposta}>
                <i className={'feather icon-file'} /> Proposta
              </Button>
            ) : (
              <></>
            )}
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

export default ContratoComplementar;
