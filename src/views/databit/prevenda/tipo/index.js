import React from 'react';
import Cadastro from '../../cadastro';

const PrevendaTipo = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Tipos de Pré-Venda"
        table="TB01160"
        object="VW01143"
        classname="PrevendaTipo"
        classobject="PrevendaTipoVW"
        termlist="Tipos de Pré-Venda"
        moduleoption="25"
        primarykey="TB01160_CODIGO"
        fieldsdefault="TB01160_CODIGO,TB01160_NOME,TB01160_STATUSINICIAL,TB01156_NOME"
      />
    </React.Fragment>
  );
};

export default PrevendaTipo;
