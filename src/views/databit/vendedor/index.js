import React from 'react';
import Cadastro from '../cadastro';

const Vendedor = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Vendedores"
        table="TB01006"
        object="VW01002"
        classname="Vendedor"
        classobject="VendedorVW"
        termlist="Vendedores"
        moduleoption="13"
        primarykey="TB01006_CODIGO"
        fieldsdefault="TB01006_CODIGO,TB01006_NOME,TB01006_CPF,TB01006_IDENT,TB01006_DTANIV,TB00012_CIDADE,TB00012_ESTADO"
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

export default Vendedor;
