import React, { useEffect, useState } from 'react';
import Cadastro from '../cadastro';
import { Decode64 } from '../../../utils/crypto';

const Cliente = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Clientes"
        table="TB01008"
        object="VW01007"
        classname="Cliente"
        classobject="ClienteVW"
        termlist="Clientes"
        moduleoption="1"
        primarykey="TB01008_CODIGO"
        fieldsdefault="TB01008_CODIGO,TB01008_NOME,TB01008_CNPJ,TB01008_INSCEST,TB01008_INSCMUN,TB01008_CPF,TB01008_IDENT,TB00012_CIDADE,TB00012_ESTADO"
        filterseller={
          Decode64(sessionStorage.getItem('manager')) === 'N' &&
          Decode64(sessionStorage.getItem('consclient')) === 'N' &&
          Decode64(sessionStorage.getItem('seller')) !== 'ZZZZ'
        }
        setFilterseller={(data) => setFilterseller(data)}
        codseller={'VENDEDOR'}
        setCodseller={(data) => setCodseller(data)}
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

export default Cliente;
