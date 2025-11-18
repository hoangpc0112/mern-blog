import NProgress from "nprogress";
import "nprogress/nprogress.css";

const BASE_API_URL =
  process.env.REACT_APP_BASE_API_URL || "http://localhost:8080";

let activeRequests = 0;
let progressInterval = null;

class ApiClient {
  constructor() {
    this.base_url = BASE_API_URL + "/api";
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 100,
    });
  }

  startProgress() {
    if (activeRequests === 0) {
      NProgress.set(0);
      NProgress.start();
      progressInterval = setInterval(() => {
        const current = NProgress.status || 0;
        if (current < 0.95) {
          NProgress.set(current + 0.02);
        }
      }, 100);
    }
    activeRequests++;
  }

  stopProgress() {
    activeRequests--;
    if (activeRequests <= 0) {
      activeRequests = 0;
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
      NProgress.done();
    }
  }

  async request(options) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== "") query = "?" + query;

    this.startProgress();

    let response;
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: { "Content-Type": "application/json", ...options.headers },
        body: options.body ? JSON.stringify(options.body) : null,
      });
    } catch (error) {
      response = {
        ok: false,
        status: 500,
        body: async () => ({
          code: 500,
          message: "The server is unresponsive",
          description: error.toString(),
        }),
      };
    }

    this.stopProgress();

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null,
    };
  }

  async get(url, query, options) {
    return this.request({ method: "GET", url, query, ...options });
  }

  async post(url, body, options) {
    return this.request({ method: "POST", url, body, ...options });
  }

  async put(url, body, options) {
    return this.request({ method: "PUT", url, body, ...options });
  }

  async delete(url, options) {
    return this.request({ method: "DELETE", url, ...options });
  }
}

export default new ApiClient();
