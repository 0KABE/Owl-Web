import React from 'react';
import { List, Card, Avatar } from 'antd';
import Policy, { SelectedProxyChanged, PolicyGroup } from './policy';
import Axios from 'axios';

type Props = {
  setSelectedProxyUrl: URL;
  getPoliciesUrl: URL;
};

type State = {
  policyGroups: Map<string, PolicyGroup>;
};

class Policies extends React.Component<Props, State> {
  selectedProxyChanged: SelectedProxyChanged = (
    policyGroup: string,
    selectedProxy: string,
  ) => {
    const policy = this.state.policyGroups.get(policyGroup);
    if (policy) {
      Axios.post(this.props.setSelectedProxyUrl.toString(), {
        proxy: policy.name,
        select: selectedProxy,
      }).then((response) => {
        if (response.status == 200) {
          policy.selected = selectedProxy;
          this.setState({ policyGroups: this.state.policyGroups });
        }
      });
    }
  };

  componentDidMount() {
    Axios.get<{ policies: PolicyGroup[] }>(
      this.props.getPoliciesUrl.toString(),
    ).then((response) => {
      const policyGroups = response.data.policies.reduce(
        (m, value) => (m.set(value.name, value), m),
        new Map<string, PolicyGroup>(),
      );
      this.setState({ policyGroups: policyGroups });
    });
  }

  render() {
    return (
      <List
        bordered
        dataSource={Array.from(this.state?.policyGroups?.values() ?? [])}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={`${item.name} - ${item.type}`}
              style={{ minWidth: '100%' }}
            >
              <Policy
                policyGroup={item}
                selectedProxyChanged={this.selectedProxyChanged}
              />
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

export default Policies;
