import { useState } from "react";
import type { Transaction } from "../MainPage/MainPage";
import s from "./CostPage.module.scss";

type CostPageProps = {
  transactions: Transaction[];
  onAdd: (transaction: Omit<Transaction, "id">) => void;
  onDelete: (id: string) => void;
};

export const CostPage = ({ transactions, onAdd, onDelete }: CostPageProps) => {
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
      type: "cost",
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
    <section className={s.costpage}>
      <div className={s.costpage__formbox}>
        <form className={s.costpage__form} onSubmit={handleSubmit}>
          <p className={s.costpage__date}>Дата: {getCurrentDate()}</p>

          <input
            className={s.costpage__input}
            type="text"
            placeholder="Опис товару"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className={s.costpage__select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Категорія товару</option>

            <option value="Транспорт">Транспорт</option>

            <option value="Продукти">Продукти</option>

            <option value="Здоров’я">Здоров’я</option>

            <option value="Алкоголь">Алкоголь</option>

            <option value="Розваги">Розваги</option>

            <option value="Все для дому">Все для дому</option>

            <option value="Техніка">Техніка</option>

            <option value="Комуналка, зв’язок">Комуналка, зв’язок</option>

            <option value="Спорт, хобі">Спорт, хобі</option>

            <option value="Навчання">Навчання</option>

            <option value="Інше">Інше</option>
          </select>

          <input
            className={s.costpage__input}
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className={s.costpage__btnbox}>
            <button className={s.costpage__submit} type="submit">
              Ввести
            </button>

            <button
              className={s.costpage__clear}
              type="button"
              onClick={handleClear}
            >
              Очистити
            </button>
          </div>
        </form>
      </div>

      <div className={s.costpage__content}>
        <div className={s.costpage__transactions}>
          <div className={s.costpage__head}>
            <p className={s.costpage__headitem}>Дата</p>

            <p className={s.costpage__headitem}>Опис</p>

            <p className={s.costpage__headitem}>Категорія</p>

            <p className={s.costpage__headitem}>Сума</p>

            <p className={s.costpage__headitem}></p>
          </div>

          <ul className={s.costpage__list}>
            {transactions.map((item) => (
              <li key={item.id} className={s.costpage__transaction}>
                <p className={s.costpage__transactiondate}>{item.date}</p>

                <p className={s.costpage__transactiondescription}>
                  {item.description}
                </p>

                <p className={s.costpage__transactioncategory}>
                  {item.category}
                </p>

                <p className={s.costpage__transactionamount}>
                  {item.amount} грн
                </p>

                <button
                  className={s.costpage__delete}
                  onClick={() => onDelete(item.id)}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        </div>

        <aside className={s.costpage__summary}>
          <h3 className={s.costpage__summarytitle}>Зведення</h3>

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
              <ul className={s.costpage__summarylist}>
                <li className={s.costpage__summaryitem}>
                  <span>{months[currentMonth]}</span>

                  <span>{total.toFixed(2)} грн</span>
                </li>
              </ul>
            );
          })()}
        </aside>
      </div>
    </section>
  );
};
