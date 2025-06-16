import React from 'react';
import Cadastro from '../../cadastro';

const OportunidadeServico = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Definição de Serviços"
        table="TB01135"
        object="TB01135"
        classname="OportunidadeServico"
        classobject="OportunidadeServico"
        termlist="Serviço"
        moduleoption="8"
        primarykey="TB01135_CODIGO"
        fieldsdefault="TB01135_CODIGO,TB01135_NOME"
      />
    </React.Fragment>
  );
};

export default OportunidadeServico;
