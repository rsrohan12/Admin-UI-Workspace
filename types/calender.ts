export interface Task {
  task_id: any;
  client_id: number;
  per_day_hours:number,
  per_day_minutes:number,
  requested_time: number;
  company_name?: string;
  time_taken_minutes: number;
  time_taken_hours: number;
  id: any;
  taskOccurrences: any;
  virtualId?:string,
  client_task_id: number;
  task: string;
  employee: string;
  hours: number;
  minutes: number;
  dates: DateEntry[];
  original_occurrence_date:string,
}

export interface DraggableTaskRowProps {
  companyIndex: number;
  taskIndex: number;
  moveTaskLabel: (
    sourceCompanyIndex: number,
    date: string,
    taskIndex: number,
    virtualId?:string
  ) => void;
  task: Task;
  visibleDates: string[];
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTaskId?:React.Dispatch<React.SetStateAction<number>>
  setVirtualTempId?:React.Dispatch<React.SetStateAction<string>>
  setSourceCompanyIndex?:React.Dispatch<React.SetStateAction<number>>
  setTaskIndex?:React.Dispatch<React.SetStateAction<number>>, 
  setSelectedTaskDate?:React.Dispatch<React.SetStateAction<string>>
  setTaskName?:React.Dispatch<React.SetStateAction<string>>, 
  setSourceCompanyName?:React.Dispatch<React.SetStateAction<string>>

}

export interface DraggableDateLabelProps {
  dateEntry: any;
  sourceCompanyIndex: number;
  taskIndex: number;
  moveTaskLabel: (
    sourceCompanyIndex: number,
    date: string,
    taskIndex: number,
    virtualId?:string,
  ) => void;
  targetDate: string;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  task:Task,
  setSelectedTaskId?:React.Dispatch<React.SetStateAction<number>>
  virtualId?:string
  setVirtualTempId?:React.Dispatch<React.SetStateAction<string>>
  setSourceCompanyIndex?:React.Dispatch<React.SetStateAction<number>>
  setTaskIndex?:React.Dispatch<React.SetStateAction<number>>
  setSelectedTaskDate?:React.Dispatch<React.SetStateAction<string>>
  setTaskName?:React.Dispatch<React.SetStateAction<string>>, 
  setSourceCompanyName?:React.Dispatch<React.SetStateAction<string>>
}

export interface DroppableDateCellProps {
  date: string;
  moveTaskLabel: (
    sourceCompanyIndex: number,
    date: string,
    taskIndex: number,
    virtualId?:string,
  ) => void;
  companyIndex: number;
  taskIndex: number;
}

export interface DraggedItem {
  sourceCompanyIndex: number;
  taskIndex: number;
  virtualId?:string;
}

export interface DateEntry {
  original_occurrence_date: any;
  date: string;
  label: string;
  color: string;
  virtualId?:string;
}

type ClientData = {
  client: string;
  tasks: Task[];
};

export type InitialData = ClientData[];

export const CalendarColorArray = [
  '#039855',
  '#FF7722',
  '#D92D20',
  '#2B6FEE',
  '#DDA0DD',
  '#FFA07A',
  '#20B2AA',
];
