import Link from 'next/link';
import css from './header.module.css';

function Header() {
    return (
        <header className={css.header}>
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
        </header>
    );
}

export default Header;
