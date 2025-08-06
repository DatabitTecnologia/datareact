import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Alert, Modal } from 'react-bootstrap';
import { CreateObject } from '../../../../../../components/CreateObject';
import ProdutoEstoque from '../../../../produto/estoque';
import SeriaisSelector from '../../selecionar';
import { apiUpdate } from '../../../../../../api/crudapi';

const GmoResumoQtde = (props) => {
  const [seriaisSelecionados, setSeriaisSelecionados] = useState([]);

  const { itemselec, setItemselec } = props;
  const { showlanc, setShowlanc } = props;
  const { rows, setRows } = props;
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [mensagem, setMensagem] = React.useState('');

  const [showSeriaisModal, setShowSeriaisModal] = useState(false);

  useEffect(() => {
    setValuesdisable([true, true, true, true, true, true, true, true, false]);
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
        disabled: valuesdisable[0]
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
        disabled: valuesdisable[1]
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
        disabled: valuesdisable[2]
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
        disabled: valuesdisable[3]
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
        disabled: valuesdisable[4]
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
        disabled: valuesdisable[5]
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
        disabled: valuesdisable[6]
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
        disabled: valuesdisable[7],
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
        disabled: valuesdisable[8]
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
    if (itemselec.qtlanc > 0) {
      valuesfield[8] = itemselec.qtlanc;
    } else {
      valuesfield[8] = itemselec.qtaliberar - itemselec.qttransito;
    }

    setValuesfield([...valuesfield]);
  }, []);

  const Salvar = async () => {
    if (parseInt(valuesfield[8]) <= itemselec.qtaliberar - itemselec.qttransito) {
      itemselec.qtlanc = parseInt(valuesfield[8]);
      setItemselec(itemselec);
      let rowsbkp = rows.slice(0, rows.length);
      const itembkp = rowsbkp.find((element) => element.id === itemselec.id);
      itembkp.qtlanc = parseInt(valuesfield[8]);
      setRows(rowsbkp);

      // Envia seriais selecionados
      if (seriaisSelecionados.length > 0) {
        for (const numserie of seriaisSelecionados) {
          const data = {
            numserie: numserie,
            serieselecionada: 'S',
            precontrato: itemselec.precontrato,
            contrato: itemselec.contrato,
            produto: itemselec.produto,
            coditem: '00001',
            iditem: 1
          };

          //console.log('Campos ', itemselec);

          const response = await apiUpdate('PrecontratoDevolucao', data);
          //console.log('Resposta ', response);

          if (response?.status !== 200) {
            console.error('Erro ao atualizar:', data);
          }
        }
      }

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
              ></CreateObject>
            ))}
          </Row>
        </Card>
        <Row style={{ height: '430px' }}>
          <ProdutoEstoque produto={itemselec.produto} empselec={itemselec.codemp} compress={true}></ProdutoEstoque>
        </Row>
        <hr></hr>
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
            <Button className="btn btn-info shadow-2 mb-2" onClick={() => setShowSeriaisModal(true)}>
              <i className={'feather icon-search'} /> Selecionar Seriais
            </Button>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={(e) => Salvar()}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={(e) => setShowlanc(false)}>
              <i className={'feather icon-x'} /> Cancelar
            </Button>
          </Col>
        </Row>
      </div>
      {/* Modal series */}
      <Modal show={showSeriaisModal} onHide={() => setShowSeriaisModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Selecionar Seriais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SeriaisSelector
            precontrato={itemselec.precontrato}
            produto={itemselec.produto}
            onConfirm={(selecionados) => setSeriaisSelecionados(selecionados)}
            onClose={() => setShowSeriaisModal(false)}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default GmoResumoQtde;
