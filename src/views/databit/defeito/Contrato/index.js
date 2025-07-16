import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { apiUpdate, apiList } from '../../../../api/crudapi';
import AGGrid from '../../../../components/AGGrid';

const Contrato = (props) => {
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columnsselec, setColumnsselec] = React.useState([]);
  const [rowsselect, setRowsselect] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [statusprocessa, setStatusprocessa] = React.useState();
  const [itemselect, setItemselect] = React.useState();
  const [itemselect2, setItemselect2] = React.useState();

  const Filtrar = () => {
    setCarregando(true);

    apiList('Contrato', 'TB02111_CODIGO,TB02111_NOME', '', "TB02111_SITUACAO = 'A' order by TB02111_NOME").then((responseLeft) => {
      if (responseLeft.status === 200) {
        // Repete para buscar os contratos que ja estão selecionados
        apiList(
          'Defeito',
          'TB01048_CONTRATOCODIGO,TB01048_CONTRATONOME',
          '',
          "TB01048_SITUACAO = 'A' AND TB01048_CODIGO = '" + props.statusselec + "' order by TB01048_NOME"
        ).then((responseRight) => {
          if (responseRight.status === 200) {
            const brutoNomeTab = responseRight.data[0]?.contratonome || '';
            const brutoCodTab = responseRight.data[0]?.contratocodigo || '';

            // tirar parênteses e separar os itens
            const parseLista = (texto) => {
              if (!texto || texto.length < 2) return [];
              const semParenteses = texto.trim().replace(/^\(/, '').replace(/\)$/, '');
              return semParenteses
                .split("','")
                .map((s) => s.replace(/^'/, '').replace(/'$/, '').trim())
                .filter((s) => s.length > 0);
            };

            const nomesBrutos = parseLista(brutoNomeTab);
            const codigosSelecionados = parseLista(brutoCodTab);

            const tamanhoMinimo = Math.min(nomesBrutos.length, codigosSelecionados.length);
            const listaSelecionada = [];

            for (let i = 0; i < tamanhoMinimo; i++) {
              const nomeCompleto = nomesBrutos[i];
              listaSelecionada.push({
                nome: nomeCompleto,
                codigo: codigosSelecionados[i]
              });
            }

            setRowsselect(listaSelecionada);

            const codigosSet = new Set(codigosSelecionados.map((c) => c.trim().replace(/^0+/, '')));

            const listaFiltrada = responseLeft.data.filter((item) => {
              const codigoNormalizado = (item.codigo || '').toString().trim().replace(/^0+/, '');
              return !codigosSet.has(codigoNormalizado);
            });

            setRows(listaFiltrada);
          }
          /*  */
        });
      }
    });

    apiList(
      'Defeito',
      'TB01048_CONTRATOCODIGO,TB01048_CONTRATONOME',
      '',
      "TB01048_SITUACAO = 'A' AND TB01048_CODIGO = '" + props.statusselec + "' order by TB01048_NOME"
    ).then((response) => {
      if (response.status === 200) {
        const brutoNomeTab = response.data[0]?.contratonome || '';
        const brutoCodTab = response.data[0]?.contratocodigo || '';

        // Remove parênteses externos
        const parseLista = (texto) => {
          if (!texto || texto.length < 2) return [];
          const semParenteses = texto.trim().replace(/^\(/, '').replace(/\)$/, '');
          return semParenteses
            .split("','")
            .map((s) => s.replace(/^'/, '').replace(/'$/, '').trim())
            .filter((s) => s.length > 0);
        };

        // Parse ambos os campos
        const nomesBrutos = parseLista(brutoNomeTab);
        const codigos = parseLista(brutoCodTab);

        // Corrigir arrays de tamanhos diferentes
        const tamanhoMinimo = Math.min(nomesBrutos.length, codigos.length);

        const listaCombinada = [];
        for (let i = 0; i < tamanhoMinimo; i++) {
          const nomeCompleto = nomesBrutos[i];
          const codigo = codigos[i];

          // nome para exibir (parte depois da barra)
          const partes = nomeCompleto.split('/');

          listaCombinada.push({
            nome: nomeCompleto, // valor completo com barra para salvar
            codigo
          });
        }

        setRowsselect(listaCombinada);
        setCarregando(false);
      }
    });
  };

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 100 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Nome', width: 510 }
    ]);
    setColumnsselec([
      { headerClassName: 'header-list', field: 'codigo', headerName: 'Código', width: 100 },
      { headerClassName: 'header-list', field: 'nome', headerName: 'Nome', width: 510 }
    ]);
    Filtrar();
  }, []);

  const Add = (item) => {
    if (item !== undefined) {
      const rowsbkp1 = rows.slice(0, rows.length);
      const i = rowsbkp1.findIndex((x) => x === item);
      rowsbkp1.splice(i, 1);
      item.id = rowsselect.length + 1;
      const rowsbkp2 = rowsselect.concat(item);
      setRows(rowsbkp1);
      setRowsselect(rowsbkp2);
    }
  };

  const Subtract = (item) => {
    if (item !== undefined) {
      const rowsbkp1 = rowsselect.slice(0, rowsselect.length);
      const i = rowsbkp1.findIndex((x) => x === item);
      rowsbkp1.splice(i, 1);
      item.id = rows.length + 1;
      const rowsbkp2 = rows.concat(item);
      setRows(rowsbkp2);
      setRowsselect(rowsbkp1);
    }
  };

  const Salvar = () => {
    setCarregando(true);
    setStatusprocessa('Gravando informações, aguarde');

    // Pegar lista selecionada
    const nomes = rowsselect.map((item) => item.nome);
    const codigos = rowsselect.map((item) => item.codigo);

    // Monta a string ('A','B','C')
    const nomesSQL = nomes.map((n) => `'${n}'`).join(',');
    const codigosSQL = codigos.map((c) => `'${c}'`).join(',');

    //console.log('nometec:', nomesSQL);
    //console.log('codtec:', codigosSQL);

    // Monta para mandar na api
    const data = {
      codigo: props.statusselec,
      contratonome: nomesSQL,
      contratocodigo: codigosSQL
    };

    // apiUpdate
    apiUpdate('Defeito', data).then((response) => {
      if (response?.status === 200) {
        setStatusprocessa('Operação realizada com Sucesso !');
      } else {
        setStatusprocessa('Falha ao salvar');
      }
      setCarregando(false);
    });
  };

  const clickGrid = (newSelection) => {
    setItemselect(newSelection);
  };

  const dblClickGrid = (newSelection) => {
    Add(newSelection);
  };

  const keyGrid = (newSelection, event) => {
    setItemselect(newSelection);
    if (event.key === 'Enter') {
      Add(newSelection);
    }
  };

  const clickGrid2 = (newSelection) => {
    setItemselect2(newSelection);
  };

  const dblClickGrid2 = (newSelection) => {
    Subtract(newSelection);
  };

  const keyGrid2 = (newSelection, event) => {
    setItemselect2(newSelection);
    if (event.key === 'Enter') {
      Subtract(newSelection);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Button id="btnGravar" className="btn btn-success shadow-2 mb-2" onClick={() => Salvar()}>
            <i className={'feather icon-save'} /> Salvar alterações
          </Button>
          <Button id="btnRefazer" className="btn btn-warning shadow-2 mb-2" onClick={() => Filtrar()}>
            <i className={'feather icon-repeat'} /> Refazer Listagem
          </Button>
        </Col>
      </Row>

      <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
      <Row style={{ display: 'flex', height: '60%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '48%', marginRight: '5px' }}>
            <AGGrid
              width="100%"
              height="460px"
              rows={rows}
              columns={columns}
              loading={carregando}
              onKeyDown={keyGrid}
              onDoubleClick={dblClickGrid}
              onCelClick={clickGrid}
            ></AGGrid>
          </div>
          <div style={{ width: '4%', marginLeft: '13px' }}>
            <Row>
              <Button id="btnAddlist" className="btn-icon" onClick={() => Add(itemselect)}>
                <i className={'feather icon-chevron-right'} />
              </Button>
              <Button id="btnRetlist" className="btn-icon" onClick={() => Subtract(itemselect2)}>
                <i className={'feather icon-chevron-left'} />
              </Button>
            </Row>
          </div>
          <div style={{ width: '48%', marginLeft: '5px' }}>
            <AGGrid
              width="100%"
              height="460px"
              rows={rowsselect}
              columns={columnsselec}
              loading={carregando}
              onKeyDown={keyGrid2}
              onDoubleClick={dblClickGrid2}
              onCelClick={clickGrid2}
            ></AGGrid>
          </div>
        </div>
        <span className="h6">{statusprocessa}</span>
      </Row>
    </React.Fragment>
  );
};

export default Contrato;
