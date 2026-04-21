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

        loadTasks();
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

            loadTasks();

        } catch (err) {
            console.error(err)
        }
    }

    const loadTasks = async() => {
        const response = await fetch("http://localhost:5050/get_tasks?status=any");

        const data = await response.json();

        setTasks(data["tasks"]);
    }

    useEffect(() => {
        loadTasks();
    }, [])

    const todoTasks = tasks.filter(t => t.status === "todo")
    const inProgressTasks = tasks.filter(t => t.status === "in_progress")
    const completedTasks = tasks.filter(t => t.status === "completed")
    const expiredTasks = tasks.filter(t => t.status === "expired")


    return(
        <div className="mt-3">
            <TaskManipulationNavbar onAddTask={handleAddTask}/>

            <div className="text-center row mt-2 m-5">
                <div className="col d-flex flex-column align-items-center shadow-sm py-3 m-3">
                    <h3>Todo</h3>
                    {todoTasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            onDeleteTask={handleDeleteTask}
                        />
                    ))}
                </div>
                <div className="col d-flex flex-column align-items-center shadow-sm py-3 m-3">
                    <h3>In Progress</h3>
                    {inProgressTasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            onDeleteTask={handleDeleteTask}
                        />
                    ))}
                </div>
                <div className="col d-flex flex-column align-items-center shadow-sm py-3 m-3">
                    <h3>Completed</h3>
                    {completedTasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            onDeleteTask={handleDeleteTask}
                        />
                    ))}
                </div>
                <div className="col d-flex flex-column align-items-center shadow-sm py-3 m-3">
                    <h3>Expired</h3>
                    {expiredTasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            onDeleteTask={handleDeleteTask}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tasks;