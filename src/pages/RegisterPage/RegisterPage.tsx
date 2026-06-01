import s from "./RegisterPage.module.scss";
import { RegisterForm } from "./RegisterForm/RegisterForm";

export const RegisterPage = () => {
  return (
    <section className={s.registerpage}>
      <div className={s.registerpage__box}>
        <div className={s.registerpage__titlewrap}>
          <h1 className={s.registerpage__title}>InvestIQ</h1>
          <h2 className={s.registerpage__subtitle}>Smart Finance</h2>
        </div>

        <RegisterForm />
      </div>
    </section>
  );
};
