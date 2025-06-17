import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { useToasts } from 'react-toast-notifications';
import { Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import Esquecer from '../esquecer';
import { Encode64, Decrypt, Decode64 } from '../../../../utils/crypto';
import { BASE_URL } from '../../../../config/constant';
import { apiFind, apiList, apiGetPicture } from '../../../../api/crudapi';
import { CreateObject } from '../../../../components/CreateObject';
import { ConfigEmail } from '../../../../api/apiemail';
import { getAdmin, setUser, listUsers } from '../../../../api/apiconnect';
import { getLocalIPs } from '../../../../utils/ipaddress';
import AGGrid from '../../../../components/AGGrid';
import { DATABIT } from '../../../../config/constant';
import { Message } from '../../../../components/Message';

const Senha = (props) => {
  const [tela, setTela] = useState(0);
  const navigate = useNavigate();
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const { addToast } = useToasts();
  const [showusers, setShowusers] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const [userslog, setUserslog] = React.useState([]);

  //const Solicitar = () => {
  //  setTela(1);
  //};

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'usersys', headerName: 'Usuário', width: 210 },
      { headerClassName: 'header-list', field: 'idbrowser', headerName: 'ID Navegador', width: 350 },
      { headerClassName: 'header-list', field: 'ipaddress', headerName: 'Ip Address', width: 350 },
      { headerClassName: 'header-list', field: 'date', headerName: 'Ultima Atualização', width: 170 }
    ]);
    sessionStorage.setItem('idwhats', '');
    sessionStorage.setItem('tokenwhats', '');
    sessionStorage.setItem('filtermenu', '');

    setFields([
      {
        id: 0,
        campo: 'TB01007_CODEMP',
        funcao: 'Empresa',
        tipo: 'varchar',
        nome: 'codemp',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 22,
        measure: '22rem',
        tabelaref: 'TB01007',
        widthname: 13,
        disabled: false
      },
      {
        id: 1,
        campo: 'TB00035_EMAIL',
        funcao: 'Nome do usuário ou e-mail',
        tipo: 'varchar',
        nome: 'email',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 22,
        measure: '22rem',
        disabled: false
      },
      {
        id: 2,
        campo: 'TB00035_SENHA',
        funcao: 'Digite sua senha',
        tipo: 'varchar',
        nome: 'senha',
        tamanho: 60,
        tipoobject: 13,
        widthfield: 22,
        measure: '22rem',
        disabled: false,
        charnormal: true,
        viewpass: true
      }
    ]);
    setCarregando(true);
    sessionStorage.getItem('token');
    apiList('Empresa', '*', '', "TB01007_SITUACAO = 'A' order by TB01007_CODIGO ").then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setTela(0);
        valuesfield2[0] = response.data[0].nome;
        setValuesfield2([...valuesfield2]);
        valuesfield[0] = response.data[0].codigo;
        valuesfield[1] = localStorage.getItem('emailuser');
        setValuesfield([...valuesfield]);
      }
    });
  }, []);

  useEffect(() => {
    if (valuesfield[0] !== undefined && valuesfield[0] != '' && valuesfield[0].length === 2) {
      setCarregando(true);
      apiFind('Empresa', '*', '', "TB01007_CODIGO = '" + valuesfield[0] + "' ").then((response) => {
        if (response.status === 200) {
          setCarregando(false);
          if (response.data.instancewhats !== '' && response.data.instancewhats !== '' && response.data.instancewhats !== null) {
            sessionStorage.setItem('idwhats', Encode64(response.data.instancewhats));
            sessionStorage.setItem('tokenwhats', Encode64(response.data.tokenwhats));
            sessionStorage.setItem('whatsapp', Encode64(response.data.whatsapp));
            setCarregando(true);
            apiFind('DataWhatsCadchatVW', '*', '', "TB08001_WHATSAPP = '" + response.data.whatsapp + "' ").then((response) => {
              if (response.status === 200) {
                sessionStorage.setItem('chat', Encode64(response.data.codigo));
                setCarregando(false);
              }
            });
          }
          sessionStorage.setItem('user', '');
        }
      });
    }
  }, [valuesfield[0]]);

  const getConfigEmail = async (empresa) => {
    return await ConfigEmail(empresa);
  };

  const infoUser = () => {
    listUsers(
      Decode64(sessionStorage.getItem('urlconnect')),
      Decode64(sessionStorage.getItem('system')),
      Decode64(sessionStorage.getItem('coddatabit'))
    ).then((response) => {
      const users = response.data;
      let edtempresa = valuesfield[0];
      getConfigEmail(edtempresa);
      getLocalIPs().then((ips) => {
        const userselec = users.filter(
          (item) =>
            item.usersys === Decode64(sessionStorage.getItem('user')) && item.idbrowser === Decode64(localStorage.getItem('idbrowser'))
        );
        if (users.length + 1 <= parseInt(Decode64(sessionStorage.getItem('count'))) || userselec.length > 0) {
          sessionStorage.setItem('ipaddress', ips[0]);
          setUser(
            Decode64(sessionStorage.getItem('urlconnect')),
            Decode64(sessionStorage.getItem('system')),
            Decode64(sessionStorage.getItem('coddatabit')),
            Decode64(sessionStorage.getItem('user')),
            Decode64(localStorage.getItem('idbrowser')),
            ips[0]
          ).then((response) => {
            if (response.status === 200) {
              DATABIT.islogged = true;
              addToast(
                'Bem vindo ' +
                  Decode64(sessionStorage.getItem('user')) +
                  ' ao sistema ' +
                  Decode64(sessionStorage.getItem('namesystem')) +
                  ' !',
                {
                  placement: 'bottom-rigth',
                  appearance: 'success',
                  autoDismiss: true
                }
              );
              navigate(BASE_URL, {
                state: {
                  ...props
                }
              });
            }
          });
        } else {
          setCarregando(false);
          Message(
            'frmlogin',
            '',
            'warning',
            'Prezado(a) usuário(a), informamos que o número de licenças simultâneas permitidas para o sistema foi excedido, ' +
              'por favor, encerre outra sessão ou entre em contato com a DATABIT para mais informações, ' +
              'número de licenças adquiridas: ' +
              Decode64(sessionStorage.getItem('count'))
          ).then((result) => {
            if (result.isConfirmed) {
              setUserslog(users);
              setShowusers(true);
            }
          });
        }
      });
    });
  };

  const Entrar = () => {
    let edtempresa = valuesfield[0];
    let edtemail = valuesfield[1];
    let edtsenha = valuesfield[2];

    if (edtempresa === '' || edtempresa === undefined) {
      addToast('Empresa é de preenchimento obrigatório !', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
      try {
        document.getElementById('TB01007_CODEMP').focus();
      } catch (error) {
        //console.log(error);
      }
      return;
    } else if (edtemail === '' || edtemail === undefined) {
      addToast('Nome do usuário / e-mail é de preenchimento obrigatório !', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
      try {
        document.getElementById('TB00035_EMAIL').focus();
      } catch (error) {
        //console.log(error);
      }
      return;
    } else if (edtsenha === '' || edtsenha === undefined) {
      addToast('Senha é de preenchimento obrigatório !', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
      try {
        document.getElementById('TB00035_SENHA').focus();
      } catch (error) {
        //console.log(error);
      }
      return;
    } else {
      setCarregando(true);
      apiFind('Usuario', '*', '', "(tb00035_email = '" + edtemail + "') or (tb00035_nome = '" + edtemail + "') ").then((response) => {
        if (response.status === 200) {
          if (response.data) {
            if (edtsenha.toUpperCase() === Decrypt(response.data.senha).toUpperCase()) {
              sessionStorage.setItem('user', Encode64(response.data.nome));
              localStorage.setItem('emailuser', edtemail);
              sessionStorage.setItem('enterprise', Encode64(edtempresa));
              sessionStorage.setItem('nameenterprise', Encode64(valuesfield2[0]));
              sessionStorage.setItem('perfil', response.data.perfil);
              sessionStorage.setItem('temple', Encode64(response.data.site));
              sessionStorage.setItem('partner', Encode64(response.data.codcli));
              if (response.data.vend !== '' && response.data.vend !== null && response.data.vend !== undefined) {
                sessionStorage.setItem('seller', Encode64(response.data.vend));
              } else {
                sessionStorage.setItem('seller', Encode64('ZZZZ'));
              }
              sessionStorage.setItem('consclient', Encode64(response.data.conscli));
              sessionStorage.setItem('manager', Encode64(response.data.gerente));
              if (response.data.master !== '' && response.data.master !== null && response.data.master !== undefined) {
                sessionStorage.setItem('master', Encode64(response.data.master));
              } else {
                sessionStorage.setItem('master', Encode64('N'));
              }
              sessionStorage.setItem('admin', Encode64('N'));
              sessionStorage.setItem('supervisor', Encode64('N'));
              sessionStorage.setItem('email', Encode64(response.data.email));
              sessionStorage.setItem('fone', Encode64(response.data.fone));
              sessionStorage.setItem('whatsuser', Encode64(response.data.whatsapp));
              apiGetPicture('TB00035', 'TB00035_NOME', 'TB00035_PHOTO', response.data.nome).then((response) => {
                if (response.status === 200) {
                  sessionStorage.setItem('photo', response.data[0].picture);
                }
              });
              apiGetPicture('TB01007', 'TB01007_CODIGO', 'TB01007_LOGOMARCA', edtempresa).then((response) => {
                if (response.status === 200) {
                  sessionStorage.setItem('logoempresa', response.data[0].picture);
                }
              });
              if (response.data.instancewhats !== '' && response.data.instancewhats !== '' && response.data.instancewhats !== null) {
                sessionStorage.setItem('idwhats', Encode64(response.data.instancewhats));
                sessionStorage.setItem('tokenwhats', Encode64(response.data.tokenwhats));
                sessionStorage.setItem('whatsapp', Encode64(response.data.whatsapp));
                apiFind('DataWhatsCadchatVW', '*', '', "TB08001_WHATSAPP = '" + response.data.whatsapp + "' ").then((response) => {
                  if (response.status === 200) {
                    sessionStorage.setItem('chat', Encode64(response.data.codigo));
                    infoUser();
                  }
                });
              } else {
                infoUser();
              }
            } else {
              addToast('Senha inválida !', {
                placement: 'bottom-rigth',
                appearance: 'error',
                autoDismiss: true
              });
              setCarregando(false);
              return;
            }
          } else {
            getAdmin(Decode64(sessionStorage.getItem('urlconnect')), edtemail.toUpperCase()).then((response) => {
              if (response.status === 200) {
                if (response.data.length > 0) {
                  if (response.data[0].SENHA === edtsenha.toUpperCase()) {
                    sessionStorage.setItem('user', Encode64(response.data[0].USUARIO));
                    localStorage.setItem('emailuser', response.data[0].USUARIO);
                    sessionStorage.setItem('enterprise', Encode64(edtempresa));
                    sessionStorage.setItem('nameenterprise', Encode64(valuesfield2[0]));
                    sessionStorage.setItem('seller', Encode64('ZZZZ'));
                    sessionStorage.setItem('consclient', Encode64('S'));
                    sessionStorage.setItem('admin', Encode64('S'));
                    sessionStorage.setItem('supervisor', Encode64('N'));
                    sessionStorage.setItem('master', Encode64('S'));
                    sessionStorage.setItem('manager', Encode64('S'));
                    sessionStorage.setItem('email', '');
                    sessionStorage.setItem('fone', '');
                    sessionStorage.setItem('whatsuser', '');
                    sessionStorage.setItem('perfil', 0);
                    sessionStorage.setItem('temple', '');
                    sessionStorage.setItem('partner', '');
                    apiGetPicture('TB01007', 'TB01007_CODIGO', 'TB01007_LOGOMARCA', edtempresa).then((response) => {
                      if (response.status === 200) {
                        sessionStorage.setItem('logoempresa', response.data[0].picture);
                      }
                    });
                    getConfigEmail(edtempresa);
                    DATABIT.islogged = true;
                    getLocalIPs().then((ips) => sessionStorage.setItem('ipaddress', ips));
                    addToast(
                      'Bem vindo ' +
                        Decode64(sessionStorage.getItem('user')) +
                        ' ao sistema ' +
                        Decode64(sessionStorage.getItem('namesystem')) +
                        ' !',
                      {
                        placement: 'bottom-rigth',
                        appearance: 'success',
                        autoDismiss: true
                      }
                    );
                    navigate(BASE_URL, {
                      state: {
                        ...props
                      }
                    });
                  } else {
                    addToast('Senha inválida !', {
                      placement: 'bottom-rigth',
                      appearance: 'error',
                      autoDismiss: true
                    });
                    setCarregando(false);
                    return;
                  }
                } else {
                  addToast('Usuário não encontrado !', {
                    placement: 'bottom-rigth',
                    appearance: 'error',
                    autoDismiss: true
                  });
                  setCarregando(false);
                  return;
                }
              }
            });
          }
        } else {
          addToast('Problemas de conexão com o servidor: ' + response.status + response.data, {
            placement: 'bottom-rigth',
            appearance: 'error',
            autoDismiss: true
          });
          setCarregando(false);
          return;
        }
      });
    }
  };

  const handleCloseusers = () => {
    setShowusers(false);
  };

  return (
    <React.Fragment>
      <div>
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        {tela === 0 ? (
          <div id="frmlogin" name="frmlogin">
            <div>
              <p className="mb-2">Definição de usuário e senha</p>
            </div>
            <div>
              <p className="mb-1" style={{ textAlign: 'left' }}>
                Parceiro: {props.parceiro}
              </p>
            </div>
            <div style={{ marginBottom: '10px' }}>
              {fields.map((field, index) => (
                <CreateObject
                  key={index}
                  field={field}
                  index={field.id}
                  fields={fields}
                  valuesfield={valuesfield}
                  setValuesfield={(data) => setValuesfield(data)}
                  valuesfield2={valuesfield2}
                  setValuesfield2={(data) => setValuesfield2(data)}
                  disabled={false}
                ></CreateObject>
              ))}
            </div>
            <div>
              <button id="btnentrar" onClick={(e) => Entrar()} className="btn btn-primary shadow-2 mb-5">
                Acessar
              </button>
            </div>
          </div>
        ) : (
          <Esquecer />
        )}
      </div>
      <Modal backdrop="static" size="xl" show={showusers} centered={true} onHide={handleCloseusers}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-users h1'} />
          &nbsp;Usuários Logados
        </Modal.Header>
        <ModalBody>
          <AGGrid width="100%" height="460px" rows={userslog} columns={columns} loading={carregando}></AGGrid>
        </ModalBody>
        <ModalFooter>
          <Button id="btnSair" className="btn btn-success shadow-2 mb-2" onClick={(e) => setShowusers(false)}>
            <i className={'feather icon-x'} /> Sair
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default Senha;

/*
<button id="btnsenha" onClick={Solicitar} className="btn btn-primary shadow-2 mb-5">
              Esqueci minha senha
            </button>
*/
