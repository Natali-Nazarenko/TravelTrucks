interface ButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}

function Button({ text, onClick, type, disabled, className }: ButtonProps) {
    return (
        <button className={className} onClick={onClick} type={type} disabled={disabled}>
            {text}
        </button>
    );
}

export default Button;
