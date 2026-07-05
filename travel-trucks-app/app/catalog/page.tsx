'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import Button from '@/components/Button/Button';
import CamperList from '@/components/CamperList/CamperList';
import { getCampers } from '@/lib/api';
import { FilterParams } from '@/types/filters';
import CamperFilters from '@/components/CamperFilters/CamperFilters';
import Modal from '@/components/Modal/Modal';
import EmptyState from '@/components/EmptyState/EmptyState';

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

    const hanleSearch = (newFilters: FilterParams) => {
        setFilters(newFilters);
    };

    const handleClear = () => {
        setFilters({});
    };

    const allCampers = data?.pages.flatMap(page => page.campers) || [];

    if (isError) return <p>Error...</p>;

    return (
        <section>
            <CamperFilters onSearch={hanleSearch} onClear={handleClear} />
            {allCampers.length > 0 ? (
                <CamperList campers={allCampers} />
            ) : (
                !isLoading && <EmptyState onClear={handleClear} />
            )}
            {isLoading && <Modal />}
            {hasNextPage && (
                <Button text="Load more" type="button" onClick={() => fetchNextPage()} />
            )}
        </section>
    );
}

export default Campers;
