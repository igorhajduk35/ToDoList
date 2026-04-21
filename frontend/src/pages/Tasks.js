import React, { useEffect, useState } from "react";
import Task from "../components/TasksPage/Task";
import TaskManipulationNavbar from "../components/TasksPage/TaskManipulationNavbar";

function Tasks() {
    // DB
    const [tasks, setTasks] = useState([])

    const handleDeleteTask = async(id) => {
        await fetch("http://localhost:5050/discard_task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task_id: id
            }),
        });

        fetchData();
    }

    const handleAddTask = async(title, description, assigned_to, due_date) => {
        try {
            const response = await fetch("http://localhost:5050/add_task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task_title: title,
                    task_description: description,
                    task_assigned_to: assigned_to,
                    task_due_date: due_date
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add task")
            }

            fetchData();

        } catch (err) {
            console.error(err)
        }
    }

    const fetchData = async() => {
        const response = await fetch("http://localhost:5050/get_tasks");

        const data = await response.json();

        setTasks(data["tasks"]);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div>
            <TaskManipulationNavbar
                onAddTask={handleAddTask}
            />
            {tasks.map(task => (
                <Task
                    key={task.id}
                    task={task}
                    onDeleteTask={handleDeleteTask}
                />
            ))}
        </div>
    );
}

export default Tasks;