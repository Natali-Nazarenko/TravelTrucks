'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import Button from '@/components/Button/Button';
import CamperList from '@/components/CamperList/CamperList';
import { getCampers } from '@/lib/api';
import { FilterParams } from '@/types/filters';
import CamperFilters from '@/components/CamperFilters/CamperFilters';
import EmptyState from '@/components/EmptyState/EmptyState';
import css from './Campers.module.css';

const Modal = dynamic(() => import('@/components/Modal/Modal'), { ssr: false });

function Campers() {
    const [filters, setFilters] = useState<FilterParams>({});

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useInfiniteQuery({
            queryKey: ['campers', filters],
            queryFn: ({ pageParam = 1 }) => getCampers(pageParam as number, filters),
            initialPageParam: 1,
            getNextPageParam: lastPage => {
                if (lastPage.page < lastPage.totalPages) {
                    return lastPage.page + 1;
                }
                return undefined;
            },
        });

    const handleSearch = (newFilters: FilterParams) => {
        console.log('Choice filters; ', newFilters);

        setFilters(newFilters);
    };

    const handleClear = () => {
        setFilters({});
    };

    const allCampers = data?.pages.flatMap(page => page.campers) || [];

    if (isError) return <p>Error...</p>;

    return (
        <section className={css.container}>
            <CamperFilters onSearch={handleSearch} onClear={handleClear} />
            <div className={css.catalog__campers}>
                {allCampers.length > 0 ? (
                    <CamperList campers={allCampers} />
                ) : (
                    !isLoading && <EmptyState onClear={handleClear} />
                )}
                {isLoading && <Modal />}
                {hasNextPage && (
                    <Button
                        className={css.btn__loadmore}
                        text="Load more"
                        type="button"
                        onClick={() => fetchNextPage()}
                    />
                )}
            </div>
        </section>
    );
}

export default Campers;
