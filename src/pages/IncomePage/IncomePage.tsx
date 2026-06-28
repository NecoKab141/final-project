import { useState } from "react";
import type { Transaction } from "../MainPage/MainPage";
import s from "./IncomePage.module.scss";

type IncomePageProps = {
  transactions: Transaction[];
  onAdd: (transaction: Omit<Transaction, "id">) => void;
  onDelete: (id: string) => void;
};

export const IncomePage = ({
  transactions,
  onAdd,
  onDelete,
}: IncomePageProps) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const getCurrentDate = (): string => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !category || !amount) return;

    onAdd({
      date: getCurrentDate(),
      description,
      category,
      amount: Number(amount),
      type: "income",
    });

    setDescription("");
    setCategory("");
    setAmount("");
  };

  const handleClear = () => {
    setDescription("");
    setCategory("");
    setAmount("");
  };

  return (
    <section className={s.incomepage}>
      <div className={s.incomepage__container}>
        <div className={s.incomepage__formbox}>
          <form className={s.incomepage__form} onSubmit={handleSubmit}>
            <p className={s.incomepage__date}>Дата: {getCurrentDate()}</p>

            <input
              className={s.incomepage__input}
              type="text"
              placeholder="Опис прибутку"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              className={s.incomepage__select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Категорія прибутку</option>

              <option value="ЗП">ЗП</option>

              <option value="Дод. прибуток">Дод. прибуток</option>
            </select>

            <input
              className={s.incomepage__input}
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button className={s.incomepage__submit} type="submit">
              Ввести
            </button>

            <button
              className={s.incomepage__clear}
              type="button"
              onClick={handleClear}
            >
              Очистити
            </button>
          </form>
        </div>

        <div className={s.incomepage__content}>
          <div className={s.incomepage__transactions}>
            <div className={s.incomepage__head}>
              <p>Дата</p>
              <p>Опис</p>
              <p>Категорія</p>
              <p>Сума</p>
              <p></p>
            </div>

            <ul className={s.incomepage__list}>
              {transactions.map((item) => (
                <li className={s.incomepage__transaction} key={item.id}>
                  <p>{item.date}</p>

                  <p>{item.description}</p>

                  <p>{item.category}</p>

                  <p>{item.amount} грн</p>

                  <button
                    className={s.incomepage__delete}
                    onClick={() => onDelete(item.id)}
                  >
                    Видалити
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <aside className={s.incomepage__summary}>
            <h3 className={s.incomepage__summarytitle}>Зведення</h3>

            {(() => {
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

              const currentMonth = new Date().getMonth();

              const total = transactions
                .filter((item) => {
                  const month = Number(item.date.split(".")[1]) - 1;

                  return month === currentMonth;
                })
                .reduce((sum, item) => sum + item.amount, 0);

              return (
                <ul className={s.incomepage__summarylist}>
                  <li className={s.incomepage__summaryitem}>
                    <span>{months[currentMonth]}</span>

                    <span>{total.toFixed(2)} грн</span>
                  </li>
                </ul>
              );
            })()}
          </aside>
        </div>
      </div>
    </section>
  );
};
