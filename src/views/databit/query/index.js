import React from 'react';
import Cadastro from '../cadastro';

const Query = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Definição de Querys"
        table="TB00113"
        object="TB00113"
        classname="Query"
        classobject="Query"
        termlist="Query"
        moduleoption="17"
        primarykey="TB00113_CODIGO"
        fieldsdefault="TB00113_CODIGO,TB00113_NOME,TB00113_OBJECT,TB00113_FILTER"
      />
    </React.Fragment>
  );
};

export default Query;
