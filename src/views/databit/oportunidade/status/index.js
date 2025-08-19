import React from 'react';
import Cadastro from '../../cadastro';

const OportunidadeStatus = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Status de Oportunidades"
        table="TB01129"
        object="TB01129"
        classname="OportunidadeStatus"
        classobject="OportunidadeStatus"
        termlist="Status"
        moduleoption="4"
        primarykey="TB01129_CODIGO"
        fieldsdefault="TB01129_CODIGO,TB01129_NOME,TB01129_TIPO"
      />
    </React.Fragment>
  );
};

export default OportunidadeStatus;
