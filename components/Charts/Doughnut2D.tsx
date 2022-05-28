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

const Doughnut2D = ({ data }: IProps) => {
  const chartConfigs = {
    type: 'doughnut2d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Stars Per Language',
        theme: 'fusion',
        decimal: 0,
        donutRadius: '45%',
        showPercentValues: 0
      },
      // Chart Data
      data
    }
  };
  return <ReactFC {...chartConfigs} />;
};

export default Doughnut2D;
