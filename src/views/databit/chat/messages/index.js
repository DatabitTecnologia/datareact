import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import jpg from '../../../../assets/images/databit/jpg.png';
import pdf from '../../../../assets/images/databit/pdf.png';
import doc from '../../../../assets/images/databit/doc.png';
import xls from '../../../../assets/images/databit/xls.png';
import mp3 from '../../../../assets/images/databit/mp3.png';
import avi from '../../../../assets/images/databit/avi.png';
import all from '../../../../assets/images/databit/all.png';
import ViewerDoc from '../../documento/viewer';
import { base64toBlob } from '../../../../utils/crypto';
import { apiGetFile } from '../../../../api/crudapi';

const Messages = ({ message, photo, name }) => {
  const [url, setUrl] = React.useState();
  const [ext, setExt] = React.useState();
  const [arq64, setArq64] = React.useState();
  const [showviewer, setShowviewer] = React.useState(false);
  const [itemselec, setItemselec] = React.useState([]);

  useEffect(() => {
    if (itemselec !== undefined) {
      apiGetFile('TB08026', 'TB08026_ID', 'TB08026_FILE', itemselec.idchat).then((response) => {
        setArq64(response.data[0].arq);
        const s64 = base64toBlob(response.data[0].arq, itemselec.ext);
        const url = URL.createObjectURL(s64);
        setUrl(url);
        setExt(itemselec.ext);
        if (itemselec.ext === 'ogg') {
          setExt('mp3');
        }
      });
    }
  }, [itemselec]);

  let image = '';
  if (message.type == 0) {
    image = (
      <Link to="#" className="media-left photo-table">
        <img className="media-object img-radius img-radius m-t-5" src={`${photo}`} alt={name} />
      </Link>
    );
  }

  let file = '';
  switch (message.typeext) {
    case 0: {
      file = pdf;
      break;
    }
    case 1: {
      file = jpg;
      break;
    }
    case 2: {
      file = mp3;
      break;
    }
    case 3: {
      file = xls;
      break;
    }
    case 4: {
      file = doc;
      break;
    }
    case 5: {
      file = avi;
      break;
    }
    case 6: {
      file = all;
      break;
    }
  }

  let msgClass = [];
  if (message.type === 0) {
    msgClass = [...msgClass, 'chat-menu-content'];
  } else {
    msgClass = [...msgClass, 'chat-menu-reply text-muted'];
  }

  const Download = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SelectFile = () => {
    setItemselec(message);
    setShowviewer(true);
  };

  const handleCloseviewer = () => {
    setShowviewer(false);
  };

  return (
    <React.Fragment>
      <Card
        className="d-flex align-items-start shadow-none mb-0 p-0 chat-messages"
        style={{ flexDirection: 'row', backgroundColor: 'unset', marginTop: '10px' }}
      >
        {image}
        <Card.Body className={msgClass.join(' ')} style={{ padding: 0 }}>
          <div className="">
            {message.tipoarq === -1 || message.tipoarq === undefined ? (
              <p className="chat-cont">{message.msg}</p>
            ) : (
              <p className="chat-cont">
                <img src={file} alt={'file'} onDoubleClick={(e) => SelectFile()} />
              </p>
            )}
          </div>
          <p className="chat-time">{message.time}</p>
        </Card.Body>
      </Card>
      <Modal backdrop="static" fullscreen={true} show={showviewer} centered={true} onHide={handleCloseviewer}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-see h1'} />
          &nbsp;Visualizar Documento
        </Modal.Header>
        <Modal.Body>
          <ViewerDoc url={url} ext={ext}></ViewerDoc>
        </Modal.Body>
        <Modal.Footer>
          <Button id="btnDownload" className="btn btn-success shadow-2 mb-2" onClick={(e) => Download(url, 'Download.' + itemselec.ext)}>
            <i className={'feather icon-download'} /> Download
          </Button>
          <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleCloseviewer}>
            <i className={'feather icon-x-circle'} /> Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

Messages.propTypes = {
  message: PropTypes.string,
  photo: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  msg: PropTypes.string,
  time: PropTypes.string
};

export default Messages;
