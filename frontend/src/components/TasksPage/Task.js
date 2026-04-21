import Card from 'react-bootstrap/Card';
import './Task.css';
import Image from 'react-bootstrap/Image';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Task({task, onDeleteTask}) {
    // Modals
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showDiscardTaskAlert, setShowDiscardTaskAlert] = useState(false);

    return (
        <>
            <Card 
                className="task-card d-flex flex-row align-items-center p-4 m-2"
                style={{width:'100%'}}
                onClick={()  => setShowTaskModal(true)}
            >
                <Image
                    src="/photo.png"
                    roundedCircle
                    width={50}
                    height={50}
                    className="me-3"
                />

                <div>
                    <div className="fw-semibold">
                        {task.title}
                    </div>
                    <div className="text-muted">
                        Due to {task.due_date}
                    </div>
                </div>
            </Card>


            <Modal 
                show={showTaskModal}
                onHide={() => setShowTaskModal(false)}
                centered
                scrollable
                dialogClassName="task-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{task.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{task.description}</p>
                    <Row className="w-100 text-center">
                        <Col>
                            <Button
                                variant="danger"
                                type="submit"
                                className="bg-red"
                                onClick={() => setShowDiscardTaskAlert(true)}
                            >
                                Discard Task
                            </Button>
                        </Col>
                        <Col>
                            <Button type="submit" disabled>Mark as Completed</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

            <Modal
                show={showDiscardTaskAlert}
                onHide={() => setShowDiscardTaskAlert(false)}
                centered
                dialogClassName="task-modal"
                
            >
                <Modal.Body>
                    <Modal.Title className="text-danger">
                        Discard Task
                    </Modal.Title>

                    Are you sure you want to discard this task?

                    <Col className="d-flex justify-content-end gap-2">
                        <Button 
                            variant="danger"
                            onClick={() => {
                                onDeleteTask(task.id);
                                setShowDiscardTaskAlert(false);
                                setShowTaskModal(false);
                            }}
                        >
                            Yes
                        </Button>

                        <Button 
                            variant="secondary"
                            onClick={() => setShowDiscardTaskAlert(false)}
                        >
                            No
                        </Button>
                    </Col>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Task;