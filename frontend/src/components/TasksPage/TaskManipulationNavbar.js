import { useState } from "react";
import { Modal } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TaskManipulationNavbar() {
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    // create_task forms
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("self");
    const [taskDueDate, setTaskDueDate] = useState("2 days");

    const createTask = async (e) => {
        e.preventDefault();

        if (!taskTitle || !taskDescription || !assignedTo || !taskDueDate) {
            console.log("Missing fields");
            return;
        }
        try {
            const response =  await fetch("http://localhost:5050/add_task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task_title: taskTitle,
                    task_description: taskDescription,
                    assigned_to: assignedTo,
                    task_due_date: taskDueDate
                }),
            });
        
            if (!response.ok) {
                throw new Error("Failed to create task");
            }
        
            const data = await response.json()
            console.log("Created:", data);
            
            setShowAddTaskModal(false);   // close modal
            setTaskTitle("");
            setTaskDescription("");
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Navbar 
                sticky="top"
                className="bg-body-tertiary justify-content-between"
            >
                <Form
                    inline
                    className="align-items-center justfiy-content-center"
                >
                    <Row>
                        <Col xs="auto">
                            <Button onClick={() => setShowAddTaskModal(true)}>Create a Task</Button>
                        </Col>
                    </Row>
                </Form>
            </Navbar>

            <Modal 
                show={showAddTaskModal}
                onHide={() => setShowAddTaskModal(false)}
                centered
                scrollable
                dialogClassName="task-modal"
            >
                <Modal.Header
                    closeButton
                >
                    <Modal.Title className="w-100 text-center">Create a Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="p-3 d-flex flex-column gap-3" onSubmit={createTask}>
                        <Form.Control value={taskTitle} onChange={e => setTaskTitle(e.target.value)} type="text" placeholder="Task Title" />
                        <Form.Control value={taskDescription} onChange={e => setTaskDescription(e.target.value)} type="text" placeholder="Task Description" />
                        <Form.Control disabled value={assignedTo} onChange={e => setAssignedTo(e.target.value)} placeholder="Assign to (self)" />
                        <Form.Control disabled value={taskDueDate} onChange={e => setTaskDueDate(e.target.value)} type="text" placeholder="Due Date (2 days)"/>
                        <Button type="submit">Create</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default TaskManipulationNavbar;