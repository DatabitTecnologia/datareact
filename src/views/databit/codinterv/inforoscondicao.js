import React, { useEffect, useState } from 'react';
import Infor from '../cadastro/infor';
import CondicaoColor from './color';
import { Modal, ModalBody } from 'react-bootstrap';

const InforOsCondicao = (props) => {
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
  const [actions, setActions] = React.useState([]);

  const [valuesaddress, setValuesaddress] = React.useState([]);
  const [valuesaddressdisable, setValuesaddressdisable] = React.useState([]);
  const [valuesaddressname, setValuesaddressname] = React.useState([]);
  const [valuesaddressrequired, setValuesaddressrequired] = React.useState([]);

  const [openmodal, setOpenmodal] = React.useState(props.openmodal);
  const [fieldsauto, setFieldsauto] = React.useState(props.fieldsauto);
  const [events, setEvents] = React.useState([]);

  const [showwcolor, setShowcolor] = useState(false);
  

  useEffect(() => {
    const valor = valuesfield[valuesname.indexOf('reqpendente')];

    const posvend = valuesname.indexOf('vend');
    const posstatus = valuesname.indexOf('status');
    const posstatus2 = valuesname.indexOf('status2');
    const poscondicao = valuesname.indexOf('condpag');
    const posoperacao = valuesname.indexOf('tipodesc');

    if (!disabled) {
      valuesdisable[posvend] = valor === 'N';
      valuesdisable[posstatus] = valor === 'N';
      valuesdisable[posstatus2] = valor === 'N';
      valuesdisable[poscondicao] = valor === 'N';
      valuesdisable[posoperacao] = valor === 'N';
      setValuesaddressdisable([...valuesdisable]);
    }
  }, [valuesfield[valuesname.indexOf('reqpendente')], disabled]);

  useEffect(() => {
    const valor2 = valuesfield[valuesname.indexOf('osreinc')];
    const posstatusos = valuesname.indexOf('statusos');

    if (!disabled) {
      valuesdisable[posstatusos] = valor2 === 'N';
      setValuesaddressdisable([...valuesdisable]);
    }
  }, [valuesfield[valuesname.indexOf('osreinc')], disabled]);

  useEffect(() => {
    setActions([
      {
        id: 'btnColor',
        method: () => Color(),
        classicon: 'feather icon-command',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Color'
      }
    ]);
  }, []);

  const Color = () => {
    setShowcolor(true);
  };

  const handleClosecolor = () => {
    setShowcolor(false);
  };

  return (
    <React.Fragment>
      <Infor
        title="Condição de Intervenção"
        table="TB01055"
        object="VW01106"
        classname="OsCondicao"
        classobject="OsCondicaoVW"
        termlist="Condição"
        moduleoption="28"
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
      
      <Modal backdrop="static" size="lg" show={showwcolor} centered={true} onHide={handleClosecolor}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-command h1'} />
          &nbsp;Cor do Status
        </Modal.Header>
        <ModalBody>
          <CondicaoColor
            statusselec={valuesfield[valuesname.indexOf('codigo')]}
            showwcolor={showwcolor}
            setShowcolor={(data) => setShowcolor(data)}
          ></CondicaoColor>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforOsCondicao;
