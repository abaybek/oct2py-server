import React from 'react';
import { Card, CardText, CardBody,
    CardTitle, CardImg } from 'reactstrap';

const ResultComp = (props) => {
    return (
        <div>

        <Card className="mt-5 mb-3">
        <CardImg top width="100%" src="http://g3yxi3w953w3xjjaj1xcbuay.wpengine.netdna-cdn.com/wp-content/themes/uplift/images/default-thumb.png" alt="Card image cap" />
            <CardBody>
            <CardTitle>Job result image</CardTitle>
            <CardText>result number is 4</CardText>
            </CardBody>
        </Card>
        </div>
    );
    };

export default ResultComp;