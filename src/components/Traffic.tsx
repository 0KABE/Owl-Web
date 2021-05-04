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
