import React, { useEffect, useState } from 'react';
import FileViewer from 'react-file-viewer';
import { LinearProgress } from '@mui/material';
import { Row, Col, Button, Modal, ModalBody, ModalFooter, Form } from 'react-bootstrap';
import { apiGetFile, apiSetFile, apiUpdate, apiExec } from '../../../../api/crudapi';
import { getBase64 } from '../../../../utils/crypto';
import { base64toBlob } from '../../../../utils/crypto';

const PropostaViewer = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const { table, field, fieldpk, value } = props;
  const [foto, setFoto] = React.useState();
  const [url, setUrl] = React.useState();
  const [showfile, setShowfile] = useState(false);
  const [img64, setImg64] = useState('');
  const { disabledform, setDisabledform } = props;
  const [ext, setExt] = React.useState();
  const [arq64, setArq64] = React.useState();
  const [arquivo, setArquivo] = React.useState();

  useEffect(() => {
    setCarregando(false);
    Filtrar();
  }, []);

  const Filtrar = () => {
    apiGetFile(table, fieldpk, field, value).then((response) => {
      if (response.status === 200) {
        if (response.data[0].arq !== undefined && response.data[0].arq !== '' && response.data[0].arq !== null) {
          setArq64(response.data[0].arq);
          const s64 = base64toBlob(response.data[0].arq, ext);
          const url = URL.createObjectURL(s64);
          setUrl(url);
          setExt(ext);
        } else {
          setUrl(undefined);
          setExt(undefined);
        }
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
    apiSetFile(table, fieldpk, field, value, img64).then((response) => {
      if (response.status === 200) {
        let item = {};
        item['arquivo'] = arquivo;
        item['codigo'] = value;
        apiUpdate('PropostaModelo', item).then((response) => {
          if (response.status === 200) {
            setCarregando(false);
            setShowfile(false);
          }
        });
        Filtrar();
      }
    });
  };

  const Limpar = () => {
    let sql = 'UPDATE ' + table + ' SET ' + field + ' = null, ' + table + '_ARQUIVO = null  WHERE ' + fieldpk + " = '" + value + "' ";
    setCarregando(true);
    apiExec(sql, 'N').then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setFoto(undefined);
        setShowfile(false);
        Filtrar();
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frmviewer" name="frmviewer">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
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
        <hr></hr>
        <Row style={{ marginTop: '5px', width: '100%' }}>
          <Col>
            {url === undefined || url === '' || url === null ? (
              <></>
            ) : (
              <FileViewer fileType="docx" filePath={url} width="100%" height="100%" onGridSort={() => null}></FileViewer>
            )}
          </Col>
        </Row>
        <hr></hr>
      </div>
      <Modal backdrop="static" size="lg" show={showfile} centered={true} onHide={handleCloseShowFile}>
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-file h1'} />
          &nbsp;Definição do Arquivo
        </Modal.Header>
        <ModalBody>
          <Form.Group controlId="formFile" className="mb-1">
            <Form.Label>Favor escolher o arquivo:</Form.Label>
            <Form.Control
              type="file"
              accept=".docx"
              onChange={(e) => {
                setUrl(URL.createObjectURL(e.target.files[0]));
                setArquivo(e.target.files[0].name);
                getBase64(e.target.files[0])
                  .then((res) => {
                    let pos = res.indexOf('base64') + 7;
                    res = res.substring(pos);
                    setImg64(res);
                  })
                  .catch((err) => console.log(err));
              }}
            />
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

export default PropostaViewer;
