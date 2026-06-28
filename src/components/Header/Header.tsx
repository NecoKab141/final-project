import s from "./Header.module.scss";
import { useAuth } from "../../context/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={s.header}>
      <div className={s.header__box}>
        <p className={s.header__logotext}>
          InvestIQ
        </p>
      </div>

       {user && (
          <div className={s.header__user}>
            <span>User</span>

            <button
              className={s.header__logout}
              onClick={logout}
            >
              Вийти
            </button>
          </div>
        )}
    </header>
  );
};