import React from 'react';
import { Card } from 'antd';

export type RuleData = {
  Type: string;
  Condition: string;
  Proxy: string;
};

type Props = {
  rule: RuleData;
};

type State = {};

class Rule extends React.Component<Props, State> {
  render() {
    return (
      <Card style={{ minWidth: '100%' }}>
        {this.props.rule.Type != 'Final'
          ? `${this.props.rule.Type}, ${this.props.rule.Condition}, ${this.props.rule.Proxy}`
          : `${this.props.rule.Type}, ${this.props.rule.Proxy}`}
      </Card>
    );
  }
}

export default Rule;
