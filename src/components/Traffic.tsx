import React from 'react';
import TrafficChartHeader, { Statistic } from './TrafficChartHeader';
import TrafficChart, { Speeds } from './TrafficChart';

type State = {
  statistic: Statistic;
  speeds: Speeds;
};

type Props = {
  url: URL; //websocket url
  duration: number; //seconds
};

class Traffic extends React.Component<Props> {
  statistic: Statistic = {
    download: 0,
    downloadTotal: 0,
    upload: 0,
    uploadTotal: 0,
  };
  speeds: Speeds = { download: [], upload: [], time: [] };

  state: State = { statistic: this.statistic, speeds: this.speeds };

  webSocket = new WebSocket(this.props.url.toString());

  webSocketEventListener = (ev: MessageEvent<any>) => {
    const speedData: { upload: number; download: number } = JSON.parse(ev.data);
    console.log(speedData);
    this.updateSpeed(speedData.download, speedData.upload);
  };

  updateSpeed(download: number, upload: number) {
    const time = new Date();
    this.updateSpeeds(download, upload, time);
    this.updateStatistic(download, upload);
    this.setState({ statistic: this.statistic, speeds: this.speeds });
  }

  updateSpeeds(download: number, upload: number, time: Date) {
    while (
      this.speeds.time.length > 0 &&
      time.getTime() - this.speeds.time[0].getTime() >=
        this.props.duration * 1000
    ) {
      this.speeds.time.shift();
      this.speeds.download.shift();
      this.speeds.upload.shift();
    }
    this.speeds.download.push(download);
    this.speeds.upload.push(upload);
    this.speeds.time.push(time);
  }

  updateStatistic(download: number, upload: number) {
    this.statistic.downloadTotal += download;
    this.statistic.uploadTotal += upload;
    this.statistic.download = download;
    this.statistic.upload = upload;
  }

  // randomIntFromInterval(min: number, max: number) {
  //   // min and max included
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // }

  // time: Date = new Date();
  // randomData(): [Number, Number, Date] {
  //   this.time = new Date(this.time.getTime() + 1000);
  //   return [
  //     this.randomIntFromInterval(5000, 10000),
  //     this.randomIntFromInterval(5000, 1000),
  //     this.time,
  //   ];
  // }

  // updateData() {
  //   if (this.speeds.time.length >= 10) {
  //     this.speeds.download.shift();
  //     this.speeds.upload.shift();
  //     this.speeds.time.shift();
  //   }
  //   const [download, upload, time] = this.randomData();
  //   this.speeds.download.push(download);
  //   this.speeds.upload.push(upload);
  //   this.speeds.time.push(time);
  //   this.statistic.download = download;
  //   this.statistic.upload = upload;
  //   this.statistic.downloadTotal =
  //     this.statistic.downloadTotal.valueOf() + download.valueOf();
  //   this.statistic.uploadTotal =
  //     this.statistic.uploadTotal.valueOf() + upload.valueOf();
  //   this.setState({ statistic: this.statistic, speeds: this.speeds });
  // }

  componentDidMount() {
    this.webSocket.addEventListener('message', this.webSocketEventListener);
  }

  componentWillUnmount() {
    this.webSocket.removeEventListener('message', this.webSocketEventListener);
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
