import axios from "axios";

const AxiosConifg = axios.create({
  baseURL: "https://frotify-backend.vercel.app",
});

export default AxiosConifg;