import React from 'react';
import Cadastro from '../cadastro';

const GrupoProdutos = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Grupo de Produtos"
        table="TB01002"
        object="TB01002"
        classname="Grupo"
        classobject="Grupo"
        termlist="Grupo"
        moduleoption="32"
        primarykey="TB01002_CODIGO"
        fieldsdefault="TB01002_CODIGO,TB01002_NOME"
      />
    </React.Fragment>
  );
};

export default GrupoProdutos;
