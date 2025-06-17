import React from 'react';
import Cadastro from '../../cadastro';
import { Decode64 } from '../../../../utils/crypto';

const Partner = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Solicitações de Compra"
        table="TB02300"
        object="VW02306"
        classname="Partner"
        classobject="PartnerVW"
        termlist="Solicitações de Compra"
        moduleoption="22"
        primarykey="TB02300_CODIGO"
        fieldsdefault="TB02300_CODIGO,TB02300_DATA,TB02300_NOME,TB02300_CODSITE,TB02176_NOME,TB02300_TIPO,TB02300_QTDE,TB02300_VLRNOTA"
        filteraux={
          parseInt(sessionStorage.getItem('perfil')) === 1
            ? "TB02300_CODSITE = '" + Decode64(sessionStorage.getItem('temple')) + "' "
            : undefined
        }
      />
    </React.Fragment>
  );
};

export default Partner;
