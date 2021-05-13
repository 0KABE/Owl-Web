import React from 'react';
import Rules from '../components/Rules';

class RulesPage extends React.Component {
  render() {
    return <Rules ruleURL={new URL('http://localhost:8080/rules')} />;
  }
}

export default RulesPage;
