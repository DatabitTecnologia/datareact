import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { findModule } from '../findmodule';
import DashboardViewer from '../viewer';

const DashboardFind = (props) => {
  const { module, principal } = props;
  const [dashboards, setDashboards] = React.useState([]);
  const { showdash, setShowdash } = props;
  const [scrollEl, setScrollEl] = React.useState();

  useEffect(() => {
    findModule(module).then((response) => {
      setDashboards(response.data);
    });
  }, []);

  return (
    <React.Fragment>
      <div id="frmdashitens" name="frmdashitens">
        <PerfectScrollbar
          containerRef={(ref) => {
            setScrollEl(ref);
          }}
          style={{ height: '705px' }}
        >
          {dashboards !== undefined && dashboards.length > 0 ? (
            <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
              {dashboards.map((dashboard, index) => {
                return <DashboardViewer key={index} dashboard={dashboard}></DashboardViewer>;
              })}
            </Row>
          ) : (
            <></>
          )}
        </PerfectScrollbar>
        {!principal ? <hr></hr> : <></>}
        {!principal ? (
          <Row style={{ textAlign: 'right' }}>
            <Col>
              <Button id="btnCancelar" className="btn btn-success shadow-2 mb-2" onClick={() => setShowdash(false)}>
                <i className={'feather icon-x'} />
                Sair
              </Button>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
};

export default DashboardFind;
