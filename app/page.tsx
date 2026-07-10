import css from './page.module.css';
import Button from '@/components/Button/Button';

export default function Home() {
    return (
        <div className={css.page}>
            <main className={`container ${css.container}`}>
                <h1 className={css.main__header}>Campers of your dreams</h1>
                <p className={css.main__text}>You can find everything you want in our catalog</p>
                <Button className={css.main__btn} text="View Now" />
            </main>
        </div>
    );
}
