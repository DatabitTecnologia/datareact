import React, { useEffect } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import AGGrid from '../../../components/AGGrid';
import { apiInsert, apiFind, apiDelete, apiSetFile, apiList, apiGetFile } from '../../../api/crudapi';
import { Dropzone, FileMosaic } from '@files-ui/react';
import { getBase64 } from '../../../utils/crypto';
import ViewerDoc from './viewer';
import { base64toBlob } from '../../../utils/crypto';

const Documento = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const { showdoc, setShowdoc } = props;
  const [extFiles, setExtFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);
  const [videoSrc, setVideoSrc] = React.useState(undefined);
  const [itemselec, setItemselec] = React.useState([]);
  const [showviewer, setShowviewer] = React.useState(false);
  const [url, setUrl] = React.useState();
  const [ext, setExt] = React.useState();
  const [arq64, setArq64] = React.useState();

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'ID', width: 70 },
      { headerClassName: 'header-list', field: 'dtcad', headerName: 'Data', width: 170, type: 'dateTime' },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Arquivo', width: 255 },
      { headerClassName: 'header-list', field: 'ext', headerName: 'Tipo', width: 120 },
      { headerClassName: 'header-list', field: 'tamanhoKB', headerName: 'Tamanho', width: 120 }
    ]);
    Filtrar();
  }, []);

  const Filtrar = () => {
    setCarregando(true);
    apiList(
      'Documento',
      '*',
      "CAST(CAST(TB00110_TAMANHO / 1024 AS numeric(11,2)) AS VARCHAR(10)) + 'Kb' AS tamanhoKB, lower(REVERSE(SUBSTRING(REVERSE(CAST(TB00110_NOME AS VARCHAR(8000))),1,CHARINDEX('.',REVERSE(CAST(TB00110_NOME AS VARCHAR(8000))))-1))) as typeext",
      "TB00110_MOV = '" + props.movimento + "' and TB00110_TABELA  = '" + props.tabela + "' ORDER BY TB00110_DTCAD "
    ).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setRows(response.data);
      }
    });
  };

  useEffect(() => {
    let files = [];
    let item = {};
    let file = {};
    if (rows !== undefined && rows.length > 0) {
      setItemselec(rows[0]);
      rows.forEach((element, index) => {
        item = {};
        file = {};
        file['name'] = element.nome;
        file['size'] = element.tamanho;
        file['type'] = element.ext;

        item['id'] = index;
        item['name'] = element.nome;
        item['size'] = element.tamanho;
        item['type'] = element.ext;
        item['file'] = file;

        files = files.concat(item);
      });
      setExtFiles(files);
    } else {
      setExtFiles([]);
    }
  }, [rows]);

  useEffect(() => {
    if (itemselec !== undefined) {
      apiGetFile('TB00110', 'TB00110_CODIGO', 'TB00110_BYTES', itemselec.codigo).then((response) => {
        setArq64(response.data[0].arq);
        const s64 = base64toBlob(response.data[0].arq, itemselec.ext);
        const url = URL.createObjectURL(s64);
        setUrl(url);
        setExt(itemselec.typeext);
      });
    }
  }, [itemselec]);

  const Fechar = () => {
    setShowdoc(false);
  };

  const updateFiles = (incommingFiles) => {
    let listarq = [];
    if (rows !== undefined && rows.length > 0) {
      listarq = rows.slice(0, rows.length);
    }
    incommingFiles.forEach((element) => {
      let arq = listarq.filter((x) => x.nome === element.name);
      if (arq.length === 0) {
        setCarregando(true);
        let item = {};
        item['tabela'] = props.tabela;
        item['mov'] = props.movimento;
        item['nome'] = element.name;
        item['tipo'] = element.id;
        item['ext'] = element.type;
        item['tamanho'] = element.size;
        apiInsert('Documento', item).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              let codigo = response.data.id;
              getBase64(element.file)
                .then((res) => {
                  let pos = res.indexOf('base64') + 7;
                  res = res.substring(pos);
                  apiSetFile('TB00110', 'TB00110_CODIGO', 'TB00110_BYTES', codigo, res).then((response) => {
                    if (response.status === 200) {
                      if (response.data.status === 1) {
                        Filtrar();
                        setCarregando(false);
                      }
                    }
                  });
                })
                .catch((err) => console.log(err));
            }
          }
        });
      }
    });
  };
  const onDelete = (id) => {
    let fileselec = extFiles.filter((x) => x.id === id);
    setCarregando(true);
    apiFind(
      'Documento',
      '*',
      '',
      "TB00110_MOV = '" +
        props.movimento +
        "' and TB00110_TABELA  = '" +
        props.tabela +
        "' AND TB00110_NOME = '" +
        fileselec[0]['name'] +
        "' "
    ).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        let item = response.data;
        apiDelete('Documento', item).then((response) => {
          if (response.status === 200) {
            Filtrar();
            setCarregando(false);
          }
        });
      }
    });
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

  const handleCloseviewer = () => {
    setShowviewer(false);
  };

  const Visualizar = () => {
    setShowviewer(true);
  };

  const clickGrid = (newSelection) => {
    setItemselec(newSelection);
  };

  const keyGrid = (newSelection, event) => {
    setItemselec(newSelection);
    if (event.key === 'Enter') {
      setShowviewer(true);
    }
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    setShowviewer(true);
  };

  const Download = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <React.Fragment>
      <div id="frmdocumento" name="frmdocumento">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <div>
          <AGGrid
            width="100%"
            height="340px"
            rows={rows}
            columns={columns}
            loading={carregando}
            item={itemselec}
            setItem={(data) => setItemselec(data)}
            onKeyDown={keyGrid}
            onDoubleClick={dblClickGrid}
            onCelClick={clickGrid}
          ></AGGrid>
          <Row
            className="border-total"
            style={{ marginLeft: '0.5px', marginRight: '0.5px', marginBottom: '10px', padding: '5px 5px 5px 5px', textAlign: 'left' }}
          >
            <Col>
              <h5 className="mb-1 text-muted">Arquivo selecionado : {itemselec.nome}</h5>
            </Col>
          </Row>
          <Row
            className="border-total"
            style={{ marginLeft: '0.5px', marginRight: '0.5px', marginBottom: '10px', padding: '5px 5px 5px 5px', textAlign: 'center' }}
          >
            <Col>
              <h5 className="mb-1 text-muted">Para visualizar basta clicar duas vezes na listagem</h5>
            </Col>
          </Row>
        </div>
        <div>
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
        </div>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button id="btnOK" className="btn btn-primary shadow-2 mb-2" onClick={Fechar}>
              <i className={'feather icon-x-circle'} /> Fechar
            </Button>
            {rows !== undefined && rows.length > 0 ? (
              <Button id="btnVisualizar" className="btn btn-success shadow-2 mb-2" onClick={Visualizar}>
                <i className={'feather icon-eye'} /> Visualizar
              </Button>
            ) : (
              <></>
            )}
            {rows !== undefined && rows.length > 0 ? (
              <Button id="btnDownload" className="btn btn-warning shadow-2 mb-2" onClick={() => Download(url, itemselec.nome)}>
                <i className={'feather icon-download'} /> Download
              </Button>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Modal fullscreen={true} show={showviewer} centered={true} onHide={handleCloseviewer}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-see h1'} />
            &nbsp;Visualizar Documento
          </Modal.Header>
          <Modal.Body>
            <ViewerDoc url={url} ext={ext}></ViewerDoc>
          </Modal.Body>
          <Modal.Footer>
            <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleCloseviewer}>
              <i className={'feather icon-x-circle'} /> Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Documento;
