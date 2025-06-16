import React, { useEffect, useState } from 'react';
import LineBasic from '../../../Line/Basic';

const DashTestLineBasic = (props) => {
  const valores = [
    {
      name: 'Vendas 2022',
      data: [3, 90, 77, 11, 21, 111, 37, 97, 4]
    },
    {
      name: 'Vendas 2023',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    },
    {
      name: 'Vendas 2024',
      data: [20, 29, 37, 36, 44, 45, 50, 58, 74]
    }
  ];

  const colors = ['#ffff00', '#3399ff', '#33FF57'];

  const colums = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  return (
    <React.Fragment>
      <div>
        <LineBasic
          title="Grafico de Teste"
          height="500"
          typeheight="0"
          width="100"
          typewidth="1"
          values={valores}
          columns={colums}
          colors={colors}
          legendX="Meses"
          legendY="Quantidade Vendida"
          querys=""
          help="Teste Help"
        ></LineBasic>
      </div>
    </React.Fragment>
  );
};

export default DashTestLineBasic;
