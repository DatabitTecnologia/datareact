import React, { useEffect, useState } from 'react';
import InforCliente from '../../cliente/inforcliente';
import InforProspect from '../../prospect/inforprospect';
import InforContato from '../../contato/inforcontato';
import InforOportunidadeStatus from '../../oportunidade/status/inforstatus';
import InforOportunidadeTipo from '../../oportunidade/tipo/infortipo';
import InforOportunidadeClassificacao from '../../oportunidade/classificacao/inforclassificacao';
import InforOportunidadeProduto from '../../oportunidade/produto/inforproduto';
import InforOportunidadeServico from '../../oportunidade/servico/inforservico';
import InforOportunidade from '../../oportunidade/inforoportunidade';
import InforPrecontrato from '../../precontrato/inforprecontrato';
import InforPrecontratoStatus from '../../precontrato/status/inforstatus';
import InforPrecontratoTipo from '../../precontrato/tipo/infortipo';
import InforVendedor from '../../vendedor/inforvendedor';
import InforUsuario from '../../usuario/inforusuario';
import InforPropostaModelo from '../../proposta/inforproposta';
import InforNivel from '../../nivel/infornivel';
import InforQuery from '../../query/inforquery';
import InforDashboard from '../../dashboard/infordashboard';
import InforSite from '../../site/inforsite';
import InforPartnerStatus from '../../partner/status/inforstatus';
import InforPartnerTipo from '../../partner/tipo/infortipo';
import InforPartner from '../../partner/compra/inforcompra';
import InforPartnerReceber from '../../partner/receber/inforpartnerreceber';
import InforPrevendaStatus from '../../prevenda/status/inforstatus';
import InforPrevendaTipo from '../../prevenda/tipo/infortipo';
import InforPrevenda from '../../prevenda/inforprevenda';
import InforDefeito from '../../defeito/infordefeito';
import InforOsCondicao from '../../codinterv/inforoscondicao';
import InforServIncomp from '../../servincompl/inforservincomp';
import InforStatusOs from '../../statusos/inforstatusos';
import InforTecnico from '../../tecnico/infortecnico';
import InforGrupoProdutos from '../../grupoproduto/inforgrupoproduto';
import InforSubgrupoProdutos from '../../subgrupoproduto/inforsubgrupoprodutos';

const OptionInfor = (props) => {
  const { showinfor, setShowinfor } = props;
  const { rowselect, setRowselect } = props;
  const { onupdate, setOnupdate } = props;
  switch (props.option) {
    case '1': {
      // Cadastro de Clientes
      return (
        <InforCliente
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforCliente>
      );
    }
    case '2': {
      // Cadastro de Clientes Prospect
      return (
        <InforProspect
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforProspect>
      );
    }
    case '3': {
      // Definição de Contatos
      return (
        <InforContato
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforContato>
      );
    }
    case '4': {
      // Status de Oportunidades
      return (
        <InforOportunidadeStatus
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforOportunidadeStatus>
      );
    }
    case '5': {
      // Tipo de Oportunidades
      return (
        <InforOportunidadeTipo
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforOportunidadeTipo>
      );
    }
    case '6': {
      // Classificação de Oportunidades
      return (
        <InforOportunidadeClassificacao
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforOportunidadeClassificacao>
      );
    }
    case '7': {
      // Definição de Produtos
      return (
        <InforOportunidadeProduto
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforOportunidadeProduto>
      );
    }
    case '8': {
      // Definição de Serviços
      return (
        <InforOportunidadeServico
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforOportunidadeServico>
      );
    }
    case '9': {
      // Criação de Oportunidade
      return (
        <InforOportunidade
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforOportunidade>
      );
    }
    case '10': {
      // Criação de Pré-Contratos
      return (
        <InforPrecontrato
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforPrecontrato>
      );
    }
    case '11': {
      // Status de Pré-Contratos
      return (
        <InforPrecontratoStatus
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforPrecontratoStatus>
      );
    }
    case '12': {
      // Tipos de Pré-Contratos
      return (
        <InforPrecontratoTipo
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforPrecontratoTipo>
      );
    }
    case '13': {
      // Vendedores
      return (
        <InforVendedor
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforVendedor>
      );
    }
    case '14': {
      // Usuuários
      return (
        <InforUsuario
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforUsuario>
      );
    }
    case '15': {
      // Modelos de Proposta
      return (
        <InforPropostaModelo
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforPropostaModelo>
      );
    }
    case '16': {
      //Nivel de Cliente
      return (
        <InforNivel
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforNivel>
      );
    }
    case '17': {
      //Definição de Querya
      return (
        <InforQuery
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforQuery>
      );
    }
    case '18': {
      //Criação de Dashboards
      return (
        <InforDashboard
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforDashboard>
      );
    }
    case '19': {
      //Definição de Sites
      return (
        <InforSite
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforSite>
      );
    }
    case '20': {
      //Status de Compras (DataPartner)
      return (
        <InforPartnerStatus
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforPartnerStatus>
      );
    }
    case '21': {
      //Tipos de Compras (DataPartner)
      return (
        <InforPartnerTipo
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforPartnerTipo>
      );
    }
    case '22': {
      //Solicitações de Compras (DataPartner)
      return (
        <InforPartner
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforPartner>
      );
    }
    case '23': {
      //Compras à Receber (DataPartner)
      return (
        <InforPartnerReceber
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforPartnerReceber>
      );
    }
    case '24': {
      //Status de Pré-Venda (DataClient)
      return (
        <InforPrevendaStatus
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforPrevendaStatus>
      );
    }
    case '25': {
      //Tipos de Pré-Venda (DataClient)
      return (
        <InforPrevendaTipo
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforPrevendaTipo>
      );
    }
    case '26': {
      //Controle de Pré-Vendas (DataClient)
      return (
        <InforPrevenda
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforPrevenda>
      );
    }
    case '27': {
      //Defeitos
      return (
        <InforDefeito
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforDefeito>
      );
    }
    case '28': {
      //Condições de Intervenção
      return (
        <InforOsCondicao
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforOsCondicao>
      );
    }
    case '29': {
      //Serviços Incompletos
      return (
        <InforServIncomp
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforServIncomp>
      );
    }
    case '30': {
      //Status de OS
      return (
        <InforStatusOs
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforStatusOs>
      );
    }
    case '31': {
      //Definições de Tecnicos
      return (
        <InforTecnico
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforTecnico>
      );
    }
    case '32': {
      //Grupo de Produtos
      return (
        <InforGrupoProdutos
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforGrupoProdutos>
      );
    }
    case '33': {
      //Sub-Grupo de Produtos
      return (
        <InforSubgrupoProdutos
          showinfor={showinfor}
          rowselect={rowselect}
          setRowselect={(data) => setRowselect(data)}
          setShowinfor={(data) => setShowinfor(data)}
          onupdate={onupdate}
          setOnupdate={(data) => setOnupdate(data)}
        ></InforSubgrupoProdutos>
      );
    }
  }
};

export default OptionInfor;
