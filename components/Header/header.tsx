import Link from 'next/link';
import css from './header.module.css';
import { Icon } from '../Icon/Icon';

function Header() {
    return (
        <header className={css.header}>
            <div className={css.container}>
                <Link href="/" aria-label="Home">
                    <Icon name="icon-travel-trucks" sizeWidth={136} sizeHeight={16} />
                </Link>
                <nav aria-label="Mane Navigation" className={css.navigation__block}>
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
