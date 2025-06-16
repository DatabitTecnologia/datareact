import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiFind, apiUpdate } from '../../../../api/crudapi';
import photouser from '../../../../assets/images/databit/User.png';

const Crud = (props) => {
  const { user, modulo, nomemodulo, picture, setor, email, showcrud, setShowcrud } = props;
  const [rows, setRows] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);

  useEffect(() => {
    setFields([
      {
        id: 0,
        campo: 'TB00037_INC',
        funcao: 'Operação Incluir',
        tipo: 'varchar',
        nome: 'inc',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '13.5rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: disabled
      },
      {
        id: 1,
        campo: 'TB00037_ALT',
        funcao: 'Operação Alterar',
        tipo: 'varchar',
        nome: 'alt',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '13.5rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: disabled
      },
      {
        id: 2,
        campo: 'TB00037_EXC',
        funcao: 'Operação Excluir',
        tipo: 'varchar',
        nome: 'exc',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '13.5rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: disabled
      },
      {
        id: 3,
        campo: 'TB00037_REL',
        funcao: 'Operação Relatório',
        tipo: 'varchar',
        nome: 'rel',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '13.5rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: disabled
      },
      {
        id: 4,
        campo: 'TB00037_OPC',
        funcao: 'Operação Configuração',
        tipo: 'varchar',
        nome: 'opc',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '13.5rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: disabled
      },
      {
        id: 5,
        campo: 'TB00037_EML',
        funcao: 'Operação E-Mail',
        tipo: 'varchar',
        nome: 'eml',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '13.5rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: disabled
      },
      {
        id: 6,
        campo: 'TB00037_EXP',
        funcao: 'Operação Exportar',
        tipo: 'varchar',
        nome: 'eml',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '13.5rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: disabled
      },
      {
        id: 7,
        campo: 'TB00037_GRAFICOS',
        funcao: 'Operação Gráficos',
        tipo: 'varchar',
        nome: 'graficos',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '13.5rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: disabled
      },
      {
        id: 8,
        campo: 'TB00037_CAMPANHAS',
        funcao: 'Operação Campanhas',
        tipo: 'varchar',
        nome: 'campanhas',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '13.5rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: disabled
      },
      {
        id: 9,
        campo: 'TB00037_DOCS',
        funcao: 'Operação Documentos',
        tipo: 'varchar',
        nome: 'docs',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 1,
        measure: '13.5rem',
        itens: 'Sim,Não',
        values: 'S,N',
        disabled: disabled
      }
    ]);
    setCarregando(true);
    apiFind('Permissao', '*', '', "TB00037_USER = '" + user + "' AND TB00037_TABELA = '" + modulo + "' ").then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setRows(response.data);
      }
    });
  }, []);

  useEffect(() => {
    valuesfield[0] = rows.inc;
    valuesfield[1] = rows.alt;
    valuesfield[2] = rows.exc;
    valuesfield[3] = rows.rel;
    valuesfield[4] = rows.opc;
    valuesfield[5] = rows.eml;
    valuesfield[6] = rows.exp;
    valuesfield[7] = rows.graficos;
    valuesfield[8] = rows.campanhas;
    valuesfield[9] = rows.docs;
    setValuesfield([...valuesfield]);
  }, [rows]);

  const Editar = () => {
    setDisabled(false);
  };

  const Cancelar = () => {
    setShowcrud(false);
  };

  const Salvar = () => {
    setCarregando(true);
    const item = {};
    item['user'] = user;
    item['tabela'] = modulo;
    item['inc'] = valuesfield[0];
    item['alt'] = valuesfield[1];
    item['exc'] = valuesfield[2];
    item['rel'] = valuesfield[3];
    item['opc'] = valuesfield[4];
    item['eml'] = valuesfield[5];
    item['exp'] = valuesfield[6];
    item['graficos'] = valuesfield[7];
    item['campanhas'] = valuesfield[8];
    item['docs'] = valuesfield[9];
    apiUpdate('Permissao', item).then((response) => {
      if (response.status === 200) {
        setCarregando(false);
        setDisabled(true);
      }
    });
  };

  return (
    <React.Fragment>
      <div id="frmcrud" name="frmcrud">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Card style={{ marginBottom: '5px' }}>
          <Card.Header style={{ backgroundColor: '#04a9f5' }}>
            <Row>
              <Col lg={1}>
                {picture !== 'MHg=' ? (
                  <img
                    className="media-object img-radius img-radius m-t-5"
                    src={`data:image/jpeg;base64,${picture}`}
                    alt={'foto'}
                    width="110"
                    height="110"
                    style={{ marginLeft: '15px' }}
                  />
                ) : (
                  <img
                    className="media-object img-radius img-radius m-t-5"
                    src={photouser}
                    alt={'foto'}
                    width="110"
                    height="110"
                    style={{ marginLeft: '15px' }}
                  />
                )}
              </Col>
              <Col lg={9}>
                <Row style={{ textAlign: 'left', marginTop: '25px', marginLeft: '38px' }}>
                  <h6 style={{ fontSize: '16px', color: '#fff' }}>{user}</h6>
                  <h6 style={{ fontSize: '14px', color: '#fff' }}>Setor: {setor}</h6>
                  <h6 style={{ fontSize: '14px', color: '#fff' }}>Email: {email}</h6>
                </Row>
              </Col>
            </Row>
          </Card.Header>

          <Row style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px' }}>
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
                disabled={disabled}
              ></CreateObject>
            ))}
          </Row>
        </Card>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button id="btnEditar" className="btn btn-primary shadow-2 mb-2" onClick={(e) => Editar()} disabled={!disabled}>
              <i className={'feather icon-edit'} /> Editar
            </Button>
            <Button id="btnSalvar" className="btn btn-success shadow-2 mb-2" onClick={(e) => Salvar()} disabled={disabled}>
              <i className={'feather icon-save'} /> Salvar
            </Button>
            <Button id="btnCancelar" className="btn btn-warning shadow-2 mb-2" onClick={(e) => Cancelar()} disabled={disabled}>
              <i className={'feather icon-x'} /> Cancelar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Crud;
