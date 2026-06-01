import s from "./Header.module.scss" 

export const Header = () => {

    return(
        <header className={s.header}>
            <div className={s.header__box}>
                
                <p className={s.header__logotext}>InvestIQ</p>
            </div>
        </header>
    )
}