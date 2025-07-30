import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { LinearProgress } from '@mui/material';
import { Row, Col, Button, Modal, ModalBody, ModalFooter, Form } from 'react-bootstrap';

//os numeros apos os nomes das imagens são referentes ai TB01010_TIPOSUP do datalcassic
import TipoSup0 from '../../../assets/images/produtos/TipoSup0.png';
import TipoSup1 from '../../../assets/images/produtos/TipoSup1.png';
import TipoSup2 from '../../../assets/images/produtos/TipoSup2.png';
import TipoSup3 from '../../../assets/images/produtos/TipoSup3.png';
import TipoSup4 from '../../../assets/images/produtos/TipoSup4.png';
import TipoSup9 from '../../../assets/images/produtos/TipoSup9.png';
import TipoSup10 from '../../../assets/images/produtos/TipoSup10.png';


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
    TipoSup0,
    TipoSup1,
    TipoSup2,
    TipoSup3,
    TipoSup4,
    TipoSup9,
    TipoSup10,
   
  
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
      <div id="frmavatar" name="frmavatar" style={{ height: '22.7rem' }}>
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ textAlign: 'center', marginTop: '3px' }}>
          <Col>
            {foto === undefined || foto === '' || foto === null ? (
              <img src={TipoSup0} alt="avatar"  style={{ width: '235px', height: '235px', objectFit: 'contain' }} />
            ) : (
              <img src={`data:image/jpeg;base64,${foto}`}  alt="avatar" style={{ width: '235px', height: '235px', objectFit: 'contain' }} />
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
                <img src={url} alt="avatar"  width="216" height="216" />
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
