// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {echo} from './actions/echo'
import {serverMessage} from './reducers/echo';

class App extends Component {
  componentDidMount() {
    this.props.fetchMessage('Hi!');
  }
  render() {
      return (
        <div>
          <h2>Welcome to React</h2>
          <p>{this.props.message}</p>
        </div>
      );
    }
}

export default connect(
  state => ({ message: serverMessage(state) }),
  { fetchMessage: echo }
)(App);
