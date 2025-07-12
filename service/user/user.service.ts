import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../lib/Fetch";

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
}

export const UserService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    console.log(email)
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
    console.log(username)
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
    console.log("Usertoken : ", userToken)
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
    console.log("Usertoken : ", userToken)
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
    console.log("Usertoken : ", userToken)
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

    return await Fetch.get(`/dashboard/attendance-report?start=${"07"}&${queryParams}`, config);
  },



  findOne: async (id: number, context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user/${id}`, _config);
  },

  findOneByUsername: async ({
    username,
    token = "",
    context = null,
  }: {
    username: string;
    token?: string;
    context?: any;
  }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token || CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user/profile/${username}`, _config);
  },

  update: async (
    {
      fname,
      lname,
      date_of_birth,
      city,
      country,
      organization,
      recipient_name,
      recipient_zip_code,
      recipient_country,
      recipient_state,
      recipient_city,
      recipient_address,
      recipient_phone_number,
    }: {
      fname: string;
      lname: string;
      date_of_birth: string;
      city: string;
      country: string;
      organization: string;
      recipient_name: string;
      recipient_zip_code: string;
      recipient_country: string;
      recipient_state: string;
      recipient_city: string;
      recipient_address: string;
      recipient_phone_number: string;
    },
    context = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      fname: fname,
      lname: lname,
      date_of_birth: date_of_birth,
      city: city,
      country: country,
      organization: organization,
      recipient_name: recipient_name,
      recipient_zip_code: recipient_zip_code,
      recipient_country: recipient_country,
      recipient_state: recipient_state,
      recipient_city: recipient_city,
      recipient_address: recipient_address,
      recipient_phone_number: recipient_phone_number,
    };

    return await Fetch.patch(`/user`, data, _config);
  },

  updateAvatar: async (data: any, context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
        "content-type": "multipart/form-data",
      },
    };

    return await Fetch.patch(`/user/avatar`, data, _config);
  },

  //
  create: async (
    {
      fname,
      lname,
      username,
      email,
      role_id,
    }: {
      fname: string;
      lname: string;
      username: string;
      email: string;
      role_id: number;
    },
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
    const data = {
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      role_id: role_id,
    };

    return await Fetch.post(`/user`, data, _config);
  },

  // TODO
  confirm: async (
    {
      id,
      token,
      email,
      password,
    }: { id: number; token: string; email: string; password: string },
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      id: id,
      token: token,
      email: email,
      password: password,
    };

    return await Fetch.patch(`/user/${id}/password`, data, _config);
  },
};
