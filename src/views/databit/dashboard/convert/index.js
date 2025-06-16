import React, { useEffect, useState } from 'react';
import LineBasic from '../types/line/basic';
import LineZoom from '../types/line/zoom';
import LineNull from '../types/line/null';
import LineTime from '../types/line/realttime';
import LineStepline from '../types/line/stepline';
import AreaBasic from '../types/area/basic';
import AreaSpline from '../types/area/spline';
import AreaDatetime from '../types/area/datetime';
import AreaStacked from '../types/area/stacked';
import AreaIrregular from '../types/area/irregular';
import AreaNull from '../types/area/null';
import ColumnsBasic from '../types/columns/basic';
import ColumnsLabel from '../types/columns/label';
import ColumnsStacked from '../types/columns/stacked';
import ColumnsStackedAll from '../types/columns/stackedall';
import ColumnsHalter from '../types/columns/halter';
import ColumnsRotule from '../types/columns/rotule';
import ColumnsRotated from '../types/columns/rotated';
import ColumnsColor from '../types/columns/color';
import BarBasic from '../types/bar/basic';
import BarGrouped from '../types/bar/grouped';
import BarStacked from '../types/bar/stacked';
import BarStackedAll from '../types/bar/stackedall';
import BarReverse from '../types/bar/reverse';
import BarColor from '../types/bar/color';
import LineColumn from '../types/mixed/linecolumn';
import Multiple from '../types/mixed/multiple';
import LineArea from '../types/mixed/linearea';
import LineColumnArea from '../types/mixed/linecolumnarea';
import Pie from '../types/pie/basic';
import Donut from '../types/pie/donut';
import RadialBasic from '../types/radial/basic';
import RadialMultiple from '../types/radial/multiple';
import RadialPerson from '../types/radial/person';
import RadialGradient from '../types/radial/gradient';
import RadialStroked from '../types/radial/stroked';
import RadialSemicicle from '../types/radial/semicircle';
import Cards from '../types/cards';

