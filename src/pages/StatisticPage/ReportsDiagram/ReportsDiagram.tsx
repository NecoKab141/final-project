import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";

import ProductsIcon from "../../../images/reports/products.svg";
import AlcoholIcon from "../../../images/reports/alcohol.svg";
import EntertainmentIcon from "../../../images/reports/entertainment.svg";
import HealthIcon from "../../../images/reports/health.svg";
import TransportIcon from "../../../images/reports/transport.svg";
import HomeIcon from "../../../images/reports/home.svg";
import TechniqueIcon from "../../../images/reports/technique.svg";
import UtilitiesIcon from "../../../images/reports/utilities.svg";
import HobbyIcon from "../../../images/reports/hobby.svg";
import EducationIcon from "../../../images/reports/education.svg";
import OtherIcon from "../../../images/reports/other.svg";

import SalaryIcon from "../../../images/reports/salary.svg";
import ExtraIncomeIcon from "../../../images/reports/extra-income.svg";

import type { Transaction } from "../../MainPage/MainPage";

import s from "./ReportsDiagram.module.scss";

type ReportsDiagramProps = {
  selectedMonth: number;
};

const costCategories = [
  { name: "Продукти", icon: ProductsIcon },
  { name: "Алкоголь", icon: AlcoholIcon },
  { name: "Розваги", icon: EntertainmentIcon },
  { name: "Здоров’я", icon: HealthIcon },
  { name: "Транспорт", icon: TransportIcon },
  { name: "Все для дому", icon: HomeIcon },
  { name: "Техніка", icon: TechniqueIcon },
  { name: "Комуналка, зв’язок", icon: UtilitiesIcon },
  { name: "Спорт, хобі", icon: HobbyIcon },
  { name: "Навчання", icon: EducationIcon },
  { name: "Інше", icon: OtherIcon },
];

const incomeCategories = [
  { name: "ЗП", icon: SalaryIcon },
  { name: "Дод. прибуток", icon: ExtraIncomeIcon },
];

const colors = [
  "#FF751D",
  "#FFDAC0",
  "#FF751D",
  "#FFDAC0",
  "#FF751D",
  "#FFDAC0",
  "#FF751D",
  "#FFDAC0",
  "#FF751D",
  "#FFDAC0",
  "#FF751D",
];

export const ReportsDiagram = ({ selectedMonth }: ReportsDiagramProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeType, setActiveType] = useState<"cost" | "income">("cost");
  const [selectedCategory, setSelectedCategory] = useState("Продукти");

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  const categories = activeType === "cost" ? costCategories : incomeCategories;

  useEffect(() => {
    setSelectedCategory(categories[0].name);
  }, [activeType]);

  const monthTransactions = transactions.filter((item) => {
    const month = Number(item.date.split(".")[1]) - 1;
    return month === selectedMonth;
  });

  const chartData = useMemo(() => {
    return monthTransactions
      .filter(
        (item) =>
          item.type === activeType && item.category === selectedCategory,
      )
      .reduce((acc: { name: string; amount: number }[], item) => {
        const exist = acc.find((el) => el.name === item.description);
        if (exist) {
          exist.amount += item.amount;
        } else {
          acc.push({ name: item.description, amount: item.amount });
        }
        return acc;
      }, [])
      .sort((a, b) => b.amount - a.amount);
  }, [monthTransactions, activeType, selectedCategory]);

  return (
    <section className={s.diagram}>
      <div className={s.diagram__top}>
        <div className={s.diagram__switch}>
          <div
            className={`${s.diagram__slider} ${
              activeType === "income"
                ? s.diagram__slider_income
                : s.diagram__slider_cost
            }`}
          />
          <button
            className={
              activeType === "cost"
                ? s.diagram__switchactive
                : s.diagram__switchbutton
            }
            onClick={() => setActiveType("cost")}
          >
            Витрати
          </button>
          <button
            className={
              activeType === "income"
                ? s.diagram__switchactive
                : s.diagram__switchbutton
            }
            onClick={() => setActiveType("income")}
          >
            Доходи
          </button>
        </div>
      </div>

      <div className={s.diagram__categories}>
        {categories.slice(0, 6).map((item) => {
          const Icon = item.icon;
          const total = monthTransactions
            .filter((el) => el.type === activeType && el.category === item.name)
            .reduce((sum, el) => sum + el.amount, 0);

          return (
            <button
              key={item.name}
              onClick={() => setSelectedCategory(item.name)}
              className={
                selectedCategory === item.name
                  ? s.diagram__categoryactive
                  : s.diagram__category
              }
            >
              <p className={s.diagram__sum}>
                {total === 0 ? "0.00" : total.toFixed(2)}
              </p>
              <div className={s.diagram__icon}>
                <Icon />
              </div>
              <span className={s.diagram__name}>{item.name}</span>
            </button>
          );
        })}
      </div>

      <div className={s.diagram__categories_bottom}>
        {categories.slice(6).map((item) => {
          const Icon = item.icon;
          const total = monthTransactions
            .filter((el) => el.type === activeType && el.category === item.name)
            .reduce((sum, el) => sum + el.amount, 0);

          return (
            <button
              key={item.name}
              onClick={() => setSelectedCategory(item.name)}
              className={
                selectedCategory === item.name
                  ? s.diagram__categoryactive
                  : s.diagram__category
              }
            >
              <p className={s.diagram__sum}>
                {total === 0 ? "0.00" : total.toFixed(2)}
              </p>
              <div className={s.diagram__icon}>
                <Icon />
              </div>
              <span className={s.diagram__name}>{item.name}</span>
            </button>
          );
        })}
      </div>

      <div className={s.diagram__chart}>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={chartData} barCategoryGap={16}>
            <XAxis
              dataKey="name"
              interval={0}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Bar dataKey="amount" radius={[12, 12, 0, 0]} barSize={38}>
              <LabelList
                dataKey="amount"
                position="top"
                formatter={(value) => {
                  if (value === 0 || value === undefined || value === null) {
                    return "";
                  }
                  return Number(value).toFixed(2);
                }}
              />
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
