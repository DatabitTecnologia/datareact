import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { Row, Col } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { sendMessage, sendDocument, sendAudio, sendVideo, sendImage } from '../../../../api/datawhats';
import { repararBase64 } from '../../../../utils/crypto';

const CampanhaWhatsapp = (props) => {
  const { valuesfield, files, extfiles, selecao, rows, table, modulo } = props;
  const [scrollEl, setScrollEl] = React.useState();
  const [options, setOptions] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [itemselec, setItemselec] = React.useState('');
  const [total, setTotal] = React.useState(0);
  const [enviado, setEnviado] = React.useState(0);
  const [erro, setErro] = React.useState(0);
  useEffect(() => {
    if (selecao !== undefined && selecao.length > 0) {
      let menufim = [];
      setTotal(selecao.length);
      let tmpenviado = 0;
      let tmperro = 0;
      selecao.forEach((item, index) => {
        let itemsend = undefined;
        if (item.whatsapp !== undefined && item.whatsapp !== '' && item.whatsapp !== null) {
          sendMessage(item.whatsapp, valuesfield[2]).then((response) => {
            if (response.status === 200) {
              files.forEach((element, index2) => {
                let base64fim = repararBase64(element.base64);
                let filefim = element.file;
                filefim = filefim.substring(0, filefim.indexOf('.'));
                console.log('Arquivo Formato: ' + element.ext);
                if (element.ext === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                  sendDocument(item.whatsapp, base64fim, filefim, 'docx');
                } else if (element.ext === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                  sendDocument(item.whatsapp, base64fim, filefim, 'xlsx');
                } else if (element.ext === 'application/pdf') {
                  sendDocument(item.whatsapp, base64fim, filefim, 'pdf');
                } else if (
                  element.ext === 'image/png' ||
                  element.ext === 'image/jpg' ||
                  element.ext === 'image/jpeg' ||
                  element.ext === 'image/bmp'
                ) {
                  sendImage(item.whatsapp, base64fim, filefim);
                } else if (element.ext === 'video/mp4') {
                  sendVideo(item.whatsapp, base64fim, filefim);
                } else if (element.ext === 'audio/mp3' || element.ext === 'audio/mpeg') {
                  sendAudio(item.whatsapp, base64fim, filefim);
                }
              });
              itemsend = CreateItem(1, index, 'Enviado para : ' + item.nome, 'Mensagem enviada com Sucesso');
              menufim = menufim.concat(itemsend);
              setOptions(menufim);
            }
          });
        } else {
          itemsend = CreateItem(2, index, 'Não enviado para : ' + item.nome, 'O Campo WhatsAPP está em branco !');
          menufim = menufim.concat(itemsend);
          setOptions(menufim);
          tmperro += 1;
          setErro(tmperro);
        }
      });
    }
  }, []);

  const CreateItem = (status, index, text, message = '') => {
    let icon = '';
    switch (status) {
      case 0: {
        icon = 'feather icon-loader h2';
        break;
      }
      case 1: {
        icon = 'feather icon-check h2';
        break;
      }
      case 2: {
        icon = 'feather icon-x h2';
        break;
      }
    }
    let item = (
      <TreeItem
        key={index}
        itemId={index}
        label={
          <Box id={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <i className={icon} /> &nbsp; {text}
          </Box>
        }
      >
        <TreeItem key={index + 100} itemId={text} label={<Box sx={{ display: 'flex', alignItems: 'center' }}>{message}</Box>}></TreeItem>
      </TreeItem>
    );
    return item;
  };

  return (
    <React.Fragment>
      <div id="frmcampanhawhatsapp" name="frmcampanhawhatsapp"></div>
      <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
      <h5 className="mb-1 text-muted">Enviando para : {itemselec}</h5>
      <Row style={{ height: '530px', marginLeft: '5px', marginRight: '5px', marginBottom: '10px' }}>
        <PerfectScrollbar
          containerRef={(ref) => {
            setScrollEl(ref);
          }}
          style={{
            backgroundColor: 'rgb(230, 245, 255)',
            color: '#000'
          }}
        >
          <SimpleTreeView style={{ marginLeft: '2px' }}>
            {options.map((option) => {
              return option;
            })}
          </SimpleTreeView>
        </PerfectScrollbar>
      </Row>
      <Row className="border-total" style={{ marginLeft: '0.5px', marginRight: '0.5px', marginBottom: '10px', padding: '5px 5px 5px 5px' }}>
        <Col>
          <hh5 className="mb-1 text-muted">Total : {total}</hh5>
        </Col>
        <Col>
          <h5 className="mb-1 text-muted">Enviados : {enviado}</h5>
        </Col>
        <Col>
          <h5 className="mb-1 text-muted">Com Erro : {erro}</h5>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CampanhaWhatsapp;
