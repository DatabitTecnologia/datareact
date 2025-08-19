import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Button, Card, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { apiInsert, apiDelete, apiUpdate, apiList, apiFind, apiID, apiExec } from '../../../../api/crudapi';
import { CreateObject } from '../../../../components/CreateObject';
import Address from '../address';
import { converterMillis } from '../../../../utils/converterMillis';
import { ConfigContext } from '../../../../contexts/ConfigContext';
import { Confirmation } from '../../../../components/Confirmation';
import OportunidadeItem from '../../oportunidade/item';
import { Decode64 } from '../../../../utils/crypto';
import Avatar from '../../avatar';
import Documento from '../../documento';
import Email from '../../email';
import Signature from '../../signature';
import PropostaViewer from '../../proposta/viewer';
import Layout from '../layout';
import DashboardConfig from '../../dashboard/config';
import PartnerItem from '../../partner/item';
import Movimentacao from '../../movimentacao';

const Infor = (props) => {
  // State de informação de campos
  // Cadastro atual
  const { valuesfield, setValuesfield } = props; // Valores dos campos
  const { valuesfield2, setValuesfield2 } = props; // Valores dos campos lookup
  const { valuesdisable, setValuesdisable } = props; // Campo será desabilitado ou não
  const { valuesinvisible, setValuesinvisible } = props; // Campo será invisível em tempo de execução ou não
  const { valuesname, setValuesname } = props; // Nomes dos campos
  const { valuesrequired, setValuesrequired } = props; // Campos de preenchimento obrigatório ou não
  const { valuesindex, setValuesindex } = props; // Ordem dos campos
  const { fields, setFields } = props; // Propriedade dos campos
  const { valuesbefore, setValuesbefore } = props; // Valor ANTES de editar
  const { valuesafter, setValuesafter } = props; // Valor APÓS salvar

  // Definição de endereços
  const { valuesaddress, setValuesaddress } = props; // Valores dos campos (endereços)
  const { valuesaddressdisable, setValuesaddressdisable } = props; // Campo será desabilitado ou não (endereços)
  const { valuesaddressname, setValuesaddressname } = props; // Nomes dos campos (endereços)
  const { valuesaddressrequired, setValuesaddressrequired } = props; // Campos de preenchimento obrigatório ou não (endereços)

  // Definição de ações (Botões)
  const { actions, setActions } = props;

  const { events, setEvents } = props; // Cabeçalho
  const { eventsitem, setEventsitem } = props; // Item
  const { eventsserv, setEventsserv } = props; // Serviço
  const { eventspar, setEventspar } = props; // Parcela
  // Definição de eventos
  // 1 = Before Insert
  // 2 = After Insert
  // 3 = Before Delete
  // 4 = After Delete
  // 5 = Before Edit
  // 6 = After Edit
  // 7 = Before Save
  // 8 = After Save (Insert)
  // 9 = After Save (Update)
  // 10 = Before Cancel
  // 11 = After Cancel
  // 12 = After Confirm Delete

  // Abrir a tela de cadastro em um modal
  const { openmodal, setOpenmodal } = props;

  // Campos a serem preenchdidos na inclusão automática
  const { fieldsauto, setFieldsauto } = props;

  // Link para os casos de fechamento da tela, abrir na tela de origem da chamada
  const { linkescape, setLinkescape } = props;

  const { rowselect, setRowselect } = props;
  const { disabled, setDisabled } = props;
  const { showinfor, setShowinfor } = props;
  const { onupdate, setOnupdate } = props;

  // Permissões do Módulo
  const [permissions, setPermissions] = React.useState([]);

  // Parâmetros dos módulos de movimentações:
  // Cabeçalho
  const { fieldscab, setFieldscab } = props; // Campos de cabeçalho da Movimentação
  // Produtos
  const { tableitem, classitem } = props; // Tabela e Classe do Item
  const { columnsitem, setColumnsitem } = props; // Colunas na Listagem
  const { fieldsitem, setFieldsitem } = props; // Campos de Exibiçao (Listagem)
  const { fieldslanc, setFieldslanc } = props; // Campos de Exibiçao (Lançamento)
  const { fieldsimp, setFieldsimp } = props; // Campos de Exibiçao (Impostos)
  const { fieldsarredonda, setFieldsarredonda } = props; // Campos de Arredondamento
  const { typeprice } = props; // Tipo de Preço
  const { refreshprice, setRefreshprice } = props; // Atualizar preços automaticamente
  /*
  0 - Tabela de Preços 
  1 - Preço de Venda (Mercadoria, Praticado ou Promoção)
  2 - Custo
  3 - Compra
  */
  const { entsai } = props; // Operação de Estoque
  /*
  N - Neutro
  E - Entrada
  S - Saída
  */
  const { coddest } = props; // Campo destinatário
  const { tabdest } = props; // Tabela destinatário
  const { typestock } = props; // Tipo de Estoque
  /*
  C - Comércio
  I - Indústria
  U - Imobilizado (Uso e Consumo)
  R - Rma 
  E - Rma Recebido
  */
  const { contabil } = props; // Estoque Contábil
  // Serviços
  const { tableserv, classserv } = props; // Tabela e Classe do Serviço
  const { columnsserv, setColumnsserv } = props; // Colunas na Listagem
  const { fieldsimpserv, setFieldsimpserv } = props; // Campos de Exibiçao (Impostos)
  const { fieldsarredondaserv, setFieldsarredondaserv } = props; // Campos de Arredondamento

  // Parcelas
  const { tablepar, classpar, recalcpar } = props; // Tabela e Classe de Classes
  const { columnspar, setColumnspar } = props; // Colunas na Listagem
  const { fieldspar, setFieldspar } = props; // Campos de Exibiçao

  // State de Operação
  const [valuesant, setValuesant] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [forms, setForms] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [showplus, setShowplus] = useState(false);
  const [option, setOption] = React.useState(1);
  const [typeaddress, setTypeaddress] = React.useState('01');
  const [processa, setProcessa] = React.useState(false);
  const [inclusao, setInclusao] = React.useState(false);
  const [statusend, setStatusend] = React.useState(0);
  const { addToast } = useToasts();
  const [montartela, setMontartela] = React.useState(false);
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const navigate = useNavigate();
  const [disabledform, setDisabledform] = useState(true);
  const [showdoc, setShowdoc] = useState(false);
  const [showemail, setShowemail] = useState(false);
  const [scrollEl, setScrollEl] = React.useState();
  const [itemselec, setItemselec] = React.useState();
  const [modulo, setModulo] = React.useState('');
  const [optionmov, setOptionmov] = React.useState(0);
  const [movimento, setMovimento] = React.useState([]);

  const Processar = () => {
    setCarregando(true);
    apiFind(
      'Modulo',
      '*',
      '',
      "TB00120_TABELA = '" + props.table + "' and TB00120_SYSTEM = " + Decode64(sessionStorage.getItem('system'))
    ).then((response) => {
      if (response.status === 200) {
        setModulo(response.data.nome);
        apiList(
          'GroupForm',
          'TB00107_CODIGO,TB00107_NOME,TB00107_SITUACAO,TB00107_TABELA,TB00107_FORMS,TB00107_PADRAO,TB00107_ORDEM',
          '',
          "TB00107_TABELA = '" +
            props.table +
            "' and TB00107_SITUACAO = 'A' and TB00107_SYSTEM = " +
            Decode64(sessionStorage.getItem('system')) +
            ' ORDER BY TB00107_ORDEM '
        ).then((response) => {
          if (response.status === 200) {
            setGroups(response.data);
            apiList(
              'FormVW',
              'TB00108_CODIGO, TB00108_NOME, TB00108_SITUACAO, TB00108_GRUPO, TB00108_PADRAO, TB00108_TIPO, TB00108_CODREACT, TB00108_LARGURA, TB00108_ORDEM, TB00108_TIPOESPECIAL',
              "TB00107_NOME AS nomegrupo, cast(TB00108_LARGURA as varchar(10))+'%' as width ",
              "TB00108_GRUPO IN (SELECT TB00107_CODIGO FROM TB00107 WHERE TB00107_TABELA = '" +
                props.table +
                "')  and TB00108_SITUACAO = 'A' and TB00108_SYSTEM = " +
                Decode64(sessionStorage.getItem('system')) +
                '  ORDER BY TB00108_ORDEM '
            ).then((response) => {
              if (response.status === 200) {
                setForms(response.data);
                apiList(
                  'FieldFormVW',
                  'TB00109_ORDEM,TB00109_TABELA,TB00109_CAMPO,TB00109_ISPRIMARY,TB00109_FUNCAO,TB00109_SELEC,TB00109_FORM,TB00109_TIPO,TB00109_TAMANHO,' +
                    'TB00109_FOREIGN,TB00109_KEY,TB00109_TABELAREF,TB00109_CAMPOREF,TB00109_DESCRICAOREF,TB00109_ISFOREIGN,TB00109_TIPOOBJECT,TB00109_TIPOMASCARA,' +
                    'TB00109_DECIMAL,TB00109_LARGURA,TB00109_VALUECHECKED,TB00109_VALUEUNCHECKED,TB00109_ITENS,TB00109_VALUES,TB00109_VIEW,TB00109_MASCARA,TB00109_TIPOMULT,' +
                    'TB00109_DISABLEINSERT,TB00109_DISABLEUPDATE,TB00109_CAMPOLIST,TB00109_CAMPOREFDROP,TB00109_FILTERAUX,TB00109_CHARNORMAL,TB00109_SITGROUP,TB00109_SITFORM',
                  "cast(1 as int) as line, cast(TB00109_LARGURA as int) as widthfield, cast(TB00109_LARGURA as varchar(10))+'rem' as measure, cast(TB00109_LARGURA - 10 as int) as widthname," +
                    ' case TB00109_TIPOOBJECT ' +
                    "      when 1 then 'Texto Simples' " +
                    "      when 2 then 'Pesquisa' " +
                    "      when 4 then 'Numérico' " +
                    "      when 5 then 'Data' " +
                    "      when 6 then 'Mult-Texto' " +
                    "      when 8 then 'Texto Especial' " +
                    ' end as nometipo, LOWER(SUBSTRING(TB00109_CAMPO,9,50)) as namefield, ' +
                    "TB00003_SELEC2 as selec2, UPPER(TB00003_VALOR) as valor, isnull(TB00003_DIGITA,'S') as digita, " +
                    'TB00003_SELEC3 as selec3, TB00003_SELEC4 as selec4,TB00003_SINAL as sinal,' +
                    'TB00003_TIPOTAB as tipotab,TB00003_VALORVAL as valorval, TB00003_MENSAGEM as mensagem,TB00003_VOLTAR as voltar, cast(0 as int) as taborder, TB00003_CAMVAL1 as camval1',
                  "TB00109_TABELA = '" +
                    props.table +
                    "' and TB00109_SYSTEM = " +
                    Decode64(sessionStorage.getItem('system')) +
                    ' ORDER BY TB00109_FORM,TB00109_ORDEM '
                ).then((response) => {
                  if (response.status === 200) {
                    setMontartela(true);
                    setFields(response.data);
                    setOption(1);
                    apiFind(
                      'Permissao',
                      '*',
                      '',
                      "TB00037_TABELA = '" + props.table + "' and TB00037_USER = '" + Decode64(sessionStorage.getItem('user')) + "' "
                    ).then((response) => {
                      if (response.status === 200) {
                        setPermissions(response.data);
                        setCarregando(false);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    if (permissions === undefined || Decode64(sessionStorage.getItem('admin')) === 'S') {
      let item = {};
      item['user'] = Decode64(sessionStorage.getItem('user'));
      item['tabela'] = props.table;
      item['inc'] = 'S';
      item['exc'] = 'S';
      item['alt'] = 'S';
      item['opc'] = 'S';
      item['eml'] = 'S';
      item['graficos'] = 'S';
      item['campanhas'] = 'S';
      item['docs'] = 'S';
      setPermissions(item);
    }
  }, [permissions]);

  useEffect(() => {
    Processar();
  }, []);

  const handleCloseplus = () => {
    setShowplus(false);
    Processar();
  };

  const handleClosedoc = () => {
    setShowdoc(false);
  };

  const handleCloseemail = () => {
    setShowemail(false);
  };

  useEffect(() => {
    if (fields.length > 0) {
      if (montartela) {
        if (props.rowselect !== undefined) {
          setInclusao(false);
          setProcessa(true);
          let sql = '';
          fields.forEach((element) => {
            if (element.campo.includes(props.table)) {
              sql = sql + element.campo + ',';
            }
          });
          sql = sql.substring(0, sql.length - 1);
          apiFind(
            props.classname,
            sql,
            '',
            props.table + '_' + props.primarykey + " = '" + props.rowselect[props.table + '_' + props.primarykey] + "' "
          ).then((response) => {
            if (response.status === 200) {
              setItemselec(response.data);
              fields.forEach((element, index) => {
                if (!element.campo.includes('TB00012')) {
                  valuesdisable[element.id] = true;
                  valuesindex[element.id] = index;
                  valuesname[element.id] = element.namefield;
                  valuesrequired[element.id] = element.selec3 === 'S';
                  try {
                    if (element.tipoobject !== 5) {
                      if (response.data[element.namefield] !== null) {
                        valuesfield[element.id] = response.data[element.namefield];
                      } else {
                        if (element.tipoobject !== 2) {
                          valuesfield[element.id] = '';
                        }
                      }
                    } else {
                      if (response.data[element.namefield] !== undefined) {
                        const dt1 =
                          response.data[element.namefield].substring(3, 5) +
                          '/' +
                          response.data[element.namefield].substring(0, 2) +
                          '/' +
                          response.data[element.namefield].substring(6, 10);
                        const datafim = new Date(dt1);
                        valuesfield[element.id] = datafim;
                      }
                    }
                  } catch (error) {
                    //console.log(error);
                  }
                } else {
                  valuesaddressdisable[element.ordem] = true;
                  valuesaddressname[element.ordem] = element.namefield;
                  valuesaddressrequired[element.ordem] = element.selec3 === 'S';
                }
              });

              if (fieldscab !== undefined && fieldscab.length > 0) {
                fieldscab.forEach((element, index) => {
                  try {
                    if (element.tipoobject !== 5) {
                      if (response.data[element.nome] !== null) {
                        valuesfield[element.id] = response.data[element.nome];
                      } else {
                        if (element.tipoobject !== 2) {
                          valuesfield[element.id] = '';
                        }
                      }
                    } else {
                      if (response.data[element.nome] !== undefined) {
                        const dt1 =
                          response.data[element.nome].substring(3, 5) +
                          '/' +
                          response.data[element.nome].substring(0, 2) +
                          '/' +
                          response.data[element.nome].substring(6, 10);
                        const datafim = new Date(dt1);
                        valuesfield[element.id] = datafim;
                      }
                    }
                  } catch (error) {
                    //console.log(error);
                  }
                });
              }

              setValuesfield([...valuesfield]);
              setValuesdisable([...valuesdisable]);
              setValuesname([...valuesname]);
              setValuesrequired([...valuesrequired]);
              setValuesaddressdisable([...valuesaddressdisable]);
              setValuesaddressname([...valuesaddressname]);
              setValuesaddressrequired([...valuesaddressrequired]);
            }
          });
          setProcessa(false);
        } else {
          setItemselec(undefined);
          setInclusao(true);
          setProcessa(true);
          if (getEvents(1)) {
            let novocodigo = '';
            apiID(props.classname).then((response) => {
              if (response.status === 200) {
                novocodigo = response.data.mensagem;
                fields.forEach((element, index) => {
                  if (!element.campo.includes('TB00012')) {
                    valuesindex[element.id] = index;
                    valuesname[element.id] = element.namefield;
                    valuesrequired[element.id] = element.selec3 === 'S';
                    if (element.namefield === 'codigo') {
                      valuesfield[element.id] = novocodigo;
                    } else {
                      valuesfield[element.id] = '';
                    }
                    if (element.tipo === 'int' || element.tipo === 'numeric') {
                      valuesfield[element.id] = 0;
                    }
                    if (element.namefield === 'situacao') {
                      valuesfield[element.id] = 'A';
                    }
                    if (element.valor !== '' && element.valor !== null) {
                      valuesfield[element.id] = element.valor;
                    }
                    valuesdisable[element.id] = (element.selec2 === 'S' && element.digita === 'N') || element.disableinsert === 'S';
                    if (
                      element.campo.includes('CODEMP') &&
                      (valuesfield[element.id] === '' || valuesfield[element.id] === undefined || valuesfield[element.id] === null)
                    ) {
                      valuesfield[element.id] = Decode64(sessionStorage.getItem('enterprise'));
                      valuesfield2[element.id] = Decode64(sessionStorage.getItem('nameenterprise'));
                    }
                    if (element.campo.includes('CODVEN') || element.campo.includes('VENDEDOR') || element.campo.includes('VEND')) {
                      if (Decode64(sessionStorage.getItem('manager')) === 'N') {
                        let seller = Decode64(sessionStorage.getItem('seller'));
                        if (
                          seller !== 'ZZZZ' &&
                          (valuesfield[element.id] === '' || valuesfield[element.id] === undefined || valuesfield[element.id] === null)
                        ) {
                          valuesfield[element.id] = Decode64(sessionStorage.getItem('seller'));
                          valuesdisable[element.id] = true;
                        }
                      }
                    }
                  } else {
                    if (element.tipo === 'int' || element.tipo === 'numeric') {
                      valuesaddress[element.ordem] = 0;
                    }
                    if (element.valor !== '' && element.valor !== null) {
                      valuesaddress[element.ordem] = element.valor;
                    }
                    valuesaddressdisable[element.ordem] = element.selec2 === 'S' && element.digita === 'N';
                    valuesaddressname[element.ordem] = element.namefield;
                    valuesaddressrequired[element.ordem] = element.selec3 === 'S';
                  }
                });
                if (fieldsauto !== undefined && fieldsauto !== null) {
                  const keys = Object.keys(fieldsauto);
                  const values = Object.values(fieldsauto);
                  keys.forEach((item, index) => {
                    fields.forEach((item2, index2) => {
                      if (item === item2.namefield) {
                        if (!item2.campo.includes('TB00012')) {
                          valuesfield[index2] = values[index];
                        } else {
                          valuesaddress[item2.ordem] = values[index];
                        }
                      }
                    });
                  });
                }
                setValuesfield([...valuesfield]);
                setValuesdisable([...valuesdisable]);
                setValuesname([...valuesname]);
                setValuesrequired([...valuesrequired]);
                setValuesaddressdisable([...valuesaddressdisable]);
                setValuesaddressname([...valuesaddressname]);
                setValuesaddressrequired([...valuesaddressrequired]);
                setValuesfield([...valuesfield]);
                setValuesdisable([...valuesdisable]);
                setValuesaddress([...valuesaddress]);
                setValuesaddressdisable([...valuesaddressdisable]);
              }
            });
            setDisabled(false);
            setDisabledform(false);
            props.setDisabled(false);
            setProcessa(false);
            setStatusend(1);
          }
          try {
            document.getElementById(props.table + '_NOME').focus();
          } catch (error) {
            //console.log(error);
          }
          getEvents(2);
        }
        setMontartela(false);
      }
    }
  }, [fields]);

  useEffect(() => {
    if (movimento !== undefined) {
      if (onupdate !== undefined) {
        setOnupdate(true);
      }
      const fieldsmov = Object.keys(movimento);
      fieldsmov.forEach((item) => {
        const posfield = valuesname.indexOf(item);
        const fieldfilter = fields.filter((campo) => campo.namefield === item);
        const typefield = typeof movimento[item];
        if (fieldfilter[0].selec === 'S' && typefield === 'number') {
          valuesfield[posfield] = movimento[item];
        }
      });
      setValuesfield([...valuesfield]);
      setItemselec(movimento);
      setMovimento(undefined);
    }
  }, [movimento]);

  useEffect(() => {
    if (refreshprice !== undefined) {
      if (refreshprice) {
        setCarregando(true);
        setOptionmov(1);
      } else {
        setCarregando(false);
      }
    }
  }, [refreshprice]);

  const handleKeyDown = (event, index) => {
    const key = event.keyCode;
    let campoFoco = '';
    switch (key) {
      case 40:
      case 13: {
        if (index < fields.length - 1) {
          campoFoco = fields[index + 1].campo;
          try {
            document.getElementById(campoFoco).focus();
          } catch (error) {
            //console.log(error);
          }
        }
        break;
      }
      case 38: {
        if (index > 0) {
          campoFoco = fields[index - 1].campo;
          try {
            document.getElementById(campoFoco).focus();
          } catch (error) {
            //console.log(error);
          }
        }
        break;
      }
    }
  };

  const Incluir = () => {
    if (getEvents(1)) {
      setOptionmov(0);
      valuesfield.forEach((element, index) => {
        valuesfield[index] = '';
        valuesfield2[index] = '';
      });
      setValuesfield([...valuesfield]);
      setValuesfield2([...valuesfield2]);
      setInclusao(true);
      setProcessa(true);
      let novocodigo = '';

      apiID(props.classname).then((response) => {
        if (response.status === 200) {
          novocodigo = response.data.mensagem;
          fields.forEach((element, index) => {
            if (!element.campo.includes('TB00012')) {
              valuesindex[element.id] = index;
              valuesname[element.id] = element.namefield;
              valuesrequired[element.id] = element.selec3 === 'S';
              if (element.namefield === 'codigo') {
                valuesfield[element.id] = novocodigo;
              } else {
                valuesfield[element.id] = '';
              }
              if (element.tipo === 'int' || element.tipo === 'numeric') {
                valuesfield[element.id] = 0;
              }
              if (element.namefield === 'situacao') {
                valuesfield[element.id] = 'A';
              }
              if (element.valor !== '' && element.valor !== null) {
                valuesfield[element.id] = element.valor;
              }
              valuesdisable[element.id] = (element.selec2 === 'S' && element.digita === 'N') || element.disableinsert === 'S';

              if (
                element.campo.includes('CODEMP') &&
                (valuesfield[element.id] === '' || valuesfield[element.id] === undefined || valuesfield[element.id] === null)
              ) {
                valuesfield[element.id] = Decode64(sessionStorage.getItem('enterprise'));
                valuesfield2[element.id] = Decode64(sessionStorage.getItem('nameenterprise'));
              }

              if (element.campo.includes('CODVEN') || element.campo.includes('VENDEDOR') || element.campo.includes('VEND')) {
                if (Decode64(sessionStorage.getItem('manager')) === 'N') {
                  let seller = Decode64(sessionStorage.getItem('seller'));
                  if (
                    seller !== 'ZZZZ' &&
                    (valuesfield[element.id] === '' || valuesfield[element.id] === undefined || valuesfield[element.id] === null)
                  ) {
                    valuesfield[element.id] = Decode64(sessionStorage.getItem('seller'));
                    valuesdisable[element.id] = true;
                  }
                }
              }
            } else {
              if (element.tipo === 'int' || element.tipo === 'numeric') {
                valuesaddress[element.ordem] = 0;
              }
              if (element.valor !== '' && element.valor !== null) {
                valuesaddress[element.ordem] = element.valor;
              }

              valuesaddressdisable[element.ordem] = element.selec2 === 'S' && element.digita === 'N';
              valuesaddressname[element.ordem] = element.namefield;
              valuesaddressrequired[element.ordem] = element.selec3 === 'S';
            }
          });
          setValuesaddressdisable([...valuesaddressdisable]);
          setValuesaddressname([...valuesaddressname]);
          setValuesaddressrequired([...valuesaddressrequired]);
          setValuesfield([...valuesfield]);
          setValuesdisable([...valuesdisable]);
          setValuesaddress([...valuesaddress]);
          setValuesaddressdisable([...valuesaddressdisable]);
        }
        setDisabled(false);
        setDisabledform(false);
        props.setDisabled(false);
        setProcessa(false);
        setStatusend(1);
        try {
          document.getElementById(props.table + '_NOME').focus();
        } catch (error) {
          //console.log(error);
        }
        getEvents(2);
      });
    }
  };

  const Excluir = () => {
    if (
      valuesfield[valuesname.indexOf(props.primarykey.toLowerCase())] !== '' &&
      valuesfield[valuesname.indexOf(props.primarykey.toLowerCase())] !== null
    ) {
      let inicio = new Date();
      let item = {};
      let codigo = '';
      fields.forEach((element, index) => {
        item[element.namefield] = valuesfield[index];
        if (element.namefield.toLowerCase() === props.primarykey.toLowerCase()) {
          codigo = valuesfield[index];
        }
      });
      if (getEvents(3)) {
        Confirmation('frminfor', 'Confirma a exclusão deste registro ?').then((result) => {
          if (result.isConfirmed) {
            if (getEvents(12)) {
              setCarregando(true);
              apiDelete(props.classname, item).then((response) => {
                if (response.status === 200) {
                  let typemens = 'success';
                  let dismiss = true;
                  if (response.data.status !== 1) {
                    typemens = 'warning';
                    dismiss = false;
                  }
                  addToast(response.data.mensagem, {
                    placement: 'bottom-rigth',
                    appearance: typemens,
                    autoDismiss: dismiss
                  });
                  setCarregando(false);
                  if (response.data.status === 1) {
                    valuesfield.forEach((element, index) => {
                      valuesfield[index] = '';
                      valuesfield2[index] = '';
                      valuesdisable[index] = true;
                    });
                    setValuesfield([...valuesfield]);
                    setValuesfield2([...valuesfield2]);
                    setValuesdisable([...valuesdisable]);
                    if (linkescape === undefined || linkescape === '' || linkescape === null) {
                      if (onupdate !== undefined) {
                        setOnupdate(true);
                      }
                    }
                    if (props.address === true) {
                      setCarregando(true);
                      apiExec(
                        "DELETE FROM TB00012 WHERE TB00012_CODIGO = '" + codigo + "' AND TB00012_CODIGO = '" + props.table + "' ",
                        'N'
                      ).then((response) => {
                        if (response.status === 200) {
                          setCarregando(false);
                          setStatusend(1);
                          let fim = new Date();
                          let dif = fim - inicio;
                          addToast('Tempo de processamento : ' + converterMillis(dif), {
                            placement: 'bottom-rigth',
                            appearance: 'success',
                            autoDismiss: true
                          });
                        } else {
                          addToast(response.data, {
                            placement: 'bottom-rigth',
                            appearance: 'danger'
                          });
                        }
                      });
                    } else {
                      let fim = new Date();
                      let dif = fim - inicio;
                      addToast('Tempo de processamento : ' + converterMillis(dif), {
                        placement: 'bottom-rigth',
                        appearance: 'success',
                        autoDismiss: true
                      });
                    }
                    getEvents(4);
                    if (openmodal) {
                      if (linkescape === undefined || linkescape === '' || linkescape === null) {
                        setShowinfor(false);
                      } else {
                        navigate(linkescape);
                      }
                    }
                  }
                } else {
                  addToast(response.data, {
                    placement: 'bottom-rigth',
                    appearance: 'danger'
                  });
                }
              });
            }
          }
        });
      }
    } else {
      addToast('Não possui nenhum registro para ser excluído !', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
    }
  };

  const Editar = () => {
    if (
      valuesfield[valuesname.indexOf(props.primarykey.toLowerCase())] !== '' &&
      valuesfield[valuesname.indexOf(props.primarykey.toLowerCase())] !== null
    ) {
      if (getEvents(5)) {
        if (valuesbefore) {
          setValuesbefore([...valuesfield]);
        }
        setOptionmov(0);
        fields.forEach((element, index) => {
          if (!element.campo.includes('TB00012')) {
            valuesant[element.id] = valuesfield[element.id];
            valuesdisable[element.id] = (element.selec2 === 'S' && element.digita === 'N') || element.disableupdate === 'S';
            let pospessoa = valuesname.indexOf('pessoa');
            if (pospessoa > -1) {
              let poscnpj = valuesname.indexOf('cnpj');
              let poscpf = valuesname.indexOf('cpf');
              let valor = valuesfield[pospessoa];
              if (poscnpj > -1) {
                valuesdisable[poscnpj] = valor === 'F';
              }
              if (poscpf > -1) {
                valuesdisable[poscpf] = valor === 'J';
              }
            }
          } else {
            valuesaddressdisable[element.ordem] = element.selec2 === 'S' && element.digita === 'N';
          }
        });
        setValuesdisable([...valuesdisable]);
        setValuesaddressdisable([...valuesaddressdisable]);
        setValuesant([...valuesant]);
        setDisabled(false);
        setDisabledform(false);
        props.setDisabled(false);
        try {
          document.getElementById(props.table + '_NOME').focus();
        } catch (error) {
          //console.log(error);
        }
        getEvents(6);
      }
    } else {
      addToast('Não possui nenhum registro para ser alterado !', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
    }
  };

  const IsRequired = (object, value) => {
    if (object.selec3 === 'S' || (object.tipoobject === 2 && object.key !== '' && object.key !== undefined && object.key !== null)) {
      if ((value === '' || value === undefined) && object.funcao !== '' && object.funcao !== undefined && object.funcao !== null) {
        addToast('Campo ' + object.funcao + ' é de preenchimento obrigatório !', {
          placement: 'bottom-rigth',
          appearance: 'warning',
          autoDismiss: true
        });
        return true;
      }
    }
  };

  const IsValidation = (object, value) => {
    let valida = false;
    if (object.selec4 === 'S') {
      let valueref = '';
      if (object.tipotab === 'V') {
        valueref = object.valorval;
      } else {
        valueref = document.getElementById(object.camval1).value;
      }
      switch (object.sinal) {
        case 1: {
          valida = value === valueref;
          break;
        }
        case 2: {
          valida = value !== valueref;
          break;
        }
        case 3: {
          valida = value > valueref;
          break;
        }
        case 4: {
          valida = value < valueref;
          break;
        }
        case 5: {
          valida = value >= valueref;
          break;
        }
        case 6: {
          valida = value <= valueref;
          break;
        }
        case 7: {
          valida = value.includes(valueref);
          break;
        }
        case 8: {
          valida = !value.includes(valueref);
          break;
        }
        case 9: {
          apiFind(
            props.classname,
            '*',
            '',
            object.campo +
              " = '" +
              value +
              "' and " +
              props.table +
              '_' +
              props.primarykey +
              " <> '" +
              document.getElementById(props.table + '_' + props.primarykey).value +
              "' "
          ).then((response) => {
            if (response.status === 200) {
              if (response.data) {
                valida = true;
                if (valida) {
                  if (object.mensagem !== '' && object.mensagem !== undefined && object.mensagem !== null) {
                    addToast(object.mensagem, {
                      placement: 'bottom-rigth',
                      appearance: 'warning',
                      autoDismiss: true
                    });
                  }
                  return object.voltar === 'S';
                }
              }
            }
          });
          break;
        }
      }
      if (object.sinal < 9) {
        if (valida) {
          if (object.mensagem !== '' && object.mensagem !== undefined && object.mensagem !== null) {
            addToast(object.mensagem, {
              placement: 'bottom-rigth',
              appearance: 'warning',
              autoDismiss: true
            });
          }
          return object.voltar === 'S';
        }
      }
    }
  };

  const Salvar = () => {
    if (
      valuesfield[valuesname.indexOf(props.primarykey.toLowerCase())] !== '' &&
      valuesfield[valuesname.indexOf(props.primarykey.toLowerCase())] !== null
    ) {
      if (getEvents(7)) {
        let inicio = new Date();
        setCarregando(true);
        let salvar = true;
        fields.forEach((element) => {
          if (element.campo.includes(props.table)) {
            if (
              !valuesdisable[element.id] &&
              element.selec === 'S' &&
              element.sitgroup === 'A' &&
              element.sitform === 'A' &&
              (!valuesinvisible[element.id] || valuesinvisible[element.id] === undefined)
            ) {
              if (IsRequired(element, valuesfield[element.id])) {
                salvar = false;
              }
            }
            if (!valuesinvisible[element.id] || valuesinvisible[element.id] === undefined) {
              if (IsValidation(element, valuesfield[element.id])) {
                salvar = false;
              }
            }
          }
        });
        if (props.address) {
          const fieldsaddress = fields.filter((item) => item.campo.includes('TB00012'));
          fieldsaddress.forEach((element) => {
            if (!valuesaddressdisable[element.ordem]) {
              if (IsRequired(element, valuesaddress[element.ordem])) {
                salvar = false;
              }
            }
            if (IsValidation(element, valuesaddress[element.ordem])) {
              salvar = false;
            }
          });
        }
        if (!salvar) {
          setCarregando(false);
        } else {
          let item = {};
          fields.forEach((element, index) => {
            if (
              !element.campo.includes('DTCAD') &&
              !element.campo.includes('OPCAD') &&
              !element.campo.includes('DTALT') &&
              !element.campo.includes('OPALT')
            ) {
              if (element.campo.includes(props.table)) {
                if (!valuesinvisible[element.id] || valuesinvisible[element.id] === undefined) {
                  if (element.tipoobject !== 5) {
                    item[element.namefield] = valuesfield[index];
                  } else {
                    if (valuesfield[index] !== '' && valuesfield[index] !== undefined) {
                      const tmdata1 = Date.parse(valuesfield[index]);
                      const dt1 = new Date(tmdata1);
                      const data1 = dt1.toLocaleDateString('en-US');
                      item[element.namefield] = data1 + ' 00:00:00';
                    } else {
                      item[element.namefield] = null;
                    }
                  }
                }
              }
            }
          });
          if (fieldscab !== undefined && fieldscab.length > 0) {
            fieldscab.forEach((element, index) => {
              if (
                !element.campo.includes('DTCAD') &&
                !element.campo.includes('OPCAD') &&
                !element.campo.includes('DTALT') &&
                !element.campo.includes('OPALT')
              ) {
                if (element.campo.includes(props.table)) {
                  if (element.tipoobject !== 5) {
                    item[element.nome] = valuesfield[element.id];
                  } else {
                    if (valuesfield[element.id] !== '' && valuesfield[element.id] !== undefined) {
                      const tmdata1 = Date.parse(valuesfield[element.id]);
                      const dt1 = new Date(tmdata1);
                      const data1 = dt1.toLocaleDateString('en-US');
                      item[element.nome] = data1 + ' 00:00:00';
                    } else {
                      item[element.nome] = null;
                    }
                  }
                }
              }
            });
          }

          let itemaddress = {};
          if (props.address) {
            fields.forEach((element, index) => {
              if (
                !element.campo.includes('DTCAD') &&
                !element.campo.includes('OPCAD') &&
                !element.campo.includes('DTALT') &&
                !element.campo.includes('OPALT')
              ) {
                if (element.campo.includes('TB00012')) {
                  itemaddress[element.namefield] = valuesaddress[element.ordem];
                }
              }
            });
            itemaddress['codigo'] = document.getElementById(props.table + '_' + props.primarykey).value;
            itemaddress['tipo'] = typeaddress;
            itemaddress['tabela'] = props.table;
          }
          if (inclusao) {
            apiInsert(props.classname, item).then((response) => {
              let typemens = 'success';
              let dismiss = true;
              if (response.data.status !== 1) {
                typemens = 'warning';
                dismiss = false;
              }
              addToast(response.data.mensagem, {
                placement: 'bottom-rigth',
                appearance: typemens,
                autoDismiss: dismiss
              });
              setCarregando(false);
              if (response.data.status === 1) {
                valuesfield[valuesname.indexOf(props.primarykey.toLowerCase())] = response.data.id;
                valuesdisable.forEach((element, index) => {
                  valuesdisable[index] = true;
                });
                setValuesdisable([...valuesdisable]);
                setDisabled(true);
                setDisabledform(true);
                props.setDisabled(true);
                if (linkescape === undefined || linkescape === '' || linkescape === null) {
                  if (onupdate !== undefined) {
                    setOnupdate(true);
                  }
                }
                if (props.address === true) {
                  setCarregando(true);
                  itemaddress['codigo'] = document.getElementById(props.table + '_' + props.primarykey).value;
                  apiInsert('Endereco', itemaddress).then((response) => {
                    let typemens = 'success';
                    let dismiss = true;
                    if (response.data.status !== 1) {
                      typemens = 'danger';
                      dismiss = false;
                    }
                    addToast(response.data.mensagem, {
                      placement: 'bottom-rigth',
                      appearance: typemens,
                      autoDismiss: dismiss
                    });
                    setCarregando(false);
                    let fim = new Date();
                    let dif = fim - inicio;

                    addToast('Tempo de processamento : ' + converterMillis(dif), {
                      placement: 'bottom-rigth',
                      appearance: 'success',
                      autoDismiss: true
                    });
                    valuesaddressdisable.forEach((element, index) => {
                      valuesaddressdisable[index] = true;
                    });
                    setValuesaddressdisable([...valuesaddressdisable]);
                  });
                } else {
                  setInclusao(false);
                  setOptionmov(1);
                  setItemselec(item);
                  let fim = new Date();
                  let dif = fim - inicio;
                  addToast('Tempo de processamento : ' + converterMillis(dif), {
                    placement: 'bottom-rigth',
                    appearance: 'success',
                    autoDismiss: true
                  });
                }
              }
              getEvents(8);
              if (openmodal) {
                if (linkescape === undefined || linkescape === '' || linkescape === null) {
                  if (tableitem === undefined || tableitem === '' || tableitem === null) {
                    setShowinfor(false);
                  }
                } else {
                  navigate(linkescape);
                }
              }
            });
          } else {
            apiUpdate(props.classname, item).then((response) => {
              let typemens = 'success';
              let dismiss = true;
              if (response.data.status !== 1) {
                typemens = 'warning';
                dismiss = false;
              }
              addToast(response.data.mensagem, {
                placement: 'bottom-rigth',
                appearance: typemens,
                autoDismiss: dismiss
              });
              setCarregando(false);
              if (response.data.status === 1) {
                valuesdisable.forEach((element, index) => {
                  valuesdisable[index] = true;
                });
                setValuesdisable([...valuesdisable]);
                setDisabled(true);
                setDisabledform(true);
                props.setDisabled(true);
                if (linkescape === undefined || linkescape === '' || linkescape === null) {
                  if (onupdate !== undefined) {
                    setOnupdate(true);
                  }
                }
                if (props.address === true) {
                  setCarregando(true);
                  apiUpdate('Endereco', itemaddress).then((response) => {
                    let typemens = 'success';
                    let dismiss = true;
                    if (response.data.status !== 1) {
                      typemens = 'danger';
                      dismiss = false;
                    }
                    addToast(response.data.mensagem, {
                      placement: 'bottom-rigth',
                      appearance: typemens,
                      autoDismiss: dismiss
                    });
                    setCarregando(false);
                    let fim = new Date();
                    let dif = fim - inicio;

                    addToast('Tempo de processamento : ' + converterMillis(dif), {
                      placement: 'bottom-rigth',
                      appearance: 'success',
                      autoDismiss: true
                    });
                    valuesaddressdisable.forEach((element, index) => {
                      valuesaddressdisable[index] = true;
                    });
                    setValuesaddressdisable([...valuesaddressdisable]);
                  });
                } else {
                  let fim = new Date();
                  let dif = fim - inicio;
                  addToast('Tempo de processamento : ' + converterMillis(dif), {
                    placement: 'bottom-rigth',
                    appearance: 'success',
                    autoDismiss: true
                  });
                }
                if (valuesafter) {
                  setValuesafter([...valuesfield]);
                }
                getEvents(9);
                if (openmodal) {
                  if (linkescape === undefined || linkescape === '' || linkescape === null) {
                    if (tableitem === undefined || tableitem === '' || tableitem === null) {
                      setShowinfor(false);
                    }
                  } else {
                    navigate(linkescape);
                  }
                }
              }
            });
          }
        }
      }
    } else {
      addToast('Não possui nenhum registro para ser salvo !', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
    }
  };

  const Cancelar = () => {
    if (getEvents(10)) {
      if (inclusao === true) {
        if (openmodal) {
          if (linkescape === undefined || linkescape === '' || linkescape === null) {
            setShowinfor(false);
          } else {
            navigate(linkescape);
          }
        } else {
          setShowinfor(false);
        }
      } else {
        setStatusend(2);
        setDisabled(true);
        setDisabledform(true);
        valuesant.forEach((element, index) => {
          valuesdisable[index] = true;
        });
        Processar();
      }
      getEvents(11);
    }
  };

  const handleShowinfor = () => {
    setShowinfor(false);
  };

  const getEvents = (type) => {
    let retorno = true;
    if (events !== undefined && events.length > 0) {
      setCarregando(true);
      let tmpevent = events.filter((element) => element.type === parseInt(type));
      tmpevent.forEach((element) => {
        if (retorno) {
          retorno = element.method();
          if (retorno === undefined) {
            retorno = true;
          }
        }
      });
      setCarregando(false);
    }
    return retorno;
  };

  return (
    <React.Fragment>
      <div id="frminfor" name="frminfor">
        <Row>
          <Col>
            <Card className="Recent-Users">
              {openmodal === false || openmodal === undefined ? (
                <Card.Header>
                  <Card.Title as="h5">{modulo}</Card.Title>
                </Card.Header>
              ) : (
                <></>
              )}
              <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
              <Row style={{ textAlign: 'center', marginTop: '10px' }}>
                <Col>
                  {permissions.inc === 'S' ? (
                    <Button id="btnIncluir" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={() => Incluir()}>
                      <i className={'feather icon-star'} /> Novo
                    </Button>
                  ) : (
                    <></>
                  )}
                  {permissions.exc === 'S' ? (
                    <Button id="btnExcluir" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={() => Excluir()}>
                      <i className={'feather icon-trash'} /> Excluir
                    </Button>
                  ) : (
                    <></>
                  )}
                  {permissions.alt === 'S' ? (
                    <Button id="btnEditar" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={() => Editar()}>
                      <i className={'feather icon-edit'} /> Editar
                    </Button>
                  ) : (
                    <></>
                  )}
                  <Button id="btnSalvar" className="btn btn-primary shadow-2 mb-3" disabled={disabled} onClick={() => Salvar()}>
                    <i className={'feather icon-save'} /> Salvar
                  </Button>
                  <Button id="btnCancelar" className="btn btn-primary shadow-2 mb-3" disabled={disabled} onClick={() => Cancelar()}>
                    <i className={'feather icon-x'} /> Cancelar
                  </Button>
                  {openmodal === false || openmodal === undefined ? (
                    <Button id="btnListar" className="btn btn-success shadow-2 mb-3" disabled={!disabled} onClick={() => handleShowinfor()}>
                      <i className={'feather icon-list'} /> Listagem
                    </Button>
                  ) : (
                    <></>
                  )}
                  {(openmodal === false || openmodal === undefined) && Decode64(sessionStorage.getItem('admin')) === 'S' ? (
                    <Button id="btnPlus" className="btn btn-warning shadow-2 mb-3" onClick={() => setShowplus(true)}>
                      <i className={'feather icon-cast'} />
                      Layout
                    </Button>
                  ) : (
                    <></>
                  )}

                  <Modal backdrop="static" size="xl" show={showplus} centered={true} onHide={handleCloseplus}>
                    <Modal.Header className="h5" closeButton>
                      <i className={'feather icon-cast h1'} />
                      &nbsp;Definição de Layout
                    </Modal.Header>
                    <ModalBody>
                      <Layout table={props.table} object={props.object} primarykey={props.primarykey} modulo={modulo}></Layout>
                    </ModalBody>
                  </Modal>
                  {permissions.docs === 'S' ? (
                    <Button id="btnDoc" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={() => setShowdoc(true)}>
                      <i className={'feather icon-file-plus'} />
                      Docs.
                    </Button>
                  ) : (
                    <></>
                  )}

                  <Modal backdrop="static" size="lg" show={showdoc} centered={true} onHide={handleClosedoc}>
                    <Modal.Header className="h5" closeButton>
                      <i className={'feather icon-file-plus h1'} />
                      &nbsp;Gestão de Documentos
                    </Modal.Header>
                    <ModalBody>
                      <Documento
                        tabela={props.table}
                        movimento={
                          rowselect !== undefined
                            ? rowselect[props.table + '_' + props.primarykey]
                            : valuesfield[valuesname.indexOf(props.primarykey.toLowerCase())]
                        }
                        showdoc={showdoc}
                        primarykey={props.table + '_' + props.primarykey}
                        setShowdoc={(data) => setShowdoc(data)}
                      ></Documento>
                    </ModalBody>
                  </Modal>
                  {permissions.eml === 'S' ? (
                    <Button id="btnEmail" className="btn btn-primary shadow-2 mb-3" disabled={!disabled} onClick={() => setShowemail(true)}>
                      <i className={'feather icon-mail'} />
                      E-Mail
                    </Button>
                  ) : (
                    <></>
                  )}
                  <Modal backdrop="static" size="xl" show={showemail} centered={true} onHide={handleCloseemail}>
                    <Modal.Header className="h5" closeButton>
                      <i className={'feather icon-mail h1'} />
                      &nbsp;Envio de E-Mail
                    </Modal.Header>
                    <ModalBody>
                      <Email
                        tabela={props.table}
                        movimento={
                          rowselect !== undefined
                            ? rowselect[props.table + '_' + props.primarykey]
                            : valuesfield[valuesname.indexOf(props.primarykey.toLowerCase())]
                        }
                        showemail={showemail}
                        emails={valuesaddress[valuesaddressname.indexOf('email')]}
                        setShowemail={(data) => setShowemail(data)}
                        modulo={props.title}
                        sendauto={false}
                      ></Email>
                    </ModalBody>
                  </Modal>

                  {actions.map((action, index) => {
                    return (
                      <Button key={index} id={actions.id} onClick={action.method} className={action.classbutton} disabled={!disabled}>
                        <i className={action.classicon} /> {action.caption}
                      </Button>
                    );
                  })}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <PerfectScrollbar
            containerRef={(ref) => {
              setScrollEl(ref);
            }}
            style={{ height: '700px' }}
          >
            <Row>
              {groups.map((grupo) => {
                return forms.map((form, index2) => {
                  if (form.grupo === grupo.codigo) {
                    if (form.tipo === 0) {
                      return (
                        <div key={index2} name={form.codigo} style={{ width: form.width }}>
                          <Col key={index2}>
                            <Card key={index2} className="Recent-Users">
                              <Card.Header key={index2}>
                                <Card.Title as="h5">{form.nome}</Card.Title>
                              </Card.Header>
                              <Row key={index2} name={form.nome} style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                                {fields.map((field) => {
                                  if (field.form === form.codigo && field.selec === 'S') {
                                    return (
                                      <CreateObject
                                        key={field.id}
                                        field={field}
                                        index={valuesindex[field.id]}
                                        fields={fields}
                                        valuesfield={valuesfield}
                                        setValuesfield={(data) => setValuesfield(data)}
                                        valuesfield2={valuesfield2}
                                        setValuesfield2={(data) => setValuesfield2(data)}
                                        valuesname={valuesname}
                                        setValuesname={(data) => setValuesname(data)}
                                        disabled={valuesdisable[field.id]}
                                        required={valuesrequired[field.id]}
                                        invisible={valuesinvisible[field.id]}
                                        onkeydown={(event) => handleKeyDown(event, field.id)}
                                      ></CreateObject>
                                    );
                                  }
                                })}
                              </Row>
                            </Card>
                          </Col>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index2} name={form.codigo} style={{ width: form.width }}>
                          <Col key={index2}>
                            {form.tipoespecial !== 8 ? (
                              <Card key={index2} className="Recent-Users">
                                <Card.Header key={index2}>
                                  <Card.Title as="h5">{form.nome}</Card.Title>
                                </Card.Header>
                                <Row
                                  key={index2}
                                  name={form.nome}
                                  style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}
                                >
                                  {form.tipoespecial === 1 ? ( // Controle de Endereços
                                    <Address
                                      table={props.table}
                                      disabled={disabled}
                                      typeaddress={typeaddress}
                                      valuesaddress={valuesaddress}
                                      rowselect={rowselect}
                                      statusend={statusend}
                                      valuesaddressdisable={valuesaddressdisable}
                                      valuesaddressrequired={valuesaddressrequired}
                                      setDisabled={(data) => setDisabled(data)}
                                      setValuesaddress={(data) => setValuesaddress(data)}
                                      setTypeaddress={(data) => setTypeaddress(data)}
                                      setRowselect={(data) => setRowselect(data)}
                                      setStatusend={(data) => setStatusend(data)}
                                      setValuesaddressdisable={(data) => setValuesaddressdisable(data)}
                                      setValuesaddressrequired={(data) => setValuesaddressrequired(data)}
                                    ></Address>
                                  ) : (
                                    <></>
                                  )}
                                  {form.tipoespecial === 2 ? ( // Itens de Oportunidade
                                    <OportunidadeItem
                                      oportunidade={rowselect}
                                      disabled={disabled}
                                      setDisabled={(data) => setDisabled(data)}
                                      cabecalho={valuesfield}
                                      setCabecalho={(data) => setValuesfield(data)}
                                      valuesname={valuesname}
                                      setValuesname={(data) => setValuesname(data)}
                                    ></OportunidadeItem>
                                  ) : (
                                    <></>
                                  )}
                                  {form.tipoespecial === 3 ? ( // Definição de Foto
                                    <Avatar
                                      table={props.table}
                                      fieldpk={props.table + '_' + props.primarykey}
                                      field={props.table + '_PHOTO'}
                                      value={
                                        rowselect !== undefined
                                          ? rowselect[props.table + '_' + props.primarykey]
                                          : valuesfield[valuesname.indexOf(props.primarykey.toLowerCase())]
                                      }
                                      disabledform={disabledform}
                                      setDisabledform={(data) => setDisabledform(data)}
                                    ></Avatar>
                                  ) : (
                                    <></>
                                  )}
                                  {form.tipoespecial === 4 ? ( // Assinatura de Email
                                    <Signature
                                      table={props.table}
                                      fieldpk={props.table + '_' + props.primarykey}
                                      field={props.table + '_ASS'}
                                      value={
                                        rowselect !== undefined
                                          ? rowselect[props.table + '_' + props.primarykey]
                                          : valuesfield[valuesname.indexOf(props.primarykey.toLowerCase())]
                                      }
                                      disabledform={disabledform}
                                      setDisabledform={(data) => setDisabledform(data)}
                                    ></Signature>
                                  ) : (
                                    <></>
                                  )}
                                  {form.tipoespecial === 5 ? ( // Visualização da Proposta
                                    <PropostaViewer
                                      table={props.table}
                                      fieldpk={props.table + '_' + props.primarykey}
                                      field={props.table + '_BYTES'}
                                      value={
                                        rowselect !== undefined
                                          ? rowselect[props.table + '_' + props.primarykey]
                                          : valuesfield[valuesname.indexOf(props.primarykey.toLowerCase())]
                                      }
                                      disabledform={disabledform}
                                      setDisabledform={(data) => setDisabledform(data)}
                                    ></PropostaViewer>
                                  ) : (
                                    <></>
                                  )}
                                  {form.tipoespecial === 6 && itemselec !== undefined ? ( //Informações de Dashboard
                                    <DashboardConfig
                                      itemselec={itemselec}
                                      setItemselec={(data) => setItemselec(data)}
                                      disabled={disabled}
                                      setDisabled={(data) => setDisabled(data)}
                                      valuesfield={valuesfield}
                                      setValuesfield={(data) => setValuesfield(data)}
                                      valuesfield2={valuesfield2}
                                      setValuesfield2={(data) => setValuesfield2(data)}
                                    ></DashboardConfig>
                                  ) : (
                                    <></>
                                  )}
                                  {form.tipoespecial === 7 && itemselec !== undefined ? ( //Itens de Compra (DataPartner)
                                    <PartnerItem
                                      compra={itemselec}
                                      setCompra={(data) => setItemselec(data)}
                                      disabled={disabled}
                                      setDisabled={(data) => setDisabled(data)}
                                      valuescab={valuesfield}
                                      setValuescab={(data) => setValuesfield(data)}
                                      valuesname={valuesname}
                                      setValuesname={(data) => setValuesname(data)}
                                    ></PartnerItem>
                                  ) : (
                                    <></>
                                  )}
                                </Row>
                              </Card>
                            ) : (
                              //Módulos de Movimentação
                              <Movimentacao
                                cabecalho={itemselec}
                                disabled={disabled}
                                valuesfield={valuesfield}
                                setValuesfield={(data) => setValuesfield(data)}
                                valuesfield2={valuesfield2}
                                setValuesfield2={(data) => setValuesfield2(data)}
                                valuesdisable={valuesdisable}
                                setValuesdisable={(data) => setValuesdisable(data)}
                                fieldscab={fieldscab}
                                setFieldscab={(data) => setFieldscab(data)}
                                tableitem={tableitem}
                                columnsitem={columnsitem}
                                setColumnsitem={(data) => setColumnsitem(data)}
                                fieldsitem={fieldsitem}
                                setFieldsitem={(data) => setFieldsitem(data)}
                                fieldsimp={fieldsimp}
                                setFieldsimp={(data) => setFieldsimp(data)}
                                fieldsarredonda={fieldsarredonda}
                                setFieldsarredonda={(data) => setFieldsarredonda(data)}
                                classitem={classitem}
                                classcab={props.classname}
                                typeprice={typeprice}
                                tablemov={props.table}
                                fieldslanc={fieldslanc}
                                setFieldslanc={(data) => setFieldslanc(data)}
                                entsai={entsai}
                                coddest={coddest}
                                tabdest={tabdest}
                                typestock={typestock}
                                contabil={contabil}
                                eventsitem={eventsitem}
                                setEventsitem={(data) => setEventsitem(data)}
                                activeStep={optionmov}
                                setActiveStep={(data) => setOptionmov(data)}
                                movimento={movimento}
                                setMovimento={(data) => setMovimento(data)}
                                refreshprice={refreshprice}
                                setRefreshprice={(data) => setRefreshprice(data)}
                                tableserv={tableserv}
                                classserv={classserv}
                                columnsserv={columnsserv}
                                setColumnsserv={(data) => setColumnsserv(data)}
                                fieldsimpserv={fieldsimpserv}
                                setFieldsimpserv={(data) => setFieldsimpserv(data)}
                                fieldsarredondaserv={fieldsarredondaserv}
                                setFieldsarredondaserv={(data) => setFieldsarredondaserv(data)}
                                eventsserv={eventsserv}
                                setEventsserv={(data) => setEventsserv(data)}
                                tablepar={tablepar}
                                columnspar={columnspar}
                                recalcpar={recalcpar}
                                classpar={classpar}
                                fieldspar={fieldspar}
                                setFieldspar={(data) => setFieldspar(data)}
                                eventspar={eventspar}
                                setEventspar={(data) => setEventspar(data)}
                              ></Movimentacao>
                            )}
                          </Col>
                        </div>
                      );
                    }
                  }
                });
              })}
            </Row>
          </PerfectScrollbar>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Infor;
