// import s from "./RegisterForm.module.scss";
// import { useState } from "react";
// import { registerUser } from "../../../api/usersApi";

// type RegisterFormData = {
//   email: string;
//   password: string;
// };

// let mockUsers: { 
//   email: string; 
//   password: string 
// }[] = [];

// export const RegisterForm = () => {

//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <div className={s.form}>
//       <p className={s.form__text}>
//         Ви можете авторизуватися за допомогою акаунта Google
//       </p>
//       <button className={s.form__google}>Google</button>
//       <p className={s.form__text}>
//         Або увійти за допомогою ел. пошти та паролю після реєстрації
//       </p>
//       <label className={s.form__label}>Електронна пошта:</label>
//       <input
//         className={s.form__input}
//         type="email"
//         placeholder="Введіть пошту"
//       />
//       <label className={s.form__label}>Пароль:</label>
//       <input
//         className={s.form__input}
//         type="password"
//         placeholder="Введіть пароль"
//       />
//       <div className={s.form__buttons}>
//         <button className={s.form__login}>Увійти</button>
//         <button className={s.form__register}>Реєстрація</button>
//       </div>
//     </div>
//   );
// };


import s from "./RegisterForm.module.scss";
import { useState } from "react";
import { registerUser } from "../../../api/usersApi";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type RegisterFormData = {
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] =
    useState<RegisterFormData>({
      email: "",
      password: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    if (
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      alert("Заповніть усі поля");
      return;
    }

    try {
      setIsLoading(true);

      const newUser = await registerUser(
        formData.email,
        formData.password
      );

      login(newUser);
      navigate("/main");
    } catch (error) {
      console.error(error);

      alert("Помилка реєстрації");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.form}>
      <p className={s.form__text}>
        Ви можете авторизуватися за допомогою
        акаунта Google
      </p>

      <button
        className={s.form__google}
        type="button"
      >
        Google
      </button>

      <p className={s.form__text}>
        Або увійти за допомогою ел. пошти та
        паролю після реєстрації
      </p>

      <label className={s.form__label}>
        Електронна пошта:
      </label>

      <input
        className={s.form__input}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Введіть пошту"
      />

      <label className={s.form__label}>
        Пароль:
      </label>

      <input
        className={s.form__input}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Введіть пароль"
      />

      <div className={s.form__buttons}>
        <button
          className={s.form__login}
          type="button"
        >
          Увійти
        </button>

        <button
          className={s.form__register}
          type="button"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading
            ? "Реєстрація..."
            : "Реєстрація"}
        </button>
      </div>
    </div>
  );
};