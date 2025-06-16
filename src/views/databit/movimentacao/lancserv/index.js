import React, { useEffect } from 'react';
import { Row, Col, Button, Alert, Card, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiInsert, apiUpdate, apiFind } from '../../../../api/crudapi';

const LancServ = (props) => {
  const { cabecalho, tableserv, classserv, servselec } = props;
  const { tablemov, fieldsimpserv, inclusao } = props;
  const { showselec, setShowselec } = props;
  const { eventsserv, setEventsserv } = props;

  const [itemselec, setItemselec] = React.useState(undefined);
  const [carregando, setCarregando] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];

  const [itembkp, setItembkp] = React.useState(undefined);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);

  useEffect(() => {
    if (inclusao) {
      setDisabled(false);
      setItemselec({
        aliqcofins: 0,
        aliqcofinsret: 0,
        aliqiss: 0,
        aliqissret: 0,
        aliqpis: 0,
        aliqpisret: 0,
        codcli: '00000000',
        codigo: cabecalho.codigo,
        codserv: '',
        cofins: 0,
        csll: 0,
        csllret: 0,
        cst: '',
        cstcofins: '',
        cstpis: '',
        grupo: '000000',
        icms: 0,
        inss: 0,
        inssret: 0,
        ir: 0,
        irret: 0,
        manual: 'N',
        percdesccon: 0,
        percdescinc: 0,
        pis: 0,
        prunit: 0,
        qtserv: 1,
        qtservb: 0,
        retcofins: 'N',
        retcsll: 'N',
        retinss: 'N',
        retir: 'N',
        retiss: 'N',
        retpis: 'N',
        totvalor: 0,
        totvalorb: 0,
        vlrcofins: 0,
        vlrcofinsb: 0,
        vlrcofinsret: 0,
        vlrcofinsretb: 0,
        vlrcsll: 0,
        vlrcsllb: 0,
        vlrcsllret: 0,
        vlrcsllretb: 0,
        vlrdesccon: 0,
        vlrdescinc: 0,
        vlrinss: 0,
        vlrinssb: 0,
        vlrinssret: 0,
        vlrinssretb: 0,
        vlrir: 0,
        vlrirb: 0,
        vlrirret: 0,
        vlrirretb: 0,
        vlriss: 0,
        vlrissb: 0,
        vlrissret: 0,
        vlrissretb: 0,
        vlrpis: 0,
        vlrpisb: 0,
        vlrpisret: 0,
        vlrpisretb: 0,
        nomeserv: '',
        codtributacao: '',
        subitem: ''
      });
      setTimeout(() => {
        const input = document.getElementById('codserv');
        if (input) {
          input.focus();
        }
      }, 100);
    } else {
      setDisabled(true);
      setItemselec(servselec);
    }
  }, []);

  useEffect(() => {
    console.log(itemselec);
    if (itemselec !== undefined) {
      const keys = Object.keys(itemselec);
      const values = Object.values(itemselec);
      keys.forEach((item, index) => {
        fieldsimpserv.forEach((item2, index2) => {
          if (item === item2.campo) {
            valuesfield[index2] = values[index];
          }
        });
      });
      setValuesfield([...valuesfield]);
      if (!inclusao) {
        setItembkp(itemselec);
        fieldsimpserv.forEach((item, index) => {
          valuesdisable[index] = true;
        });
        setValuesdisable([...valuesdisable]);
      }
    }
  }, [itemselec]);

  useEffect(() => {
    const codserv = valuesfield[0];
    if (codserv !== undefined && codserv !== '' && codserv !== null && inclusao) {
      apiFind('Servico', '*', '', "TB01005_CODIGO = '" + codserv + "' ").then((response) => {
        if (response.status === 200) {
          const serv = response.data;
          setItemselec({
            aliqcofins: serv.aliqcofins,
            aliqcofinsret: serv.aliqcofinsret,
            aliqiss: serv.aliqiss,
            aliqissret: serv.aliqissret,
            aliqpis: serv.aliqpis,
            aliqpisret: serv.aliqpisret,
            csll: serv.aliqcsll,
            csllret: serv.aliqcsllret,
            cstcofins: serv.cstcofins,
            cstpis: serv.cstpis,
            inssret: serv.aliqinssret,
            ir: serv.aliqir,
            irret: serv.aliqirret,
            prunit: serv.valor,
            retcofins: serv.retcofins,
            retcsll: serv.retcsll,
            retinss: serv.retinss,
            retir: serv.retir,
            retiss: serv.retiss,
            retpis: serv.retpis,
            codserv: serv.codigo,
            inss: 0,
            qtserv: 1,
            codcli: '00000000',
            codigo: cabecalho.codigo,
            grupo: '000000',
            manual: 'N',
            percdesccon: 0,
            percdescinc: 0,
            pis: 0,
            totvalor: 0,
            totvalorb: 0,
            vlrcofins: 0,
            vlrcofinsb: 0,
            vlrcofinsret: 0,
            vlrcofinsretb: 0,
            vlrcsll: 0,
            vlrcsllb: 0,
            vlrcsllret: 0,
            vlrcsllretb: 0,
            vlrdesccon: 0,
            vlrdescinc: 0,
            vlrinss: 0,
            vlrinssb: 0,
            vlrinssret: 0,
            vlrinssretb: 0,
            vlrir: 0,
            vlrirb: 0,
            vlrirret: 0,
            vlrirretb: 0,
            vlriss: 0,
            vlrissb: 0,
            vlrissret: 0,
            vlrissretb: 0,
            vlrpis: 0,
            vlrpisb: 0,
            vlrpisret: 0,
            vlrpisretb: 0,
            nomeserv: '',
            codtributacao: '',
            subitem: ''
          });
        }
      });
    }
  }, [valuesfield[0]]);

  useEffect(() => {
    if (valuesfield !== undefined && valuesfield.length > 0 && !disabled) {
      const retencoes = ['retcofins', 'retcsll', 'retinss', 'retir', 'retiss', 'retpis'];
      const aliquotas = ['aliqcofinsret', 'csllret', 'inssret', 'irret', 'aliqissret', 'aliqpisret'];
      retencoes.forEach((retencao, index) => {
        const posretencao = fieldsimpserv.findIndex((x) => x.campo === retencao);
        const posaliquota = fieldsimpserv.findIndex((x) => x.campo === aliquotas[index]);
        valuesdisable[posaliquota] = valuesfield[posretencao] === 'N';
      });
      setValuesdisable([...valuesdisable]);
    }
  }, [valuesfield]);

  const Editar = () => {
    if (getEventsserv(5)) {
      setDisabled(false);
      fieldsimpserv.forEach((item, index) => {
        valuesdisable[index] = !item.lancfield;
      });
      setValuesdisable([...valuesdisable]);
      setTimeout(() => {
        const input = document.getElementById('qtserv');
        if (input) {
          input.focus();
        }
      }, 100);
    }
  };

  const Salvar = async () => {
    setCarregando(true);
    const keys = Object.keys(itemselec);
    const itemsave = {};
    itemsave['codigo'] = cabecalho.codigo;
    itemsave['codcli'] = '00000000';
    itemsave['grupo'] = '000000';
    keys.forEach((campo) => {
      const posicao = fieldsimpserv.findIndex((item) => item.campo === campo);
      if (valuesfield[posicao] !== undefined) {
        itemsave[campo] = valuesfield[posicao];
      }
      if (campo.toLowerCase().endsWith('b')) {
        const campofim = campo.slice(0, -1);
        if (!inclusao) {
          itemsave[campo] = itembkp[campofim] ?? 0;
        } else {
          itemsave[campo] = 0;
        }
      }
    });
    // Totvalor
    const posqtserv = fieldsimpserv.findIndex((item) => item.campo === 'qtserv');
    const posprunit = fieldsimpserv.findIndex((item) => item.campo === 'prunit');
    itemsave['totvalor'] = (parseFloat(valuesfield[posqtserv]) * parseFloat(valuesfield[posprunit])).toFixed(2);

    // Aliquota PIS
    const posaliqpis = fieldsimpserv.findIndex((item) => item.campo === 'aliqpis');
    const posretpis = fieldsimpserv.findIndex((item) => item.campo === 'retpis');
    const posaliqpisret = fieldsimpserv.findIndex((item) => item.campo === 'aliqpisret');
    itemsave['vlrpis'] = (itemsave['totvalor'] * (parseFloat(valuesfield[posaliqpis]) / 100)).toFixed(2);
    if (valuesfield[posretpis] === 'S') {
      itemsave['vlrpisret'] = (itemsave['totvalor'] * (parseFloat(valuesfield[posaliqpisret]) / 100)).toFixed(2);
    } else {
      itemsave['vlrpisret'] = 0;
    }

    // Aliquota COFINS
    const posaliqcofins = fieldsimpserv.findIndex((item) => item.campo === 'aliqcofins');
    const posretcofins = fieldsimpserv.findIndex((item) => item.campo === 'retcofins');
    const posaliqcofinsret = fieldsimpserv.findIndex((item) => item.campo === 'aliqcofinsret');
    itemsave['vlrcofins'] = (itemsave['totvalor'] * (parseFloat(valuesfield[posaliqcofins]) / 100)).toFixed(2);
    if (valuesfield[posretcofins] === 'S') {
      itemsave['vlrcofinsret'] = (itemsave['totvalor'] * (parseFloat(valuesfield[posaliqcofinsret]) / 100)).toFixed(2);
    } else {
      itemsave['vlrcofinsret'] = 0;
    }

    // Aliquota ISS
    const posaliqiss = fieldsimpserv.findIndex((item) => item.campo === 'aliqiss');
    const posretiss = fieldsimpserv.findIndex((item) => item.campo === 'retiss');
    const posaliqissret = fieldsimpserv.findIndex((item) => item.campo === 'aliqissret');
    itemsave['vlriss'] = (itemsave['totvalor'] * (parseFloat(valuesfield[posaliqiss]) / 100)).toFixed(2);
    if (valuesfield[posretiss] === 'S') {
      itemsave['vlrissret'] = (itemsave['totvalor'] * (parseFloat(valuesfield[posaliqissret]) / 100)).toFixed(2);
    } else {
      itemsave['vlrissret'] = 0;
    }

    // Aliquota CSLL
    const posaliqcsll = fieldsimpserv.findIndex((item) => item.campo === 'csll');
    const posretcsll = fieldsimpserv.findIndex((item) => item.campo === 'retcsll');
    const posaliqcsllret = fieldsimpserv.findIndex((item) => item.campo === 'csllret');
    itemsave['vlrcsll'] = (itemsave['totvalor'] * (parseFloat(valuesfield[posaliqcsll]) / 100)).toFixed(2);
    if (valuesfield[posretcsll] === 'S') {
      itemsave['vlrcsllret'] = (itemsave['totvalor'] * (parseFloat(valuesfield[posaliqcsllret]) / 100)).toFixed(2);
    } else {
      itemsave['vlrcsllret'] = 0;
    }

    // Aliquota IR
    const posaliqir = fieldsimpserv.findIndex((item) => item.campo === 'ir');
    const posretir = fieldsimpserv.findIndex((item) => item.campo === 'retir');
    const posaliqirret = fieldsimpserv.findIndex((item) => item.campo === 'irret');
    itemsave['vlrir'] = (itemsave['totvalor'] * (parseFloat(valuesfield[posaliqir]) / 100)).toFixed(2);
    if (valuesfield[posretir] === 'S') {
      itemsave['vlrirret'] = (itemsave['totvalor'] * (parseFloat(valuesfield[posaliqirret]) / 100)).toFixed(2);
    } else {
      itemsave['vlrirret'] = 0;
    }

    // Aliquota INSS
    const posaliqinss = fieldsimpserv.findIndex((item) => item.campo === 'inss');
    const posretinss = fieldsimpserv.findIndex((item) => item.campo === 'retinss');
    const posaliqinssret = fieldsimpserv.findIndex((item) => item.campo === 'inssret');
    itemsave['vlrinss'] = (itemsave['totvalor'] * (parseFloat(valuesfield[posaliqinss]) / 100)).toFixed(2);
    if (valuesfield[posretinss] === 'S') {
      itemsave['vlrinssret'] = (itemsave['totvalor'] * (parseFloat(valuesfield[posaliqinssret]) / 100)).toFixed(2);
    } else {
      itemsave['vlrinssret'] = 0;
    }

    if (inclusao) {
      apiInsert(classserv, itemsave).then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.status === 1) {
            getEventsserv(8);
            setShowselec(false);
          }
        } else {
          setCarregando(false);
          setItemvariant(-1);
          setMensagem(response.data);
        }
      });
    } else {
      apiUpdate(classserv, itemsave).then((response) => {
        if (response.status === 200) {
          if (response.data.status === 1) {
            getEventsserv(9);
            setShowselec(false);
          }
        } else {
          setCarregando(false);
          setItemvariant(-1);
          setMensagem(response.data);
        }
      });
    }
  };

  const Cancelar = () => {
    if (getEventsserv(10)) {
      getEventsserv(11);
      setShowselec(false);
    }
  };

  const getEventsserv = (type) => {
    let retorno = true;
    if (eventsserv !== undefined && eventsserv.length > 0) {
      setCarregando(true);
      let tmpevent = eventsserv.filter((element) => element.type === parseInt(type));
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
      <div id="frmlancserv" name="frmlancserv">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Lançamento de Valores / Impostos</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginLeft: '5px', marginRight: '5px', marginBottom: '10px' }}>
              {fieldsimpserv.map((field, index) => (
                <CreateObject
                  key={index}
                  field={field}
                  index={field.id}
                  fields={fieldsimpserv}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={valuesdisable[field.id]}
                ></CreateObject>
              ))}
            </Row>
          </Card>
        </Row>
        <hr></hr>
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
        <Row style={{ textAlign: 'right', marginTop: '10px' }}>
          <Row style={{ textAlign: 'rigth' }}>
            <Col>
              {!inclusao ? (
                <Button id="btnEditprod" className="btn" disabled={!disabled} onClick={(e) => Editar()}>
                  <i className={'feather icon-edit'} /> Editar
                </Button>
              ) : (
                <></>
              )}
              <Button id="btnSalvprod" className="btn btn-success" disabled={disabled} onClick={(e) => Salvar()}>
                <i className={'feather icon-save'} /> Salvar
              </Button>
              <Button id="btnCancprod" className="btn btn-warning" disabled={disabled} onClick={(e) => Cancelar()}>
                <i className={'feather icon-x'} /> Cancelar
              </Button>
            </Col>
          </Row>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default LancServ;
