import React, { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import Infor from '../cadastro/infor';
import Contato from '../cliente/contato';
import { Confirmation } from '../../../components/Confirmation';
import { useNavigate } from 'react-router-dom';
import { apiFind } from '../../../api/crudapi';

const InforProspect = (props) => {
  const navigate = useNavigate();
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
  const [events, setEvents] = React.useState([]);

  useEffect(() => {
    if (valuesfield !== undefined && valuesfield.length > 0) {
      setActions([
        {
          id: 'btnContatos',
          method: () => Contatos(),
          classicon: 'feather icon-user-plus',
          classbutton: 'btn btn-primary shadow-2 mb-3',
          caption: 'Contatos'
        },
        {
          id: 'btnEfetivar',
          method: () => Efetivar(),
          classicon: 'feather icon-thumbs-up',
          classbutton: 'btn btn-primary shadow-2 mb-3',
          caption: 'Efetivar'
        }
      ]);
    }
  }, [valuesfield]);

  const Contatos = () => {
    setShowcontato(true);
  };

  const handleClosecontato = () => {
    setShowcontato(false);
  };

  const Efetivar = () => {
    Confirmation('none', 'Deseja efetivar este Cliente Prospect ?').then((result) => {
      if (result.isConfirmed) {
        const tmpstate = {};
        apiFind('Prospect', '*', '', "TB01127_CODIGO = '" + valuesfield[valuesname.indexOf('codigo')] + "' ").then((response) => {
          if (response.status === 200) {
            tmpstate['codprospect'] = response.data.codigo;
            tmpstate['nome'] = response.data.nome;
            tmpstate['nivel'] = response.data.nivel;
            tmpstate['vendedor'] = response.data.vendedor;
            tmpstate['obs'] = response.data.obs;
            apiFind(
              'Endereco',
              '*',
              '',
              "TB00012_CODIGO = '" + valuesfield[valuesname.indexOf('codigo')] + "' AND TB00012_TIPO = '01' AND TB00012_TABELA = 'TB01127' "
            ).then((response) => {
              if (response.status === 200) {
                tmpstate['num'] = response.data.num;
                tmpstate['bairro'] = response.data.bairro;
                tmpstate['cep'] = response.data.cep;
                tmpstate['comp'] = response.data.comp;
                tmpstate['cidade'] = response.data.cidade;
                tmpstate['estado'] = response.data.estado;
                tmpstate['pais'] = response.data.pais;
                tmpstate['fone'] = response.data.fone;
                tmpstate['fax'] = response.data.fax;
                tmpstate['foneaux'] = response.data.foneaux;
                tmpstate['celular'] = response.data.celular;
                tmpstate['celular2'] = response.data.celular2;
                tmpstate['contato'] = response.data.contato;
                tmpstate['email'] = response.data.email;
                tmpstate['site'] = response.data.site;
                tmpstate['msn'] = response.data.msn;
                navigate('/efetivar', {
                  state: tmpstate
                });
              }
            });
          }
        });
      }
    });
  };

  return (
    <React.Fragment>
      <Infor
        title="Clientes Prospect"
        table="TB01127"
        object="VW01124"
        classname="Prospect"
        classobject="ProspectVW"
        termlist="Clientes Prospect"
        moduleoption="2"
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
      <Modal backdrop="static" size="xl" show={showcontato} centered={true} onHide={handleClosecontato}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-user-plus h1'} />
          &nbsp;Definição de Contatos
        </Modal.Header>
        <ModalBody>
          <Contato tipo="1" cliente={valuesfield[valuesname.indexOf('codigo')]}></Contato>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforProspect;
