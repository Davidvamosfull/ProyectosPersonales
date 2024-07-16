import { useState, useEffect } from "react";
import { Close } from "./Icons";
import { Button } from "@radix-ui/themes";

interface Task {
    title: string;
    description: string;
    deadLine: string;
    priority: string;
}

interface EditTaskModalProps {
    show: boolean;
    hideModal: () => void;
    onSubmit: (data: Task) => void;
    data?: Task;
}

const ModalEdit: React.FC<EditTaskModalProps> = ({ show, hideModal, onSubmit, data }) => {

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("");
    const [taskPriority, setTaskPriority] = useState("🔴");

    useEffect(() => {
        if (data) {
            setTaskName(data.title);
            setTaskDescription(data.description);
            setTaskDeadline(data.deadLine);
            setTaskPriority(data.priority || "🔴");
        }
    }, [data]);

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskName.trim() === "") {
            alert("Please enter a task name");
            return;
        }

        const editTask: Task = {
            title: taskName,
            description: taskDescription,
            deadLine: taskDeadline,
            priority: taskPriority,
        };

        onSubmit(editTask);
        hideModal();
    };

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


    if (!show) {
        return null;
    }

    return (
        <div className="modal display-block">
            <section className="modal-main">
            <button onClick={hideModal} className="close-button">
                <Close />
            </button>
                <h2>Edit Task</h2>
                <form onSubmit={handleEdit}>
                    <label>
                        Task Name:
                        <input
                            type="text"
                            name="taskName"
                            placeholder="Title"
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
                        />
                    </label>
                    <label>
                        Priority:
                        <select
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                            required
                        >
                            <option value="🔴" selected>🔴 Low</option>
                            <option value="🟡">🟡 Medium</option>
                            <option value="🔵">🔵 High</option>
                        </select>
                    </label>
                    <Button type="submit">Edit Task</Button>
                </form>
            </section>
        </div>
    );
};
export default ModalEdit;
