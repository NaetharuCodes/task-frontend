import Task from "./components/Task";
import "./index.css";

const dummyData = [
  {
    taskId: "T0001",
    taskName: "Urgent thing I need to do",
    dueDate: new Date(),
    completed: false,
  },
  {
    taskId: "T0002",
    taskName: "A task I have already finished",
    dueDate: new Date(),
    completed: true,
  },
];

const App = () => {
  return (
    <div>
      <header
        className="flex flex-middle bg-blue text-white text-title"
        id="header"
      >
        Tasks App
      </header>
      <div>
        {dummyData.map((task) => (
          <Task
            taskId={task.taskId}
            taskName={task.taskName}
            dueDate={task.dueDate}
            completed={task.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
