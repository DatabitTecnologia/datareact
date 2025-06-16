import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { getRandomColor } from '../../../../../../utils/color';

const BarColor = (props) => {
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
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return columns[opt.dataPointIndex] + ':  ' + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
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
            show: true
          },
          title: {
            text: config.titlex
          }
        },
        yaxis: {
          opposite: false,
          labels: {
            show: false
          },
          title: {
            text: config.titley
          }
        },
        legend: {
          horizontalAlign: 'center'
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return '';
              }
            }
          }
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

export default BarColor;
