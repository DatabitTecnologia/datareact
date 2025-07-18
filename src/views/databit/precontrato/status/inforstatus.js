import React, { useEffect, useState } from 'react';
import Infor from '../../cadastro/infor';
import { Modal, ModalBody } from 'react-bootstrap';
import PreContratoUser from './user';
import PreContratoWorkflow from './workflow';
import StatusColor from './color';
import PreContratoNotificacao from './notificacao';

const InforPrecontratoStatus = (props) => {
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
  const [openmodal, setOpenmodal] = React.useState(props.openmodal);
  const [fieldsauto, setFieldsauto] = React.useState(props.fieldsauto);

  const [valuesaddress, setValuesaddress] = React.useState([]);
  const [valuesaddressdisable, setValuesaddressdisable] = React.useState([]);
  const [valuesaddressname, setValuesaddressname] = React.useState([]);
  const [valuesaddressrequired, setValuesaddressrequired] = React.useState([]);
  const [actions, setActions] = React.useState([]);

  const [showworkflow, setShowworkflow] = useState(false);
  const [showwuser, setShowuser] = useState(false);
  const [showwcolor, setShowcolor] = useState(false);
  const [showwnot, setShownot] = useState(false);
  const [events, setEvents] = React.useState([]);

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

  return (
    <React.Fragment>
      <Infor
        title="Status de Pré-Contratos"
        table="TB01136"
        object="TB01136"
        classname="PrecontratoStatus"
        classobject="PrecontratoStatus"
        termlist="Status de Pré-Contratos"
        moduleoption="11"
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
      <Modal backdrop="static" size="xl" show={showworkflow} centered={true} onHide={handleCloseworkflow}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-share-2'} />
          &nbsp;Definição de Fluxos (Workflow)
        </Modal.Header>
        <ModalBody>
          <PreContratoWorkflow statusselec={valuesfield[valuesname.indexOf('codigo')]}></PreContratoWorkflow>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="xl" show={showwuser} centered={true} onHide={handleCloseuser}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-user-check'} />
          &nbsp;Definição de Usuários
        </Modal.Header>
        <ModalBody>
          <PreContratoUser statusselec={valuesfield[valuesname.indexOf('codigo')]}></PreContratoUser>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="xl" show={showwnot} centered={true} onHide={handleClosenot}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-bell'} />
          &nbsp;Notificação para Usuários
        </Modal.Header>
        <ModalBody>
          <PreContratoNotificacao statusselec={valuesfield[valuesname.indexOf('codigo')]}></PreContratoNotificacao>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="lg" show={showwcolor} centered={true} onHide={handleClosecolor}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-command h1'} />
          &nbsp;Cor do Status
        </Modal.Header>
        <ModalBody>
          <StatusColor
            statusselec={valuesfield[valuesname.indexOf('codigo')]}
            showwcolor={showwcolor}
            setShowcolor={(data) => setShowcolor(data)}
          ></StatusColor>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforPrecontratoStatus;
