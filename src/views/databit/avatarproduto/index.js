import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { LinearProgress } from '@mui/material';
import { Row, Col, Button, Modal, ModalBody, ModalFooter, Form } from 'react-bootstrap';
import user from '../../../assets/images/databit/User.png';
import user1 from '../../../assets/images/databit/User1.png';
import user2 from '../../../assets/images/databit/User2.png';
import user3 from '../../../assets/images/databit/User3.png';
import user4 from '../../../assets/images/databit/User4.png';
import user5 from '../../../assets/images/databit/User5.png';
import user6 from '../../../assets/images/databit/User6.png';
import user7 from '../../../assets/images/databit/User7.png';
import user8 from '../../../assets/images/databit/User8.png';
import user9 from '../../../assets/images/databit/User9.png';
import user10 from '../../../assets/images/databit/User10.png';
import user11 from '../../../assets/images/databit/User11.png';
import user12 from '../../../assets/images/databit/User12.png';
import user13 from '../../../assets/images/databit/User13.png';
import user14 from '../../../assets/images/databit/User14.png';
import user15 from '../../../assets/images/databit/User15.png';
import user16 from '../../../assets/images/databit/User16.png';
import user17 from '../../../assets/images/databit/User17.png';
import user18 from '../../../assets/images/databit/User18.png';
import user19 from '../../../assets/images/databit/User19.png';
import user20 from '../../../assets/images/databit/User20.png';
import user21 from '../../../assets/images/databit/User21.png';
import user22 from '../../../assets/images/databit/User22.png';
import user23 from '../../../assets/images/databit/User23.png';
import user24 from '../../../assets/images/databit/User24.png';
import user25 from '../../../assets/images/databit/User25.png';
import user26 from '../../../assets/images/databit/User26.png';
import user27 from '../../../assets/images/databit/User27.png';
import user28 from '../../../assets/images/databit/User28.png';
import user29 from '../../../assets/images/databit/User29.png';
import user30 from '../../../assets/images/databit/User30.png';
import user31 from '../../../assets/images/databit/User31.png';
import user32 from '../../../assets/images/databit/User32.png';
import user33 from '../../../assets/images/databit/User33.png';
import user34 from '../../../assets/images/databit/User34.png';
import user35 from '../../../assets/images/databit/User35.png';
import user36 from '../../../assets/images/databit/User36.png';
import user37 from '../../../assets/images/databit/User37.png';
import user38 from '../../../assets/images/databit/User38.png';
import user39 from '../../../assets/images/databit/User39.png';
import user40 from '../../../assets/images/databit/User40.png';
import user41 from '../../../assets/images/databit/User41.png';
import user42 from '../../../assets/images/databit/User42.png';
import user43 from '../../../assets/images/databit/User43.png';
import user44 from '../../../assets/images/databit/User44.png';
import user45 from '../../../assets/images/databit/User45.png';
import user46 from '../../../assets/images/databit/User46.png';
import user47 from '../../../assets/images/databit/User47.png';
import user48 from '../../../assets/images/databit/User48.png';
import user49 from '../../../assets/images/databit/User49.png';
import user50 from '../../../assets/images/databit/User50.png';

import { apiGetPicture, apiSetPicture, apiExec } from '../../../api/crudapi';
import { getBase64, imageUrlToBase64 } from '../../../utils/crypto';

