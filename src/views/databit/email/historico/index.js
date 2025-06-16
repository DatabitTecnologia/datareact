import React, { useEffect } from 'react';
import { Row, Col, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiList, apiGetFile } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';
import { Decode64 } from '../../../../utils/crypto';
import ViewerDoc from '../../documento/viewer';
import { base64toBlob } from '../../../../utils/crypto';

const EmailHistorico = (props) => {
  const [carregando, setCarregando] = React.useState(false);
  const [itemselec, setItemselec] = React.useState([]);
  const [itemselecfile, setItemselecfile] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [rowsfile, setRowsfile] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [columnsfile, setColumnsfile] = React.useState([]);
  const { showhist, setShowhist } = props;
  const { codigomov, tabela } = props;
  const [showviewer, setShowviewer] = React.useState(false);
  const [shownanexo, setShowanexo] = React.useState(false);
  const [url, setUrl] = React.useState();
  const [ext, setExt] = React.useState();
  const [arq64, setArq64] = React.useState();
  const { emailhist, setEmailhist } = props;
  const { fileshist, setFileshist } = props;
  const { subjecthist, setSubjecthist } = props;
  const { bodyhist, setBodyhist } = props;

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
        widthfield: 69,
        measure: '69rem',
        charnormal: true,
        lines: 3,
        readonly: true
      },
      {
        id: 1,
        campo: 'TB00111_SUBJECT',
        funcao: 'Assunto',
        tipo: 'varchar',
        nome: 'subject',
        tamanho: 8000,
        tipoobject: 1,
        widthfield: 69,
        measure: '69rem',
        charnormal: true,
        readonly: true
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
        lines: 6,
        readonly: true
      }
    ]);
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 80 },
      { headerClassName: 'header-list', field: 'dtcad', headerName: 'Data', width: 170, type: 'dateTime' },
      { headerClassName: 'header-list', field: 'opcad', headerName: 'Usuário', width: 175 },
      { headerClassName: 'header-list', field: 'dest', headerName: 'Destinatário', width: 230 },
      { headerClassName: 'header-list', field: 'subject', headerName: 'Assunto', width: 260 },
      { headerClassName: 'header-list', field: 'dtenv', headerName: 'Enviado em', width: 170 }
    ]);

    setColumnsfile([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'ID', width: 70 },
      { headerClassName: 'header-list', field: 'arquivo', headerName: 'Arquivo', width: 425 },
      { headerClassName: 'header-list', field: 'ext', headerName: 'Tipo', width: 120 },
      { headerClassName: 'header-list', field: 'tamanhoKB', headerName: 'Tamanho', width: 120 }
    ]);
    setCarregando(true);
  }, []);

  useEffect(() => {
    let filter = " TB00111_TABELA = '" + tabela + "' and TB00111_MOV  = '" + codigomov + "' ";
    if (Decode64(sessionStorage.getItem('admin')) === 'N') {
      if (Decode64(sessionStorage.getItem('master')) === 'N') {
        if (Decode64(sessionStorage.getItem('manager')) === 'N') {
          filter = filter + " and TB00111_OPCAD = '" + Decode64(sessionStorage.getItem('user')) + "' ";
        }
      }
    }
    filter = filter + ' order by TB00111_DTENV desc ';
    apiList('Email', '*', '', filter).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setRows(response.data);
      }
    });
  }, [columnsfile]);

  useEffect(() => {
    if (rows.length > 0) {
      setItemselec(rows[0]);
    }
  }, [rows]);

  useEffect(() => {
    if (itemselec !== undefined && itemselec !== null) {
      if (itemselec.body !== '' && itemselec.body !== undefined && itemselec.body !== null) {
        valuesfield[0] = itemselec.dest;
        valuesfield[1] = itemselec.subject;
        valuesfield[2] = itemselec.body;
        setEmailhist(itemselec.dest);
        setSubjecthist(itemselec.subject);
        setBodyhist(itemselec.body);
        setValuesfield([...valuesfield]);
        apiList(
          'Attachment',
          '*',
          "CAST(CAST(TB00112_TAMANHO / 1024 AS numeric(11,2)) AS VARCHAR(10)) + 'Kb' AS tamanhoKB, lower(substring(tb00112_arquivo,CHARINDEX('.',tb00112_arquivo)+1, 50)) as typeext",
          "TB00112_EMAIL= '" + itemselec.codigo + "' "
        ).then((response) => {
          if (response.status === 200) {
            setRowsfile(response.data);
            setFileshist(response.data);
          }
        });
      } else {
        valuesfield[0] = '';
        valuesfield[1] = '';
        valuesfield[2] = '';
        setValuesfield([...valuesfield]);
      }
    }
  }, [itemselec]);

  useEffect(() => {
    if (itemselecfile !== undefined) {
      apiGetFile('TB00112', 'TB00112_CODIGO', 'TB00112_BYTES', itemselecfile.codigo).then((response) => {
        setArq64(response.data[0].arq);
        const s64 = base64toBlob(response.data[0].arq, itemselecfile.ext);
        const url = URL.createObjectURL(s64);
        setUrl(url);
        setExt(itemselecfile.typeext);
      });
    }
  }, [itemselecfile]);

  useEffect(() => {
    if (rows.length > 0) {
      setItemselecfile(rowsfile[0]);
    }
  }, [rowsfile]);

  const Reenviar = () => {
    setShowhist(false);
  };

  const handleCloseanexo = () => {
    setShowanexo(false);
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
      Reenviar();
    }
  };

  const dblClickGrid = (newSelection) => {
    setItemselec(newSelection);
    Reenviar();
  };

  const clickGridfile = (newSelection) => {
    setItemselecfile(newSelection);
  };

  const keyGridfile = (newSelection, event) => {
    setItemselecfile(newSelection);
    if (event.key === 'Enter') {
      setShowviewer(true);
    }
  };

  const dblClickGridfile = (newSelection) => {
    setItemselecfile(newSelection);
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
      <div id="frmhistorico" name="frmhistorico">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <div>
          <AGGrid
            width="100%"
            height="298px"
            rows={rows}
            columns={columns}
            loading={carregando}
            item={itemselec}
            setItem={(data) => setItemselec(data)}
            onKeyDown={keyGrid}
            onDoubleClick={dblClickGrid}
            onCelClick={clickGrid}
          ></AGGrid>
        </div>
        <div>
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
        </div>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button id="btnAnexos" className="btn btn-success shadow-2 mb-2" onClick={() => setShowanexo(true)}>
              <i className={'feather icon-box'} /> Anexos
            </Button>
            <Button id="btnReenviar" className="btn btn-primary shadow-2 mb-2" onClick={Reenviar}>
              <i className={'feather icon-mail'} /> Reenviar
            </Button>
            <Modal size="lg" show={shownanexo} centered={true} onHide={handleCloseanexo}>
              <Modal.Header className="h5" closeButton>
                <i className={'feather icon-box h1'} />
                &nbsp;Anexos Enviados
              </Modal.Header>
              <ModalBody>
                <AGGrid
                  width="100%"
                  height="298px"
                  rows={rowsfile}
                  columns={columnsfile}
                  loading={carregando}
                  item={itemselecfile}
                  setItem={(data) => setItemselecfile(data)}
                  onKeyDown={keyGridfile}
                  onDoubleClick={dblClickGridfile}
                  onCelClick={clickGridfile}
                ></AGGrid>
              </ModalBody>
              <ModalFooter>
                {rowsfile !== undefined && rowsfile.length > 0 ? (
                  <Button id="btnVisualizar" className="btn btn-success shadow-2 mb-2" onClick={Visualizar}>
                    <i className={'feather icon-eye'} /> Visualizar
                  </Button>
                ) : (
                  <></>
                )}
                {rowsfile !== undefined && rowsfile.length > 0 ? (
                  <Button id="btnDownload" className="btn btn-warning shadow-2 mb-2" onClick={() => Download(url, itemselecfile.arquivo)}>
                    <i className={'feather icon-download'} /> Download
                  </Button>
                ) : (
                  <></>
                )}
                <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleCloseanexo}>
                  <i className={'feather icon-x-circle'} /> Fechar
                </Button>
              </ModalFooter>
            </Modal>
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
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default EmailHistorico;
