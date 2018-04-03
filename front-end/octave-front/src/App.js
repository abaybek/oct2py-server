import React, { Component } from 'react';
import { connect } from 'react-redux';
import { echo } from './actions/echo';
import { serverMessage } from './reducers';

import { Container, Row, Col } from 'reactstrap';

import ListColumn from './containers/ListColumn';
import InfoColumn from './containers/InfoColumn';
import ResultColumn from './containers/ResultColumn';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      selected : -1,
      script: {
        title: '',
        description: ''
      }
    }
  }
  selectScript = (value) =>{
    let v = this.props.message.filter((e) => {
      return e.id === value
    });
    this.setState({selected : value, script: v[0]});
  }
 
  componentDidMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <Container>
      <Row>
        <Col xs="3"><ListColumn onSelectScript={this.selectScript} 
                                    listScripts={this.props.message}/>
        </Col>
        <Col xs="4"><InfoColumn selectedScript={this.state.script}/>
        </Col>
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
