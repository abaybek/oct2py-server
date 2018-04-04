import React from 'react';
import { Card, CardText, CardBody,
    CardTitle } from 'reactstrap';

const ResultComp = (props) => {
    return (
        <div>

        <Card className="mt-5 mb-3">
            <CardBody>
            <CardTitle>Job result</CardTitle>
            <CardText>Job ID: {props.onSelectedWorkId} <br/>
                     Job Result: {props.workResults.message}</CardText>
            </CardBody>
        </Card>
        </div>
    );
    };

export default ResultComp;