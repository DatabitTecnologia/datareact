import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalBody, Card } from 'react-bootstrap';
import Cabecalho from './cabecalho';
import Item from './item';
import Total from './total';
import Servico from './servico';
import Parcela from './parcela';
import { Message } from '../../../components/Message';

const Movimentacao = (props) => {
  const {
    cabecalho,
    disabled,
    tableitem,
    classcab,
    classitem,
    typeprice,
    tablemov,
    entsai,
    coddest,
    tabdest,
    typestock,
    contabil,
    fieldscab,
    columnsitem,
    fieldsitem,
    fieldslanc,
    fieldsimp,
    fieldsarredonda,
    tableserv,
    classserv,
    columnsserv,
    setColumnsserv,
    fieldsimpserv,
    setFieldsimpserv,
    fieldsarredondaserv,
    setFieldsarredondaserv,
    eventsserv,
    setEventsserv,
    tablepar,
    columnspar,
    recalcpar,
    classpar,
    fieldspar,
    setFieldspar,
    eventspar,
    setEventspar
  } = props;
  const { valuesfield, setValuesfield } = props;
  const { valuesfield2, setValuesfield2 } = props;
  const { activeStep, setActiveStep } = props;
  const { eventsitem, setEventsitem } = props;
  const { movimento, setMovimento } = props;
  const { refreshprice, setRefreshprice } = props;
  const [showtotal, setShowtotal] = React.useState(false);
  const [showparcela, setShowparcela] = React.useState(false);
  const [steps, setSteps] = React.useState([]);
  const [icons, setIcons] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [rowspar, setRowspar] = React.useState([]);

  useEffect(() => {
    let tmpsteps = [];
    let tmpicons = [];
    let tmpoptions = [];
    // Cabeçalho
    tmpsteps.push('Cabeçalho / Observações');
    tmpicons.push('feather icon-file-text');
    tmpoptions.push(0);
    if (tableitem !== undefined) {
      // Produtos
      tmpsteps.push('Definição de Produtos');
      tmpicons.push('feather icon-package');
      tmpoptions.push(1);
    }
    if (tableserv !== undefined) {
      // Serviços
      tmpsteps.push('Definição de Serviços');
      tmpicons.push('feather icon-cpu');
      tmpoptions.push(2);
    }
    if (tablepar !== undefined) {
      // Parcelas
      tmpsteps.push('Definição de Parcelas');
      tmpicons.push('fi flaticon-business-and-finance');
      tmpoptions.push(3);
    }
    // Totalizadores
    tmpsteps.push('Totalizadores');
    tmpicons.push('feather icon-plus');
    tmpoptions.push(4);

    setSteps(tmpsteps);
    setIcons(tmpicons);
    setOptions(tmpoptions);
  }, []);

  useEffect(() => {
    if ((showtotal, showparcela)) {
      setActiveStep(0);
    }
  }, [showtotal, showparcela]);

  const handleStep = (step) => () => {
    setActiveStep(step);
    setShowtotal(step === 4);
    setShowparcela(step === 3);
  };

  const handleClosetotal = () => {
    setShowtotal(false);
    setActiveStep(0);
  };

  const handleCloseparcela = async () => {
    const total = rowspar.reduce((soma, item) => soma + item.vlrdoc, 0);
    if (total.toFixed(2) !== cabecalho.vlrnota.toFixed(2) && rowspar.length > 0) {
      await Message('frmparcela', '', 'warning', 'O total das parcelas não bate com o valor da Nota !');
    } else {
      setShowparcela(false);
      setActiveStep(0);
    }
  };

  return (
    <React.Fragment>
      <div id="frmmovimentacao" name="frmmovimentacao">
        <Row style={{ textAlign: 'center', marginTop: '1px', marginBottom: '1px' }}>
          <Row>
            {steps !== undefined && steps.length > 0 ? (
              <Col>
                {steps.map((label, index) => (
                  <Button
                    key={index}
                    className={index === activeStep ? 'btn btn-success shadow-2 mb-3' : 'btn btn-primary shadow-2 mb-3'}
                    onClick={handleStep(options[index])}
                    disabled={!disabled}
                  >
                    <i className={icons[index]} /> {label}
                  </Button>
                ))}
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </Row>

        {activeStep === 0 ? (
          <Cabecalho
            disabled={disabled}
            valuesfield={valuesfield}
            setValuesfield={(data) => setValuesfield(data)}
            valuesfield2={valuesfield2}
            setValuesfield2={(data) => setValuesfield2(data)}
            fieldscab={fieldscab}
          ></Cabecalho>
        ) : (
          <></>
        )}
        {activeStep === 1 && cabecalho !== undefined ? (
          <Item
            cabecalho={cabecalho}
            disabled={disabled}
            tableitem={tableitem}
            columnsitem={columnsitem}
            fieldsitem={fieldsitem}
            classcab={classcab}
            classitem={classitem}
            typeprice={typeprice}
            tablemov={tablemov}
            fieldslanc={fieldslanc}
            fieldsimp={fieldsimp}
            fieldsarredonda={fieldsarredonda}
            entsai={entsai}
            coddest={coddest}
            tabdest={tabdest}
            typestock={typestock}
            contabil={contabil}
            eventsitem={eventsitem}
            setEventsitem={(data) => setEventsitem(data)}
            movimento={movimento}
            setMovimento={(data) => setMovimento(data)}
            refreshprice={refreshprice}
            setRefreshprice={(data) => setRefreshprice(data)}
          ></Item>
        ) : (
          <></>
        )}
        {activeStep === 2 && cabecalho !== undefined ? (
          <Servico
            cabecalho={cabecalho}
            disabled={disabled}
            tableserv={tableserv}
            columnsserv={columnsserv}
            classcab={classcab}
            classserv={classserv}
            tablemov={tablemov}
            fieldsimpserv={fieldsimpserv}
            fieldsarredondaserv={fieldsarredondaserv}
            eventsserv={eventsserv}
            setEventsserv={(data) => setEventsserv(data)}
            movimento={movimento}
            setMovimento={(data) => setMovimento(data)}
            refreshprice={refreshprice}
            setRefreshprice={(data) => setRefreshprice(data)}
          ></Servico>
        ) : (
          <></>
        )}
      </div>
      <Modal backdrop="static" size="xl" show={showtotal} centered={true} onHide={handleClosetotal}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-plus'} />
          &nbsp;Totalizadores
        </Modal.Header>
        <ModalBody>
          {cabecalho !== undefined ? (
            <Total cabecalho={cabecalho} table={tablemov} showtotal={showtotal} setShowtotal={(data) => setShowtotal(data)}></Total>
          ) : (
            <></>
          )}
        </ModalBody>
      </Modal>

      <Modal backdrop="static" size="xl" show={showparcela} centered={true} onHide={handleCloseparcela}>
        <Modal.Header className="h5" closeButton>
          <i className={'fi flaticon-business-and-finance'} />
          &nbsp;Definição de Parcelas
        </Modal.Header>
        <ModalBody>
          {cabecalho !== undefined ? (
            <Parcela
              cabecalho={cabecalho}
              tablepar={tablepar}
              columnspar={columnspar}
              recalcpar={recalcpar}
              classpar={classpar}
              fieldspar={fieldspar}
              setFieldspar={(data) => setFieldspar(data)}
              showparcela={showparcela}
              setShowparcela={(data) => setShowparcela(data)}
              eventspar={eventspar}
              setEventspar={(data) => setEventspar(data)}
              rows={rowspar}
              setRows={(data) => setRowspar(data)}
            ></Parcela>
          ) : (
            <></>
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Movimentacao;
