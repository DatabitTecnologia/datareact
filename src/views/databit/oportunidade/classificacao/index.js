import React from 'react';
import Cadastro from '../../cadastro';

const OportunidadeClassificacao = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Classificação de Oportunidades"
        table="TB01133"
        object="TB01133"
        classname="OportunidadeClassificacao"
        classobject="OportunidadeClassificacao"
        termlist="Classificação"
        moduleoption="6"
        primarykey="TB01133_CODIGO"
        fieldsdefault="TB01133_CODIGO,TB01133_NOME"
      />
    </React.Fragment>
  );
};

export default OportunidadeClassificacao;
