import React, { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import Infor from '../cadastro/infor';
import QueryParam from './param';
import Ambiente from '../ambiente';

const InforQuery = (props) => {
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
  const [showparam, setShowparam] = useState(false);

  const [showambiente, setShowambiente] = useState(false);

  const handleCloseShowambiente = () => {
    setShowambiente(false);
  };

  useEffect(() => {
    setActions([
      {
        id: 'btnParams',
        method: () => Params(),
        classicon: 'feather icon-external-link',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Parâmetros'
      },
      {
        id: 'btnAmbiente',
        method: () => setShowambiente(true),
        classicon: 'feather icon-monitor',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Variáveis de Ambiente'
      }
    ]);
  }, []);

  const Params = () => {
    setShowparam(true);
  };

  const handleCloseparam = () => {
    setShowparam(false);
  };

  return (
    <React.Fragment>
      <Infor
        title="Definição de Querys"
        table="TB00113"
        object="TB00113"
        classname="Query"
        classobject="Query"
        termlist="Definição de Querys"
        moduleoption="17"
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
      <Modal backdrop="static" size="xl" show={showparam} centered={true} onHide={handleCloseparam}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-external-link h1'} />
          &nbsp;Definição de Parâmetros
        </Modal.Header>
        <ModalBody>
          <QueryParam
            queryselect={valuesfield[valuesname.indexOf('codigo')]}
            namequery={valuesfield[valuesname.indexOf('nome')]}
          ></QueryParam>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="xl" show={showambiente} centered={true} onHide={handleCloseShowambiente}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-monitor h1'} />
          &nbsp;Variáveis de Ambiente
        </Modal.Header>
        <ModalBody>
          <Ambiente showambiente={showambiente} setShowambiente={(data) => setShowambiente(data)}></Ambiente>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforQuery;
