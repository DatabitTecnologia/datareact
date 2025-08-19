import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiUpdate, apiFind, apiExec, apiDocument } from '../../../../../api/crudapi';
import { Confirmation } from '../../../../../components/Confirmation';
import { Decode64 } from '../../../../../utils/crypto';
import { base64toBlob } from '../../../../../utils/crypto';
import { addMonths } from '../../../../../utils/addmonths';

const PreContratoComplementar = (props) => {
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
  const [modelopro, setModelopro] = React.useState();
  const [geracontrato, setGeracontrato] = React.useState();

  useEffect(() => {
    setValuesdisable([true, true, true, true, true, true, true, true, true]);
    setFields([
      {
        id: 0,
        campo: 'TB02264_CODEMP',
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
        campo: 'TB02264_CODEMP2',
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
        campo: 'TB02264_DURACAO',
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
        campo: 'TB02264_DIAVENC',
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
        campo: 'TB02264_DTINICIO',
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
        campo: 'TB02264_VENCCONTR',
        funcao: 'Data Vencimento',
        tipo: 'datetime',
        nome: 'venccontr',
        tamanho: 11,
        tipoobject: 5,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[5]
      },
      {
        id: 6,
        campo: 'TB02264_DTGERADO',
        funcao: 'Contrato Gerado em',
        tipo: 'datetime',
        nome: 'dtgerado',
        tamanho: 11,
        tipoobject: 5,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[6]
      },
      {
        id: 7,
        campo: 'TB02264_CONTRATO',
        funcao: 'Número Contrato',
        tipo: 'datetime',
        nome: 'dtgerado',
        tamanho: 12,
        tipoobject: 1,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[7]
      }
    ]);
    Filtrar();
  }, []);

  const Filtrar = () => {
    setCarregando(true);
    apiFind(
      'Precontrato',
      'TB02264_CODEMP,TB02264_CODEMP2,TB02264_DURACAO,TB02264_DIAVENC,TB02264_DTINICIO,TB02264_VENCCONTR,TB02264_DTGERADO,TB02264_TIPOPRE,TB02264_STATUS,TB02264_DTGERADO,TB02264_TIPOPRE,TB02264_CONTRATO',
      '',
      " TB02264_CODIGO = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        let tempgerado = response.data.dtgerado;
        let tipo = response.data.tipopre;
        setDtgerado(tempgerado);
        let statusatual = response.data.status;
        if (statusatual !== '' && statusatual !== undefined) {
          apiFind('PrecontratoStatus', '*', '', "TB01136_CODIGO = '" + statusatual + "' ").then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              setGeracontrato(response.data.gerarcontrato === 'S');
              apiFind('PrecontratoTipo', '*', '', "TB01138_CODIGO = '" + tipo + "' ").then((response) => {
                if (response.status === 200) {
                  setCarregando(false);
                  setModelopro(response.data.modelo);
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
      valuesfield[0] = rows.codemp;
      valuesfield[1] = rows.codemp2;
      valuesfield[2] = rows.duracao;
      valuesfield[3] = rows.diavenc;
      if (rows.dtinicio !== null && rows.dtinicio !== undefined && rows.dtinicio !== '') {
        try {
          const dt1 = rows.dtinicio.substring(3, 5) + '/' + rows.dtinicio.substring(0, 2) + '/' + rows.dtinicio.substring(6, 10);
          const datafim = new Date(dt1);
          valuesfield[4] = datafim;
        } catch (error) {
          console.log(error);
        }
      }

      if (rows.dtinicio !== null && rows.dtinicio !== undefined && rows.dtinicio !== '') {
        try {
          const dt2 = rows.venccontr.substring(3, 5) + '/' + rows.venccontr.substring(0, 2) + '/' + rows.venccontr.substring(6, 10);
          const datafim2 = new Date(dt2);
          valuesfield[5] = datafim2;
        } catch (error) {
          console.log(error);
        }
      }
      if (rows.dtgerado !== null && rows.dtgerado !== undefined && rows.dtgerado !== '') {
        try {
          const dt3 = rows.dtgerado.substring(3, 5) + '/' + rows.dtgerado.substring(0, 2) + '/' + rows.dtgerado.substring(6, 10);
          const datafim3 = new Date(dt3);
          valuesfield[6] = datafim3;
        } catch (error) {
          console.log(error);
        }
      }
      if (rows.contrato !== null && rows.contrato !== undefined && rows.contrato !== '') {
        valuesfield[7] = rows.contrato;
      }
      setValuesfield([...valuesfield]);
    }
  }, [rows]);

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
      document.getElementById('TB02264_CODEMP').focus();
    } catch (error) {
      //console.log(error);
    }
  };

  const Salvar = () => {
    setCarregando(true);
    try {
      let item = {};
      item['codemp'] = valuesfield[0];
      item['codemp2'] = valuesfield[1];
      item['duracao'] = valuesfield[2];
      item['diavenc'] = valuesfield[3];

      const tmdata1 = Date.parse(valuesfield[4]);
      const dt1 = new Date(tmdata1);
      const data1 = dt1.toLocaleDateString('en-US');
      item['dtinicio'] = data1 + ' 00:00:00';

      const tmdata2 = Date.parse(valuesfield[5]);
      const dt2 = new Date(tmdata2);
      const data2 = dt2.toLocaleDateString('en-US');
      item['venccontr'] = data2 + ' 00:00:00';

      item['contrato'] = valuesfield[7];

      item['codigo'] = cabecalho[valuesname.indexOf('codigo')];

      apiUpdate('Precontrato', item).then((response) => {
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

  const PreContrato = () => {
    try {
      if (valuesfield[7] === '' || valuesfield[7] === undefined || valuesfield[7] === null) {
        setItemvariant(1);
        setMensagem('Primeiramente você deve preencher o número do contrato no Pré-Contrato !');
      } else {
        Confirmation('frmcontrato', 'Deseja gerar Contrato ?').then((result) => {
          if (result.isConfirmed) {
            setCarregando(true);
            apiExec(
              "exec SP02251 '" +
                cabecalho[valuesname.indexOf('codigo')] +
                "', '" +
                valuesfield[7] +
                "' , '" +
                Decode64(sessionStorage.getItem('user')) +
                "' ",
              'S'
            ).then((response) => {
              if (response.status === 200) {
                setItemvariant(response.data[0].status + 1);
                setMensagem(response.data[0].mensagem);
                setCarregando(false);
                setGeracontrato(false);
              }
            });
          }
        });
      }
    } catch (error) {
      setItemvariant(-1);
      setMensagem(error);
    }
  };

  const Proposta = () => {
    setCarregando(true);
    apiDocument(modelopro, cabecalho[valuesname.indexOf('codigo')]).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        const arquivo = response.data.arquivo;
        const base64 = response.data.base64;
        const s64 = base64toBlob(base64, 'application/octet-stream');
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
            {geracontrato && (dtgerado === '' || dtgerado === undefined || dtgerado === null) ? (
              <Button id="btnEditar" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={Editar}>
                <i className={'feather icon-edit'} /> Editar
              </Button>
            ) : (
              <></>
            )}
            {geracontrato && (dtgerado === '' || dtgerado === undefined || dtgerado === null) ? (
              <Button id="btnSalvar" className="btn btn-success shadow-2 mb-3" disabled={disabled} onClick={Salvar}>
                <i className={'feather icon-save'} /> Salvar
              </Button>
            ) : (
              <></>
            )}
            {geracontrato && (dtgerado === '' || dtgerado === undefined || dtgerado === null) ? (
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
            {geracontrato && (dtgerado === '' || dtgerado === undefined || dtgerado === null) ? (
              <Button id="btnGerar" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={PreContrato}>
                <i className={'feather icon-check-circle'} /> Gerar Contrato
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

export default PreContratoComplementar;
