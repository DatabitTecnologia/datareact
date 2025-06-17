import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import Senha from '../senha';
import { Decode64, Encode64 } from '../../../../utils/crypto';
import { getConnectionCNPJ, posCli } from '../../../../api/apiconnect';
import { LinearProgress } from '@mui/material';
import { Message } from '../../../../components/Message';
import { CreateObject } from '../../../../components/CreateObject';
import { checkFileExists } from '../../../../utils/file';
import { DATABIT } from '../../../../config/constant';

const Parceiro = () => {
  const [tela, setTela] = React.useState(0);
  const [carregando, setCarregando] = React.useState(false);
  const [nome, setNome] = React.useState('');
  const { addToast } = useToasts();
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [startconfig, setStartconfig] = React.useState(false);
  const [inforParceiro, setInforParceiro] = React.useState([]);

  const Validar = () => {
    let sCnpj = valuesfield[0];
    if (sCnpj === '') {
      Message('frmparceiro', 'Falha de Autenticação', 'error', 'CNPJ é de preenchimento obrigatório !');
      return;
    } else {
      setCarregando(true);
      getConnectionCNPJ(Decode64(sessionStorage.getItem('urlconnect')), sCnpj).then((resultado) => {
        setInforParceiro(resultado.data);
      });
    }
  };

  useEffect(() => {
    DATABIT.islogged = false;
    const configUrl = `${process.env.PUBLIC_URL}/config.json`;
    checkFileExists(configUrl).then((exists) => {
      if (exists) {
        fetch(configUrl)
          .then((response) => response.json())
          .then((data) => {
            sessionStorage.setItem('urlconnect', Encode64(data.urlconnect));
            setStartconfig(true);
          })
          .catch((error) => {
            console.error('Erro ao carregar o arquivo JSON:', error);
          });
      } else {
        console.log('O arquivo não existe.');
      }
    });
  }, []);

  useEffect(() => {
    if (startconfig) {
      setFields([
        {
          id: 0,
          campo: 'CNPJ',
          funcao: 'CNPJ Parceiro DATABIT',
          tipo: 'varchar',
          nome: 'cnpj',
          tamanho: 14,
          tipoobject: 8,
          tipomascara: 9,
          widthfield: 22,
          measure: '22rem',
          disabled: false
        }
      ]);
      valuesfield[0] = localStorage.getItem('cnpj');
      setValuesfield([...valuesfield]);
      setTela(0);
    }
  }, [startconfig]);

  useEffect(() => {
    if (inforParceiro !== undefined && inforParceiro.length > 0) {
      let sCnpj = valuesfield[0];
      localStorage.setItem('cnpj', sCnpj);
      sessionStorage.setItem('parceiro', inforParceiro[0].CLIENTE);
      sessionStorage.setItem('url', inforParceiro[0].URL);
      sessionStorage.setItem('token', inforParceiro[0].TOKEN);
      sessionStorage.setItem('coddatabit', Encode64(inforParceiro[0].CODDATABIT));
      if (sessionStorage.getItem('url') !== '' && sessionStorage.getItem('cdu') !== '') {
        setNome(Decode64(inforParceiro[0].CLIENTE));
        posCli(Decode64(sessionStorage.getItem('urlconnect')), Decode64(sessionStorage.getItem('cdu')), inforParceiro[0].CODDATABIT).then(
          (response) => {
            if (response.status === 200) {
              const poscli = response.data;
              setCarregando(false);
              if (poscli[0].status === 1) {
                sessionStorage.setItem('count', Encode64(poscli[0].id.toString()));
                sessionStorage.setItem('user', '');
                setTela(1);
              } else {
                Message('frmparceiro', '', 'warning', poscli[0].mensagem);
                return;
              }
            }
          }
        );
      }
    } else {
      if (carregando) {
        addToast('CNPJ inexistênte ou inválido !', {
          placement: 'bottom-rigth',
          appearance: 'error',
          autoDismiss: true
        });
        setCarregando(false);
        return;
      }
    }
  }, [inforParceiro]);

  return (
    <div>
      {tela === 0 ? (
        <div id="frmparceiro" name="frmparceiro">
          <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
          <div>
            <p className="mb-2">Definição do parceiro DATABIT</p>
          </div>
          <Row style={{ marginBottom: '10px', textAlign: 'center' }}>
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
          </Row>
          <div>
            <button onClick={Validar} id="btnenviar" className="btn btn-primary shadow-2 mb-5">
              Validar
            </button>
          </div>
        </div>
      ) : (
        <Senha parceiro={nome} />
      )}
    </div>
  );
};

export default Parceiro;
