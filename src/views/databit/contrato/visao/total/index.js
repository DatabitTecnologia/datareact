import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import total from '../../../../../assets/images/databit/valortotal.png';
import equipamento from '../../../../../assets/images/databit/equipamento.png';
import contratado from '../../../../../assets/images/databit/contratado.png';

const VisaoTotal = (props) => {
  const { rows, setRows } = props;
  const [totais, setTotais] = useState([]);

  useEffect(() => {
    const tmptotais = [
      {
        id: 0,
        name: 'Total Contratos',
        value: 0,
        color: 'rgb(0, 204, 0)',
        background: `linear-gradient( rgba(0, 204, 0), transparent)`,
        colortitle: '#ffff',
        icon: contratado
      },
      {
        id: 1,
        name: 'Total Equipamentos',
        value: 0,
        color: 'rgb(210, 210, 0)',
        background: `linear-gradient( 'rgb(210, 210, 0)', transparent)`,
        colortitle: '#ffff',
        icon: equipamento
      },
      {
        id: 2,
        name: 'Valor Total',
        value: 0,
        color: 'rgb(51, 153, 255)',
        background: `linear-gradient(rgba(51, 153, 255), transparent)`,
        colortitle: '#ffff',
        icon: total
      }
    ];
    if (rows !== undefined && rows.length > 0) {
      rows.forEach((element) => {
        let valor = element.vlrnota;
        if (valor === null) {
          valor = 0;
        }
        tmptotais[0].value = tmptotais[0].value + 1;
        tmptotais[1].value = tmptotais[1].value + element.qtde;
        tmptotais[2].value = tmptotais[2].value + parseFloat(valor.toFixed(2));
      });
      setTotais([...tmptotais]);
    }
    let valorfim = tmptotais[2].value;
    valorfim = valorfim.toFixed(2);
    tmptotais[2].value = valorfim;
    setTotais([...tmptotais]);
  }, []);

  return (
    <React.Fragment>
      <Row>
        {totais.map((data, index) => {
          return (
            <Col key={index} md={6} xl={6}>
              <Card
                style={{
                  //background: data.background,
                  backgroundColor: data.color,
                  boxShadow: '0rem 0rem 1rem 0.1rem',
                  height: '180px'
                }}
              >
                <Card.Body>
                  <Row>
                    <Col key={index} md={2} xl={3}>
                      <img style={{ height: '75px', width: '75px' }} src={data.icon} alt={data.icon}></img>
                    </Col>
                    <Col key={index} md={1} xl={7}>
                      <h5 style={{ color: data.colortitle }}>{data.name}</h5>
                    </Col>
                  </Row>
                  <h3 className="mb-3 f-w-300" style={{ textAlign: 'right', color: data.colortitle }}>
                    {data.value}
                  </h3>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export default VisaoTotal;