const DashboardConvert = (props) => {
  const { config, columns, series, labels } = props;
  const [columnsfim, setColumnsfim] = React.useState([]);

  useEffect(() => {
    let tmpcolumns = [...new Set(columns)];
    tmpcolumns = tmpcolumns.sort((a, b) => a - b);
    if (config.type === 3 || config.type === 10) {
      let tmpcolumns2 = [];
      tmpcolumns.forEach((column) => {
        const monthStr = column.substr(0, 3);
        const day = parseInt(column.substr(4, 2).trim());
        const year = parseInt(column.substr(7, 4));
        tmpcolumns2 = tmpcolumns2.concat(day + '/' + monthStr + '/' + year);
      });
      tmpcolumns2 = [...new Set(tmpcolumns2)];
      setColumnsfim(tmpcolumns2);
    } else {
      setColumnsfim(tmpcolumns);
    }
  }, [columns, labels]);

  return (
    <React.Fragment>
      <div>
        {config.type === 1 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <LineBasic config={config} columns={columnsfim} series={series} labels={labels}></LineBasic>
        ) : (
          <></>
        )}
        {config.type === 3 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <LineZoom config={config} columns={columnsfim} series={series} labels={labels}></LineZoom>
        ) : (
          <></>
        )}
        {config.type === 5 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <LineNull config={config} columns={columnsfim} series={series} labels={labels}></LineNull>
        ) : (
          <></>
        )}
        {config.type === 6 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <LineTime config={config} columns={columnsfim} series={series} labels={labels}></LineTime>
        ) : (
          <></>
        )}
        {config.type === 7 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <LineStepline config={config} columns={columnsfim} series={series} labels={labels}></LineStepline>
        ) : (
          <></>
        )}
        {config.type === 8 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <AreaBasic config={config} columns={columnsfim} series={series} labels={labels}></AreaBasic>
        ) : (
          <></>
        )}
        {config.type === 9 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <AreaSpline config={config} columns={columnsfim} series={series} labels={labels}></AreaSpline>
        ) : (
          <></>
        )}
        {config.type === 10 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <AreaDatetime config={config} columns={columnsfim} series={series} labels={labels}></AreaDatetime>
        ) : (
          <></>
        )}
        {config.type === 12 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <AreaStacked config={config} columns={columnsfim} series={series} labels={labels}></AreaStacked>
        ) : (
          <></>
        )}
        {config.type === 13 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <AreaIrregular config={config} columns={columnsfim} series={series} labels={labels}></AreaIrregular>
        ) : (
          <></>
        )}
        {config.type === 14 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <AreaNull config={config} columns={columnsfim} series={series} labels={labels}></AreaNull>
        ) : (
          <></>
        )}
        {config.type === 15 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <ColumnsBasic config={config} columns={columnsfim} series={series} labels={labels}></ColumnsBasic>
        ) : (
          <></>
        )}
        {config.type === 16 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <ColumnsLabel config={config} columns={columnsfim} series={series} labels={labels}></ColumnsLabel>
        ) : (
          <></>
        )}
        {config.type === 17 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <ColumnsStacked config={config} columns={columnsfim} series={series} labels={labels}></ColumnsStacked>
        ) : (
          <></>
        )}
        {config.type === 18 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <ColumnsStackedAll config={config} columns={columnsfim} series={series} labels={labels}></ColumnsStackedAll>
        ) : (
          <></>
        )}
        {config.type === 19 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <ColumnsHalter config={config} columns={columnsfim} series={series} labels={labels}></ColumnsHalter>
        ) : (
          <></>
        )}
        {config.type === 20 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <ColumnsRotule config={config} columns={columnsfim} series={series} labels={labels}></ColumnsRotule>
        ) : (
          <></>
        )}
        {config.type === 21 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <ColumnsRotated config={config} columns={columnsfim} series={series} labels={labels}></ColumnsRotated>
        ) : (
          <></>
        )}
        {config.type === 22 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <ColumnsColor config={config} columns={columnsfim} series={series} labels={labels}></ColumnsColor>
        ) : (
          <></>
        )}
        {config.type === 23 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <BarBasic config={config} columns={columnsfim} series={series} labels={labels}></BarBasic>
        ) : (
          <></>
        )}
        {config.type === 24 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <BarGrouped config={config} columns={columnsfim} series={series} labels={labels}></BarGrouped>
        ) : (
          <></>
        )}
        {config.type === 25 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <BarStacked config={config} columns={columnsfim} series={series} labels={labels}></BarStacked>
        ) : (
          <></>
        )}
        {config.type === 26 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <BarStackedAll config={config} columns={columnsfim} series={series} labels={labels}></BarStackedAll>
        ) : (
          <></>
        )}
        {config.type === 28 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <BarReverse config={config} columns={columnsfim} series={series} labels={labels}></BarReverse>
        ) : (
          <></>
        )}
        {config.type === 29 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <BarColor config={config} columns={columnsfim} series={series} labels={labels}></BarColor>
        ) : (
          <></>
        )}
        {config.type === 30 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <LineColumn config={config} columns={columnsfim} series={series} labels={labels}></LineColumn>
        ) : (
          <></>
        )}
        {config.type === 31 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <Multiple config={config} columns={columnsfim} series={series} labels={labels}></Multiple>
        ) : (
          <></>
        )}
        {config.type === 32 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <LineArea config={config} columns={columnsfim} series={series} labels={labels}></LineArea>
        ) : (
          <></>
        )}
        {config.type === 33 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <LineColumnArea config={config} columns={columnsfim} series={series} labels={labels}></LineColumnArea>
        ) : (
          <></>
        )}
        {config.type === 34 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <Pie config={config} columns={columnsfim} series={series} labels={labels}></Pie>
        ) : (
          <></>
        )}
        {config.type === 35 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <Donut config={config} columns={columnsfim} series={series} labels={labels}></Donut>
        ) : (
          <></>
        )}
        {config.type === 36 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <RadialBasic config={config} columns={columnsfim} series={series} labels={labels}></RadialBasic>
        ) : (
          <></>
        )}
        {config.type === 37 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <RadialMultiple config={config} columns={columnsfim} series={series} labels={labels}></RadialMultiple>
        ) : (
          <></>
        )}
        {config.type === 38 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <RadialPerson config={config} columns={columnsfim} series={series} labels={labels}></RadialPerson>
        ) : (
          <></>
        )}
        {config.type === 39 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <RadialGradient config={config} columns={columnsfim} series={series} labels={labels}></RadialGradient>
        ) : (
          <></>
        )}
        {config.type === 40 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <RadialStroked config={config} columns={columnsfim} series={series} labels={labels}></RadialStroked>
        ) : (
          <></>
        )}
        {config.type === 41 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <RadialSemicicle config={config} columns={columnsfim} series={series} labels={labels}></RadialSemicicle>
        ) : (
          <></>
        )}
        {config.type === 42 && columnsfim !== undefined && columnsfim.length > 0 ? (
          <Cards config={config} columns={columnsfim} series={series} labels={labels}></Cards>
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
};

export default DashboardConvert;
