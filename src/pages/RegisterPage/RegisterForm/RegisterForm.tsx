import s from "./RegisterForm.module.scss";

export const RegisterForm = () => {
  return (
    <div className={s.form}>
      <p className={s.form__text}>
        Ви можете авторизуватися за допомогою акаунта Google
      </p>
      <button className={s.form__google}>Google</button>
      <p className={s.form__text}>
        Або увійти за допомогою ел. пошти та паролю після реєстрації
      </p>
      <label className={s.form__label}>Електронна пошта:</label>
      <input
        className={s.form__input}
        type="email"
        placeholder="Введіть пошту"
      />
      <label className={s.form__label}>Пароль:</label>
      <input
        className={s.form__input}
        type="password"
        placeholder="Введіть пароль"
      />
      <div className={s.form__buttons}>
        <button className={s.form__login}>Увійти</button>
        <button className={s.form__register}>Реєстрація</button>
      </div>
    </div>
  );
};
