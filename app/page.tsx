import css from './page.module.css';
import Button from '@/components/Button/Button';

export default function Home() {
    return (
        <div className={css.page}>
            <main className={css.main}>
                <h1 className={css.main__header}>Campers of your dreams</h1>
                <p className={css.main__text}>You can find everything you want in our catalog</p>
                <Button text="View Now" />
            </main>
        </div>
    );
}
