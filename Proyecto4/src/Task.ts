export interface Task {
    id?: string;
    title: string;
    description: string;
    dateCreated?: string;
    deadLine: string;
    priority: string;
    doing?: boolean;
}