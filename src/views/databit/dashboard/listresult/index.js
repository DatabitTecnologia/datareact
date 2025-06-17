import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalBody } from 'react-bootstrap';
import AGGrid from '../../../../components/AGGrid';
import ReportOptions from '../../../../components/Report/options';

const DashboardListResult = (props) => {
  const { report } = props;
  const { resutlist, setResultlist } = props;
  const { colresult, setColresult } = props;
  const [aggregate, setAggregate] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [columnsvisible, setColumnsvisible] = React.useState([]);
  const [carregando, setCarregando] = React.useState(false);
  const [showprint, setShowprint] = useState(false);
  const handleCloseprint = () => setShowprint(false);

  useEffect(() => {
    if (colresult !== undefined && colresult.length > 0) {
      setCarregando(true);
      let tmpaggregate = {};
      colresult.forEach((col) => {
        if (col.type === 'number') {
          tmpaggregate[col.field] = 'sum';
          col['decimal'] = 2;
        }
      });
      setColumns([...colresult]);
      setAggregate(tmpaggregate);
      setCarregando(false);
    }
  }, [colresult]);

  return (
    <React.Fragment>
      <div id="frmdashlst" name="frmdashqlist">
        <Row>
          <AGGrid
            width="100%"
            height="500px"
            rows={resutlist}
            columns={columns}
            aggregate={aggregate}
            disableid={true}
            loading={carregando}
            columnsvisible={columnsvisible}
            setColumnsvisible={(data) => setColumnsvisible(data)}
          ></AGGrid>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DashboardListResult;
