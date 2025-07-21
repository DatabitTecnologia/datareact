import React from 'react';
import Cadastro from '../cadastro';

const SubGruposProdutos = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Subgrupos de Produtos"
        table="TB01018"
        object="TB01018"
        classname="Subgrupo"
        classobject="Subgrupo"
        termlist="Subgrupo"
        moduleoption="33"
        primarykey="TB01018_CODIGO"
        fieldsdefault="TB01018_CODIGO,TB01018_NOME"
      />
    </React.Fragment>
  );
};

export default SubGruposProdutos;
