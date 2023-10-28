import { useState, useEffect } from "react";
import Task, { TaskProps } from "./components/Task";
import "./index.css";
import { LiaFilterSolid } from "react-icons/lia";
import { IoMdCreate } from "react-icons/io";
import CreateTaskModal from "./components/CreateTaskModal";

enum TaskFilter {
  ALL = "all",
  OPEN = "open",
  CLOSED = "closed",
  OVERDUE = "overdue",
}

const App = () => {
  const [tasks, setTasks] = useState<TaskProps[] | null>(null);
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [refetchTasks, setRefetchTasks] = useState(false);
  const [filter, setFilter] = useState<TaskFilter>(TaskFilter.ALL);

  const handleFilterChange = () => {
    switch (filter) {
      case TaskFilter.ALL:
        setFilter(TaskFilter.OPEN);
        break;
      case TaskFilter.OPEN:
        setFilter(TaskFilter.OVERDUE);
        break;
      case TaskFilter.OVERDUE:
        setFilter(TaskFilter.CLOSED);
        break;
      case TaskFilter.CLOSED:
        setFilter(TaskFilter.ALL);
        break;
      default:
        setFilter(TaskFilter.ALL);
        break;
    }
  };

  const apiURL = `http://localhost:5083/tasks?filter=${filter}`;

  useEffect(() => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks(null);
      });
  }, [refetchTasks, filter]);

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
        <button className="icon-button" onClick={handleFilterChange}>
          <LiaFilterSolid size={32} />
        </button>
        <div className="text-upper text-title">{filter}</div>
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
