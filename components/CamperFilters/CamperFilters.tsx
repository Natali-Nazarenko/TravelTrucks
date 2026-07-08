'use client';

import { useQuery } from '@tanstack/react-query';
import { Formik, Form, Field } from 'formik';
import { getFilters } from '@/lib/api';
import { FilterParams } from '@/types/filters';
import Button from '../Button/Button';
import css from './CamperFilters.module.css';
import { Icon } from '../Icon/Icon';

interface CamperFiltersProps {
    onSearch: (filters: FilterParams) => void;
    onClear: () => void;
}

function CamperFilters({ onSearch, onClear }: CamperFiltersProps) {
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
            initialValues={initialValues}
            onSubmit={values => {
                onSearch(values);
            }}
        >
            {({ resetForm, values }) => (
                <Form className={css.sidebar}>
                    <div className={css.group}>
                        <label className={css.label} htmlFor="location">
                            Location
                        </label>
                        <div className={css.input__wrapper}>
                            <Field
                                className={css.input}
                                id="location"
                                name="location"
                                type="text"
                                placeholder="Kyiv, Ukraine"
                            />
                        </div>
                    </div>
                    <h3 className={css.filter__title}>Filters</h3>
                    <div className={css.choice__group}>
                        <p className={css.group__label}>Camper form</p>
                        <div className={css.radio__grid}>
                            {fetchedFilters.forms.map(formValue => (
                                <label className={css.radio__label} key={formValue}>
                                    <Field type="radio" name="form" value={formValue} />
                                    <Icon
                                        name={
                                            values.form === formValue
                                                ? 'icon-radio-btn-check'
                                                : 'icon-radio-btn-empty'
                                        }
                                        size={24}
                                    />
                                    <span>{formatLabel(formValue)}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className={css.choice__group}>
                        <p className={css.group__label}>Engine</p>
                        <div className={css.radio__grid}>
                            {fetchedFilters.engines.map(engineValue => (
                                <label className={css.radio__label} key={engineValue}>
                                    <Field type="radio" name="engine" value={engineValue} />
                                    <Icon
                                        name={
                                            values.engine === engineValue
                                                ? 'icon-radio-btn-check'
                                                : 'icon-radio-btn-empty'
                                        }
                                        size={24}
                                    />
                                    <span>{formatLabel(engineValue)}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className={css.choice__group}>
                        <p className={css.group__label}>Transmission</p>
                        <div className={css.radio__grid}>
                            {fetchedFilters.transmissions.map(transmissionValue => (
                                <label className={css.radio__label} key={transmissionValue}>
                                    <Field
                                        type="radio"
                                        name="transmission"
                                        value={transmissionValue}
                                    />
                                    <Icon
                                        name={
                                            values.transmission === transmissionValue
                                                ? 'icon-radio-btn-check'
                                                : 'icon-radio-btn-empty'
                                        }
                                        size={24}
                                    />
                                    <span>{formatLabel(transmissionValue)}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className={css.buttons}>
                        <Button text="Search" type="submit" />
                        <Button
                            text="X Clear filters"
                            type="button"
                            onClick={() => {
                                resetForm();
                                onClear();
                            }}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default CamperFilters;
