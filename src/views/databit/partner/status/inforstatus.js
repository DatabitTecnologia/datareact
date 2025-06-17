import React, { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import Infor from '../../cadastro/infor';
import PartnerStatusColor from './color';
import PartnerWorkflow from './workflow';
import PartnerNotificacao from './notificacao';
import PartnerUser from './user';

const InforPartnerStatus = (props) => {
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
  const [events, setEvents] = React.useState([]);

  const [showworkflow, setShowworkflow] = useState(false);
  const [showwuser, setShowuser] = useState(false);
  const [showwcolor, setShowcolor] = useState(false);
  const [showwnot, setShownot] = useState(false);

  useEffect(() => {
    setActions([
      {
        id: 'btnWorkflow',
        method: () => Workflow(),
        classicon: 'feather icon-share-2',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Workflow'
      },
      {
        id: 'btnUsuarios',
        method: () => Usuarios(),
        classicon: 'feather icon-user-check',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Usuários'
      },
      {
        id: 'btnNotificacao',
        method: () => Notificacao(),
        classicon: 'feather icon-bell',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Notificações'
      },
      {
        id: 'btnColor',
        method: () => Color(),
        classicon: 'feather icon-command',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Color'
      }
    ]);
  }, []);

  const Workflow = () => {
    setShowworkflow(true);
  };

  const handleCloseworkflow = () => {
    setShowworkflow(false);
  };

  const Usuarios = () => {
    setShowuser(true);
  };

  const handleCloseuser = () => {
    setShowuser(false);
  };

  const Color = () => {
    setShowcolor(true);
  };

  const handleClosecolor = () => {
    setShowcolor(false);
  };

  const Notificacao = () => {
    setShownot(true);
  };

  const handleClosenot = () => {
    setShownot(false);
  };

  useEffect(() => {
    // Habilitar o campo de serviço e operação quando for o tipo concluido
    let valor = parseInt(valuesfield[valuesname.indexOf('tipo')]);
    let posoperacao = valuesname.indexOf('tipodesc');
    let posservico = valuesname.indexOf('codserv');
    let poscodemp = valuesname.indexOf('codemp');
    let poscodven = valuesname.indexOf('codven');
    let poscondpag = valuesname.indexOf('condpag');
    let posstatusvev = valuesname.indexOf('statusven');
    let poscontador = valuesname.indexOf('operacao');
    let posservcontr = valuesname.indexOf('servcontr');

    valuesdisable[posoperacao] = parseInt(valor) === 0;
    valuesdisable[posservico] = parseInt(valor) === 0;
    valuesdisable[poscodemp] = parseInt(valor) === 0;
    valuesdisable[poscodven] = parseInt(valor) === 0;
    valuesdisable[poscondpag] = parseInt(valor) === 0;
    valuesdisable[posstatusvev] = parseInt(valor) === 0;
    valuesdisable[poscontador] = parseInt(valor) === 0;
    valuesdisable[posservcontr] = parseInt(valor) === 0;
    setValuesdisable([...valuesdisable]);
  }, [valuesfield, disabled]);

  return (
    <React.Fragment>
      <Infor
        title="Status de Compras"
        table="TB01148"
        object="VW01135"
        classname="PartnerStatus"
        classobject="PartnerStatusVW"
        termlist="Status de Compras"
        moduleoption="20"
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
      />
      <Modal backdrop="static" size="xl" show={showworkflow} centered={true} onHide={handleCloseworkflow}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-share-2 h1'} />
          &nbsp;Definição de Fluxos (Workflow)
        </Modal.Header>
        <ModalBody>
          <PartnerWorkflow statusselec={valuesfield[valuesname.indexOf('codigo')]}></PartnerWorkflow>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="xl" show={showwuser} centered={true} onHide={handleCloseuser}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-user-check h1'} />
          &nbsp;Definição de Usuários
        </Modal.Header>
        <ModalBody>
          <PartnerUser statusselec={valuesfield[valuesname.indexOf('codigo')]}></PartnerUser>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="xl" show={showwnot} centered={true} onHide={handleClosenot}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-bell'} />
          &nbsp;Notificação para Usuários
        </Modal.Header>
        <ModalBody>
          <PartnerNotificacao statusselec={valuesfield[valuesname.indexOf('codigo')]}></PartnerNotificacao>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="lg" show={showwcolor} centered={true} onHide={handleClosecolor}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-command h1'} />
          &nbsp;Cor do Status
        </Modal.Header>
        <ModalBody>
          <PartnerStatusColor
            statusselec={valuesfield[valuesname.indexOf('codigo')]}
            showwcolor={showwcolor}
            setShowcolor={(data) => setShowcolor(data)}
          ></PartnerStatusColor>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforPartnerStatus;
