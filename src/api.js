import axios from "axios";

const buildQueryString = (params, namespace) => {
  let qs = namespace ? "" : "?";
  for (const k in params) {
    if (!Object.prototype.hasOwnProperty.call(params, k)) {
      continue;
    }
    const val = params[k];
    if (typeof val === "object") {
      qs += buildQueryString(val, k);
    } else if (val !== null && typeof val !== "undefined") {
      qs +=
        (namespace ? `${namespace}[${k}]` : k) +
        "=" +
        encodeURIComponent(val) +
        "&";
    }
  }
  namespace || qs.replace(/&$/, "");
  return qs;
};

const createApi = (baseURL) => {
  const http = axios.create({
    baseURL,
  });
  http.interceptors.request.use(
    async (config) => {
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  http.interceptors.response.use(async (res) => {
    if (!res) {
      return Promise.reject(new Error("empty res"));
    } else {
      return res.data ? res.data : res;
    }
  });

  const api = {
    get: (url, query, params) => {
      if (query) {
        url += buildQueryString(query);
      }
      return http({
        method: "get",
        url,
        params,
      });
    },
    post: (url, data, params) => {
      return http.post(url, data, params);
    },
    put: (url, data, params) => {
      return http.put(url, data, params);
    },
    delete: (url, data) => {
      return http.delete(url, data);
    },
    baseURL,
  };

  return api;
};

export default createApi;
