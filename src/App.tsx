/* eslint-disable react/state-in-constructor */
import React from 'react';

type AppState = {
  pressedKey: string | null;
};

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      pressedKey: null,
    };
  }

  handleKeyUp = (event: KeyboardEvent) => {
    this.setState({ pressedKey: event.key });
  };

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    return (
      <div className="App">
        {this.state.pressedKey === null
          ? 'Nothing was pressed yet'
          : `The last pressed key is ${this.state.pressedKey}`}
      </div>
    );
  }
}
