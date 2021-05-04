import React from 'react';
import ReactECharts from 'echarts-for-react';

export type Speeds = {
  download: number[];
  upload: number[];
  time: Date[];
};

type Props = {
  speeds: Speeds;
};

class TrafficChart extends React.Component<Props> {
  getOption = () => ({
    legend: {
      data: ['Download', 'Upload'],
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: this.props.speeds.time.map((value) => value.toLocaleTimeString()),
    },
    yAxis: {},
    series: [
      {
        type: 'line',
        name: 'Download',
        areaStyle: { normal: {} },
        data: this.props.speeds.download,
      },
      {
        type: 'line',
        name: 'Upload',
        areaStyle: { normal: {} },
        data: this.props.speeds.upload,
      },
    ],
  });

  componentDidUpdate() {
    this.echartsReact?.getEchartsInstance().setOption(this.getOption());
  }

  echartsReact!: ReactECharts | null;
  render() {
    return (
      <ReactECharts
        ref={(e) => {
          this.echartsReact = e;
        }}
        option={this.getOption()}
        style={{ height: '90vh' }}
      />
    );
  }
}

export default TrafficChart;
