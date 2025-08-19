import React, { useEffect } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiList, apiInsert, apiUpdate, apiDelete, apiID } from '../../../../api/crudapi';
import { Confirmation } from '../../../../components/Confirmation';
import { Decode64 } from '../../../../utils/crypto';
import AGGrid from '../../../../components/AGGrid';

const Contato = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [inclusao, setInclusao] = React.useState(false);
  const [itemselec, setItemselec] = React.useState();

  useEffect(() => {
    setCarregando(true);
    for (var i = 0; i < 12; i++) {
      valuesdisable[i] = true;
    }
    setValuesdisable([...valuesdisable]);
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 100 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição Grupo', width: 250 },
      { headerClassName: 'header-list', field: 'cargo', headerName: 'Cargo', width: 120 },
      { headerClassName: 'header-list', field: 'email', headerName: 'E-Mail', width: 180 },
      { headerClassName: 'header-list', field: 'fone', headerName: 'Fone', width: 130 },
      { headerClassName: 'header-list', field: 'celular', headerName: 'Celular', width: 130 },
      { headerClassName: 'header-list', field: 'whatsapp', headerName: 'WhatsAPP', width: 130 }
    ]);
    setFields([
      {
        id: 0,
        campo: 'TB01128_CODIGO',
        funcao: 'Código',
        tipo: 'varchar',
        nome: 'codigo',
        tamanho: 5,
        tipoobject: 1,
        disabled: true,
        widthfield: 6,
        measure: '6rem',
        readonly: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'TB01128_NOME',
        funcao: 'Nome',
        tipo: 'varchar',
        nome: 'nome',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 41,
        measure: '41rem',
        disabled: valuesdisable[1]
      },
      {
        id: 2,
        campo: 'TB01128_CARGO',
        funcao: 'Cargo',
        tipo: 'varchar',
        nome: 'cargo',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 20,
        measure: '20rem',
        disabled: valuesdisable[2]
      },
      {
        id: 3,
        campo: 'TB01128_EMAIL',
        funcao: 'Email',
        tipo: 'varchar',
        nome: 'email',
        tamanho: 200,
        tipoobject: 1,
        widthfield: 41,
        measure: '41rem',
        disabled: valuesdisable[3]
      },
      {
        id: 4,
        campo: 'TB01128_FONE',
        funcao: 'Telefone',
        tipo: 'varchar',
        nome: 'fone',
        tamanho: 10,
        tipoobject: 8,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[4],
        tipomascara: 4
      },
      {
        id: 5,
        campo: 'TB01128_CELULAR',
        funcao: 'Celular',
        tipo: 'varchar',
        nome: 'celular',
        tamanho: 11,
        tipoobject: 8,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[5],
        tipomascara: 5
      },
      {
        id: 6,
        campo: 'TB01128_WHATSAPP',
        funcao: 'WhatsAPP',
        tipo: 'varchar',
        nome: 'whatsapp',
        tamanho: 11,
        tipoobject: 8,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[6],
        tipomascara: 5
      },
      {
        id: 7,
        campo: 'TB01128_PRINCIPAL',
        funcao: 'Contato Principal',
        tipo: 'int',
        nome: 'principal',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 12,
        measure: '12rem',
        itens: 'Não,Sim',
        values: '0,1',
        disabled: valuesdisable[7]
      },
      {
        id: 8,
        campo: 'TB01128_DTNASC',
        funcao: 'Nascimento',
        tipo: 'datetime',
        nome: 'dtnasc',
        tamanho: 11,
        tipoobject: 5,
        widthfield: 11,
        measure: '11rem',
        disabled: valuesdisable[8]
      },
      {
        id: 9,
        campo: 'TB01128_CODVEN',
        funcao: 'Vendedor',
        tipo: 'varchar',
        nome: 'codven',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB01006',
        widthname: 22,
        disabled: valuesdisable[9]
      },
      {
        id: 10,
        campo: 'TB01128_SITUACAO',
        funcao: 'Situação do Contato',
        tipo: 'int',
        nome: 'situacao',
        tamanho: 1,
        tipoobject: 10,
        widthfield: 25,
        measure: '25rem',
        itens: 'Ativo,Inativo,Suspenso',
        values: 'A,I,S',
        disabled: valuesdisable[10]
      },
      {
        id: 11,
        campo: 'TB01128_OBS',
        funcao: 'Observações',
        tipo: 'text',
        nome: 'obs',
        tamanho: 11,
        tipoobject: 6,
        widthfield: 13,
        measure: '13rem',
        disabled: valuesdisable[11],
        lines: 4
      }
    ]);
    Filtrar();
  }, []);
  const Filtrar = () => {
    let camporef = '';
    if (props.tipo === '0') {
      camporef = 'TB01128_CODCLI';
    } else {
      camporef = 'TB01128_CODPROSPECT';
    }
    apiList(
      'Contato',
      'TB01128_CODIGO,TB01128_NOME,TB01128_CARGO,TB01128_EMAIL,' +
        'TB01128_FONE,TB01128_CELULAR,TB01128_WHATSAPP,TB01128_PRINCIPAL,TB01128_DTNASC,TB01128_SITUACAO,TB01128_OBS,TB01128_CODVEN',
      '',
      camporef + " = '" + props.cliente + "' AND TB01128_TIPO = " + props.tipo
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
              //console.log(error);
            }
          }
        });
      });
    } else {
      valuesfield[0] = '';
      valuesfield[1] = '';
      valuesfield[2] = '';
      valuesfield[3] = '';
      valuesfield[4] = '';
      valuesfield[5] = '';
      valuesfield[6] = '';
      valuesfield[7] = 0;
      valuesfield[8] = null;
      valuesfield[9] = '';
      valuesfield[10] = 'A';
      valuesfield[11] = '';
      setValuesfield([...valuesfield]);
      valuesfield2[9] = '';
      setValuesfield2([...valuesfield2]);
    }
  }, [itemselec]);

  const Incluir = () => {
    setCarregando(true);
    apiID('Contato').then((response) => {
      if (response.status === 200) {
        valuesfield[0] = response.data.mensagem;
        valuesfield[1] = '';
        valuesfield[2] = '';
        valuesfield[3] = '';
        valuesfield[4] = '';
        valuesfield[5] = '';
        valuesfield[6] = '';
        valuesfield[7] = 0;
        valuesfield[8] = null;
        valuesfield[9] = '';
        valuesfield[10] = 'A';
        valuesfield[11] = '';
        setValuesfield([...valuesfield]);
        valuesfield2[9] = '';
        setValuesfield2([...valuesfield2]);
        setDisabled(false);
        for (var i = 0; i < 12; i++) {
          valuesdisable[i] = false;
        }
        setValuesdisable([...valuesdisable]);
        setCarregando(false);
        setInclusao(true);
        if (Decode64(sessionStorage.getItem('manager')) === 'N' && Decode64(sessionStorage.getItem('seller')) !== 'ZZZZ') {
          valuesfield[9] = Decode64(sessionStorage.getItem('seller'));
          setValuesfield([...valuesfield]);
          valuesdisable[9] = true;
          setValuesdisable([...valuesdisable]);
        }
        try {
          document.getElementById('nome').focus();
        } catch (error) {
          //console.log(error);
        }
      }
    });
  };

  const Excluir = () => {
    if (rows.length > 0 && valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      Confirmation('frmcontato', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          apiDelete('Contato', itemselec).then((response) => {
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
                valuesfield[7] = '';
                valuesfield[8] = '';
                valuesfield[9] = '';
                valuesfield[10] = '';
                valuesfield[11] = '';
                setValuesfield([...valuesfield]);
                valuesfield2[9] = '';
                setValuesfield2([...valuesfield2]);
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
      for (var i = 0; i < 12; i++) {
        valuesdisable[i] = false;
      }
      setValuesdisable([...valuesdisable]);
      if (Decode64(sessionStorage.getItem('manager')) === 'N' && Decode64(sessionStorage.getItem('seller')) !== 'ZZZZ') {
        valuesfield[9] = Decode64(sessionStorage.getItem('seller'));
        setValuesfield([...valuesfield]);
        valuesdisable[9] = true;
        setValuesdisable([...valuesdisable]);
      }
      setInclusao(false);
      try {
        document.getElementById('nome').focus();
      } catch (error) {
        //console.log(error);
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
      item['tipo'] = props.tipo;
      if (props.tipo === '0') {
        item['codcli'] = props.cliente;
      } else {
        item['codprospect'] = props.cliente;
      }
      if (inclusao) {
        item['id'] = rows.length + 1;
      } else {
        item['id'] = itemselec.id;
      }
      if (inclusao) {
        apiInsert('Contato', item).then((response) => {
          if (response.status === 200) {
            setItemvariant(response.data.status + 1);
            setMensagem(response.data.mensagem);
            setCarregando(false);
            if (response.data.status === 1) {
              valuesfield[0] = response.data.id;
              setValuesfield([...valuesfield]);
              setDisabled(response.data.status === 1);
              for (var i = 0; i < 12; i++) {
                valuesdisable[i] = response.data.status === 1;
              }
              setValuesdisable([...valuesdisable]);
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
        apiUpdate('Contato', item).then((response) => {
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
              for (var y = 0; y < 12; y++) {
                valuesdisable[y] = response.data.status === 1;
              }
              setValuesdisable([...valuesdisable]);
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
        valuesfield[4] = '';
        valuesfield[5] = '';
        valuesfield[6] = '';
        valuesfield[7] = '';
        valuesfield[8] = '';
        valuesfield[9] = '';
        valuesfield[10] = '';
        valuesfield[11] = '';
      }
    } else {
      const keys = Object.keys(itemselec);
      const values = Object.values(itemselec);
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
              //console.log(error);
            }
          }
        });
      });
    }
    setDisabled(true);
    for (var i = 0; i < 12; i++) {
      valuesdisable[i] = true;
    }
    setValuesdisable([...valuesdisable]);
  };

  return (
    <React.Fragment>
      <div id="frmcontato" name="frmcontato">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px' }}>
          <Row>
            {fields.map((field, index) => {
              return (
                <CreateObject
                  key={index}
                  field={field}
                  index={index}
                  fields={fields}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={valuesdisable[index]}
                  invisible={false}
                ></CreateObject>
              );
            })}
          </Row>
          <Row>
            <AGGrid
              width="100%"
              height="230px"
              rows={rows}
              columns={columns}
              loading={carregando}
              item={itemselec}
              setItem={(data) => setItemselec(data)}
            ></AGGrid>
          </Row>
          <Row style={{ textAlign: 'right', marginTop: '10px' }}>
            <Col>
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
      </div>
    </React.Fragment>
  );
};

export default Contato;
