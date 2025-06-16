import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import Chart from 'react-apexcharts';

const LineBasic = (props) => {
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
          type: 'line',
          zoom: {
            enabled: true
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
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          }
        },
        markers: {
          size: 4
        },
        tooltip: {
          shared: true, // Tooltip compartilhado entre as linhas
          intersect: false
        },
        xaxis: {
          categories: columns,
          labels: {
            show: true
          },
          title: {
            text: legendX,
            style: {
              fontSize: '15px'
            }
          }
        },
        yaxis: {
          labels: {
            show: true
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
                <Chart options={chartData.options} series={chartData.series} type="line" height={heightfim} width={widthfim} />
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

export default LineBasic;
