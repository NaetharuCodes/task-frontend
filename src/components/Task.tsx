import { useState } from "react";

export interface TaskProps {
  id: number;
  desc: string;
  dueDate: Date;
  completed: boolean;
}

const Task = ({ id, desc, dueDate, completed }: TaskProps) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);

  const handleCompleteTask = () => {
    // set state
    setIsCompleted(true);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    };

    fetch(`http://localhost:5083/tasks/${id}/status`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        if (response.status === 204) {
          return null;
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error updating status", error);
      });
  };

  const date = new Date(dueDate);
  const today = new Date();
  const overdue = date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);

  const overdueStyle =
    overdue && !isCompleted
      ? "padding border-bottom bg-red"
      : isCompleted
      ? "padding border-bottom bg-green"
      : "padding border-bottom";

  return (
    <div className={overdueStyle}>
      <div className="padding">{desc}</div>
      <div className="flex flex-spread padding date-button-row">
        <div>{date.toDateString()}</div>
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
