import React from 'react';
import { Card, CardText, CardBody,
    CardTitle } from 'reactstrap';

const DescriptionComp = (props) => {

    return (
        <div>
        <br />
        <Card className="mt-5 mb-3">
            <CardBody>
            <CardTitle>{props.selectedScript.title}</CardTitle>
            <CardText>{props.selectedScript.description}</CardText>
            </CardBody>
        </Card>
        <br />
        </div>
    );
    };

export default DescriptionComp;
      