import React from 'react';
import Cadastro from '../cadastro';

const Site = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Definição de Sites"
        table="TB02176"
        object="VW02233"
        classname="ContratoSite"
        classobject="ContratoSiteVW"
        termlist="Site"
        moduleoption="19"
        primarykey="TB02176_CODIGO"
        fieldsdefault="TB02176_CODIGO,TB02176_NOME,TB02176_BAIRRO,TB02176_CIDADE,TB02176_ESTADO,TB02176_CEP,TB02176_FONE,TB02176_CONTATO,TB02176_EMAIL"
      />
    </React.Fragment>
  );
};

export default Site;
