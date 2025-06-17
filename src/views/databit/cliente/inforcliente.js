import React, { useEffect, useState } from 'react';
import Infor from '../cadastro/infor';
import { Modal, ModalBody } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Contato from './contato';
import ClienteProduto from './produto';
import ClienteState from './state';
import ClienteEquipamento from './equipamento';
import { Decode64 } from '../../../utils/crypto';

const InforCliente = (props) => {
  const location = useLocation();
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
  const [showcontato, setShowcontato] = useState(false);
  const [linkescape, setLinkescape] = React.useState('');
  const [events, setEvents] = React.useState([]);
  const [showproduto, setShowproduto] = useState(false);
  const [showstate, setShowstate] = useState(false);
  const [showequip, setShowequip] = useState(false);

  useEffect(() => {
    if (location.state !== null) {
      console.log(location.state);
      setFieldsauto(location.state);
      setOpenmodal(true);
      setLinkescape('/prospect');
    }

    if (Decode64(sessionStorage.getItem('system')) === '3') {
      setActions([
        {
          id: 'btnContatos',
          method: () => Contatos(),
          classicon: 'feather icon-user-plus',
          classbutton: 'btn btn-primary shadow-2 mb-3',
          caption: 'Contatos'
        },
        {
          id: 'btnProdutos',
          method: () => Produtos(),
          classicon: 'feather icon-box',
          classbutton: 'btn btn-primary shadow-2 mb-3',
          caption: 'Produtos'
        },
        {
          id: 'btnState',
          method: () => State(),
          classicon: 'feather icon-map',
          classbutton: 'btn btn-primary shadow-2 mb-3',
          caption: 'Estados'
        }
      ]);
    } else if (Decode64(sessionStorage.getItem('system')) === '4') {
      setActions([
        {
          id: 'btnContatos',
          method: () => Contatos(),
          classicon: 'feather icon-user-plus',
          classbutton: 'btn btn-primary shadow-2 mb-3',
          caption: 'Contatos'
        },
        {
          id: 'btnEquip',
          method: () => Equip(),
          classicon: 'feather icon-box',
          classbutton: 'btn btn-primary shadow-2 mb-3',
          caption: 'Equipamentos'
        }
      ]);
    } else {
      setActions([
        {
          id: 'btnContatos',
          method: () => Contatos(),
          classicon: 'feather icon-user-plus',
          classbutton: 'btn btn-primary shadow-2 mb-3',
          caption: 'Contatos'
        }
      ]);
    }
  }, []); // Adicione `system` às dependências se ela mudar dinamicamente

  const Contatos = () => {
    setShowcontato(true);
  };

  const handleClosecontato = () => {
    setShowcontato(false);
  };

  const Produtos = () => {
    setShowproduto(true);
  };

  const handleCloseproduto = () => {
    setShowproduto(false);
  };

  const State = () => {
    setShowstate(true);
  };

  const handleClosestate = () => {
    setShowstate(false);
  };

  const Equip = () => {
    setShowequip(true);
  };

  const handleCloseequip = () => {
    setShowequip(false);
  };

  useEffect(() => {
    // Validação de pessoa Física ou Jurídica
    if (!disabled) {
      let poscnpj = valuesname.indexOf('cnpj');
      let poscpf = valuesname.indexOf('cpf');
      let posidentidade = valuesname.indexOf('ident');
      let posie = valuesname.indexOf('inscest');
      let posim = valuesname.indexOf('inscmun');
      let possuframa = valuesname.indexOf('suframa');
      let valor = valuesfield[valuesname.indexOf('pessoa')];
      valuesdisable[poscnpj] = valor === 'F';
      valuesdisable[poscpf] = valor === 'J';
      valuesdisable[posidentidade] = valor === 'J';
      valuesdisable[posie] = valor === 'F';
      valuesdisable[posim] = valor === 'F';
      valuesdisable[possuframa] = valor === 'F';
      setValuesdisable([...valuesdisable]);
    }
  }, [valuesfield[valuesname.indexOf('pessoa')], disabled]);

  return (
    <React.Fragment>
      <Infor
        title="Clientes"
        table="TB01008"
        object="VW01007"
        classname="Cliente"
        classobject="ClienteVW"
        termlist="Clientes"
        moduleoption="1"
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
        linkescape={linkescape}
        setLinkescape={(data) => setLinkescape(data)}
        events={events}
        setEvents={(data) => setEvents(data)}
      />
      <Modal backdrop="static" size="xl" show={showcontato} centered={true} onHide={handleClosecontato}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-user-plus'} />
          &nbsp;Definição de Contatos
        </Modal.Header>
        <ModalBody>
          <Contato tipo="0" cliente={valuesfield[valuesname.indexOf('codigo')]}></Contato>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="xl" show={showproduto} centered={true} onHide={handleCloseproduto}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-box'} />
          &nbsp;Definição de Produtos
        </Modal.Header>
        <ModalBody>
          <ClienteProduto cliente={valuesfield[valuesname.indexOf('codigo')]}></ClienteProduto>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="xl" show={showequip} centered={true} onHide={handleCloseequip}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-box'} />
          &nbsp;Definição de Equipamentos
        </Modal.Header>
        <ModalBody>
          <ClienteEquipamento cliente={valuesfield[valuesname.indexOf('codigo')]}></ClienteEquipamento>
        </ModalBody>
      </Modal>
      <Modal backdrop="static" size="xl" show={showstate} centered={true} onHide={handleClosestate}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-map'} />
          &nbsp;Mapa de Distribuição
        </Modal.Header>
        <ModalBody>
          <ClienteState
            codcli={valuesfield[valuesname.indexOf('codigo')]}
            showstate={showstate}
            setShowstate={(data) => setShowstate(data)}
          ></ClienteState>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforCliente;
