import { useState } from "react";

interface CreateTaskProps {
  isOpen: boolean;
  toggle: () => void;
}

const CreateTaskModal = ({ isOpen, toggle }: CreateTaskProps) => {
  const [description, setDescription] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

    const data = {
      desc: description,
      dueDate: date,
    };

    if (data.desc === "") return;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:5083/tasks", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error creating new task", error);
      });

    toggle();
  };

  const visbility = isOpen ? "" : "hidden";

  return (
    <div id="create-task-modal" className={`bg-blue ${visbility}`}>
      <form onSubmit={handleSubmitForm}>
        <div className="flex flex-col padding">
          <label htmlFor="">Description</label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col padding">
          <label htmlFor="date">Select a date:</label>
          <br />
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col padding">
          <input
            type="submit"
            value="Submit"
            className="standard-button bg-black"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTaskModal;
