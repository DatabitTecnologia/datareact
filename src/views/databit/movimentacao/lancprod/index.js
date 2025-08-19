import React, { useEffect, useRef } from 'react';
import { Row, Col, Button, Alert, Card, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import nopicture from '../../../../assets/images/databit/nopicture.png';
import { apiGetPicture } from '../../../../api/crudapi';
import { apiExec, apiInsert, apiUpdate, apiList } from '../../../../api/crudapi';
import TabelaMov from '../tabela';
import { Decode64 } from '../../../../utils/crypto';
import { Message } from '../../../../components/Message';
import { descontoMaximo } from '../desconto';

const LancProd = (props) => {
  const { cabecalho, tableitem, classitem, typeprice, prodselec, entsai, config, coddest, tabdest, typestock, contabil } = props;
  const { tablemov, fieldslanc, fieldsimp, inclusao } = props;
  const { showselec, setShowselec } = props;
  const { eventsitem, setEventsitem } = props;

  const [itemselec, setItemselec] = React.useState(undefined);
  const [carregando, setCarregando] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];

  const [itembkp, setItembkp] = React.useState(undefined);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesfieldinfor, setValuesfieldinfor] = React.useState([]);
  const [valuesfieldinfor2, setValuesfieldinfor2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [foto, setFoto] = React.useState(undefined);
  const [tabelaselec, setTabelaselec] = React.useState('01');
  const [nametabelaselec, setNametabelaselec] = React.useState(undefined);
  const [showtabela, setShowtabela] = React.useState(false);
  const [loadingtabela, setLoadingtabela] = React.useState(false);
  const valuesfieldref = useRef([]);

  useEffect(() => {
    const loadRef = valuesfieldref.current.length === 0;
    fieldsimp.forEach((item, index) => {
      if (loadRef) {
        valuesfieldref.current[index] = item.campo;
      }
    });
  }, []);

  useEffect(() => {
    if (prodselec !== undefined) {
      Filtrar(inclusao);
    }
  }, [prodselec]);

  useEffect(() => {
    Filtrar(inclusao);
  }, [tabelaselec]);

  useEffect(() => {
    const posicao = fieldsimp.findIndex((item) => item.campo === 'tabela');
    valuesfield2[posicao] = nametabelaselec;
    setValuesfield2([...valuesfield2]);
  }, [nametabelaselec]);

  const Filtrar = (inclusao) => {
    setFoto(undefined);
    setCarregando(true);
    apiExec(
      "exec SP02303 '" +
        tablemov +
        "','" +
        cabecalho.codigo +
        "','" +
        prodselec.produto +
        "','" +
        cabecalho.codemp +
        "','" +
        cabecalho[coddest] +
        "','" +
        tabdest +
        "','" +
        entsai +
        "'," +
        typeprice +
        ",'" +
        tabelaselec +
        "' ",
      'S'
    ).then((response) => {
      setCarregando(false);
      const preco = response.data;
      setItemselec({
        acrescimo: 0.0,
        acrescimob: 0.0,
        afrmm: 0.0,
        afrmmb: 0.0,
        aliqcofinsret: 0.0,
        aliqcsll: preco[0].csllfim,
        aliqcsllret: 0.0,
        aliqimpfat: preco[0].aliqimpfatfim,
        aliqinss: 0.0,
        aliqinssret: 0.0,
        aliqir: preco[0].irfim,
        aliqirret: 0.0,
        aliqiss: 0.0,
        aliqissret: 0.0,
        aliqpisret: 0.0,
        ativo: 'S',
        basefcptot: 0.0,
        basefcptotb: 0.0,
        basefcptotst: 0.0,
        basefcptotstb: 0.0,
        baseicms: 0.0,
        baseicmsb: 0.0,
        basered: preco[0].baseredfim,
        basest: 0.0,
        basestb: 0.0,
        codcai: '',
        codcli: cabecalho.codcli ?? null,
        codemp: cabecalho.codemp ?? null,
        codigo: cabecalho.codigo,
        codpre: cabecalho.codpre ?? 'MANUAL',
        cofins: preco[0].cofinsfim,
        comissao: preco[0].comissaofim,
        cst: prodselec.cst ?? preco[0].csticmsfim,
        cstcofins: preco[0].cstcofinsfim,
        cstipi: preco[0].cstipifim,
        cstpis: preco[0].cstpisfim,
        custo: preco[0].custofim,
        custocompra: preco[0].custocomprafim,
        ddi: null,
        descprod: prodselec.nomeprod,
        despipi: 'N',
        dtdesemb: null,
        dtent: null,
        enqipi: '',
        equip: '',
        fcp: preco[0].fcpfim,
        fcpst: preco[0].fcpstfim,
        freteipi: 'N',
        grupo: '',
        icms: preco[0].icmsfim,
        icmsdentro: 0.0,
        icmsfora: 0.0,
        icmsst: preco[0].icmsstfim,
        intermedio: 0,
        ipiicms: 'N',
        item: 0,
        itemped: 0,
        locdesemb: '',
        natureza: inclusao === true ? cabecalho.natureza ?? null : prodselec.natureza,
        ndi: '',
        numped: '',
        numserie: '',
        obs: preco[0].obsfim,
        opcom: '',
        partilhaext: 0.0,
        partilhaint: 0.0,
        percdif: preco[0].percdiffim,
        percipi: preco[0].ipifim,
        percst: preco[0].mvafim,
        perdesc: inclusao === true ? 0 : prodselec.perdesc,
        pis: preco[0].pisfim,
        prbackup: preco[0].precofim,
        produto: prodselec.produto,
        prunit: preco[0].precofim,
        qtdisp: 0.0,
        qtdispb: 0.0,
        qtprod: inclusao === true ? 1 : prodselec.qtprod,
        qtprodb: 0.0,
        qtprodun: 0.0,
        registro: 0,
        retcofins: 'N',
        retcsll: 'N',
        retinss: 'N',
        retir: 'N',
        retiss: 'N',
        retpis: 'N',
        seqadic: '',
        servtrib: '',
        situacao: 'A',
        somast: 'N',
        tabela: preco[0].tabelafim,
        tipo: '',
        tipodesc: '',
        tipoestoque: '',
        totvalor: 0.0,
        totvalorb: 0.0,
        ufdesemb: '',
        unprod: prodselec.unprod,
        vendtran: '',
        viatransp: 0,
        vlrbccofins: 0.0,
        vlrbcipi: 0.0,
        vlrbcipib: 0.0,
        vlrbcpis: 0.0,
        vlrcofins: 0.0,
        vlrcofinsb: 0.0,
        vlrcofinsret: 0.0,
        vlrcofinsretb: 0.0,
        vlrcsll: 0.0,
        vlrcsllb: 0.0,
        vlrcsllret: 0.0,
        vlrcsllretb: 0.0,
        vlrdesc: 0.0,
        vlrdescacu: 0.0,
        vlrdescb: 0.0,
        vlrdescimp: 0.0,
        vlrdespadu: 0.0,
        vlrdifaliq: 0.0,
        vlrdifaliqb: 0.0,
        vlrfcp: 0.0,
        vlrfcpb: 0.0,
        vlrfcptot: 0.0,
        vlrfcptotb: 0.0,
        vlrfcptotst: 0.0,
        vlrfcptotstb: 0.0,
        vlrfrete: 0.0,
        vlrfreteb: 0.0,
        vlricms: 0.0,
        vlricmsb: 0.0,
        vlricmscu: 0.0,
        vlricmsdentro: 0.0,
        vlricmsdentrob: 0.0,
        vlricmsdeson: 0.0,
        vlricmsdesonb: 0.0,
        vlricmsdif: 0.0,
        vlricmsdifb: 0.0,
        vlricmsfora: 0.0,
        vlricmsforab: 0.0,
        vlricmsult: preco[0].icmsultfim,
        vlrii: 0.0,
        vlrinss: 0.0,
        vlrinssb: 0.0,
        vlrinssret: 0.0,
        vlrinssretb: 0.0,
        vlriof: 0.0,
        vlripi: 0.0,
        vlripib: 0.0,
        vlrir: 0.0,
        vlrirb: 0.0,
        vlrirret: 0.0,
        vlrirretb: 0.0,
        vlriss: 0.0,
        vlrissb: 0.0,
        vlrissret: 0.0,
        vlrissretb: 0.0,
        vlroutdesp: 0.0,
        vlroutdespb: 0.0,
        vlrpis: 0.0,
        vlrpisb: 0.0,
        vlrpisret: 0.0,
        vlrpisretb: 0.0,
        vlrst: 0.0,
        vlrstb: 0.0,
        vlrvbci: 0.0,
        nomeprod: prodselec.nomeprod,
        referencia: prodselec.referencia,
        codbarras: prodselec.codbarras,
        codauxiliar: prodselec.codauxiliar,
        nomeun: prodselec.nomeun,
        codmarca: prodselec.codmarca,
        nomemarca: prodselec.nomemarca,
        codgrupo: prodselec.codgrupo,
        nomegrupo: prodselec.nomegrupo,
        codsubgrupo: prodselec.codsubgrupo,
        nomesubgrupo: prodselec.nomesubgrupo,
        codlocal: prodselec.codlocal,
        nomelocal: prodselec.nomelocal,
        ncm: prodselec.ncm,
        nomencm: prodselec.nomencm,
        prateleira: prodselec.prateleira
      });
    });
  };

  useEffect(() => {
    if (itemselec !== undefined) {
      if (!inclusao) {
        const keys = Object.keys(fieldsimp);
        let itemselecbkp = itemselec;
        keys.forEach((item) => {
          const field = fieldsimp[item].campo;
          if (field in itemselecbkp && field in prodselec) {
            if (prodselec[field] !== undefined && prodselec[field] !== null) {
              itemselecbkp[field] = prodselec[field];
            }
          }
        });
        setItemselec(itemselecbkp);
        setItembkp((prev) => ({
          ...prev,
          ...prodselec // Copia apenas os campos existentes no stateAtual
        }));
      }
      const keys = Object.keys(itemselec);
      const values = Object.values(itemselec);
      keys.forEach((item, index) => {
        fieldslanc.forEach((item2, index2) => {
          if (item === item2.campo) {
            valuesfieldinfor[index2] = values[index];
          }
        });
      });
      setValuesfieldinfor([...valuesfieldinfor]);
    }
  }, [itemselec]);

  useEffect(() => {
    if (itemselec !== undefined) {
      apiGetPicture('TB01010', 'TB01010_CODIGO', 'TB01010_FOTO', itemselec.produto).then((response) => {
        setFoto(response.data[0].picture);
        let tmpdisable = [];
        const keys = Object.keys(itemselec);
        const values = Object.values(itemselec);
        keys.forEach((item, index) => {
          tmpdisable = tmpdisable.concat(true);
          fieldsimp.forEach((item2, index2) => {
            if (item === item2.campo) {
              valuesfield[index2] = values[index];
            }
          });
        });

        setValuesfield([...valuesfield]);
        setValuesdisable(tmpdisable);
        if (inclusao) {
          setDisabled(false);
          fieldsimp.forEach((item, index) => {
            valuesdisable[index] = !item.lancfield;
          });
          setValuesdisable([...valuesdisable]);
        }
      });
    }
  }, [valuesfieldinfor]);

  useEffect(() => {
    const tabela = valuesfield[fieldsimp.findIndex((item) => item.campo === 'tabela')];
    if (tabela !== undefined && inclusao) {
      if (tabela.length === 2) {
        setTabelaselec(tabela);
      }
    }
    if (tabela !== undefined && !inclusao) {
      if (tabela.length === 2) {
        if (loadingtabela) {
          setTabelaselec(tabela);
        } else {
          setLoadingtabela(true);
        }
      }
    }
  }, [valuesfield[fieldsimp.findIndex((item) => item.campo === 'tabela')]]);

  const Editar = () => {
    if (getEventsItem(5)) {
      setDisabled(false);
      fieldsimp.forEach((item, index) => {
        valuesdisable[index] = !item.lancfield;
      });
      setValuesdisable([...valuesdisable]);
    }
  };

  const handleClosetabela = () => {
    setShowtabela(false);
  };

  const Salvar = async () => {
    setCarregando(true);
    apiList('FieldVW', '*', 'LOWER(SUBSTRING(CAMPO,9,50)) AS campofim', "TABELA = '" + tableitem + "' ").then((response) => {
      if (response.status === 200) {
        const fieldstab = response.data;
        const keys = Object.keys(itemselec);
        keys.forEach((item) => {
          const campo = item;
          if (!campo.includes('dtcad') && !campo.includes('opcad') && !campo.includes('dtalt') && !campo.includes('opalt')) {
            const posicao = fieldsimp.findIndex((item) => item.campo === campo);
            const camposelec = fieldstab.filter((item) => item.campofim === campo);
            if (posicao !== -1) {
              if (camposelec !== undefined && camposelec.length > 0) {
                const tipocampo = camposelec[0].tipo;
                if (tipocampo.toLowerCase().includes('datetime')) {
                  if (valuesfield[posicao] !== undefined && valuesfield[posicao] !== null && valuesfield[posicao] !== '') {
                    const dt1 = new Date(valuesfield[posicao]);
                    const data1 = dt1.toLocaleDateString('en-US');
                    itemselec[campo] = data1 + ' 00:00:00';
                  }
                } else {
                  itemselec[campo] = valuesfield[posicao];
                }
              }
            } else {
              if (camposelec !== undefined && camposelec.length > 0) {
                const tipocampo = camposelec[0].tipo;
                if (tipocampo.toLowerCase().includes('datetime')) {
                  if (itemselec[campo] !== undefined && itemselec[campo] !== null && itemselec[campo] !== '') {
                    const dt1 = new Date(itemselec[campo]);
                    const data1 = dt1.toLocaleDateString('en-US');
                    itemselec[campo] = data1 + ' 00:00:00';
                  }
                }
              }
            }
            if (campo.toLowerCase().endsWith('b')) {
              const campofim = campo.slice(0, -1);
              if (!inclusao) {
                itemselec[campo] = itembkp[campofim] ?? 0;
              } else {
                itemselec[campo] = 0;
              }
            }
          }
        });
        apiExec(
          "exec SP02304 '" +
            cabecalho.codemp +
            "','" +
            tablemov +
            "', '" +
            cabecalho.codigo +
            "', '" +
            itemselec.produto +
            "','" +
            entsai +
            "', " +
            itemselec.qtprod +
            ' , ' +
            itemselec.prunit +
            ' , ' +
            itemselec.perdesc +
            ' , ' +
            (itemselec.percipi ?? 'N') +
            ",'" +
            (itemselec.freteipi ?? 'N') +
            "','" +
            itemselec.despipi +
            "'," +
            itemselec.vlrfrete +
            ',' +
            itemselec.vlroutdesp +
            ',' +
            itemselec.icms +
            ",'" +
            itemselec.cst +
            "'," +
            itemselec.basered +
            ",'" +
            itemselec.ipiicms +
            "'," +
            itemselec.icmsst +
            ',' +
            itemselec.percst +
            ',' +
            itemselec.percdif +
            ',' +
            cabecalho.vlrbruto +
            ',' +
            (cabecalho.vlrfrete ?? 0) +
            ',' +
            (cabecalho.vlroutdesp ?? 0) +
            ",'" +
            cabecalho[coddest] +
            "','" +
            tabdest +
            "','" +
            (itemselec.unprod ?? '01') +
            "','" +
            (itemselec.tabela ?? '01') +
            "','" +
            Decode64(sessionStorage.getItem('user')) +
            "'," +
            itemselec.aliqcsllret +
            ',' +
            itemselec.aliqcofinsret +
            ',' +
            itemselec.aliqinssret +
            ',' +
            itemselec.aliqirret +
            ',' +
            itemselec.aliqpisret +
            ',' +
            itemselec.aliqissret +
            ",'" +
            itemselec.retcsll +
            "','" +
            itemselec.retcofins +
            "','" +
            itemselec.retinss +
            "','" +
            itemselec.retir +
            "','" +
            itemselec.retpis +
            "','" +
            itemselec.retiss +
            "','" +
            typestock +
            "','" +
            (cabecalho.contabil ?? 'N') +
            "'",
          'S'
        ).then((response) => {
          const result = response.data;
          switch (result[0].status) {
            case -1: {
              setCarregando(false);
              setItemvariant(-1);
              setMensagem(result[0].mensagem);
              break;
            }
            case 0: {
              Message('frmlancprod', '', 'warning', result[0].mensagem).then((result) => {
                if (result.isConfirmed) {
                  setCarregando(false);
                }
              });
              break;
            }
            case 1: {
              itemselec.totvalor = result[0].totvalor;
              itemselec.vlrdesc = result[0].vlrdesc;
              itemselec.vlripi = result[0].vlripi;
              itemselec.vlrbcipi = result[0].vlrbcipi;
              itemselec.vlricmsdeson = result[0].vlricmsdeson;
              itemselec.vlricms = result[0].vlricms;
              itemselec.vlricmscu = result[0].vlricms;
              itemselec.baseicms = result[0].baseicms;
              itemselec.basest = result[0].basesub;
              itemselec.basefcptotst = result[0].basefcptotst;
              itemselec.vlrfcptotst = result[0].vlrfcptotst;
              itemselec.fcpst = result[0].fcpst;
              itemselec.vlrst = result[0].vlrst;
              itemselec.fcp = result[0].fcp;
              itemselec.vlrfcp = result[0].vlrfcp;
              itemselec.partilhaint = result[0].partilhaint;
              itemselec.partilhaext = result[0].partilhaext;
              itemselec.icmsdentro = result[0].icmsdentro;
              itemselec.icmsfora = result[0].icmsfora;
              itemselec.vlricmsdentro = 0;
              itemselec.vlricmsfora = result[0].vlricmsfora;
              itemselec.basefcptot = result[0].basefcptot;
              itemselec.vlrfcptot = result[0].vlrfcptot;
              itemselec.qtprodun = result[0].qtprodun;
              itemselec.vlricmsdif = result[0].vlricmsdif;
              itemselec.tabela = result[0].tabfim;
              itemselec.vlrpisret = result[0].vlrpisret;
              itemselec.vlrcofinsret = result[0].vlrcofinsret;
              itemselec.vlrirret = result[0].vlrirret;
              itemselec.vlrcsllret = result[0].vlrcsllret;
              itemselec.vlrinssret = result[0].vlrinssret;
              itemselec.vlrissret = result[0].vlrissret;
              if (getEventsItem(7)) {
                descontoMaximo(tablemov, cabecalho, itemselec, config).then((retdesconto) => {
                  if (retdesconto) {
                    setCarregando(true);
                    if (inclusao) {
                      apiInsert(classitem, itemselec).then((response) => {
                        if (response.status === 200) {
                          if (response.data.status === 1) {
                            getEventsItem(8);
                            setShowselec(false);
                          }
                        } else {
                          setCarregando(false);
                          setItemvariant(-1);
                          setMensagem(response.data);
                        }
                      });
                    } else {
                      apiUpdate(classitem, itemselec).then((response) => {
                        if (response.status === 200) {
                          if (response.data.status === 1) {
                            getEventsItem(9);
                            setShowselec(false);
                          }
                        } else {
                          setCarregando(false);
                          setItemvariant(-1);
                          setMensagem(response.data);
                        }
                      });
                    }
                  }
                });
              }

              break;
            }
          }
        });
      }
    });
  };

  const Cancelar = () => {
    if (getEventsItem(10)) {
      getEventsItem(11);
      setShowselec(false);
    }
  };

  const getEventsItem = (type) => {
    let retorno = true;
    if (eventsitem !== undefined && eventsitem.length > 0) {
      setCarregando(true);
      let tmpevent = eventsitem.filter((element) => element.type === parseInt(type));
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
      <div id="frmlancprod" name="frmlancprod">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Informações do Produto selecionado</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '5px' }}>
              <Col lg={2}>
                <Row style={{ width: '100%', textAlign: 'center' }}>
                  <Col>
                    {foto === undefined || foto === '' || foto === null ? (
                      <img src={nopicture} alt="foto" width={'230px'} height={'230px'} />
                    ) : (
                      <img src={`data:image/jpeg;base64,${foto}`} alt="foto" width={'230px'} height={'230px'} />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row style={{ marginLeft: '65px', marginRight: '5px', marginBottom: '10px' }}>
                  {fieldslanc.map((field, index) => (
                    <CreateObject
                      key={index}
                      field={field}
                      index={field.id}
                      fields={fieldslanc}
                      valuesfield={valuesfieldinfor}
                      setValuesfield={(data) => setValuesfieldinfor(data)}
                      valuesfield2={valuesfieldinfor2}
                      setValuesfield2={(data) => setValuesfieldinfor2(data)}
                      disabled={true}
                    ></CreateObject>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
        </Row>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Lançamento de Valores / Impostos</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '10px', marginLeft: '5px', marginRight: '5px', marginBottom: '10px' }}>
              {fieldsimp.map((field, index) => (
                <CreateObject
                  key={index}
                  field={field}
                  index={field.id}
                  fields={fieldsimp}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={valuesdisable[field.id]}
                  valuesfieldref={valuesfieldref}
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
              {typeprice === 0 && itemselec !== undefined ? (
                <Button id="btnTabeka" className="btn" disabled={disabled} onClick={(e) => setShowtabela(true)}>
                  <i className={'feather icon-tag'} /> Tabela de Preços
                </Button>
              ) : (
                <></>
              )}
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
        <Modal backdrop="static" size={'lg'} show={showtabela} centered={true} onHide={handleClosetabela}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-tag'} />
            &nbsp;Tabela de Preços
          </Modal.Header>
          <ModalBody>
            <TabelaMov
              cabecalho={cabecalho}
              itemselec={itemselec}
              tablemov={tablemov}
              showtabela={showtabela}
              setShowtabela={(data) => setShowtabela(data)}
              selectab={true}
              tabelaselec={tabelaselec}
              setTabelaselec={(data) => setTabelaselec(data)}
              nametabelaselec={nametabelaselec}
              setNametabelaselec={(data) => setNametabelaselec(data)}
            ></TabelaMov>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default LancProd;
