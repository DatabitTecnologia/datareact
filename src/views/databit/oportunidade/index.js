import React from 'react';
import Cadastro from '../cadastro';
import { Decode64 } from '../../../utils/crypto';

const Oportunidade = (props) => {
  return (
    <React.Fragment>
      <Cadastro
        title="Criação de Oportunidade"
        table="TB02255"
        object="VW02273"
        classname="Oportunidade"
        classobject="OportunidadeVW"
        termlist="Oportunidade"
        moduleoption="9"
        primarykey="TB02255_CODIGO"
        fieldsdefault="TB02255_CODIGO,TB02255_NOME,TB02255_CODEMP,TB02255_CODCLI,TB01008_NOME,TB02255_CODPROSPECT,TB01127_NOME,TB02255_CONTATO,TB01128_NOME,TB02255_CLASSIFICACAO,TB01133_NOME,TB02255_PREVISAO,TB02255_QTDE,TB02255_VLRNOTA"
        filterseller={Decode64(sessionStorage.getItem('manager')) === 'N' && Decode64(sessionStorage.getItem('seller')) !== 'ZZZZ'}
        setFilterseller={(data) => setFilterseller(data)}
        codseller={'CODVEN'}
        setCodseller={(data) => setCodseller(data)}
      />
    </React.Fragment>
  );
};

export default Oportunidade;
