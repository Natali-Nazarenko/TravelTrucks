import css from './Button.module.css';

interface ButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

function Button({ text }: ButtonProps) {
    return <button>{text}</button>;
}

export default Button;
