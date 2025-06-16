import React, { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import Infor from '../cadastro/infor';
import { Decode64 } from '../../../utils/crypto';
import { apiFind } from '../../../api/crudapi';
import OportunidadeProposta from './proposta';
import OportunidadeItem from './item';
import StatusFluxo from './status/fluxo';
import StatusHistorico from './status/historico';

const InforOportunidade = (props) => {
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

  const [valuesaddress, setValuesaddress] = React.useState([]);
  const [valuesaddressdisable, setValuesaddressdisable] = React.useState([]);
  const [valuesaddressname, setValuesaddressname] = React.useState([]);
  const [valuesaddressrequired, setValuesaddressrequired] = React.useState([]);
  const [actions, setActions] = React.useState([]);

  const [openmodal, setOpenmodal] = React.useState(props.openmodal);
  const [fieldsauto, setFieldsauto] = React.useState(props.fieldsauto);

  const [opselec, setOpselec] = React.useState(0);

  const [showproposta, setShowproposta] = useState(false);
  const [showwfluxo, setShowfluxo] = useState(false);
  const [showhist, setShowhist] = useState(false);
  const [events, setEvents] = React.useState([]);
  const { dateevent, setDateevent } = props;

  useEffect(() => {
    setActions([
      {
        id: 'btnProposta',
        method: () => Proposta(),
        classicon: 'feather icon-file-text',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Proposta'
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
    ]);
  }, []);

  useEffect(() => {
    if (valuesfield !== undefined && valuesfield.length > 0) {
      let statusatual = valuesfield[valuesname.indexOf('status')];
      apiFind('OportunidadeStatus', '*', '', "TB01129_CODIGO = '" + statusatual + "' ").then((response) => {
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
                  addToast('Não é permitido excluir esta Oportunidade com este STATUS !', {
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
              id: 'ValidaPreDelete',
              type: 3, // Before Delete
              method: function () {
                // Validação do Precontrato preenchido
                if (valuesfield !== undefined && valuesfield.length > 0) {
                  let precontrato = valuesfield[valuesname.indexOf('pre')];
                  if (precontrato !== '' && precontrato !== undefined) {
                    addToast('Não é permitido excluir esta Oportunidade, pois já foi gerado o Pré-Contrato ' + precontrato, {
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
                  addToast('Não é permitido editar esta Oportunidade com este STATUS !', {
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
              id: 'ValidaPreUpdate',
              type: 5, // Before Update
              method: function () {
                // Validação do Precontrato preenchido
                if (valuesfield !== undefined && valuesfield.length > 0) {
                  let precontrato = valuesfield[valuesname.indexOf('pre')];
                  if (precontrato !== '' && precontrato !== undefined) {
                    addToast('Não é permitido alterar esta Oportunidade, pois já foi gerado o Pré-Contrato ' + precontrato, {
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
            }
          ]);
        }
      });
    }
  }, [valuesfield]);

  useEffect(() => {
    // Preencher os campos Default do módulo
    let posdata = valuesname.indexOf('data');
    let posprevisao = valuesname.indexOf('previsao');
    let posusuario = valuesname.indexOf('user');
    let data = new Date();
    if (valuesfield[posdata] === undefined || valuesfield[posdata] === null || valuesfield[posdata] === '') {
      valuesfield[posdata] = data;
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

    if (valuesfield[valuesname.indexOf('codigo')] !== undefined) {
      apiFind(
        'OportunidadeVW',
        'TB02255_CODIGO,TB02255_CODCLI',
        'TB01133_OPERACAO as operacao',
        " TB02255_CODIGO = '" + valuesfield[valuesname.indexOf('codigo')] + "' "
      ).then((response) => {
        if (response.status === 200) {
          setOpselec(response.data.operacao);
        }
      });
    }
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
    console.log(valuesfield[valuesname.indexOf('tipo')]);
    let posativo = valuesname.indexOf('codcli');
    let posprospect = valuesname.indexOf('codprospect');
    let valor = parseInt(valuesfield[valuesname.indexOf('tipo')]);
    if (valor === 0) {
      valuesinvisible[posativo] = false;
      valuesinvisible[posprospect] = true;
    } else {
      valuesinvisible[posativo] = true;
      valuesinvisible[posprospect] = false;
    }
    setValuesinvisible([...valuesinvisible]);
  }, [valuesfield[valuesname.indexOf('tipo')]]);

  useEffect(() => {
    // Listar os contatos do cliente selecionado
    let valor = valuesfield[valuesname.indexOf('codcli')];
    if (valor !== undefined) {
      if (fields.length > 0 && valor !== '') {
        const index = fields.findIndex((element) => element.namefield === 'contato');
        fields[index].filteraux = " AND TB01128_TIPO = 0 AND TB01128_CODCLI = '" + valor + "' ";
        setFields([...fields]);
      }
    }
  }, [valuesfield[valuesname.indexOf('codcli')]]);

  useEffect(() => {
    // Listar os contatos do propspect selecionado
    let valor = valuesfield[valuesname.indexOf('codprospect')];
    if (valor !== undefined) {
      if (fields.length > 0 && valor !== '') {
        const index = fields.findIndex((element) => element.namefield === 'contato');
        fields[index].filteraux = " AND TB01128_TIPO = 1 AND TB01128_CODPROSPECT = '" + valor + "' ";
        setFields([...fields]);
      }
    }
  }, [valuesfield[valuesname.indexOf('codprospect')]]);

  useEffect(() => {
    // Colocar o status inicial na inclusão
    let valor = valuesfield[valuesname.indexOf('tipoop')];
    if (valor !== undefined) {
      if (valor !== '' && valor.length === 4) {
        let posstatus = valuesname.indexOf('status');
        let valorstatus = valuesfield[valuesname.indexOf('status')];
        if (valorstatus === '') {
          apiFind('OportunidadeTipo', '*', '', "TB01132_CODIGO = '" + valor + "' ").then((response) => {
            if (response.status === 200) {
              //console.log(response.data);
              valuesfield[posstatus] = response.data.statusinicial;
              setValuesfield([...valuesfield]);
            }
          });
        }
      }
    }
  }, [valuesfield[valuesname.indexOf('tipoop')]]);

  const Proposta = () => {
    setShowproposta(true);
  };

  const handleCloseproposta = () => {
    setShowproposta(false);
  };

  const Fluxo = () => {
    setShowfluxo(true);
  };

  const handleClosefluxo = () => {
    setShowfluxo(false);
  };

  const Hist = () => {
    setShowhist(true);
    //console.log(showhist);
  };

  const handleClosehist = () => {
    setShowhist(false);
  };

  return (
    <React.Fragment>
      <Infor
        title="Criação de Oportunidade"
        table="TB02255"
        object="VW02273"
        classname="Oportunidade"
        classobject="OportunidadeVW"
        termlist="Criação de Oportunidade"
        moduleoption="9"
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
      <Modal backdrop="static" size="xl" show={showproposta} centered={true} onHide={handleCloseproposta}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-file-text'} />
          &nbsp;Definição de Proposta
        </Modal.Header>
        <ModalBody>
          {opselec === 0 ? (
            <OportunidadeProposta
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesname={valuesname}
              setValuesname={(data) => setValuesname(data)}
            ></OportunidadeProposta>
          ) : (
            <OportunidadeItem
              disabled={disabled}
              setDisabled={(data) => setDisabled(data)}
              cabecalho={valuesfield}
              setCabecalho={(data) => setValuesfield(data)}
              valuesname={valuesname}
              setValuesname={(data) => setValuesname(data)}
            ></OportunidadeItem>
          )}
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="lg" show={showwfluxo} centered={true} onHide={handleClosefluxo}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-zap h1'} />
          &nbsp;Definição de Fluxo
        </Modal.Header>
        <ModalBody>
          <StatusFluxo
            oportunidade={valuesfield[valuesname.indexOf('codigo')]}
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
            oportunidade={valuesfield[valuesname.indexOf('codigo')]}
            showhist={showhist}
            setShowhist={(data) => setShowhist(data)}
          ></StatusHistorico>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforOportunidade;
