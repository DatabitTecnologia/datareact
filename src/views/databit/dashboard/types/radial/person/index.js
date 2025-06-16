import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { getRandomColor } from '../../../../../../utils/color';

const RadialPerson = (props) => {
  const { config, columns, series, labels } = props;
  const [infor, setInfor] = useState();

  useEffect(() => {
    const seriesfim = series.sort((a, b) => a.id - b.id);
    let listcor = [];
    columns.forEach((col) => {
      listcor = listcor.concat(getRandomColor());
    });
    let total = 0;
    seriesfim[0].data.forEach((val) => {
      total += val;
    });
    setInfor({
      series: seriesfim[0].data,
      options: {
        series: seriesfim[0].data,
        chart: {
          height: config.height,
          width: config.width,
          type: 'radialBar',
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
        dataLabels: {
          enabled: labels,
          formatter: (val, opts) => {
            const seriesIndex = opts.seriesIndex;
            const value = opts.w.config.series[seriesIndex];
            return value;
          }
        },
        labels: columns,
        colors: listcor,
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                show: false
              }
            },
            barLabels: {
              enabled: true,
              useSeriesColors: true,
              offsetX: -8,
              fontSize: '16px',
              formatter: function (seriesName, opts) {
                return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
              }
            }
          }
        },
        fill: {
          type: 'gradient'
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false
              }
            }
          }
        ]
      }
    });
  }, [series, labels]);

  return (
    <React.Fragment>
      <div>
        <Row id="chart">
          {infor !== undefined ? (
            <ReactApexChart options={infor.options} series={infor.series} type="radialBar" height={config.height} width={config.width} />
          ) : (
            <></>
          )}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default RadialPerson;
