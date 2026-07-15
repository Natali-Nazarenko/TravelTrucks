interface ButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
}

function Button({ text, onClick, type, className }: ButtonProps) {
    return (
        <button className={className} onClick={onClick} type={type}>
            {text}
        </button>
    );
}

export default Button;
