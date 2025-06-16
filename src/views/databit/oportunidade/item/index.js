import React, { useEffect } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiList, apiInsert, apiUpdate, apiDelete, apiFind } from '../../../../api/crudapi';
import { Confirmation } from '../../../../components/Confirmation';
import AGGrid from '../../../../components/AGGrid';

const OportunidadeItem = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const { disabled, setDisabled } = props;
  const [disableditem, setDisableditem] = React.useState(true);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [inclusao, setInclusao] = React.useState(false);
  const [itemselec, setItemselec] = React.useState();
  const [ultid, setUltid] = React.useState(0);
  const { cabecalho, setCabecalho } = props;
  const { valuesname, setValuesname } = props;
  const [filtrar, setFiltrar] = React.useState(false);
  const [oportunidade, setOportunidade] = React.useState('');

  useEffect(() => {
    setCarregando(true);

    setValuesdisable([true, true, true, true, true, true, true]);

    setColumns([
      { headerClassName: 'header-list', field: 'nometipo', headerName: 'Tipo', width: 120 },
      { headerClassName: 'header-list', field: 'coditem', headerName: 'Código', width: 120 },
      { headerClassName: 'header-list', field: 'nomeitem', headerName: 'Descrição Produto / Serviço', width: 348 },
      {
        headerClassName: 'header-list',
        field: 'qtprod',
        headerName: 'Qtde.',
        width: 110,
        type: 'number',
        decimal: 3
      },
      {
        headerClassName: 'header-list',
        field: 'prunit',
        headerName: 'Preço Unitário',
        width: 170,
        type: 'number',
        decimal: 5
      },
      {
        headerClassName: 'header-list',
        field: 'totvalor',
        headerName: 'Valor Total',
        width: 170,
        type: 'number',
        decimal: 2
      }
    ]);

    setFields([
      {
        id: 0,
        campo: 'TB02256_TIPO',
        funcao: 'Tipo',
        tipo: 'varchar',
        nome: 'tipo',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 9,
        measure: '9rem',
        itens: 'Produto,Serviço',
        values: '0,1',
        disabled: valuesdisable[0],
        invisible: false
      },
      {
        id: 1,
        campo: 'TB02256_PRODUTO',
        funcao: 'Produto',
        tipo: 'varchar',
        nome: 'produto',
        tipoobject: 2,
        tamanho: 5,
        widthfield: 30,
        measure: '30rem',
        tabelaref: 'TB01134',
        widthname: 21,
        disabled: valuesdisable[1],
        invisible: parseInt(valuesfield[0]) === 1
      },
      {
        id: 2,
        campo: 'TB02256_CODSERV',
        funcao: 'Serviço',
        tipo: 'varchar',
        nome: 'codserv',
        tipoobject: 2,
        tamanho: 5,
        widthfield: 30,
        measure: '30rem',
        tabelaref: 'TB01135',
        widthname: 21,
        disabled: valuesdisable[2],
        invisible: parseInt(valuesfield[0]) === 0 || valuesfield[0] === undefined
      },
      {
        id: 3,
        campo: 'TB02256_QTPROD',
        funcao: 'Quantidade',
        tipo: 'numeric',
        nome: 'qtprod',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[3],
        decimal: 3,
        invisible: false
      },
      {
        id: 4,
        campo: 'TB02256_PRUNIT',
        funcao: 'Preço Unitário',
        tipo: 'numeric',
        nome: 'prunit',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[4],
        decimal: 5,
        invisible: false
      },
      {
        id: 5,
        campo: 'TB02256_TOTVALOR',
        funcao: 'Valor Total',
        tipo: 'numeric',
        nome: 'totvalor',
        tamanho: 10,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        disabled: valuesdisable[5],
        decimal: 2,
        invisible: false,
        readonly: true
      },
      {
        id: 6,
        campo: 'TB02256_OBS',
        funcao: 'Observações do item selecionado',
        tipo: 'text',
        nome: 'obs',
        tipoobject: 6,
        widthfield: 12,
        measure: '11rem',
        disabled: valuesdisable[6],
        invisible: false
      }
    ]);
  }, []);

  useEffect(() => {
    if (!filtrar || oportunidade !== props.cabecalho[props.valuesname.indexOf('codigo')]) {
      //console.log(props.cabecalho[props.valuesname.indexOf('codigo')]);
      apiList(
        'OportunidadeItemVW',
        'TB02256_TIPO, TB02256_PRODUTO, TB02256_CODSERV, TB02256_QTPROD, TB02256_PRUNIT, TB02256_TOTVALOR, TB02256_OBS' +
          'TB02256_CODITEM, TB02256_NOMEITEM, TB02256_NOMETIPO, TB02256_QTPRODB, TB02256_TOTVALORB, TB02256_CODIGO, TB02256_IDITEM',
        'TB02256_QTPROD as qtprodant, TB02256_TOTVALOR as totvalorant',
        "TB02256_CODIGO = '" + props.cabecalho[props.valuesname.indexOf('codigo')] + "' order by TB02256_IDITEM"
      ).then((response) => {
        if (response.status === 200) {
          setRows(response.data);
          setCarregando(false);
          if (props.cabecalho[props.valuesname.indexOf('codigo')] !== undefined) {
            setFiltrar(true);
            setOportunidade(props.cabecalho[props.valuesname.indexOf('codigo')]);
          }
        }
      });
    }
  }, [cabecalho]);

  useEffect(() => {
    if (rows.length > 0 && itemselec === undefined) {
      setItemselec(rows[0]);
    } else {
      if (fields.length > 0 && fields !== undefined) {
        fields[2].invisible = true;
        setFields([...fields]);
      }
    }
    if (ultid === 0) {
      let item = 0;
      rows.forEach((element) => {
        if (parseInt(element.iditem) > item) {
          item = parseInt(element.iditem);
        }
      });
      setUltid(item);
    }
  }, [rows]);

  useEffect(() => {
    if (fields.length > 0 && fields !== undefined) {
      fields[1].invisible = parseInt(valuesfield[0]) === 1;
      fields[2].invisible = parseInt(valuesfield[0]) === 0;
      setFields([...fields]);
    }
  }, [valuesfield[0]]);

  useEffect(() => {
    if (fields.length > 0 && fields !== undefined) {
      valuesfield[5] = valuesfield[3] * valuesfield[4];
      setValuesfield([...valuesfield]);
    }
  }, [valuesfield[3], valuesfield[4]]);

  useEffect(() => {
    valuesfield2[1] = '';
    valuesfield2[2] = '';
    setValuesfield2([...valuesfield2]);
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
    valuesfield[0] = 0;
    valuesfield[1] = '';
    valuesfield[2] = '';
    valuesfield[3] = 1;
    valuesfield[4] = 0;
    valuesfield[5] = 0;
    valuesfield[6] = '';
    valuesfield[7] = '';
    valuesfield[8] = '';
    valuesfield[9] = '';
    valuesfield[10] = 0;
    valuesfield[11] = 0;
    valuesfield[12] = props.cabecalho[props.valuesname.indexOf('codigo')];
    valuesfield[13] = 0;
    valuesfield[14] = 0;
    valuesfield[15] = 0;
    setValuesfield([...valuesfield]);
    valuesfield2[1] = '';
    valuesfield2[2] = '';
    setValuesfield2([...valuesfield2]);
    valuesdisable[0] = false;
    valuesdisable[1] = false;
    valuesdisable[2] = false;
    valuesdisable[3] = false;
    valuesdisable[4] = false;
    valuesdisable[5] = false;
    valuesdisable[6] = false;
    setValuesdisable([...valuesdisable]);
    setDisableditem(false);
    setCarregando(false);
    setInclusao(true);
    try {
      document.getElementById('TB02256_TIPO').focus();
    } catch (error) {
      //console.log(error);
    }
  };

  const Excluir = () => {
    if (rows.length > 0 && valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      Confirmation('frmform', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          itemselec.id = itemselec.iditem;
          apiDelete('OportunidadeItem', itemselec).then((response) => {
            if (response.status === 200) {
              setItemvariant(response.data.status + 1);
              setMensagem(response.data.mensagem);
              if (response.data.status === 1) {
                const rowsbkp1 = rows.slice(0, rows.length);
                const i = rowsbkp1.findIndex((x) => x === itemselec);
                rowsbkp1.splice(i, 1);
                setRows(rowsbkp1);
                valuesfield[0] = 0;
                valuesfield[1] = '';
                valuesfield[2] = '';
                valuesfield[3] = 1;
                valuesfield[4] = 0;
                valuesfield[5] = 0;
                valuesfield[6] = '';
                valuesfield[7] = '';
                valuesfield[8] = '';
                valuesfield[9] = '';
                valuesfield[10] = 0;
                valuesfield[11] = 0;
                valuesfield[12] = props.cabecalho[props.valuesname.indexOf('codigo')];
                valuesfield[13] = 0;
                valuesfield[14] = 0;
                valuesfield[15] = 0;
                setValuesfield([...valuesfield]);
                valuesfield2[1] = '';
                valuesfield2[2] = '';
                setValuesfield2([...valuesfield2]);
                apiFind(
                  'Oportunidade',
                  'TB02255_QTDE, TB02255_VLRNOTA',
                  '',
                  "TB02255_CODIGO = '" + props.cabecalho[props.valuesname.indexOf('codigo')] + "' "
                ).then((response) => {
                  if (response.status === 200) {
                    setCarregando(false);
                    Totais(response.data);
                  }
                });
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
      setDisableditem(false);
      setInclusao(false);
      valuesdisable[0] = true;
      valuesdisable[1] = true;
      valuesdisable[2] = false;
      valuesdisable[3] = false;
      valuesdisable[4] = false;
      valuesdisable[5] = false;
      valuesdisable[6] = false;
      setValuesdisable([...valuesdisable]);
      try {
        document.getElementById('TB02256_QTPROD').focus();
      } catch (error) {
        //console.log(error);
      }
      valuesfield[9] = valuesfield[3];
      valuesfield[10] = valuesfield[4];
      setValuesfield([...valuesfield]);
    } else {
      setItemvariant(1);
      setMensagem('Não possui nenhum registro para ser alterado !');
    }
  };

  const Salvar = () => {
    setCarregando(true);
    if (
      document.getElementById('TB02256_TIPO').value === 0 &&
      (document.getElementById('TB02256_PRODUTO').value === undefined || document.getElementById('TB02256_PRODUTO').value === '')
    ) {
      setItemvariant(1);
      setMensagem('Campo PRODUTO é preenchimento obrigatório !');
      document.getElementById('TB02256_PRODUTO').focus();
    } else if (
      document.getElementById('TB02256_TIPO').value === 1 &&
      (document.getElementById('TB02256_CODSERV').value === undefined || document.getElementById('TB02256_CODSERV').value === '')
    ) {
      setItemvariant(1);
      setMensagem('Campo SERVIÇO é preenchimento obrigatório !');
      document.getElementById('TB02256_CODSERV').focus();
    } else {
      try {
        let item = {};
        fields.forEach((field, index) => {
          item[field.nome] = valuesfield[index];
        });
        item['codigo'] = props.cabecalho[props.valuesname.indexOf('codigo')];
        if (inclusao) {
          item['id'] = rows.length + 1;
          item['iditem'] = ultid + 1;
          setUltid(ultid + 1);
        } else {
          item['id'] = itemselec.id;
          item['iditem'] = itemselec.iditem;
          item['qtprodb'] = itemselec.qtprodant;
          item['totvalorb'] = itemselec.totvalorant;
        }
        if (valuesfield[0] === 0) {
          item['coditem'] = valuesfield[1];
          item['nomeitem'] = valuesfield2[1];
          item['nometipo'] = 'Produto';
        } else {
          item['coditem'] = valuesfield[2];
          item['nomeitem'] = valuesfield2[2];
          item['nometipo'] = 'Serviço';
        }
        if (inclusao) {
          apiInsert('OportunidadeItem', item).then((response) => {
            if (response.status === 200) {
              setItemvariant(response.data.status + 1);
              setMensagem(response.data.mensagem);
              if (response.data.status === 1) {
                valuesfield[0] = response.data.id;
                setValuesfield([...valuesfield]);
                setDisableditem(response.data.status === 1);
                const rowsbkp1 = rows.slice(0, rows.length);
                const rowsbkp2 = rowsbkp1.concat(item);
                setRows(rowsbkp2);
                apiFind(
                  'Oportunidade',
                  'TB02255_QTDE, TB02255_VLRNOTA',
                  '',
                  "TB02255_CODIGO = '" + props.cabecalho[props.valuesname.indexOf('codigo')] + "' "
                ).then((response) => {
                  if (response.status === 200) {
                    setCarregando(false);
                    if (parseInt(valuesfield[0]) === 0 || valuesfield[0] === undefined) {
                      fields[1].invisible = false;
                      fields[2].invisible = true;
                    } else {
                      fields[1].invisible = true;
                      fields[2].invisible = false;
                    }
                    setFields([...fields]);
                    setItemselec(item);
                    valuesdisable[0] = true;
                    valuesdisable[1] = true;
                    valuesdisable[2] = true;
                    valuesdisable[3] = true;
                    valuesdisable[4] = true;
                    valuesdisable[5] = true;
                    valuesdisable[6] = true;
                    setValuesdisable([...valuesdisable]);
                  }
                  Totais(response.data);
                });
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          });
        } else {
          apiUpdate('OportunidadeItem', item).then((response) => {
            if (response.status === 200) {
              setItemvariant(response.data.status + 1);
              setMensagem(response.data.mensagem);
              if (response.data.status === 1) {
                setDisableditem(response.data.status === 1);
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
                if (fields.length > 0 && fields !== undefined) {
                  fields[1].invisible = parseInt(valuesfield[0]) === 1;
                  fields[2].invisible = parseInt(valuesfield[0]) === 0;
                  setFields([...fields]);
                }
                apiFind(
                  'Oportunidade',
                  'TB02255_QTDE, TB02255_VLRNOTA',
                  '',
                  "TB02255_CODIGO = '" + props.cabecalho[props.valuesname.indexOf('codigo')] + "' "
                ).then((response) => {
                  if (response.status === 200) {
                    setCarregando(false);
                    if (parseInt(valuesfield[0]) === 0 || valuesfield[0] === undefined) {
                      fields[1].invisible = false;
                      fields[2].invisible = true;
                    } else {
                      fields[1].invisible = true;
                      fields[2].invisible = false;
                    }
                    setFields([...fields]);
                    valuesdisable[0] = true;
                    valuesdisable[1] = true;
                    valuesdisable[2] = true;
                    valuesdisable[3] = true;
                    valuesdisable[4] = true;
                    valuesdisable[5] = true;
                    valuesdisable[6] = true;
                    setValuesdisable([...valuesdisable]);
                  }
                  Totais(response.data);
                });
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

  const Cancelar = () => {
    if (inclusao) {
      if (rows.length > 0) {
        setItemselec(rows[0]);
      } else {
        valuesfield[0] = 0;
        valuesfield[1] = '';
        valuesfield[2] = '';
        valuesfield[3] = 1;
        valuesfield[4] = 0;
        valuesfield[5] = 0;
        valuesfield[6] = '';
        valuesfield[7] = '';
        valuesfield[8] = '';
        valuesfield[9] = '';
        valuesfield[10] = 0;
        valuesfield[11] = 0;
        valuesfield[12] = props.cabecalho[props.valuesname.indexOf('codigo')];
        valuesfield[13] = 0;
        setValuesfield([...valuesfield]);
        valuesfield2[1] = '';
        valuesfield2[2] = '';
        setValuesfield2([...valuesfield2]);
        valuesdisable[0] = true;
        valuesdisable[1] = true;
        valuesdisable[2] = true;
        valuesdisable[3] = true;
        valuesdisable[4] = true;
        valuesdisable[5] = true;
        valuesdisable[6] = true;
        setValuesdisable([...valuesdisable]);
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
    setDisableditem(true);
  };

  const Totais = (data) => {
    let posqtde = valuesname.indexOf('qtde');
    let postvalor = valuesname.indexOf('vlrnota');
    cabecalho[posqtde] = data.qtde;
    cabecalho[postvalor] = data.vlrnota;
    setCabecalho([...cabecalho]);
  };

  const SetItem = (newSelection) => {
    setItemselec(newSelection);
  };

  return (
    <React.Fragment>
      <div id="frmform" name="frmform">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '10px' }}>
          <Row>
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
                disabled={valuesdisable[field.id]}
                invisible={field.invisible}
                readonly={field.readonly}
              ></CreateObject>
            ))}
          </Row>
          <Row>
            <AGGrid
              width="100%"
              height="350px"
              rows={rows}
              columns={columns}
              loading={carregando}
              onKeyDown={SetItem}
              onCelClick={SetItem}
            ></AGGrid>
          </Row>
          {props.disabled === true ? (
            <Row style={{ textAlign: 'right', marginTop: '10px' }}>
              <Col>
                <Button id="btnIncluir" className="btn btn-primary shadow-2 mb-3" disabled={!disableditem} onClick={Incluir}>
                  <i className={'feather icon-star'} /> Novo
                </Button>
                <Button id="btnExcluir" className="btn btn-primary shadow-2 mb-3" disabled={!disableditem} onClick={Excluir}>
                  <i className={'feather icon-trash'} /> Excluir
                </Button>
                <Button id="btnEditar" className="btn btn-primary shadow-2 mb-3" disabled={!disableditem} onClick={Editar}>
                  <i className={'feather icon-edit'} /> Editar
                </Button>
                <Button id="btnSalvar" className="btn btn-success shadow-2 mb-3" disabled={disableditem} onClick={Salvar}>
                  <i className={'feather icon-save'} /> Salvar
                </Button>
                <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-3" disabled={disableditem} onClick={Cancelar}>
                  <i className={'feather icon-x'} /> Cancelar
                </Button>
              </Col>
            </Row>
          ) : (
            <></>
          )}
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

export default OportunidadeItem;
