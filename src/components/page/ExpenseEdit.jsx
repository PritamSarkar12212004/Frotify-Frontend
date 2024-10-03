import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosConifg from "../../utils/api/AxiosConifg";
import Cart from "../template/expensiesEditer/Cart";
import UpdateForm from "../template/expensiesEditer/UpdateForm";
import HIstoryExpense from "../template/expensiesEditer/HIstoryExpense";


function ExpenseEdit() {
  const param = useParams();
  const [reload, setreload] = useState([]);
  const [data, setdata] = useState([]);
  const [history, sethistory] = useState([]);
  const navigate = useNavigate();

  const DataLoad = () => {
    AxiosConifg.post("/expense/child/cheker", param)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HistoryLoad = () => {
    AxiosConifg.post("/history/cheker", param)
      .then((res) => {
        sethistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    DataLoad();
    HistoryLoad();
  }, [reload]);
  return (
    <>
      {data && history ? (
        <div className="md:px-4 px-2 md:py-4 md:h-[90vh] mt-2 overflow-y-auto">
          <nav className="w-full flex items-center justify-start">
            <span
              className="flex items-center gap-3  cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <span className="md:text-3xl text-2xl ">
                <i class="ri-arrow-left-fill"></i>
              </span>
              <span className="md:text-2xl text-xl font-bold">My Expenses</span>
            </span>
          
          </nav>
          <div className="flex md:flex-row flex-col w-full md:gap-2 gap-3 mt-3 md:mb-0 mb-3">
            <Cart item={data} />
            <UpdateForm
              item={data._id}
              setreload={setreload}
              remain={data.remainAmount}
            />
          </div>
          <HIstoryExpense history={history} />
        </div>
      ) : null}
    </>
  );
}

export default ExpenseEdit;
