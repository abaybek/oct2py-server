import React from 'react';
import PropTypes from 'prop-types';
// import brace from 'brace';
import AceEditor from 'react-ace';
import { Button } from 'semantic-ui-react';
// import { sendCode2 } from '../actions/sourceCode';
import * as actions from '../../actions/sourceCode';

import 'brace/mode/matlab';
import 'brace/theme/terminal';

class TextEditor extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            code: '',
            uuid: '',
            timerID: undefined,
            errors : {}
        }
        this.onChangeText = this.onChangeText.bind(this);
    }
    
    onChangeText(e){
        this.setState({code: e});
        // return 1;
    }

    showState = () => console.log(this.state);

    onClick = (e) => {
        e.preventDefault();

        let code = this.state.code;
        actions.sendCode(code)
               .then(uuid => this.setState({uuid: uuid.data}));
        
        let timerID = setInterval(this.timer, 1000);
        this.setState({timerID: timerID});
    }

    timer = () => {
        actions.getCodeResult(this.state.uuid)
               .then(res => {
                   console.log('responce is', res.status);
                   console.log('data is', res.data);
                   if (res.status === 200){
                       clearInterval(this.state.timerID);
                       this.setState({timerID : ''});
                    //    this.props.requestResult = res;
                       this.props.handleRequest(res);
                   }
                });
    }

    render(){
        return (
            <div>
            <AceEditor
                mode="matlab"
                theme="terminal"
                onChange={this.onChangeText}
                value={this.state.code}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{$blockScrolling: true}}
                fontSize="30"
                style={this.props.style}
                />
            <Button onClick={this.onClick} primary>Send</Button>
            </div>
        )
    }
}

TextEditor.propTypes = {
    handleRequest: PropTypes.func.isRequired
}

export default TextEditor;