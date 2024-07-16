import { TodoistApi } from "@doist/todoist-api-typescript";
import { Task } from '../Task';

const api = new TodoistApi("448dbbbb7a9c9aeeeb1304324bcbba8862609068");

export function ToDoApiAddTask(newTask: Task) {
    // const api_key = process.env.TODO_IST_API_TOKEN as string

    api.addTask({
        content: newTask.title,
        description: newTask.description,
    })
}


export function ToDoApiGetTasks(/*newTask: Task*/) {

    let tasks = api.getTasks()

    return JSON.stringify(tasks);

}
