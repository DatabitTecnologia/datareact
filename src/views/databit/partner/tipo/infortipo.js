import React from 'react';
import Infor from '../../cadastro/infor';

const InforPartnerTipo = (props) => {
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

  return (
    <React.Fragment>
      <Infor
        title="Tipos de Compra"
        table="TB01152"
        object="VW01136"
        classname="PartnerTipo"
        classobject="PartnerTipoVW"
        termlist="Tipos de Compra"
        moduleoption="21"
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
    </React.Fragment>
  );
};

export default InforPartnerTipo;
