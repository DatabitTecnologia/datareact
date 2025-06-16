import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import AGGrid from '../AGGrid';
import { apiList, apiInsert, apiExec } from '../../api/crudapi';
import { CreateObject } from '../CreateObject';
import { states } from '../../utils/states';
import { Confirmation } from '../Confirmation';

const BrowseEquip = (props) => {
  const { precontrato, operacaotipo, coditem, iditem } = props;
  const { showplus, setShowplus } = props;
  const { processado, setProcessado } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [processando, setProcessando] = React.useState(false);
  const [itemprocessa, setItemprocessa] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [validations, setValidations] = React.useState([]);
  const [itemselec, setItemselec] = React.useState([]);

  useEffect(() => {
    let tmpvalidations = [];
    let validation = {};
    validation['campo'] = ['operacaotipo', 'operacaotipo'];
    validation['sinal'] = [1, 1];
    validation['tipotab'] = 'G';
    validation['valorval'] = ['A', 'R'];
    validation['cor'] = ['#99ffac', '#fa1d1d'];
    validation['corline'] = ['#000', '#fff'];
    validation['total'] = 2;

    tmpvalidations = tmpvalidations.concat(validation);
    setValidations(tmpvalidations);
    setColumns([
      { headerClassName: 'header-list', field: 'contrato', headerName: 'Contrato', width: 90 },
      { headerClassName: 'header-list', field: 'codcli', headerName: 'Cliente', width: 100 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Nome do Cliente', width: 250 },
      { headerClassName: 'header-list', field: 'numserie', headerName: 'Serial', width: 170 },
      { headerClassName: 'header-list', field: 'pat', headerName: 'Pat', width: 90 },
      { headerClassName: 'header-list', field: 'produto', headerName: 'Equip.', width: 80 },
      { headerClassName: 'header-list', field: 'nomeprod', headerName: 'Modelo Equipamento', width: 250 },
      { headerClassName: 'header-list', field: 'nomesite', headerName: 'Site', width: 210 },
      { headerClassName: 'header-list', field: 'cidade', headerName: 'Cidade', width: 120 },
      { headerClassName: 'header-list', field: 'estado', headerName: 'UF', width: 60 },
      { headerClassName: 'header-list', field: 'cep', headerName: 'CEP', width: 100 },
      { headerClassName: 'header-list', field: 'local', headerName: 'Local Instalação', width: 200 },
      { headerClassName: 'header-list', field: 'instalacao', headerName: 'Instalação', width: 110, type: 'date' }
    ]);
    setFields([
      {
        id: 0,
        campo: 'contrato',
        funcao: 'Contrato',
        tipo: 'varchar',
        nome: 'campo',
        tamanho: 10,
        tipoobject: 1,
        widthfield: 10,
        measure: '9rem',
        disabled: precontrato !== undefined
      },
      {
        id: 1,
        campo: 'codcli',
        funcao: 'Cliente',
        tipo: 'varchar',
        nome: 'codcli',
        tipoobject: 2,
        tamanho: 8,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01008',
        widthname: 23,
        disabled: precontrato !== undefined
      },
      {
        id: 2,
        campo: 'produto',
        funcao: 'Modelo',
        tipo: 'varchar',
        nome: 'produto',
        tipoobject: 2,
        tamanho: 5,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB01010',
        widthname: 23,
        disabled: false
      },
      {
        id: 3,
        campo: 'numserie',
        funcao: 'Serial',
        tipo: 'varchar',
        nome: 'numserie',
        tamanho: 12,
        tipoobject: 1,
        widthfield: 12,
        measure: '12rem',
        disabled: false
      },
      {
        id: 4,
        campo: 'pat',
        funcao: 'PAT',
        tipo: 'varchar',
        nome: 'pat',
        tamanho: 12,
        tipoobject: 1,
        widthfield: 12,
        measure: '12rem',
        disabled: false
      },
      {
        id: 5,
        campo: 'instalacao',
        funcao: 'Instalação de',
        tipo: 'datetime',
        nome: 'instalacao',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '9rem',
        disabled: false
      },
      {
        id: 6,
        campo: 'instalacao2',
        funcao: 'Até',
        tipo: 'datetime',
        nome: 'instalacao2',
        tipoobject: 5,
        tamanho: 10,
        widthfield: 10,
        measure: '9rem',
        disabled: false
      },
      {
        id: 7,
        campo: 'bairro',
        funcao: 'Bairro',
        tipo: 'varchar',
        nome: 'bairro',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 10,
        measure: '10rem',
        disabled: false
      },
      {
        id: 8,
        campo: 'cidade',
        funcao: 'Cidade',
        tipo: 'varchar',
        nome: 'cidade',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 14,
        measure: '14rem',
        disabled: false
      },
      {
        id: 9,
        campo: 'estado',
        funcao: 'Estado',
        tipo: 'varchar',
        nome: 'estado',
        tamanho: 2,
        tipoobject: 11,
        widthfield: 14,
        measure: '14rem',
        options: states,
        disabled: false
      },
      {
        id: 10,
        campo: 'cep',
        funcao: 'Cep',
        tipo: 'varchar',
        nome: 'campo',
        tamanho: 10,
        tipoobject: 8,
        widthfield: 6,
        measure: '6rem',
        disabled: false,
        tipomascara: 3
      },
      {
        id: 11,
        campo: 'local',
        funcao: 'Localização',
        tipo: 'varchar',
        nome: 'local',
        tamanho: 30,
        tipoobject: 1,
        widthfield: 13,
        measure: '13rem',
        disabled: false
      },
      {
        id: 12,
        campo: 'codsite',
        funcao: 'Site',
        tipo: 'varchar',
        nome: 'codsite',
        tipoobject: 2,
        tamanho: 6,
        widthfield: 32,
        measure: '32rem',
        tabelaref: 'TB02176',
        widthname: 23,
        disabled: false,
        filteraux: " and TB02176_CONTRATO = '" + precontrato.contrato + "' "
      },
      {
        id: 13,
        campo: 'operacaotipo',
        funcao: 'Movimentação',
        tipo: 'varchar',
        nome: 'operacaotipo',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 9,
        measure: '10rem',
        itens: 'Adicionar,Retirar',
        values: 'A,R',
        disabled: operacaotipo === 'D'
      },
      {
        id: 14,
        campo: 'contratada',
        funcao: 'Contratada',
        tipo: 'varchar',
        nome: 'contratada',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 9,
        measure: '8rem',
        itens: 'Sim,Não',
        values: '1,0',
        disabled: false
      },
      {
        id: 15,
        campo: 'aprovada',
        funcao: 'Aprovada',
        tipo: 'varchar',
        nome: 'aprovada',
        tamanho: 1,
        tipoobject: 11,
        widthfield: 9,
        measure: '8rem',
        itens: 'Sim,Não',
        values: '1,0',
        disabled: false
      }
    ]);
  }, []);

  useEffect(() => {
    if (precontrato !== undefined) {
      valuesfield[0] = precontrato.contrato;
      valuesfield[1] = precontrato.codcli;
      setValuesfield([...valuesfield]);
    }
    Filtrar();
  }, [precontrato]);

  useEffect(() => {
    if (operacaotipo === 'D') {
      valuesfield[13] = 'R';
    }
    valuesfield[14] = '1';
    valuesfield[15] = '1';
    setValuesfield([...valuesfield]);
  }, [operacaotipo]);

  const Filtrar = () => {
    setCarregando(true);
    let filter = "situacao = 'A' ";
    if (valuesfield[0] !== '' && valuesfield[0] !== undefined) {
      filter += " and contrato = '" + valuesfield[0] + "' ";
    }
    if (valuesfield[1] !== '' && valuesfield[1] !== undefined) {
      filter += " and codcli = '" + valuesfield[1] + "' ";
    }
    if (valuesfield[2] !== '' && valuesfield[2] !== undefined) {
      filter += " and produto = '" + valuesfield[2] + "' ";
    }
    if (valuesfield[3] !== '' && valuesfield[3] !== undefined) {
      filter += " and numserie like '" + valuesfield[3] + "%' ";
    }
    if (valuesfield[4] !== '' && valuesfield[4] !== undefined) {
      filter += " and pat like '" + valuesfield[4] + "%' ";
    }
    if (
      valuesfield[5] !== '' &&
      valuesfield[5] !== undefined &&
      valuesfield[5] !== null &&
      valuesfield[6] !== '' &&
      valuesfield[6] !== undefined &&
      valuesfield[6] !== null
    ) {
      const tmdata1 = Date.parse(valuesfield[5]);
      const dt1 = new Date(tmdata1);
      const data1 = dt1.toLocaleDateString('en-US');

      const tmdata2 = Date.parse(valuesfield[6]);
      const dt2 = new Date(tmdata2);
      const data2 = dt2.toLocaleDateString('en-US');
      filter += " and instalacao BETWEEN '" + data1 + " 00:00:00' AND '" + data2 + " 23:59:00' ";
    }
    if (valuesfield[7] !== '' && valuesfield[7] !== undefined) {
      filter += " and bairro like '" + valuesfield[7] + "%' ";
    }
    if (valuesfield[8] !== '' && valuesfield[8] !== undefined) {
      filter += " and cidade like '" + valuesfield[8] + "%' ";
    }
    if (valuesfield[9] !== '' && valuesfield[9] !== undefined) {
      filter += " and estado = '" + valuesfield[9] + "' ";
    }
    if (valuesfield[10] !== '' && valuesfield[10] !== undefined) {
      filter += " and cep = '" + valuesfield[10] + "' ";
    }
    if (valuesfield[11] !== '' && valuesfield[11] !== undefined) {
      filter += " and local like '" + valuesfield[11] + "%' ";
    }
    if (valuesfield[12] !== '' && valuesfield[12] !== undefined) {
      filter += " and codsite = '" + valuesfield[12] + "' ";
    }
    apiList('BrowseEquipVW', '*', '', filter).then((response) => {
      if (response.status === 200) {
        setRows(response.data);
        setCarregando(false);
      }
    });
  };

  const dblClickGrid = (newSelection) => {
    selectItem(newSelection);
  };

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter') {
      selectItem(newSelection);
    }
  };

  const selectItem = (item) => {
    if (item.precontrato === '' || item.precontrato === undefined || item.precontrato === null) {
      item.operacaotipo = valuesfield[13];
      item.precontrato = precontrato.codigo;
      item.qtcontratada = valuesfield[14];
      item.qtaprovada = valuesfield[15];
    } else {
      item.operacaotipo = 'N';
      item.precontrato = null;
      item.qtcontratada = '0';
      item.qtaprovada = '0';
    }
  };

  const processaItens = async () => {
    try {
      const { codigo, contrato } = precontrato;
      const qtContratada = valuesfield[14];
      const qtAprovada = valuesfield[15];

      setCarregando(true);
      setProcessando(true);

      // Apaga registros antigos
      await apiExec(
        `DELETE FROM TB02308 WHERE TB02308_PRECONTRATO = '${codigo}' AND TB02308_CODITEM = '${coditem}' AND TB02308_IDITEM = '${iditem}'`,
        'N'
      );

      // Filtra itens válidos
      const itens = rows.filter((x) => x.operacaotipo !== 'N');

      // Processa os itens
      for (const item of itens) {
        const itemsave = {
          precontrato: codigo,
          contrato,
          produto: item.produto,
          numserie: item.numserie,
          pat: item.pat,
          qtcontratada: qtContratada,
          qtaprovada: qtAprovada,
          contratada: qtContratada,
          aprovada: qtAprovada,
          operacaotipo: item.operacaotipo,
          coditem,
          iditem
        };

        const responseinsert = await apiInsert('PrecontratoDevolucao', itemsave);

        if (responseinsert.status === 200) {
          setItemprocessa(`Equipamento : ${item.numserie} - ${item.nomeprod}`);
        }
      }

      // Remove dados antigos da TB02267
      await apiExec(
        `DELETE FROM TB02267 WHERE TB02267_PRECONTRATO = '${codigo}' AND TB02267_CODITEM = '${coditem}' AND TB02267_IDITEM = '${iditem}' AND TB02267_OPERACAOTIPO = 'R' `,
        'N'
      );

      // Lista equipamentos atualizados
      const responselistequip = await apiList(
        'BrowseEquipTotalVW',
        '*',
        '',
        `precontrato = '${codigo}' AND coditem = '${coditem}' AND iditem = '${iditem}'`
      );

      if (responselistequip.status === 200) {
        const equips = responselistequip.data;

        for (const equip of equips) {
          const itemsaveequip = {
            precontrato: codigo,
            coditem,
            iditem,
            produto: equip.produto,
            qtcontratada: equip.qtcontratada,
            qtaprovada: equip.qtaprovada,
            codsite: equip.codsite,
            defquipe: 'O',
            operacaotipo: equip.operacaotipo,
            operacao: 0,
            situacaoequip: 1
          };

          const responseinsertequip = await apiInsert('PrecontratoEquipamento', itemsaveequip);

          if (responseinsertequip.status === 200) {
            setItemprocessa(`Equipamento : ${equip.produto} - ${equip.codsite}`);
          }
        }
      }

      // Finaliza estados
      setProcessando(false);
      setCarregando(false);
      setProcessado(true);
      setShowplus(false);
    } catch (error) {
      console.error('Erro ao processar os itens:', error);
      setCarregando(false);
      setProcessando(false);
      setShowplus(false);
      // Você pode adicionar um alerta ou toast aqui
    }
  };

  return (
    <React.Fragment>
      <div id="frmplus" name="frmplus">
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px', marginTop: '-15px' }}>
            <Card.Header>
              <Card.Title as="h5">Definição de Filtros</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '5px', marginLeft: '5px', marginRight: '5px' }}>
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
                  disabled={field.disabled}
                ></CreateObject>
              ))}
            </Row>
          </Card>
        </Row>
        <Row style={{ marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
          <Card className="Recent-Users" style={{ marginBottom: '5px' }}>
            <Card.Header>
              <Card.Title as="h5">Listagem de Equipamentos</Card.Title>
            </Card.Header>
            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
              <AGGrid
                width="100%"
                height="390px"
                rows={rows}
                columns={columns}
                loading={carregando}
                item={itemselec}
                setItem={(data) => setItemselec(data)}
                focus={true}
                validations={validations}
                onKeyDown={keyGrid}
                onDoubleClick={dblClickGrid}
              ></AGGrid>
            </Row>
          </Card>
        </Row>

        <hr></hr>
        <Row style={{ textAlign: 'right', marginTop: '10px' }}>
          <Col>
            <Button id="btnFiltrar" className="btn btn-primary  mb-2" onClick={(e) => Filtrar()}>
              <i className={'feather icon-filter'} /> Filtrar
            </Button>
            <Button id="btnConfirmar" className="btn btn-success  mb-2" onClick={(e) => processaItens()}>
              <i className={'feather icon-check'} /> Confirmar
            </Button>
            <Button id="btnSair" className="btn btn-warning  mb-2" onClick={(e) => setShowplus(false)}>
              <i className={'feather icon-x'} /> Sair
            </Button>
          </Col>
        </Row>
        <div
          className={`modal fade ${processando ? 'show d-block' : ''}`}
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content text-center p-4">
              <div className="modal-body">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="sr-only">Carregando...</span>
                </div>
                <h5 className="modal-title mb-2">Processando item...</h5>
                <p>
                  <strong>Processando: {itemprocessa}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BrowseEquip;
