import React from 'react';
import Cadastro from '../cadastro';
import { Decode64 } from '../../../utils/crypto';

const Contato = () => {
  return (
    <React.Fragment>
      <Cadastro
        title="Definição de Contatos"
        table="TB01128"
        object="VW01125"
        classname="Contato"
        classobject="ContatoVW"
        termlist="Contatos"
        moduleoption="3"
        primarykey="TB01128_CODIGO"
        fieldsdefault="TB01128_CODIGO,TB01128_NOME,TB01128_CARGO,TB01128_FONE,TB01128_CELULAR,TB01128_WHATSAPP,TB01128_DTNASC,TB01128_CODCLI,TB01128_CODPROSPECT"
        filterseller={Decode64(sessionStorage.getItem('manager')) === 'N' && Decode64(sessionStorage.getItem('seller')) !== 'ZZZZ'}
        setFilterseller={(data) => setFilterseller(data)}
        codseller={'CODVEN'}
        // Campanhas
        fieldemail="TB01128_EMAIL"
        fieldwhats="TB01128_WHATSAPP"
        possuicampanhas={true}
        tabcampanha="TB01128"
        classcampanha="Contato"
        // Filtro auxiliar, usuário parceiro
        filteraux={
          parseInt(sessionStorage.getItem('perfil')) === 2
            ? "TB01128_CODCLI = '" + Decode64(sessionStorage.getItem('partner')) + "' "
            : undefined
        }
      />
    </React.Fragment>
  );
};

export default Contato;
