import React, { useContext, useEffect } from 'react';

import { ConfigContext } from '../../../contexts/ConfigContext';
import useWindowSize from '../../../hooks/useWindowSize';

import NavLogo from './NavLogo';
import NavContent from './NavContent';
import { onMenu } from '../../../api/apiconnect';
import { apiList } from '../../../api/crudapi';
import { Decode64 } from '../../../utils/crypto';

const Navigation = (props) => {
  const configContext = useContext(ConfigContext);
  const { filtermenu, setFiltermenu } = props;
  const { loadingmenu, setLoadingmenu } = props;
  const {
    layout,
    layoutType,
    navFixedLayout,
    collapseMenu,
    rtlLayout,
    boxLayout,
    subLayout,
    navBackColor,
    navDropdownIcon,
    navBrandColor,
    navListIcon,
    navActiveListColor,
    navListTitleColor,
    navBackImage,
    navIconColor,
    navListTitleHide,
    layout6Background,
    layout6BackSize
  } = configContext.state;
  const windowSize = useWindowSize();

  const [menuuser, setMenuuser] = React.useState([]);

  const CreateMenu = () => {
    let itemsmenu = [];
    apiList('Permissao', '*', '', "TB00037_USER = '" + Decode64(sessionStorage.getItem('user')) + "' ").then((response) => {
      if (response.status === 200) {
        let permissions = response.data;
        let modules = '';
        permissions.forEach((element) => {
          modules = modules + element.tabela + ',';
        });
        onMenu(
          Decode64(sessionStorage.getItem('urlconnect')),
          Decode64(sessionStorage.getItem('system')),
          modules,
          filtermenu,
          Decode64(sessionStorage.getItem('user')) === 'S',
          false
        ).then((response) => {
          if (response.status === 200) {
            let value = response.data;

            let menus = '';
            if (value !== undefined && value.length > 0) {
              let item = {
                children: []
              };
              let item2 = {};
              let children = [];
              value.forEach((menu) => {
                if (!menus.includes(menu.ord + '*')) {
                  item = {
                    children: []
                  };
                  item2 = {};
                  children = [];
                  item['id'] = menu.name;
                  item['title'] = menu.title;
                  item['type'] = 'group';

                  if (menu.qtsub === 1) {
                    item2['id'] = menu.name;
                    item2['title'] = menu.title;
                    item2['type'] = 'item';
                    item2['url'] = menu.url;
                    item2['classes'] = 'item';
                    item2['icon'] = menu.icon;
                  } else {
                    let value2 = value.filter((valor) => valor.name === menu.name);
                    value2.forEach((submenu, index) => {
                      if (index === 0) {
                        item2['id'] = submenu.name;
                        item2['title'] = submenu.title;
                        item2['type'] = 'collapse';
                        item2['icon'] = submenu.icon;
                        item2['children'] = [];
                      }
                      let item3 = {};
                      item3['id'] = submenu.namesubmenu;
                      item3['title'] = submenu.titlesubmenu;
                      item3['type'] = 'item';
                      item3['url'] = submenu.url;
                      item2['children'] = item2['children'].concat(item3);
                    });
                  }
                  children = children.concat(item2);
                  item.children = item.children.concat(children);
                  itemsmenu = itemsmenu.concat(item);
                  setMenuuser(itemsmenu);
                  menus = menus + '*' + menu.ord + '*';
                  setLoadingmenu(false);
                }
              });
            }
          }
        });
      }
    });
  };

  useEffect(() => {
    CreateMenu();
  }, []);

  useEffect(() => {
    if (loadingmenu) {
      CreateMenu();
    }
  }, [loadingmenu]);

  // const scroll = () => {
  //     if (navFixedLayout && headerFixedLayout === false) {
  //         const main = document.querySelector('.pcoded-navbar');
  //         const el = document.querySelector('.pcoded-navbar.menupos-fixed');
  //         const scrollPosition = window.pageYOffset;
  //         if (scrollPosition > 60) {
  //             el.style.position = 'fixed';
  //             el.style.transition = 'none';
  //             el.style.marginTop = '0';
  //         } else {
  //             main.style.position = 'absolute';
  //             main.style.marginTop = '56px';
  //         }
  //     } else {
  //         document.querySelector('.pcoded-navbar').removeAttribute('style');
  //     }
  // };

  let navClass = [
    'pcoded-navbar'
    //layoutType
  ];

  if (subLayout !== null && subLayout !== '' && subLayout !== 'layout-6' && subLayout !== 'layout-8' && subLayout !== 'horizontal-2') {
    navClass = [...navClass, subLayout];
  } else {
    navClass = [
      ...navClass,
      layoutType,
      navBackColor,
      navBrandColor,
      'drp-icon-' + navDropdownIcon,
      'menu-item-icon-' + navListIcon,
      navActiveListColor,
      navListTitleColor
    ];

    if (navBackImage) {
      navClass = [...navClass, navBackImage];
    }

    if (navIconColor) {
      navClass = [...navClass, 'icon-colored'];
    }

    if (!navFixedLayout && layout !== 'horizontal') {
      navClass = [...navClass, 'menupos-static'];
    }

    if (navListTitleHide) {
      navClass = [...navClass, 'caption-hide'];
    }
  }

  if (layout === 'horizontal') {
    navClass = [...navClass, 'theme-horizontal'];
  }

  if (windowSize.width < 992 && collapseMenu) {
    navClass = [...navClass, 'mob-open'];
  } else if (collapseMenu) {
    navClass = [...navClass, 'navbar-collapsed'];
  }

  if (subLayout === 'layout-6') {
    document.body.classList.add('layout-6');
    document.body.style.backgroundImage = layout6Background;
    document.body.style.backgroundSize = layout6BackSize;
  }

  if (subLayout === 'layout-8') {
    document.body.classList.add('layout-8');
  }

  if (layoutType === 'dark') {
    document.body.classList.add('datta-dark');
  } else {
    document.body.classList.remove('datta-dark');
  }

  if (rtlLayout) {
    document.body.classList.add('datta-rtl');
  } else {
    document.body.classList.remove('datta-rtl');
  }

  if (boxLayout) {
    document.body.classList.add('container');
    document.body.classList.add('box-layout');
  } else {
    document.body.classList.remove('container');
    document.body.classList.remove('box-layout');
  }

  let navStyle;

  let navBarClass = ['navbar-wrapper'];
  if (layout === 'horizontal' && subLayout === 'horizontal-2') {
    navBarClass = [...navBarClass, 'container'];
  }

  let navContent = (
    <div className={navBarClass.join(' ')}>
      <NavLogo />

      <NavContent navigation={menuuser} />
    </div>
  );
  if (windowSize.width < 992) {
    navContent = (
      <div className="navbar-wrapper">
        <NavLogo />
        <NavContent navigation={menuuser} />
      </div>
    );
  }
  return (
    <React.Fragment>
      <nav id={'menusys'} className={navClass.join(' ')} style={navStyle}>
        {navContent}
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
