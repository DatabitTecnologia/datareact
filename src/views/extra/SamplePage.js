import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Card from '../../components/Card/MainCard';

const SamplePage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={4}>
          <div className="row d-flex align-items-center">
            <button></button>
          </div>
          <Card title="Sidney Sanches" isOption>
            <p>
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&quot;
            </p>
          </Card>
        </Col>
        <Col sm={4}>
          <div className="row d-flex align-items-center">
            <button></button>
          </div>
          <Card title="Sidney Sanches" isOption>
            <p>
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&quot;
            </p>
          </Card>
        </Col>
        <Col sm={5}>
          <Card title="Sidney Sanches" isOption>
            <h6 className="mb-4">Daily Sales</h6>
            <div className="row d-flex align-items-center">
              <div className="col-9">
                <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> $249.95
                </h3>
              </div>

              <div className="col-3 text-right">
                <p className="m-b-0">50%</p>
              </div>
            </div>
            <div className="progress m-t-30" style={{ height: '7px' }}>
              <div
                className="progress-bar progress-c-theme"
                role="progressbar"
                style={{ width: '50%' }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SamplePage;
