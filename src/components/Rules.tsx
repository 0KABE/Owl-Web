import React from 'react';
import { List } from 'antd';
import Rule, { RuleData } from './Rule';
import Axios from 'axios';

type Props = {
  ruleURL: URL;
};

type State = {
  rules: RuleData[];
};

class Rules extends React.Component<Props, State> {
  componentDidMount() {
    Axios.get(this.props.ruleURL.toString()).then((response) => {
      this.setState({ rules: response.data });
    });
  }

  render() {
    return (
      <List
        style={{ minHeight: '100vh' }}
        bordered
        dataSource={this.state?.rules ?? []}
        renderItem={(item) => (
          <List.Item>
            <Rule rule={item} />
          </List.Item>
        )}
      />
    );
  }
}

export default Rules;
