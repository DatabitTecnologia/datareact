import { getInstance } from '../apiinstance';
import { Decode64, Encode64 } from '../../utils/crypto';
import { apiFind, apiGetPicture } from '../crudapi';

export const apiSendEmail = async (enterprise, dest, subject, body, files) => {
  try {
    const apiInstance = getInstance();
    if (enterprise !== null) {
      ConfigEmail(enterprise);
    }
    const params = {
      email: Decode64(sessionStorage.getItem('from')),
      fromname: Decode64(sessionStorage.getItem('fromname')),
      smtp: Decode64(sessionStorage.getItem('smtp')),
      user: Decode64(sessionStorage.getItem('username')),
      password: Decode64(sessionStorage.getItem('ssm')),
      port: sessionStorage.getItem('port'),
      tls: Decode64(sessionStorage.getItem('tls')),
      dest: dest,
      subject: subject,
      body: body,
      files: files,
      userdatabit: Decode64(sessionStorage.getItem('user')),
      signature: sessionStorage.getItem('signature')
    };
    return await apiInstance.post('sendEmail', params);
  } catch (error) {
    //console.log(error);
  }
};

export const apiInvite = async (email, summary, description, location, date, hour) => {
  try {
    const apiInstance = getInstance();
    const params = {
      email: email,
      summary: summary,
      description: description,
      location: location,
      data: date,
      hora: hour
    };
    return await apiInstance.post('createInvite/', params);
  } catch (error) {
    //console.log(error);
  }
};

