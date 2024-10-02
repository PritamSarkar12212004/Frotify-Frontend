import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AxiosConifg from "../../../utils/api/AxiosConifg";

function UpdateForm({ item, setreload, remain }) {
  const { register, handleSubmit, reset } = useForm();
  const formControoler = (data) => {
    if (remain - data.amount < 0) {
      alert("Amount is not enough");
    } else {
      AxiosConifg.post("/history/create", { data, item })
        .then((res) => {
          setreload(res.data);
          reset();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="flex-auto border-[1px] border-zinc-300   rounded-xl px-3 py-3">
      <span className="w-full font-bold text-xl">
        <h1> Add Expense</h1>
      </span>
      <form
        action=""
        className="w-full flex flex-col gap-3"
        onSubmit={handleSubmit(formControoler)}
      >
        <span className="w-full flex flex-col gap-1">
          <label htmlFor="ex">Expense Name</label>
          <input
            type="text"
            id="ex"
            placeholder="e.g. Party"
            className="w-full  border-[2px] capitalize border-zinc-400 py-2  rounded-xl px-2"
            required
            {...register("name")}
          />
        </span>
        <span className="w-full flex flex-col gap-1">
          <label htmlFor="ex">Expense Amount</label>
          <input
            type="number"
            id="ex"
            placeholder="e.g. Party"
            className="w-full  border-[2px] capitalize border-zinc-400 py-2  rounded-xl px-2"
            required
            {...register("amount")}
          />
        </span>
        <span className="w-full flex justify-center mt-2">
          <button className="w-1/2 py-3 text-white font-bold rounded-xl bg-[#7575cf] hover:bg-blue-600 duration-300 ">
            Add Expense
          </button>
        </span>
      </form>
    </div>
  );
}

export default UpdateForm;
