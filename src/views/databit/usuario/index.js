import React from 'react';
import Cadastro from '../cadastro';

const Usuario = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Usuários"
        table="TB00035"
        object="VW00008"
        classname="Usuario"
        classobject="UsuarioVW"
        termlist="Usuários"
        moduleoption="14"
        primarykey="TB00035_NOME"
        fieldsdefault="TB00035_NOME,TB00035_EMAIL,TB00035_SETOR,TB00035_GRUPO,TB00035_VEND,TB01006_NOME,TB00035_CODTEC,TB01024_NOME"
      />
    </React.Fragment>
  );
};

export default Usuario;
