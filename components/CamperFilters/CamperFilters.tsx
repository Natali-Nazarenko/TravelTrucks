'use client';

import { useQuery } from '@tanstack/react-query';
import { Formik, Form, Field, FormikProps } from 'formik';
import { getFilters } from '@/lib/api';
import { FilterParams } from '@/types/filters';
import Button from '../Button/Button';
import css from './CamperFilters.module.css';
import { Icon } from '../Icon/Icon';
import { RefObject } from 'react';

interface CamperFiltersProps {
    onSearch: (filters: FilterParams) => void;
    onClear: () => void;
    innerRef: RefObject<FormikProps<FilterParams> | null>;
}

function CamperFilters({ onSearch, onClear, innerRef }: CamperFiltersProps) {
    const {
        data: fetchedFilters,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['camperFilters'],
        queryFn: getFilters,
    });

    const formatLabel = (text: string) => {
        return text.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    const initialValues: FilterParams = {
        location: '',
        form: '',
        transmission: '',
        engine: '',
    };

    if (isLoading) return <p>Loading filters...</p>;
    if (isError || !fetchedFilters) return <p> Failed...</p>;
    return (
        <Formik
            innerRef={innerRef}
            initialValues={initialValues}
            onSubmit={values => {
                onSearch(values);
            }}
        >
            {({ resetForm, values }) => (
                <Form className={css.sidebar}>
                    <div className={css.location__group}>
                        <label className={css.location__label} htmlFor="location">
                            Location
                        </label>
                        <div className={css.location__input__wrapper}>
                            <Field
                                className={css.location__input}
                                id="location"
                                name="location"
                                type="text"
                                placeholder="City"
                            />
                            <Icon
                                name="icon-map"
                                className={css.location__input__icon}
                                sizeWidth={20}
                            />
                        </div>
                    </div>
                    <h3 className={css.filters__title}>Filters</h3>
                    <div className={css.filters__group}>
                        <div className={css.choice__group}>
                            <p className={css.group__label}>Camper form</p>
                            <div className={css.radio__group}>
                                {fetchedFilters.forms.map(formValue => {
                                    const inputId = `form-${formValue}`;
                                    return (
                                        <label
                                            className={css.radio__label}
                                            key={formValue}
                                            htmlFor={inputId}
                                        >
                                            <Field
                                                type="radio"
                                                name="form"
                                                value={formValue}
                                                id={inputId}
                                            />
                                            <Icon
                                                name={
                                                    values.form === formValue
                                                        ? 'icon-radio-btn-check'
                                                        : 'icon-radio-btn-empty'
                                                }
                                                sizeWidth={24}
                                            />
                                            <span>{formatLabel(formValue)}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={css.choice__group}>
                            <p className={css.group__label}>Engine</p>
                            <div className={css.radio__group}>
                                {fetchedFilters.engines.map(engineValue => {
                                    const inputId = `engine-${engineValue}`;

                                    return (
                                        <label
                                            className={css.radio__label}
                                            key={engineValue}
                                            htmlFor={inputId}
                                        >
                                            <Field
                                                type="radio"
                                                name="engine"
                                                value={engineValue}
                                                id={inputId}
                                            />
                                            <Icon
                                                name={
                                                    values.engine === engineValue
                                                        ? 'icon-radio-btn-check'
                                                        : 'icon-radio-btn-empty'
                                                }
                                                sizeWidth={24}
                                            />
                                            <span>{formatLabel(engineValue)}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={css.choice__group}>
                            <p className={css.group__label}>Transmission</p>
                            <div className={css.radio__group}>
                                {fetchedFilters.transmissions.map(transmissionValue => {
                                    const inputId = `transmission-${transmissionValue}`;
                                    return (
                                        <label
                                            className={css.radio__label}
                                            key={transmissionValue}
                                            htmlFor={inputId}
                                        >
                                            <Field
                                                type="radio"
                                                name="transmission"
                                                value={transmissionValue}
                                                id={inputId}
                                            />
                                            <Icon
                                                name={
                                                    values.transmission === transmissionValue
                                                        ? 'icon-radio-btn-check'
                                                        : 'icon-radio-btn-empty'
                                                }
                                                sizeWidth={24}
                                            />
                                            <span>{formatLabel(transmissionValue)}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={css.btn__group}>
                        <Button className={css.btn__search} text="Search" type="submit" />

                        <div className={css.btn__clear__wrapper}>
                            <Button
                                className={css.btn__clear}
                                text="Clear filters"
                                type="button"
                                onClick={() => {
                                    resetForm();
                                    onClear();
                                }}
                            />
                            <Icon
                                className={css.close__btn__icon}
                                name="icon-close"
                                sizeWidth={22}
                            />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default CamperFilters;
