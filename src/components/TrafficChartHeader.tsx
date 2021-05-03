import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export type Statistic = {
  upload: Number;
  download: Number;
  uploadTotal: Number;
  downloadTotal: Number;
};

type Props = {
  statistic: Statistic;
};

interface TrafficChartHeader {
  props: Props;
}

class TrafficChartHeader extends React.Component {
  render() {
    return (
      <Row gutter={16} justify="center">
        <Col span={5}>
          <Statistic
            title="Download"
            suffix={'KB/s'}
            prefix={<ArrowDownOutlined />}
            value={this.props.statistic.download.valueOf() / 1e3}
            precision={2}
          />
        </Col>
        <Col span={5}>
          <Statistic
            title="Upload"
            suffix={'KB/s'}
            prefix={<ArrowUpOutlined />}
            value={this.props.statistic.upload.valueOf() / 1e3}
            precision={2}
          />
        </Col>
        <Col span={5}>
          <Statistic
            title="Download total"
            suffix={'KB/s'}
            prefix={<ArrowDownOutlined />}
            value={this.props.statistic.downloadTotal.valueOf() / 1e3}
            precision={2}
          />
        </Col>
        <Col span={5}>
          <Statistic
            title="Upload totoal"
            suffix={'KB/s'}
            prefix={<ArrowUpOutlined />}
            value={this.props.statistic.uploadTotal.valueOf() / 1e3}
            precision={2}
          />
        </Col>
      </Row>
    );
  }
}

export default TrafficChartHeader;
