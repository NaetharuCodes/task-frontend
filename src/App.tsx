import { useState, useEffect } from "react";
import Task, { TaskProps } from "./components/Task";
import "./index.css";
import { LiaFilterSolid } from "react-icons/lia";
import { IoMdCreate } from "react-icons/io";
import CreateTaskModal from "./components/CreateTaskModal";

const App = () => {
  const [tasks, setTasks] = useState<TaskProps[] | null>(null);
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [refetchTasks, setRefetchTasks] = useState(false);

  const apiURL = "http://localhost:5083/tasks";

  useEffect(() => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks(null);
      });
  }, [refetchTasks]);

  if (tasks === null) {
    return <div className="flex "> Loading... </div>;
  }

  const toggleCreateTaskModal = () => {
    setOpenCreateTask(!openCreateTask);
  };

  const refreshTasks = () => {
    setRefetchTasks((prev) => !prev);
  };

  return (
    <div>
      {/* HEADER */}
      <header
        className="flex flex-middle bg-blue text-white text-title"
        id="header"
      >
        Tasks App
      </header>

      {/* BUTTONS BAR */}
      <div className="flex flex-spread padding" id="buttons-bar">
        <button className="icon-button">
          <LiaFilterSolid size={32} />
        </button>
        <button className="icon-button" onClick={toggleCreateTaskModal}>
          <IoMdCreate size={32} />
        </button>
      </div>

      {/* MODALS */}
      <CreateTaskModal
        isOpen={openCreateTask}
        toggle={toggleCreateTaskModal}
        onTaskCreated={refreshTasks}
      />

      {/* TASKS */}
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
