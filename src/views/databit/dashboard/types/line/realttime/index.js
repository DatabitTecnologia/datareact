import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';

const LineTime = (props) => {
  const { config, columns, series, labels } = props;
  const [infor, setInfor] = useState();
  const XAXISRANGE = 8588585;
  const [data, setData] = useState([]);
  let lastDate = new Date().getTime();
  const [update, setUpdate] = React.useState(true);
  const [pos, setPos] = React.useState(0);
  const [legend, setLegend] = React.useState([]);

  const grafico = (
    <div>
      <Row id="chart">
        {infor ? (
          <ReactApexChart options={infor.options} series={infor.series} type="line" height={config.height} width={config.width} />
        ) : null}
      </Row>
    </div>
  );

  const getNewSeries = (baseval, yrange) => {
    const newDate = baseval + 3000; // 1 dia em ms
    lastDate = newDate;

    const newData = {
      x: newDate,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    };

    setData((prevData) => [...prevData, newData]);
  };

  useEffect(() => {
    if (series && series.length > 0 && columns && columns.length > 0) {
      const seriesfim = series.sort((a, b) => a.id - b.id);
      const corfim = config.colors.sort((a, b) => a.id - b.id);
      let listcor = corfim.map((cor) => cor.color);

      setInfor({
        series: seriesfim,
        options: {
          chart: {
            height: config.height,
            width: config.width,
            type: 'line',
            id: 'realtime',
            animations: {
              enabled: true,
              easing: 'linear',
              dynamicAnimation: {
                speed: 10000
              }
            },
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
          dataLabels: {
            enabled: true
          },

          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            }
          },
          markers: {
            size: 1, // Tamanho do marcador para destacar o ponto
            colors: ['#3399ff'], // Cor do marcador
            hover: {
              size: 7 // Tamanho do marcador ao passar o mouse
            }
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
          annotations: {
            xaxis: [
              {
                x: columns[pos], // Substitua por um valor exato presente no array `columns`
                borderColor: '#3399ff', // Cor da linha de destaque
                label: {
                  borderColor: '#3399ff',
                  style: {
                    color: '#fff',
                    background: '#3399ff'
                  }
                }
              }
            ]
          },
          yaxis: {
            labels: {
              show: true
            },
            title: {
              text: config.titley
            }
          }
        }
      });
    }

    let tmplegend = columns[pos] + ' | '; // Usando um pipe como separador
    series.forEach((serie) => {
      tmplegend += serie.name + ': ' + serie.data[pos] + ' | '; // Usando um pipe como separador
    });
    setLegend(tmplegend);

    const interval = setInterval(() => {
      getNewSeries(lastDate, { min: 10, max: 90 });
      if (pos === columns.length - 1) {
        setPos(0);
        setUpdate(true);
      } else {
        setPos(pos + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      //setUpdate(false);
    };
  }, [data]);

  useEffect(() => {
    let tmplegend = [];
    tmplegend = tmplegend.concat(columns[pos]);
    series.forEach((serie) => {
      tmplegend = tmplegend.concat(serie.name + ': ' + serie.data[pos]);
    });
    setLegend(tmplegend);
  }, [pos]);

  return (
    <React.Fragment>
      <Row id="chart">
        {infor ? (
          <ReactApexChart options={infor.options} series={infor.series} type="line" height={config.height} width={config.width} />
        ) : null}
      </Row>

      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {legend.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </div>
    </React.Fragment>
  );
};

export default LineTime;