export const ConfigEmail = (enterprise) => {
  let retorno = false;
  apiFind(
    'Empresa',
    'TB01007_EMAIL,TB01007_SMTP,TB01007_EMPRESA,TB01007_IDENTIFICACAO,TB01007_SENHAEMAIL,TB01007_TIPOAUT,TB01007_TIPOCRIPT,TB01007_PORTA',
    '',
    "TB01007_CODIGO = '" + enterprise + "' "
  ).then((response) => {
    if (response.status === 200) {
      const resultemp = response.data;
      if (
        resultemp.email !== undefined &&
        resultemp.email !== null &&
        resultemp.email !== '' &&
        resultemp.smtp !== undefined &&
        resultemp.smtp !== null &&
        resultemp.smtp !== '' &&
        resultemp.identificacao !== undefined &&
        resultemp.identificacao !== null &&
        resultemp.identificacao !== '' &&
        resultemp.senhaemail !== undefined &&
        resultemp.senhaemail !== null &&
        resultemp.senhaemail !== ''
      ) {
        sessionStorage.setItem('fromname', Encode64(resultemp.empresa));
        sessionStorage.setItem('username', Encode64(resultemp.identificacao));
        sessionStorage.setItem('from', Encode64(resultemp.email));
        sessionStorage.setItem('smtp', Encode64(resultemp.smtp));
        sessionStorage.setItem('ssm', Encode64(resultemp.senhaemail));
        sessionStorage.setItem('port', resultemp.porta);
        if (resultemp.tipocript !== undefined && resultemp.tipocript !== '' && resultemp.tipocript !== null) {
          if (parseInt(resultemp.tipocript) === 3) {
            sessionStorage.setItem('tls', Encode64('1'));
          } else {
            sessionStorage.setItem('tls', Encode64('0'));
          }
        } else {
          sessionStorage.setItem('tls', Encode64('0'));
        }
        retorno = true;
        apiGetPicture('TB01007', 'TB01007_CODIGO', 'TB01007_ASS', enterprise).then((response) => {
          if (response.status === 200) {
            sessionStorage.setItem('signature', response.data[0].picture);
          }
        });
      } else {
        apiFind(
          'Usuario',
          'TB00035_EMAIL,TB00035_SMTP,TB00035_IDENTIFICACAO,TB00035_USUARIO,TB00035_SENHAEMAIL,TB00035_TIPOAUT,TB00035_TIPOCRIPT,TB00035_PORTA',
          '',
          "TB00035_NOME = '" + Decode64(sessionStorage.getItem('user')) + "' "
        ).then((response) => {
          if (response.status === 200) {
            const resultuser = response.data;
            if (
              resultuser.email !== undefined &&
              resultuser.email !== null &&
              resultuser.email !== '' &&
              resultuser.smtp !== undefined &&
              resultuser.smtp !== null &&
              resultuser.smtp !== '' &&
              resultuser.identificacao !== undefined &&
              resultuser.identificacao !== null &&
              resultuser.identificacao !== '' &&
              resultuser.senhaemail !== undefined &&
              resultuser.senhaemail !== null &&
              resultuser.senhaemail !== ''
            ) {
              sessionStorage.setItem('fromname', Encode64(resultuser.identificacao));
              sessionStorage.setItem('username', Encode64(resultuser.usuario));
              sessionStorage.setItem('from', Encode64(resultuser.email));
              sessionStorage.setItem('smtp', Encode64(resultuser.smtp));
              sessionStorage.setItem('ssm', Encode64(resultuser.senhaemail));
              sessionStorage.setItem('port', resultuser.porta);
              if (resultuser.tipocript !== undefined && resultuser.tipocript !== '' && resultuser.tipocript !== null) {
                if (parseInt(resultuser.tipocript) === 3) {
                  sessionStorage.setItem('tls', Encode64('1'));
                } else {
                  sessionStorage.setItem('tls', Encode64('0'));
                }
              } else {
                sessionStorage.setItem('tls', Encode64('0'));
              }
              retorno = true;
              apiGetPicture('TB00035', 'TB00035_NOME', 'TB00035_ASS', Decode64(sessionStorage.getItem('user'))).then((response) => {
                if (response.status === 200) {
                  sessionStorage.setItem('signature', response.data[0].picture);
                }
              });
            } else {
              apiFind(
                'Config',
                'TB00040_EMAILCOTACAO,TB00040_SMTP,TB00040_IDENTIFICACAO,TB00040_USUARIO,TB00040_TIPOAUT,TB00040_TIPOCRIPT,TB00040_SENHA,TB00040_PORTA',
                '',
                "TB00040_TERMINAL = '180B1D3A373FDC4BCF6EF979' "
              ).then((response) => {
                if (response.status === 200) {
                  const resultconfig = response.data;
                  if (
                    resultconfig.emailcotacao !== undefined &&
                    resultconfig.emailcotacao !== null &&
                    resultconfig.emailcotacao !== '' &&
                    resultconfig.smtp !== undefined &&
                    resultconfig.smtp !== null &&
                    resultconfig.smtp !== '' &&
                    resultconfig.identificacao !== undefined &&
                    resultconfig.identificacao !== null &&
                    resultconfig.identificacao !== '' &&
                    resultconfig.senha !== undefined &&
                    resultconfig.senha !== null &&
                    resultconfig.senha !== ''
                  ) {
                    sessionStorage.setItem('fromname', Encode64(resultconfig.identificacao));
                    sessionStorage.setItem('username', Encode64(resultconfig.usuario));
                    sessionStorage.setItem('from', Encode64(resultconfig.emailcotacao));
                    sessionStorage.setItem('smtp', Encode64(resultconfig.smtp));
                    sessionStorage.setItem('ssm', Encode64(resultconfig.senha));
                    sessionStorage.setItem('port', resultconfig.porta);
                    if (resultconfig.tipocript !== undefined && resultconfig.tipocript !== '' && resultconfig.tipocript !== null) {
                      if (parseInt(resultconfig.tipocript) === 3) {
                        sessionStorage.setItem('tls', Encode64('1'));
                      } else {
                        sessionStorage.setItem('tls', Encode64('0'));
                      }
                    } else {
                      sessionStorage.setItem('tls', Encode64('0'));
                    }
                    retorno = true;
                    apiGetPicture('TB00040', 'TB00040_TERMINAL', 'TB00040_ASS', '180B1D3A373FDC4BCF6EF979').then((response) => {
                      if (response.status === 200) {
                        sessionStorage.setItem('signature', response.data[0].picture);
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    }
  });
  return retorno;
};
