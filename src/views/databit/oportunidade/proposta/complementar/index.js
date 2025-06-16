import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiUpdate, apiFind, apiExec, apiDocument } from '../../../../../api/crudapi';
import { Confirmation } from '../../../../../components/Confirmation';
import { Decode64 } from '../../../../../utils/crypto';
import { base64toBlob } from '../../../../../utils/crypto';
import { addMonths } from '../../../../../utils/addmonths';

const PropostaComplementar = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [valuesinvisible, setValuesinvisible] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [disabled, setDisabled] = React.useState(true);
  const { cabecalho, setCabecalho } = props;
  const { valuesname, setValuesname } = props;
  const [gerapre, setGerapre] = React.useState();
  const [modelopro, setModelopro] = React.useState();
  const [precontrato, setPrecontrato] = React.useState('');

  useEffect(() => {
    setValuesdisable([true, true, true, true, true, true, true, true, true]);
    setValuesinvisible([false, false, false, false, false, false, false, false, true]);
    setFields([
      /*{
        id: 7,
        campo: 'TB02260_TIPOPRE',
        funcao: 'Tipo Pré-Contrato',
        tipo: 'varchar',
        nome: 'tipopre',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 67,
        measure: '67rem',
        tabelaref: 'TB01138',
        widthname: 58,
        disabled: valuesdisable[7],
        invisible: valuesinvisible[7]
      },*/
      {
        id: 8,
        campo: 'TB02260_CONTRATO',
        funcao: 'Contrato',
        tipo: 'varchar',
        nome: 'contrato',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 67,
        measure: '67rem',
        tabelaref: 'TB02111',
        widthname: 58,
        disabled: valuesdisable[8],
        invisible: valuesinvisible[8],
        filteraux: " AND TB02111_CODCLI = '" + cabecalho[valuesname.indexOf('codcli')] + "' "
      },
      {
        id: 0,
        campo: 'TB02260_CODEMP',
        funcao: 'Empresa do Contrato',
        tipo: 'varchar',
        nome: 'codemp',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 33,
        measure: '33.9rem',
        tabelaref: 'TB01007',
        widthname: 24,
        disabled: valuesdisable[0],
        invisible: valuesinvisible[0]
      },
      {
        id: 1,
        campo: 'TB02260_CODEMP2',
        funcao: 'Empresa de Faturamento',
        tipo: 'varchar',
        nome: 'codemp2',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 33,
        measure: '33.9rem',
        tabelaref: 'TB01007',
        widthname: 24,
        disabled: valuesdisable[1],
        invisible: valuesinvisible[1]
      },
      {
        id: 2,
        campo: 'TB02260_DURACAO',
        funcao: 'Duração Contrato (Meses)',
        tipo: 'int',
        nome: 'duracao',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 14,
        measure: '14rem',
        decimal: 0,
        disabled: valuesdisable[2],
        invisible: valuesinvisible[2]
      },
      {
        id: 3,
        campo: 'TB02260_DIAVENC',
        funcao: 'Dia de Vencimento',
        tipo: 'int',
        nome: 'diavenc',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 14,
        measure: '14rem',
        decimal: 0,
        disabled: valuesdisable[3],
        invisible: valuesinvisible[3]
      },
      {
        id: 4,
        campo: 'TB02260_DTINICIO',
        funcao: 'Data Inicio',
        tipo: 'datetime',
        nome: 'dtinicio',
        tamanho: 11,
        tipoobject: 5,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[4],
        invisible: valuesinvisible[4]
      },
      {
        id: 5,
        campo: 'TB02260_VENCCONTR',
        funcao: 'Data Vencimento',
        tipo: 'datetime',
        nome: 'venccontr',
        tamanho: 11,
        tipoobject: 5,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[5],
        invisible: valuesinvisible[5]
      },
      {
        id: 6,
        campo: 'TB02260_DTGERADO',
        funcao: 'Pré-Contrato Gerado em',
        tipo: 'datetime',
        nome: 'dtgerado',
        tamanho: 11,
        tipoobject: 5,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[6],
        invisible: valuesinvisible[6]
      }
    ]);

    Filtrar();
  }, []);

  const Filtrar = () => {
    setCarregando(true);
    apiFind(
      'PropostaContrato',
      'TB02260_TIPOPRE,TB02260_CONTRATO,TB02260_CODEMP,TB02260_CODEMP2,TB02260_DURACAO,TB02260_DIAVENC,TB02260_DTINICIO,TB02260_VENCCONTR,TB02260_DTGERADO',
      '',
      " TB02260_CODIGO = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
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
      //if (rows.tipopre !== null && rows.tipopre !== undefined && rows.tipopre !== '') {
      //  valuesfield[7] = rows.tipopre;
      //}
      if (rows.contrato !== null && rows.contrato !== undefined && rows.contrato !== '') {
        valuesfield[8] = rows.contrato;
      }
      setValuesfield([...valuesfield]);
    }
    setCarregando(true);
    apiFind(
      'Oportunidade',
      'TB02255_CODIGO,TB02255_STATUS,TB02255_PRE,TB02255_TIPOOP',
      '',
      " TB02255_CODIGO = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
    ).then((response) => {
      if (response.status === 200) {
        let tmppre = response.data.pre;
        let tipo = response.data.tipoop;
        setPrecontrato(tmppre);
        let statusatual = response.data.status;
        if (statusatual !== '' && statusatual !== undefined) {
          apiFind('OportunidadeStatus', '*', '', "TB01129_CODIGO = '" + statusatual + "' ").then((response) => {
            if (response.status === 200) {
              setGerapre(response.data.gerarpre === 'S');
              apiFind('OportunidadeTipo', '*', '', "TB01132_CODIGO = '" + tipo + "' ").then((response) => {
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

  /*useEffect(() => {
    let valor = valuesfield[7];
    if (valor !== undefined) {
      if (valor !== '' && valor.length === 4) {
        apiFind('PrecontratoTipo', '*', '', "TB01138_CODIGO = '" + valor + "' ").then((response) => {
          if (response.status === 200) {
            valuesinvisible[8] = response.data.operacao === 'C';
          }
        });
      }
    }
  }, [valuesfield[7]]);*/

  useEffect(() => {
    let valor = valuesfield[8];
    if (valor !== undefined) {
      apiFind('Contrato', '*', '', "TB02111_CODIGO = '" + valor + "' ").then((response) => {
        if (response.status === 200) {
          if (!valuesfield[0]) valuesfield[0] = response.data.codemp;
          if (!valuesfield[1]) valuesfield[1] = response.data.codemp;
          if (!valuesfield[2] || parseInt(valuesfield[2]) !== response.data.duracao) valuesfield[2] = response.data.duracao;
          if (!valuesfield[3] || parseInt(valuesfield[3]) !== response.data.diavenc) valuesfield[3] = response.data.diavenc;
          console.log(valuesfield[4]);
          if (!valuesfield[4]) {
            try {
              const dt1 =
                response.data.dtinicio.substring(3, 5) +
                '/' +
                response.data.dtinicio.substring(0, 2) +
                '/' +
                response.data.dtinicio.substring(6, 10);
              const datafim = new Date(dt1);
              valuesfield[4] = datafim;
            } catch (error) {
              console.log(error);
            }
          }
          if (!valuesfield[5]) {
            try {
              const dt2 =
                response.data.venccontr.substring(3, 5) +
                '/' +
                response.data.venccontr.substring(0, 2) +
                '/' +
                response.data.venccontr.substring(6, 10);
              const datafim2 = new Date(dt2);
              valuesfield[5] = datafim2;
            } catch (error) {
              console.log(error);
            }
          }
        }
      });
    }
  }, [valuesfield[8]]);

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
    valuesdisable[8] = false;
    setValuesdisable([...valuesdisable]);
    try {
      document.getElementById('TB02260_CODEMP').focus();
    } catch (error) {
      //console.log(error);
    }
  };

  const Salvar = () => {
    /*if (document.getElementById('TB02260_TIPOPRE').value === undefined || document.getElementById('TB02260_TIPOPRE').value === '') {
      setItemvariant(1);
      setMensagem('Tipo de Pré-Contrato é preenchimento obrigatório !');
      document.getElementById('TB02260_TIPOPRE').focus();
    } else {*/
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

      //item['tipopre'] = valuesfield[7];
      if (!valuesinvisible[8]) {
        item['contrato'] = valuesfield[8];
      }

      item['codigo'] = cabecalho[valuesname.indexOf('codigo')];

      apiUpdate('PropostaContrato', item).then((response) => {
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
            valuesdisable[8] = true;
            setValuesdisable([...valuesdisable]);
            //setRows(item);
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
    //}
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
    valuesdisable[8] = true;
    setValuesdisable([...valuesdisable]);
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
      //if (rows.tipopre !== null && rows.tipopre !== undefined && rows.tipopre !== '') {
      //  valuesfield[7] = rows.tipopre;
      //}
      if (rows.contrato !== null && rows.contrato !== undefined && rows.contrato !== '') {
        valuesfield[8] = rows.contrato;
      }
      setValuesfield([...valuesfield]);
    }

    setDisabled(true);
  };

  const PreContrato = () => {
    /*if (document.getElementById('TB02260_TIPOPRE').value === undefined || document.getElementById('TB02260_TIPOPRE').value === '') {
      setItemvariant(1);
      setMensagem('Tipo de Pré-Contrato é preenchimento obrigatório !');
      document.getElementById('TB02260_TIPOPRE').focus();
    } else {*/
    if (parseInt(cabecalho[valuesname.indexOf('tipo')]) !== 1) {
      try {
        Confirmation('frmcontrato', 'Deseja criar Pré-Contrato para esta Oportunidade ?').then((result) => {
          if (result.isConfirmed) {
            setCarregando(true);
            apiExec(
              "exec SP02250 '" + cabecalho[valuesname.indexOf('codigo')] + "', '" + Decode64(sessionStorage.getItem('user')) + "' ",
              'S'
            ).then((response) => {
              if (response.status === 200) {
                setItemvariant(response.data[0].status + 1);
                setMensagem(response.data[0].mensagem);
                setCarregando(false);
                setGerapre(false);
              }
            });
          }
        });
      } catch (error) {
        setItemvariant(-1);
        setMensagem(error);
      }
    } else {
      setItemvariant(1);
      setMensagem('Não é possível gerar um Pré-Contrato para cliente PROSPECT !');
    }
    //}
  };

  function downloadPDF(pdf) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement('a');
    const fileName = 'file.pdf';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  const Proposta = () => {
    setCarregando(true);
    apiDocument(modelopro, cabecalho[valuesname.indexOf('codigo')]).then((response) => {
      console.log(response.data);
      if (response.status === 200) {
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
                      invisible={valuesinvisible[field.id]}
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
            {gerapre && (precontrato === '' || precontrato === undefined || precontrato === null) ? (
              <Button id="btnEditar" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={Editar}>
                <i className={'feather icon-edit'} /> Editar
              </Button>
            ) : (
              <></>
            )}
            {gerapre && (precontrato === '' || precontrato === undefined || precontrato === null) ? (
              <Button id="btnSalvar" className="btn btn-success shadow-2 mb-3" disabled={disabled} onClick={Salvar}>
                <i className={'feather icon-save'} /> Salvar
              </Button>
            ) : (
              <></>
            )}
            {gerapre && (precontrato === '' || precontrato === undefined || precontrato === null) ? (
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
            {gerapre && (precontrato === '' || precontrato === undefined || precontrato === null) ? (
              <Button id="btnGerar" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={PreContrato}>
                <i className={'feather icon-check-circle'} /> Gerar Pré-Contrato
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

export default PropostaComplementar;
