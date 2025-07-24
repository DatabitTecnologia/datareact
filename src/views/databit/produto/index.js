import React from 'react';
import Cadastro from '../cadastro';

const Produto = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Cadastro de Produtos"
        table="TB01010"
        object="TB01010"
        classname="Produto"
        classobject="Produto"
        termlist="Produto"
        moduleoption="35"
        primarykey="TB01010_CODIGO"
        fieldsdefault="TB01010_CODIGO,TB01010_NOME"
      />
    </React.Fragment>
  );
};

export default Produto;