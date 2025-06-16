import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { SketchPicker } from 'react-color';

const DashboardColor = (props) => {
  const [cor, setCor] = React.useState('#fff');
  const { showcolor, setShowcolor, typecolor } = props;
  const { valuesfield, setValuesfield } = props;

  useEffect(() => {
    if (typecolor === 1) {
      setCor(valuesfield[10]);
      validCor(valuesfield[10]);
    } else {
      setCor(valuesfield[13]);
      validCor(valuesfield[13]);
    }
  }, []);

  const handleChangecor = (color) => {
    if (color !== null) {
      setCor(color.hex);
    }
  };

  const validCor = (color) => {
    if (color === null) {
      if (typecolor === 1) {
        return '#33ccff';
      } else {
        return '#fff';
      }
    } else {
      return color;
    }
  };

  const Salvar = () => {
    if (typecolor === 1) {
      valuesfield[10] = cor;
    } else {
      valuesfield[13] = cor;
    }
    setValuesfield([...valuesfield]);
    setShowcolor(false);
  };

  return (
    <React.Fragment>
      <div id="dashcolor" name="dashcolor">
        <Row style={{ marginBottom: '10px' }}>
          <Button style={{ backgroundColor: validCor(cor), borderColor: '#fff' }}>Cor do Objeto</Button>
        </Row>
        <Row style={{ marginLeft: '5px', marginRight: '25px' }}>
          <SketchPicker height="100%" width="100%" color={validCor(cor)} onChangeComplete={(color) => handleChangecor(color)} />
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={() => Salvar()}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={() => setShowcolor(false)}>
              <i className={'feather icon-x'} />
              Cancelar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DashboardColor;
