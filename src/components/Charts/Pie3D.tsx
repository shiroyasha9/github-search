import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Chart from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

interface IProps {
  data: {
    [index: number]: {
      label: string;
      value: number;
    };
  };
}

const Pie3D = ({ data }: IProps) => {
  const chartConfigs = {
    type: 'pie3d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Languages Used',
        theme: 'fusion',
        decimal: 0,
        pieRadius: '45%'
      },
      // Chart Data
      data
    }
  };
  return <ReactFC {...chartConfigs} />;
};

export default Pie3D;
