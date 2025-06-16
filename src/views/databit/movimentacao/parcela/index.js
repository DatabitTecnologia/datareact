import React, { useEffect } from 'react';
import { Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiExec, apiInsert, apiUpdate, apiDelete } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';
import AGGrid from '../../../../components/AGGrid';
import { Confirmation } from '../../../../components/Confirmation';
import { Message } from '../../../../components/Message';

const Parcela = (props) => {
  const { cabecalho, tablepar, recalcpar, classpar, columnspar, fieldspar, eventspar } = props;
  const { showparcela, setShowparcela } = props;
  const { rows, setRows } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [itemselec, setItemselec] = React.useState(undefined);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [inclusao, setInclusao] = React.useState(false);

  useEffect(() => {
    Filtrar();
  }, []);

  useEffect(() => {
    console.log(itemselec);
    if (itemselec !== undefined) {
      try {
        valuesfield[0] = itemselec.posicao;
        valuesfield[1] = itemselec.doc;
        valuesfield[2] = itemselec.tipdoc;
        const dt1 =
          itemselec.dtvencfim.substring(3, 5) + '/' + itemselec.dtvencfim.substring(0, 2) + '/' + itemselec.dtvencfim.substring(6, 10);
        const datafim = new Date(dt1);
        valuesfield[3] = datafim;
        valuesfield[4] = itemselec.vlrdoc;
        setValuesfield([...valuesfield]);
      } catch (error) {
        console.log(error);
      }
    }
  }, [itemselec]);

  useEffect(() => {
    if (rows.length > 0 && itemselec === undefined) {
      setItemselec(rows[0]);
    }
  }, [rows]);

  const Incluir = () => {
    if (getEventspar(1)) {
      valuesfield[0] = rows.length + 1;
      const dataAtual = new Date();
      valuesfield[3] = dataAtual;
      valuesfield[4] = 0;
      setValuesfield([...valuesfield]);
      setInclusao(true);
      setDisabled(false);
      setTimeout(() => {
        const input = document.getElementById('doc');
        if (input) {
          input.focus();
        }
      }, 100);
    }
  };

  const Filtrar = () => {
    setCarregando(true);
    apiExec("EXEC SP02307 '" + tablepar + "', '" + cabecalho.codigo + "' ", 'S').then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setRows(response.data);
      }
    });
  };

  const Excluir = () => {
    if (rows.length > 0 && valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      if (getEventspar(3)) {
        Confirmation('frmparcela', 'Confirma a exclusão deste registro ?').then((result) => {
          if (result.isConfirmed) {
            setCarregando(true);
            apiDelete(classpar, itemselec).then((response) => {
              if (response.status === 200) {
                setItemvariant(response.data.status + 1);
                setMensagem(response.data.mensagem);
                setCarregando(false);
                Filtrar();
              }
            });
          }
        });
      }
    } else {
      setItemvariant(1);
      setMensagem('Não possui nenhum registro para ser excluído !');
    }
  };

  const Editar = () => {
    if (getEventspar(5)) {
      if (rows.length > 0) {
        setDisabled(false);
        setInclusao(false);
      } else {
        setItemvariant(1);
        setMensagem('Não possui nenhum registro para ser alterado !');
      }
    }
  };

  const Salvar = () => {
    try {
      let item = {};
      item['codigo'] = cabecalho.codigo;
      item['posicao'] = valuesfield[0];
      item['doc'] = valuesfield[1];
      item['tipdoc'] = valuesfield[2];
      const tmdata1 = Date.parse(valuesfield[3]);
      const dt1 = new Date(tmdata1);
      const data1 = dt1.toLocaleDateString('en-US');
      item['dtvenc'] = data1 + ' 00:00:00';
      item['vlrdoc'] = valuesfield[4];
      setCarregando(true);
      if (inclusao) {
        apiInsert(classpar, item).then((response) => {
          if (response.status === 200) {
            setItemvariant(response.data.status + 1);
            setMensagem(response.data.mensagem);
            setDisabled(true);
            Filtrar();
          } else {
            setItemvariant(-1);
            setMensagem(response.data);
          }
        });
      } else {
        apiUpdate(classpar, item).then((response) => {
          if (response.status === 200) {
            setItemvariant(response.data.status + 1);
            setMensagem(response.data.mensagem);
            setDisabled(true);
            Filtrar();
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
    setDisabled(true);
  };

  const Recalcular = () => {
    if (getEventspar(5)) {
      setCarregando(true);
      apiExec('EXEC ' + recalcpar + " '" + cabecalho.codigo + "','" + Decode64(sessionStorage.getItem('user')) + "','S'", 'N').then(
        (response) => {
          Filtrar();
        }
      );
    }
  };

  const Fechar = async () => {
    const total = rows.reduce((soma, item) => soma + item.vlrdoc, 0);
    if (total.toFixed(2) !== cabecalho.vlrnota.toFixed(2) && rows.length > 0) {
      await Message('frmparcela', '', 'warning', 'O total das parcelas não bate com o valor da Nota !');
    } else {
      setShowparcela(false);
    }
  };

  const getEventspar = (type) => {
    let retorno = true;
    if (eventspar !== undefined && eventspar.length > 0) {
      setCarregando(true);
      let tmpevent = eventspar.filter((element) => element.type === parseInt(type));
      tmpevent.forEach((element) => {
        if (retorno) {
          retorno = element.method();
          if (retorno === undefined) {
            retorno = true;
          }
        }
      });
      setCarregando(false);
    }
    return retorno;
  };

  return (
    <React.Fragment>
      <div id="frmparcela" name="frmparcela">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">Informação da Parcela selecionada</Card.Title>
          </Card.Header>
        </Card>
        <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
          {fieldspar ? (
            <Row style={{ marginLeft: '1px' }}>
              {fieldspar.map((field, index) => {
                return (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fieldspar}
                    valuesfield={valuesfield}
                    setValuesfield={setValuesfield}
                    valuesfield2={valuesfield2}
                    setValuesfield2={setValuesfield2}
                    disabled={disabled}
                  ></CreateObject>
                );
              })}
            </Row>
          ) : (
            <></>
          )}
        </Row>
        <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
          <AGGrid
            width="100%"
            height="390px"
            rows={rows}
            columns={columnspar}
            loading={carregando}
            item={itemselec}
            setItem={(data) => setItemselec(data)}
            disabled={!disabled}
            focus={true}
            forcefocus={true}
          ></AGGrid>
        </Row>
        <Row style={{ textAlign: 'center', marginTop: '20px' }}>
          <Col>
            <Button id="btnNovo" className="btn-primary shadow-2 mb-3" disabled={!disabled} onClick={(e) => Incluir()}>
              <i className={'feather icon-star'} />
              Incluir
            </Button>
            <Button id="btnEditar" className="btn-primary shadow-2 mb-3" disabled={!disabled} onClick={(e) => Excluir()}>
              <i className={'feather icon-trash'} />
              Excluir
            </Button>
            <Button id="btnEditar" className="btn-primary shadow-2 mb-3" disabled={!disabled} onClick={(e) => Editar()}>
              <i className={'feather icon-edit'} />
              Editar
            </Button>
            <Button id="btnSalvprod" className="btn shadow-2 mb-3 btn-success" disabled={disabled} onClick={(e) => Salvar()}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Button id="btnCancprod" className="btn shadow-2 mb-3 btn-warning" disabled={disabled} onClick={(e) => Cancelar()}>
              <i className={'feather icon-x'} /> Cancelar
            </Button>
            <Button id="btnRecalc" className="btn shadow-2 mb-3 btn-primary" disabled={!disabled} onClick={(e) => Recalcular()}>
              <i className={'feather icon-refresh-ccw'} /> Recalcular
            </Button>
            <Button id="btnFechar" className="btn-primary shadow-2 mb-3" onClick={(e) => Fechar()}>
              <i className={'feather icon-x'} />
              Fechar
            </Button>
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

export default Parcela;
