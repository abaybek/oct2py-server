import React from 'react';


class CodeResult extends React.Component {
  
  render() {
    return (
        <div>
        <h5> Status: <p>{this.props.requestResult.job_result.state}</p></h5>

        <h5> Console output: </h5>
        {this.props.requestResult.job_result.console_output.map((out, i) => {
            return (
                <p key={i}> {out} </p>
            )
        })}

        <h5> Message: <p>{this.props.requestResult.job_result.message}</p></h5>
        <h5> Task id: <p>{this.props.requestResult.task_id}</p></h5>
        </div>
    );
  }
}

export default CodeResult;
