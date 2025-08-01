import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalBody, Alert, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiDelete, apiList } from '../../../../api/crudapi';
import { Confirmation } from '../../../../components/Confirmation';
import AGGrid from '../../../../components/AGGrid';
import { CreateObject } from '../../../../components/CreateObject';
import ClienteEquipamentoSelec from './select';

const Composicaoproduto = (props) => {
  const { cliente } = props;
  const [carregando, setCarregando] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [itemselec, setItemselec] = useState([]);
  const [fields, setFields] = useState([]);
  const [valuesfield, setValuesfield] = useState([]);
  const [valuesfield2, setValuesfield2] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [itemvariant, setItemvariant] = useState();
  const alertVariants = ['danger', 'warning', 'success', 'primary']; // corrigido
  const [showselec, setShowselec] = useState(false);
  const [ultimoCodigo, setUltimoCodigo] = useState(null);

  // Configuração inicial
  useEffect(() => {
    setFields([
      { id: 0, campo: 'codigo', funcao: 'Código', tipo: 'varchar', nome: 'produto', tamanho: 5, tipoobject: 1, widthfield: 6, measure: '6rem', disabled: true },
      { id: 1, campo: 'referencia', funcao: 'Referência', tipo: 'varchar', nome: 'referencia', tamanho: 20, tipoobject: 1, widthfield: 15, measure: '21rem', disabled: true },
      { id: 2, campo: 'codbarras', funcao: 'Código Barras', tipo: 'varchar', nome: 'codbarras', tamanho: 20, tipoobject: 1, widthfield: 15, measure: '15rem', disabled: true },
      { id: 3, campo: 'codauxiliar', funcao: 'Código Auxiliar', tipo: 'varchar', nome: 'codauxiliar', tamanho: 20, tipoobject: 1, widthfield: 15, measure: '15rem', disabled: true },
      { id: 4, campo: 'unprod', funcao: 'UN', tipo: 'varchar', nome: 'unprod', tamanho: 60, tipoobject: 1, widthfield: 13, measure: '5rem', disabled: true },
      { id: 5, campo: 'qtde', funcao: 'Qtde', tipo: 'varchar', nome: 'marca', tamanho: 60, tipoobject: 1, widthfield: 13, measure: '5rem', disabled: true },
      { id: 6, campo: 'nome', funcao: 'Descrição Produto', tipo: 'varchar', nome: 'nomeproduto', tamanho: 60, tipoobject: 1, widthfield: 51, measure: '45rem', disabled: true },
      { id: 7, campo: 'grupo', funcao: 'Grupo', tipo: 'varchar', nome: 'grupo', tamanho: 60, tipoobject: 1, widthfield: 10, measure: '11rem', disabled: true, decimal: 2 },
      { id: 8, campo: 'subgrupo', funcao: 'Subgrupo', tipo: 'varchar', nome: 'subgrupo', tamanho: 60, tipoobject: 1, widthfield: 10, measure: '11rem', disabled: true },
    ]);

    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Codigo', width: 100 },
      { headerClassName: 'header-list', field: 'referencia', headerName: 'Referencia', width: 150 },
      { headerClassName: 'header-list', field: 'codbarras', headerName: 'Código de Barras', width: 100 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Descrição', width: 500 },
      { headerClassName: 'header-list', field: 'qtde', headerName: 'Qtde', width: 80 },
      { headerClassName: 'header-list', field: 'prunit', headerName: 'Preço Unit', width: 80 },
      { headerClassName: 'header-list', field: 'totvalor', headerName: 'Valor Total', width: 80 },
      
    ]);

    Filtrar();
  }, []);

  // Busca e preenche grid
  const Filtrar = () => {
    setCarregando(true);
    apiList('ProdutoComposicaoVW',
      'TB01031_CODIGO,TB01010_REFERENCIA,TB01010_CODBARRAS,TB01010_CODAUXILIAR,TB01010_NOME,TB01031_QTDE,TB01010_UNPROD,TB01031_PRUNIT,TB01031_TOTVALOR',
      'TB01002_NOME grupo, TB01018_NOME subgrupo',
      "TB01031_CODIGOPRODUTO = '00129'"
    ).then((response) => {
        if (response.status === 200) {
          console.log('Dados recebidos:', response.data);
          setRows(response.data);
        } else {
          setMensagem('Erro ao buscar dados');
          setItemvariant(0);
        }
      })
      .catch(() => {
        setMensagem('Erro de comunicação com o servidor');
        setItemvariant(0);
      })
      .finally(() => setCarregando(false));
  };

  // Ao clicar na linha, preencher campos abaixo
  const clickGrid = (linhaSelecionada) => {
    if (!linhaSelecionada) return;

    const codigoLinha = linhaSelecionada.codigo ?? null;

    // Atualiza sempre o item selecionado
    setItemselec(linhaSelecionada);

    // Só atualiza valores se o código realmente mudou
    if (codigoLinha !== ultimoCodigo) {
        setUltimoCodigo(codigoLinha);

        const novosValores = fields.map(f =>
            linhaSelecionada[f.campo] !== undefined ? linhaSelecionada[f.campo] : ''
        );

        if (JSON.stringify(valuesfield) !== JSON.stringify(novosValores)) {
            setValuesfield(novosValores);
        }
    }
};



  // Exclusão
  const ExcluirProduto = () => {
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      Confirmation('frmclienteeuipamento', 'Confirma a exclusão deste registro ?').then((result) => {
        if (result.isConfirmed) {
          setCarregando(true);
          apiDelete('ClienteEquipamento', itemselec).then((response) => {
            if (response.status === 200 && response.data.status === 1) {
              setItemselec(undefined);
              setValuesfield(Array(fields.length).fill(''));
              Filtrar();
            } else {
              setItemvariant(-1);
              setMensagem(response.data);
            }
            setCarregando(false);
          });
        }
      });
    } else {
      setItemvariant(1);
      setMensagem('Não possui nenhum registro para ser excluído !');
    }
  };

  const IncluirProduto = () => {
    setItemselec(undefined);
    setShowselec(true);
  };

  return (
    <React.Fragment>
      <div id="frmclienteeuipamento" name="frmclienteeuipamento">
        {carregando && <LinearProgress color="primary" />}
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px', marginTop: '-15px' }}>
            <Card.Header>
              <Card.Title as="h5">Listagem de Equipamentos</Card.Title>
            </Card.Header>
            <Row style={{ marginBottom: '5px' }}>
              <AGGrid
                width="100%"
                height="260px"
                rows={rows}
                columns={columns}
                loading={carregando}
                item={itemselec}
                setItem={(data) => setItemselec(data)}
                onKeyDown={(data, e) => {
                  if (e.key === 'Enter') setShowselec(true);
                  if (e.key === 'Delete') ExcluirProduto();
                }}
                onDoubleClick={() => setShowselec(true)}
                onCelClick={(data) => clickGrid(data)}
                focus={true}
              />
            </Row>
          </Card>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Informações do item selecionado</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '5px' }}>
              <Col>
                <Row className='g-2'>
                  {fields.map((field, index) => (
                    <CreateObject
                      key={index}
                      field={field}
                      index={field.id}
                      fields={fields}
                      valuesfield={valuesfield}
                      setValuesfield={setValuesfield}
                      valuesfield2={valuesfield2}
                      setValuesfield2={setValuesfield2}
                      disabled={true}
                    />
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
        </Row>
        <hr />
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
        <Row style={{ textAlign: 'right', marginTop: '10px' }}>
          <Col>
            <Button id="btnNovoprod" className="btn" onClick={IncluirProduto}>
              <i className={'feather icon-star'} /> Incluir
            </Button>
            <Button id="btnDelprod" className="btn-success" onClick={ExcluirProduto}>
              <i className={'feather icon-trash'} /> Excluir
            </Button>
          </Col>
        </Row>
        <Modal backdrop="static" id="frmbrowse" size="xl" show={showselec} centered={true} onHide={() => setShowselec(false)}>
          <Modal.Header className="h5" closeButton>
            <i className={'feather icon-box'} /> &nbsp;Lançamento de Itens
          </Modal.Header>
          <ModalBody>
            <ClienteEquipamentoSelec
              itemselec={itemselec}
              showselec={showselec}
              codcli={cliente}
              setShowselec={setShowselec}
            />
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Composicaoproduto;
