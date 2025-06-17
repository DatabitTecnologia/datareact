import React, { useEffect, useState } from 'react';
import { Dropzone, FileMosaic } from '@files-ui/react';
import { LinearProgress } from '@mui/material';
import { Row, Col, Button, Alert, Modal, ModalBody } from 'react-bootstrap';
import { CreateObject } from '../../../components/CreateObject';
import { getBase64 } from '../../../utils/crypto';
import { apiSendEmail } from '../../../api/apiemail';
import { apiInsert, apiSetFile, apiExec, apiGetFile } from '../../../api/crudapi';
import { Decode64 } from '../../../utils/crypto';
import EmailHistorico from './historico';

const Email = (props) => {
  const { showemail, setShowemail, emails, setEmails, filesdefault, subjectdefault, bodydefault, sendauto } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [files, setFiles] = React.useState([]);
  const [extFiles, setExtFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);
  const [videoSrc, setVideoSrc] = React.useState(undefined);
  const [showhist, setShowhist] = useState(false);
  const [emailhist, setEmailhist] = React.useState();
  const [fileshist, setFileshist] = React.useState();
  const [subjecthist, setSubjecthist] = React.useState();
  const [bodyhist, setBodyhist] = React.useState([]);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB00111_DEST',
        funcao: 'Destinatário(s)',
        tipo: 'varchar',
        nome: 'dest',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 71,
        measure: '71rem',
        charnormal: true,
        lines: 3
      },
      {
        id: 1,
        campo: 'TB00111_SUBJECT',
        funcao: 'Assunto',
        tipo: 'varchar',
        nome: 'subject',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 71,
        measure: '71rem',
        charnormal: true
      },
      {
        id: 2,
        campo: 'TB00111_BODY',
        funcao: 'Corpo do E-mail',
        tipo: 'text',
        nome: 'body',
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        lines: 6
      }
    ]);
  }, []);

  useEffect(() => {
    if (emails !== undefined) {
      valuesfield[0] = emails;
    }
    if (subjectdefault !== undefined) {
      valuesfield[1] = subjectdefault;
    }
    if (bodydefault !== undefined) {
      valuesfield[2] = bodydefault;
    }
    setValuesfield([...valuesfield]);
    try {
      document.getElementById('TB00111_DEST').focus();
    } catch (error) {
      //console.log(error);
    }
  }, [fields]);

  useEffect(() => {
    console.log('atualizando emails');
    if (emailhist !== undefined) {
      valuesfield[0] = emailhist;
      setValuesfield([...valuesfield]);
    }
  }, [emailhist]);

  useEffect(() => {
    console.log('atualizando assuntos');
    if (subjecthist !== undefined) {
      valuesfield[1] = subjecthist;
      setValuesfield([...valuesfield]);
    }
  }, [subjecthist]);

  useEffect(() => {
    console.log('atualizando corpo');
    if (bodyhist !== undefined) {
      valuesfield[2] = bodyhist;
      setValuesfield([...valuesfield]);
    }
  }, [bodyhist]);

  useEffect(() => {
    console.log('atualizando arquivos');
    let files = [];
    let listarq = [];
    let item = {};
    let file = {};
    let list = {};
    let s64 = '';
    if (fileshist !== undefined && fileshist.length > 0) {
      fileshist.forEach((element, index) => {
        apiGetFile('TB00112', 'TB00112_CODIGO', 'TB00112_BYTES', element.codigo).then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            s64 = response.data[0].arq;
            item = {};
            file = {};
            list = {};
            file['name'] = element.arquivo;
            file['size'] = element.tamanho;
            file['type'] = element.ext;

            item['id'] = index;
            item['name'] = element.arquivo;
            item['size'] = element.tamanho;
            item['type'] = element.ext;
            item['file'] = file;

            list['base64'] = s64;
            list['file'] = element.arquivo;
            list['id'] = index;
            list['ext'] = element.ext;
            list['size'] = element.tamanho;

            listarq = listarq.concat(list);
            files = files.concat(item);
            setExtFiles(files);
            setFiles(listarq);
          }
        });
      });
    } else {
      setExtFiles([]);
    }
  }, [fileshist]);

  useEffect(() => {
    console.log('atualizando anexos');
    let files = [];
    let listarq = [];
    let item = {};
    let file = {};
    let list = {};
    if (filesdefault !== undefined && filesdefault.length > 0) {
      filesdefault.forEach((element, index) => {
        item = {};
        file = {};
        list = {};
        file['name'] = element.nome;
        file['size'] = element.tamanho;
        file['type'] = element.ext;

        item['id'] = index;
        item['name'] = element.nome;
        item['size'] = element.tamanho;
        item['type'] = element.ext;
        item['file'] = file;

        list['base64'] = element.base64;
        list['file'] = element.nome;
        list['id'] = index;
        list['ext'] = element.ext;
        list['size'] = element.tamanho;

        listarq = listarq.concat(list);
        files = files.concat(item);
      });
      setExtFiles(files);
      setFiles(listarq);
    } else {
      setExtFiles([]);
    }
    if (sendauto) {
      Enviar();
    }
  }, [filesdefault]);

  const updateFiles = (incommingFiles) => {
    let listarq = [];
    if (files !== undefined && files.length > 0) {
      listarq = files.slice(0, files.length);
    }
    incommingFiles.forEach((element) => {
      let arq = listarq.filter((x) => x.file === element.name);
      if (arq.length === 0) {
        setCarregando(true);
        let item = {};
        getBase64(element.file)
          .then((res) => {
            let pos = res.indexOf('base64') + 7;
            res = res.substring(pos);
            item['base64'] = res;
            item['file'] = element.name;
            item['id'] = element.id;
            item['ext'] = element.type;
            item['size'] = element.size;
            listarq = listarq.concat(item);
            setFiles(listarq);
            setCarregando(false);
            setExtFiles(incommingFiles);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const onDelete = (id) => {
    setExtFiles(extFiles.filter((x) => x.id !== id));
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const handleWatch = (videoSource) => {
    setVideoSrc(videoSource);
  };

  const handleStart = (filesToUpload) => {
    console.log('advanced demo start upload', filesToUpload);
  };
  const handleFinish = (uploadedFiles) => {
    console.log('advanced demo finish upload', uploadedFiles);
  };

  const handleAbort = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: 'aborted' };
        } else return { ...ef };
      })
    );
  };
  const handleCancel = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      })
    );
  };

  const Fechar = () => {
    setShowemail(false);
  };

  const Enviar = () => {
    setCarregando(true);
    let itememail = {};
    itememail['email'] = Decode64(sessionStorage.getItem('from'));
    itememail['dest'] = valuesfield[0];
    itememail['subject'] = valuesfield[1];
    itememail['body'] = valuesfield[2];
    itememail['tabela'] = props.tabela;
    itememail['mov'] = props.movimento;
    itememail['modulo'] = props.modulo;
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
        apiSendEmail(Decode64(sessionStorage.getItem('enterprise')), valuesfield[0], valuesfield[1], valuesfield[2], files).then(
          (response) => {
            setCarregando(false);
            if (response.status === 200) {
              let resposta = response.data.mensagem;
              let statusenv = response.data.status + 1;
              if (response.data.status === 1) {
                apiExec("UPDATE TB00111 SET TB00111_DTENV = GETDATE() WHERE TB00111_CODIGO = '" + codigo + "' ", 'N').then((response) => {
                  setItemvariant(statusenv);
                  setMensagem(resposta);
                  if (sendauto) {
                    setShowemail(false);
                  }
                });
              } else {
                setItemvariant();
                setMensagem(statusenv);
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          }
        );
      }
    });
  };

  const handleClosehist = () => {
    setShowhist(false);
  };

  return (
    <React.Fragment>
      <div id="frmemail" name="frmemail">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
          {fields.map((field, index) => (
            <CreateObject
              key={index}
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
        </Row>
        <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}>
          <Dropzone
            localization="PT-pt"
            onChange={updateFiles}
            minHeight="200px"
            value={extFiles}
            maxFileSize={10 * 1024 * 1024}
            label="Clique aqui para abrir o arquivo desejado"
            accept="image/*, application/pdf, video/*, audio/*, .docx, .xlsx"
            onUploadStart={handleStart}
            onUploadFinish={handleFinish}
            fakeUpload
            header={false}
          >
            {extFiles.map((file) => (
              <FileMosaic
                {...file}
                key={file.id}
                onDelete={onDelete}
                onSee={handleSee}
                onWatch={handleWatch}
                onAbort={handleAbort}
                onCancel={handleCancel}
                resultOnTooltip
                alwaysActive
              />
            ))}
          </Dropzone>
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col style={{ textAlign: 'rigth' }}>
            <Button id="btnEnviar" className="btn btn-success shadow-2 mb-2" onClick={Enviar}>
              <i className={'feather icon-mail'} /> Enviar
            </Button>
            <Button id="btnHist" className="btn btn-warning shadow-2 mb-2" onClick={() => setShowhist(true)}>
              <i className={'feather icon-list'} />
              Histórico
            </Button>
            <Modal backdrop="static" size="xl" show={showhist} centered={true} onHide={handleClosehist}>
              <Modal.Header className="h5" closeButton>
                <i className={'feather icon-mail h1'} />
                &nbsp;Histórico de Envio
              </Modal.Header>
              <ModalBody>
                <EmailHistorico
                  tabela={props.tabela}
                  codigomov={props.movimento}
                  showhist={showhist}
                  setShowhist={(data) => setShowhist(data)}
                  emailhist={emailhist}
                  setEmailhist={(data) => setEmailhist(data)}
                  fileshist={fileshist}
                  setFileshist={(data) => setFileshist(data)}
                  subjecthist={subjecthist}
                  setSubjecthist={(data) => setSubjecthist(data)}
                  bodyhist={bodyhist}
                  setBodyhist={(data) => setBodyhist(data)}
                ></EmailHistorico>
              </ModalBody>
            </Modal>
            <Button id="btnSair" className="btn btn-primary shadow-2 mb-2" onClick={Fechar}>
              <i className={'feather icon-x'} />
              Fechar
            </Button>
          </Col>
        </Row>
        <Row>
          <Alert
            show={mensagem !== '' && mensagem !== undefined}
            dismissible
            variant={alertVariants[itemvariant]}
            onClick={() => setMensagem(undefined)}
          >
            {mensagem}
          </Alert>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Email;
