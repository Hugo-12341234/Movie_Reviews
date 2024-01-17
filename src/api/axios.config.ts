import axios from "axios";

export default axios.create({
  baseURL: "https://853a-74-58-142-142.ngrok-free.app",
  headers: {"ngrok-skip-browser-warning": "true"}
});