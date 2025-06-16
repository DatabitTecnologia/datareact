import React from 'react';
import Cadastro from '../cadastro';

const OsCondicao = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Condição de Intervenção"
        table="TB01055"
        object="VW01106"
        classname="OsCondicao"
        classobject="OsCondicaoVW"
        termlist="Condição"
        moduleoption="28"
        primarykey="TB01055_CODIGO"
        fieldsdefault="TB01055_CODIGO,TB01055_NOME"
      />
    </React.Fragment>
  );
};

export default OsCondicao;
