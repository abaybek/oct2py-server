import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';


import DashboardPage from './components/pages/DashboardPage';

class App extends Component {
  render() {
    return (
      <DashboardPage></DashboardPage>
    );
  }
}

export default App;
