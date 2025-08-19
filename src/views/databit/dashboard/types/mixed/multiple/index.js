import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';

const Multiple = (props) => {
  const { config, columns, series, labels } = props;
  const [infor, setInfor] = useState();

  useEffect(() => {
    const seriesfim = series.sort((a, b) => a.id - b.id);
    const corfim = config.colors.sort((a, b) => a.id - b.id);
    let listcor = [];
    let seriesy = [];
    let itemy = {};

    seriesfim.forEach((serie, index) => {
      itemy = {};
      itemy['name'] = serie.name;
      itemy['opposite'] = false;
      itemy['axisTicks'] = {
        show: true
      };
      itemy['axisBorder'] = {
        show: true,
        color: corfim[index].color
      };
      itemy['labels'] = {};
      let style = {
        color: corfim[index].color
      };
      itemy['labels']['style'] = style;
      let title = {
        text: serie.name
      };
      title['style'] = style;
      itemy['title'] = title;
      seriesy = seriesy.concat(itemy);
    });

    console.log(seriesy);
    corfim.forEach((cor) => {
      listcor = listcor.concat(cor.color);
    });

    setInfor({
      series: seriesfim,
      options: {
        chart: {
          height: config.height,
          width: config.width,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          zoom: {
            enabled: true
          },
          toolbar: {
            show: true
          }
        },
        colors: listcor,
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
          curve: 'smooth'
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
        yaxis: seriesy
      }
    });
  }, [series, labels]);

  return (
    <React.Fragment>
      <div>
        <Row id="chart">
          {infor !== undefined ? (
            <ReactApexChart options={infor.options} series={infor.series} type="line" height={config.height} width={config.width} />
          ) : (
            <></>
          )}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Multiple;
