import React from 'react';
import { Clock } from './Clock';

type AppState = {
  hasClock: boolean;
  clockName: string;
};

export class App extends React.Component<{}, AppState> {
  clockNameIntervalId?: number;

  oldName: string = 'Clock-0';

  constructor(props: {}) {
    super(props);
    this.state = {
      hasClock: true,
      clockName: 'Clock-0',
    };
  }

  getRandomName = () => {
    return `Clock-${Math.floor(Math.random() * 100)}`;
  };

  componentDidMount() {
    // Show on left click
    document.addEventListener('click', this.showClock);

    // Hide on right click
    document.addEventListener('contextmenu', this.hideClock);

    // Update clock name every 3300ms
    this.clockNameIntervalId = window.setInterval(() => {
      const newName = this.getRandomName();

      this.setState({ clockName: newName });
    }, 3300);
  }

  componentDidUpdate(prevProps: {}, prevState: AppState) {
    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.showClock);
    document.removeEventListener('contextmenu', this.hideClock);

    if (this.clockNameIntervalId) {
      clearInterval(this.clockNameIntervalId);
    }
  }

  showClock = () => {
    this.setState({ hasClock: true });
  };

  hideClock = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  render() {
    return (
      <div className="App">
        {this.state.hasClock && <Clock name={this.state.clockName} />}
      </div>
    );
  }
}
