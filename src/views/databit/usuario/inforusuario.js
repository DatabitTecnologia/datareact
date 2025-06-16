import React, { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Modal, ModalBody } from 'react-bootstrap';
import { Encrypt, Decrypt, Decode64 } from '../../../utils/crypto';
import { apiExec } from '../../../api/crudapi';
import SitePermissao from '../site/permissao';
import Infor from '../cadastro/infor';

const InforUsuario = (props) => {
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
  const [actions, setActions] = React.useState([]);

  const [valuesaddress, setValuesaddress] = React.useState([]);
  const [valuesaddressdisable, setValuesaddressdisable] = React.useState([]);
  const [valuesaddressname, setValuesaddressname] = React.useState([]);
  const [valuesaddressrequired, setValuesaddressrequired] = React.useState([]);

  const [openmodal, setOpenmodal] = React.useState(props.openmodal);
  const [fieldsauto, setFieldsauto] = React.useState(props.fieldsauto);
  const [events, setEvents] = React.useState([]);
  const [showpermissao, setShowpermissao] = React.useState(false);

  useEffect(() => {
    setEvents([
      {
        id: 'DecryptSenha',
        type: 6, // After Edit
        method: function () {
          // Decriptografando as senhas
          let senha = valuesfield[valuesname.indexOf('senha')];
          let senha2 = valuesfield[valuesname.indexOf('senha2')];
          valuesfield[valuesname.indexOf('senha')] = Decrypt(senha);
          valuesfield[valuesname.indexOf('senha2')] = Decrypt(senha2);
          setValuesfield([...valuesfield]);
          return true;
        }
      },
      {
        id: 'ValidaSenha',
        type: 7, // Before Save
        method: function () {
          // Criptografando as senhas
          let senha = valuesfield[valuesname.indexOf('senha')];
          let senha2 = valuesfield[valuesname.indexOf('senha2')];
          // Validar se as senhas conferem
          if (senha !== senha2) {
            addToast('Atenção, as senhas não conferem !', {
              placement: 'bottom-rigth',
              appearance: 'warning',
              autoDismiss: true
            });
            return false;
          } else {
            valuesfield[valuesname.indexOf('senha')] = Encrypt(senha);
            valuesfield[valuesname.indexOf('senha2')] = Encrypt(senha2);
            setValuesfield([...valuesfield]);
            return true;
          }
        }
      },
      {
        id: 'DeleteUser',
        type: 3, // Before Delete
        method: function () {
          // Excluindo Permissoes
          let usuario = valuesfield[valuesname.indexOf('nome')];
          let usuario2 = valuesfield[valuesname.indexOf('permissaousu')];
          let grupo = valuesfield[valuesname.indexOf('grupo')];
          if (grupo === undefined) {
            grupo = '';
          }
          let tipo = valuesfield[valuesname.indexOf('tipo')];
          apiExec("exec SP00010 '" + usuario + "', '" + usuario2 + "', '" + grupo + "', '" + tipo + "', 'S'", 'N').then((response) => {
            if (response.status === 200) {
              addToast('Permissões excluídas com Sucesso !', {
                placement: 'bottom-rigth',
                appearance: 'success',
                autoDismiss: true
              });
            }
          });
        }
      },
      {
        id: 'InsertUser',
        type: 8, // After Save (Insert)
        method: function () {
          // Copiando Permissoes
          let usuario = valuesfield[valuesname.indexOf('nome')];
          let usuario2 = valuesfield[valuesname.indexOf('permissaousu')];
          let grupo = valuesfield[valuesname.indexOf('grupo')];
          if (grupo === undefined) {
            grupo = '';
          }
          let tipo = valuesfield[valuesname.indexOf('tipo')];
          apiExec("exec SP00010 '" + usuario + "', '" + usuario2 + "', '" + grupo + "', '" + tipo + "', 'N'", 'N').then((response) => {
            if (response.status === 200) {
              addToast('Permissões copiadas com Sucesso !', {
                placement: 'bottom-rigth',
                appearance: 'success',
                autoDismiss: true
              });
            }
          });
        }
      },
      {
        id: 'EncryptSenha',
        type: 11, // After Cancel
        method: function () {
          // Criptografando as senhas
          let senha = valuesfield[valuesname.indexOf('senha')];
          let senha2 = valuesfield[valuesname.indexOf('senha2')];
          valuesfield[valuesname.indexOf('senha')] = Encrypt(senha);
          valuesfield[valuesname.indexOf('senha2')] = Encrypt(senha2);
          setValuesfield([...valuesfield]);
          return true;
        }
      }
    ]);
  }, [valuesfield]);

  useEffect(() => {
    // Solictar o código do técnico, quando o usuário for do tipo técnico.
    if (!disabled) {
      let valor = valuesfield[valuesname.indexOf('tecnico')];
      let poscodtec = valuesname.indexOf('codtec');
      valuesdisable[poscodtec] = valor === 'N';
      setValuesdisable([...valuesdisable]);
    }
  }, [valuesfield[valuesname.indexOf('tecnico')], disabled]);

  useEffect(() => {
    // Habilitar a opção de visualização dos clientes,
    // quando o codigo do vendedor for preenchido
    if (!disabled) {
      let valor = valuesfield[valuesname.indexOf('vend')];
      let poscli = valuesname.indexOf('conscli');
      valuesdisable[poscli] = !(valor !== '' && valor !== undefined && valor !== null);
      setValuesdisable([...valuesdisable]);
    }
  }, [valuesfield[valuesname.indexOf('vend')], disabled]);

  useEffect(() => {
    const system = parseInt(Decode64(sessionStorage.getItem('system')));
    switch (system) {
      case 3: {
        // DataPartner
        // Validação Perfil de Usuário
        let poscli = valuesname.indexOf('codcli');
        let possite = valuesname.indexOf('site');
        let valor = 0;
        if (valuesfield[valuesname.indexOf('perfil')] !== undefined && valuesfield[valuesname.indexOf('perfil')] !== '') {
          valor = parseInt(valuesfield[valuesname.indexOf('perfil')]);
        }
        switch (valor) {
          case 0: {
            valuesinvisible[poscli] = true;
            valuesinvisible[possite] = true;
            break;
          }
          case 1: {
            valuesinvisible[poscli] = true;
            valuesinvisible[possite] = false;
            break;
          }
          case 2: {
            valuesinvisible[poscli] = false;
            valuesinvisible[possite] = true;
            break;
          }
        }
        setValuesinvisible([...valuesinvisible]);
        break;
      }
      case 4: {
        // DataService
        // Validação Perfil de Usuário
        let poscli = valuesname.indexOf('codcli');
        let postec = valuesname.indexOf('codtec');
        let valor = 0;
        if (valuesfield[valuesname.indexOf('perfil')] !== undefined && valuesfield[valuesname.indexOf('perfil')] !== '') {
          valor = parseInt(valuesfield[valuesname.indexOf('perfil')]);
        }
        let permissao = false;
        setActions([]);
        switch (valor) {
          case 0: {
            valuesdisable[poscli] = true;
            valuesdisable[postec] = true;
            break;
          }
          case 1: {
            valuesdisable[poscli] = true;
            valuesdisable[postec] = false;
            break;
          }
          case 2:
            valuesdisable[poscli] = false;
            valuesdisable[postec] = true;
            break;
          case 3: {
            permissao = true;
            valuesdisable[poscli] = false;
            valuesdisable[postec] = true;
            break;
          }
          case 4: {
            permissao = true;
            valuesdisable[poscli] = false;
            valuesdisable[postec] = false;
            break;
          }
        }
        if (permissao) {
          setActions([
            {
              id: 'btnSites',
              method: () => permissaoSite(),
              classicon: 'feather icon-map',
              classbutton: 'btn btn-success shadow-2 mb-3',
              caption: 'Sites'
            }
          ]);
        }
        setValuesdisable([...valuesdisable]);
        break;
      }
    }
  }, [valuesfield[valuesname.indexOf('perfil')]]);

  const permissaoSite = () => {
    setShowpermissao(true);
  };

  const handleClosepermissao = () => {
    setShowpermissao(false);
  };

  return (
    <React.Fragment>
      <Infor
        title="Usuários"
        table="TB00035"
        object="VW00008"
        classname="Usuario"
        classobject="UsuarioVW"
        termlist="Usuários"
        moduleoption="14"
        address={false}
        primarykey="NOME"
        autoincrement={false}
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
      <Modal backdrop="static" id="frmbrowse" size="xl" show={showpermissao} centered={true} onHide={handleClosepermissao}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-map'} />
          &nbsp;Permissão de Sites
        </Modal.Header>
        <ModalBody>
          <SitePermissao
            codcli={valuesfield[valuesname.indexOf('codcli')]}
            user={valuesfield[valuesname.indexOf('nome')]}
            showpermissao={showpermissao}
            setShowpermissao={(data) => setShowpermissao(data)}
          ></SitePermissao>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InforUsuario;
