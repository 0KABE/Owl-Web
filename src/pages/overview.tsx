import React from 'react';
import Traffic from '@/components/Traffic';

class Overview extends React.Component {
  render() {
    return <Traffic url={new URL('ws://localhost:8080/traffic')} />;
  }
}

export default (props: { children: React.ReactNode }) => {
  return <Overview {...props} />;
};
