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
    AxiosConifg.post("/expense//child/cheker", param)
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
        <div className="px-4 py-4 h-[90vh] overflow-y-auto">
          <nav className="w-full flex items-center justify-start">
            <span
              className="flex items-center gap-3  cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <span className="text-3xl ">
                <i class="ri-arrow-left-fill"></i>
              </span>
              <span className="text-2xl font-bold">My Expenses</span>
            </span>
          
          </nav>
          <div className="flex w-full gap-2 mt-3">
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
