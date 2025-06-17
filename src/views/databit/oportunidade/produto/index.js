import React from 'react';
import Cadastro from '../../cadastro';

const OportunidadeProduto = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Definição de Produtos"
        table="TB01134"
        object="TB01134"
        classname="OportunidadeProduto"
        classobject="OportunidadeProduto"
        termlist="Produtos"
        moduleoption="7"
        primarykey="TB01134_CODIGO"
        fieldsdefault="TB01134_CODIGO,TB01134_NOME"
      />
    </React.Fragment>
  );
};

export default OportunidadeProduto;
