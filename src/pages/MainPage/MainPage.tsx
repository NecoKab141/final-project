import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CostPage } from "../CostsPage/CostPage";
import { IncomePage } from "../IncomePage/IncomePage";

import s from "./MainPage.module.scss";

export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "cost" | "income";
};

export const MainPage = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState<"cost" | "income">("cost");

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [balance, setBalance] = useState(() => {
    return localStorage.getItem("balance") || "";
  });

  const [isEditingBalance, setIsEditingBalance] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  const handleSaveBalance = () => {
    localStorage.setItem("balance", balance);
  };

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };

    setTransactions((prev) => [...prev, newTransaction]);

    const currentBalance = Number(balance) || 0;

    const newBalance =
      transaction.type === "income"
        ? currentBalance + transaction.amount
        : currentBalance - transaction.amount;

    setBalance(String(newBalance));
  };

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find((item) => item.id === id);

    if (!transaction) return;

    setTransactions((prev) => prev.filter((item) => item.id !== id));

    const currentBalance = Number(balance) || 0;

    const newBalance =
      transaction.type === "income"
        ? currentBalance - transaction.amount
        : currentBalance + transaction.amount;

    setBalance(String(newBalance));
  };

  const costTransactions = transactions.filter(
    (item) => item.type === "cost"
  );

  const incomeTransactions = transactions.filter(
    (item) => item.type === "income"
  );

  return (
    <section className={s.mainpage}>
      <div className={s.mainpage__balancebox}>
        <p className={s.mainpage__balancetext}>Баланс:</p>

        <input
          className={s.mainpage__input}
          type="text"
          placeholder="00.00 UAH"
          value={
            isEditingBalance
              ? balance
              : balance
              ? `${balance} UAH`
              : ""
          }
          onFocus={() => setIsEditingBalance(true)}
          onBlur={() => setIsEditingBalance(false)}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d.]/g, "");
            setBalance(value);
          }}
        />

        <button
          className={s.mainpage__btn}
          onClick={handleSaveBalance}
        >
          ПІДТВЕРДИТИ
        </button>

        <button
          className={s.mainpage__btntocalculations}
          onClick={() => navigate("/reports")}
        >
          Перейти до розрахунків
        </button>
      </div>

      <div className={s.mainpage__navigate}>
        <button
          className={`${s.mainpage__btncosts} ${
            activePage === "cost"
              ? s.mainpage__btnactive
              : s.mainpage__btninactive
          }`}
          onClick={() => setActivePage("cost")}
        >
          Витрати
        </button>

        <button
          className={`${s.mainpage__btnincome} ${
            activePage === "income"
              ? s.mainpage__btnactive
              : s.mainpage__btninactive
          }`}
          onClick={() => setActivePage("income")}
        >
          Дохід
        </button>
      </div>

      <div className={s.mainpage__container}>
        {activePage === "cost" && (
          <CostPage
            transactions={costTransactions}
            onAdd={addTransaction}
            onDelete={deleteTransaction}
          />
        )}

        {activePage === "income" && (
          <IncomePage
            transactions={incomeTransactions}
            onAdd={addTransaction}
            onDelete={deleteTransaction}
          />
        )}
      </div>
    </section>
  );
};