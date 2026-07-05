'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

interface ModalProps {
    children?: ReactNode;
}

function Modal({ children }: ModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (!mounted) return null;
    return createPortal(
        <div className={css.backdrop}>
            <div className={css.modal}>
                {children ? (
                    children
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
