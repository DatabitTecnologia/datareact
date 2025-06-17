import React, { useEffect, useState } from 'react';
import Infor from '../cadastro/infor';
import { Modal, ModalBody } from 'react-bootstrap';
import PlaceHolder from './placeholder';

const InforPropostaModelo = (props) => {
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
  const [showholder, setShowholder] = useState(false);
  const [tabela, setTabela] = React.useState();

  useEffect(() => {
    setActions([
      {
        id: 'btnPlaceHolder',
        method: () => Place(),
        classicon: 'feather icon-external-link',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'PlaceHolder'
      }
    ]);
  }, []);

  useEffect(() => {
    let operacao = parseInt(valuesfield[valuesname.indexOf('operacao')]);
    switch (operacao) {
      case 0: {
        setTabela('TB02255');
        break;
      }
      case 3: {
        setTabela('TB02264');
        break;
      }
      case 4: {
        setTabela('TB02303');
        break;
      }
    }
  }, [valuesfield[valuesname.indexOf('operacao')]]);

  const Place = () => {
    setShowholder(true);
  };

  const handleCloseholder = () => {
    setShowholder(false);
  };

  return (
    <React.Fragment>
      <Infor
        title="Modelos de Proposta"
        table="TB01140"
        object="TB01140"
        classname="PropostaModelo"
        classobject="PropostaModelo"
        termlist="Modelos de Proposta"
        moduleoption="15"
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
      <Modal backdrop="static" size="xl" show={showholder} centered={true} onHide={handleCloseholder}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-external-link h1'} />
          &nbsp;Definição de PlaceHolder
        </Modal.Header>
        <ModalBody>
          <PlaceHolder
            tabela={tabela}
            setTabela={(data) => setTabela(data)}
            cabecalho={valuesfield}
            setCabecalho={(data) => setValuesfield(data)}
            valuesname={valuesname}
            setValuesname={(data) => setValuesname(data)}
          ></PlaceHolder>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforPropostaModelo;
