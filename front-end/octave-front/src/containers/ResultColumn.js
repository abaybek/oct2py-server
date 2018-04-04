import React from 'react';
import JobStatusComp from '../components/JobStatusComp';
import ResultComp from '../components/ResultComp';
import ResultImage from '../components/ResultImage';

export default class ResultColumn extends React.Component {
    render(){
        return(
        <div>
            <JobStatusComp workResults={this.props.workResults}/>
            <ResultComp onSelectedWorkId={this.props.onSelectedWorkId} workResults={this.props.workResults}/>
            <ResultImage workResults={this.props.workResults}/>
        </div>)
    }
}