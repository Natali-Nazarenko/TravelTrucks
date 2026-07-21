'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

interface ModalProps {
    text?: {
        title: string;
        paragraph: string;
    };
    type?: 'loading' | 'success';
}

function Modal({ text, type = 'loading' }: ModalProps) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return createPortal(
        <div className={css.backdrop}>
            <div className={css.modal}>
                {text ? (
                    <div className={css.loading__container}>
                        {type === 'success' ? (
                            <div className={css.success__circle}>
                                <span className={css.checkmark}>✔</span>
                            </div>
                        ) : (
                            <div className={css.spinner}></div>
                        )}
                        <h2 className={css.title}>{text.title}</h2>
                        <p className={css.subtitle}>{text.paragraph}</p>
                    </div>
                ) : (
                    <div className={css.loading__container}>
                        <div className={css.spinner}></div>
                        <h2 className={css.title}>Loading tracks...</h2>
                        <p className={css.subtitle}>
                            Please wait while we fetch the best travel trucks for you
                        </p>
                    </div>
                )}
            </div>
        </div>,
        document.body,
    );
}

export default Modal;
