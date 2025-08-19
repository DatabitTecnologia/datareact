import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';

const RadialSemicicle = (props) => {
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
          },
          sparkline: {
            enabled: true
          }
        },
        colors: listcor,
        dataLabels: {
          enabled: labels,
          formatter: (val, opts) => {
            const seriesIndex = opts.seriesIndex;
            const value = opts.w.config.series[seriesIndex];
            return value;
          }
        },
        labels: columns,

        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: '#e7e7e7',
              strokeWidth: '97%',
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: '#999',
                opacity: 1,
                blur: 2
              }
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: -2,
                fontSize: '22px'
              }
            }
          }
        },
        grid: {
          padding: {
            top: -10
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91]
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
            <ReactApexChart options={infor.options} series={infor.series} type="radialBar" height={config.height} width={config.width} />
          ) : (
            <></>
          )}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default RadialSemicicle;
