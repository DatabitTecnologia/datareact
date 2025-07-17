import React, { useState, useEffect } from 'react';
import Infor from '../cadastro/infor';
import { Modal, ModalBody } from 'react-bootstrap';
import Contrato from './Contrato';

const InforDefeito = (props) => {
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

  const [showcontrato, setShowContrato] = useState(false);

  const [btndisabled, setBtnDisabled] = useState('shadow-2 mb-3');

  /* Desabilita o botão contratos de acordo com o vinc contrato */
  useEffect(() => {
    if (!valuesname || !valuesfield) return;

    const idx = valuesname.map((v) => v.trim().toLowerCase()).indexOf('defcontrato');

    if (idx !== -1 && valuesfield[idx] !== undefined) {
      const valor = valuesfield[idx];

      if (valor === 'N') {
        setBtnDisabled('btn btn-light mb-3');
      } else {
        setBtnDisabled('btn btn-primary shadow-2 mb-3');
      }
    }
  }, [valuesname, valuesfield]); 

  useEffect(() => {
    setActions([
      {
        id: 'btnContrato',
        method: () => abrirContrato(),
        classicon: 'feather icon-share-2',
        classbutton: btndisabled,
        caption: 'Contratos'
      }
    ]);
  }, [btndisabled]); // Reexecuta quando btndisabled mudar

  const abrirContrato = () => {
    setShowContrato(true);
  };

  const handleCloseContrato = () => {
    setShowContrato(false);
  };

  return (
    <React.Fragment>
      <Infor
        title="Defeitos"
        table="TB01048"
        object="TB01048"
        classname="Defeito"
        classobject="Defeito"
        termlist="Defeito"
        moduleoption="27"
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
      <Modal backdrop="static" size="xl" show={showcontrato} centered={true} onHide={handleCloseContrato}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-bell'} />
          &nbsp;Vinculo com contrato
        </Modal.Header>
        <ModalBody>
          <Contrato statusselec={valuesfield[valuesname.indexOf('codigo')]}></Contrato>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforDefeito;
