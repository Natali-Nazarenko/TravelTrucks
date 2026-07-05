import css from './Button.module.css';

interface ButtonProps {
    text: string;
}

function Button({ text }: ButtonProps) {
    return <button>{text}</button>;
}

export default Button;
