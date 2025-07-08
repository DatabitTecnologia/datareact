import React, { useEffect, useState } from 'react';
import { Dropzone, FileMosaic } from '@files-ui/react';
import { LinearProgress } from '@mui/material';
import { Row, Col, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';
import AGGrid from '../../../components/AGGrid';
import { CreateObject } from '../../../components/CreateObject';
import { getBase64 } from '../../../utils/crypto';
import { apiList } from '../../../api/crudapi';
import CampanhaEmail from './email';
import CampanhaWhatsapp from './whatsapp';
import CampanhaUpdateEmail from './updateemail';
import CampanhaUpdateWhats from './updatewhats';

const Campanha = (props) => {
  const { showcampanha, setShowcampanha, filters, fieldemail, fieldwhats, modulo, tabcampanha, classcampanha } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fieldsemail, setFieldsemail] = React.useState([]);
  const [fieldszap, setFieldszap] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [extfiles, setExtFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);
  const [videoSrc, setVideoSrc] = React.useState(undefined);
  const [steps, setSteps] = React.useState(['Envio por Email', 'Envio por WhatsAPP']);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [selecao, setSelecao] = React.useState([]);
  const [showemail, setShowemail] = React.useState(false);
  const [showwhats, setShowwhats] = React.useState(false);
  const [campo, setCampo] = React.useState('email');
  const [validations, setValidations] = React.useState([]);
  const [itemselec, setItemselec] = React.useState([]);
  const [showupdemail, setShowupdemail] = React.useState(false);
  const [showupdwhats, setShowupdwhats] = React.useState(false);

  useEffect(() => {
    setFieldsemail([
      {
        id: 0,
        campo: 'TB00111_SUBJECT',
        funcao: 'Assunto',
        tipo: 'varchar',
        nome: 'subject',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 41,
        measure: '41rem',
        charnormal: true
      },
      {
        id: 1,
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
    setFieldszap([
      {
        id: 2,
        campo: 'TB00111_ZAP',
        funcao: 'Mensagem via WhatsAPP',
        tipo: 'text',
        nome: 'zap',
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        lines: 10
      }
    ]);

    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 110 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Nome', width: 360 }
    ]);

    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['email', 'email', 'email'];
    setCampo('email');
    validation['sinal'] = [1, 1, 1];
    validation['tipotab'] = 'G';
    validation['valorval'] = [undefined, null, ''];
    validation['cor'] = ['#66ffff', '#66ffff', '#66ffff'];
    validation['total'] = 2;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);

    setCarregando(true);
    apiList(
      props.classobject,
      props.table + '_CODIGO,' + props.table + '_NOME',
      fieldemail + ' as email,' + fieldwhats + ' as whatsapp ',
      filters
    ).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setCarregando(false);
        setRows(response.data);
      }
    });
  }, []);

  useEffect(() => {console.log(selecao)},[selecao]);

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
    setExtFiles(extfiles.filter((x) => x.id !== id));
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
      extfiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: 'aborted' };
        } else return { ...ef };
      })
    );
  };
  const handleCancel = (id) => {
    setExtFiles(
      extfiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      })
    );
  };

  const camposemail = (
    <div>
      <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
        {fieldsemail.map((field, index) => (
          <CreateObject
            key={index}
            field={field}
            index={field.id}
            fields={setFieldsemail}
            valuesfield={valuesfield}
            setValuesfield={(data) => setValuesfield(data)}
            valuesfield2={valuesfield2}
            setValuesfield2={(data) => setValuesfield2(data)}
            disabled={false}
          ></CreateObject>
        ))}
      </Row>
    </div>
  );

  const camposwhatsapp = (
    <div>
      <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
        {fieldszap.map((field, index) => (
          <CreateObject
            key={index}
            field={field}
            index={field.id}
            fields={fieldszap}
            valuesfield={valuesfield}
            setValuesfield={(data) => setValuesfield(data)}
            valuesfield2={valuesfield2}
            setValuesfield2={(data) => setValuesfield2(data)}
            disabled={false}
          ></CreateObject>
        ))}
      </Row>
    </div>
  );

  const Fechar = () => {
    setShowcampanha(false);
  };

  const handleStep = (step) => () => {
    let tmpvalidations = [];
    let validation = {};
    setActiveStep(step);
    if (step === 0) {
      validation['campo'] = ['email', 'email', 'email'];
      setCampo('email');
    } else {
      validation['campo'] = ['whatsapp', 'whatsapp', 'whatsapp'];
      setCampo('whatsapp');
    }
    validation['sinal'] = [1, 1, 1];
    validation['tipotab'] = 'G';
    validation['valorval'] = [undefined, null, ''];
    validation['cor'] = ['#66ffff', '#66ffff', '#66ffff'];
    validation['total'] = 2;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);
  };

  const handleCLoseemail = () => {
    setShowemail(false);
  };

  const handleClosewhats = () => {
    setShowwhats(false);
  };

  const handleCLoseupdemail = () => {
    setShowupdemail(false);
  };

  const handleCloseupdwhats = () => {
    setShowupdwhats(false);
  };

  const Enviar = () => {
    if (activeStep === 0) {
      setShowemail(true);
    } else {
      setShowwhats(true);
    }
  };

  const Editar = () => {
    if (activeStep === 0) {
      setShowupdemail(true);
    } else {
      setShowupdwhats(true);
    }
  };

  return (
    <React.Fragment>
      <div id="frmcampanha" name="frmcampanha">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row>
          <Col lg={6}>
            <Row>
              <AGGrid
                width="100%"
                height="510px"
                rows={rows}
                columns={columns}
                multselec={true}
                onMultselec={setSelecao}
                validations={validations}
                item={itemselec}
                setItem={(data) => setItemselec(data)}
              ></AGGrid>
            </Row>
          </Col>
          <Col lg={6}>
            <div>
              <Box sx={{ width: '100%', marginTop: '3px', marginBottom: '13px' }}>
                <Stepper nonLinear activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                      <StepButton color="inherit" onClick={handleStep(index)}>
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              {activeStep === 0 ? camposemail : <></>}
              {activeStep === 1 ? camposwhatsapp : <></>}
            </div>
            <Row style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}>
              <Dropzone
                localization="PT-pt"
                onChange={updateFiles}
                minHeight="200px"
                value={extfiles}
                maxFileSize={10 * 1024 * 1024}
                label="Clique aqui para abrir o arquivo desejado"
                accept="image/*, application/pdf, video/*, audio/*, .docx, .xlsx"
                onUploadStart={handleStart}
                onUploadFinish={handleFinish}
                fakeUpload
                header={false}
              >
                {extfiles.map((file) => (
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
          </Col>
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col style={{ textAlign: 'rigth' }}>
            {itemselec !== undefined ? (
              <Button id="btnEditar" className="btn btn-primary shadow-2 mb-2" onClick={() => Editar()}>
                <i className={'feather icon-edit'} /> Editar
              </Button>
            ) : (
              <></>
            )}
            <Button id="btnEnviar" className="btn btn-primary shadow-2 mb-2" onClick={() => Enviar()}>
              <i className={'feather icon-check'} /> Enviar
            </Button>
            <Button id="btnSair" className="btn btn-primary shadow-2 mb-2" onClick={() => Fechar()}>
              <i className={'feather icon-x'} />
              Fechar
            </Button>
          </Col>
        </Row>
        <Modal backdrop="static" size="xl" show={showemail} centered={true} onHide={handleCLoseemail}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-mail h1'} />
            &nbsp;Envio por Email
          </Modal.Header>
          <ModalBody>
            <CampanhaEmail
              table={props.table}
              modulo={modulo}
              valuesfield={valuesfield}
              files={files}
              extfiles={extfiles}
              selecao={selecao}
              rows={rows}
            ></CampanhaEmail>
          </ModalBody>
          <ModalFooter>
            <Button id="btnSair" className="btn btn-primary shadow-2 mb-2" onClick={() => setShowemail(false)}>
              <i className={'feather icon-x'} />
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
        <Modal backdrop="static" size="xl" show={showwhats} centered={true} onHide={handleClosewhats}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-zap h1'} />
            &nbsp;Envio por WhatsAPP
          </Modal.Header>
          <ModalBody>
            <CampanhaWhatsapp
              table={props.table}
              modulo={modulo}
              valuesfield={valuesfield}
              files={files}
              extfiles={extfiles}
              selecao={selecao}
              rows={rows}
            ></CampanhaWhatsapp>
          </ModalBody>
          <ModalFooter>
            <Button id="btnSair" className="btn btn-primary shadow-2 mb-2" onClick={() => setShowwhats(false)}>
              <i className={'feather icon-x'} />
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
        <Modal backdrop="static" size="lg" show={showupdemail} centered={true} onHide={handleCLoseupdemail}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-mail h1'} />
            &nbsp;Alteração de Email
          </Modal.Header>
          <ModalBody>
            <CampanhaUpdateEmail
              itemselec={itemselec}
              setItemselec={(data) => setItemselec(data)}
              tabcampanha={tabcampanha}
              classcampanha={classcampanha}
              fieldemail={fieldemail}
              showupdemail={showupdemail}
              table={props.table}
              setShowupdemail={(data) => setShowupdemail(data)}
            ></CampanhaUpdateEmail>
          </ModalBody>
        </Modal>
        <Modal backdrop="static" size="sm" show={showupdwhats} centered={true} onHide={handleCloseupdwhats}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-zap h1'} />
            &nbsp;WhatsAPP
          </Modal.Header>
          <ModalBody>
            <CampanhaUpdateWhats
              itemselec={itemselec}
              setItemselec={(data) => setItemselec(data)}
              tabcampanha={tabcampanha}
              classcampanha={classcampanha}
              fieldwhats={fieldwhats}
              showupdwhats={showupdwhats}
              table={props.table}
              setShowupdwhats={(data) => setShowupdwhats(data)}
            ></CampanhaUpdateWhats>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Campanha;
