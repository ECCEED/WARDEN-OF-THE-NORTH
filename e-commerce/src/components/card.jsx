import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function BasicCard({ name, description, price, photo }) {
    return (
        <Card style={{ width: '18rem', margin: '0 10px 20px 0' }}>
            <Card.Img variant="top" src={photo} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Description: {description}</ListGroup.Item>
                <ListGroup.Item>Price: {price}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="/claim">make a claim</Card.Link>

            </Card.Body>
        </Card>
    );
}

export default BasicCard
