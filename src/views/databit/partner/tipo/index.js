import React from 'react';
import Cadastro from '../../cadastro';

const PartnerTipo = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Tipos de Compra"
        table="TB01152"
        object="VW01136"
        classname="PartnerTipo"
        classobject="PartnerTipoVW"
        termlist="Tipos de Compra"
        moduleoption="21"
        primarykey="TB01152_CODIGO"
        fieldsdefault="TB01152_CODIGO,TB01152_NOME,TB01152_STATUSINICIAL,TB01148_NOME"
      />
    </React.Fragment>
  );
};

export default PartnerTipo;
