import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../../components/CreateObject';
import { apiUpdate, apiFind, apiList, apiInsert } from '../../../../../api/crudapi';

const PropostaContrato = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [fieldscontrato, setFieldscontrato] = React.useState([]);
  const [fieldsfranquia, setFieldsfranquia] = React.useState([]);
  const [fieldsobs, setFieldsobs] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [disabled, setDisabled] = React.useState(true);
  const { cabecalho, setCabecalho } = props;
  const { valuesname, setValuesname } = props;
  const [valuesinvisible, setValuesinvisible] = React.useState([]);
  const [altproposta, setAltproposta] = React.useState();
  const [precontrato, setPrecontrato] = React.useState('');

  useEffect(() => {
    setValuesinvisible([
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);

    setFieldscontrato([
      {
        id: 21,
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
        disabled: disabled,
        invisible: valuesinvisible[21]
      },
      {
        id: 0,
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
        disabled: disabled,
        invisible: valuesinvisible[0],
        filteraux: " AND TB02111_CODCLI = '" + cabecalho[valuesname.indexOf('codcli')] + "' "
      },
      {
        id: 1,
        campo: 'TB02260_NOME',
        funcao: 'Título Contrato',
        tipo: 'varchar',
        nome: 'nome',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 42,
        measure: '42rem',
        invisible: valuesinvisible[1],
        disabled: disabled
      },
      {
        id: 2,
        campo: 'TB02260_QTDECONTRATA',
        funcao: 'Qt. Contratada',
        tipo: 'int',
        nome: 'qtdecontrata',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 12,
        measure: '12.8rem',
        invisible: valuesinvisible[2],
        disabled: disabled,
        decimal: 0
      },
      {
        id: 3,
        campo: 'TB02260_VLRCONTRATA',
        funcao: 'Valor Contratado',
        tipo: 'numeric',
        nome: 'vlrcontrata',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 12,
        measure: '12rem',
        invisible: valuesinvisible[3],
        disabled: disabled,
        decimal: 2
      },
      {
        id: 4,
        campo: 'TB02260_TIPOCONTR',
        funcao: 'Tipo Contrato',
        tipo: 'varchar',
        nome: 'tipocontr',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 22,
        measure: '22.6rem',
        itens: 'Contrato de Locação,Contrato de Garantia,Contrato de Manutenção,Serviço Avulso',
        values: 'L,G,M,A',
        invisible: valuesinvisible[4],
        disabled: disabled
      },
      {
        id: 5,
        campo: 'TB02260_TIPOFRANQUIA',
        funcao: 'Tipo de Franquia',
        tipo: 'varchar',
        nome: 'tipofranquia',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 22,
        measure: '22.6rem',
        itens: 'Por Tonalidade,Global',
        values: 'T,G',
        invisible: valuesinvisible[5],
        disabled: disabled
      },
      {
        id: 6,
        campo: 'TB02260_ANALFRANQUIA',
        funcao: 'Analise de Franquia',
        tipo: 'varchar',
        nome: 'analfranquia',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 22,
        measure: '22.6rem',
        itens: 'Por Contrato (Total),Por Equipamento,Por Grupo,Compensatório,Compensatório por Grupo',
        values: 'T,M,G,E,W',
        invisible: valuesinvisible[6],
        disabled: disabled
      }
    ]);

    setFieldsfranquia([
      {
        id: 7,
        campo: 'TB02260_FRANQTOTAL',
        funcao: 'Franquia TOTAL',
        tipo: 'int',
        nome: 'franqtotal',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        invisible: valuesinvisible[7],
        disabled: disabled,
        decimal: 0
      },
      {
        id: 8,
        campo: 'TB02260_VLRFRANQTOTAL',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrfranqtotal',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11.5rem',
        invisible: valuesinvisible[8],
        disabled: disabled,
        decimal: 2
      },
      {
        id: 9,
        campo: 'TB02260_FRANQPB',
        funcao: 'Franquia A4 PB',
        tipo: 'int',
        nome: 'franqpb',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        invisible: valuesinvisible[9],
        disabled: disabled,
        decimal: 0
      },
      {
        id: 10,
        campo: 'TB02260_VLRFRANQPB',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrfranqpb',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11.5rem',
        invisible: valuesinvisible[10],
        disabled: disabled,
        decimal: 2
      },
      {
        id: 11,
        campo: 'TB02260_FRANQCOLOR',
        funcao: 'Franquia A4 COLOR',
        tipo: 'int',
        nome: 'franqcolor',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        invisible: valuesinvisible[11],
        disabled: disabled,
        decimal: 0
      },
      {
        id: 12,
        campo: 'TB02260_VLRFRANQCOLOR',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrfranqcolor',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11.5rem',
        invisible: valuesinvisible[12],
        disabled: disabled,
        decimal: 2
      },
      {
        id: 13,
        campo: 'TB02260_FRANQDG',
        funcao: 'Franquia Digitalização',
        tipo: 'int',
        nome: 'franqdg',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        invisible: valuesinvisible[13],
        disabled: disabled,
        decimal: 0
      },
      {
        id: 14,
        campo: 'TB02260_VLRFRANQDG',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrfranqdg',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11.5rem',
        invisible: valuesinvisible[14],
        disabled: disabled,
        decimal: 2
      },
      {
        id: 15,
        campo: 'TB02260_FRANQGF',
        funcao: 'Franquia A3 PB',
        tipo: 'int',
        nome: 'franqgf',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        invisible: valuesinvisible[15],
        disabled: disabled,
        decimal: 0
      },
      {
        id: 16,
        campo: 'TB02260_VLRFRANQGF',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrfranqgf',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11.5rem',
        invisible: valuesinvisible[16],
        disabled: disabled,
        decimal: 2
      },
      {
        id: 17,
        campo: 'TB02260_FRANQGFC',
        funcao: 'Franquia A3 COLOR',
        tipo: 'int',
        nome: 'franqgf ',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11rem',
        invisible: valuesinvisible[17],
        disabled: disabled,
        decimal: 0
      },
      {
        id: 18,
        campo: 'TB02260_VLRFRANQGFC',
        funcao: 'Valor',
        tipo: 'numeric',
        nome: 'vlrfranqgfc',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 11,
        measure: '11.5rem',
        invisible: valuesinvisible[18],
        disabled: disabled,
        decimal: 2
      }
    ]);

    setFieldsobs([
      {
        id: 19,
        campo: 'TB02260_OBS',
        funcao: 'Observações',
        tipo: 'text',
        nome: 'obs',
        tipoobject: 6,
        widthfield: 11,
        measure: '11rem',
        invisible: valuesinvisible[19],
        disabled: disabled,
        lines: 3
      }
    ]);
    setCarregando(true);
    apiFind(
      'PropostaContrato',
      'TB02260_CONTRATO,TB02260_NOME,TB02260_QTDECONTRATA,TB02260_VLRCONTRATA,TB02260_TIPOCONTR,TB02260_TIPOFRANQUIA,TB02260_ANALFRANQUIA,TB02260_FRANQTOTAL,TB02260_VLRFRANQTOTAL,TB02260_FRANQPB,' +
        'TB02260_VLRFRANQPB,TB02260_FRANQCOLOR,TB02260_VLRFRANQCOLOR,TB02260_FRANQDG,TB02260_VLRFRANQDG,TB02260_FRANQGF,TB02260_VLRFRANQGF,TB02260_FRANQGFC,TB02260_VLRFRANQGFC,TB02260_OBS,TB02260_CODIGO,TB02260_TIPOPRE',
      '',
      " TB02260_CODIGO = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        apiFind(
          'Oportunidade',
          'TB02255_CODIGO,TB02255_STATUS,TB02255_PRE',
          '',
          " TB02255_CODIGO = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
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
  }, []);

  useEffect(() => {
    if (rows !== undefined) {
      valuesfield[0] = rows['contrato'];
      valuesfield[1] = rows['nome'];
      valuesfield[2] = rows['qtdecontrata'];
      valuesfield[3] = rows['vlrcontrata'];
      valuesfield[4] = rows['tipocontr'];
      valuesfield[5] = rows['tipofranquia'];
      valuesfield[6] = rows['analfranquia'];
      valuesfield[7] = rows['franqtotal'];
      valuesfield[8] = rows['vlrfranqtotal'];
      valuesfield[9] = rows['franqpb'];
      valuesfield[10] = rows['vlrfranqpb'];
      valuesfield[11] = rows['franqcolor'];
      valuesfield[12] = rows['vlrfranqcolor'];
      valuesfield[13] = rows['franqdg'];
      valuesfield[14] = rows['vlrfranqdg'];
      valuesfield[15] = rows['franqgf'];
      valuesfield[16] = rows['vlrfranqgf'];
      valuesfield[17] = rows['franqgfc'];
      valuesfield[18] = rows['vlrfranqgfc'];
      if (rows['obs'] !== null && rows['obs'] !== undefined) {
        valuesfield[19] = rows['obs'];
      } else {
        valuesfield[19] = '';
      }
      valuesfield[20] = cabecalho[valuesname.indexOf('codigo')];
      if (rows['tipopre'] !== null && rows['tipopre'] !== undefined) {
        valuesfield[21] = rows['tipopre'];
      }
      setValuesfield([...valuesfield]);
    }
  }, [rows]);

  useEffect(() => {
    let valor = valuesfield[21];
    if (valor !== undefined) {
      if (valor !== '' && valor.length === 4) {
        apiFind('PrecontratoTipo', '*', '', "TB01138_CODIGO = '" + valor + "' ").then((response) => {
          if (response.status === 200) {
            valuesinvisible[0] = response.data.operacao === 'C';
          }
        });
      }
    }
  }, [valuesfield[21]]);

  useEffect(() => {
    let valor = valuesfield[0];
    if (valor !== undefined) {
      apiFind('Contrato', '*', '', "TB02111_CODIGO = '" + valor + "' ").then((response) => {
        if (response.status === 200) {
          if (!valuesfield[1]) valuesfield[1] = response.data.nome;
          if (!valuesfield[2] || parseInt(valuesfield[2]) !== response.data.qtdecontrata) valuesfield[2] = response.data.qtde2;
          if (!valuesfield[3] || parseInt(valuesfield[3]) !== response.data.vlrcontrata) valuesfield[2] = response.data.vlrnota2;
          if (!valuesfield[4]) valuesfield[4] = response.data.tipocontr;
          if (!valuesfield[5]) valuesfield[5] = response.data.tipofranquia;
          if (!valuesfield[6]) valuesfield[6] = response.data.analfranquia;
          if (!valuesfield[9] || parseInt(valuesfield[9]) !== response.data.franqpb) valuesfield[9] = response.data.franqpb;
          if (!valuesfield[10] || parseInt(valuesfield[10]) !== response.data.vlrnotapb) valuesfield[10] = response.data.vlrnotapb;
          if (!valuesfield[11] || parseInt(valuesfield[11]) !== response.data.franqcolor) valuesfield[11] = response.data.franqcolor;
          if (!valuesfield[12] || parseInt(valuesfield[12]) !== response.data.vlrnotacl) valuesfield[12] = response.data.vlrnotacl;
          if (!valuesfield[13] || parseInt(valuesfield[13]) !== response.data.franqdg) valuesfield[13] = response.data.franqdg;
          if (!valuesfield[14] || parseInt(valuesfield[14]) !== response.data.vlrnotadg) valuesfield[14] = response.data.vlrnotadg;
          if (!valuesfield[15] || parseInt(valuesfield[15]) !== response.data.franqgf) valuesfield[15] = response.data.franqgf;
          if (!valuesfield[16] || parseInt(valuesfield[16]) !== response.data.vlrnotagf) valuesfield[16] = response.data.vlrnotagf;
          if (!valuesfield[17] || parseInt(valuesfield[17]) !== response.data.franqgfc) valuesfield[15] = response.data.franqgfc;
          if (!valuesfield[18] || parseInt(valuesfield[18]) !== response.data.vlrnotagfc) valuesfield[16] = response.data.vlrnotagfc;
          if (!valuesfield[19]) valuesfield[19] = response.data.obs;
          setValuesfield([...valuesfield]);
        }
      });
    }
  }, [valuesfield[0]]);

  const desabilitarCampos = () => {
    if (valuesfield[5] === 'G') {
      valuesinvisible[7] = false;
      valuesinvisible[8] = false;

      /*valuesinvisible[9] = true;
      valuesinvisible[10] = true;

      valuesinvisible[11] = true;
      valuesinvisible[12] = true;

      valuesinvisible[13] = true;
      valuesinvisible[14] = true;

      valuesinvisible[15] = true;
      valuesinvisible[16] = true;

      valuesinvisible[17] = true;
      valuesinvisible[18] = true;*/
    } else {
      valuesinvisible[7] = true;
      valuesinvisible[8] = true;

      /*valuesinvisible[9] = valuesfield[6] === 'M';
      valuesinvisible[10] = valuesfield[6] === 'M';

      valuesinvisible[11] = valuesfield[6] === 'M';
      valuesinvisible[12] = valuesfield[6] === 'M';

      valuesinvisible[13] = valuesfield[6] === 'M';
      valuesinvisible[14] = valuesfield[6] === 'M';

      valuesinvisible[15] = valuesfield[6] === 'M';
      valuesinvisible[16] = valuesfield[6] === 'M';

      valuesinvisible[17] = valuesfield[6] === 'M';
      valuesinvisible[18] = valuesfield[6] === 'M';*/
    }
    setValuesinvisible([...valuesinvisible]);
  };

  useEffect(() => {
    if (!disabled) {
      desabilitarCampos();
    }
  }, [valuesfield[5], valuesfield[6]]);

  const Editar = () => {
    setDisabled(false);
    desabilitarCampos();
    try {
      document.getElementById('TB02260_CONTRATO').focus();
    } catch (error) {
      //console.log(error);
    }
  };

  const Salvar = () => {
    setCarregando(true);
    try {
      let item = {};
      item['contrato'] = valuesfield[0];
      item['nome'] = valuesfield[1];
      item['qtdecontrata'] = valuesfield[2];
      item['vlrcontrata'] = valuesfield[3];
      item['tipocontr'] = valuesfield[4];
      item['tipofranquia'] = valuesfield[5];
      item['analfranquia'] = valuesfield[6];
      item['franqtotal'] = valuesfield[7];
      item['vlrfranqtotal'] = valuesfield[8];
      item['franqpb'] = valuesfield[9];
      item['vlrfranqpb'] = valuesfield[10];
      item['franqcolor'] = valuesfield[11];
      item['vlrfranqcolor'] = valuesfield[12];
      item['franqdg'] = valuesfield[13];
      item['vlrfranqdg'] = valuesfield[14];
      item['franqgf'] = valuesfield[15];
      item['vlrfranqgf'] = valuesfield[16];
      item['franqgfc'] = valuesfield[17];
      item['vlrfranqgfc'] = valuesfield[18];
      item['obs'] = valuesfield[19];
      item['tipopre'] = valuesfield[21];
      item['codigo'] = cabecalho[valuesname.indexOf('codigo')];
      apiUpdate('PropostaContrato', item).then((response) => {
        if (response.status === 200) {
          if (response.data.status === 1) {
            cabecalho[valuesname.indexOf('contrato')] = valuesfield[0];
            cabecalho[valuesname.indexOf('qtde')] = valuesfield[2];
            cabecalho[valuesname.indexOf('vlrnota')] = valuesfield[3];
            cabecalho[valuesname.indexOf('obs')] = valuesfield[19];
            setCabecalho([...cabecalho]);
            if (valuesfield[0] !== '' && valuesfield[0] !== undefined && valuesfield[0] !== null) {
              apiList(
                'PropostaEndereco',
                'TB02263_CODIGO,TB02263_NOME,TB02263_END,TB02263_CEP,TB02263_END,TB02263_NUM,TB02263_COMP,TB02263_BAIRRO,' +
                  'TB02263_CIDADE,TB02263_ESTADO,TB02263_CONTATO,TB02263_FONE,TB02263_EMAIL,TB02263_OPORTUNIDADE',
                '',
                " TB02263_OPORTUNIDADE = '" + cabecalho[valuesname.indexOf('codigo')] + "' "
              ).then((response) => {
                if (response.status === 200) {
                  const enderecos = response.data;
                  if (enderecos.length <= 0) {
                    apiList(
                      'Site',
                      'TB02176_NOME,TB02176_END,TB02176_CEP,TB02176_END,TB02176_NUM,TB02176_COMP,TB02176_BAIRRO,' +
                        'TB02176_CIDADE,TB02176_ESTADO,TB02176_CONTATO,TB02176_FONE,TB02176_EMAIL',
                      '',
                      "TB02176_CONTRATO = '" + valuesfield[0] + "' "
                    ).then((response) => {
                      if (response.status === 200) {
                        const sites = response.data;
                        if (sites !== undefined) {
                          let item = {};
                          sites.forEach((site) => {
                            item = {};
                            item['nome'] = site.nome;
                            item['cep'] = site.cep;
                            item['end'] = site.end;
                            item['num'] = site.num;
                            item['comp'] = site.comp;
                            item['bairro'] = site.bairro;
                            item['cidade'] = site.cidade;
                            item['estado'] = site.estado;
                            item['fone'] = site.fone;
                            item['contato'] = site.contato;
                            item['email'] = site.email;
                            item['oportunidade'] = cabecalho[valuesname.indexOf('codigo')];
                            setCarregando(true);
                            apiInsert('PropostaEndereco', item).then((response) => {
                              if (response.status === 200) {
                                console.log('Site : ' + site.nome);
                                setCarregando(false);
                              }
                            });
                          });
                        }
                      }
                    });
                  } else {
                    setCarregando(false);
                  }
                }
              });
            }
            setItemvariant(response.data.status + 1);
            setMensagem(response.data.mensagem);
            setDisabled(response.data.status === 1);
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
    if (rows['contrato'] !== null && rows['contrato'] !== undefined) {
      valuesfield[0] = rows['contrato'];
    } else {
      valuesfield[0] = '';
    }
    if (rows['nome'] !== null && rows['nome'] !== undefined) {
      valuesfield[1] = rows['nome'];
    } else {
      valuesfield[1] = '';
    }
    valuesfield[2] = rows['qtdecontrata'];
    valuesfield[3] = rows['vlrcontrata'];
    valuesfield[4] = rows['tipocontr'];
    valuesfield[5] = rows['tipofranquia'];
    valuesfield[6] = rows['analfranquia'];
    valuesfield[7] = rows['franqtotal'];
    valuesfield[8] = rows['vlrfranqtotal'];
    valuesfield[9] = rows['franqpb'];
    valuesfield[10] = rows['vlrfranqpb'];
    valuesfield[11] = rows['franqcolor'];
    valuesfield[12] = rows['vlrfranqcolor'];
    valuesfield[13] = rows['franqdg'];
    valuesfield[14] = rows['vlrfranqdg'];
    valuesfield[15] = rows['franqgf'];
    valuesfield[16] = rows['vlrfranqgf'];
    valuesfield[17] = rows['franqgfc'];
    valuesfield[18] = rows['vlrfranqgfc'];
    if (rows['obs'] !== null && rows['obs'] !== undefined) {
      valuesfield[19] = rows['obs'];
    } else {
      valuesfield[19] = '';
    }
    valuesfield[20] = cabecalho[valuesname.indexOf('codigo')];
    setValuesfield([...valuesfield]);
    setDisabled(true);
  };

  return (
    <React.Fragment>
      <div id="frmcontrato" name="frmcontrato">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col style={{ marginLeft: '10px' }}>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Informações Cadastrais</Card.Title>
              </Card.Header>

              <div>
                <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
                  {fieldscontrato.map((field, index) => (
                    <CreateObject
                      key={index}
                      field={field}
                      index={field.id}
                      fields={fieldscontrato}
                      valuesfield={valuesfield}
                      setValuesfield={(data) => setValuesfield(data)}
                      valuesfield2={valuesfield2}
                      setValuesfield2={(data) => setValuesfield2(data)}
                      invisible={valuesinvisible[field.id]}
                      disabled={disabled}
                    ></CreateObject>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: '5px' }}>
          <Col style={{ marginLeft: '10px' }}>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Informações de Franquia</Card.Title>
              </Card.Header>

              <div>
                <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
                  {fieldsfranquia.map((field, index) => (
                    <CreateObject
                      key={index}
                      field={field}
                      index={field.id}
                      fields={fieldsfranquia}
                      valuesfield={valuesfield}
                      setValuesfield={(data) => setValuesfield(data)}
                      valuesfield2={valuesfield2}
                      setValuesfield2={(data) => setValuesfield2(data)}
                      invisible={valuesinvisible[field.id]}
                      disabled={disabled}
                    ></CreateObject>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: '5px' }}>
          <Col style={{ marginLeft: '10px' }}>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Observações</Card.Title>
              </Card.Header>

              <div>
                <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
                  {fieldsobs.map((field, index) => (
                    <CreateObject
                      key={index}
                      field={field}
                      index={field.id}
                      fields={fieldsobs}
                      valuesfield={valuesfield}
                      setValuesfield={(data) => setValuesfield(data)}
                      valuesfield2={valuesfield2}
                      setValuesfield2={(data) => setValuesfield2(data)}
                      invisible={valuesinvisible[field.id]}
                      disabled={disabled}
                    ></CreateObject>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
        <hr></hr>
        {altproposta && (precontrato === '' || precontrato === undefined || precontrato === null) ? (
          <Row style={{ textAlign: 'right' }}>
            <Col>
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
      </div>
    </React.Fragment>
  );
};

export default PropostaContrato;
