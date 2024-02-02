import { ReactElement } from 'react'

export interface ButtonProps {
    children: ReactElement,
    type: 'submit' | 'button',
    bgColor?: string,
    textColor?: string,
    className?: string,
    [key: string]: any,
}

function Button({
    children, type = 'button', bgColor = 'bg-blue-600', textColor = 'text-white', className = '', ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} ${className}`}
           { ...props}
        >
            {children}
        </button>
    )
}

export default Button