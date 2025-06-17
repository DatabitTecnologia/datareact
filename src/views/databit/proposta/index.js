import React from 'react';
import Cadastro from '../cadastro';

const PropostaModelo = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Modelos de Proposta"
        table="TB01140"
        object="TB01140"
        classname="PropostaModelo"
        classobject="PropostaModelo"
        termlist="Modelos"
        moduleoption="15"
        primarykey="TB01140_CODIGO"
        fieldsdefault="TB01140_CODIGO,TB01140_NOME,TB01140_ARQUIVO"
      />
    </React.Fragment>
  );
};

export default PropostaModelo;
