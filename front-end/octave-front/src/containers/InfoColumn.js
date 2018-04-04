import React from 'react';
import DescriptionComp from '../components/DescriptionComp';
import InputComp from '../components/InputComp';

export default class InfoColumn extends React.Component {
    
    render(){
        return(
        <div>
            <DescriptionComp selectedScript={this.props.selectedScript}/>
            <InputComp selectedScript={this.props.selectedScript} fetchWork={this.props.fetchWork}></InputComp>
        </div>)
    }
}