type User = {
    first_name: string;
    last_name: string;
  };
  
  type ClientTask = {
    client: any;
    task_id: number;
  };
export type TUserRole = {
    notes: string[];
    taskOccurrencesId: number;
    allocated_time: string;
    timetaken_formatted: string;
    time_taken: string;
    time_status?: string;
    cost: any;
    GP: any;
    client: any;
    selected_date: any;
    task: any;
    status: any;
    recurring_note: boolean;
    id: number;
    name?: string;
    first_name?:string;
    last_name?:string;
    active: number;
    createdAt: Date;
    updatedAt: Date;
    client_name?:string;
    client_task_id?: number;
    user_id?: number;
    notes_text?: string;

    client_task?: ClientTask;
    user?: User;
  
}

export type TUser = {
    user: any;
    id: number;
    email: string;
    password?: string;
    full_name: string;
    first_name?:string;
    last_name?:string;
    contact_number: string;
    phone_code: string;
    role: number;
    profile_photo: string;
    address: string;
    last_login_at: Date;
    last_login_ip: string;
    refresh_token?: string;
    createdAt: Date;
    updatedAt: Date;
};