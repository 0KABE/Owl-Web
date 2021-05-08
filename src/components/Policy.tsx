import React from 'react';
import { List, Card, Radio, RadioChangeEvent } from 'antd';
import Axios from 'axios';

export type PolicyGroup = {
  name: string;
  type: string;
  selected: string;
  proxies: string[];
};

export type SelectedProxyChanged = {
  (policyGroup: string, selectedProxy: string): void;
};

type Props = {
  policyGroup: PolicyGroup;
  selectedProxyChanged: SelectedProxyChanged;
};

type State = {
  selectedProxy: Map<string, string>;
};

class Policy extends React.Component<Props, State> {
  selectedProxyChanged = (e: RadioChangeEvent) => {
    this.props.selectedProxyChanged(
      this.props.policyGroup.name,
      e.target.value,
    );
  };

  render() {
    return (
      <Radio.Group
        value={this.props.policyGroup.selected}
        onChange={this.selectedProxyChanged}
      >
        {console.log(this.props)}
        {this.props.policyGroup.proxies.map((proxy) => (
          <Radio.Button value={proxy}>{proxy}</Radio.Button>
        ))}
      </Radio.Group>
    );
  }
}

export default Policy;
