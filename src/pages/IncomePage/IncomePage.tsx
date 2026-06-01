import s from "./IncomePage.module.scss"

export const IncomePage = () => {

    return (
        <section className={s.incomepage}>
            <div className={s.incomepage__formbox}>
                <p className={s.incomepage__formtime}></p>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <button></button>
                <button></button>
            </div>
            <div>

            </div>
            <div></div>
        </section>
    )
}