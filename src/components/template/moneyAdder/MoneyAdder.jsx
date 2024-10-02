import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import AxiosConifg from "../../../utils/api/AxiosConifg";
import contextMaker from "../../../context/contextMaker";

function MoneyAdder({ setmoneyAdderrcontrol ,setloader}) {
  const transType = "Debit";
  const { auth } = useContext(contextMaker);
  const { register, handleSubmit, reset } = useForm();

  
  const formSubmit = (data) => {
    AxiosConifg.post("/money/add", { data, transType, auth })
      .then((res) => {
        setmoneyAdderrcontrol(false);
        setloader(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
    
    reset();
  };
  return (
    <div className="absolute w-full md:h-[90vh] h-full bg-zinc-500/30 backdrop-blur-sm top-0 left-0 z-50  flex justify-center   items-center ">
      <div className=" md:w-1/2  bg-white rounded-lg shadow-lg p-6">
        <span className="flex w-full justify-between capitalize text-lg ">
          increase your budget
          <span
            className="cursor-pointer"
            onClick={() => setmoneyAdderrcontrol(false)}
          >
            <i class="ri-close-large-fill"></i>
          </span>
        </span>
        <form
          className="w-full flex flex-col relative justify-between gap-3 py-4 "
          onSubmit={handleSubmit(formSubmit)}
        >
          <span>
            <label className="md:text-sm text-lg  opacity-75 font-bold" htmlFor="n">
              Budget Amount
            </label>
            <input
              type="number"
              id="n"
              required
              placeholder="e.g. 500"
              className="w-full outline-none border-[1px] border-zinc-300 py-2 px-1 rounded-lg"
              {...register("amount")}
            />
          </span>
          <select
            name=""
            {...register("category")}
            className="w-full outline-none border-[1px] border-zinc-300 py-2 px-1 rounded-lg"
            id=""
          >
            <option value="Salary">Salary</option>
            <option value="Rental ">Rental </option>
            <option value="Investments">Investments</option>
            <option value="Gifts">Gifts </option>
            <option value="Business ">Business </option>
            <option value="Passive ">Passive </option>
          </select>
          <span>
            <label className="md:text-sm text-lg  opacity-75 font-bold" htmlFor="n">
              Budget Name
            </label>
            <input
              type="text"
              required
              id="n"
              placeholder="e.g. OverTime"
              className="w-full outline-none border-[1px] border-zinc-300 py-2 px-1 rounded-lg"
              {...register("name")}
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

export default MoneyAdder;
