import React, { useEffect } from 'react';
import Cadastro from '../../cadastro';

const PreContratoStatus = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Status de Pré-Contratos"
        table="TB01136"
        object="TB01136"
        classname="PrecontratoStatus"
        classobject="PrecontratoStatus"
        termlist="Status"
        moduleoption="11"
        primarykey="TB01136_CODIGO"
        fieldsdefault="TB01136_CODIGO,TB01136_NOME,TB01136_TIPO"
      />
    </React.Fragment>
  );
};

export default PreContratoStatus;
