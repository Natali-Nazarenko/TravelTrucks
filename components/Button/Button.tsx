import css from './Button.module.css';

interface ButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
}

function Button({ text, onClick, type }: ButtonProps) {
    return (
        <button className={css.btn__component} onClick={onClick} type={type}>
            {text}
        </button>
    );
}

export default Button;
