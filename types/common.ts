export type DefaultValue = {
  id: string;
  name: string;
  value?:string;
  position_id?:number,
  status?:string,
};

// export type DefaultNumberValue = {
//   id: number;
//   name: string;
//   value?:string;
//   position_id?:number,
//   recurrence_no?:string | undefined,
// };
// export type DefaultReportValue = {
//   id: string;
//   name: string;
// };

export type TQueryData = {
  size: number;
  skip: number;
  search: string;
  sorting?: string;
  status?:string,
  trashOnly?: string;
  filter?: string;
  employeeId?:number | null;
  clientId?:number | null;
  startDate?:string | null;
  endDate?:string | null;
  branchId?:number | null;
  clientTaskId?:number | null;
  format?:string | null;
  client_task_date?:string | null;
  selectedDate?:string,
  manager_id?:number
  addPersonalTask?:boolean,
  GP?:boolean,
};

export enum BooleanValues {
  YES = "Yes",
  NO = "No",
}

export type TDashboardQueryData = {
  range: string;
  type: string;
};

export type TDashboardFilter = {
  id: string;
  name: string;
};


 export interface RadioButtonProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  symbol?:string;
}

export enum USER_ROLE_ENUM {
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
  SENIOR_MANAGER = 'SENIOR_MANAGER',
  ADMIN = 'ADMIN',
}

export const USER_ROLE_LABELS = {
  [USER_ROLE_ENUM.EMPLOYEE]: 'Employee',
  [USER_ROLE_ENUM.MANAGER]: 'Manager',
  [USER_ROLE_ENUM.SENIOR_MANAGER]: 'Senior Manager',
  [USER_ROLE_ENUM.ADMIN]: 'Admin',
};


export enum TASK_STATUS_ENUM {
  PENDING = "PENDING",
  STARTED = "STARTED",
  PAUSED = "PAUSED",
  COMPLETED = "COMPLETED",
  EXPIRED = "EXPIRED",
  READY_FOR_REVIEW='READY_FOR_REVIEW',
  IN_PROGRESS='IN_PROGRESS',
  NOT_STARTED='NOT_STARTED',
  APPROVED='APPROVED'
}

export enum TASK_ACTIVITY_ACTION_ENUM {
  STARTED = "STARTED",
  PAUSED = "PAUSED",
  RESTARTED = "RESTARTED",
  COMPLETED = "COMPLETED",
}
