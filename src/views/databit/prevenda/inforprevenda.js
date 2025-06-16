import React, { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import Infor from '../cadastro/infor';
import { apiFind, apiExec } from '../../../api/crudapi';
import {
  columnsitem,
  fieldscab,
  fieldsitem,
  fieldslanc,
  fieldsimp,
  fieldsarredonda,
  columnsserv,
  fieldsimpserv,
  fieldsarredondaserv,
  columnspar,
  fieldspar
} from './fields';
import { validateStatus, validateOrcamento, exclusaoItens, exclusaoServ, exclusaoPar } from './events/cabecalho';
import { validateStatusItem, validateOrcamentoItem } from './events/item';
import { validateStatusServ, validateOrcamentoServ } from './events/servico';
import { validateStatusPar, validateOrcamentoPar } from './events/parcela';
import { Decode64 } from '../../../utils/crypto';
import StatusFluxo from './status/fluxo';
import StatusHistorico from './status/historico';
import { atualizaPreco } from '../movimentacao/atualiza';

const InforPrevenda = (props) => {
  const { showinfor, setShowinfor } = props;
  const { rowselect, setRowselect } = props;
  const { onupdate, setOnupdate } = props;

  const { addToast } = useToasts();

  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [valuesinvisible, setValuesinvisible] = React.useState([]);
  const [valuesname, setValuesname] = React.useState([]);
  const [valuesrequired, setValuesrequired] = React.useState([]);
  const [valuesindex, setValuesindex] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);

  const [valuesaddress, setValuesaddress] = React.useState([]);
  const [valuesaddressdisable, setValuesaddressdisable] = React.useState([]);
  const [valuesaddressname, setValuesaddressname] = React.useState([]);
  const [valuesaddressrequired, setValuesaddressrequired] = React.useState([]);
  const [actions, setActions] = React.useState([]);
  const [valuesbefore, setValuesbefore] = React.useState([]);
  const [valuesafter, setValuesafter] = React.useState([]);
  const [refreshprice, setRefreshprice] = React.useState(false);
  const [processando, setProcessando] = React.useState(false);
  const [itemAtual, setItematual] = React.useState(null);

  const [openmodal, setOpenmodal] = React.useState(props.openmodal);
  const [fieldsauto, setFieldsauto] = React.useState(props.fieldsauto);

  const [showwfluxo, setShowfluxo] = useState(false);
  const [showhist, setShowhist] = useState(false);

  const [events, setEvents] = React.useState([]);
  const [eventsitem, setEventsitem] = React.useState([]);
  const [eventsserv, setEventsserv] = React.useState([]);
  const [eventspar, setEventspar] = React.useState([]);
  const { dateevent, setDateevent } = props;

  useEffect(() => {
    setActions([
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
    ]);
  }, []);

  useEffect(() => {
    if (!valuesfield || valuesfield.length === 0) return;

    const statusatual = valuesfield[valuesname.indexOf('status')];
    const codigo = valuesfield[valuesname.indexOf('codigo')];

    const fetchEvents = async () => {
      try {
        // Chamando ambos os métodos de forma assíncrona
        const statusPromise = validateStatus(statusatual);
        const orcamentoPromise = validateOrcamento(codigo);
        const statusitemPromise = validateStatusItem(statusatual);
        const orcamentoitemPromise = validateOrcamentoItem(codigo);
        const exclusaoItensPromisse = exclusaoItens(codigo, setProcessando, setItematual);
        const statusservPromise = validateStatusServ(statusatual);
        const orcamentoservPromise = validateOrcamentoServ(codigo);
        const exclusaoServPromisse = exclusaoServ(codigo, setProcessando, setItematual);
        const statussparPromise = validateStatusPar(statusatual);
        const orcamentoparPromise = validateOrcamentoPar(codigo);
        const exclusaoParPromisse = exclusaoPar(codigo, setProcessando, setItematual);

        // Aguarda ambas as promessas serem resolvidas
        const [
          statusResponse,
          orcamentoResponse,
          statusitemResponse,
          orcamentoitemResponse,
          exclusaoItensResponse,
          statusservResponse,
          orcamentoservResponse,
          exclusaoServResponse,
          statusparResponse,
          orcamentoparResponse,
          exclusaoParResponse
        ] = await Promise.all([
          statusPromise,
          orcamentoPromise,
          statusitemPromise,
          orcamentoitemPromise,
          exclusaoItensPromisse,
          statusservPromise,
          orcamentoservPromise,
          exclusaoServPromisse,
          statussparPromise,
          orcamentoparPromise,
          exclusaoParPromisse
        ]);
        // Combina os resultados (removendo valores nulos/vazios)
        const mergedEvents = [
          ...(statusResponse || []),
          ...(orcamentoResponse || []),
          ...(exclusaoItensResponse || []),
          ...(exclusaoServResponse || []),
          ...(exclusaoParResponse || [])
        ];
        const mergedEventsItem = [...(statusitemResponse || []), ...(orcamentoitemResponse || [])];
        const mergedEventsServ = [...(statusservResponse || []), ...(orcamentoservResponse || [])];
        const mergedEventsPar = [...(statusparResponse || []), ...(orcamentoparResponse || [])];

        // Atualiza os eventos apenas se houver dados
        if (mergedEvents.length > 0) {
          setEvents(mergedEvents);
        }
        if (mergedEventsItem.length > 0) {
          setEventsitem(mergedEventsItem);
        }
        if (mergedEventsServ.length > 0) {
          setEventsserv(mergedEventsServ);
        }
        if (mergedEventsPar.length > 0) {
          setEventspar(mergedEventsPar);
        }
      } catch (error) {
        console.log('Erro ao buscar eventos:', error);
      }
    };
    fetchEvents();
  }, [valuesfield]);

  useEffect(() => {
    // Preencher os campos Default do módulo
    let posdata = valuesname.indexOf('data');
    let posdtent = valuesname.indexOf('dtent');
    let posprevisao = valuesname.indexOf('previsao');
    let posusuario = valuesname.indexOf('user');
    let data = new Date();
    if (valuesfield[posdata] === undefined || valuesfield[posdata] === null || valuesfield[posdata] === '') {
      valuesfield[posdata] = data;
    }
    if (valuesfield[posdtent] === undefined || valuesfield[posdtent] === null || valuesfield[posdtent] === '') {
      valuesfield[posdtent] = data;
    }
    if (valuesfield[posprevisao] === undefined || valuesfield[posprevisao] === null || valuesfield[posprevisao] === '') {
      valuesfield[posprevisao] = data;
    }
    if (valuesfield[posusuario] === undefined || valuesfield[posusuario] === null || valuesfield[posusuario] === '') {
      valuesfield[posusuario] = Decode64(sessionStorage.getItem('user'));
    }
    if (dateevent !== undefined) {
      valuesfield[posprevisao] = dateevent;
    }
    setValuesfield([...valuesfield]);
  }, [valuesfield[valuesname.indexOf('codigo')]]);

  useEffect(() => {
    // Habilitar o campo de usuário quando o proprietário não é o mesmo usuário
    let valor = valuesfield[valuesname.indexOf('proprietario')];
    let posusuario = valuesname.indexOf('user');
    valuesdisable[posusuario] = parseInt(valor) === 0;
    setValuesdisable([...valuesdisable]);
  }, [valuesfield[valuesname.indexOf('proprietario')]]);

  useEffect(() => {
    // Validação de tipo de cliente
    let posativo = valuesname.indexOf('codcli');
    let posprospect = valuesname.indexOf('codprospect');
    let valor = parseInt(valuesfield[valuesname.indexOf('tipocli')]);
    if (!disabled) {
      if (valor === 0) {
        valuesdisable[posativo] = false;
        valuesdisable[posprospect] = true;
      } else {
        valuesdisable[posativo] = true;
        valuesdisable[posprospect] = false;
      }
    } else {
      valuesdisable[posativo] = true;
      valuesdisable[posprospect] = true;
    }
    setValuesdisable([...valuesdisable]);
  }, [valuesfield[valuesname.indexOf('tipocli')], disabled]);

  useEffect(() => {
    // Listar os contatos do cliente selecionado
    let valor = valuesfield[valuesname.indexOf('codcli')];
    if (fields.length > 0 && valor !== '') {
      const index = fields.findIndex((element) => element.namefield === 'contato');
      fields[index].filteraux = " AND TB01128_TIPO = 0 AND TB01128_CODCLI = '" + valor + "' ";
      setFields([...fields]);
    }
  }, [valuesfield[valuesname.indexOf('codcli')], disabled]);

  useEffect(() => {
    // TRatamento de Venda pra consumo
    const poscli = valuesname.indexOf('codcli');
    const codcli = valuesfield[poscli];
    const disablecli = valuesdisable[poscli];

    const posvendacons = valuesname.indexOf('vendacons');

    if (fields.length > 0 && codcli !== '' && codcli !== undefined && codcli.length === 8 && !disablecli && !disabled) {
      apiFind('Cliente', 'TB01008_INSCEST,TB01008_NAOCONTRIBUINTE', '', "TB01008_CODIGO = '" + codcli + "' ").then((response) => {
        if (response.status === 200) {
          const resultcli = response.data;
          const naocontribuinte =
            resultcli.inscest === null || resultcli.inscest === '' || resultcli.inscest === 'ISENTO' || resultcli.naocontribuinte === 'S';
          if (!naocontribuinte) {
            valuesdisable[posvendacons] = true;
            setValuesdisable([...valuesdisable]);
            valuesfield[posvendacons] = 'N';
            setValuesfield([...valuesfield]);
          } else {
            valuesdisable[posvendacons] = false;
            setValuesdisable([...valuesdisable]);
            valuesfield[posvendacons] = 'S';
            setValuesfield([...valuesfield]);
          }
        }
      });
    }
  }, [valuesfield[valuesname.indexOf('codcli')], disabled]);

  useEffect(() => {
    // Listar os contatos do propspect selecionado
    let valor = valuesfield[valuesname.indexOf('codprospect')];
    if (fields.length > 0 && valor !== '') {
      const index = fields.findIndex((element) => element.namefield === 'contato');
      fields[index].filteraux = " AND TB01128_TIPO = 1 AND TB01128_CODPROSPECT = '" + valor + "' ";
      setFields([...fields]);
    }
  }, [valuesfield[valuesname.indexOf('codprospect')]]);

  useEffect(() => {
    // Colocar o status inicial na inclusão
    let valor = valuesfield[valuesname.indexOf('tipo')];
    if (valor !== undefined && valor !== null) {
      if (valor !== '' && valor.length === 4) {
        let posstatus = valuesname.indexOf('status');
        let valorstatus = valuesfield[valuesname.indexOf('status')];
        if (valorstatus === '') {
          apiFind('PrevendaTipo', '*', '', "TB01160_CODIGO = '" + valor + "' ").then((response) => {
            if (response.status === 200) {
              valuesfield[posstatus] = response.data.statusinicial;
              setValuesfield([...valuesfield]);
            }
          });
        }
      }
    }
  }, [valuesfield[valuesname.indexOf('tipo')]]);

  useEffect(() => {
    reprocessarPreco(valuesbefore, valuesafter);
  }, [valuesafter]);

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

  const reprocessarPreco = async (valuesbefore, valuesafter) => {
    if (valuesbefore !== undefined && valuesbefore.length > 0 && valuesafter !== undefined && valuesafter.length > 0) {
      const codigo = valuesbefore[valuesname.indexOf('codigo')];

      const codclibefore = valuesbefore[valuesname.indexOf('codcli')];
      const codcliafter = valuesafter[valuesname.indexOf('codcli')];

      const tipoclibefore = valuesbefore[valuesname.indexOf('tipocli')];
      const tipocliafter = valuesafter[valuesname.indexOf('tipocli')];

      const condpagbefore = valuesbefore[valuesname.indexOf('condpag')];
      const condpagafter = valuesafter[valuesname.indexOf('condpag')];

      const tipobefore = valuesbefore[valuesname.indexOf('tipo')];
      const tipoafter = valuesafter[valuesname.indexOf('tipo')];

      const vendaconsbefore = valuesbefore[valuesname.indexOf('vendacons')];
      const vendaconsafter = valuesafter[valuesname.indexOf('vendacons')];

      if (
        codclibefore !== codcliafter ||
        tipoclibefore !== tipocliafter ||
        condpagbefore !== condpagafter ||
        tipobefore !== tipoafter ||
        vendaconsbefore !== vendaconsafter
      ) {
        const responsecab = await apiFind('Prevenda', '*', '', "TB02303_CODIGO = '" + codigo + "' ");
        if (responsecab.status === 200) {
          const cabecalho = responsecab.data;
          const responseitens = await apiExec("exec SP02302 'TB02304', '" + cabecalho.codigo + "' ", 'S');
          const itens = responseitens.data;
          setProcessando(true);
          await atualizaPreco('TB02303', cabecalho, 'PrevendaItem', 'codcli', 'TB01008', 'S', 0, 'C', itens, setItematual);
          setProcessando(false);
          setRefreshprice(true);
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Infor
        title="Controle de Pré-Vendas"
        table="TB02303"
        object="VW02317"
        classname="Prevenda"
        classobject="PrevendaVW"
        termlist="Pré-Vendas"
        moduleoption="26"
        address={false}
        primarykey="CODIGO"
        disabled={disabled}
        autoincrement={true}
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
        valuesbefore={valuesbefore}
        setValuesbefore={(data) => setValuesbefore(data)}
        valuesafter={valuesafter}
        setValuesafter={(data) => setValuesafter(data)}
        // Opções de Movimentação (Produtos)
        tableitem="TB02304"
        classitem="PrevendaItem"
        fieldscab={fieldscab}
        columnsitem={columnsitem}
        fieldsitem={fieldsitem}
        typeprice={0}
        fieldslanc={fieldslanc}
        fieldsimp={fieldsimp}
        fieldsarredonda={fieldsarredonda}
        entsai={'N'}
        coddest={'codcli'}
        tabdest={'TB01008'}
        typestock={'C'}
        contabil={'N'}
        eventsitem={eventsitem}
        setEventsitem={(data) => setEventsitem(data)}
        refreshprice={refreshprice}
        setRefreshprice={(data) => setRefreshprice(data)}
        // Opções de Movimentação (Serviços)
        tableserv={'TB02305'}
        classserv={'PrevendaServico'}
        columnsserv={columnsserv}
        fieldsimpserv={fieldsimpserv}
        fieldsarredondaserv={fieldsarredondaserv}
        eventsserv={eventsserv}
        setEventsserv={(data) => setEventsserv(data)}
        //  Opções de Movimentação (Parcelas)
        tablepar={'TB02307'}
        recalcpar={'SP02305'}
        classpar={'PrevendaParcela'}
        columnspar={columnspar}
        fieldspar={fieldspar}
        eventspar={eventspar}
        setEventspar={(data) => setEventspar(data)}
      />
      <Modal backdrop="static" size="lg" show={showwfluxo} centered={true} onHide={handleClosefluxo}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-zap h1'} />
          &nbsp;Definição de Fluxo
        </Modal.Header>
        <ModalBody>
          <StatusFluxo
            prevenda={valuesfield[valuesname.indexOf('codigo')]}
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
            prevenda={valuesfield[valuesname.indexOf('codigo')]}
            showhist={showhist}
            setShowhist={(data) => setShowhist(data)}
          ></StatusHistorico>
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
                <strong>
                  {itemAtual?.produto
                    ? `${itemAtual.produto} - ${itemAtual.nomeprod ?? ''}`
                    : itemAtual?.codserv
                    ? `${itemAtual.codserv} - ${itemAtual.nomeserv ?? ''}`
                    : itemAtual?.doc
                    ? `${itemAtual.doc} - ${itemAtual.nometipo ?? ''}`
                    : 'Aguarde...'}
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InforPrevenda;
