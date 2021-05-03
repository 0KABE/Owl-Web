import React from 'react';
import ReactECharts from 'echarts-for-react';

export type Speeds = {
  download: Number[];
  upload: Number[];
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
    xAxis: {
      type: 'category',
      data: this.props.speeds.time.map((value) => value.toLocaleTimeString()),
    },
    yAxis: {},
    series: [
      {
        type: 'line',
        name: 'Download',
        data: this.props.speeds.download,
      },
      {
        type: 'line',
        name: 'Upload',
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
