import React from 'react';
import Config from '../components/Config';

class ConfigPage extends React.Component {
  render() {
    return <Config url={new URL('http://localhost:8080/config')} />;
  }
}

export default (props: { children: React.ReactNode }) => {
  return <ConfigPage {...props} />;
};
