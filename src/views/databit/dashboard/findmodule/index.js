import { apiList } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';

export const findModule = async (module) => {
  let filter = " situacao = 'A' and modulo = '" + module + "' and system = " + Decode64(sessionStorage.getItem('system'));
  if (Decode64(sessionStorage.getItem('admin')) === 'N') {
    filter +=
      " AND EXISTS (SELECT * FROM TB00117 WHERE codigo = TB00117_DASHBOARD AND TB00117_USER = '" +
      Decode64(sessionStorage.getItem('user')) +
      "') ";
  }
  filter += ' order by ordem ';
  return await apiList('DashbordModuleVW', '*', '', filter);
};
