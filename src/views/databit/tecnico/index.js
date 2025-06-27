import React from 'react';
import Cadastro from '../cadastro';

const Tecnico = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Definição de Tecnicos"
        table="TB01024"
        object="TB01024"
        classname="Tecnico"
        classobject="Tecnico"
        termlist="Tecnico"
        moduleoption="31"
        primarykey="TB01024_CODIGO"
        fieldsdefault="TB01024_CODIGO,TB01024_NOME,TB01024_CPF,TB01024_IDENT,TB01024_DTANIV,TB01024_COMISSAO"
      />
    </React.Fragment>
  );
};

export default Tecnico;