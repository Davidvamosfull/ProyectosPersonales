import { useEffect } from "react";
import { ListItem } from "./ListItem";
import { Task } from '../Task'
import { ToDoApiGetTasks } from '../api/ToDoIst'

interface ListProps {
  filter: string; 
  data: Task[];
  updateList: (newData: Task[])=> void;
}

const List = ({ filter, data, updateList }: ListProps) => {

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (savedData.length > 0) {
      updateList(savedData);
    }
  }, []);

  const handleDelete = (id?: string): void => {
    let tasks = ToDoApiGetTasks();
    console.log(tasks)
    const updatedData = data.filter((item) => item.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedData));
    updateList(updatedData);
  };

  const handleToggleDoing = (id?: string): void => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, doing: !item.doing };
      }
      return item;
    });
    updateList(updatedData);
    localStorage.setItem("tasks", JSON.stringify(updatedData));
  };

  const handleEdit = (updatedTask: Task): void => {
    const updatedData = data.map((item) => (item.id === updatedTask.id ? updatedTask : item));
    updateList(updatedData);
    localStorage.setItem("tasks", JSON.stringify(updatedData));
  };

  return (
    <div className="list-wrapper scrollable-container">
      {data
        .filter((item) => {
          if (filter === "all") {
            return true;
          } else if (filter === "doing") {
            return !item.doing;
          } else if (filter === "done") {
            return item.doing;
          }
          return true;
        })
        .map((item) => (
          <ListItem
            key={item.id}
            task={item}
            onToggleDoing={() => handleToggleDoing(item.id)}
            onDelete={() => handleDelete(item.id)}
            onEdit={handleEdit}
          />
        ))}
    </div>
  );
};

export default List;
