import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Chart from 'react-apexcharts';

const LineZoom = (props) => {
  const { title, height, typeheight, width, typewidth, values, columns, legendX, legendY, colors, querys, help } = props;
  const [chartData, setChatData] = React.useState(undefined);
  const [heightfim, setHeightfim] = React.useState('');
  const [widthfim, setWidthfim] = React.useState('');
  const [carregando, setCarregando] = React.useState(false);

  useEffect(() => {
    let h = height;
    let w = width;

    if (parseInt(typeheight) === 0) {
      h = h + 'px';
    } else {
      h = h + '%';
    }
    if (parseInt(typewidth) === 0) {
      w = w + 'px';
    } else {
      w = w + '%';
    }
    setChatData({
      series: values,
      options: {
        chart: {
          height: h,
          width: w,
          type: 'area',
          stacked: false,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        colors: colors,
        dataLabels: {
          enabled: labels,
          formatter: function (val) {
            // Verifica se o valor é definido e um número válido
            return val !== undefined && !isNaN(val)
              ? val.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              : '0,00'; // Fallback para valor "0,00" caso `val` seja `undefined`
          }
        },
        stroke: {
          curve: 'smooth'
        },
        markers: {
          size: 0
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          }
        },
        markers: {
          size: 4 // Tamanho dos pontos nas séries
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          type: 'datetime'
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0);
            }
          }
        },
        yaxis: {
          labels: {
            show: true,
            formatter: function (val) {
              return (val / 1000000).toFixed(0);
            }
          },
          title: {
            text: legendY,
            style: {
              fontSize: '15px'
            }
          }
        }
      }
    });
    setHeightfim(h);
    setWidthfim(w);
  }, []);

  return (
    <React.Fragment>
      <div id="frmline" name="frmline">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>

        <Card className="Recent-Users" style={{ marginBottom: '2px' }}>
          <Card.Header>
            <Card.Title as="h5">{title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row style={{ textAlign: 'right', marginBottom: '5px' }}>
              <Col>
                <Button id="btnFiltrar" className="btn-icon btn-primary">
                  <i className={'feather icon-filter'} />
                </Button>
                <Button id="btnList" className="btn-icon btn-success">
                  <i className={'feather icon-list'} />
                </Button>
                <Button id="btnHelp" className="btn-icon btn-warning">
                  <i className={'feather icon-help-circle'} />
                </Button>
              </Col>
            </Row>
            <Row>
              {chartData !== undefined ? (
                <Chart options={chartData.options} series={chartData.series} type="area" height={heightfim} width={widthfim} />
              ) : (
                <></>
              )}
            </Row>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default LineZoom;
