import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Breadcrumb from '../../../../layouts/AdminLayout/Breadcrumb';
import { CreateObject } from '../../../../components/CreateObject';
import { Decode64, Encrypt } from '../../../../utils/crypto';
import { apiUpdate } from '../../../../api/crudapi';
import { BASE_URL } from '../../../../config/constant';
import { getPasswordAdmin } from '../../../../api/apiconnect';

const Recuperar = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const { addToast } = useToasts();
  const navigate = useNavigate();

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB00035_SENHA',
        funcao: 'Defina a nova senha',
        tipo: 'varchar',
        nome: 'senha',
        tamanho: 60,
        tipoobject: 13,
        widthfield: 22,
        measure: '22rem',
        disabled: false,
        charnormal: true,
        ispassword: true,
        viewpass: true
      },
      {
        id: 1,
        campo: 'TB00035_SENHA2',
        funcao: 'Confirmar nova senha',
        tipo: 'varchar',
        nome: 'senha2',
        tamanho: 60,
        tipoobject: 13,
        widthfield: 22,
        measure: '22rem',
        disabled: false,
        charnormal: true,
        ispassword: true,
        viewpass: true
      }
    ]);
  }, []);

  const Validar = () => {
    if (valuesfield[0] === '' || valuesfield[0] === undefined) {
      addToast('Nova senha é de preenchimento Obrigatório !', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
    } else if (valuesfield[1] === '' || valuesfield[1] === undefined) {
      addToast('Confirmação de senha é de preenchimento Obrigatório !', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
    } else if (valuesfield[0] !== valuesfield[1]) {
      addToast('As senhas não conferem !', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
    } else {
      let senha = valuesfield[1];
      senha = senha.toUpperCase();
      let usuario = Decode64(sessionStorage.getItem('user'));
      if (Decode64(sessionStorage.getItem('user')) === 'N') {
        senha = Encrypt(senha);
        const item = {};
        item['nome'] = usuario;
        item['senha'] = senha;
        item['senha2'] = senha;
        setCarregando(true);
        apiUpdate('Usuario', item).then((response) => {
          if (response.status === 200) {
            setCarregando(false);
            addToast('Senha alterada com Sucesso !', {
              placement: 'bottom-rigth',
              appearance: 'success',
              autoDismiss: true
            });
            navigate(BASE_URL, {
              state: {
                ...props
              }
            });
          }
        });
      } else {
        getPasswordAdmin(Decode64(sessionStorage.getItem('urlconnect')), usuario, senha).then((response) => {
          if (response.status === 200) {
            setCarregando(false);
            addToast('Senha alterada com Sucesso !', {
              placement: 'bottom-rigth',
              appearance: 'success',
              autoDismiss: true
            });
            navigate(BASE_URL, {
              state: {
                ...props
              }
            });
          }
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper aut-bg-img-side cotainer-fiuid align-items-stretch">
        <div className="row align-items-center w-100 align-items-stretch bg-white" style={{ marginRight: '2em' }}>
          <div
            className="d-none d-lg-flex"
            style={{
              backgroundImage: `url(data:image/png;base64,${sessionStorage.getItem('splash')})`,
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center'
            }}
          ></div>
        </div>
        <div className="col-lg-2.1 align-items-stret h-100 align-items-center d-flex justify-content-center">
          <div className="card center-login">
            <div className="card-body text-center">
              <div>
                <img
                  className="b-logo-login"
                  src={`data:image/jpeg;base64,${sessionStorage.getItem('logo')}`}
                  alt="Logo"
                  width={'310px'}
                  height={'129px'}
                />
              </div>
              <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
              <div id="divrecuperar">
                <div>
                  <p className="mb-2">Definição de nova Senha:</p>
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
                  <button id="btnmodificar" className="btn btn-primary shadow-2 mb-5" onClick={(e) => Validar()}>
                    Modificar senha
                  </button>
                </div>
              </div>
              <div className="site-databit">
                <a className="fa-xs" href="https://www.databit.com.br/" target="blank">
                  Copyright © 2024 by DataBit Tecnologia e Sistemas LTDA. All rights reserved
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Recuperar;
