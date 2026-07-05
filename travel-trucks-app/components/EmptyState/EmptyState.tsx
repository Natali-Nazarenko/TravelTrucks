'use client';

import Image from 'next/image';
import Button from '../Button/Button';
import css from './EmptyState.module.css';

interface EmptyStateProps {
    onClear: () => void;
}

function EmptyState({ onClear }: EmptyStateProps) {
    return (
        <div className={css.container}>
            <div className={css.image__wrapper}>
                <Image
                    src="/images/not-found.webp"
                    alt="no campers found"
                    width={488}
                    height={463}
                    priority
                />
            </div>
            <h2 className={css.title}>No campers found</h2>
            <p className={css.text}>
                We couldn`t find any campers that match your filters. Try adjusting your search or
                clearing some filters.
            </p>
            <div className={css.actions}>
                <Button text="Clear filters" type="button" onClick={onClear} />
                <Button text="View all campers" type="button" onClick={onClear} />
            </div>
        </div>
    );
}

export default EmptyState;
