import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import NavLeft from './NavLeft';
import NavRight from './NavRight';

import { ConfigContext } from '../../../contexts/ConfigContext';
import * as actionType from '../../../store/actions';
import iconclient from '../../../assets/images/databit/dataclient_new2.png';
import iconclient2 from '../../../assets/images/databit/dataclient_new3.png';
import { Decode64 } from '../../../utils/crypto';

const NavBar = (props) => {
  const { filtermenu, setFiltermenu } = props;
  const { loadingmenu, setLoadingmenu } = props;
  const [moreToggle, setMoreToggle] = useState(false);
  const configContext = useContext(ConfigContext);
  const { collapseMenu, headerBackColor, headerFixedLayout, layout, subLayout } = configContext.state;
  const { dispatch } = configContext;

  let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', headerBackColor];
  if (headerFixedLayout && layout === 'vertical') {
    headerClass = [...headerClass, 'headerpos-fixed'];
  }

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  const navToggleHandler = () => {
    dispatch({ type: actionType.COLLAPSE_MENU });
  };

  let moreClass = ['mob-toggler'];
  if (layout === 'horizontal') {
    moreClass = [...moreClass, ''];
  }
  let collapseClass = ['collapse navbar-collapse'];
  if (moreToggle) {
    moreClass = [...moreClass, 'on'];
    collapseClass = [...collapseClass, 'show'];
  }

  let navBar = (
    <React.Fragment>
      <div className="m-header">
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={navToggleHandler}>
          <span />
        </Link>
        <Link to="#" className="b-brand">
          <div>
            <i>
              <img className=".bimg-logo" src={iconclient2} alt="Icone2" />
            </i>
          </div>
          <div className="b-logo">
            <img className=".bimg-logo" src={iconclient} alt="Icone" />
          </div>
        </Link>
        <Link to="#" className={moreClass.join(' ')} onClick={() => setMoreToggle(!moreToggle)}>
          <i className="feather icon-more-vertical" />
        </Link>
      </div>
      <div style={{ justifyContent: 'space-between' }} className={collapseClass.join(' ')}>
        <NavLeft
          filtermenu={filtermenu}
          setFiltermenu={(data) => setFiltermenu(data)}
          loadingmenu={loadingmenu}
          setLoadingmenu={(data) => setLoadingmenu(data)}
        />
        <NavRight />
      </div>
    </React.Fragment>
  );

  if (layout === 'horizontal' && subLayout === 'horizontal-2') {
    navBar = <div className="container">{navBar}</div>;
  }

  return (
    <React.Fragment>
      <header className={headerClass.join(' ')}>{navBar}</header>
    </React.Fragment>
  );
};

export default NavBar;

/*
<div style={{ marginLeft: '10px' }}>
        <h6>
          Empresa : {Decode64(sessionStorage.getItem('enterprise'))} - {Decode64(sessionStorage.getItem('nameenterprise'))}
        </h6>
        <h6>Usuário : {Decode64(sessionStorage.getItem('user'))}</h6>
      </div>

*/
