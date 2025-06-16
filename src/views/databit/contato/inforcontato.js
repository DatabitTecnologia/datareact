import React, { useEffect } from 'react';
import Infor from '../cadastro/infor';
import { apiFind } from '../../../api/crudapi';
import { Decode64 } from '../../../utils/crypto';

const InforContato = (props) => {
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
    // Validação de tipo de cliente
    let posativo = valuesname.indexOf('codcli');
    let posprospect = valuesname.indexOf('codprospect');
    let valor = parseInt(valuesfield[valuesname.indexOf('tipo')]);
    if (valor === 0) {
      valuesinvisible[posativo] = false;
      valuesinvisible[posprospect] = true;
    } else {
      valuesinvisible[posativo] = true;
      valuesinvisible[posprospect] = false;
    }
    setValuesinvisible([...valuesinvisible]);
    if (parseInt(sessionStorage.getItem('perfil')) === 2) {
      valuesfield[posativo] = Decode64(sessionStorage.getItem('partner'));
      valuesdisable[posativo] = true;
      setValuesfield([...valuesfield]);
      setValuesdisable([...valuesdisable]);
    }
  }, [valuesfield[valuesname.indexOf('tipo')]]);

  useEffect(() => {
    // Preencher o campo de vendedor
    let tipo = parseInt(valuesfield[valuesname.indexOf('tipo')]);
    let codcli = valuesfield[valuesname.indexOf('codcli')];
    let codprospect = valuesfield[valuesname.indexOf('codprospect')];
    let vendedor = valuesfield[valuesname.indexOf('codven')];
    let posvendedor = valuesname.indexOf('codven');
    if (tipo === 0) {
      if (codcli !== '' && codcli !== undefined && codcli !== null) {
        apiFind('Cliente', 'TB01008_VENDEDOR', '', "TB01008_CODIGO = '" + codcli + "' ").then((response) => {
          if (response.status === 200) {
            if (vendedor === '' || vendedor === undefined || vendedor === null) {
              valuesfield[posvendedor] = response.data.vendedor;
              setValuesfield([...valuesfield]);
            }
          }
        });
      }
    } else {
      if (codprospect !== '' && codprospect !== undefined && codprospect !== null) {
        apiFind('Prospect', 'TB01127_VENDEDOR', '', "TB01127_CODIGO = '" + codprospect + "' ").then((response) => {
          if (response.status === 200) {
            if (vendedor === '' || vendedor === undefined || vendedor === null) {
              valuesfield[posvendedor] = response.data.vendedor;
              setValuesfield([...valuesfield]);
            }
          }
        });
      }
    }
  }, [valuesfield[valuesname.indexOf('codcli')], valuesfield[valuesname.indexOf('codprospect')]]);

  return (
    <React.Fragment>
      <Infor
        title="Definição de Contatos"
        table="TB01128"
        object="VW01125"
        classname="Contato"
        classobject="ContatoVW"
        termlist="Definição de Contatos"
        moduleoption="3"
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
    </React.Fragment>
  );
};

export default InforContato;
