import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Alert, Modal } from 'react-bootstrap';
import { CreateObject } from '../../../../../../components/CreateObject';
import ProdutoEstoque from '../../../../produto/estoque';
import SeriaisSelector from '../../selecionar';

const GmoResumoQtde = (props) => {
  const { onSaveSeriais } = props;
  const { itemselec, setItemselec } = props;
  const { showlanc, setShowlanc } = props;
  const { rows, setRows } = props;

  const [seriaisSelecionados, setSeriaisSelecionados] = useState([]);
  const [showModalSeriais, setShowModalSeriais] = useState(false); // ÚNICO estado do modal

  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [mensagem, setMensagem] = React.useState('');

  useEffect(() => {
    const disables =[true, true, true, true, true, true, true, true, false];
    setValuesdisable(disables);
    setFields([
      {
        id: 0,
        campo: 'PRE',
        funcao: 'Pré-Contrato',
        tipo: 'varchar',
        nome: 'pre',
        tamanho: 5,
        tipoobject: 1,
        widthfield: 6,
        measure: '7rem',
        disabled: disables[0]
      },
      {
        id: 1,
        campo: 'PRODUTO',
        funcao: 'Código',
        tipo: 'varchar',
        nome: 'codigo',
        tamanho: 5,
        tipoobject: 1,
        widthfield: 6,
        measure: '6rem',
        disabled: disables[1]
      },
      {
        id: 2,
        campo: 'REFERENCIA',
        funcao: 'Referência',
        tipo: 'varchar',
        nome: 'referencia',
        tamanho: 20,
        tipoobject: 1,
        widthfield: 15,
        measure: '15rem',
        charnormal: true,
        disabled: disables[2]
      },
      {
        id: 3,
        campo: 'NOME',
        funcao: 'Descrição do Equipamento',
        tipo: 'varchar',
        nome: 'nome',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 40,
        measure: '40rem',
        charnormal: true,
        disabled: disables[3]
      },
      {
        id: 4,
        campo: 'NOMESITE',
        funcao: 'Site',
        tipo: 'varchar',
        nome: 'site',
        tamanho: 60,
        tipoobject: 1,
        widthfield: 27,
        measure: '27rem',
        charnormal: true,
        disabled: disables[4]
      },
      {
        id: 5,
        campo: 'CIDADE',
        funcao: 'Cidade',
        tipo: 'varchar',
        nome: 'cidade',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 15,
        measure: '15rem',
        charnormal: true,
        disabled: disables[5]
      },
      {
        id: 6,
        campo: 'ESTADO',
        funcao: 'UF',
        tipo: 'varchar',
        nome: 'UF',
        tamanho: 2,
        tipoobject: 1,
        widthfield: 6,
        measure: '6rem',
        charnormal: true,
        disabled: disables[6]
      },
      {
        id: 7,
        campo: 'CEP',
        funcao: 'Cep',
        tipo: 'varchar',
        nome: 'cep',
        tamanho: 2,
        tipoobject: 8,
        widthfield: 10,
        measure: '10rem',
        charnormal: true,
        disabled: disables[7],
        tipomascara: 3
      },
      {
        id: 8,
        campo: 'QTLANC',
        funcao: 'QT.Requisição',
        tipo: 'varchar',
        nome: 'qtlanc',
        tamanho: 2,
        tipoobject: 4,
        widthfield: 10,
        measure: '10rem',
        charnormal: true,
        disabled: disables[8]
      }
    ]);

    valuesfield[0] = itemselec.precontrato;
    valuesfield[1] = itemselec.produto;
    valuesfield[2] = itemselec.referencia;
    valuesfield[3] = itemselec.nome;
    valuesfield[4] = itemselec.site;
    valuesfield[5] = itemselec.cidade;
    valuesfield[6] = itemselec.uf;
    valuesfield[7] = itemselec.cep;
    valuesfield[8] = itemselec.qtlanc > 0 ? itemselec.qtlanc : itemselec.qtaliberar - itemselec.qttransito;
    setValuesfield([...valuesfield]);
  }, []);

  const abrirModalSeriais = () => {
    setShowModalSeriais(true);
  };

  const fecharModalSeriais = () => {
    setShowModalSeriais(false);
  };

  const receberSeriaisSelecionados = (lista) => {
    console.log('GmoResumoQtde receberSeriaisSelecionados:', lista);
    setSeriaisSelecionados(lista || []);
    onSaveSeriais?.(lista || []); 
    fecharModalSeriais();
  };

  const Salvar = () => {
    if (parseInt(valuesfield[8]) <= itemselec.qtaliberar - itemselec.qttransito) {
      itemselec.qtlanc = parseInt(valuesfield[8]);
      setItemselec(itemselec);

      const rowsbkp = rows.slice();
      const itembkp = rowsbkp.find((el) => el.id === itemselec.id);
      if (itembkp) itembkp.qtlanc = parseInt(valuesfield[8]);
      setRows(rowsbkp);

      // seriaisSelecionados já está no estado/local (e opcionalmente enviado ao pai)
      setShowlanc(false);
    } else {
      setItemvariant(1);
      setMensagem('Não é permitido lançar quantidade MAIOR que o saldo à Liberar !');
    }
  };

  return (
    <React.Fragment>
      <div id="frmqtde" name="frmqtde">
        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title style={{ marginBottom: '10px' }} as="h5">
              Informações do Equipamento selecionado
            </Card.Title>
          </Card.Header>
          <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '10px' }}>
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
                disabled={valuesdisable[field.id]}
              />
            ))}
          </Row>
        </Card>

        <Row style={{ height: '430px' }}>
          <ProdutoEstoque produto={itemselec.produto} empselec={itemselec.codemp} compress={true} />
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

        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button className="btn btn-info shadow-2 mb-2" onClick={abrirModalSeriais}>
              <i className={'feather icon-search'} /> Selecionar Seriais
            </Button>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={Salvar}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={() => setShowlanc(false)}>
              <i className={'feather icon-x'} /> Cancelar
            </Button>
          </Col>
        </Row>
      </div>

      {/* Modal de seriais */}
      <Modal show={showModalSeriais} onHide={fecharModalSeriais} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Selecionar Seriais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SeriaisSelector
            precontrato={itemselec.precontrato}
            produto={itemselec.produto}
            qtde={Number(valuesfield[8] ?? 0)}  
            onConfirm={receberSeriaisSelecionados}
            onClose={fecharModalSeriais}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default GmoResumoQtde;
