import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { Row, Col, Button, Modal, ModalBody, ModalFooter, Form } from 'react-bootstrap';
import { apiGetPicture, apiSetPicture, apiExec } from '../../../../api/crudapi';
import { getBase64 } from '../../../../utils/crypto';

const DashboardImage = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [foto, setFoto] = React.useState();
  const [url, setUrl] = React.useState();
  const [showfile, setShowfile] = useState(false);
  const [img64, setImg64] = useState('');
  const { valuesfield, setValuesfield } = props;

  useEffect(() => {
    setCarregando(false);
    Filtrar();
  }, []);

  const Filtrar = () => {
    apiGetPicture('TB00116', 'TB00116_IDQUERY', 'TB00116_IMAGE', valuesfield[14]).then((response) => {
      if (response.status === 200) {
        setFoto(response.data[0].picture);
        setCarregando(false);
      }
    });
  };

  useEffect(() => {
    if (showfile) {
      setUrl(undefined);
      setImg64('');
    } else {
      Filtrar();
    }
  }, [showfile]);

  const Upload = (e) => {
    setShowfile(true);
  };

  const handleCloseShowFile = () => {
    setShowfile(false);
  };

  const Salvar = () => {
    setCarregando(true);
    apiSetPicture('TB00116', 'TB00116_IDQUERY', 'TB00116_IMAGE', valuesfield[14], img64).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setShowfile(false);
      }
    });
  };

  const Limpar = () => {
    let sql = "UPDATE TB00116 SET TB00116_IMAGE = null WHERE TB00116_IDQUERY = '" + valuesfield[14] + "' ";
    setCarregando(true);
    apiExec(sql, 'N').then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setFoto(undefined);
        setShowfile(false);
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frmsignature" name="frmsignature">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ textAlign: 'center', marginTop: '10px' }}>
          <Col>
            {foto === undefined || foto === '' || foto === null ? (
              <img alt="avatar" />
            ) : (
              <img src={`data:image/jpeg;base64,${foto}`} alt="avatar" />
            )}
          </Col>
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'center', marginTop: '7px' }}>
          <Col>
            <Button id="btnUpload" type="file" className="btn btn-primary shadow-2 mb-3" onClick={(e) => Upload(e)}>
              <i className={'feather icon-upload'} /> Upload
            </Button>
            <Button id="btnClear" className="btn btn-primary shadow-2 mb-3" onClick={Limpar}>
              <i className={'feather icon-trash'} /> Limpar
            </Button>
          </Col>
        </Row>
      </div>
      <Modal backdrop="static" size="lg" show={showfile} centered={true} onHide={handleCloseShowFile}>
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-camera h1'} />
          &nbsp;Imagem do Cartão
        </Modal.Header>
        <ModalBody>
          <Form.Group controlId="formFile" className="mb-1">
            <Form.Label>Favor escolher o arquivo:</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                setUrl(URL.createObjectURL(e.target.files[0]));
                console.log(e.target.files[0]);
                getBase64(e.target.files[0])
                  .then((res) => {
                    let pos = res.indexOf('base64') + 7;
                    res = res.substring(pos);
                    setImg64(res);
                  })
                  .catch((err) => console.log(err));
              }}
            />
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              {url !== undefined && (url !== null) & (url !== '') ? <img src={url} alt="avatar" /> : <></>}
            </div>
          </Form.Group>
        </ModalBody>
        <ModalFooter>
          <Row style={{ textAlign: 'rigth' }}>
            <Col>
              <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={Salvar}>
                <i className={'feather icon-save'} /> Salvar
              </Button>
              <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={handleCloseShowFile}>
                <i className={'feather icon-x'} />
                Cancelar
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default DashboardImage;
