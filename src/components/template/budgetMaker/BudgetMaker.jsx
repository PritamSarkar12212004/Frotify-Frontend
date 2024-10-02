import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AxiosConifg from "../../../utils/api/AxiosConifg";
import contextMaker from "../../../context/contextMaker";

function BudgetMaker({ setbudgat, setreload, dataprofile }) {
  const { Budget } = dataprofile;

  const { data } = useContext(contextMaker);
  const email = data.email;
  const { reset, handleSubmit, register } = useForm();
  const transType = "Credit";
  const formSubmit = (data) => {
    const { amount } = data;
    const MainAmount = parseInt(amount);
    if (Budget - MainAmount >= 0) {
      AxiosConifg.post("/expense/create", { data, email, transType, Budget })
        .then((res) => {
          setbudgat(false);
          setreload(true);
        })
        .catch((err) => {
          console.log(err);
        });
      reset();
    } else {
      alert("Amount is out of Budget");
    }
  };

  return (
    <div className="w-full z-50 h-screen absolute top-0 left-0 bg-zinc-700/70 backdrop-blur-sm flex justify-center items-center">
      <div className="md:w-[35vw] w-full rounded-3xl px-7 md:py-5 py-16  bg-white">
        <div className="flex w-full justify-between items-center">
          <span className="text-xl"> Create New Budget </span>
          <span
            className="text-2xl cursor-pointer"
            onClick={() => setbudgat(false)}
          >
            <i className="ri-close-large-line"></i>
          </span>
        </div>
        <form
          className="w-full flex flex-col relative justify-between gap-3 py-4 "
          onSubmit={handleSubmit(formSubmit)}
        >
          <select
            name=""
            {...register("category")}
            className="w-full outline-none border-[1px] border-zinc-300 py-2 px-1 rounded-lg"
            id=""
          >
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation </option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education </option>
            <option value="Entertainment">Entertainment </option>
            <option value="Shopping">Shopping </option>
            <option value="Personal_Care">Personal Care </option>
            <option value="Insurance">Insurance </option>
            <option value="Subscriptions ">Subscriptions </option>
            <option value="Food_&_Groceries ">Food & Groceries </option>
          </select>
          <span>
            <label className="text-sm opacity-75 font-bold" htmlFor="n">
              Budget Name
            </label>
            <input
              type="text"
              id="n"
              placeholder="e.g. Home Decor"
              className="w-full outline-none border-[1px] border-zinc-300 py-2 px-1 rounded-lg"
              {...register("name")}
            />
          </span>
          <span>
            <label className="text-sm opacity-75 font-bold" htmlFor="n">
              Budget Amount
            </label>
            <input
              type="number"
              id="n"
              placeholder="e.g. 500"
              className="w-full outline-none border-[1px] border-zinc-300 py-2 px-1 rounded-lg"
              {...register("amount")}
            />
          </span>

          <button className="text-white w-full bg-[#8787CC] py-2 rounded-lg">
            Create Budget
          </button>
        </form>
      </div>
    </div>
  );
}

export default BudgetMaker;
