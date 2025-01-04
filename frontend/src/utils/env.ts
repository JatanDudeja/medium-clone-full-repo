const env: string = import.meta.env.VITE_APP_ENV || "dev";
let BASE_URL = "http://localhost:8787/api/v1/";

if (env !== "dev") {
  BASE_URL = "https://backend.dudeja-jatan04.workers.dev/api/v1/";
}

export { BASE_URL };
