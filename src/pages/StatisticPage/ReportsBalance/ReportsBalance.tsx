import { useEffect, useState } from "react";
import type { Transaction } from "../../MainPage/MainPage";

import s from "./ReportsBalance.module.scss";

type ReportsBalanceProps = {
  selectedMonth: number;
};

export const ReportsBalance = ({
  selectedMonth,
}: ReportsBalanceProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  const monthTransactions = transactions.filter((item) => {
    const month = Number(item.date.split(".")[1]) - 1;

    return month === selectedMonth;
  });

  const totalCosts = monthTransactions
    .filter((item) => item.type === "cost")
    .reduce((total, item) => total + item.amount, 0);

  const totalIncome = monthTransactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  return (
    <section className={s.reportsbalance}>
      <div className={s.reportsbalance__container}>
        <div className={s.reportsbalance__item}>
          <p className={s.reportsbalance__title}>Витрати:</p>

          <p className={s.reportsbalance__cost}>
            - {totalCosts.toFixed(2)} грн
          </p>
        </div>

        <div className={s.reportsbalance__divider}></div>

        <div className={s.reportsbalance__item}>
          <p className={s.reportsbalance__title}>Доходи:</p>

          <p className={s.reportsbalance__income}>
            + {totalIncome.toFixed(2)} грн
          </p>
        </div>
      </div>
    </section>
  );
};