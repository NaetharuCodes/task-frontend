import { useState } from "react";

export interface TaskProps {
  id: number;
  desc: string;
  dueDate: Date;
  completed: boolean;
}

const Task = ({ desc, dueDate, completed }: TaskProps) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);

  const handleCompleteTask = () => {
    // set state
    setIsCompleted(true);
    // TODO: update data via the API
  };

  const date = new Date(dueDate);
  const today = new Date();
  const overdue = date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);

  console.log(date);
  console.log(today);
  console.log("overdue: ", overdue);

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