const AvatarProduto = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const { table, field, fieldpk, value } = props;
  const [foto, setFoto] = React.useState();
  const { addToast } = useToasts();
  const [url, setUrl] = React.useState();
  const [showfile, setShowfile] = useState(false);
  const [img64, setImg64] = useState('');
  const [showavatar, setShowavatar] = useState(false);
  const { disabledform, setDisabledform } = props;

  const arrayImages = [
    user1,
    user2,
    user3,
    user4,
    user5,
    user6,
    user7,
    user8,
    user9,
    user10,
    user11,
    user12,
    user13,
    user14,
    user15,
    user16,
    user17,
    user18,
    user19,
    user20,
    user21,
    user22,
    user23,
    user24,
    user25,
    user26,
    user27,
    user28,
    user29,
    user30,
    user31,
    user32,
    user33,
    user34,
    user35,
    user36,
    user37,
    user38,
    user39,
    user40,
    user41,
    user42,
    user43,
    user44,
    user45,
    user46,
    user47,
    user48,
    user49,
    user50
  ];

  useEffect(() => {
    setCarregando(false);
    Filtrar();
  }, []);

  const Filtrar = () => {
    apiGetPicture(table, fieldpk, field, value).then((response) => {
      if (response.status === 200) {
        setFoto(response.data[0].picture);
        setCarregando(false);
      }
    });
  };

  const Upload = (e) => {
    setShowfile(true);
  };

  const handleCloseShowFile = () => {
    setShowfile(false);
  };

  const OnAvatar = (e) => {
    setShowavatar(true);
  };

  const handleCloseShowavatar = () => {
    setShowavatar(false);
  };

  const Salvar = () => {
    setCarregando(true);
    apiSetPicture(table, fieldpk, field, value, img64).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setShowfile(false);
      }
    });
  };

  const Limpar = () => {
    let sql = 'UPDATE ' + table + ' SET ' + field + ' = null WHERE ' + fieldpk + " = '" + value + "' ";
    setCarregando(true);
    apiExec(sql, 'N').then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setFoto(undefined);
        setShowfile(false);
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

  const SaveAvatar = (image) => {
    imageUrlToBase64(image.target.src)
      .then((res) => {
        let pos = res.indexOf('base64') + 7;
        res = res.substring(pos);
        setImg64(res);
        setCarregando(true);
        apiSetPicture(table, fieldpk, field, value, res).then((response) => {
          if (response.status === 200) {
            setCarregando(false);
            setShowavatar(false);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!showavatar) {
      Filtrar();
    }
  }, [showavatar]);

  return (
    <React.Fragment>
      <div id="frmavatar" name="frmavatar">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ textAlign: 'center', marginTop: '3px' }}>
          <Col>
            {foto === undefined || foto === '' || foto === null ? (
              <img src={user} alt="avatar" className="rounded-circle" width="116" height="116" />
            ) : (
              <img src={`data:image/jpeg;base64,${foto}`} alt="avatar" className="rounded-circle" width="116" height="116" />
            )}
          </Col>
        </Row>
        <Row style={{ textAlign: 'center', marginTop: '7px' }}>
          <Col>
            <Button
              id="btnUpload"
              type="file"
              className="btn btn-primary shadow-2 mb-3"
              disabled={!disabledform}
              onClick={(e) => Upload(e)}
            >
              <i className={'feather icon-upload'} /> Upload
            </Button>
            <Button id="btnClear" className="btn btn-primary shadow-2 mb-3" disabled={!disabledform} onClick={Limpar}>
              <i className={'feather icon-trash'} /> Limpar
            </Button>
          </Col>
        </Row>
        <Row style={{ marginLeft: '2px', marginRight: '10px' }}>
          <Button id="btnAvatar" className="btn btn-success shadow-2 mb-3" disabled={!disabledform} onClick={OnAvatar}>
            <i className={'feather icon-image'} /> Avatar
          </Button>
        </Row>
      </div>
      <Modal  backdrop="static" size="lg" show={showfile} centered={true} onHide={handleCloseShowFile}>
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-camera h1'} />
          &nbsp;Definição da Foto
        </Modal.Header>
        <ModalBody>
          <Form.Group controlId="formFile" className="mb-1">
            <Form.Label>Favor escolher o arquivo:</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                setUrl(URL.createObjectURL(e.target.files[0]));
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
              {url !== undefined && (url !== null) & (url !== '') ? (
                <img src={url} alt="avatar" className="rounded-circle" width="216" height="216" />
              ) : (
                <></>
              )}
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
      <Modal  backdrop="static" size="xl" show={showavatar} centered={true} onHide={handleCloseShowavatar}>
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-image h1'} />
          &nbsp;Avatar
        </Modal.Header>
        <ModalBody>
          <Row>
            {arrayImages.map((value, index) => (
              <Col key={{ index }} style={{ marginRight: '2px' }}>
                <img
                  src={value}
                  alt={value}
                  className="rounded-circle"
                  width="80"
                  height="80"
                  key={{ index }}
                  onDoubleClick={(e) => SaveAvatar(e)}
                />
              </Col>
            ))}
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button id="btnCancelar" className="btn btn-success shadow-2 mb-2" onClick={handleCloseShowavatar}>
            <i className={'feather icon-x'} />
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default AvatarProduto;
