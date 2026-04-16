import Card from 'react-bootstrap/Card';
import './Task.css';
import Image from 'react-bootstrap/Image';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

function Task() {
    const [show, setShow] = useState(false);

  return (
    <>    
        <Card 
            className="task-card d-flex flex-row align-items-center p-3"
            style={{width:'25rem'}}
            onClick={() => setShow(true)}
        >
            {/* Avatar */}
            <Image
                src="/photo.png"
                roundedCircle
                width={50}
                height={50}
                className="me-3"
            />

            {/* Text content */}
            <div>
                <div className="fw-semibold">
                Design the entire website in a chosen style
                </div>
                <div className="text-muted">
                6 days left
                </div>
            </div>
        </Card>


        <Modal 
            show={show}
            onHide={() => setShow(false)}
            centered
            scrollable
            dialogClassName="task-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Design the entire website in a chosen style</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
                <p>Just do what the title says lol</p>
            </Modal.Body>
        </Modal>
    </>
  );
}

export default Task;