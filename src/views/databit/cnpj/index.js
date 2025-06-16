import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Alert } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';
import AGGrid from '../../../components/AGGrid';
import { apiCNPJ } from '../../../api/crudapi';

const ConsultaCNPJ = (props) => {
  const { cnpjselec, setCnpjselec, resultado, setResultado } = props;
  const [cadastro, setCadastro] = React.useState([]);
  const [dados, setDados] = React.useState(undefined);
  const [atividades, setAtividades] = React.useState([]);
  const [socios, setSocios] = React.useState([]);
  const [steps, setSteps] = React.useState(['Dados Cadastrais', 'Ramos de Atividade', 'Sócios']);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [carregando, setCarregando] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const [columns2, setColumns2] = React.useState([]);
  const [columns3, setColumns3] = React.useState([]);
  const [mensagem, setMensagem] = React.useState('');
  const [itemvariant, setItemvariant] = React.useState();
  const alertVariants = ['danger', 'warning', 'success', 'prmary'];

  const telacadastrais = (
    <div>
      <Row style={{ marginBottom: '10px' }}>
        <Col style={{ marginLeft: '10px', marginBottom: '4px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Informações Cadastrais</Card.Title>
            </Card.Header>
            <Row style={{ marginBottom: '10px' }}>
              <AGGrid width="100%" height="460px" rows={cadastro} columns={columns}></AGGrid>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const telaatividades = (
    <div>
      <Row style={{ marginBottom: '10px' }}>
        <Col style={{ marginLeft: '10px', marginBottom: '4px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Ramos de Atividade</Card.Title>
            </Card.Header>
            <Row style={{ marginBottom: '10px' }}>
              <AGGrid width="100%" height="460px" rows={atividades} columns={columns2}></AGGrid>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const telasocios = (
    <div>
      <Row style={{ marginBottom: '10px' }}>
        <Col style={{ marginLeft: '10px', marginBottom: '4px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
            <Card.Header>
              <Card.Title as="h5">Sócios</Card.Title>
            </Card.Header>
            <Row style={{ marginBottom: '10px' }}>
              <AGGrid width="100%" height="460px" rows={socios} columns={columns3}></AGGrid>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'info', headerName: 'Classificação', width: 236 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Informação', width: 835 }
    ]);
    setColumns2([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 136 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Ramo de Atividade', width: 780 },
      { headerClassName: 'header-list', field: 'principal', headerName: 'At. Principal', width: 150 }
    ]);
    setColumns3([
      { headerClassName: 'header-list', field: 'nome', headerName: 'Nome do Sócio', width: 820 },
      { headerClassName: 'header-list', field: 'cargo', headerName: 'Cargo', width: 251 }
    ]);
    try {
      setCarregando(true);
      apiCNPJ(cnpjselec).then((response) => {
        if (response.status === 200) {
          setDados(response.data);
          setCarregando(false);
        }
      });
    } catch (error) {
      setItemvariant(-1);
      setMensagem('Problemas de comunicação com a Receita, favor tentar mais tarde !');
    }
  }, [cnpjselec]);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  useEffect(() => {
    if (dados !== undefined) {
      let listcadastro = [];
      let dictcadastro = {};

      dictcadastro['info'] = 'Razão Social';
      dictcadastro['nome'] = dados.nome;
      dictcadastro['id'] = 1;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'CNPJ';
      dictcadastro['nome'] = dados.cnpj;
      dictcadastro['id'] = 2;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Abertura';
      dictcadastro['nome'] = dados.abertura;
      dictcadastro['id'] = 3;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Capital Social';
      dictcadastro['nome'] = dados.capital_social;
      dictcadastro['id'] = 4;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Situação';
      dictcadastro['nome'] = dados.situacao;
      dictcadastro['id'] = 5;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Ùltima Atualização';
      dictcadastro['nome'] = dados.ultima_atualizacao;
      dictcadastro['id'] = 6;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Nome Fantasia';
      dictcadastro['nome'] = dados.fantasia;
      dictcadastro['id'] = 7;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Porte';
      dictcadastro['nome'] = dados.porte;
      dictcadastro['id'] = 8;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Logradouro';
      dictcadastro['nome'] = dados.logradouro;
      dictcadastro['id'] = 9;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Número';
      dictcadastro['nome'] = dados.numero;
      dictcadastro['id'] = 10;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Complemento ';
      dictcadastro['nome'] = dados.complemento;
      dictcadastro['id'] = 11;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Bairro';
      dictcadastro['nome'] = dados.bairro;
      dictcadastro['id'] = 12;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Cidade';
      dictcadastro['nome'] = dados.municipio;
      dictcadastro['id'] = 13;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'UF';
      dictcadastro['nome'] = dados.uf;
      dictcadastro['id'] = 14;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'CEP';
      dictcadastro['nome'] = dados.cep;
      dictcadastro['id'] = 15;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Telefone';
      dictcadastro['nome'] = dados.telefone;
      dictcadastro['id'] = 16;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'E-Mail';
      dictcadastro['nome'] = dados.email;
      dictcadastro['id'] = 17;
      listcadastro = listcadastro.concat(dictcadastro);

      dictcadastro = {};
      dictcadastro['info'] = 'Natureza Jurídica';
      dictcadastro['nome'] = dados.natureza_juridica;
      dictcadastro['id'] = 18;
      listcadastro = listcadastro.concat(dictcadastro);

      setCadastro(listcadastro);

      let id = 0;
      let listatividade = [];
      let dictatividade = {};
      for (let item of dados.atividade_principal) {
        dictatividade = {};
        dictatividade['codigo'] = item.code;
        dictatividade['nome'] = item.text;
        dictatividade['principal'] = 'Sim';
        dictatividade['id'] = id;
        id += 1;
        listatividade = listatividade.concat(dictatividade);
      }
      for (let item of dados.atividades_secundarias) {
        dictatividade = {};
        dictatividade['codigo'] = item.code;
        dictatividade['nome'] = item.text;
        dictatividade['principal'] = 'Não';
        dictatividade['id'] = id;
        id += 1;
        listatividade = listatividade.concat(dictatividade);
      }
      setAtividades(listatividade);

      let listsocio = [];
      let dictsocio = {};
      for (let item of dados.qsa) {
        dictsocio = {};
        dictsocio['nome'] = item.nome;
        dictsocio['cargo'] = item.qual;
        dictsocio['id'] = id;
        id += 1;
        listsocio = listsocio.concat(dictsocio);
      }
      setSocios(listsocio);
    }
  }, [dados]);

  return (
    <React.Fragment>
      <div id="frmcnpj" name="frmcnpj">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
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
        {activeStep === 0 ? telacadastrais : <></>}
        {activeStep === 1 ? telaatividades : <></>}
        {activeStep === 2 ? telasocios : <></>}
      </div>
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
    </React.Fragment>
  );
};

export default ConsultaCNPJ;
