import React from 'react';
import Cadastro from '../cadastro';

const Nivel = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Nivel de Cliente"
        table="TB01019"
        object="TB01019"
        classname="Nivel"
        classobject="Nivel"
        termlist="Nível"
        moduleoption="16"
        primarykey="TB01009_CODIGO"
        fieldsdefault="TB01009_CODIGO,TB01009_NOME"
      />
    </React.Fragment>
  );
};

export default Nivel;
