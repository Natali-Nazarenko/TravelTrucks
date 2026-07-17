import Link from 'next/link';

import css from './NotFound.module.css';

function NotFound() {
    return (
        <div className={css.not__found__page}>
            <main className={`container ${css.not__found__container}`}>
                <h1 className={css.code}>404</h1>
                <h2 className={css.title}>Page Not Found</h2>
                <p className={css.text}>
                    The page you are looking for doesn’t exist or has been moved. Let’s get you back
                    on track to find your dream camper!
                </p>
                <Link href="/catalog" className={css.catalog__btn}>
                    Back to Catalog
                </Link>
            </main>
        </div>
    );
}

export default NotFound;
