import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { serverMessage } from '../reducers';
import { connect } from 'react-redux';
import { echo } from '../actions/echo';

class ListScriptsShow extends React.Component {
    
    createListGroupItem(){
        if(this.props.items){
            return this.props.items.map(({id, user, title, description, timestamp,file_url, user_folder, input_number, output_number}) => {
                return (
                    <ListGroupItem key={id} tag="a" href="#" action>{title}</ListGroupItem>
                );
            })
        }else{
            return;
        }
    }

    render() {
      return (
        <div>
          <br />
          <h3>Anchors </h3>
          <p>Be sure to <strong>not use the standard <code>.btn</code> classes here</strong>.</p>
          <ListGroup>
            {this.createListGroupItem()}
          </ListGroup>
          <p />
        </div>
      );
    }
}

function mapStateToProps(state){
    return {
        items: serverMessage(state)
    }
}

export default connect(
    mapStateToProps,
    { fetchMessage: echo }
)(ListScriptsShow);
  
  