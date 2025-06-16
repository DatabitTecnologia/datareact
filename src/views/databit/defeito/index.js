import React from 'react';
import Cadastro from '../cadastro';

const Defeito = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Defeitos"
        table="TB01048"
        object="TB01048"
        classname="Defeito"
        classobject="Defeito"
        termlist="Defeito"
        moduleoption="27"
        primarykey="TB01048_CODIGO"
        fieldsdefault="TB01048_CODIGO,TB01048_NOME"
      />
    </React.Fragment>
  );
};

export default Defeito;
