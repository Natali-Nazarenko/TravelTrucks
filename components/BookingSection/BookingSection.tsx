'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';

import css from './BookingSection.module.css';
import Button from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { BookingCamperData } from '@/types/booking';
import { postCamperBooking } from '@/lib/api';

interface ValuesFormBooking {
    name: string;
    email: string;
}

const initialValues: ValuesFormBooking = {
    name: '',
    email: '',
};

type BookingSectionProps = {
    camperId: string;
    isBooked: boolean;
    onBookingStart: () => void;
    onBookingSuccess: (serverMessage: string) => void;
};

function BookingSection({
    camperId,
    isBooked,
    onBookingStart,
    onBookingSuccess,
}: BookingSectionProps) {
    const { mutate, isPending } = useMutation({
        mutationFn: (value: BookingCamperData) => postCamperBooking(camperId, value),
        onMutate: () => {
            onBookingStart();
        },
        onSuccess: data => {
            onBookingSuccess(data.message || 'This camper booking success!');
        },
    });

    const BookingSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required!')
            .trim()
            .matches(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]+$/, 'The name can only contain letters and spaces.')
            .test(
                'is-two-words',
                'Please enter your full name.',
                value => !!(value && value.split(/\s+/).filter(word => word !== '').length >= 2),
            ),
        email: Yup.string()
            .required('Email is required')
            .trim()
            .email('Please enter a valid email address.'),
    });
    return (
        <section className={css.booking__section}>
            <h3>Book your campervan now</h3>
            <p>Stay connected! We are always ready to help you.</p>
            <Formik
                initialValues={initialValues}
                validationSchema={BookingSchema}
                onSubmit={(values, { resetForm }) => {
                    mutate(values, { onSuccess: () => resetForm });
                }}
            >
                {({ errors, touched }) => {
                    const isnameError = !!(errors.name && touched.name);
                    const isEmailError = !!(errors.email && touched.email);
                    return (
                        <Form>
                            <fieldset disabled={isPending || isBooked} className={css.fieldset}>
                                <div className={css.input__group}>
                                    <div
                                        className={`${css.form__group} ${isnameError ? css.has__error : ''}`}
                                    >
                                        <Field
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder={isnameError ? '' : 'Name*'}
                                            className={css.input}
                                        />
                                        {isnameError && (
                                            <label htmlFor="name" className={css.label__badge}>
                                                Name*
                                            </label>
                                        )}
                                        {isnameError && (
                                            <Icon
                                                name="icon-warning"
                                                sizeWidth={24}
                                                className={css.icon__error}
                                            />
                                        )}
                                        <ErrorMessage
                                            name="name"
                                            component="span"
                                            className={css.error__message}
                                        />
                                    </div>
                                    <div
                                        className={`${css.form__group} ${isEmailError ? css.has__error : ''}`}
                                    >
                                        <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder={isEmailError ? '' : 'Email*'}
                                            className={css.input}
                                        />
                                        {isEmailError && (
                                            <label htmlFor="email" className={css.label__badge}>
                                                Email*
                                            </label>
                                        )}
                                        {isEmailError && (
                                            <Icon
                                                name="icon-warning"
                                                sizeWidth={24}
                                                className={css.icon__error}
                                            />
                                        )}
                                        <ErrorMessage
                                            name="email"
                                            component="span"
                                            className={css.error__message}
                                        />
                                    </div>
                                </div>
                            </fieldset>
                            <Button
                                text={isPending ? 'Sending...' : isBooked ? 'Booked ✔' : 'Send'}
                                type={isBooked ? 'button' : 'submit'}
                                disabled={isPending || isBooked}
                                className={css.submit__btn}
                            />
                        </Form>
                    );
                }}
            </Formik>
        </section>
    );
}

export default BookingSection;
