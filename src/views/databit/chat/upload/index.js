import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { CreateObject } from '../../../../components/CreateObject';
import jpg from '../../../../assets/images/databit/jpg.png';
import pdf from '../../../../assets/images/databit/pdf.png';
import doc from '../../../../assets/images/databit/doc.png';
import xls from '../../../../assets/images/databit/xls.png';
import mp3 from '../../../../assets/images/databit/mp3.png';
import avi from '../../../../assets/images/databit/avi.png';
import all from '../../../../assets/images/databit/all.png';
import ViewerDoc from '../../documento/viewer';
import { sendAudio, sendDocument, sendImage, sendVideo } from '../../../../api/datawhats';
import { getBase64 } from '../../../../utils/crypto';

const ChatUpload = (props) => {
  const { contato } = props;
  const [file, setFile] = React.useState();
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [extension, setExtension] = React.useState('.pdf');
  const { showupload, setShowupload } = props;
  const [image, setImage] = React.useState(pdf);
  const [extselec, setExtselec] = React.useState('');
  const [showviewer, setShowviewer] = React.useState(false);
  const [img64, setImg64] = useState('');

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB08026_TIPO',
        funcao: 'Tipo de Arquivo',
        tipo: 'varchar',
        nome: 'visualiza',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 39,
        measure: '39rem',
        itens:
          "Arquivos PDF (.pdf),Arquivos Imagem (.bmp;.tiff;.jpeg;.png;.eps;.svg;.jpg;.jpeg,Arquivos de Àudio (.wav;.mp3;.aiff;.au;.mid;.midi;.wma;.ogg),Arquivos Excel ('.sheet;.xlsx'),Arquivos Word (.document;.docx'),Arquivos Vídeo ('.asf;.avi;.mp4;.m4v;.mov;.mpg;.mpeg;.wm'),Outros Arquivos (*.*)",
        values: '0,1,2,3,4,5,6',
        disabled: false
      }
    ]);
    valuesfield[0] = '0';
    setValuesfield([...valuesfield]);
  }, []);

  useEffect(() => {
    setFile(undefined);
    let option = parseInt(valuesfield[0]);
    switch (option) {
      case 0: {
        setExtension('.pdf');
        setImage(pdf);
        setExtselec('pdf');
        break;
      }
      case 1: {
        setExtension('.bmp,.tiff,.jpeg,.png,.eps,.svg,.jpg,.jpeg');
        setImage(jpg);
        setExtselec('jpg');
        break;
      }
      case 2: {
        setExtension('.wav,.mp3,.aiff,.au,.mid,.midi,.wma,.ogg');
        setImage(mp3);
        setExtselec('mp3');
        break;
      }
      case 3: {
        setExtension('.sheet,.xlsx');
        setImage(xls);
        setExtselec('xlsx');
        break;
      }
      case 4: {
        setExtension('.document,.docx');
        setImage(doc);
        setExtselec('docx');
        break;
      }
      case 5: {
        setExtension('.asf,.avi,.mp4,.m4v,.mov,.mpg,.mpeg,.wm');
        setImage(avi);
        setExtselec('mp4');
        break;
      }
      case 6: {
        setExtension('*.*');
        setImage(all);
        setExtselec('*.*');
        break;
      }
    }
  }, [valuesfield[0]]);

  const SendFile = () => {
    let option = parseInt(valuesfield[0]);
    if (option === 0 || option === 3 || option === 4 || option === 6) {
      sendDocument(contato.whatsapp, img64, valuesfield[1], extselec, '');
    } else if (option === 1) {
      sendImage(contato.whatsapp, img64, valuesfield[1], '');
    } else if (option === 2) {
      sendAudio(contato.whatsapp, img64, valuesfield[1], '');
    } else if (option === 5) {
      sendVideo(contato.whatsapp, img64, valuesfield[1], '');
    }
    setShowupload(false);
  };

  const handleCloseviewer = () => {
    setShowviewer(false);
  };

  return (
    <React.Fragment>
      <div id="upload" name="upload">
        <Row>
          <Col lg={2}>
            <img src={image} alt={'pdf'} height={120} width={120} />
          </Col>
          <Col>
            <Row>
              <Col>
                {fields.map((field, index) => (
                  <CreateObject
                    key={field.id}
                    field={field}
                    index={field.id}
                    fields={fields}
                    valuesfield={valuesfield}
                    setValuesfield={(data) => setValuesfield(data)}
                    valuesfield2={valuesfield2}
                    setValuesfield2={(data) => setValuesfield2(data)}
                    disabled={false}
                  ></CreateObject>
                ))}
              </Col>
            </Row>
            <Row>
              <Form.Group controlId="formFile" style={{ marginLeft: '5px', marginTop: '8px', width: '40rem' }} className="mb-1">
                <Form.Control
                  type="file"
                  accept={extension}
                  onChange={(e) => {
                    try {
                      let arquivo = e.target.files[0].name;
                      arquivo = arquivo.substring(0, arquivo.indexOf('.'));
                      valuesfield[1] = arquivo;
                      setValuesfield([...valuesfield]);
                      setFile(URL.createObjectURL(e.target.files[0]));
                      getBase64(e.target.files[0])
                        .then((res) => {
                          let pos = res.indexOf('base64') + 7;
                          res = res.substring(pos);
                          setImg64(res);
                        })
                        .catch((err) => console.log(err));
                    } catch (error) {
                      console.log(error);
                      setFile(undefined);
                    }
                  }}
                />
              </Form.Group>
            </Row>
          </Col>
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'right' }}>
          <Col>
            <Button id="btnEnviar" className="btn btn-primary shadow-2 mb-3" disabled={file === undefined} onClick={(e) => SendFile()}>
              <i className={'feather icon-play'} /> Enviar
            </Button>
            <Button
              id="btnVisualizar"
              className="btn btn-success shadow-2 mb-3"
              onClick={(e) => setShowviewer(true)}
              disabled={file === undefined}
            >
              <i className={'feather icon-eye'} /> Visualizar
            </Button>
            <Button id="btnFecharupload" className="btn btn-warning shadow-2 mb-3" onClick={(e) => setShowupload(false)}>
              <i className={'feather icon-log-out'} /> Fechar
            </Button>
          </Col>
        </Row>
      </div>
      <Modal backdrop="static" fullscreen={true} show={showviewer} centered={true} onHide={handleCloseviewer}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-see h1'} />
          &nbsp;Visualizar Documento
        </Modal.Header>
        <Modal.Body>
          <ViewerDoc url={file} ext={extselec}></ViewerDoc>
        </Modal.Body>
        <Modal.Footer>
          <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleCloseviewer}>
            <i className={'feather icon-x-circle'} /> Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ChatUpload;
