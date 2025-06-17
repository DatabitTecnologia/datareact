import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import AGGrid from '../../../../components/AGGrid';

const DashboardList = (props) => {
  const { series, columns } = props;
  const [rows, setRows] = React.useState([]);
  const [columnslist, setColumnslist] = React.useState([]);
  const [aggregate, setAggregate] = React.useState([]);

  const transformedData = series.map((item, index) => {
    const transformedRow = { id: index + 1, name: item.name };
    columns.forEach((col, index) => {
      transformedRow[col] = item.data[index] || 0;
    });
    return transformedRow;
  });

  useEffect(() => {
    let tmpcolumns = [];
    let tmpaggregate = {};

    tmpcolumns = tmpcolumns.concat({ headerClassName: 'header-list', field: 'name', headerName: 'Legenda', width: 170 });
    columns.forEach((col) => {
      tmpaggregate[col] = 'sum';
      tmpcolumns = tmpcolumns.concat({
        headerClassName: 'header-list',
        field: col,
        headerName: col,
        width: 110,
        type: 'number',
        decimal: 2,
        valueFormatter: (params) => {
          // Formata o valor com separador de milhar
          return new Intl.NumberFormat('pt-BR', { style: 'number' }).format(params.value);
        }
      });
    });
    setAggregate(tmpaggregate);
    setColumnslist(tmpcolumns);
  }, []);

  useEffect(() => {
    setRows(transformedData);
  }, [columnslist]);

  return (
    <React.Fragment>
      <div id="frmdashlst" name="frmdashqlist">
        <Row>
          <AGGrid width="100%" height="600px" rows={rows} columns={columnslist} aggregate={aggregate}></AGGrid>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DashboardList;
