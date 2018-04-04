import React, { Component } from 'react';
import { connect } from 'react-redux';
import { echo } from './actions/echo';
import { script } from './actions/script';
import { script_job } from './actions/script_job';

import { serverMessage, getWorkId, getWorkResults } from './reducers';

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
        description: '',
        input_number: 0,
      },
      willstop: 0,
      old_work_id: '',
    }
  }
  selectScript = (value) => {
    let v = this.props.message.filter((e) => {
      return e.id === value
    });
    this.setState({selected : value, script: v[0]});
  }
 
  componentDidMount() {
    this.props.fetchMessage();
  }

  getWorkResult = function(){
    const old_work_id = this.state.old_work_id;
    let new_work_id = this.props.work_id;
    console.log('--')
    console.log(this.state.willstop, old_work_id, new_work_id)
    
    if (this.state.willstop === 1){
      clearInterval(this.state.refreshUntilSuccess);
      this.setState({willstop: 0, old_work_id: new_work_id, refreshUntilSuccess: ''})
      return;
    }

    if (new_work_id && new_work_id !== old_work_id){
      if(this.props.job_result.work_id === new_work_id && 
         this.props.job_result.state === 'SUCCESS')
      {
        console.log('ura')
        this.setState({willstop : 1})
      }
      this.props.fetchWorkResult(new_work_id);
    }
  }

  fetchWorkAndResult = (_id, vals) => {
    // Try to get work id 
    let willstop = 0;
    const old_work_id = this.props.work_id;

    this.props.fetchWork(_id, vals);
    this.setState({willstop: willstop, old_work_id: old_work_id})
    
    // Try get work by work id if it changed
    let refreshUntilSuccess = setInterval(this.getWorkResult.bind(this), 1000);
    this.setState({refreshUntilSuccess: refreshUntilSuccess })
  }

  render() {
    return (
      <Container>
      <Row>
        <Col xs="3"><ListColumn onSelectScript={this.selectScript} 
                                    listScripts={this.props.message}/>
        </Col>
        <Col xs="4"><InfoColumn selectedScript={this.state.script} fetchWork={this.fetchWorkAndResult}/>
        </Col>
        <Col xs="5"><ResultColumn onSelectedWorkId={this.props.work_id} workResults={this.props.job_result}/></Col>
      </Row>
      </Container>
    );
  }
}

const mapStateToProps = function(state, ownProps){
  return {
    message     : serverMessage(state),
    work_id     : getWorkId(state),
    job_result  : getWorkResults(state)
  }
}

const mapDispatchToProps = {
    fetchMessage    : echo,
    fetchWork       : script,
    fetchWorkResult : script_job 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
