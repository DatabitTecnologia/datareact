import React, { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import Infor from '../cadastro/infor';
import StatusFluxo from './status/fluxo';
import StatusHistorico from './status/historico';
import PreContratoInformacoes from './informacoes';
import { apiFind, apiList, apiInsert } from '../../../api/crudapi';
import ContratoInformacoes from '../contrato/informacoes';
import { PrecontratoReport } from './report';
import { addMonths } from '../../../utils/addmonths';

const InforPrecontrato = (props) => {
  const { addToast } = useToasts();
  const { showinfor, setShowinfor } = props;
  const { rowselect, setRowselect } = props;
  const { onupdate, setOnupdate } = props;

  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [valuesinvisible, setValuesinvisible] = React.useState([]);
  const [valuesname, setValuesname] = React.useState([]);
  const [valuesrequired, setValuesrequired] = React.useState([]);
  const [valuesindex, setValuesindex] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);
  const [processando, setProcessando] = React.useState(false);
  const [itemprocessa, setItemprocessa] = React.useState('');
  const [valuesaddress, setValuesaddress] = React.useState([]);
  const [valuesaddressdisable, setValuesaddressdisable] = React.useState([]);
  const [valuesaddressname, setValuesaddressname] = React.useState([]);
  const [valuesaddressrequired, setValuesaddressrequired] = React.useState([]);
  const [actions, setActions] = React.useState([]);

  const [openmodal, setOpenmodal] = React.useState(props.openmodal);
  const [fieldsauto, setFieldsauto] = React.useState(props.fieldsauto);

  const [showwfluxo, setShowfluxo] = useState(false);
  const [showhist, setShowhist] = useState(false);
  const [showinforpre, setShowinforpre] = useState(false);

  const [events, setEvents] = React.useState([]);
  const [dtgerado, setDtgerado] = React.useState([]);

  useEffect(() => {
    setActions([
      {
        id: 'btnInfor',
        method: () => Informacoes(),
        classicon: 'feather icon-info',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Infor.'
      },
      {
        id: 'btnFluxo',
        method: () => Fluxo(),
        classicon: 'feather icon-zap',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Fluxo'
      },
      {
        id: 'btnHistorico',
        method: () => Hist(),
        classicon: 'feather icon-list',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Histórico'
      }
      /*
      {
        id: 'btnReport',
        method: () => Report(),
        classicon: 'feather icon-printer',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Resumo'
      }*/
    ]);
  }, []);

  useEffect(() => {
    if (valuesfield !== undefined && valuesfield.length > 0) {
      let statusatual = valuesfield[valuesname.indexOf('status')];
      apiFind('PrecontratoStatus', '*', '', "TB01136_CODIGO = '" + statusatual + "' ").then((response) => {
        if (response.status === 200) {
          let excluir = response.data.excluir;
          let alterar = response.data.alterar;
          setEvents([
            {
              id: 'ValidaStatusDelete',
              type: 3, // Before Delete
              method: function () {
                // Validação do Status
                if (excluir === 'N') {
                  addToast('Não é permitido excluir este Pré-Contrato com este STATUS !', {
                    placement: 'bottom-rigth',
                    appearance: 'warning',
                    autoDismiss: true
                  });
                  return false;
                } else {
                  return true;
                }
              }
            },
            {
              id: 'ValidaConDelete',
              type: 3, // Before Delete
              method: function () {
                // Validação do Contrato Gerado
                if (valuesfield !== undefined && valuesfield.length > 0) {
                  let dtgerado = valuesfield[valuesname.indexOf('dtgerado')];
                  if (dtgerado !== '' && dtgerado !== undefined) {
                    addToast('Não é permitido excluir este Pré-Contrato, pois já foi gerado Contrato para o mesmo ! ', {
                      placement: 'bottom-rigth',
                      appearance: 'warning',
                      autoDismiss: true
                    });
                    return false;
                  } else {
                    return true;
                  }
                }
              }
            },
            {
              id: 'ValidaStatusEdit',
              type: 5, // Before Edit
              method: function () {
                // Validação do Status
                if (alterar === 'N') {
                  addToast('Não é permitido editar este Pré-Contrato com este STATUS !', {
                    placement: 'bottom-rigth',
                    appearance: 'warning',
                    autoDismiss: true
                  });
                  return false;
                } else {
                  return true;
                }
              }
            },
            {
              id: 'ValidaConUpdate',
              type: 5, // Before Update
              method: function () {
                // Validação do Contrato Gerado
                if (valuesfield !== undefined && valuesfield.length > 0) {
                  let dtgerado = valuesfield[valuesname.indexOf('dtgerado')];
                  if (dtgerado !== '' && dtgerado !== undefined) {
                    addToast('Não é permitido alterar este Pré-Contrato, pois já foi gerado Contrato para o mesmo ! ', {
                      placement: 'bottom-rigth',
                      appearance: 'warning',
                      autoDismiss: true
                    });
                    return false;
                  } else {
                    return true;
                  }
                }
              }
            },
            {
              id: 'IncluirSites',
              type: 8, // After Save (Insert)
              method: async function () {
                if (valuesfield !== undefined && valuesfield.length > 0) {
                  let contrato = valuesfield[valuesname.indexOf('contrato')];
                  if (contrato !== '' && contrato !== undefined) {
                    const responselist = await apiList(
                      'PrecontratoEndereco',
                      'TB02269_CODIGO,TB02269_NOME,TB02269_END,TB02269_CEP,TB02269_END,TB02269_NUM,TB02269_COMP,TB02269_BAIRRO,' +
                        'TB02269_CIDADE,TB02269_ESTADO,TB02269_CONTATO,TB02269_FONE,TB02269_EMAIL,TB02269_OPORTUNIDADE',
                      '',
                      " TB02269_PRECONTRATO= '" + valuesfield[valuesname.indexOf('codigo')] + "' "
                    );
                    if (responselist.status === 200) {
                      const enderecos = responselist.data;

                      if (enderecos.length <= 0) {
                        setProcessando(true);
                        const responselistsite = await apiList(
                          'Site',
                          'TB02176_NOME,TB02176_END,TB02176_CEP,TB02176_END,TB02176_NUM,TB02176_COMP,TB02176_BAIRRO,' +
                            'TB02176_CIDADE,TB02176_ESTADO,TB02176_CONTATO,TB02176_FONE,TB02176_EMAIL',
                          '',
                          "TB02176_CONTRATO = '" + contrato + "' "
                        );
                        if (responselistsite.status === 200) {
                          const sites = responselistsite.data;
                          if (sites !== undefined) {
                            let i = 0;
                            for (const site of sites) {
                              let item = {};
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
                              item['precontrato'] = valuesfield[valuesname.indexOf('codigo')];
                              const responseinsert = await apiInsert('PrecontratoEndereco', item);
                              if (responseinsert.status === 200) {
                                i += 1;
                                setItemprocessa('Site(' + i + '/' + sites.length + ') ' + site.nome);
                              }
                            }
                          }
                        }
                        setProcessando(false);
                      }
                    }
                  }
                }
                return true;
              }
            }
          ]);
        }
      });
    }
  }, [valuesfield]);

  const Fluxo = () => {
    setShowfluxo(true);
  };

  const handleClosefluxo = () => {
    setShowfluxo(false);
  };

  const Hist = () => {
    setShowhist(true);
  };

  const handleClosehist = () => {
    setShowhist(false);
  };

  const Report = () => {
    PrecontratoReport(valuesfield[valuesname.indexOf('codigo')]);
  };

  const Informacoes = () => {
    apiFind(
      'Precontrato',
      'TB02264_CODIGO,TB02264_DTGERADO',
      '',
      "TB02264_CODIGO = '" + valuesfield[valuesname.indexOf('codigo')] + "' "
    ).then((response) => {
      if (response.status === 200) {
        setDtgerado(response.data.dtgerado);
        setShowinforpre(true);
      }
    });
  };

  const handleCloseinfopre = () => {
    apiFind(
      'Precontrato',
      'TB02264_CODIGO,TB02264_DTGERADO',
      '',
      "TB02264_CODIGO = '" + valuesfield[valuesname.indexOf('codigo')] + "' "
    ).then((response) => {
      if (response.status === 200) {
        setDtgerado(response.data.dtgerado);
        setShowinforpre(false);
      }
    });
  };

  useEffect(() => {
    // Exibindo / Ocultando campos de acordo com o tipo de contrato
    let posfrantotal = valuesname.indexOf('franqtotal');
    let posvlrfranqtotal = valuesname.indexOf('vlrfranqtotal');
    let posfranqpb = valuesname.indexOf('franqpb');
    let posvlrfranqpb = valuesname.indexOf('vlrfranqpb');
    let posfranqcolor = valuesname.indexOf('franqcolor');
    let posvlrfranqcolor = valuesname.indexOf('vlrfranqcolor');
    let posfranqdg = valuesname.indexOf('franqdg');
    let posvlrfranqdg = valuesname.indexOf('vlrfranqdg');
    let posfranqgf = valuesname.indexOf('franqgf');
    let posvlrfranqgf = valuesname.indexOf('vlrfranqgf');
    let posfranqgfc = valuesname.indexOf('franqgfc');
    let posvlrfranqgfc = valuesname.indexOf('vlrfranqgfc');
    let tipofranquia = valuesfield[valuesname.indexOf('tipofranquia')];
    let analfranquia = valuesfield[valuesname.indexOf('analfranquia')];
    if (tipofranquia === 'G') {
      valuesinvisible[posfrantotal] = false;
      valuesinvisible[posvlrfranqtotal] = false;

      valuesinvisible[posfranqpb] = true;
      valuesinvisible[posvlrfranqpb] = true;

      valuesinvisible[posfranqcolor] = true;
      valuesinvisible[posvlrfranqcolor] = true;

      valuesinvisible[posfranqdg] = true;
      valuesinvisible[posvlrfranqdg] = true;

      valuesinvisible[posfranqgf] = true;
      valuesinvisible[posvlrfranqgf] = true;

      valuesinvisible[posfranqgfc] = true;
      valuesinvisible[posvlrfranqgfc] = true;
    } else {
      valuesinvisible[posfrantotal] = true;
      valuesinvisible[posvlrfranqtotal] = true;

      valuesinvisible[posfranqpb] = analfranquia === 'M';
      valuesinvisible[posvlrfranqpb] = analfranquia === 'M';

      valuesinvisible[posfranqcolor] = analfranquia === 'M';
      valuesinvisible[posvlrfranqcolor] = analfranquia === 'M';

      valuesinvisible[posfranqdg] = analfranquia === 'M';
      valuesinvisible[posvlrfranqdg] = analfranquia === 'M';

      valuesinvisible[posfranqgf] = analfranquia === 'M';
      valuesinvisible[posvlrfranqgf] = analfranquia === 'M';

      valuesinvisible[posfranqgfc] = analfranquia === 'M';
      valuesinvisible[posvlrfranqgfc] = analfranquia === 'M';
    }
    setValuesinvisible([...valuesinvisible]);
  }, [valuesfield[valuesname.indexOf('tipofranquia')], valuesfield[valuesname.indexOf('analfranquia')]]);

  useEffect(() => {
    // Listar os contatos do cliente selecionado
    let valor = valuesfield[valuesname.indexOf('codcli')];
    if (fields.length > 0 && valor !== '') {
      const index = fields.findIndex((element) => element.namefield === 'contato');
      fields[index].filteraux = " AND TB01128_TIPO = 0 AND TB01128_CODCLI = '" + valor + "' ";
      setFields([...fields]);
    }
  }, [valuesfield[valuesname.indexOf('codcli')]]);

  useEffect(() => {
    // Colocar o status inicial na inclusão

    const posstatus = valuesname.indexOf('status');
    const poscontrato = valuesname.indexOf('contrato');
    const valorstatus = valuesfield[valuesname.indexOf('status')];
    const codcli = valuesfield[valuesname.indexOf('codcli')];

    valuesinvisible[poscontrato] = true;
    setValuesinvisible([...valuesinvisible]);
    let valor = valuesfield[valuesname.indexOf('tipopre')];
    if (valor !== undefined) {
      if (valor !== '' && valor.length === 4) {
        apiFind('PrecontratoTipo', '*', '', "TB01138_CODIGO = '" + valor + "' ").then((response) => {
          if (response.status === 200) {
            if (valorstatus === '') {
              valuesfield[posstatus] = response.data.statusinicial;
              setValuesfield([...valuesfield]);
            }
            const operacao = response.data.operacao;
            valuesinvisible[poscontrato] = operacao === 'C' || operacao === undefined;
            setValuesinvisible([...valuesinvisible]);
            fields[poscontrato].filteraux = " AND TB02111_CODCLI = '" + codcli + "' ";
            setFields([...fields]);
          }
        });
      }
    }
  }, [valuesfield[valuesname.indexOf('tipopre')], valuesfield[valuesname.indexOf('codcli')]]);

  useEffect(() => {
    // Obtendo informações do Contrato
    let valor = valuesfield[valuesname.indexOf('contrato')];
    let posfrantotal = valuesname.indexOf('franqtotal');
    let posvlrfranqtotal = valuesname.indexOf('vlrfranqtotal');
    let posfranqpb = valuesname.indexOf('franqpb');
    let posvlrfranqpb = valuesname.indexOf('vlrfranqpb');
    let posfranqcolor = valuesname.indexOf('franqcolor');
    let posvlrfranqcolor = valuesname.indexOf('vlrfranqcolor');
    let posfranqdg = valuesname.indexOf('franqdg');
    let posvlrfranqdg = valuesname.indexOf('vlrfranqdg');
    let posfranqgf = valuesname.indexOf('franqgf');
    let posvlrfranqgf = valuesname.indexOf('vlrfranqgf');
    let posfranqgfc = valuesname.indexOf('franqgfc');
    let posvlrfranqgfc = valuesname.indexOf('vlrfranqgfc');
    let postipofranquia = valuesname.indexOf('tipofranquia');
    let posanalfranquia = valuesname.indexOf('analfranquia');
    let poscodemp = valuesname.indexOf('codemp');
    let poscodemp2 = valuesname.indexOf('codemp2');
    let posdtinicio = valuesname.indexOf('dtinicio');
    let posdtvenc = valuesname.indexOf('venccontr');
    let posduracao = valuesname.indexOf('duracao');
    let posdiavenc = valuesname.indexOf('diavenc');
    let poscodven = valuesname.indexOf('codven');
    if (fields.length > 0 && valor !== '') {
      apiFind('Contrato', '*', '', "TB02111_CODIGO = '" + valor + "' ").then((response) => {
        if (response.status === 200) {
          if (!valuesfield[posfrantotal]) valuesfield[posfrantotal] = response.data.frantotal;
          if (!valuesfield[posvlrfranqtotal]) valuesfield[posvlrfranqtotal] = response.data.vlrfranqtotal;
          if (!valuesfield[posfranqpb]) valuesfield[posfranqpb] = response.data.franqpb;
          if (!valuesfield[posvlrfranqpb]) valuesfield[posvlrfranqpb] = response.data.vlrnotapb;
          if (!valuesfield[posfranqcolor]) valuesfield[posfranqcolor] = response.data.franqcolor;
          if (!valuesfield[posvlrfranqcolor]) valuesfield[posvlrfranqcolor] = response.data.vlrnotacl;
          if (!valuesfield[posfranqdg]) valuesfield[posfranqdg] = response.data.franqdg;
          if (!valuesfield[posvlrfranqdg]) valuesfield[posvlrfranqdg] = response.data.vlrnotadg;
          if (!valuesfield[posfranqgf]) valuesfield[posfranqgf] = response.data.franqgf;
          if (!valuesfield[posvlrfranqgf]) valuesfield[posvlrfranqgf] = response.data.vlrnotagf;
          if (!valuesfield[posfranqgfc]) valuesfield[posfranqgfc] = response.data.franqgfc;
          if (!valuesfield[posvlrfranqgfc]) valuesfield[posvlrfranqgfc] = response.data.vlrnotagfc;
          if (!valuesfield[postipofranquia]) valuesfield[postipofranquia] = response.data.tipofranquia;
          if (!valuesfield[posanalfranquia]) valuesfield[posanalfranquia] = response.data.analfranquia;
          if (!valuesfield[poscodemp]) valuesfield[poscodemp] = response.data.codemp;
          if (!valuesfield[poscodemp2]) valuesfield[poscodemp2] = response.data.codemp2;
          if (!valuesfield[posduracao]) valuesfield[posduracao] = response.data.duracao;
          if (!valuesfield[posdiavenc]) valuesfield[posdiavenc] = response.data.diavenc;
          if (!valuesfield[poscodven]) valuesfield[poscodven] = response.data.vend;
          if (!valuesfield[posdtinicio]) {
            try {
              const dt1 =
                response.data.dtinicio.substring(3, 5) +
                '/' +
                response.data.dtinicio.substring(0, 2) +
                '/' +
                response.data.dtinicio.substring(6, 10);
              const datafim = new Date(dt1);
              valuesfield[posdtinicio] = datafim;
            } catch (error) {
              console.log(error);
            }
          }
          if (!valuesfield[posdtvenc]) {
            try {
              const dt2 =
                response.data.venccontr.substring(3, 5) +
                '/' +
                response.data.venccontr.substring(0, 2) +
                '/' +
                response.data.venccontr.substring(6, 10);
              const datafim2 = new Date(dt2);
              valuesfield[posdtvenc] = datafim2;
            } catch (error) {
              console.log(error);
            }
          }
          setValuesfield([...valuesfield]);
        }
      });
    }
  }, [valuesfield[valuesname.indexOf('contrato')]]);

  useEffect(() => {
    if (
      valuesfield[valuesname.indexOf('duracao')] !== undefined &&
      valuesfield[valuesname.indexOf('duracao')] !== '' &&
      valuesfield[valuesname.indexOf('duracao')] !== null
    ) {
      const duracao = parseInt(valuesfield[valuesname.indexOf('duracao')]);
      const dtinicio = valuesfield[valuesname.indexOf('dtinicio')];
      if (dtinicio !== undefined && dtinicio !== '' && dtinicio !== null) {
        const tmdata1 = Date.parse(dtinicio);
        const data = new Date(tmdata1);
        valuesfield[valuesname.indexOf('venccontr')] = addMonths(data, duracao);
      }
    }
  }, [valuesfield[valuesname.indexOf('duracao')], valuesfield[valuesname.indexOf('dtinicio')]]);

  return (
    <React.Fragment>
      <Infor
        title="Pré-Contratos"
        table="TB02264"
        object="VW02280"
        classname="Precontrato"
        classobject="PrecontratoVW"
        termlist="Pré-Contratos"
        moduleoption="10"
        address={false}
        primarykey="CODIGO"
        autoincrement={true}
        disabled={disabled}
        setDisabled={(data) => setDisabled(data)}
        showinfor={showinfor}
        setShowinfor={(data) => setShowinfor(data)}
        rowselect={rowselect}
        setRowselect={(data) => setRowselect(data)}
        valuesfield={valuesfield}
        setValuesfield={(data) => setValuesfield(data)}
        valuesfield2={valuesfield2}
        setValuesfield2={(data) => setValuesfield2(data)}
        valuesdisable={valuesdisable}
        setValuesdisable={(data) => setValuesdisable(data)}
        valuesinvisible={valuesinvisible}
        setValuesinvisible={(data) => setValuesinvisible(data)}
        valuesname={valuesname}
        setValuesname={(data) => setValuesname(data)}
        valuesrequired={valuesrequired}
        setValuesrequired={(data) => setValuesrequired(data)}
        valuesindex={valuesindex}
        setValuesindex={(data) => setValuesindex(data)}
        fields={fields}
        setFields={(data) => setFields(data)}
        valuesaddress={valuesaddress}
        setValuesaddress={(data) => setValuesaddress(data)}
        valuesaddressdisable={valuesaddressdisable}
        setValuesaddressdisable={(data) => setValuesaddressdisable(data)}
        valuesaddressname={valuesaddressname}
        setValuesaddressname={(data) => setValuesaddressname(data)}
        valuesaddressrequired={valuesaddressrequired}
        setValuesaddressrequired={(data) => setValuesaddressrequired(data)}
        actions={actions}
        setActions={(data) => setActions(data)}
        openmodal={openmodal}
        setOpenmodal={(data) => setOpenmodal(data)}
        fieldsauto={fieldsauto}
        setFieldsauto={(data) => setFieldsauto(data)}
        onupdate={onupdate}
        setOnupdate={(data) => setOnupdate(data)}
        events={events}
        setEvents={(data) => setEvents(data)}
      />
      <Modal backdrop="static" size="lg" show={showwfluxo} centered={true} onHide={handleClosefluxo}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-zap h1'} />
          &nbsp;Definição de Fluxo
        </Modal.Header>
        <ModalBody>
          <StatusFluxo
            precontrato={valuesfield[valuesname.indexOf('codigo')]}
            showwfluxo={showwfluxo}
            setShowfluxo={(data) => setShowfluxo(data)}
            cabecalho={valuesfield}
            setCabecalho={(data) => setValuesfield(data)}
            cabecalho2={valuesfield2}
            setCabecalho2={(data) => setValuesfield2(data)}
            valuesname={valuesname}
            setValuesname={(data) => setValuesname(data)}
          ></StatusFluxo>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="xl" show={showhist} centered={true} onHide={handleClosehist}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-list h1'} />
          &nbsp;Histórico de Atendimento
        </Modal.Header>
        <ModalBody>
          <StatusHistorico
            precontrato={valuesfield[valuesname.indexOf('codigo')]}
            showhist={showhist}
            setShowhist={(data) => setShowhist(data)}
          ></StatusHistorico>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="xl" show={showinforpre} centered={true} onHide={handleCloseinfopre}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-info'} />
          &nbsp;Informaçoes do Pré-Contrato
        </Modal.Header>
        <ModalBody>
          {dtgerado === undefined || dtgerado === null ? (
            <PreContratoInformacoes
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesname={valuesname}
              setValuesname={(data) => setValuesname(data)}
            ></PreContratoInformacoes>
          ) : (
            <ContratoInformacoes
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesname={valuesname}
              setValuesname={(data) => setValuesname(data)}
            ></ContratoInformacoes>
          )}
        </ModalBody>
      </Modal>
      <div
        className={`modal fade ${processando ? 'show d-block' : ''}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content text-center p-4">
            <div className="modal-body">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="sr-only">Carregando...</span>
              </div>
              <h5 className="modal-title mb-2">Processando item...</h5>
              <p>
                <strong>Processando: {itemprocessa}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InforPrecontrato;
