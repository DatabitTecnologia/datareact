import React from 'react';
import Cadastro from '../cadastro';

const Marca = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Marca"
        table="TB01047"
        object="TB01047"
        classname="Marca"
        classobject="Marca"
        termlist="Marca"
        moduleoption="34"
        primarykey="TB01047_CODIGO"
        fieldsdefault="TB01047_CODIGO,TB01047_NOME"
      />
    </React.Fragment>
  );
};

export default Marca;
