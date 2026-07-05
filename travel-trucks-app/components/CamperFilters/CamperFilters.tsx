'use client';

import { useQuery } from '@tanstack/react-query';
import { Formik, Form, Field } from 'formik';
import { getFilters } from '@/lib/api';
import { FilterParams } from '@/types/filters';
import Button from '../Button/Button';

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
            {({ resetForm }) => (
                <Form>
                    <div>
                        <label htmlFor="location">Location</label>
                        <Field
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Kyiv, Ukraine"
                        ></Field>
                    </div>
                    <h3>Filters</h3>
                    <div>
                        <p>Camper form</p>
                        {fetchedFilters.forms.map(formValue => (
                            <label key={formValue}>
                                <Field type="radio" name="form" value={formValue} />
                                {formatLabel(formValue)}
                            </label>
                        ))}
                    </div>
                    <div>
                        <p>Engine</p>
                        {fetchedFilters.engines.map(engineValue => (
                            <label key={engineValue}>
                                <Field type="radio" name="engine" value={engineValue} />
                                {formatLabel(engineValue)}
                            </label>
                        ))}
                    </div>
                    <div>
                        <p>Transmission</p>
                        {fetchedFilters.transmissions.map(transmissionValue => (
                            <label key={transmissionValue}>
                                <Field type="radio" name="transmission" value={transmissionValue} />
                                {formatLabel(transmissionValue)}
                            </label>
                        ))}
                    </div>
                    <div>
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
