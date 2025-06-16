import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';

const DynamicChart = (props) => {
  const { config, columns, series, type } = props;
  const [chartData, setChartData] = useState();

  useEffect(() => {
    // Configuração de cores para múltiplas séries
    const sortedSeries = series.sort((a, b) => a.id - b.id);
    const sortedColors = config.colors.sort((a, b) => a.id - b.id).map((cor) => cor.color);

    const commonOptions = {
      chart: {
        height: config.height,
        width: config.width,
        type: type || 'line', // Usa o tipo passado como prop, padrão 'line'
        zoom: { enabled: true },
        toolbar: { show: true },
        ...(type === 'realtime' && {
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800
          }
        })
      },
      colors: sortedColors,
      series: series,
      dataLabels: { enabled: true },
      stroke: { curve: type === 'stepline' ? 'stepline' : 'smooth' },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      markers: { size: type === 'realtime' ? 5 : 1 },
      xaxis: {
        type: type === 'datetime' ? 'datetime' : undefined,
        categories: columns,
        title: { text: config.titlex },
        labels: { show: true }
      },
      yaxis: {
        title: { text: config.titley },
        labels: { show: true }
      }
    };

    // Opções específicas por tipo de gráfico
    const typeSpecificOptions = {
      area: { chart: { type: 'area' }, stroke: { curve: type === 'spline' ? 'smooth' : 'straight' } },
      bar: { chart: { type: 'bar', horizontal: type === 'horizontalBar' }, stacked: type.includes('stacked') },
      pie: { chart: { type: 'pie' }, labels: config.labels || [] },
      donut: { chart: { type: 'donut' }, labels: config.labels || [] },
      radial: { chart: { type: 'radialBar' } },
      line: {},
      mixed: {
        chart: { type: 'line' },
        stroke: { curve: 'smooth' },
        series: [
          { name: 'Column', type: 'column', data: sortedSeries[0]?.data || [] },
          { name: 'Line', type: 'line', data: sortedSeries[1]?.data || [] }
        ]
      }
    };

    // Combina as opções comuns com as específicas do tipo
    const options = { ...commonOptions, ...typeSpecificOptions[type] };
    console.log(options);
    setChartData({ series: sortedSeries, options });
  }, [series, type, config]);

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <React.Fragment>
      <div>
        <Row id="chart">
          {chartData ? (
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type={type || 'line'}
              height={config.height}
              width={config.width}
            />
          ) : null}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DynamicChart;
