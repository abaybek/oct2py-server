import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';


class ListColumn extends React.Component {
    handleClick = (e) => {
        this.props.onSelectScript(Number(e.currentTarget.dataset.id))
    }
    
    createListGroupItem(){
        if(this.props.listScripts){
            return this.props.listScripts.map(
            ({id, user, title, description, timestamp,file_url, user_folder, input_number, output_number}) => {
                return (
                    <ListGroupItem key={id} data-id={id} onClick={((e) => this.handleClick(e))} 
                                   tag="a" href="#" action>{title}</ListGroupItem>
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
          <h3>Scripts </h3>
          <p>Be sure to <strong>Don’t underestimate the  <code>Force</code> here</strong>.</p>
          <ListGroup>
            {this.createListGroupItem()}
          </ListGroup>
          <p />
        </div>
      );
    }
}
export default ListColumn
