import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export type Statistic = {
  upload: number;
  download: number;
  uploadTotal: number;
  downloadTotal: number;
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
            suffix={'MB/s'}
            prefix={<ArrowDownOutlined />}
            value={this.props.statistic.download / 1e6}
            precision={2}
          />
        </Col>
        <Col span={5}>
          <Statistic
            title="Upload"
            suffix={'MB/s'}
            prefix={<ArrowUpOutlined />}
            value={this.props.statistic.upload / 1e6}
            precision={2}
          />
        </Col>
        <Col span={5}>
          <Statistic
            title="Download total"
            suffix={'MB/s'}
            prefix={<ArrowDownOutlined />}
            value={this.props.statistic.downloadTotal / 1e6}
            precision={2}
          />
        </Col>
        <Col span={5}>
          <Statistic
            title="Upload totoal"
            suffix={'MB/s'}
            prefix={<ArrowUpOutlined />}
            value={this.props.statistic.uploadTotal / 1e6}
            precision={2}
          />
        </Col>
      </Row>
    );
  }
}

export default TrafficChartHeader;
