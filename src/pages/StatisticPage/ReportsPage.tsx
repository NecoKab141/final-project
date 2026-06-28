import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ReportsBalance } from "./ReportsBalance/ReportsBalance";
import { ReportsDiagram } from "./ReportsDiagram/ReportsDiagram";

import s from "./ReportsPage.module.scss";

const months = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export const ReportsPage = () => {
  const navigate = useNavigate();

  const [balance, setBalance] = useState("");

  const [isEditingBalance, setIsEditingBalance] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth()
  );

  useEffect(() => {
    const savedBalance = localStorage.getItem("balance");

    if (savedBalance) {
      setBalance(savedBalance);
    }
  }, []);

  const handleSaveBalance = () => {
    localStorage.setItem("balance", balance);
  };

  return (
    <section className={s.reports}>
      <div className={s.reports__container}>
        <div className={s.reports__top}>
          <button
            className={s.reports__back}
            onClick={() => navigate("/home")}
          >
            ← Повернутися на головну
          </button>

          <div className={s.reports__balance}>
            <p className={s.reports__text}>Баланс:</p>

            <input
              className={s.reports__input}
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
              className={s.reports__confirm}
              onClick={handleSaveBalance}
            >
              ПІДТВЕРДИТИ
            </button>
          </div>

          <div className={s.reports__months}>
            <button
              className={s.reports__arrow}
              onClick={() =>
                setSelectedMonth((prev) =>
                  prev === 0 ? 11 : prev - 1
                )
              }
            >
              ←
            </button>

            <span className={s.reports__month}>
              {months[selectedMonth]}
            </span>

            <button
              className={s.reports__arrow}
              onClick={() =>
                setSelectedMonth((prev) =>
                  prev === 11 ? 0 : prev + 1
                )
              }
            >
              →
            </button>
          </div>
        </div>

        <ReportsBalance selectedMonth={selectedMonth} />

        <ReportsDiagram selectedMonth={selectedMonth} />
      </div>
    </section>
  );
};