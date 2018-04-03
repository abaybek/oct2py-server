import React, { Component } from 'react';
import { connect } from 'react-redux';
import { echo } from './actions/echo';
import { serverMessage } from './reducers/echo';

import { Container, Row, Col } from 'reactstrap';

import ListColumn from './containers/ListColumn';
import InfoColumn from './containers/InfoColumn';
import ResultColumn from './containers/ResultColumn';

class App extends Component {
 
  componentDidMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <Container>
      <Row>
        <Col xs="3"><ListColumn /></Col>
        <Col xs="4"><InfoColumn /></Col>
        <Col xs="5"><ResultColumn /></Col>
      </Row>
      </Container>
    );
  }
}

const mapStateToProps = function(state, ownProps){
  return {
    message: serverMessage(state)
  }
}

export default connect(
  mapStateToProps,
  { fetchMessage: echo }
)(App);
