import React from 'react';
import Cadastro from '../../cadastro';

const PrevendaStatus = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Status de Pré-Venda"
        table="TB01156"
        object="TB01156"
        classname="PrevendaStatus"
        classobject="PrevendaStatus"
        termlist="Status de Pré-Venda"
        moduleoption="24"
        primarykey="TB01156_CODIGO"
        fieldsdefault="TB01156_CODIGO,TB01156_NOME"
      />
    </React.Fragment>
  );
};

export default PrevendaStatus;
