'use client';

import { useEffect } from 'react';

import Button from '@/components/Button/Button';
import css from './Error.module.css';

type ErrorProps = {
    error: Error;
    reset: () => void;
};

function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.log('Capture app error: ', error);
    }, [error]);
    return (
        <div className={css.error__page}>
            <main className={`container ${css.error__container}`}>
                <h1 className={css.error__title}>Oops! Something went wrong</h1>
                <p className={css.error__text}>
                    {error.message || 'An unexpected error occurred while loading this page.'}
                </p>
                <div className={css.error__btn__group}>
                    <Button
                        text="Try again"
                        type="button"
                        onClick={() => reset()}
                        className={css.reset__btn}
                    />
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/" className={css.home__link}>
                        Go back home
                    </a>

                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/catalog" className={css.catalog__link}>
                        Open Catalog
                    </a>
                </div>
            </main>
        </div>
    );
}

export default Error;
