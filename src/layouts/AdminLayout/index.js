import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';

import useWindowSize from '../../hooks/useWindowSize';
import useOutsideClick from '../../hooks/useOutsideClick';
import { ConfigContext } from '../../contexts/ConfigContext';
import * as actionType from '../../store/actions';

const AdminLayout = ({ children }) => {
  const windowSize = useWindowSize();
  const ref = useRef();
  const configContext = useContext(ConfigContext);
  const [loadingmenu, setLoadingmenu] = useState(false);
  const [filtermenu, setFiltermenu] = useState('');

  const { collapseMenu, layout, subLayout, headerFixedLayout, configBlock } = configContext.state;
  const { dispatch } = configContext;

  useOutsideClick(ref, () => {
    if (collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  });

  useEffect(() => {
    if (windowSize.width > 992 && windowSize.width <= 1024 && layout !== 'horizontal') {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }

    if (layout === 'horizontal' && windowSize.width < 992) {
      dispatch({ type: actionType.CHANGE_LAYOUT, layout: 'vertical' });
    }
  }, [dispatch, layout, windowSize]);

  const mobileOutClickHandler = () => {
    if (windowSize.width < 992 && collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  };

  let mainClass = ['pcoded-wrapper'];
  if (layout === 'horizontal' && subLayout === 'horizontal-2') {
    mainClass = [...mainClass, 'container'];
  }

  let common = (
    <React.Fragment>
      <Navigation
        filtermenu={filtermenu}
        setFiltermenu={(data) => setFiltermenu(data)}
        loadingmenu={loadingmenu}
        setLoadingmenu={(data) => setLoadingmenu(data)}
      />
      <NavBar
        filtermenu={filtermenu}
        setFiltermenu={(data) => setFiltermenu(data)}
        loadingmenu={loadingmenu}
        setLoadingmenu={(data) => setLoadingmenu(data)}
      />
    </React.Fragment>
  );

  let mainContainer = (
    <React.Fragment>
      <div className="pcoded-main-container">
        <div className={mainClass.join(' ')}>
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <Breadcrumb />
              {children}
            </div>
          </div>
          <footer id="rodape" className="rodape fa-sm">
            <div className="site-databit">
              <span className="fa-db">Copyright © 2024 by DataBit Tecnologia e Sistemas LTDA. All rights reserved</span>
            </div>
            <div className="midias-sociais">
              <span className="fa-db"> Acesse:</span>
              <a target="blank" href="https://www.databit.com.br/">
                <i className="feather icon-home fa-db text-muted icon-media "></i>
              </a>
              <a target="blank" href="mailto:sac@databit.com.br?subject=SendMail&body=">
                <i className="feather icon-mail fa-db text-muted icon-media "></i>
              </a>
              <a target="blank" href="https://www.facebook.com/databitbh/">
                <i className="feather icon-facebook fa-db text-muted icon-media "></i>
              </a>
              <a target="blank" href="https://www.instagram.com/databit.oficial/">
                <i className="feather icon-instagram fa-db text-muted icon-media "></i>
              </a>
              <a target="blank" href="https://www.youtube.com/channel/UC1U62hUG7LxuCn7w80AsqEw/videos">
                <i className="feather icon-video fa-db text-muted icon-media "></i>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );

  if (windowSize.width < 992) {
    let outSideClass = ['nav-outside'];
    if (collapseMenu) {
      outSideClass = [...outSideClass, 'mob-backdrop'];
    }
    if (headerFixedLayout) {
      outSideClass = [...outSideClass, 'mob-fixed'];
    }

    common = (
      <div className={outSideClass.join(' ')} ref={ref}>
        {common}
      </div>
    );

    mainContainer = (
      <div
        role="button"
        tabIndex="0"
        className="pcoded-outside"
        onClick={() => mobileOutClickHandler}
        onKeyDown={() => mobileOutClickHandler}
      >
        {mainContainer}
      </div>
    );
  }

  return (
    <React.Fragment>
      {common}
      {mainContainer}
      {configBlock}
    </React.Fragment>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node
};

export default AdminLayout;
