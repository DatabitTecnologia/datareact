import React from 'react';
import Cadastro from '../../cadastro';

const OportunidadeTipo = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Tipos de Oportunidades"
        table="TB01132"
        object="VW01127"
        classname="OportunidadeTipo"
        classobject="OportunidadeTipoVW"
        termlist="Tipo"
        moduleoption="5"
        primarykey="TB01132_CODIGO"
        fieldsdefault="TB01132_CODIGO,TB01132_NOME,TB01132_CLASSIFICACAO,TB01132_STATUSINICIAL,TB01129_NOME"
      />
    </React.Fragment>
  );
};

export default OportunidadeTipo;
