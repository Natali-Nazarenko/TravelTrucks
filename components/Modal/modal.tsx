import css from './modal.module.css';

function Modal() {
    return (
        <div className={css.backdrop}>
            <div className={css.modal}></div>
        </div>
    );
}

export default Modal;
