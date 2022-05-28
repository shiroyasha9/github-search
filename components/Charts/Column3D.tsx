import ReactFC from 'react-fusioncharts';
const FusionCharts = require('fusioncharts');
const Chart = require('fusioncharts/fusioncharts.charts');
const FusionTheme = require('fusioncharts/themes/fusioncharts.theme.fusion.js');

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

interface IProps {
  data: {
    [index: number]: {
      label: string;
      value: number;
    };
  };
}

const Column3D = ({ data }: IProps) => {
  const chartConfigs = {
    type: 'column3d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Most Popular',
        theme: 'fusion',
        yAxisName: 'Stars',
        xAxisName: 'Repos',
        xAxisNameFontSize: '16px',
        yAxisNameFontSize: '16px'
      },
      // Chart Data
      data
    }
  };
  return <ReactFC {...chartConfigs} />;
};

export default Column3D;
