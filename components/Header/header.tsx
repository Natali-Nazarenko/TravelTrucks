import Link from 'next/link';
import css from './header.module.css';

function Header() {
    return (
        <header className={css.header}>
            <div className={css.container}>
                <Link href="/" aria-label="Home">
                    TravelTrucks
                </Link>
                <nav aria-label="Mane Navigation">
                    <ul className={css.navigation}>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/catalog">Catalog</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
