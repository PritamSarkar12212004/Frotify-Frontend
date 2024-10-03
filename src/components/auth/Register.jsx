import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AxiosConifg from "../../utils/api/AxiosConifg";
import RegisterFaild from "../extra/alert/RegisterFaild";
import AuthLoading from "../extra/Loading/AuthLoading";

const Register = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [opensss, setOpensss] = useState(false);
  const { reset, handleSubmit, register } = useForm();
  const controllForm = (data) => {
    setOpensss(true);
    AxiosConifg.post("/auth/register", data)
      .then((res) => {
        if (res.status === 202) {
          localStorage.setItem("userAuth", res.data.email);
          reset();
          setOpensss(false);
          navigate("/");
          window.location.reload();
        } else {
          setOpen(true);
          setOpensss(false);
        }
      })
      .catch((err) => {
        setOpen(true);
        setOpensss(false);

        reset();
      });
  };
  return (
    <div>
      {opensss ? <AuthLoading /> : null}
      <div className="min-h-screen flex flex-col justify-center items-center  bg-zinc-300 ">
        {open ? <RegisterFaild setOpen={setOpen} open={open} /> : null}
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Create Your Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(controllForm)}>
            {/* Name Field */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                {...register("name")}
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                {...register("email")}
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                {...register("password")}
                required
              />
            </div>

            {/* Role Field */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-600">Role</label>
              <input
                type="text"
                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Student"
                {...register("role")}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
