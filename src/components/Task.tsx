import { useState } from "react";

interface TaskProps {
  taskId: string;
  taskName: string;
  dueDate: Date;
  completed: boolean;
}

const Task = ({ taskName, dueDate, completed }: TaskProps) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);

  const handleCompleteTask = () => {
    // set state
    setIsCompleted(true);
    // TODO: update data via the API
  };

  return (
    <div className="padding border-bottom">
      <div className="padding">{taskName}</div>
      <div className="flex flex-spread padding">
        <div>{dueDate.toDateString()}</div>
        {isCompleted ? (
          <div className="text-green">Completed</div>
        ) : (
          <button onClick={handleCompleteTask} className="">
            Complete Task
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
