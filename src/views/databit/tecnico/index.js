import React from 'react';
import Cadastro from '../cadastro';

const Tecnico = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Cadastro de Tecnicos"
        table="TB01024"
        object="VW01008"
        classname="Tecnico"
        classobject="TecnicoVW"
        termlist="Técnico"
        moduleoption="31"
        primarykey="TB01024_CODIGO"
        fieldsdefault="TB01024_CODIGO,TB01024_NOME,TB01024_CPF,TB01024_IDENT,TB01024_DTANIV,TB01024_COMISSAO,TB00012_CIDADE,TB00012_ESTADO"
         // Campanhas
        fieldemail="TB00012_EMAIL"
        fieldwhats="TB00012_CELULAR2"
        possuicampanhas={true}
        tabcampanha="TB00012"
        classcampanha="Endereco"
      />
    </React.Fragment>
  );
};

export default Tecnico;
