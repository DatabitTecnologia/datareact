import React, { useEffect, useState } from 'react';
import Infor from '../cadastro/infor';
import { useToasts } from 'react-toast-notifications';

const InforDashboard = (props) => {
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
  const [events, setEvents] = React.useState([]);

  useEffect(() => {
    setEvents([
      {
        id: 'ValidarAltura',
        type: 7, // Before Save
        method: function () {
          if (valuesfield !== undefined && valuesfield.length > 0) {
            let altura = valuesfield[valuesname.indexOf('altura')];
            if (parseInt(altura) <= 0) {
              addToast('Não é permitido definir altura ZERADA ou NEGATIVA !', {
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
        id: 'ValidarLargura',
        type: 7, // Before Save
        method: function () {
          if (valuesfield !== undefined && valuesfield.length > 0) {
            let largura = valuesfield[valuesname.indexOf('largura')];
            if (parseInt(largura) <= 0) {
              addToast('Não é permitido definir largura ZERADA ou NEGATIVA !', {
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
  }, [valuesfield]);

  return (
    <React.Fragment>
      <Infor
        title="Criação de Dashboards"
        table="TB00115"
        object="TB00115"
        classname="Dashboard"
        classobject="Dashboard"
        termlist="Gestão de Dashboard"
        moduleoption="18"
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

export default InforDashboard;
