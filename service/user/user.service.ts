import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../lib/Fetch";
import { StaticImageData } from 'next/image';

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};


interface SummaryParams {
  title: string;
  href: string;
}




interface GetSummaryConfig {
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  params?: {
    limit: number;
    page: number;
  }
}

export const UserService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const data = {
      identifier: email,
      password: password,
    };
    return await Fetch.post("/auth/login", data, config);
  },

  register: async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    const data = {
      username: username,
      email: email,
      password: password,
    };
    return await Fetch.post("/auth/register", data, config);
  },

  logout: (context = null) => {
    CookieHelper.destroy({ key: "token", context });
  },
  // get user details
  getUserDetails: async ({ token = "", context = null }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user/me`, _config);
  },

  findAll: async (context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user`, _config);
  },

  getSummary: async (params: SummaryParams, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });
    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    // For GET requests, parameters should typically be in the URL, not body
    const queryParams = new URLSearchParams({
      title: params.title,
      href: params.href
    }).toString();

    return await Fetch.get(`/dashboard/summary?${queryParams}`, config);
  },
  getEmpRoleOverview: async (params: SummaryParams, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    // For GET requests, parameters should typically be in the URL, not body
    const queryParams = new URLSearchParams({
      title: params.title,
      href: params.href
    }).toString();

    return await Fetch.get(`/dashboard/employee-role-distribution?${queryParams}`, config);
  },
  getAttendanceReport: async (params: SummaryParams, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });
    const month = new Date().getMonth();

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    // For GET requests, parameters should typically be in the URL, not body
    const queryParams = new URLSearchParams({
      title: params.title,
      href: params.href
    }).toString();

    return await Fetch.get(`/dashboard/attendance-report?start=${month + 1}&${queryParams}`, config);
  },
  getEmpData: async (limit?: number, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    // For GET requests, parameters should typically be in the URL, not body
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
    }).toString();

    return await Fetch.get(`/employee?${queryParams}`, config);
  },
  getSingleEmpData: async (id: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    return await Fetch.get(`/employee/${id}`, config);
  },
  getAllEmpData: async (context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    return await Fetch.get(`/employee`, config);
  },

  getAttendanceData: async (month: number, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    // For GET requests, parameters should typically be in the URL, not body
    const queryParams = new URLSearchParams({
      month: month.toString(),
    }).toString();

    return await Fetch.get(`/attendance/grid?${queryParams}`, config);
  },


  getEmpLoanData: async (page: number = 1, limit: number = 10, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      params: {
        page,
        limit
      }
    };

    return await Fetch.get(`/employee-loan`, config);
  },
  getNotification: async (context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      }
    };

    return await Fetch.get(`/admin/notification`, config);
  },


  deleteEmpLoadData: async (loanDetails: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      }
    }

    return Fetch.delete(`/employee-loan/${loanDetails}`, config);
  },



  updateEmp: async (data, id: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });
    const config = {
      method: 'UPDATE',
      headers: {
        Authorization: `Bearer ${userToken}`,
      }
    }
    return await Fetch.patch(`/employee/${id}`, data, config);
  },

  createEmployee: async (data: {
    file: string | StaticImageData,
    first_name: string,
    last_name: string,
    password: string,
    email: string,
    phone_number: string,
    physical_number: string,
    hourly_rate: number,
    employee_role: string,
    address: string,
  }, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });
    const config = {
      method: 'INSERT',
      headers: {
        'Content-Type': 'multipart/form-data;',
        Authorization: `Bearer ${userToken}`,
      }
    }
    return await Fetch.post(`/employee`, data, config);
  },


  createEmpHoliday: async (data: {
    user_id: string,
    start_date: string,
    end_date: string,
  }, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });
    const config = {
      method: 'INSERT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      }
    }
    return await Fetch.post(`/employee-holiday`, data, config);
  },



  getEmpHolidays: async (context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    return await Fetch.get(`/employee-holiday`, config);
  },


  getProjectData: async (context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    return await Fetch.get(`/project`, config);
  },


  getProfile: async (context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    return await Fetch.get(`/auth/me`, config);
  },


  createNewProject: async (data: {
    address: string,
    // assignees: string[],
    end_date: string,
    name: string,
    price: number,
    priority: string,
    start_date: string
  }, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });
    const config = {
      method: 'INSERT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      }
    }
    return await Fetch.post(`/project`, data, config);
  },


  updateProject: async ({ data, id }, context = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      }
    }
    return await Fetch.patch(`/project/${id}`, data, config);
  },


  getSingleProjectData: async (id: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    return await Fetch.get(`/project/${id}`, config);
  },


  deleteProject: async (projectid: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      }
    }

    return Fetch.delete(`/project/${projectid}`, config);
  },


  updateAdminProfile: async (data: {
    name: string,
    email: string,
    phone_number: string,
    date_of_birth: string,
    country: string,
    state: string,
    city: string,
    address: string,
    zip_code: string,
  }, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });
    const config = {
      method: 'UPDATE',
      headers: {
        'Content-Type': 'multipart/form-data;',
        Authorization: `Bearer ${userToken}`,
      }
    }
    return await Fetch.patch(`/auth/update`, data, config);
  },


  getEvents: async (month: number, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    return await Fetch.get(`/academic-calendar?month=${month}`, config);
  },
  createEvent: async (eventData: { title: string, start_date: string, end_date: string, event_type: string }, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });
    const config = {
      method: 'INSERT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      }
    }
    return await Fetch.post(`/academic-calendar`, eventData, config);
  },
  updateEvent: async (eventId: string, eventData: { title: string, start_date: string, end_date: string, event_type: string }, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config = {
      method: 'UPDATE',
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${userToken}`,
      }
    }

    return await Fetch.patch(`/academic-calendar/${eventId}`, eventData, config);
  },
  deleteEvent: async (eventId: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    return await Fetch.delete(`/academic-calendar/${eventId}`, config);
  },

  checkAttendance: async (context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    return await Fetch.post(`/attendance/check-absence`, {}, config);
  },

  updateAttendance: async (id: string, data: { hours: number, project_id: string }, context: any = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    return await Fetch.patch(`/attendance/${id}`, data, config);
  },


  updateEmpLoan: async (id: string, data: { loan_status: string }, context = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    return await Fetch.patch(`/employee-loan/${id}`, data, config);
  },

  deleteEmployee: async (id: string, context = null) => {
    const userToken = CookieHelper.get({ key: "empdashtoken", context });

    const config: GetSummaryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    return await Fetch.delete(`/employee/${id}`, config);
  },
  createAttendace: async ({ user_id, project_id, date, hours }: { user_id: string; project_id: string, date: string, hours: number }) => {
    const data = {
      user_id,
      project_id,
      date,
      hours
    };
    return await Fetch.post("/attendance", data, config);
  },
};
