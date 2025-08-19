import React, { useEffect } from 'react';
import Cadastro from '../../cadastro';

const PreContratoTipo = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Tipos de Pré-Contratos"
        table="TB01138"
        object="VW01129"
        classname="PrecontratoTipo"
        classobject="PrecontratoTipoVW"
        termlist="Tipo"
        moduleoption="12"
        primarykey="TB01138_CODIGO"
        fieldsdefault="TB01138_CODIGO,TB01138_NOME,TB01138_STATUSINICIAL,TB01136_NOME"
      />
    </React.Fragment>
  );
};

export default PreContratoTipo;
