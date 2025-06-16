import React from 'react';
import Cadastro from '../../cadastro';
import { Decode64 } from '../../../../utils/crypto';

const PartnerReceber = (props) => {
  const perfil = parseInt(sessionStorage.getItem('perfil'));
  const temple = Decode64(sessionStorage.getItem('temple'));
  const partner = Decode64(sessionStorage.getItem('partner'));

  return (
    <React.Fragment>
      <Cadastro
        title="Compras à Receber"
        table="TB04055"
        object="VW04055"
        classname="PartnerReceber"
        classobject="PartnerReceberVW"
        termlist="Compras à Receber"
        moduleoption="23"
        primarykey="TB04055_CODIGO"
        fieldsdefault="TB04055_CODIGO,TB04055_NUMTITULO,TB04055_DATA,TB04055_DTVENC,TB04055_CODCLI,TB01008_NOME,TB04055_CODSITE,TB02176_NOME,TB04055_VLRTITULO,TB04055_DTBAIXA,TB04055_NOMEPOSFIM"
        filteraux={perfil === 1 ? `TB04055_CODSITE = '${temple}'` : perfil === 2 ? `TB04055_CODCLI = '${partner}'` : undefined}
      />
    </React.Fragment>
  );
};

export default PartnerReceber;
