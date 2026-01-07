import { DataTableSortStatus } from 'mantine-datatable';
import { TQueryData } from '@/types';

export const phoneStyles = {
  backgroundColor: '#fff',
  display: 'flex',
  borderRadius: 8,
  borderColor: 'rgb(218 218 218)',
  borderStyle: 'solid',
  borderWidth: 1,
  paddingLeft: 15,
  paddingTop: 11,
  paddingBottom: 11,
  outline: 'none',
  boxShadow: 'none',
};

export const DATEFILTERS = {
  LastMonth: 'Last Month',
  ThisMonth: 'This Month',
  LastWeek: 'Last Week',
  ThisWeek: 'This Week',
};

export const METRIC_TYPES = {
  CLIENTS: 'clients',
  INCOME: 'income',
  USERS: 'users',
  INCOME_SERIES: 'income_series',
};

export const DEFAULT_SORT = 'id DESC';

export const DEFAULT_QUERY: TQueryData = {
  size: 10,
  skip: 0,
  search: '',
  sorting: DEFAULT_SORT,
  trashOnly: '',
  employeeId: null,
};

export const DEFAULT_DROPDOWN_QUERY: TQueryData = {
  size: 100,
  skip: 0,
  search: '',
  sorting: DEFAULT_SORT,
  trashOnly: '',
  employeeId: null,
};

export const DEFAULT_SORTING: DataTableSortStatus = {
  columnAccessor: 'id',
  direction: 'asc',
};

export const dayKeys = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const displayDayKeys = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const recurrenceFields = [
  { id: 1, name: 'Daily', value: 'DAY',recurrence_no:'1'},
  { id: 2, name: 'Weekly', value: 'WEEK' ,recurrence_no:'1'},
  { id: 3, name: 'Monthly', value: 'MONTH',recurrence_no:'1' },
  { id: 3, name: 'Bi-Monthly', value: 'BI-MONTH' ,recurrence_no:'2'},
  { id: 4, name: 'Quarterly', value: 'QUARTERLY' ,recurrence_no:'4'},
  { id: 4, name: 'Annual', value: 'YEAR' ,recurrence_no:'1'},
];


export const shortFormWeekdays = [
  { name: 'Mon', value: 'MON' },
  { name: 'Tue', value: 'TUE' },
  { name: 'Wed', value: 'WED' },
  { name: 'Thu', value: 'THU' },
  { name: 'Fri', value: 'FRI' },
  { name: 'Sat', value: 'SAT' },
  { name: 'Sun', value: 'SUN' }
];
