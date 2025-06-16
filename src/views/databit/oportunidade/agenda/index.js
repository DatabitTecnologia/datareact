import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { Calendar } from 'react-big-calendar';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import { CreateObject } from '../../../../components/CreateObject';
import { apiFields, apiList } from '../../../../api/crudapi';
import InforOportunidade from '../inforoportunidade';
import { Decode64 } from '../../../../utils/crypto';
import { useToasts } from 'react-toast-notifications';

const localizer = momentLocalizer(moment);
var defaultMessages = {
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Dia Todo',
  week: 'Semana',
  work_week: 'Eventos',
  day: 'Dia',
  month: 'Mês',
  previous: 'Anterior',
  next: 'Próximo',
  yesterday: 'Ontem',
  tomorrow: 'Amanhã',
  today: 'Hoje',
  agenda: 'Agenda',
  noEventsInRange: 'Não há eventos no período.',
  showMore: function showMore(total) {
    return '+' + total + ' mais';
  }
};

const OportunidadeAgenda = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [fieldsoculta, setFieldsoculta] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [showinfor, setShowinfor] = useState(false);
  const [rowselect, setRowselect] = React.useState();
  const [titulo, setTitulo] = React.useState('');
  const [icon, setIcon] = React.useState('');
  const [onupdate, setOnupdate] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [dias, setDias] = useState(30);
  const [dateevent, setDateevent] = React.useState(undefined);
  const [lastClick, setLastClick] = useState(0);
  const { addToast } = useToasts();

  useEffect(() => {
    const currentDate = new Date(); // Data atual
    const nextMonthDate = new Date(currentDate); // Copia a data atual
    nextMonthDate.setMonth(currentDate.getMonth() + 1);
    valuesfield[21] = currentDate;
    valuesfield[22] = nextMonthDate;
    const timeDifference = Math.abs(currentDate.getTime() - nextMonthDate.getTime());
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    setDias(dayDifference);
    setValuesfield([...valuesfield]);
    setValuesdisable([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);
    setFields([
      {
        id: 0,
        campo: 'TB02255_CODIGO',
        funcao: 'Oportunidade',
        tipo: 'varchar',
        nome: 'codigo',
        tipoobject: 2,
        tamanho: 6,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB02255',
        widthname: 22,
        disabled: valuesdisable[0]
      },
      {
        id: 1,
        campo: 'TB02255_CODCLI',
        funcao: 'Cliente',
        tipo: 'varchar',
        nome: 'codcli',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01008',
        widthname: 23,
        disabled: valuesdisable[1]
      },
      {
        id: 2,
        campo: 'TB02255_CODPROSPECT',
        funcao: 'Prospect',
        tipo: 'varchar',
        nome: 'codprospect',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01127',
        widthname: 23,
        disabled: valuesdisable[2]
      },
      {
        id: 3,
        campo: 'TB02255_TIPOOP',
        funcao: 'Tipo de Oportunidade',
        tipo: 'varchar',
        nome: 'tipoop',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB01132',
        widthname: 22,
        disabled: valuesdisable[3]
      },
      {
        id: 4,
        campo: 'TB02255_CLASSIFICACAO',
        funcao: 'Classificação',
        tipo: 'varchar',
        nome: 'classificacao',
        tipoobject: 2,
        tamanho: 5,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01133',
        widthname: 23,
        disabled: valuesdisable[4]
      },
      {
        id: 5,
        campo: 'TB02255_STATUS',
        funcao: 'Status',
        tipo: 'varchar',
        nome: 'status',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01129',
        widthname: 23,
        disabled: valuesdisable[5]
      },
      {
        id: 6,
        campo: 'TB02255_CODVEN',
        funcao: 'Vendedor',
        tipo: 'varchar',
        nome: 'vendedor',
        tipoobject: 2,
        tamanho: 4,
        widthfield: 31,
        measure: '31rem',
        tabelaref: 'TB01006',
        widthname: 22,
        disabled: valuesdisable[6]
      },
      {
        id: 7,
        campo: 'TB02255_CODEMP',
        funcao: 'Empresa',
        tipo: 'varchar',
        nome: 'empresa',
        tipoobject: 2,
        tamanho: 2,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01007',
        widthname: 23,
        disabled: valuesdisable[7]
      },
      {
        id: 8,
        campo: 'TB02255_PRE',
        funcao: 'Pré-Contrato',
        tipo: 'varchar',
        nome: 'pre',
        tipoobject: 2,
        tamanho: 6,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB02264',
        widthname: 23,
        disabled: valuesdisable[8]
      },
      {
        id: 9,
        campo: 'TB02255_CONTRATO',
        funcao: 'Número Contrato',
        tipo: 'varchar',
        nome: 'contrato',
        tipoobject: 1,
        tamanho: 12,
        widthfield: 9,
        measure: '9rem',
        disabled: valuesdisable[9]
      },
      {
        id: 10,
        campo: 'TB02255_DATA1',
        funcao: 'Data de',
        tipo: 'datetime',
        nome: 'datade',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[10]
      },
      {
        id: 11,
        campo: 'TB02255_DATA2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'dataate',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[11]
      },
      {
        id: 12,
        campo: 'TB02255_PREVISAO1',
        funcao: 'Previsão de',
        tipo: 'datetime',
        nome: 'previsaode',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[12]
      },
      {
        id: 13,
        campo: 'TB02255_PREVISAO2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'previsaoate',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[13]
      },
      {
        id: 14,
        campo: 'TB02255_QTDE1',
        funcao: 'Quantidade de',
        tipo: 'int',
        nome: 'qtdede',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        decimal: 0,
        disabled: valuesdisable[14]
      },
      {
        id: 15,
        campo: 'TB02255_QTDE2',
        funcao: 'Até',
        tipo: 'int',
        nome: 'qtdeate',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        decimal: 0,
        disabled: valuesdisable[15]
      },
      {
        id: 16,
        campo: 'TB02255_VLRNOTA1',
        funcao: 'Valor de',
        tipo: 'numeric',
        nome: 'valorde',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        decimal: 2,
        disabled: valuesdisable[16]
      },
      {
        id: 17,
        campo: 'TB02255_VLRNOTA2',
        funcao: 'Até',
        tipo: 'numeric',
        nome: 'valorate',
        tipoobject: 4,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        decimal: 2,
        disabled: valuesdisable[17]
      },
      {
        id: 18,
        campo: 'TB01129_TIPO',
        funcao: 'Tipo Operação',
        tipo: 'varchar',
        nome: 'tipoop',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 11,
        measure: '11rem',
        itens: 'Todos,Em andamento,Aprovado,Não aprovado,Cancelado',
        values: '9,0,1,3,4',
        disabled: valuesdisable[18]
      },
      {
        id: 20,
        campo: 'TB02255_CHANCE',
        funcao: 'Chance de Fechamento',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 11,
        measure: '11rem',
        itens: '0 - Todos,1 - Muito Baixa,2 - Baixa,3 - Média,4 - Alta,5 - Muito Alta',
        values: '0,1,2,3,4,5',
        disabled: valuesdisable[20]
      }
    ]);

    setFieldsoculta([
      {
        id: 23,
        campo: 'TB02255_FIXAR',
        funcao: 'Fixar período na Agenda',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '11rem',
        itens: 'Não,Sim',
        values: 'N,S',
        disabled: valuesdisable[23]
      },
      {
        id: 21,
        campo: 'TB02255_AGENDA',
        funcao: 'Agenda de',
        tipo: 'datetime',
        nome: 'agendade',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[21]
      },
      {
        id: 22,
        campo: 'TB02255_AGENDA2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'agendaate',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: valuesdisable[22]
      },
      {
        id: 19,
        campo: 'TB02255_OCULTA',
        funcao: 'Ocultar Filtros',
        tipo: 'varchar',
        nome: 'selec',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '8rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: valuesdisable[19]
      }
    ]);
  }, []);

  const Filtrar = () => {
    let sql =
      " TB02255_SITUACAO = 'A' AND EXISTS (SELECT TB01129_CODIGO FROM TB01129 WHERE TB01129_CODIGO = TB02255_STATUS AND TB01129_AGENDA = 'S') ";
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      sql = sql + " and TB02255_CODIGO = '" + valuesfield[0] + "' ";
    }
    if (valuesfield[1] !== '' && valuesfield[1] !== undefined) {
      sql = sql + " and TB02255_CODCLI = '" + valuesfield[1] + "' ";
    }
    if (valuesfield[2] !== '' && valuesfield[2] !== undefined) {
      sql = sql + " and TB02255_CODPROSPECT = '" + valuesfield[2] + "' ";
    }
    if (valuesfield[3] !== '' && valuesfield[3] !== undefined) {
      sql = sql + " and TB02255_TIPOOP = '" + valuesfield[3] + "' ";
    }
    if (valuesfield[4] !== '' && valuesfield[4] !== undefined) {
      sql = sql + " and TB02255_CLASSIFICACAO = '" + valuesfield[4] + "' ";
    }
    if (valuesfield[5] !== '' && valuesfield[5] !== undefined) {
      sql = sql + " and TB02255_STATUS = '" + valuesfield[5] + "' ";
    }
    if (valuesfield[6] !== '' && valuesfield[6] !== undefined) {
      sql = sql + " and TB02255_CODVEN = '" + valuesfield[6] + "' ";
    } else {
      if (Decode64(sessionStorage.getItem('manager')) === 'N') {
        const seller = Decode64(sessionStorage.getItem('seller'));
        if (seller !== 'ZZZZ') {
          sql = sql + " and TB02255_CODVEN = '" + seller + "' ";
        }
      }
    }
    if (valuesfield[7] !== '' && valuesfield[7] !== undefined) {
      sql = sql + " and TB02255_CODEMP = '" + valuesfield[7] + "' ";
    }
    if (valuesfield[8] !== '' && valuesfield[8] !== undefined) {
      sql = sql + " and TB02255_PRE = '" + valuesfield[8] + "' ";
    }
    if (valuesfield[9] !== '' && valuesfield[9] !== undefined) {
      sql = sql + " and TB02255_CONTRATO LIKE '" + valuesfield[8] + "%' ";
    }
    if (
      valuesfield[10] !== '' &&
      valuesfield[10] !== undefined &&
      valuesfield[10] !== null &&
      valuesfield[11] !== '' &&
      valuesfield[11] !== undefined &&
      valuesfield[11] !== null
    ) {
      const tmdata1 = Date.parse(valuesfield[10]);
      const dt1 = new Date(tmdata1);
      const data1 = dt1.toLocaleDateString('en-US');

      const tmdata2 = Date.parse(valuesfield[11]);
      const dt2 = new Date(tmdata2);
      const data2 = dt2.toLocaleDateString('en-US');
      sql = sql + " and TB02255_DATA BETWEEN '" + data1 + " 00:00:00' AND '" + data2 + " 23:59:00' ";
    }
    if (
      valuesfield[12] !== '' &&
      valuesfield[12] !== undefined &&
      valuesfield[12] !== null &&
      valuesfield[13] !== '' &&
      valuesfield[13] !== undefined &&
      valuesfield[13] !== null
    ) {
      const tmdata3 = Date.parse(valuesfield[12]);
      const dt3 = new Date(tmdata3);
      const data3 = dt3.toLocaleDateString('en-US');

      const tmdata4 = Date.parse(valuesfield[13]);
      const dt4 = new Date(tmdata4);
      const data4 = dt4.toLocaleDateString('en-US');
      sql = sql + " and TB02255_PREVISAO BETWEEN '" + data3 + " 00:00:00' AND '" + data4 + " 23:59:00' ";
    }
    if (valuesfield[14] !== '' && valuesfield[14] !== undefined && valuesfield[15] !== '' && valuesfield[15] !== undefined) {
      sql = sql + " and TB02255_QTDE BETWEEN '" + valuesfield[14] + "' AND '" + valuesfield[15] + "' ";
    }
    if (valuesfield[16] !== '' && valuesfield[16] !== undefined && valuesfield[17] !== '' && valuesfield[17] !== undefined) {
      sql = sql + " and TB02255_VLRNOTA BETWEEN '" + valuesfield[16] + "' AND '" + valuesfield[17] + "' ";
    }
    if (valuesfield[18] !== '' && valuesfield[18] !== undefined && valuesfield[18] !== '9') {
      sql = sql + ' and TB01129_TIPO = ' + valuesfield[18];
    }
    if (valuesfield[20] !== '' && valuesfield[20] !== undefined) {
      let chance = parseInt(valuesfield[20]);
      if (chance !== 0) {
        sql = sql + ' and TB02255_CHANCE = ' + valuesfield[20];
      }
    }
    sql = sql + ' order by TB02255_PREVISAOFIM ';
    setCarregando(true);
    apiFields(
      'OportunidadeVW',
      '*',
      "convert(varchar(10),tb02255_previsaofim,111) + ' ' + convert(varchar(10),tb02255_previsaofim,108) as PREVFIM, convert(varchar(10),dateadd(HOUR,1,tb02255_previsaofim),111) + ' ' + convert(varchar(10),dateadd(HOUR,1,tb02255_previsaofim),108) as PREVFIM2",
      sql
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
      }
    });
  };

  useEffect(() => {
    let tmpevents = [];
    if (rows !== undefined && rows.length > 0) {
      rows.forEach((element) => {
        let item = {};
        item['id'] = element.TB02255_CODIGO;
        let layout = parseInt(valuesfield[19]);
        switch (layout) {
          case 0: {
            if (parseInt(element.TB02255_TIPO) === 0) {
              item['title'] = element.TB02255_CODIGO + ' - ' + element.TB01008_NOME;
            } else {
              item['title'] = element.TB02255_CODIGO + ' - ' + element.TB01127_NOME;
            }
            break;
          }
          case 1: {
            item['title'] = element.TB02255_CODIGO + ' - ' + element.TB01128_NOME;
            break;
          }
          case 2: {
            item['title'] = element.TB02255_CODIGO + ' - ' + element.TB02255_NOME;
            break;
          }
          default: {
            if (parseInt(element.TB02255_TIPO) === 0) {
              item['title'] = element.TB02255_CODIGO + ' - ' + element.TB01008_NOME;
            } else {
              item['title'] = element.TB02255_CODIGO + ' - ' + element.TB01127_NOME;
            }
            break;
          }
        }
        item['start'] = new Date(element.PREVFIM);
        item['end'] = new Date(element.PREVFIM2);

        if (element.TB01129_COLOR !== '' && ((element.TB01129_COLOR !== undefined) !== element.TB01129_COLOR) !== null) {
          item['colorEvento'] = element.TB01129_COLOR;
        }
        if (element.TB01129_COLOR2 !== '' && ((element.TB01129_COLOR2 !== undefined) !== element.TB01129_COLOR2) !== null) {
          item['color'] = element.TB01129_COLOR2;
        }
        tmpevents = tmpevents.concat(item);
      });
      setEvents(tmpevents);
    }
  }, [rows]);

  useEffect(() => {
    try {
      const timeDifference = Math.abs(valuesfield[21].getTime() - valuesfield[22].getTime());
      const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      setDias(dayDifference);
    } catch (error) {
      setDias(30);
    }
  }, [valuesfield[21], valuesfield[22]]);

  useEffect(() => {
    valuesdisable[21] = valuesfield[23] !== 'S';
    valuesdisable[22] = valuesfield[23] !== 'S';
    setValuesdisable([...valuesdisable]);
    if (valuesfield[23] === 'S') {
      addToast('Atenção, colocando esta opção, somente irão visualizar os eventos no período desejado!', {
        placement: 'bottom-rigth',
        appearance: 'warning',
        autoDismiss: true
      });
    }
  }, [valuesfield[23]]);

  useEffect(() => {
    if (Decode64(sessionStorage.getItem('manager')) === 'N') {
      let seller = Decode64(sessionStorage.getItem('seller'));
      if (seller !== 'ZZZZ' && (valuesfield[6] === '' || valuesfield[6] === undefined || valuesfield[6] === null)) {
        valuesfield[6] = Decode64(sessionStorage.getItem('seller'));
        valuesdisable[6] = true;
        setValuesfield([...valuesfield]);
        setValuesdisable([...valuesdisable]);
      }
    }
    Filtrar();
  }, [fields]);

  const handleCloseinfor = () => {
    setShowinfor(false);
    Filtrar();
  };

  const Novo = () => {
    setRowselect(undefined);
    setTitulo('Nova Oportunidade');
    setIcon('feather icon-star h1');
    setShowinfor(true);
  };

  useEffect(() => {
    Filtrar();
  }, [showinfor]);

  useEffect(() => {
    if (dateevent !== undefined) {
      setRowselect(undefined);
      setTitulo('Nova Oportunidade');
      setIcon('feather icon-star h1');
      setShowinfor(true);
    }
  }, [dateevent]);

  return (
    <React.Fragment>
      <div id="frmagenda" name="frmagenda">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginBottom: '20px' }}>
          <Row>
            <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
              <Card.Header>
                <Card.Title as="h5">Agenda de Oportunidades</Card.Title>
              </Card.Header>
              <Row></Row>
              <div>
                {valuesfield[19] === 'N' || valuesfield[19] === undefined ? (
                  <Row style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px' }}>
                    {fields.map((field, index) => (
                      <CreateObject
                        key={index}
                        field={field}
                        index={field.id}
                        fields={fields}
                        valuesfield={valuesfield}
                        setValuesfield={(data) => setValuesfield(data)}
                        valuesfield2={valuesfield2}
                        setValuesfield2={(data) => setValuesfield2(data)}
                        disabled={valuesdisable[field.id]}
                      ></CreateObject>
                    ))}
                  </Row>
                ) : (
                  <></>
                )}
              </div>
              <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
                {fieldsoculta.map((field, index) => (
                  <CreateObject
                    key={index}
                    field={field}
                    index={field.id}
                    fields={fieldsoculta}
                    valuesfield={valuesfield}
                    setValuesfield={(data) => setValuesfield(data)}
                    valuesfield2={valuesfield2}
                    setValuesfield2={(data) => setValuesfield2(data)}
                    disabled={valuesdisable[field.id]}
                  ></CreateObject>
                ))}

                <Col style={{ textAlign: 'right', marginLeft: '5px', marginRight: '5px', marginTop: '30px' }}>
                  <Button id="btnFiltrar" className="btn shadow-2 mb-2" onClick={Filtrar}>
                    <i className={'feather icon-filter'} /> Filtrar
                  </Button>
                  <Button id="btnNovo" className="btn btn-success shadow-2 mb-2" onClick={() => Novo()}>
                    <i className={'feather icon-star'} /> Novo
                  </Button>
                </Col>
              </Row>
              <hr></hr>
              <Row style={{ marginBottom: '10px' }}>
                <Calendar
                  messages={defaultMessages}
                  localizer={localizer}
                  formats={{
                    agendaDateFormat: 'DD/MM ddd',
                    weekdayFormat: 'dddd'
                  }}
                  selectable
                  startAccessor="start"
                  endAccessor="end"
                  events={events}
                  date={valuesfield[23] === 'S' ? valuesfield[21] : undefined}
                  min={valuesfield[23] === 'S' ? valuesfield[21] : undefined} // Data mínima exibida no calendário
                  max={valuesfield[23] === 'S' ? valuesfield[22] : undefined} // Data máxima exibida no calendário
                  BackgroundWrapper="#04a9f5"
                  eventPropGetter={(myEventsList) => {
                    const backgroundColor = myEventsList.colorEvento ? myEventsList.colorEvento : '#04a9f5';
                    const color = myEventsList.color ? myEventsList.color : 'white';
                    return { style: { backgroundColor, color } };
                  }}
                  length={dias}
                  onNavigate={(newDate) => setDate(newDate)}
                  onDoubleClickEvent={(event, e) => {
                    let item = {};
                    item['TB02255_CODIGO'] = event.id;
                    setRowselect(item);
                    setTitulo('Oportunidade selecionada');
                    setIcon('feather icon-check-circle h1');
                    setShowinfor(true);
                  }}
                  onSelectSlot={(slotInfo) => {
                    const now = Date.now();
                    if (now - lastClick < 300) {
                      setDateevent(slotInfo.slots[0]);
                    }
                    setLastClick(now);
                  }}
                />
              </Row>
            </Card>
          </Row>
        </Row>
        <Modal backdrop="static" fullscreen={true} show={showinfor} centered={true} onHide={handleCloseinfor} contentClassName="modal-mov">
          <Modal.Header className="h5" closeButton>
            <i className={icon} />
            &nbsp;{titulo}
          </Modal.Header>
          <ModalBody>
            <InforOportunidade
              openmodal={true}
              showinfor={showinfor}
              rowselect={rowselect}
              setRowselect={(data) => setRowselect(data)}
              setShowinfor={(data) => setShowinfor(data)}
              onupdate={onupdate}
              setOnupdate={(data) => setOnupdate(data)}
              dateevent={dateevent}
              setDateevent={(data) => setDateevent(data)}
            ></InforOportunidade>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default OportunidadeAgenda;
