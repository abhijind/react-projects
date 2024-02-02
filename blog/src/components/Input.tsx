import { LegacyRef, forwardRef, useId } from "react"

export interface InputProps {
    label?: string;
    type: 'text' | 'email' | 'password',
    className?: string,
    [key: string]: unknown
}

const Input = forwardRef(function Input({ label, type, className, ...props }: InputProps, ref: LegacyRef<HTMLInputElement>) {
    const id = useId();
    return (
        <div className="w-full">
            {
                label && <label
                    className='inline-blockmb-1 pl-1'
                    htmlFor={id}
                >
                </label>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            >
            </input>
        </div>
    )
})

export default Input;