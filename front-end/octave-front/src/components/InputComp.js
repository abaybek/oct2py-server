import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
// import { script } from '../actions/script';

class InputComp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ivals: {}
    }
  }
  // Get values from form to the state
  handleChange = (propName, event) => {
    const ivals = this.state.ivals;
    ivals[propName.i] = Number(event.target.value);
    this.setState({ivals: ivals});
  }

  createInputComponents = () => {
    let components = [];
    for(let i=0; i < this.props.selectedScript.input_number; i++){
      components.push(<InputGroup key={i}>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input placeholder="Input value" onChange={this.handleChange.bind(this, {i})} type="number" step="0.1" />
        <InputGroupAddon addonType="append">.00</InputGroupAddon>
      </InputGroup>
      )
    }
    return components
  }
  getWorkId = () => {
    console.log('Btn clicked');
    console.log(this.props.selectedScript)
    console.log(this.state.ivals)
    const _id = this.props.selectedScript.id;
    let ivals = []
    let idict = this.state.ivals;
    for(let k in idict){
      ivals.push(idict[k])
    }

    this.props.fetchWork(_id, ivals)
  }

  render(){
    return (
      <div>
        {this.createInputComponents()}
        <Button onClick={this.getWorkId} color="primary" size="lg" block>Send button</Button>
      </div>
    );
  }
}

export default InputComp;
