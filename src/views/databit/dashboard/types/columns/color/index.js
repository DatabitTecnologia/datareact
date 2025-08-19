import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { getRandomColor } from '../../../../../../utils/color';

const ColumnsColor = (props) => {
  const { config, columns, series, labels } = props;
  const [infor, setInfor] = useState();

  useEffect(() => {
    const seriesfim = series.sort((a, b) => a.id - b.id);
    let listcor = [];
    columns.forEach((col) => {
      listcor = listcor.concat(getRandomColor());
    });

    setInfor({
      series: seriesfim,
      options: {
        chart: {
          height: config.height,
          width: config.width,
          type: 'bar',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          zoom: {
            enabled: false
          },
          toolbar: {
            show: true
          }
        },
        colors: listcor,
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: labels,
          style: {
            fontSize: '12px',
            colors: ['#000'] // Define a cor direta do texto dos dataLabels
          },
          formatter: function (val) {
            // Verifica se o valor é definido e um número válido
            return val !== undefined && !isNaN(val)
              ? val.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              : '0,00'; // Fallback para valor "0,00" caso `val` seja `undefined`
          },
          background: {
            enabled: true,
            foreColor: '#fff' // Se desejar, ajuste também a cor do fundo para dar contraste
          }
        },
        stroke: {
          curve: 'straight'
        },

        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: columns,
          labels: {
            style: {
              colors: listcor,
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          opposite: true,
          labels: {
            show: true
          },
          title: {
            text: config.titley
          }
        },
        legend: {
          show: false
        }
      }
    });
  }, [series, labels]);

  return (
    <React.Fragment>
      <div>
        <Row id="chart">
          {infor !== undefined ? (
            <ReactApexChart options={infor.options} series={infor.series} type="bar" height={config.height} width={config.width} />
          ) : (
            <></>
          )}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ColumnsColor;
