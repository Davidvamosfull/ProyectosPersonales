import React, { useState, useEffect} from "react";
import { nanoid } from "nanoid";
import { Task } from '../Task'
import { Button } from "@radix-ui/themes";
import { Close } from "./Icons"

interface AddTaskModalProps {
    show: boolean;
    hideModal: () => void;
    onSubmit: (data: Task) => void;
}

const Modal: React.FC<AddTaskModalProps> = ({ show, hideModal, onSubmit }) => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("");
    const [taskPriority, setTaskPriority] = useState("🔴");
  
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
              hideModal();
          }
      };

      if (show) {
          document.addEventListener('keydown', handleEscape);
      }

      return () => {
          document.removeEventListener('keydown', handleEscape);
      };
  }, [show, hideModal]);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskName.trim() === "") {
      alert("Please enter a task name");
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title: taskName,
      description: taskDescription,
      dateCreated: new Date().toLocaleDateString(),
      deadLine: taskDeadline || "",
      priority: taskPriority,
      doing: false,
    };

    onSubmit(newTask);
    setTaskName("");
    setTaskDescription("");
    setTaskDeadline("");
    setTaskPriority("🔴");
    hideModal();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal display-block">
      <section className="modal-main">
      <button onClick={hideModal} className="close-button">
        <Close />
      </button>
        <h2>Add a new task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Task Name:
            <input
              type="text"
              name="taskName"
              placeholder="Tittle"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="taskDescription"
              placeholder="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Deadline:
            <input
              type="date"
              name="taskDeadline"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
              pattern="\d{2}/\d{2}/\d{4}"
            />
          </label>
          <label>
            Priority:
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              required
            >
              <option value="🔴">🔴 Low</option>
              <option value="🟡">🟡 Medium</option>
              <option value="🔵">🔵 High</option>
            </select>
          </label>
          <Button type="submit">Add Task</Button>
        </form>
      </section>
    </div>
  );
};

export default Modal;
