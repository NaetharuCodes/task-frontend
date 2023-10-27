import { useState, useEffect } from "react";
import Task, { TaskProps } from "./components/Task";
import "./index.css";

const dummyData = [
  {
    taskId: "T0001",
    taskDesc: "Urgent thing I need to do",
    dueDate: new Date(),
    completed: false,
  },
  {
    taskId: "T0002",
    taskDesc: "A task I have already finished",
    dueDate: new Date(),
    completed: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState<TaskProps[] | null>(null);

  const apiURL = "http://localhost:5083/tasks";

  useEffect(() => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks(null);
      });
  }, []);

  if (tasks === null) {
    return <div className="flex "> Loading... </div>;
  }

  return (
    <div>
      <header
        className="flex flex-middle bg-blue text-white text-title"
        id="header"
      >
        Tasks App
      </header>
      <div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            desc={task.desc}
            dueDate={task.dueDate}
            completed={task.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
