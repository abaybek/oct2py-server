import React from 'react';
import { Card, CardText, CardBody,
    CardTitle } from 'reactstrap';

const DescriptionComp = (props) => {
    return (
        <div>
        <br />
        <Card className="mt-5 mb-3">
            <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            </CardBody>
        </Card>
        <br />
        </div>
    );
    };

export default DescriptionComp;
      