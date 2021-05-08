import React from 'react';
import Policies from '../components/Policies';

class PoliciesPage extends React.Component {
  render() {
    return (
      <Policies
        getPoliciesUrl={new URL('http://localhost:8080/policies')}
        setSelectedProxyUrl={new URL('http://localhost:8080/setProxy')}
      />
    );
  }
}

export default (props: { children: React.ReactNode }) => {
  return <PoliciesPage {...props} />;
};
