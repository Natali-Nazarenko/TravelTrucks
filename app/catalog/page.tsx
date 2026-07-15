'use client';

import { useState, useRef } from 'react';
import { FormikProps } from 'formik';
import { useInfiniteQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import CamperList from '@/components/CamperList/CamperList';
import { getCampers } from '@/lib/api';
import { FilterParams } from '@/types/filters';
import CamperFilters from '@/components/CamperFilters/CamperFilters';
import EmptyState from '@/components/EmptyState/EmptyState';
import css from './Campers.module.css';

const Modal = dynamic(() => import('@/components/Modal/Modal'), { ssr: false });

function Campers() {
    const [filters, setFilters] = useState<FilterParams>({});

    const formikRef = useRef<FormikProps<FilterParams>>(null);

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
        setFilters(newFilters);
    };

    const handleClearAll = () => {
        setFilters({});

        if (formikRef.current) {
            formikRef.current.resetForm();
        }
    };

    const handleQueryAllCampers = () => {
        setFilters({});
    };

    const allCampers = data?.pages.flatMap(page => page.campers) || [];

    if (isError) return <p>Error...</p>;

    return (
        <section className={`container ${css.container}`}>
            <CamperFilters onSearch={handleSearch} onClear={handleClearAll} innerRef={formikRef} />
            <div className={css.catalog__campers}>
                {allCampers.length > 0 ? (
                    <CamperList
                        campers={allCampers}
                        hasNextPage={hasNextPage}
                        onLoadMore={fetchNextPage}
                    />
                ) : (
                    !isLoading && (
                        <EmptyState onClearAll={handleClearAll} onViewAll={handleQueryAllCampers} />
                    )
                )}
                {(isLoading || isFetchingNextPage) && <Modal />}
            </div>
        </section>
    );
}

export default Campers;
