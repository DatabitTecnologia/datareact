import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiUpdate, apiExec } from '../../../../api/crudapi';
import { CreateObject } from '../../../../components/CreateObject';
import { Decode64 } from '../../../../utils/crypto';

const PartnerRecebimento = (props) => {
  const { valuesconta, setValuesconta, valuesname, showbaixa, setShowbaixa } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];
  const [titulo, setTitulo] = React.useState('');
  const [parceiro, setParceiro] = React.useState('');
  const [servico, setServico] = React.useState('');
  const [valor, setValor] = React.useState(0);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'dtbaixa',
        funcao: 'Data Baixa',
        tipo: 'datetime',
        nome: 'dtbaixa',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 8,
        measure: '8rem',
        disabled: false
      },
      {
        id: 1,
        campo: 'obs',
        funcao: 'Observações da Baixa',
        tipo: 'text',
        nome: 'obs',
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10rem',
        disabled: false,
        lines: 8
      }
    ]);
    setTitulo(valuesconta[valuesname.indexOf('codigo')]);
    setParceiro(valuesconta[valuesname.indexOf('codcli')]);
    setValor(valuesconta[valuesname.indexOf('vlrtitulo')]);
    setServico(valuesconta[valuesname.indexOf('servcontr')]);
  }, []);

  const Baixar = () => {
    if (document.getElementById('dtbaixa').value === undefined || document.getElementById('dtbaixa').value === '') {
      setItemvariant(1);
      setMensagem('Data da Baixa é preenchimento obrigatório !');
      document.getElementById('dtbaixa').focus();
    } else {
      setCarregando(true);
      let item = {};
      item['codigo'] = titulo;
      const tmdata1 = Date.parse(valuesfield[0]);
      const dt1 = new Date(tmdata1);
      const data1 = dt1.toLocaleDateString('en-US');
      item['dtbaixa'] = data1 + ' 00:00:00';
      item['obsbaixa'] = valuesfield[1];
      apiUpdate('PartnerReceber', item).then((response) => {
        if (response.status === 200) {
          valuesconta[valuesname.indexOf('dtbaixa')] = valuesfield[0];
          valuesconta[valuesname.indexOf('nomeposfim')] = 'Pago';
          setValuesconta([...valuesconta]);
          apiExec(
            "EXEC SP02301 '" + parceiro + "', '" + servico + "'," + valor + ",'" + Decode64(sessionStorage.getItem('user')) + "' ",
            'N'
          ).then((response) => {
            if (response.status === 200) {
              console.log(response.data);
              setCarregando(false);
              setShowbaixa(false);
            }
          });
        }
      });
    }
  };

  return (
    <React.Fragment>
      <div id="frmbaixa" name="frbaixa">
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
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col style={{ textAlign: 'rigth' }}>
            <Button id="btnBaixar" className="btn btn-primary shadow-2 mb-2" onClick={(e) => Baixar()}>
              <i className={'feather icon-check'} /> Baixar
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

export default PartnerRecebimento;
