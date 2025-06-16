import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

// auth provider
import { JWTProvider as AuthProvider } from './contexts/JWTContext';

import routes, { renderRoutes } from './routes';
//import { LicenseInfo } from '@mui/x-license';
import { DATABIT } from './config/constant';
import { Encode64, Decode64 } from './utils/crypto';
import { checkFileExists } from './utils/file';
import { getImage } from './api/apiconnect';
import { getBrowserId } from './utils/browser';
import { setUser as apiSetUser } from './api/apiconnect';
import { delUser as apiDelUser } from './api/apiconnect';

function changeFavicon(base64Icon) {
  const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
  favicon.rel = 'icon';
  favicon.href = base64Icon;
  if (!document.head.contains(favicon)) {
    document.head.appendChild(favicon);
  }
}

const App = () => {
  const [startscreen, setStartscreen] = useState(false);
  const [startconfig, setStartconfig] = useState(false);

  const setUser = (urlConnect, system, codDatabit, user, idBrowser, ipAddress, admin) => {
    try {
      if (user && admin === 'N' && DATABIT.islogged) {
        apiSetUser(urlConnect, system, codDatabit, user, idBrowser, ipAddress)
          .then((response) => {
            if (response.status === 200) {
              //console.log('Requisição bem-sucedida.');
            }
          })
          .catch((err) => console.error('Erro na requisição:', err));
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const delUser = (urlConnect, system, codDatabit, user, idBrowser, ipAddress, admin) => {
    try {
      if (user && admin === 'N') {
        apiDelUser(urlConnect, system, codDatabit, user, idBrowser, ipAddress)
          .then((response) => {
            if (response.status === 200) {
              //console.log('Requisição bem-sucedida.');
            }
          })
          .catch((err) => console.error('Erro na requisição:', err));
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    const configUrl = `${process.env.PUBLIC_URL}/config.json`;
    checkFileExists(configUrl).then((exists) => {
      if (exists) {
        fetch(configUrl)
          .then((response) => response.json())
          .then((data) => {
            //LicenseInfo.setLicenseKey(data.licensedatagrid);
            localStorage.setItem('apikey_maps', Encode64(data.apikey_maps));
            localStorage.setItem('client_token_whats', Encode64(data.client_token_whats));
            localStorage.setItem('licensedatagrid', Encode64(data.licensedatagrid));
            sessionStorage.setItem('system', Encode64(data.system.toString()));
            sessionStorage.setItem('ambiente', Encode64(data.ambiente.toString()));
            sessionStorage.setItem('urlconnect', Encode64(data.urlconnect));
            sessionStorage.setItem('version', Encode64(data.version));
            sessionStorage.setItem('dateversion', Encode64(data.dateversion));
            sessionStorage.setItem('cdu', Encode64(data.cdu));
            DATABIT.islogged = false;

            getBrowserId().then((response) => {
              let id = localStorage.getItem('idbrowser');
              if (!id) {
                localStorage.setItem('idbrowser', Encode64(response.visitorId));
              }
            });
            setStartconfig(true);
          })
          .catch((error) => console.error('Erro ao carregar o arquivo JSON:', error));
      } else {
        console.log('O arquivo não existe.');
      }
    });
  }, []);

  useEffect(() => {
    if (startconfig) {
      getImage(Decode64(sessionStorage.getItem('urlconnect')), parseInt(Decode64(sessionStorage.getItem('system')))).then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem('system', Encode64(response.data[0].id.toString()));
          sessionStorage.setItem('namesystem', Encode64(response.data[0].name));
          sessionStorage.setItem('descriptionsystem', Encode64(response.data[0].description));
          sessionStorage.setItem('logo', response.data[0].logo);
          sessionStorage.setItem('logoaux', response.data[0].logoaux);
          sessionStorage.setItem('icon', response.data[0].icon);
          sessionStorage.setItem('splash', response.data[0].splash);
          document.title = 'Sistema ' + response.data[0].name + ' by Databit®';
          changeFavicon('data:image/png;base64,' + response.data[0].icon);
          setStartscreen(true);
        }
      });
    }
  }, [startconfig]);

  useEffect(() => {
    if (startscreen) {
      const handleBeforeUnload = (event) => {
        try {
          delUser(
            Decode64(sessionStorage.getItem('urlconnect')),
            Decode64(sessionStorage.getItem('system')),
            Decode64(sessionStorage.getItem('coddatabit')),
            Decode64(sessionStorage.getItem('user')),
            Decode64(localStorage.getItem('idbrowser')),
            sessionStorage.getItem('ipaddress'),
            Decode64(sessionStorage.getItem('admin'))
          ).then((response) => {
            if (response.status === 200) {
              event.preventDefault();
              event.returnValue = '';
            }
          });
        } catch (error) {
          console.log(error);
          event.preventDefault();
          event.returnValue = '';
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      const intervalId = setInterval(() => {
        setUser(
          Decode64(sessionStorage.getItem('urlconnect')),
          Decode64(sessionStorage.getItem('system')),
          Decode64(sessionStorage.getItem('coddatabit')),
          Decode64(sessionStorage.getItem('user')),
          Decode64(localStorage.getItem('idbrowser')),
          sessionStorage.getItem('ipaddress'),
          Decode64(sessionStorage.getItem('admin'))
        );
      }, 10000);

      return () => {
        clearInterval(intervalId);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [startscreen]);

  return (
    <React.Fragment>
      {startscreen ? (
        <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
          <AuthProvider>{renderRoutes(routes)}</AuthProvider>
        </BrowserRouter>
      ) : null}
    </React.Fragment>
  );
};

export default App;
