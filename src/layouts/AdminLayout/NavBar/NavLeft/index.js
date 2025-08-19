import React, { useContext, useState, useEffect } from 'react';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DATABIT } from '../../../../config/constant';

import useWindowSize from '../../../../hooks/useWindowSize';
import { ConfigContext } from '../../../../contexts/ConfigContext';
import NavSearch from './NavSearch';

const NavLeft = (props) => {
  const { filtermenu, setFiltermenu } = props;
  const { loadingmenu, setLoadingmenu } = props;
  const windowSize = useWindowSize();
  const [termo, setTermo] = useState('');

  const configContext = useContext(ConfigContext);
  const { rtlLayout } = configContext.state;
  let dropdownAlign = 'start';
  if (rtlLayout) {
    dropdownAlign = 'end';
  }

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }

  const Filtrar = () => {
    setLoadingmenu(true);
  };

  const handleChangefilter = (e) => {
    setFiltermenu(e.target.value);
  };

  return (
    <React.Fragment>
      <Row id="frmprocura" name="frmparceiro" style={{ marginLeft: '15px', marginTop: '03px' }}>
        <Col>
          <input
            id="edtprocurar"
            onChange={(e) => handleChangefilter(e)}
            style={{ width: '320px' }}
            className="form-control"
            placeholder="Opção à procurar"
          />
        </Col>

        <Col style={{ width: '2rem', marginLeft: '-15px' }}>
          <Button
            id="btnSearch"
            value={filtermenu}
            className="btn-icon"
            style={{ color: '#fff', textAlign: 'center' }}
            onClick={(e) => Filtrar()}
          >
            <div role="status">
              <i className={'feather icon-search'} />
            </div>
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default NavLeft;

//<ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}></ListGroup.Item>
//<ListGroup.Item as="li" bsPrefix=" " className="nav-item"></ListGroup.Item>
