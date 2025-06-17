import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Modal, ModalBody } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiFind, apiUpdate, apiInsert } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';
import { Password } from '../../../../components/Password';
import PartnerConcluir from '../concluir';

const PartnerFluxo = (props) => {
  const { compra, parceiro, itens, statusant, valor, showwfluxo, setShowfluxo, atualiza, setAtualiza } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [propstatus, setPropstatus] = React.useState([]);
  const [showconcluir, setShowconcluir] = React.useState(false);
  const [validar, setValidar] = useState(false);

  useEffect(() => {
    setValuesdisable([true, false, false]);
    setCarregando(true);
  }, []);

  useEffect(() => {
    if (itens !== undefined && itens !== null && itens.length > 0) {
      valuesfield[0] = statusant;
      setValuesfield([...valuesfield]);

      let admin = Decode64(sessionStorage.getItem('admin')) === 'S';
      let master = Decode64(sessionStorage.getItem('master')) === 'S';
      let manager = Decode64(sessionStorage.getItem('manager')) === 'S';

      let filterstatus =
        " AND (TB01148_CODIGO IN ( SELECT TB01149_STATUSFIM FROM TB01149 WHERE TB01149_STATUS = '" + valuesfield[0] + "') ";
      if (!admin && !master && !manager) {
        filterstatus =
          filterstatus +
          " AND TB01148_CODIGO IN ( SELECT TB01150_STATUS FROM TB01150 WHERE TB01150_USER = '" +
          Decode64(sessionStorage.getItem('user')) +
          "') ";
      }
      filterstatus = filterstatus + " ) or (TB01148_CODIGO = '" + valuesfield[0] + "')";

      setFields([
        {
          id: 0,
          campo: 'TB02302_STATUS',
          funcao: 'Status Atual',
          tipo: 'varchar',
          nome: 'statusatual',
          tipoobject: 2,
          tamanho: 2,
          widthfield: 49,
          measure: '49rem',
          tabelaref: 'TB01148',
          widthname: 38,
          disabled: valuesdisable[0]
        },
        {
          id: 1,
          campo: 'TB02302_STATUS2',
          funcao: 'Novo Status',
          tipo: 'varchar',
          nome: 'statusnovo',
          tipoobject: 2,
          tamanho: 2,
          widthfield: 49,
          measure: '49rem',
          tabelaref: 'TB01148',
          widthname: 38,
          disabled: valuesdisable[1],
          filteraux: filterstatus
        },
        {
          id: 2,
          campo: 'TB02302_OBS',
          funcao: 'Observações',
          tipo: 'text',
          nome: 'obs',
          tipoobject: 6,
          tamanho: 10,
          widthfield: 10,
          measure: '10rem',
          disabled: valuesdisable[2],
          lines: 8
        }
      ]);
    }
    setCarregando(false);
  }, [itens]);

  useEffect(() => {
    apiFind('PartnerStatus', '*', '', "TB01148_CODIGO = '" + valuesfield[1] + "' ").then((response) => {
      if (response.status === 200) {
        setPropstatus(response.data);
      }
    });
  }, [valuesfield[1]]);

  const Salvar = () => {
    if (document.getElementById('TB02302_STATUS2').value === undefined || document.getElementById('TB02302_STATUS2').value === '') {
      setItemvariant(1);
      setMensagem('Campo Novo Status é preenchimento obrigatório !');
      document.getElementById('TB02302_STATUS2').focus();
    } else {
      try {
        setCarregando(true);
        let libera = true;
        if (propstatus.valor1 + propstatus.valor2 > 0) {
          if (!(valor >= propstatus.valor1 && valor <= propstatus.valor2)) {
            libera = false;
            setCarregando(false);
            setItemvariant(1);
            setMensagem('Não foi possível passar para este Status, pois o valor da compra está fora da faixa de aprovação !');
          }
        }
        if (libera) {
          Password(
            'frmfluxo',
            propstatus.senha,
            0,
            'Senha de Liberação',
            propstatus.senha !== undefined && propstatus.senha !== '' && propstatus.senha !== null
          ).then((result) => {
            if (result.isConfirmed) {
              itens.forEach((item) => {
                let item2 = {};
                item2['codigo'] = item.codigo;
                item2['codcli'] = item.codcli;
                item2['produto'] = item.produto;
                item2['status'] = valuesfield[1];
                item2['qtprodb'] = item.qtprod;
                item2['totvalorb'] = item.totvalor;
                apiUpdate('PartnerItem', item2).then((response) => {
                  if (response.status === 200) {
                    let item3 = {};
                    item3['codigo'] = item.codigo;
                    item3['codcli'] = item.codcli;
                    item3['produto'] = item.produto;
                    item3['status'] = valuesfield[1];
                    item3['user'] = Decode64(sessionStorage.getItem('user'));
                    apiInsert('PartnerHistorico', item3).then((response) => {
                      if (response.status === 200) {
                        console.log('Produto : ' + item.produto);
                      }
                    });
                    setCarregando(false);
                  }
                });
              });
              if (propstatus.tipo === 1) {
                setShowconcluir(true);
              } else {
                setAtualiza(true);
                setShowfluxo(false);
              }
            } else {
              setCarregando(false);
            }
          });
        }
      } catch (error) {
        setCarregando(false);
        setItemvariant(-1);
        setMensagem(error);
      }
    }
  };

  const handleClosefluxo = () => {
    props.setShowfluxo(false);
  };

  const handleCloseconcluir = () => {
    if (validar) {
      setShowconcluir(false);
      setAtualiza(true);
      setShowfluxo(false);
    }
  };

  return (
    <React.Fragment>
      <div id="frmfluxo" name="frmfluxo">
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
              disabled={valuesdisable[field.id]}
            ></CreateObject>
          ))}
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col style={{ textAlign: 'rigth' }}>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={() => Salvar()}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={() => handleClosefluxo()}>
              <i className={'feather icon-x'} />
              Cancelar
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
      <Modal backdrop="static" size="lg" show={showconcluir} centered={true} onHide={handleCloseconcluir}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-check'} />
          &nbsp;Conclusão da Compra: {compra}
        </Modal.Header>
        <ModalBody>
          <PartnerConcluir
            compra={compra}
            parceiro={parceiro}
            status={valuesfield[1]}
            valor={valor}
            validar={validar}
            setValidar={(data) => setValidar(data)}
          ></PartnerConcluir>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default PartnerFluxo;
