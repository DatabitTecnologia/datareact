import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import OportunidadeAgenda from '../oportunidade/agenda';
import PrevendaAgenda from '../prevenda/agenda';
import Quadrangular from '../../../assets/images/databit/quatro.png';
import { findModule } from '../dashboard/findmodule';
import DashboardFind from '../dashboard/find';
import { Decode64 } from '../../../utils/crypto';
import { CreateObject } from '../../../components/CreateObject';

const Principal = () => {
  const navigate = useNavigate();
  const [dashboards, setDashboards] = React.useState([]);
  const [showdash, setShowdash] = useState(false);
  const handleCloseShowdash = () => setShowdash(false);
  const [option, setOption] = React.useState(0);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);

  const telaclassic = (
    <div>
      <></>
    </div>
  );
  const telaclient = (
    <div>
      <Row style={{ alignItems: 'center' }}>
        <Col xs="auto" style={{ display: 'flex', alignItems: 'center' }}>
          <Button id="btnAgenda" className="btn shadow-2 mb-2" onClick={() => setOption(0)}>
            <i className="feather icon-calendar" /> Agenda
          </Button>
          <Button id="btnGrafico" className="btn btn-success shadow-2 mb-2" onClick={() => setOption(1)}>
            <i className="feather icon-bar-chart" /> Gráficos
          </Button>
        </Col>
        <Col style={{ marginTop: '-30px', marginLeft: '-30px' }}>
          {fields?.map((field, index) => (
            <CreateObject
              key={index}
              field={field}
              index={field.id}
              fields={fields}
              valuesfield={valuesfield}
              setValuesfield={setValuesfield}
              disabled={false}
              invisible={false}
            />
          ))}
        </Col>
      </Row>
      <Row>
        {option === 0 ? (
          parseInt(valuesfield[0]) === 0 || valuesfield[0] === undefined ? (
            <OportunidadeAgenda></OportunidadeAgenda>
          ) : (
            <PrevendaAgenda></PrevendaAgenda>
          )
        ) : (
          <DashboardFind module="TB00000" showdash={showdash} principal={true} setShowdash={(data) => setShowdash(data)}></DashboardFind>
        )}
      </Row>
    </div>
  );
  const telapartner = (
    <div className="auth-wrapper aut-bg-img-side cotainer-fiuid align-items-stretch">
      <div className="row align-items-center w-100 align-items-stretch bg-white">
        <div
          className="d-none d-lg-flex"
          style={{
            backgroundImage: `url(${Quadrangular})`, // Use a URL como fonte
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center'
          }}
        ></div>
      </div>
    </div>
  );

  const telafundo = (
    <div>
      {parseInt(Decode64(sessionStorage.getItem('system'))) === 1 ? telaclassic : <></>}
      {parseInt(Decode64(sessionStorage.getItem('system'))) === 2 ? telaclient : <></>}
      {parseInt(Decode64(sessionStorage.getItem('system'))) === 3 ? telapartner : <></>}
    </div>
  );

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'AGENDA',
        funcao: 'Tipo de Agenda',
        tipo: 'int',
        nome: 'situacao',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 15,
        measure: '15rem',
        itens: 'Oportunidades,Pré-Vendas',
        values: '0,1',
        disabled: false,
        invisible: false
      }
    ]);
    findModule('TB00000').then((response) => {
      setDashboards(response.data);
      if (!sessionStorage.getItem('user')) {
        navigate('/error');
        return;
      }
    });
  }, [navigate]);

  return <div>{telafundo}</div>;
};

export default Principal;
