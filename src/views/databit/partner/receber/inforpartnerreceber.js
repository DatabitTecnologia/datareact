import React, { useEffect } from 'react';
import Infor from '../../cadastro/infor';
import { Modal, ModalBody } from 'react-bootstrap';
import { Decode64 } from '../../../../utils/crypto';
import PartnerRecebimento from '../recebimento';
import { useToasts } from 'react-toast-notifications';

const InforPartnerReceber = (props) => {
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
  const [showbaixa, setShowbaixa] = React.useState(false);

  useEffect(() => {
    setActions([
      {
        id: 'btnRecebimento',
        method: () => Recebimento(),
        classicon: 'fi flaticon-business-and-finance',
        classbutton: 'btn btn-primary shadow-2 mb-3',
        caption: 'Recebimento'
      }
    ]);
  }, []);

  useEffect(() => {
    let posdata = valuesname.indexOf('data');
    let possite = valuesname.indexOf('codsite');
    let poscodcli = valuesname.indexOf('codcli');
    let data = new Date();
    if (valuesfield[posdata] === undefined || valuesfield[posdata] === null || valuesfield[posdata] === '') {
      valuesfield[posdata] = data;
    }
    if (valuesfield[possite] === undefined || valuesfield[possite] === null || valuesfield[possite] === '') {
      if (parseInt(sessionStorage.getItem('perfil')) === 1) {
        valuesfield[possite] = Decode64(sessionStorage.getItem('temple'));
        setValuesfield([...valuesfield]);
        valuesdisable[possite] = true;
        setValuesdisable([...valuesdisable]);
      }
    }
    if (valuesfield[poscodcli] === undefined || valuesfield[poscodcli] === null || valuesfield[poscodcli] === '') {
      if (parseInt(sessionStorage.getItem('perfil')) === 2) {
        valuesfield[poscodcli] = Decode64(sessionStorage.getItem('partner'));
        setValuesfield([...valuesfield]);
        valuesdisable[poscodcli] = true;
        setValuesdisable([...valuesdisable]);
      }
    }
  }, [valuesfield[valuesname.indexOf('codigo')]]);

  useEffect(() => {
    if (valuesfield !== undefined && valuesfield.length > 0) {
      const dtbaixa = valuesfield[valuesname.indexOf('dtbaixa')];
      setEvents([
        {
          id: 'ValidaBaixaExcluir',
          type: 3, // Before Delete
          method: function () {
            // Validação da data da Baixa
            if (dtbaixa !== undefined && dtbaixa !== null && dtbaixa !== '') {
              addToast('Não é permitido excluir este Título, pois já baixado em : ' + dtbaixa, {
                placement: 'bottom-rigth',
                appearance: 'warning',
                autoDismiss: true
              });
              return false;
            } else {
              return true;
            }
          }
        },
        {
          id: 'ValidaBaixaEditar',
          type: 5, // Before Edit
          method: function () {
            // Validação da data da Baixa
            if (dtbaixa !== undefined && dtbaixa !== null && dtbaixa !== '') {
              addToast('Não é permitido editar este Título, pois já baixado em : ' + dtbaixa, {
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
      ]);
    }
  }, [valuesfield]);

  const Recebimento = () => {
    const dtbaixa = valuesfield[valuesname.indexOf('dtbaixa')];
    if (dtbaixa !== undefined && dtbaixa !== null && dtbaixa !== '') {
      addToast('Não é permitido baixar este Título, pois já baixado em : ' + dtbaixa, {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
    } else {
      setShowbaixa(true);
    }
  };

  const handleClosebaixa = () => {
    setShowbaixa(false);
  };

  return (
    <React.Fragment>
      <Infor
        title="Compras à Receber"
        table="TB04055"
        object="VW04055"
        classname="PartnerReceber"
        classobject="PartnerReceberVW"
        termlist="Compras à Receber"
        moduleoption="23"
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
      <Modal backdrop="static" size="xl" show={showbaixa} centered={true} onHide={handleClosebaixa}>
        <Modal.Header className="h5" closeButton>
          <i className={'fi flaticon-business-and-finance'} />
          &nbsp;Controle de Recebimento
        </Modal.Header>
        <ModalBody>
          <PartnerRecebimento
            valuesconta={valuesfield}
            setValuesconta={(data) => setValuesfield(data)}
            valuesname={valuesname}
            showbaixa={showbaixa}
            setShowbaixa={(data) => setShowbaixa(data)}
          ></PartnerRecebimento>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforPartnerReceber;
