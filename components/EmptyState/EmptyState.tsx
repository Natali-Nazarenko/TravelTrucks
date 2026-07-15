'use client';

import Button from '../Button/Button';
import { Icon } from '../Icon/Icon';
import css from './EmptyState.module.css';

interface EmptyStateProps {
    onClearAll: () => void;
    onViewAll: () => void;
}

function EmptyState({ onClearAll, onViewAll }: EmptyStateProps) {
    return (
        <div className={css.block__campers__empty}>
            <div className={css.block__info}>
                <h2 className={css.title}>No campers found</h2>
                <p className={css.text}>
                    We couldn`t find any campers that match your filters. Try adjusting your search
                    or clearing some filters.
                </p>
            </div>
            <div className={css.block__btn}>
                <div className={css.btn__clear__wrapper}>
                    <Button
                        className={css.btn__clear}
                        text="Clear filters"
                        type="button"
                        onClick={onClearAll}
                    />
                    <Icon className={css.close__btn__icon} name="icon-close" sizeWidth={22} />
                </div>
                <Button
                    className={css.btn__campers}
                    text="View all campers"
                    type="button"
                    onClick={onViewAll}
                />
            </div>
        </div>
    );
}

export default EmptyState;
