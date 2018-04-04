import React from 'react';
import { Card, CardText, CardBody,
    CardTitle, CardImg } from 'reactstrap';

const ResultComp = (props) => {
    
    return (
        <div>

        <Card className="mt-5 mb-3">
        <CardImg top width="100%" src={props.workResults.image_path[0]} alt="Card image cap" />
            <CardBody>
            <CardTitle>Job result image</CardTitle>
            </CardBody>
        </Card>
        </div>
    );
    };

export default ResultComp;