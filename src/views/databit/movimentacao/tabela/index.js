import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import AGGrid from '../../../../components/AGGrid';
import { apiFind, apiExec } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';

const TabelaMov = (props) => {
  const { cabecalho, tablemov, itemselec, selectab } = props;
  const { showtabela, setShowtabela } = props;
  const { tabelaselec, setTabelaselec } = props;
  const { nametabelaselec, setNametabelaselec } = props;
  const [rows, setRows] = React.useState([]);
  const [codcli, setCodcli] = React.useState();
  const [codemp, setCodemp] = React.useState();
  const [tipodesc, setTipodesc] = React.useState();
  const [condpag, setCondpag] = React.useState();
  const [vendacons, setVendacons] = React.useState();
  const [produto, setProduto] = React.useState();
  const [tipo, setTipo] = React.useState(0);
  const [abrir, setAbrir] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);

  useEffect(() => {
    setColumns([
      { headerClassName: 'header-list', field: 'CODIGO', headerName: 'Código', width: 80 },
      { headerClassName: 'header-list', field: 'NOME', headerName: 'Descrição Tabela', width: 530 },
      { headerClassName: 'header-list', field: 'VALOR', headerName: 'Valor', width: 150, type: 'number', decimal: 2 }
    ]);
    setCodemp(cabecalho.codemp);
    setCondpag(cabecalho.condpag);
    setVendacons(cabecalho.vendacons || 'S');
    if (selectab) {
      setProduto(itemselec.produto);
    } else {
      setProduto(itemselec.codigo);
    }
    if (tablemov === 'TB02303') {
      setTipo(cabecalho.tipocli);
      setCodcli(cabecalho.codprospect || cabecalho.codcli);
      apiFind('PrevendaTipo', 'TB01160_TIPODESC', '', "TB01160_CODIGO = '" + cabecalho.tipo + "' ").then((response) => {
        if (response.status === 200) {
          setTipodesc(response.data.tipodesc);
          setAbrir(true);
        }
      });
    } else {
      setTipo(0);
      setCodcli(cabecalho.codcli);
      setTipodesc(cabecalho.tipodesc);
      setAbrir(true);
    }
  }, []);

  useEffect(() => {
    if (abrir) {
      setCarregando(true);
      const sql =
        "exec SP00015 '" +
        codemp +
        "','" +
        produto +
        "','" +
        tipodesc +
        "','" +
        condpag +
        "','" +
        codcli +
        "','" +
        vendacons +
        "','" +
        Decode64(sessionStorage.getItem('user')) +
        "','" +
        tipo +
        "'";
      apiExec(sql, 'S').then((response) => {
        setCarregando(false);
        setRows(response.data);
      });
    }
  }, [abrir]);

  const keyGrid = (newSelection, event) => {
    if (event.key === 'Enter' && selectab) {
      setTabelaselec(newSelection.CODIGO);
      setNametabelaselec(newSelection.NOME);
      setShowtabela(false);
    }
  };

  const dblClickGrid = (newSelection) => {
    if (selectab) {
      setTabelaselec(newSelection.CODIGO);
      setNametabelaselec(newSelection.NOME);
      setShowtabela(false);
    }
  };

  return (
    <React.Fragment>
      <div id="frmtabela" name="frmtabela">
        <Row style={{ marginBottom: '5px' }}>
          <AGGrid
            width="100%"
            height="390px"
            rows={rows}
            columns={columns}
            loading={carregando}
            onKeyDown={keyGrid}
            onDoubleClick={dblClickGrid}
            focus={true}
          ></AGGrid>
        </Row>
        <hr></hr>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Button id="btnCanc" className="btn-success" onClick={(e) => setShowtabela(false)}>
              <i className={'feather icon-x'} /> Fechar
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default TabelaMov;
