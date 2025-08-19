import React from 'react';
import Cadastro from '../../cadastro';

const PartnerStatus = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Status de Compras"
        table="TB01148"
        object="VW01135"
        classname="PartnerStatus"
        classobject="PartnerStatusVW"
        termlist="Status de Compras"
        moduleoption="20"
        primarykey="TB01148_CODIGO"
        fieldsdefault="TB01148_CODIGO,TB01148_NOME"
      />
    </React.Fragment>
  );
};

export default PartnerStatus;
