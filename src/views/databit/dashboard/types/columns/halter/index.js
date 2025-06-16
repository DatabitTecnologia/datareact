import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';

const ColumnsHalter = (props) => {
  const { config, columns, series, labels } = props;
  const [infor, setInfor] = useState();

  useEffect(() => {
    const seriesfim = series.sort((a, b) => a.id - b.id);
    const corfim = config.colors.sort((a, b) => a.id - b.id);
    let listcor = [];
    corfim.forEach((cor) => {
      listcor = listcor.concat(cor.color);
    });
    setInfor({
      series: seriesfim,
      options: {
        chart: {
          height: config.height,
          width: config.width,
          type: 'rangeBar',
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
            isDumbbell: true,
            columnWidth: 5,
            dumbbellColors: [listcor]
          }
        },
        dataLabels: {
          enabled: labels,
          style: {
            fontSize: '12px',
            colors: ['#000'] // Define a cor direta do texto dos dataLabels
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
          },
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: columns,
          tickPlacement: 'on',
          labels: {
            show: true
          },
          title: {
            text: config.titlex
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
          show: true,
          showForSingleSeries: true,
          position: 'top',
          horizontalAlign: 'left'
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

export default ColumnsHalter;
