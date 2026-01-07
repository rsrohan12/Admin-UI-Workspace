export const LINKS = {
  dashboard: {
    route: '/dashboard',
  },
  login: {
    route: '/auth/signin',
  },
  resetPassword: {
    route: '/auth/reset-password',
  },
  changePassword: {
    route: (param: string) => `/auth/change-password/?token=${param}`,
  },
  userRoles: {
    route: '/user-roles',
    add: '/user-roles/add',
    edit: (param: string) => `/user-roles/edit/${param}`,
  },
  users: {
    route: '/users',
    add: '/users/add',
    edit: (param: string) => `/users/edit/${param}`,
    trash: '/users/trash',
  },
  branch: {
    route: '/branch',
    add: '/branch/add',
    edit: (param: string) => `/branch/edit/${param}`,
    trash: '/branch/trash',
  },
  position: {
    route: '/user-position',
    add: '/user-position/add',
    edit: (param: string) => `/user-position/edit/${param}`,
    trash: '/user-position/trash',
  },

  reasons_for_unable_to_work: {
    route: '/reasons-for-unable-to-work',
    add: '/reasons-for-unable-to-work/add',
    edit: (param: string) => `/reasons-for-unable-to-work/edit/${param}`,
    trash: '/reasons-for-unable-to-work/trash',
  },

  employees: {
    route: '/employees',
    add: '/employees/add',
    edit: (param: string) => `/employees/edit/${param}`,
    trash: '/employees/trash',
  },
  manager: {
    route: '/managers',
    add: '/managers/add',
    edit: (param: string) => `/managers/edit/${param}`,
    trash: '/managers/trash',
  },

  admin: {
    route: '/admins',
    add: '/admins/add',
    edit: (param: string) => `/admins/edit/${param}`,
    trash: '/admins/trash',
  },

  task: {
    route: '/tasks',
    add: '/tasks/add',
    edit: (param: string) => `/tasks/edit/${param}`,
    trash: '/tasks/trash',
  },

  client: {
    route: '/clients',
    add: '/clients/add',
    edit: (param: string) => `/clients/edit/${param}`,
    trash: '/clients/trash',
  },

  block_master: {
    route: '/block-master',
    add: '/block-master/add',
    edit: (param: string) => `/block-master/edit/${param}`
  },

  colony_master: {
    route: '/colony-master',
    add: '/colony-master/add',
    edit: (param: string) => `/colony-master/edit/${param}`
  },

  survey: {
    route: '/survey',
    add: '/survey/add',
    edit: (param: string) => null,
  },

  employee_current_day: {
    route: '/current-day',

  },

};
