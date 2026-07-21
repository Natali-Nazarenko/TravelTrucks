'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import css from './AppHeader.module.css';
import { Icon } from '../Icon/Icon';

function Header() {
    const pathName = usePathname();
    return (
        <header className={css.header}>
            <div className={`container ${css.container}`}>
                <Link href="/" aria-label="Home">
                    <Icon name="icon-travel-trucks" sizeWidth={136} sizeHeight={16} />
                </Link>
                <nav aria-label="Mane Navigation" className={css.navigation__block}>
                    <ul className={css.navigation}>
                        <li className={css.navigation__home}>
                            <Link href="/" className={pathName === '/' ? css.activeLink : css.link}>
                                Home
                            </Link>
                        </li>
                        <li className={css.navigation__catalog}>
                            <Link
                                href="/catalog"
                                className={pathName === '/catalog' ? css.activeLink : css.link}
                            >
                                Catalog
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
