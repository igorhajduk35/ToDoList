import React, { useEffect, useState } from "react";
import Task from "../components/TasksPage/Task";
import TaskManipulationNavbar from "../components/TasksPage/TaskManipulationNavbar";

function Tasks() {
    // DB
    const [tasks, setTasks] = useState([])

    const fetchData = async() => {
        const res = await fetch("http://localhost:5050/get_tasks");

        const data = await res.json();

        console.log(data);

        setTasks(data["users"]);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div>
            <TaskManipulationNavbar />
            {tasks.map(task => (
                <Task key={task.id} task={task}/>
            ))}
        </div>
    );
}

export default Tasks;