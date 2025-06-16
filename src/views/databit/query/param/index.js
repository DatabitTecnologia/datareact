import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Modal, ModalBody, ModalFooter, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiList, apiUpdate, apiDelete } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';
import ParamSelect from './paramselect';
import { Confirmation } from '../../../../components/Confirmation';

const QueryParam = (props) => {
  const { queryselect, namequery } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [filtered, setFiltered] = React.useState(false);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [itemselec, setItemselec] = React.useState();
  const [showfield, setShowfield] = useState(false);
  const handleClosefield = () => setShowfield(false);
  const [validations, setValidations] = React.useState([]);
  const [updatefield, setUpdatefield] = useState(false);
  const [titlemodal, setTitlemodal] = React.useState('Editar Campo');
  const [ordem, setOrdem] = React.useState(0);
  const [anterior, setAnterior] = React.useState();
  const [atual, setAtual] = React.useState();

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'ordem', headerName: 'Ordem', width: 80, type: 'number' },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Nome do Parâmetro', width: 300 },
      { headerClassName: 'header-list', field: 'funcao', headerName: 'Título Parâmetro', width: 350 },
      { headerClassName: 'header-list', field: 'nometipo', headerName: 'Tipo Objeto', width: 140 },
      { headerClassName: 'header-list', field: 'tamanho', headerName: 'Tamanho', width: 80, type: 'number' },
      { headerClassName: 'header-list', field: 'largura', headerName: 'Largura (rem)', width: 140, type: 'number' }
    ]);

    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['visivel'];
    validation['sinal'] = [1];
    validation['tipotab'] = 'G';
    validation['valorval'] = [0];
    validation['cor'] = ['#00ffcc'];
    validation['total'] = 1;
    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);
  }, []);

  const Filtrar = () => {
    setCarregando(true);
    apiList(
      'QueryParam',
      'TB00114_QUERY,TB00114_IDFILTRO,TB00114_NOME,TB00114_FUNCAO,' +
        'TB00114_TIPOOBJECT,TB00114_TAMANHO,TB00114_TABELAREF,TB00114_DECIMAL,TB00114_TIPOMASCARA,' +
        'TB00114_VALUECHECKED,TB00114_VALUEUNCHECKED,TB00114_ITENS,TB00114_VALUES,TB00114_LARGURA,' +
        'TB00114_MASCARA,TB00114_TIPOMULT,TB00114_CAMPOLIST,TB00114_CAMPOREFDROP,TB00114_FILTERAUX,' +
        'TB00114_ORDEM,TB00114_DEFAULT,TB00114_VISIVEL',
      ' case TB00114_TIPOOBJECT ' +
        "      when 1 then 'Texto Simples' " +
        "      when 2 then 'Pesquisa' " +
        "      when 4 then 'Numérico' " +
        "      when 5 then 'Data' " +
        "      when 6 then 'Mult-Texto' " +
        "      when 8 then 'Texto Especial' " +
        "      when 9 then 'CheckBox' " +
        "      when 10 then 'Radio' " +
        "      when 11 then 'DropDown' " +
        "      when 12 then 'DropDown' " +
        "      when 13 then 'Password' " +
        ' end as nometipo ',
      "TB00114_QUERY = '" + queryselect + "' order by TB00114_ORDEM "
    ).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
        response.data.forEach((item, i) => {
          item.ordem = i + 1;
          setOrdem(i + 1);
          apiUpdate('QueryParam', item).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
            }
          });
        });
      }
    });
  };

  useEffect(() => {
    if (!showfield) {
      Filtrar();
    }
  }, [showfield]);

  useEffect(() => {
    setCarregando(true);
    apiUpdate('QueryParam', atual).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
      }
    });
  }, [atual]);

  useEffect(() => {
    setCarregando(true);
    apiUpdate('QueryParam', anterior).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
      }
    });
  }, [anterior]);

  const Upp = () => {
    if (itemselec !== undefined) {
      if (itemselec['ordem'] !== 1) {
        let rowsbkp2 = rows.slice(0, rows.length);
        let itematual = rows.findIndex((a) => a.ordem === itemselec.ordem);
        let itemant = rows.findIndex((a) => a.ordem === itemselec.ordem - 1);
        rowsbkp2[itematual]['ordem'] = rowsbkp2[itematual]['ordem'] - 1;
        rowsbkp2[itemant]['ordem'] = rowsbkp2[itemant]['ordem'] + 1;
        setAtual(rowsbkp2[itematual]);
        setAnterior(rowsbkp2[itemant]);
        setRows(rowsbkp2);
      }
    }
  };

  const Down = () => {
    if (itemselec !== undefined) {
      if (itemselec['ordem'] !== ordem) {
        let rowsbkp2 = rows.slice(0, rows.length);
        let itematual = rows.findIndex((a) => a.ordem === itemselec.ordem);
        let itemant = rows.findIndex((a) => a.ordem === itemselec.ordem + 1);
        rowsbkp2[itematual]['ordem'] = rowsbkp2[itematual]['ordem'] + 1;
        rowsbkp2[itemant]['ordem'] = rowsbkp2[itemant]['ordem'] - 1;
        setAtual(rowsbkp2[itematual]);
        setAnterior(rowsbkp2[itemant]);
        setRows(rowsbkp2);
      }
    }
  };

  const Editar = () => {
    if (itemselec !== undefined) {
      setUpdatefield(true);
      setTitlemodal('Editar Parâmetro');
      setShowfield(true);
    }
  };

  const Incluir = () => {
    setUpdatefield(false);
    setTitlemodal('Novo Parâmetro');
    setShowfield(true);
  };

  const Excluir = () => {
    if (itemselec !== undefined) {
      Confirmation('frmparam', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          apiDelete('QueryParam', itemselec).then((response) => {
            if (response.status === 200) {
              setCarregando(false);
              if (response.data.status === 1) {
                setItemselec(undefined);
                Filtrar();
              }
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
          });
        }
      });
    } else {
      setItemvariant(1);
      setMensagem('Não possui nenhum registro para ser excluído !');
    }
  };

  const keyGrid = (newSelection, event) => {
    if (itemselec !== undefined) {
      if (event.key === 'Enter') {
        setUpdatefield(true);
        setTitlemodal('Editar Parâmetro');
        setShowfield(true);
      }
    }
  };

  const dblClickGrid = () => {
    if (itemselec !== undefined) {
      setUpdatefield(true);
      setTitlemodal('Editar Parâmetro');
      setShowfield(true);
    }
  };

  return (
    <React.Fragment>
      <div id="frmparam" name="frmparam">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">Query Selecionada: {namequery}</Card.Title>
          </Card.Header>
        </Card>

        <Row style={{ marginTop: '5px' }}>
          <AGGrid
            width="100%"
            height="550px"
            rows={rows}
            columns={columns}
            loading={carregando}
            onKeyDown={keyGrid}
            onDoubleClick={dblClickGrid}
            validations={validations}
            item={itemselec}
            setItem={(data) => setItemselec(data)}
          ></AGGrid>
        </Row>

        <Row style={{ textAlign: 'center', marginTop: '10px' }}>
          <Col>
            <Button id="btnUp" className="btn btn-success shadow-2 mb-3" onClick={() => Upp()}>
              <i className={'feather icon-chevron-up'} /> Subir
            </Button>
            <Button id="btnDown" className="btn btn-success shadow-2 mb-3" onClick={() => Down()}>
              <i className={'feather icon-chevron-down'} /> Descer
            </Button>
            <Button id="btnNovo" className="btn btn-primary shadow-2 mb-3" onClick={() => Incluir()}>
              <i className={'feather icon-star'} /> Novo
            </Button>
            <Button id="btnExcluir" className="btn btn-primary shadow-2 mb-3" onClick={() => Excluir()}>
              <i className={'feather icon-trash'} /> Excluir
            </Button>
            <Button id="btnEditar" className="btn btn-primary shadow-2 mb-3" onClick={() => Editar()}>
              <i className={'feather icon-edit'} /> Editar
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
      <Modal backdrop="static" size="lg" show={showfield} centered={true} onHide={handleClosefield}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-external-link h1'} />
          &nbsp;{titlemodal}
        </Modal.Header>
        <ModalBody>
          <ParamSelect
            queryselect={queryselect}
            itemselec={itemselec}
            updatefield={updatefield}
            handleClosefield={handleClosefield}
            ultordem={rows.length}
          ></ParamSelect>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default QueryParam;
