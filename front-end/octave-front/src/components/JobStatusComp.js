import React from 'react';
import { Card, CardText, CardBody,
    CardTitle } from 'reactstrap';

const JobStatusComp = (props) => {
    return (
        <div>
        <br />
        <Card className="mt-5 mb-3">
            <CardBody>
            <CardTitle>Job status</CardTitle>
            <CardText>{props.workResults.state}</CardText>
            </CardBody>
        </Card>
        </div>
    );
    };

export default JobStatusComp;
      