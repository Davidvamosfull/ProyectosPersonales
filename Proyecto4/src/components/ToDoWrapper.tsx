import { useState, useEffect } from "react";
import { Text } from '@radix-ui/themes';
import List from "./Lists";
import { FilterButton } from "./FilterButtons";
import AddButton from './AddButton';
import { Task } from '../Task';
import { ToDoApiAddTask } from '../api/ToDoIst'

interface ToDoProps {
  title: string;
}

export function ToDoWrapper({ title }: ToDoProps) {
  const [filter, setFilter] = useState<string>("doing");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    setTasks(storedTasks);
  }, []);

  const updateList = (newTask: Task[]) => {
    setTasks(newTask);
    localStorage.setItem('tasks', JSON.stringify(newTask));
  }

  const handleAddTask = (newTask: Task) => {
    ToDoApiAddTask(newTask);
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  return (
    <main className="to-do-wrapper">
      <div className="hero-title">
        <Text>{title}</Text>
      </div>
      <div className="task-wrapper">
        <div className="buttons-wrapper">
          <AddButton handleAdd={handleAddTask} />
          <FilterButton onFilterChange={handleFilterChange} />
        </div>
        <List filter={filter} data={tasks} updateList={updateList} />
      </div>
    </main>
  );
}
