import React, { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import Infor from '../../cadastro/infor';
import OportunidadeTipoStatus from './status';

const InforOportunidadeTipo = (props) => {
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
  const [showstatus, setShowstatus] = useState(false);

  useEffect(() => {
    setActions([
      {
        id: 'btnStatus',
        method: () => Status(),
        classicon: 'feather icon-zap',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Status'
      }
    ]);
  }, []);

  useEffect(() => {
    if (fields.length > 0) {
      const index = fields.findIndex((element) => element.namefield === 'statusinicial');
      if (fields[index].filteraux === '') {
        fields[index].filteraux = " AND TB01129_INICIAL = 'S' ";
        setFields([...fields]);
      }
    }
  }, [fields]);

  const Status = () => {
    setShowstatus(true);
  };

  const handleCloseStatus = () => {
    setShowstatus(false);
  };

  return (
    <React.Fragment>
      <Infor
        title="Tipos de Oportunidades"
        table="TB01132"
        object="VW01127"
        classname="OportunidadeTipo"
        classobject="OportunidadeTipoVW"
        termlist="Tipos de Oportunidades"
        moduleoption="5"
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
        openmodal={openmodal}
        setOpenmodal={(data) => setOpenmodal(data)}
        fieldsauto={fieldsauto}
        setFieldsauto={(data) => setFieldsauto(data)}
        onupdate={onupdate}
        setOnupdate={(data) => setOnupdate(data)}
        events={events}
        setEvents={(data) => setEvents(data)}
      />
      <Modal backdrop="static" size="xl" show={showstatus} centered={true} onHide={handleCloseStatus}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-zap h1'} />
          &nbsp;Definição de Status
        </Modal.Header>
        <ModalBody>
          <OportunidadeTipoStatus tipo={valuesfield[valuesname.indexOf('codigo')]}></OportunidadeTipoStatus>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforOportunidadeTipo;
