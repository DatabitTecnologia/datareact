import React from 'react';
import Cadastro from '../cadastro';

const ServIncomp = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Serviços incompletos"
        table="TB01056"
        object="TB01056"
        classname="ServicoIncompleto"
        classobject="ServicoIncompleto"
        termlist="ServicoIncompleto"
        moduleoption="29"
        primarykey="TB01056_CODIGO"
        fieldsdefault="TB01056_CODIGO,TB01056_NOME"
      />
    </React.Fragment>
  );
};

export default ServIncomp;
