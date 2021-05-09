import React, { ChangeEventHandler, TextareaHTMLAttributes } from 'react';
import { Input, Button } from 'antd';
import Axios from 'axios';

const { TextArea } = Input;

type Props = {
  url: URL;
};

type State = {
  content: string;
};

class Config extends React.Component<Props, State> {
  saveEvent = () => {
    Axios.post(this.props.url.toString(), this.state.content);
  };

  textOnChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    this.setState({ content: event.target.value });
  };

  componentDidMount() {
    Axios.get(this.props.url.toString()).then((response) => {
      this.setState({ content: response.data });
    });
  }

  render() {
    return (
      <div style={{ padding: 24, minHeight: '100vh' }}>
        <Button onClick={() => this.saveEvent()} style={{ marginBottom: 16 }}>
          Save
        </Button>

        <TextArea
          rows={4}
          autoSize={true}
          value={this.state?.content}
          onChange={this.textOnChange}
        />
      </div>
    );
  }
}

export default Config;
