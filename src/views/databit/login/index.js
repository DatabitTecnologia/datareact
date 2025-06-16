import React from 'react';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import Parceiro from './parceiro';

const Login = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper aut-bg-img-side cotainer-fiuid align-items-stretch">
        <div className="row align-items-center w-100 align-items-stretch bg-white" style={{ marginRight: '2em' }}>
          <div
            className="d-none d-lg-flex"
            style={{
              backgroundImage: `url(data:image/png;base64,${sessionStorage.getItem('splash')})`,
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center'
            }}
          ></div>
        </div>
        <div className="col-lg-2.1 align-items-stret h-100 align-items-center d-flex justify-content-center">
          <div className="card center-login">
            <div className="card-body text-center">
              <div>
                <img
                  className="b-logo-login"
                  src={`data:image/jpeg;base64,${sessionStorage.getItem('logo')}`}
                  alt="Logo"
                  width={'310px'}
                  height={'129px'}
                />
              </div>
              <Parceiro />
              <div className="site-databit">
                <a className="fa-xs" href="https://www.databit.com.br/" target="blank">
                  Copyright © 2024 by DataBit Tecnologia e Sistemas LTDA. All rights reserved
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
