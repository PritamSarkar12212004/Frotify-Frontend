import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosConifg from "../../utils/api/AxiosConifg";
const LoginPage = () => {
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm();
  const formControll = (data) => {
    AxiosConifg.post("/auth/login", data)
      .then((res) => {
        if (res.status === 202) {
          alert("logIn success");
          localStorage.setItem("userAuth", res.data.email);
          reset();
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        alert(`plz Register ${err.response.data.error}`);
      reset();
      });
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-300 ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Welcome Back!
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(formControll)}>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              {...register("password")}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link className="text-blue-600 hover:underline" to={"/register "}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
