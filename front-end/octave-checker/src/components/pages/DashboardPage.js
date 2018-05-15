import React from 'react';
// import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import TextEditor from '../forms/TextEditor';
import CodeResults from '../forms/CodeResults';


class DashboardPage extends React.Component {
    state = {
        requestResult: {
            job_result: {
                state: '',
                message: '',
                console_output: []
            },
            job_state: '',
            task_id: ""
        }
    }

    handleRequest = (res) => {
        const status = res.status;
        const data = res.data;
        console.log(typeof data);
        console.log(data);
        this.setState({requestResult: data})
    }
    
    render(){
        return (
            <Grid columns="equal">
                <Grid.Column width={1}>
                        <Segment>1</Segment>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Segment>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>

<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <TextEditor handleRequest={this.handleRequest} style={{width: '700px'}}> </TextEditor>
                        </Segment>
                        <Segment>
                            <CodeResults requestResult={this.state.requestResult}> </CodeResults>
                        </Segment>
                    </Grid.Column>
                
            </Grid>
        )
    }
}

// DashboardPage.propTypes = {

// }

export default DashboardPage;