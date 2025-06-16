const menuItems = {
  items: [
    {
      children: [
        {
          id: 'principal',
          title: 'Página Inicial',
          type: 'item',
          url: '/index',
          classes: 'item',
          icon: 'feather icon-bar-chart-2'
        }
      ],
      id: 'principal',
      title: 'Página Inicial',
      type: 'group'
    },
    {
      id: 'clientes',
      title: 'Clientes',
      type: 'group',
      children: [
        {
          id: 'cli',
          title: 'Clientes',
          type: 'collapse',
          icon: 'feather icon-users',
          children: [
            {
              id: 'ativo',
              title: 'Clientes Ativos',
              type: 'item',
              url: '/cliente'
            },
            {
              id: 'prospect',
              title: 'Clientes Prospect',
              type: 'item',
              url: '/prospect'
            },
            {
              id: 'contato',
              title: 'Definição Contatos',
              type: 'item',
              url: '/contato'
            }
          ]
        }
      ]
    },
    {
      id: 'vendedor',
      title: 'Vendedores',
      type: 'group',
      children: [
        {
          id: 'vendedor',
          title: 'Vendedores',
          type: 'item',
          url: '/vendedor',
          classes: 'nav-item',
          icon: 'feather icon-user-check'
        }
      ]
    },
    {
      id: 'prodserv',
      title: 'Produtos / Serviços',
      type: 'group',
      children: [
        {
          id: 'prodservitem',
          title: 'Produtos / Serviços',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'produto',
              title: 'Definição de Produtos',
              type: 'item',
              url: '/oportunidade/produto'
            },
            {
              id: 'servico',
              title: 'Definição de Serviços',
              type: 'item',
              url: '/oportunidade/servico'
            }
          ]
        }
      ]
    },
    {
      id: 'proposta',
      title: 'Modelos de Proposta',
      type: 'group',
      icon: 'icon-support',
      children: [
        {
          id: 'proposta',
          title: 'Modelos de Proposta',
          type: 'item',
          url: '/proposta',
          classes: 'nav-item',
          icon: 'feather icon-file'
        }
      ]
    },
    {
      id: 'oportuinidade',
      title: 'Oportunidades',
      type: 'group',
      children: [
        {
          id: 'oportunidades',
          title: 'Oportunidades',
          type: 'collapse',
          icon: 'feather icon-search',
          children: [
            {
              id: 'statusop',
              title: 'Status de Oportunidade',
              type: 'item',
              url: '/oportunidade/status'
            },
            {
              id: 'tipoop',
              title: 'Tipos de Oportunidade',
              type: 'item',
              url: '/oportunidade/tipo'
            },
            {
              id: 'class',
              title: 'Classificações de Oportunidade',
              type: 'item',
              url: '/oportunidade/classificacao'
            },
            {
              id: 'criacaoop',
              title: 'Criação de Oportunidades',
              type: 'item',
              url: '/oportunidade/index'
            },
            {
              id: 'painelop',
              title: 'Painel de Acompanhamento',
              type: 'item',
              url: '/oportunidade/painel'
            }
          ]
        }
      ]
    },
    {
      id: 'precontrato',
      title: 'Pré-Contratos',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'precontrato',
          title: 'Pré-Contratos',
          type: 'collapse',
          icon: 'feather icon-file-text',
          children: [
            {
              id: 'statuscon',
              title: 'Status de Pré-Contrato',
              type: 'item',
              url: '/precontrato/status'
            },
            {
              id: 'tipocon',
              title: 'Tipos de Pré-Contrato',
              type: 'item',
              url: '/precontrato/tipo'
            },
            {
              id: 'criacaocon',
              title: 'Criação de Pré-Contrato',
              type: 'item',
              url: '/precontrato/index'
            },
            {
              id: 'painelcon',
              title: 'Painel de Acompanhamento',
              type: 'item',
              url: '/precontrato/painel'
            },
            {
              id: 'pendpre',
              title: 'Analise de Pendências',
              type: 'item',
              url: '/precontrato/pendencia'
            }
          ]
        }
      ]
    },

    {
      id: 'contrato',
      title: 'Contratos',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'contrato',
          title: 'Contratos',
          type: 'collapse',
          icon: 'feather icon-file-plus',
          children: [
            {
              id: 'acompanha',
              title: 'Acompanhamento de Contratos',
              type: 'item',
              url: '/*'
            }
          ]
        }
      ]
    },
    {
      id: 'chat',
      title: 'Controle de Chat',
      type: 'group',
      icon: 'icon-message-circle',
      children: [
        {
          id: 'chat',
          title: 'Controle de Chat',
          type: 'item',
          url: '/chat',
          classes: 'nav-item',
          icon: 'feather icon-message-circle'
        }
      ]
    },
    {
      id: 'user',
      title: 'Seguranca',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'seguranca',
          title: 'Segurança',
          type: 'collapse',
          icon: 'feather icon-lock',
          children: [
            {
              id: 'caduser',
              title: 'Cadastro de Usuários',
              type: 'item',
              url: '/usuario'
            },
            {
              id: 'permissão',
              title: 'Permissão de Usuários',
              type: 'item',
              url: '*'
            },
            {
              id: 'senha',
              title: 'Alterar Senha',
              type: 'item',
              url: '*'
            }
          ]
        }
      ]
    },

    {
      id: 'config',
      title: 'Configurações',
      type: 'group',
      icon: 'icon-support',
      children: [
        {
          id: 'config',
          title: 'Configurações',
          type: 'item',
          url: '*',
          classes: 'nav-item',
          icon: 'feather icon-settings'
        }
      ]
    },
    {
      id: 'sair',
      title: 'Sair',
      type: 'group',
      icon: 'icon-support',
      children: [
        {
          id: 'sair',
          title: 'Sair do DataClient',
          type: 'item',
          url: '/',
          classes: 'nav-item',
          icon: 'feather icon-log-out'
        }
      ]
    }
  ]
};

export default menuItems;
