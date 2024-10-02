import axios from "axios";

const AxiosConifg = axios.create({
  baseURL: "http://localhost:3000",
});

export default AxiosConifg;