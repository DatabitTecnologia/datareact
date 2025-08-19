import Senha from '../senha';
import React, { useState, useEffect } from 'react';

const Esquecer = () => {
  const [tela, setTela] = useState(0);

  useEffect(() => {
    setTela(0);
  }, []);

  const Enviar = () => {
    setTela(1);
  };

  return (
    <div>
      {tela === 0 ? (
        <div id="divEsquecer">
          <div>
            <p className="mb-2">Recuperação da Senha</p>
          </div>
          <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
            Email de login :
          </p>
          <div className="input-group mb-3">
            <input type="email" id="edtemail" className="form-control" />
          </div>
          <div>
            <button id="btnenviar" onClick={Enviar} className="btn btn-primary shadow-2 mb-5">
              Recuperar Senha
            </button>
          </div>
        </div>
      ) : (
        <Senha parceiro={sessionStorage.getItem('parceiro')} />
      )}
    </div>
  );
};

export default Esquecer;
