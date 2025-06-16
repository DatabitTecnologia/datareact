import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { LinearProgress } from '@mui/material';
import { apiFind, apiUpdate } from '../../../../../api/crudapi';

const PartnerStatusColor = (props) => {
  const [itemselec, setItemselec] = React.useState([]);
  const [cor, setCor] = React.useState('#fff');
  const [cor2, setCor2] = React.useState('#fff');
  const [carregando, setCarregando] = React.useState(false);
  const { showwcolor, setShowcolor } = props;

  useEffect(() => {
    setCarregando(true);
    apiFind(
      'PartnerStatus',
      'TB01148_CODIGO,TB01148_NOME,TB01148_COLOR,TB01148_COLOR2',
      '',
      "TB01148_CODIGO = '" + props.statusselec + "' "
    ).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setItemselec(response.data);
      }
    });
  }, []);

  useEffect(() => {
    ValidCor(itemselec.color);
    ValidCor(itemselec.color2);
    if (itemselec.color !== undefined && itemselec.color !== '' && itemselec.color !== null) {
      setCor(itemselec.color);
      setCor2(itemselec.color2);
    }
  }, [itemselec]);

  const Salvar = (item) => {
    item.color = cor;
    item.color2 = cor2;
    setCarregando(true);
    apiUpdate('PartnerStatus', item).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setItemselec(response.data);
        setShowcolor(false);
      }
    });
  };

  const Cancelar = () => {
    setShowcolor(false);
  };

  const handleChangecor = (color) => {
    if (color !== null) {
      setCor(color.hex);
    }
  };

  const handleChangecor2 = (color) => {
    if (color !== null) {
      setCor2(color.hex);
    }
  };

  const ValidCor = (color) => {
    if (color === null) {
      return '#fff';
    } else {
      return color;
    }
  };

  const getSelected = () => {
    if (itemselec !== undefined) {
      return itemselec;
    } else {
      return '';
    }
  };

  return (
    <React.Fragment>
      <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
      <Row style={{ marginBottom: '5px' }}>
        <Button style={{ backgroundColor: ValidCor(cor), color: ValidCor(cor2), borderColor: '#fff' }}>Cor da listagem</Button>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Cor de Fundo</Card.Title>
            </Card.Header>
            <Card.Body>
              <SketchPicker
                height="300px"
                width="300px"
                textAlign="center"
                color={ValidCor(cor)}
                onChangeComplete={(color) => handleChangecor(color)}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Cor da Fonte</Card.Title>
            </Card.Header>
            <Card.Body>
              <SketchPicker
                height="300px"
                width="300px"
                textAlign="center"
                color={ValidCor(cor2)}
                onChangeComplete={(color) => handleChangecor2(color)}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr></hr>
      <Row style={{ textAlign: 'center' }}>
        <Col style={{ textAlign: 'rigth' }}>
          <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={() => Salvar(getSelected())}>
            <i className={'feather icon-save'} /> Salvar
          </Button>
          <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={() => Cancelar()}>
            <i className={'feather icon-x'} />
            Cancelar
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PartnerStatusColor;
