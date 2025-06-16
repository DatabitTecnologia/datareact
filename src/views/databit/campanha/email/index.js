import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { Row, Col } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Decode64 } from '../../../../utils/crypto';
import { apiInsert, apiSetFile, apiExec } from '../../../../api/crudapi';
import { apiSendEmail } from '../../../../api/apiemail';

const CampanhaEmail = (props) => {
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
        if (item.email !== undefined && item.email !== '' && item.email !== null) {
          setCarregando(true);
          let itememail = {};
          itememail['email'] = Decode64(sessionStorage.getItem('from'));
          itememail['dest'] = item.email;
          itememail['subject'] = valuesfield[0];
          itememail['body'] = valuesfield[1];
          itememail['tabela'] = table;
          itememail['mov'] = item.codigo;
          itememail['modulo'] = modulo;
          let codigo = '';
          let codigofile = '';

          apiInsert('Email', itememail).then((response) => {
            if (response.status === 200) {
              codigo = response.data.id;
              let itemfile = {};
              files.forEach((element, index) => {
                itemfile['email'] = codigo;
                itemfile['arquivo'] = element.file;
                itemfile['tipo'] = index + 1;
                itemfile['tamanho'] = element.size;
                itemfile['ext'] = element.ext;
                apiInsert('Attachment', itemfile).then((response) => {
                  if (response.status === 200) {
                    codigofile = response.data.id;
                    apiSetFile('TB00112', 'TB00112_CODIGO', 'TB00112_BYTES', codigofile, element.base64).then((response) => {
                      if (response.status === 200) {
                        if (response.data.status === 1) {
                          //console.log(element.file);
                        }
                      }
                    });
                  }
                });
              });
              apiSendEmail(Decode64(sessionStorage.getItem('enterprise')), item.email, valuesfield[0], valuesfield[1], files).then(
                (response) => {
                  console.log(response);
                  setCarregando(false);
                  if (response.status === 200) {
                    let resposta = response.data.mensagem;
                    if (response.data.status === 1) {
                      setItemselec(item.nome);
                      apiExec("UPDATE TB00111 SET TB00111_DTENV = GETDATE() WHERE TB00111_CODIGO = '" + codigo + "' ", 'N').then(
                        (response) => {
                          itemsend = CreateItem(1, index, 'Enviado para : ' + item.nome, resposta);
                          menufim = menufim.concat(itemsend);
                          setOptions(menufim);
                          tmpenviado += 1;
                          setEnviado(tmpenviado);
                        }
                      );
                    } else {
                      itemsend = CreateItem(2, index, 'Não enviado para : ' + item.nome, resposta);
                      menufim = menufim.concat(itemsend);
                      setOptions(menufim);
                      tmperro += 1;
                      setErro(tmperro);
                    }
                  } else {
                    itemsend = CreateItem(2, index, 'Não enviado para : ' + item.nome, response.data);
                    menufim = menufim.concat(itemsend);
                    setOptions(menufim);
                    tmperro += 1;
                    setErro(tmperro);
                  }
                }
              );
            }
          });
        } else {
          itemsend = CreateItem(2, index, 'Não enviado para : ' + item.nome, 'O Campo Email está em branco !');
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
      <div id="frmcampanhaemail" name="frmcampanhaemail"></div>
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
          <h5 className="mb-1 text-muted">Total : {total}</h5>
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

export default CampanhaEmail;
