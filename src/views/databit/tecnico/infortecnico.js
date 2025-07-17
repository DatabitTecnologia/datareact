import React, { useEffect, useState } from 'react';
import Infor from '../cadastro/infor';
import { Modal, ModalBody } from 'react-bootstrap';
import Territorio from './territorio';

const InforTecnico = (props) => {
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

  const [showterritorio, setShowTerritorio] = useState(false);

  const [btndisable, setBtnDisabled] = useState('btn btn-light mb-3');

  useEffect(() => {
    if(!valuesname || !valuesfield) return;

    const valor = valuesfield[valuesname.indexOf('territorio')];

    if(valor === 'N'){
      setBtnDisabled('btn btn-light mb-3 disabled');
    }else{
      setBtnDisabled('btn btn-primary shadow-2 mb-3');
    }

  })

  useEffect(() => {
      setActions([
        {
          id: 'territorio',
          method: () => abrirTerritorio(),
          classicon: 'feather icon-map-pin',
          classbutton: btndisable,
          caption: 'Territorio'
        },
        
      ]);
    }, [btndisable]);

    const abrirTerritorio = () => {
    setShowTerritorio(true);
  };

  const handleCloseTerritorio = () => {
    setShowTerritorio(false);
  };

  return (
    <React.Fragment>
      <Infor
        title="Definições de Técnicos"
        table="TB01024"
        object="VW01008"
        classname="Tecnico"
        classobject="TecnicoVW"
        termlist="Técnico"
        moduleoption="31"
        address={true}
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
    
      <Modal backdrop="static" size="xl" show={showterritorio} centered={true} onHide={handleCloseTerritorio}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-bell'} />
          &nbsp;Técnico territorio
        </Modal.Header>
        <ModalBody>
          <Territorio statusselec={valuesfield[valuesname.indexOf('codigo')]}></Territorio>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforTecnico;
