import React from 'react';
import TrafficChartHeader, { Statistic } from './TrafficChartHeader';
import TrafficChart, { Speeds } from './TrafficChart';

type State = {
  statistic: Statistic;
  speeds: Speeds;
};

type Props = {
  url: URL;
};

interface Traffic {
  props: Props;
}

class Traffic extends React.Component {
  statistic: Statistic = {
    download: 111,
    downloadTotal: 999,
    upload: 88,
    uploadTotal: 90.99,
  };
  speeds: Speeds = { download: [], upload: [], time: [] };

  state: State = { statistic: this.statistic, speeds: this.speeds };

  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  time: Date = new Date();
  randomData(): [Number, Number, Date] {
    this.time = new Date(this.time.getTime() + 1000);
    return [
      this.randomIntFromInterval(5000, 10000),
      this.randomIntFromInterval(5000, 1000),
      this.time,
    ];
  }

  updateData() {
    if (this.speeds.time.length >= 10) {
      this.speeds.download.shift();
      this.speeds.upload.shift();
      this.speeds.time.shift();
    }
    const [download, upload, time] = this.randomData();
    this.speeds.download.push(download);
    this.speeds.upload.push(upload);
    this.speeds.time.push(time);
    this.statistic.download = download;
    this.statistic.upload = upload;
    this.statistic.downloadTotal =
      this.statistic.downloadTotal.valueOf() + download.valueOf();
    this.statistic.uploadTotal =
      this.statistic.uploadTotal.valueOf() + upload.valueOf();
    this.setState({ statistic: this.statistic, speeds: this.speeds });
  }

  interval!: NodeJS.Timeout;
  componentDidMount() {
    this.interval = setInterval(() => this.updateData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: '100vh' }}
      >
        <TrafficChartHeader statistic={this.state.statistic} />
        <TrafficChart speeds={this.state.speeds} />
      </div>
    );
  }
}

export default Traffic;
